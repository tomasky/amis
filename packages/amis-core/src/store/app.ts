import {Instance, SnapshotIn, types} from 'mobx-state-tree';
import {RendererEnv} from '../factory';
import {NavigationObject} from '../types';
import {
  createObject,
  filterTree,
  replaceUrlParams,
  findTree,
  guid,
  mapTree
} from '../utils/helper';
import {ServiceStore} from './service';
import {filter, isVisible, resolveVariableAndFilter} from '../utils';
import isEqual from 'lodash/isEqual';

export const AppStore = ServiceStore.named('AppStore')
  .props({
    pages: types.frozen(),
    activePage: types.frozen(),
    folded: false,
    offScreen: false
  })
  .views(self => ({
    get navigations(): Array<NavigationObject> {
      if (Array.isArray(self.pages)) {
        return mapTree(self.pages, item => {
          let visible = isVisible(item, self.data);

          if (
            visible !== false &&
            item.path &&
            !~item.path.indexOf('http') &&
            ~item.path.indexOf(':')
          ) {
            visible = false;
          }

          return {
            label: item.label,
            icon: item.icon,
            path: item.path,
            children: item.children,
            className: item.className,
            visible,
            badge:
              typeof item.badge === 'string'
                ? filter(item.badge, self.data)
                : item.badge,
            badgeClassName: filter(item.badgeClassName, self.data)
          };
        });
      }

      return [
        {
          label: self.__('App.navigation'),
          children: []
        }
      ];
    },
    get bcn() {
      return self.activePage?.bcn || [];
    },

    get pageData() {
      return createObject(self.data, {
        params: self.activePage?.params || {}
      });
    }
  }))
  .actions(self => ({
    toggleFolded() {
      self.folded = !self.folded;
    },
    toggleOffScreen() {
      self.offScreen = !self.offScreen;
    },

    setPages(pages: any) {
      if (pages && !Array.isArray(pages)) {
        pages = [pages];
      } else if (!Array.isArray(pages)) {
        return;
      }

      pages = mapTree(pages, (item, index, level, paths) => {
        let path = item.link || item.url;

        if (item.schema || item.schemaApi) {
          // 最近的、已经生成好 path 的祖先路径，作为子页面路径前缀。
          // 不能直接用所有祖先的 index 拼 page-n，否则父级配置了 url 时会生成
          // page-n/page-n 而丢掉父级路径。
          let parentPath = '/';
          let idx = paths.length;
          while (idx > 0) {
            const parent = paths[idx - 1];

            if (parent?.path) {
              parentPath = parent.path.replace(/\/+$/, '') + '/';
              break;
            }
            idx--;
          }

          path = item.url ? item.url : `${parentPath}page-${index + 1}`;

          if (path && path[0] !== '/') {
            path = parentPath + path;
          }
        }

        return {
          ...item,
          index,
          id: item.id || guid(),
          label: item.label,
          icon: item.icon,
          path
        };
      });
      self.pages = pages;
    },

    rewrite(to: string, env: RendererEnv) {
      let page = findTree(self.pages, item => {
        if (item.path === to) {
          return true;
        }
        return false;
      });

      if (page) {
        this.setActivePage(page, env);
      }
    },

    setActivePage(
      page: any,
      env: RendererEnv & {
        showFullBreadcrumbPath?: boolean;
        showBreadcrumbHomePath?: boolean;
      },
      params?: any
    ) {
      // 页面和路由参数都未变化时，无需重建页面或重复请求 schema。
      if (
        self.activePage?.id === page.id &&
        isEqual(self.activePage.params || {}, params || {})
      ) {
        return;
      }

      let bcn: Array<any> = [];

      findTree(self.pages, (item, index, level, paths) => {
        if (item.id === page.id) {
          bcn = paths
            .filter(item => item.path && item.label)
            .map(item => ({
              ...item,
              path: replaceUrlParams(item.path, params)
            }));
          if (env.showFullBreadcrumbPath) {
            bcn = paths.filter(item => item.label);
          }
          bcn.push({
            ...item,
            path: ''
          });
          self.__;
          if (env.showBreadcrumbHomePath && bcn[0].path !== '/') {
            bcn.unshift({
              label: self.__('App.home'),
              path: '/'
            });
          }
          return true;
        }
        return false;
      });

      self.activePage = {
        ...page,
        params: params || {},
        bcn
      };

      if (page.label) {
        document.title = page.label;
      }

      if (page.schema) {
        self.schema = page.schema;
        self.schemaKey = '' + Date.now();
      } else if (page.schemaApi) {
        self.schema = null;
        self.fetchSchema(page.schemaApi, self.activePage, {method: 'get'});
      } else if (page.redirect) {
        env.jumpTo(page.redirect, undefined, self.data);
        return;
      } else if (page.rewrite) {
        this.rewrite(page.rewrite, env);
      } else {
        self.schema = null;
        self.schemaKey = '';
      }
    },

    updateActivePage(env: RendererEnv) {
      if (!Array.isArray(self.pages)) {
        return;
      }
      let matched: any;

      let page = findTree(self.pages, item => {
        if (item.path) {
          matched = env.isCurrentUrl(item.path, item);

          if (matched) {
            return true;
          }
        }
        return false;
      });

      if (page) {
        this.setActivePage(
          page,
          env,
          typeof matched === 'object' ? matched.params : undefined
        );
      } else {
        const page = findTree(self.pages, item => item.isDefaultPage);

        if (page) {
          this.setActivePage(page, env);
        } else {
          self.activePage = null;
        }
      }
    }
  }));

export type IAppStore = Instance<typeof AppStore>;
export type SAppStore = SnapshotIn<typeof AppStore>;
