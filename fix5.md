# baidu/amis 未修复 Bug 清单

> 生成时间：2026-09-27 ｜ 比对源码版本：`baidu/amis@43a33ee`（master HEAD，2026-03-18，与上游保持一致）

## 一、方法与范围

- 数据来源：`gh` 拉取 `baidu/amis` 全部 **1,679** 条开放 issue（共 5,948 条，其中 4,269 已关闭）。
- 候选 Bug 提取：① 已打 `bug`/`confirmed` 标签的 131 条（权威）；② `need confirm` 标签中经 LLM 分批分类为疑似 bug 且置信度≥0.75 的 677 条。两者并集 **735** 条。
- “未修复”判定：对每个候选逐一在源码（`packages/amis`、`packages/amis-ui`、`packages/amis-editor` 等）中交叉比对当前代码；同时检查 issue 时间线是否被已合并的修复 PR 引用。
- 验证结论分四档：`still_present`（源码中仍存在该缺陷）、`cannot_determine`（需运行时复现/版本相关，无法静态判定）、`likely_fixed`（当前代码已处理）、`not_a_defect`（实为需求/用法问题）。
- **本清单“未修复”= `still_present` + `cannot_determine`**（即未被证伪的开放 bug）。`likely_fixed`/`not_a_defect` 见文末排除表。

> 说明：本次把带 `need confirm` 标签、标题/正文疑似 bug 的 issue 一并纳入，因此清单比仅看 `bug` 标签（106 条）更全面，但也包含少量误报可能，请结合“验证结论”列使用。

## 二、统计概览

| 类别 | 数量 |
| --- | --- |
| 开放 issue 总数 | 1,679 |
| 候选 bug（已人工+AI 分类） | 735 |
| **未修复（本清单）** | **587** |
| 　├ 源码确认仍存在 (still_present) | 132 |
| 　└ 无法静态判定 (cannot_determine) | 455 |
| 疑似已修复 (likely_fixed，已排除) | 127 |
| 非缺陷 (not_a_defect，已排除) | 21 |
| 被已合并 PR 引用 (possibly_fixed) | 16 |

## 三、未修复 Bug 清单（按组件分组）

### CRUD （78 条）

| # | 标题 | 验证结论 | 源码证据 / 备注 |
| --- | --- | --- | --- |
| [12034](https://github.com/baidu/amis/issues/12034) | CRUD局部刷新 ,在首行上的BUG。 | 源码现存(高确信) ✅已修复(v680) | packages/amis/src/renderers/CRUD.tsx:3279 |
| [11666](https://github.com/baidu/amis/issues/11666) | crud导出excel，导出选定行不生效 | 源码现存(高确信) ✅已修复(v680) | packages/amis/src/renderers/Table/exportExcel.ts:407 |
| [11313](https://github.com/baidu/amis/issues/11313) | crud2中columnsTogglable不生效 | 源码现存(高确信) ✅已修复(v680) | packages/amis/src/renderers/CRUD2.tsx:1644 |
| [11088](https://github.com/baidu/amis/issues/11088) | 在 CRUD 组件中，选中任何一个搜索条件中的输入框，一直按着 enter 键，会持续发请求。 | 源码现存(高确信) | packages/amis-core/src/renderers/Form.tsx:1288 |
| [10970](https://github.com/baidu/amis/issues/10970) | dialog 嵌套 CRUD 中得 filter 回车提交查询失效 | 源码现存(高确信) | packages/amis-core/src/renderers/Form.tsx:2149,2195 |
| [10941](https://github.com/baidu/amis/issues/10941) | CRUD导出 Excel 模板，暂无数据，在文档示例中就有问题 | 源码现存(高确信) ✅已修复(v680) | packages/amis/src/renderers/Table/exportExcel.ts:334-337 |
| [10853](https://github.com/baidu/amis/issues/10853) | 在弹窗中使用相同的CRUD会导致列设置被同步 | 源码现存(高确信) | packages/amis-core/src/store/table.ts:863-870,1260-1261 |
| [10728](https://github.com/baidu/amis/issues/10728) | 点击crud中的重置按钮后 没有重置排序icon | 源码现存(高确信) ✅已修复(v680) | packages/amis/src/renderers/CRUD.tsx:1214-1230 |
| [10119](https://github.com/baidu/amis/issues/10119) | CRUD 局部刷新（仅刷新指定行）bug | 源码现存(高确信) ✅已修复(v680) | packages/amis/src/renderers/Table/index.tsx:3088-3096 |
| [9939](https://github.com/baidu/amis/issues/9939) | crud懒加载模式下，新增一条子级数据，父级菜单没法再触发查询，也没法通过按钮刷新获取，只能重新打开菜单 | 源码现存(高确信) | packages/amis/src/renderers/Table/index.tsx:754 |
| [9780](https://github.com/baidu/amis/issues/9780) | CRUD 组件多选事件缺少数据 | 源码现存(高确信) ⚠️部分修复(v680)：Tag删除已触发 onSelect | packages/amis/src/renderers/CRUD.tsx:2145-2147,2933-2952 |
| [9566](https://github.com/baidu/amis/issues/9566) | Crud 树形结构Bug | 源码现存(高确信) | packages/amis-core/src/utils/helper.ts:1526-1582 |
| [9434](https://github.com/baidu/amis/issues/9434) | 当设置crud的"adaptor": "payload.data.page=x时，切换分页不生效。 | 源码现存(高确信) | packages/amis-core/src/store/crud.ts:461-467 |
| [8646](https://github.com/baidu/amis/issues/8646) | crud卡片模式，调用"autoGenerateFilter": true,会引起获取不到数据，且查询区域不生效 | 源码现存(高确信) ✅已修复(v680) | packages/amis/src/renderers/CRUD.tsx:788-793 |
| [8457](https://github.com/baidu/amis/issues/8457) | Cards 卡片组itemAction中拿不到上层作用域中的数据 | 源码现存(高确信) ✅已修复(v680) | packages/amis/src/renderers/Card.tsx:369 |
| [8026](https://github.com/baidu/amis/issues/8026) | List组件在CRUD使用并做为列且绑定数据为数组类型，当绑定的数组为空时，List的placeholder设置无效 | 源码现存(高确信) | packages/amis/src/renderers/List.tsx:1202-1212 |
| [7786](https://github.com/baidu/amis/issues/7786) | CRUD 重置表单自动触发查询 | 源码现存(高确信) | packages/amis/src/renderers/CRUD.tsx:1235-1244; packages/amis-core/src/renderers/Form.tsx:1601 |
| [7617](https://github.com/baidu/amis/issues/7617) | 【CRUD】关于  crud 的 「initFetch」设置为 false 后，curd -「api-sendOn」 属性满足条件也不触发请求 | 源码现存(高确信) | packages/amis/src/renderers/CRUD.tsx:1185,1292 |
| [7609](https://github.com/baidu/amis/issues/7609) | Crud 轮询参数设置为变量，会触发持续持续持续持续持续持续持续持续持续.....请求 | 源码现存(高确信) ✅已修复(v680) | packages/amis/src/renderers/CRUD.tsx:1608-1624; packages/amis/src/renderers/CRUD2.tsx:794-812 |
| [6393](https://github.com/baidu/amis/issues/6393) | crud 结合 service使用时，通过service获取表格数据时，total无效 | 源码现存(高确信) | packages/amis-core/src/store/crud.ts:686-700 |
| [5730](https://github.com/baidu/amis/issues/5730) | CRUD 组件第一次查询调用 updateLocation 方法 replace 参数时不应传入 true 会导致页面二次刷新 | 源码现存(高确信) | packages/amis/src/renderers/CRUD2.tsx:676-684 |
| [4908](https://github.com/baidu/amis/issues/4908) | CURD  如果后端接口返回结构体中包含 page字段为null, 且perPage值小于总数据条数，将触发前端页面卡死 | 源码现存(高确信) | packages/amis-core/src/store/crud.ts:472 |
| [4873](https://github.com/baidu/amis/issues/4873) | crud字段filterable中的source无法获取父级变量 | 源码现存(高确信) | packages/amis/src/renderers/Table/HeadCellFilterDropdown.tsx:152-161 |
| [4551](https://github.com/baidu/amis/issues/4551) | crud的initFetch置为false时不管有没有filter都不会拉数据 | 源码现存(高确信) | packages/amis/src/renderers/CRUD.tsx:1185 |
| [1518](https://github.com/baidu/amis/issues/1518) | CRUD api中存在数据变量时，表格中的排序，过滤构建的url异常 | 源码现存(高确信) | packages/amis-core/src/utils/api.ts:300-303 |
| [17347](https://github.com/baidu/amis/issues/17347) | CRUD 批量编辑后刷新分页失效 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx:1408 |
| [14361](https://github.com/baidu/amis/issues/14361) | crud重新请求,无法触发重新渲染,导致界面上显示的是旧值 | 源码待定(需复现) | packages/amis/src/renderers/QuickEdit.tsx:85 |
| [12156](https://github.com/baidu/amis/issues/12156) | 增删改查的查询功能设置失效 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx:621 |
| [12080](https://github.com/baidu/amis/issues/12080) | BUG: CRUD 通过指定index 更新行的信息后，点击分页，无法跳转到指定页，控制台报错～ | 源码待定(需复现) | packages/amis/src/renderers/Table/index.tsx:3111 |
| [12029](https://github.com/baidu/amis/issues/12029) | 【导出失败】npm 版本 6.12.0 | 源码待定(需复现) | packages/amis/src/renderers/Table/exportExcel.ts:290 |
| [11625](https://github.com/baidu/amis/issues/11625) | 从6.9.0开始autoGenerateFilter的bug | 源码待定(需复现) | packages/amis/src/renderers/Table/AutoFilterForm.tsx:57 |
| [11558](https://github.com/baidu/amis/issues/11558) | crud的filter默认值从接口获取时crud初始化发接口参数有问题 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx:1159 |
| [11556](https://github.com/baidu/amis/issues/11556) | crud的filter默认值从接口获取时重置有问题 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx:1214 |
| [11444](https://github.com/baidu/amis/issues/11444) | CURD 组件开启点选无效 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx:3156 |
| [11315](https://github.com/baidu/amis/issues/11315) | CRUD拖拽排序，将第1条记录拖拽到非最后一条，无法重新排序，insertAfter为空 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx:1879 |
| [11176](https://github.com/baidu/amis/issues/11176) | wrapper -> page -> crud 结构，crud 开启 autoFillHeight 后， table 的高度不停在缩小 | 源码待定(需复现) | packages/amis/src/renderers/Table/index.tsx:915 |
| [10923](https://github.com/baidu/amis/issues/10923) | crud 表格复制 Tooltip 错位 | 源码待定(需复现) | packages/amis/src/renderers/Table/Cell.tsx |
| [10854](https://github.com/baidu/amis/issues/10854) | 分页选择每页数量的弹窗展示不正确 | 源码待定(需复现) | packages/amis-ui/src/components/Select.tsx:1242-1249 |
| [10721](https://github.com/baidu/amis/issues/10721) | switch-per-page 超出页面且无法滚动 | 源码待定(需复现) | packages/amis-core/src/utils/dom.tsx:107-270 |
| [10705](https://github.com/baidu/amis/issues/10705) | export-excel  导出大数据量情况下  excel 文件损坏  Link被删除 | 源码待定(需复现) | packages/amis/src/renderers/Table/exportExcel.ts:631-640 |
| [10353](https://github.com/baidu/amis/issues/10353) | crud 动态表头固定列无效 amis6.4.1 | 源码待定(需复现) | packages/amis-core/src/store/table.ts:1073-1094 |
| [10314](https://github.com/baidu/amis/issues/10314) | crud 快速编辑初始化数据时顶部确认数据数异常 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx |
| [10305](https://github.com/baidu/amis/issues/10305) | crud, crud2 固定列设置后无效 | 源码待定(需复现) | packages/amis-core/src/store/table.ts:1031-1096 |
| [10190](https://github.com/baidu/amis/issues/10190) | 增删改查组件，启动项目之后，第一次进入页面正常显示，刷新页面之后新增按钮和导出按钮消失 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx |
| [10108](https://github.com/baidu/amis/issues/10108) | url带有hash时，CRUD syncLocation 功能有问题 | 源码待定(需复现) | packages/amis-core/src/utils/helper.ts:2255-2264 |
| [10105](https://github.com/baidu/amis/issues/10105) | crud2开启复选框，选择菜单项触发无效果 | 源码待定(需复现) | packages/amis/src/renderers/CRUD2.tsx |
| [10003](https://github.com/baidu/amis/issues/10003) | CRUD在primaryField字段有重复数据时不同amis版本的选择问题 | 源码待定(需复现) | packages/amis-core/src/store/table.ts:679-681 |
| [9713](https://github.com/baidu/amis/issues/9713) | CURD/CURD2的【查看】【编辑】对话框配置了初始化接口，在打开对话框时，初始化接口返回错误，但对话框没有处理错误 | 源码待定(需复现) | packages/amis/src/renderers/Dialog.tsx:455-463 |
| [9709](https://github.com/baidu/amis/issues/9709) | crud”编辑“功能，编辑数据后提交数据，提交/放弃弹窗一直存在 | 源码待定(需复现) | packages/amis/src/renderers/Table/index.tsx:1895-1993 |
| [9708](https://github.com/baidu/amis/issues/9708) | crud编辑后点击保存提示页面不消失 | 源码待定(需复现) | packages/amis/src/renderers/Table/index.tsx:1347-1403 |
| [9592](https://github.com/baidu/amis/issues/9592) | crud翻页后,schemaApi的js无法获得正确的本行数据 | 源码待定(需复现) | packages/amis/src/renderers/Table/TableRow.tsx:265-340 |
| [9421](https://github.com/baidu/amis/issues/9421) | bug: crud 列里面有 quickEdit   mode: 'inline', name 为 a[0].bb 数组时候 导致switch 按钮不受控。 | 源码待定(需复现) | packages/amis/src/renderers/QuickEdit.tsx:457-473 |
| [9397](https://github.com/baidu/amis/issues/9397) | 3.6.3中的crud组件使用时，switch开关操作请求接口，点击分页后，id发生错位 | 源码待定(需复现) | packages/amis/src/renderers/Table/Cell.tsx:167-181 |
| [9077](https://github.com/baidu/amis/issues/9077) | crud 的column列中嵌套list，"source": 用数据映射fiter，显示的结果是上一条的记录值 | 源码待定(需复现) | packages/amis/src/renderers/List.tsx:416-448 |
| [8762](https://github.com/baidu/amis/issues/8762) | JS SDK 3.5.2 CRUD autoGenerateFilter模式下URL传参不能传递给searchable字段，columnsNum设置不生效 | 源码待定(需复现) | packages/amis/src/renderers/Table/AutoFilterForm.tsx:49-57 |
| [8615](https://github.com/baidu/amis/issues/8615) | CRUD组件配置了批量操作的时候，会出现两个全选按钮。 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx:2368-2477 |
| [8592](https://github.com/baidu/amis/issues/8592) | 官方用例（引用http请求返回的数据）在crud bulkActions中使用时功能失效 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx:1050-1130 |
| [8570](https://github.com/baidu/amis/issues/8570) | crud组件，同时开启单行底部显示和自动合并单元格，底部显示有问题 | 源码待定(需复现) | packages/amis/src/renderers/Table/TableRow.tsx:245 |
| [8563](https://github.com/baidu/amis/issues/8563) | CRUD组件新增数据后获取id问题 | 源码待定(需复现) | packages/amis/src/renderers/Table/TableBody.tsx:120 |
| [8400](https://github.com/baidu/amis/issues/8400) | CRUD quickEdit后更新的数据和实际显示的不同步 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx:1751-1876 |
| [8172](https://github.com/baidu/amis/issues/8172) | 3.4.0版本crud自适应高度异常 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx:3207-3230 |
| [8074](https://github.com/baidu/amis/issues/8074) | CRUD快速编辑接口配置不生效 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx:315-320,1771-1794 |
| [8037](https://github.com/baidu/amis/issues/8037) | crud导出csv或者导出excel报错 | 源码待定(需复现) | packages/amis/src/renderers/Table/index.tsx:2638-2639; packages/amis-core/src/store/crud.ts:745-760 |
| [7707](https://github.com/baidu/amis/issues/7707) | curd配置的导出报错。使用Vite构建的 | 源码待定(需复现) | packages/amis/src/renderers/Table/index.tsx:2638-2639 |
| [7627](https://github.com/baidu/amis/issues/7627) | 使用react调用带有ajax请求确认的crud组件，不能够显示确认框 | 源码待定(需复现) | packages/amis-core/src/index.tsx:350-352; packages/amis/src/renderers/Action.tsx:662-672 |
| [7612](https://github.com/baidu/amis/issues/7612) | amis从2.8.0升级到3.2.0后，crud中static列内容不可见 | 源码待定(需复现) | packages/amis/src/renderers/Form/Static.tsx:108-160,184-235 |
| [6945](https://github.com/baidu/amis/issues/6945) | crud 接口返回了新数据，但是页面没更新，还是旧数据 | 源码待定(需复现) | packages/amis-core/src/store/crud.ts:455-460; packages/amis-core/src/WithStore.tsx:261 |
| [6597](https://github.com/baidu/amis/issues/6597) | CRUD组件在headerToolbar添加按钮发送请求，crud列表不会保持Loading转圈了以及没有了遮罩层 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx:954-1005,3197,3223 |
| [6525](https://github.com/baidu/amis/issues/6525) | CRUD组件在headerToolbar添加自定义按钮发送请求，列表不会保持Loading转圈了 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx:954-1005,3197 |
| [5763](https://github.com/baidu/amis/issues/5763) | CRUD开启syncLocation时，filter区域中clear-and-submit按钮多次点击url参数不一致。 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx:1214-1245; packages/amis-core/src/renderers/Form.tsx:1414-1416 |
| [5725](https://github.com/baidu/amis/issues/5725) | 卡片设置 itemAction 为 reload 时会刷新整个页面，无法局部刷新 | 源码待定(需复现) | packages/amis-core/src/Scoped.tsx:318-360; packages/amis/src/renderers/Cards.tsx:1203-1235 |
| [5295](https://github.com/baidu/amis/issues/5295) | 官方示例`CRUD`快速编辑功能失效 | 源码待定(需复现) | packages/amis/src/renderers/QuickEdit.tsx:415 |
| [5222](https://github.com/baidu/amis/issues/5222) | 增删改查配置批量操作按钮，滚动横向滚动条后选择列会对不齐 | 源码待定(需复现) | packages/amis/src/renderers/Table/index.tsx:2238-2245 |
| [4902](https://github.com/baidu/amis/issues/4902) | crud的list模式内嵌cards报错TypeError: t.indexOf is not a function | 源码待定(需复现) | packages/amis/src/renderers/Cards.tsx:308-320 |
| [4575](https://github.com/baidu/amis/issues/4575) | 1.10.0+版本crud点击联动功能异常 | 源码待定(需复现) | packages/amis/src/renderers/Table/TableRow.tsx:118-119 |
| [4360](https://github.com/baidu/amis/issues/4360) | service组件包裹curd组件 问题 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx:3196 |
| [3535](https://github.com/baidu/amis/issues/3535) | react方式，多个用到CRUD组件的页面进行切换时，数据加载错乱 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx:834-895 |
| [3431](https://github.com/baidu/amis/issues/3431) | CRUD 卡片模式点击选中没有选中样式 | 源码待定(需复现) | packages/amis/src/renderers/Cards.tsx:948 |

### Table/表格 （113 条）

| # | 标题 | 验证结论 | 源码证据 / 备注 |
| --- | --- | --- | --- |
| [16728](https://github.com/baidu/amis/issues/16728) | 表格颜色显示bug | 源码现存(高确信) | packages/amis-ui/scss/components/_table.scss:532-534 |
| [14566](https://github.com/baidu/amis/issues/14566) | transferPicker组件，table模式下的分页问题 | 源码现存(高确信) | packages/amis-core/src/store/formItem.ts:841-846 |
| [12389](https://github.com/baidu/amis/issues/12389) | Office Viewer 组件 表格行循环，如果行中变量名在父层作用域有同名变量时，会取父层变量值，应该取循环本层的变量值才对 | 源码现存(高确信) | packages/amis/src/renderers/OfficeViewer.tsx:152-156 |
| [12006](https://github.com/baidu/amis/issues/12006) | 【bug】crud2 筛选条件的数据填充到了表格里 | 源码现存(高确信) | packages/amis/src/renderers/Table2/index.tsx:991-993 |
| [12001](https://github.com/baidu/amis/issues/12001) | 【BUG】inputTable组件在编辑模式下时，原来列中的按钮会变为输入框 | 源码现存(高确信) ✅已修复(v680) | packages/amis/src/renderers/Form/InputTable.tsx:1766-1782 |
| [11837](https://github.com/baidu/amis/issues/11837) | input-table中使用mapping映射多个时，导出Excel内容错误 | 源码现存(高确信) | packages/amis/src/renderers/Table/exportExcel.ts:541 |
| [11820](https://github.com/baidu/amis/issues/11820) | picker表格选择 修改已选中的数据 上面已选择标签跟随变化 但数据域中还是旧值 | 源码现存(高确信) | packages/amis/src/renderers/Form/Picker.tsx:533-539 |
| [11803](https://github.com/baidu/amis/issues/11803) | InputTable组件自定义按钮在编辑状态不会被隐藏 | 源码现存(高确信) | packages/amis/src/renderers/Form/InputTable.tsx:1731-1761 |
| [11596](https://github.com/baidu/amis/issues/11596) | 使用table2表格,工具栏添加右对齐的按钮，按钮执行“清除选中项”事件 无效 | 源码现存(高确信) ✅已修复(v680) | packages/amis/src/renderers/CRUD2.tsx:1181-1195 |
| [11592](https://github.com/baidu/amis/issues/11592) | crud表格的mapping状态使用导出excel不显示状态值 bug | 源码现存(高确信) ✅已修复(v680) | packages/amis/src/renderers/Table/exportExcel.ts:551-562 |
| [11584](https://github.com/baidu/amis/issues/11584) | popOverEnableOn中使用表达式函数时提示找不到该方法 | 源码现存(高确信) | packages/amis-core/src/schema.ts:844 |
| [11506](https://github.com/baidu/amis/issues/11506) | inputTable取消编辑时会导致数据错误 | 源码现存(高确信) | packages/amis/src/renderers/Form/InputTable.tsx:1136-1145 |
| [11489](https://github.com/baidu/amis/issues/11489) | inputTable 编辑模式下 如果列是按钮 动态添加渲染出来是个输入框 | 源码现存(高确信) ✅已修复(v680) | packages/amis/src/renderers/Form/InputTable.tsx:1766-1781 |
| [11103](https://github.com/baidu/amis/issues/11103) | input-table needConfirm属性为false的情况下表单disabled属性不生效 | 源码现存(高确信) | packages/amis/src/renderers/Form/InputTable.tsx:1487-1499 |
| [10982](https://github.com/baidu/amis/issues/10982) | table2组件中选中表达式`selectedRowKeysExpr`无法与变量比较 | 源码现存(高确信) | packages/amis/src/renderers/Table2/index.tsx:667-672 |
| [10980](https://github.com/baidu/amis/issues/10980) | table2组件，无法指定image组件的宽度，恒为110px | 源码现存(高确信) ✅已修复(v680) | packages/amis/src/renderers/Table2/index.tsx:838 |
| [10950](https://github.com/baidu/amis/issues/10950) | Table2 itemDraggableOn 配置当前行是否可拖拽的条件无效 | 源码现存(高确信) | packages/amis-core/src/store/table2.ts:204; packages/amis-ui/src/components/table/index.tsx:515-518 |
| [10912](https://github.com/baidu/amis/issues/10912) | crud2(表格2.0)不支持export-excel类型 | 源码现存(高确信) | packages/amis/src/renderers/Table2/index.tsx:1966-2069; packages/amis/src/renderers/Table/index.tsx:2448 |
| [10837](https://github.com/baidu/amis/issues/10837) | table和crud的toggleExpanded动作展开内部层级时不会自动展开祖先 | 源码现存(高确信) | packages/amis-core/src/store/table.ts:1936-1952 |
| [10816](https://github.com/baidu/amis/issues/10816) | CRUD中table使用groupName导出Excel会丢失表头 | 源码现存(高确信) | packages/amis/src/renderers/Table/exportExcel.ts:377-381 |
| [10724](https://github.com/baidu/amis/issues/10724) | input-table组件渲染80条数据的时候，遇到特别卡顿的情况需要10秒钟才能加载完成 | 源码现存(高确信) | packages/amis/src/renderers/QuickEdit.tsx:358-369; packages/amis-core/src/store/table.ts:425 |
| [10605](https://github.com/baidu/amis/issues/10605) | inputtable组件分页校验不通过仍然提交接口 | 源码现存(高确信) | packages/amis/src/renderers/Form/InputTable.tsx:507-508,2075 |
| [10599](https://github.com/baidu/amis/issues/10599) | 6.6 table2快速编辑提交成功后按钮不消失 | 源码现存(高确信) | packages/amis/src/renderers/Table2/index.tsx:1467-1476 |
| [10594](https://github.com/baidu/amis/issues/10594) | 在crud中使用api动态返回列配置，配合columns-toggler一起使用，会在表格刷新时覆盖浏览器缓存中记录的toggled列 | 源码现存(高确信) | packages/amis-core/src/store/table.ts:1328-1356 |
| [10271](https://github.com/baidu/amis/issues/10271) | input-table 在执行 addItem 动作的时候 会触发 显示空的"操作"列 | 源码现存(高确信) | packages/amis/src/renderers/Form/InputTable.tsx:1505,1731 |
| [9669](https://github.com/baidu/amis/issues/9669) | 表格2.0行选择 | 源码现存(高确信) | packages/amis-ui/src/components/table/index.tsx:793 |
| [9643](https://github.com/baidu/amis/issues/9643) | 表格2.0组件同时使用多行选择和可拖拽时，选择框不显示 | 源码现存(高确信) | packages/amis-ui/src/components/table/Head.tsx:204; packages/amis-ui/src/components/table/Row.tsx:360 |
| [9627](https://github.com/baidu/amis/issues/9627) | 表格的增删改查中的删除操作，当使用二次确认时，无法弹出alert，控制台报错：Alert 组件应该没有被渲染，所以隐性的渲染到 body 了 | 源码现存(高确信) | packages/amis-ui/src/components/Alert.tsx:60,71 |
| [7839](https://github.com/baidu/amis/issues/7839) | input-table通过hiddenOn控制columns显示和隐藏,不生效 | 源码现存(高确信) | packages/amis-core/src/store/table.ts:642-663; packages/amis/src/renderers/Table/TableCell.tsx:85-88 |
| [7149](https://github.com/baidu/amis/issues/7149) | input-table内选择框不能使用componentName 刷新数据 | 源码现存(高确信) | packages/amis-core/src/Scoped.tsx:187-193 |
| [6004](https://github.com/baidu/amis/issues/6004) | CRUD中配置使用子对象属性后，可以正常显示，但是sortable无效 | 源码现存(高确信) ✅已修复(v680) | packages/amis-core/src/store/table.ts:1980-1987 |
| [5826](https://github.com/baidu/amis/issues/5826) | Transfer 穿梭器 table模式 column无法执行模板解析 | 源码现存(高确信) | packages/amis-ui/src/components/TableSelection.tsx:116-118 |
| [5539](https://github.com/baidu/amis/issues/5539) | table表格  行操作按钮 配置  "reload":  属性  刷新当前表格  没有效果了   1.x的版本是可以的刷新的 | 源码现存(高确信) | packages/amis/src/renderers/Table/index.tsx:1158-1167; packages/amis/src/renderers/Page.tsx:1251-1256 |
| [5063](https://github.com/baidu/amis/issues/5063) | input-table/table/crud组件列中设置的quickEdit，不支持select类型的控件在只读模式时显示label | 源码现存(高确信) | packages/amis/src/renderers/QuickEdit.tsx:687-701; packages/amis/src/renderers/Table/TableCell.tsx:92 |
| [3742](https://github.com/baidu/amis/issues/3742) | select 在table mode下配置的autoComplete接口无法触发 | 源码现存(高确信) | packages/amis/src/renderers/Form/Select.tsx:570-573,763; packages/amis/src/renderers/Form/Transfer.tsx:400 |
| [21424](https://github.com/baidu/amis/issues/21424) | inputtable 内存在 包含weight字符的字段 开启分页时切换分页，然后切换回1页时数据错乱 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:495-516,2043-2137 |
| [12181](https://github.com/baidu/amis/issues/12181) | InputTable新增行时，行内控件能回显示值但提交表单时值为空 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:1937-1968 |
| [12123](https://github.com/baidu/amis/issues/12123) | 6.12.0版本input-table中使用input-text和textarea组件无法输入空格 | 源码现存(高确信) ✅已修复(本轮) | QuickEdit.tsx:218-219 handleWindowKeyPress 误用最近包裹元素 `el.tagName`（永远是 div/td）判断，导致快速编辑输入框内空格被 preventDefault；改用 `e.target.tagName`（同步 PR #21525） |
| [12110](https://github.com/baidu/amis/issues/12110) | select组件表格形式通过api搜索过滤后，如果不是首次加载过的数据无法勾选，有图有代码 | 源码待定(需复现) | packages/amis-ui/src/components/TableSelection.tsx:84-90 |
| [12028](https://github.com/baidu/amis/issues/12028) | 编辑数据后,再点击几次全选,编号列数据会消失 | 源码待定(需复现) | packages/amis/src/renderers/Table2/index.tsx:1840-1959 |
| [11965](https://github.com/baidu/amis/issues/11965) | input-table 宽度超过父类宽度，并且设置input-table宽度不好使 | 源码待定(需复现) | packages/amis-ui/src/components/InputTable.tsx:227-234 |
| [11934](https://github.com/baidu/amis/issues/11934) | input-table 组件的columns属性，若其中某列使用了引用的 select组件 ，则无法正确展示。 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:1513 |
| [11876](https://github.com/baidu/amis/issues/11876) | crud嵌套表格，第二层级展开时执行新增子级，默认会将第二层级收起 | 源码待定(需复现) | packages/amis/src/renderers/Table2/index.tsx:1887-1947 |
| [11842](https://github.com/baidu/amis/issues/11842) | inputTable 表单在 6.4.0 版本及其以后，无法对“value”:"${1+1}"中的表达式进行解析了 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:874-879 |
| [11768](https://github.com/baidu/amis/issues/11768) | Table 列样式 背景色不能填满表头 | 源码待定(需复现) | packages/amis/src/renderers/Table2/index.tsx:942-963 |
| [11723](https://github.com/baidu/amis/issues/11723) | Table/CRUD底部展开加载数据时显示空BUG | 源码待定(需复现) | packages/amis/src/renderers/Table/TableContent.tsx:67 |
| [11673](https://github.com/baidu/amis/issues/11673) | picker 的 table 模式，选中选项会触发两次change事件 | 源码待定(需复现) | packages/amis/src/renderers/Form/Picker.tsx:507-542 |
| [11507](https://github.com/baidu/amis/issues/11507) | select控件无法联动inputTable | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:441-449 |
| [11504](https://github.com/baidu/amis/issues/11504) | Input-Group 输入框组合中的select组件开启creatable后无法弹出新增选项 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputGroup.tsx |
| [11278](https://github.com/baidu/amis/issues/11278) | table表格组件开启显示列里的排序，总计行的列无法跟随移动 | 源码待定(需复现) | packages/amis-core/src/store/table.ts:1349 |
| [11167](https://github.com/baidu/amis/issues/11167) | crud2中this.control为undefined,和Table2异步加载有关 | 源码待定(需复现) | packages/amis/src/renderers/CRUD2.tsx:599-605,1713 |
| [11162](https://github.com/baidu/amis/issues/11162) | table2表格在列很多的情况下固定表头出现表头显示不全 | 源码待定(需复现) | packages/amis-ui/src/components/table/index.tsx:570-600 |
| [11057](https://github.com/baidu/amis/issues/11057) | Combo的syncFields同步InputTable时无限嵌套 | 源码待定(需复现) | packages/amis/src/renderers/Form/Combo.tsx:799-807,918-926 |
| [11054](https://github.com/baidu/amis/issues/11054) | table-view的单元格, 数据源必须是一个组件 | 源码待定(需复现) | packages/amis/src/renderers/TableView.tsx:222-224 |
| [10948](https://github.com/baidu/amis/issues/10948) | 表格2.0快速构建 表格字段输入类型选择除单行文本框之外的字段，确认后再次点快速构建输入类型被还原为单行文本框 | 源码待定(需复现) | packages/amis-editor/src/plugin/Table2.tsx:415 |
| [10930](https://github.com/baidu/amis/issues/10930) | inputTable通过动作联动修改值时输入会自动失焦 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:441-449 |
| [10909](https://github.com/baidu/amis/issues/10909) | CRUD2  宽度无法适配, 表格内容错叠 | 源码待定(需复现) | packages/amis/src/renderers/Table2/index.tsx:2050-2069 |
| [10900](https://github.com/baidu/amis/issues/10900) | 表格字段过多时表头重叠 | 源码待定(需复现) | packages/amis/src/renderers/Table2/index.tsx:2050-2069 |
| [10886](https://github.com/baidu/amis/issues/10886) | table组件的width有时会失效 | 源码待定(需复现) | packages/amis-core/src/store/table.ts:1362-1401 |
| [10845](https://github.com/baidu/amis/issues/10845) | InputTable站点示例中A列不展示 | 源码待定(需复现) | packages/amis/src/renderers/Table/ColGroup.tsx:101-119 |
| [10827](https://github.com/baidu/amis/issues/10827) | curd组件的表头在缩放下字体重叠 | 源码待定(需复现) | packages/amis/src/renderers/Table/index.tsx:3001-3025 |
| [10763](https://github.com/baidu/amis/issues/10763) | table2 简单查询，表单项动态拉取并设置默认值，重置清空了表单 | 源码待定(需复现) | packages/amis/src/renderers/CRUD2.tsx:1392-1410 |
| [10752](https://github.com/baidu/amis/issues/10752) | 6.7版本中table2添加固定表头和边框，样式错位 | 源码待定(需复现) | packages/amis/src/renderers/Table2/index.tsx:2050-2069 |
| [10725](https://github.com/baidu/amis/issues/10725) | input-table组件渲染80条数据的时候，这个render贼慢，我一共80*33 = 2640个单元格，几乎一次渲染1毫秒 | 源码待定(需复现) | packages/amis/src/renderers/Table/index.tsx:2905-2963 |
| [10722](https://github.com/baidu/amis/issues/10722) | InputTable的addItem触发后table数据未刷新 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:946-948 |
| [10665](https://github.com/baidu/amis/issues/10665) | 使用自定义js给表格编辑框组件赋值只能执行一次，第二次不生效 | 源码待定(需复现) | packages/amis/src/renderers/Table/index.tsx:3111-3137 |
| [10613](https://github.com/baidu/amis/issues/10613) | InputTable创建子项后无法收起子项 | 源码待定(需复现) | packages/amis-core/src/store/table.ts:223-232 |
| [10583](https://github.com/baidu/amis/issues/10583) | table配置itemActions行点击事件后， 列columns下面的单个表格配置onEvent无效了 | 源码待定(需复现) | packages/amis/src/renderers/Table/TableRow.tsx:92-126 |
| [10456](https://github.com/baidu/amis/issues/10456) | 表格编辑框，先完全删除第2页的数据，然后编辑第1页的数据，第2页会新增1行，这个问题会导致分页功能不能用 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:495 |
| [10451](https://github.com/baidu/amis/issues/10451) | 6.4.0版本 input-table组件  某个字段值变化添加事件-组件特性动作-表格编辑框-赋值 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:2150 |
| [10309](https://github.com/baidu/amis/issues/10309) | table2合并单元格bug | 源码待定(需复现) | packages/amis/src/renderers/Table2/index.tsx:1045 |
| [10262](https://github.com/baidu/amis/issues/10262) | 设计器表格2.0配置单元格弹窗配置丢失问题 | 源码待定(需复现) | packages/amis-editor/src/plugin/Table2.tsx |
| [10232](https://github.com/baidu/amis/issues/10232) | 6.4.1版本中，设置CRUD2隐藏，Service加载后设置显示时，仅查询、操作和分页区域显示，数据表格区域未显示 | 源码待定(需复现) | packages/amis/src/renderers/Table/index.tsx:929 |
| [10152](https://github.com/baidu/amis/issues/10152) | 弹出窗口中下拉框联动CRUD表格内容不刷新数据 | 源码待定(需复现) | packages/amis/src/renderers/CRUD2.tsx:1168 |
| [10140](https://github.com/baidu/amis/issues/10140) | #10134 table2刷新页面改成crud2下发存在bug | 源码待定(需复现) | packages/amis/src/renderers/CRUD2.tsx:1181 |
| [10136](https://github.com/baidu/amis/issues/10136) | inputTable组件在行内编辑时存在延迟更新数据域的问题 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:518 |
| [10130](https://github.com/baidu/amis/issues/10130) | input-table配置合并单元格后，表格错行 | 源码待定(需复现) | packages/amis-core/src/store/table.ts:1486 |
| [10036](https://github.com/baidu/amis/issues/10036) | crud2 表格分页无法设置每页显示 | 源码待定(需复现) | packages/amis/src/renderers/CRUD2.tsx:562 |
| [9983](https://github.com/baidu/amis/issues/9983) | inputTable中嵌套多个inputTable，其中嵌套的子inputTable保存一行数据时，其他子inputTable也会保存一行数据。 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:834 |
| [9965](https://github.com/baidu/amis/issues/9965) | fixed固定多列时，再启用columnsTogglable，操作隐藏固定列，出现列位移 | 源码待定(需复现) | packages/amis/src/renderers/Table/ColumnToggler.tsx:448 |
| [9866](https://github.com/baidu/amis/issues/9866) | 2个表格2.0组件联动 选择单击事件  重新请求数据 不显示刷新组件 | 源码待定(需复现) | packages/amis/src/renderers/Table2/index.tsx:1750 |
| [9848](https://github.com/baidu/amis/issues/9848) | 【6.2.2】table 组件当有字段配置 fixed属性，固定某些列，左右滑动 table，表格头和表格内容滚动不同步 | 源码待定(需复现) | packages/amis-ui/src/components/table/index.tsx:1299 |
| [9596](https://github.com/baidu/amis/issues/9596) | table2在列超多时使用scroll会出现内容挤压问题 | 源码待定(需复现) | packages/amis/src/renderers/Table2/index.tsx:1140 |
| [9586](https://github.com/baidu/amis/issues/9586) | crud2表格组件，再次打开创建向导，输入类型，永远显示input-text类型，手动选择的类型丢失 | 源码待定(需复现) | packages/amis-editor/src/plugin/CRUD2/BaseCRUD.tsx:174 |
| [9445](https://github.com/baidu/amis/issues/9445) | 表格2.0有bug | 源码待定(需复现) | packages/amis/src/renderers/Table2/index.tsx:1598-1612 |
| [9383](https://github.com/baidu/amis/issues/9383) | Table2 自定义列部分情况下无法点击 | 源码待定(需复现) | packages/amis/src/renderers/Table2/index.tsx:1608-1648 |
| [9361](https://github.com/baidu/amis/issues/9361) | 使用json方法实现弹窗中的表格，修改表格数据报错 | 源码待定(需复现) | packages/amis/src/renderers/Table/index.tsx:3111-3138 |
| [9334](https://github.com/baidu/amis/issues/9334) | 表格行字段内容通过表单提交后跟表头无法对齐的问题 | 源码待定(需复现) | packages/amis-core/src/store/table.ts:1362-1460 |
| [9304](https://github.com/baidu/amis/issues/9304) | input-table使用picker组件时，picker组件设置成joinValues设置成false，点击picker删除按钮时，通过debug看值不会被清… | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:1218-1221 |
| [9279](https://github.com/baidu/amis/issues/9279) | picker组件的table模式单选时无法正常选中点击的记录 | 源码待定(需复现) | packages/amis-core/src/store/table.ts:234-259 |
| [9031](https://github.com/baidu/amis/issues/9031) | 使用table组件，点击按钮添加新数据的时候，使用setValue会报错 | 源码待定(需复现) | packages/amis/src/renderers/Table/index.tsx:3111-3138 |
| [8935](https://github.com/baidu/amis/issues/8935) | input-table 不受控  列字段  "name": "model_operator[0].internal_op", :bug | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:1850-1860 |
| [8744](https://github.com/baidu/amis/issues/8744) | InputTable action SeValue工作不正常 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:2150-2218 |
| [8068](https://github.com/baidu/amis/issues/8068) | 表格编辑框里的数字组件，如果后台返回0，页面会显示空。即便默认值设置为0了也显示空。 | 源码待定(需复现) | packages/amis-core/src/utils/helper.ts:2170 |
| [7843](https://github.com/baidu/amis/issues/7843) | amis@3.3.0 table 嵌套从第3级开始显示错位 | 源码待定(需复现) | packages/amis-core/src/store/table.ts:391-393 |
| [7647](https://github.com/baidu/amis/issues/7647) | crud组件接口有数据但不展示在表格上（当设置loadDataOnce：true时） | 源码待定(需复现) | packages/amis-core/src/store/crud.ts:425-447 |
| [7640](https://github.com/baidu/amis/issues/7640) | inputTable宽度超过一屏时，编辑后面的字段后滚动条会自动复位，影响操作体验 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:409-451 |
| [6376](https://github.com/baidu/amis/issues/6376) | input-table开启分页后，非确认模式下直接编辑某一行数据后，下一页数据出现在本页 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:461-509 |
| [6343](https://github.com/baidu/amis/issues/6343) | release2.3.1版本起，引入问题 [mobx] Encountered an uncaught exception that was thrown by… | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:962-966 |
| [5838](https://github.com/baidu/amis/issues/5838) | schemaApi 动态获取CRUD，修改和新增后，表格自动刷新失效 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx:1404-1413 |
| [5662](https://github.com/baidu/amis/issues/5662) | input-table组件在quick-editor模式下，JSONSchema再次编辑后会覆盖之前的内容 | 源码待定(需复现) | packages/amis/src/renderers/QuickEdit.tsx:412-503 |
| [5661](https://github.com/baidu/amis/issues/5661) | input-table在quick-editor模式下，所有组件首次编辑不生效 | 源码待定(需复现) | packages/amis/src/renderers/QuickEdit.tsx:579-632 |
| [5400](https://github.com/baidu/amis/issues/5400) | 全选列Bug | 源码待定(需复现) | packages/amis/src/renderers/Table/TableBody.tsx:204-304 |
| [5089](https://github.com/baidu/amis/issues/5089) | [BUG] InputTable 无法渲染自定义组件 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:1766-1782 |
| [4743](https://github.com/baidu/amis/issues/4743) | InputTable默认值没有提交 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:647-659 |
| [4645](https://github.com/baidu/amis/issues/4645) | 表格编辑框 表单验证有点问题 | 源码待定(需复现) | packages/amis/src/renderers/QuickEdit.tsx:579-632 |
| [4619](https://github.com/baidu/amis/issues/4619) | input-table中使用combo组合表单项时数据回传出错 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:1256-1278 |
| [4030](https://github.com/baidu/amis/issues/4030) | selectMode=“table”的select配合searchApi使用时，选完后select里有时显示value有时显示label | 源码待定(需复现) | packages/amis/src/renderers/Form/Transfer.tsx:554-579,427-449 |
| [3657](https://github.com/baidu/amis/issues/3657) | inputtable数据较多时，填写完成切换到其他输入框时有明显的卡顿。 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:370 |
| [3612](https://github.com/baidu/amis/issues/3612) | 超级表头开始和结束列合并了，没有显示 | 源码待定(需复现) | packages/amis-core/src/store/table.ts:744-831 |
| [3562](https://github.com/baidu/amis/issues/3562) | 嵌套多层service时crud的table有时候拿不到跨层数据 | 源码待定(需复现) | packages/amis-core/src/renderers/wrapControl.tsx:890-921 |
| [3105](https://github.com/baidu/amis/issues/3105) | 【bug】嵌套表格重复请求 | 源码待定(需复现) | packages/amis/src/renderers/Table/index.tsx:2927 |
| [2149](https://github.com/baidu/amis/issues/2149) | Picker的内嵌模式，值不继承父组件而被置为空，导致表格数据没有默认被选择； | 源码待定(需复现) | packages/amis/src/renderers/Form/Picker.tsx:691-707,740-743 |

### Form/表单 （61 条）

| # | 标题 | 验证结论 | 源码证据 / 备注 |
| --- | --- | --- | --- |
| [11907](https://github.com/baidu/amis/issues/11907) | form表单在里面的子项开启必填然后隐藏了，在提交时候form还是会去校验隐藏的必填项 | 源码现存(高确信) | formItem model registered unconditionally (wrapControl.tsx:197); validate loop form.ts:656 ignores visibility, so hidden… |
| [11757](https://github.com/baidu/amis/issues/11757) | InputText输入框的前缀和后缀，在表单静态展示时不显示 | 源码现存(高确信) ✅已修复(本轮) | InputText prefix/suffix only in renderInput (InputText.tsx:1097,1163); no renderStatic override, so static mode drops th… |
| [11715](https://github.com/baidu/amis/issues/11715) | 无法打印表单 | 源码现存(高确信) ✅已修复(本轮) | PrintAction.ts:41 queries [data-id]; Form renderer never sets data-id (only CRUD/Panel/Wrapper do), so lookup fails. |
| [11656](https://github.com/baidu/amis/issues/11656) | 日期输入框隐藏后，提交表单，不是时间戳的问题 | 源码现存(高确信) | valueFormat applied only in InputDate constructor InputDate.tsx:432; invisible control renders null (wrapControl.tsx:986… |
| [11602](https://github.com/baidu/amis/issues/11602) | combo组件条件分支无法监听add事件 | 源码现存(高确信) ✅已修复(本轮) | Combo.tsx:603 addItemWith lacks dispatchEvent('add'); conditions add button calls it at Combo.tsx:1653, while addItem di… |
| [11210](https://github.com/baidu/amis/issues/11210) | Options 选择器表单项多选 multiple在联动时存在BUG，标签没被清除 | 源码现存(高确信) | formItem.ts:275-303 unmatched selected options retain label from origin instead of clearing; hiddenOn options leave stal… |
| [10891](https://github.com/baidu/amis/issues/10891) | Each循环渲染器 中嵌入Combo时，Combo的index变量被each的index覆盖 | 源码现存(高确信) ✅已修复(本轮) | Combo.tsx:1205 trailing ...data overrides combo index with Each's index; changing indexKeyName does not prevent it. |
| [10440](https://github.com/baidu/amis/issues/10440) | combo组件多选模式下，在使用拼接符时会无限增加记录。 | 源码现存(高确信) | Combo.tsx:1363-1364 and 1716-1717 split flat string value by delimiter unconditionally; typing ',' grows item list. |
| [10358](https://github.com/baidu/amis/issues/10358) | tabs 在 form 中使用，如果 tabs 使用 source 会出现 tab 切换无法正常获取到值 | 源码现存(高确信) | Tabs.tsx:348-355 and 492-499 early-return value sync whenever source is set; tab value never written to form. |
| [10329](https://github.com/baidu/amis/issues/10329) | combo中select配置unique以及autoComplete之后，select进行搜索之后新增按钮会消失 | 源码现存(高确信) | combo.ts:58-78 addable counts item.items[0].options; autoComplete replaces options so total shrinks and isFull hides add… |
| [10114](https://github.com/baidu/amis/issues/10114) | Combo 组合 多层嵌套时各层级${index}无法区分 | 源码现存(高确信) ✅已修复(本轮) | Combo.tsx:1205 extendObject(data,{index,__index:index,...data}); trailing ...data lets outer index override combo index. |
| [10111](https://github.com/baidu/amis/issues/10111) | 表单校验 | 源码现存(高确信) | form.ts:622-667 FormStore.validate iterates only self.items; a service-loaded nested form is a separate store, so outer … |
| [10066](https://github.com/baidu/amis/issues/10066) | 表单项description有变量时，变量值改变后该表单项的description不会更新 | 源码现存(高确信) | Item.tsx:2309-2329 shouldComponentUpdate only checks detectProps (list 2157-2231); 'data' absent so raw ${select} descri… |
| [5923](https://github.com/baidu/amis/issues/5923) | 如果表单包含chained-select 则提交完后重置表单  还是会留下组件选项 | 源码现存(高确信) ✅已修复(本轮) | packages/amis/src/renderers/Form/ChainedSelect.tsx:160 early-returns when value empty, leaving stale this.state.stack se… |
| [5822](https://github.com/baidu/amis/issues/5822) | 表单项validations不支持模板字符串 | 源码现存(高确信) | packages/amis-core/src/utils/validations.ts:646 str2rules parses only string/object; wrapControl.tsx:149 reads raw $sche… |
| [5540](https://github.com/baidu/amis/issues/5540) | 当表单同时含有api、initApi接口且有初始值且部分字段配置visibleOn时，该部分字段clearValueOnHidden 属性配置后不生效 | 源码现存(高确信) | packages/amis-core/src/renderers/wrapControl.tsx:596 clearValueOnHidden cleared only in disposeModel; initially-invisibl… |
| [4876](https://github.com/baidu/amis/issues/4876) | ActionType的required 从 一个1.10.2起引入，包括1.10.2，2.0.0, 2.0.2 里都只检查非空，不继续检查其他定义好的规则了 | 源码现存(高确信) ✅已修复(本轮) | packages/amis-core/src/store/formItem.ts:520 uses customRules ? str2rules(customRules) : self.rules (replace, not merge)… |
| [4202](https://github.com/baidu/amis/issues/4202) | button 配一个 enter 的快捷键，form表单没配置api，光标停留在input-text输入框中，按enter无效，光标停留在input-text输… | 源码现存(高确信) | packages/amis/src/renderers/Action.tsx:345 hotkeys(hotKey, cb) uses default hotkeys-js filter which ignores INPUT/TEXTAR… |
| [4055](https://github.com/baidu/amis/issues/4055) | form表单initApi，服务端返回的data中包含no、status字段时，客户端处理异常 | 源码现存(高确信) ✅已修复(本轮) | packages/amis-core/src/utils/api.ts:475-477 maps business field 'no' to status; api.ts:495 ok = (status==0), so data con… |
| [21264](https://github.com/baidu/amis/issues/21264) | 使用form上传文件流的，选了一个文件，然后编辑了本地文件，然后在点提交就会报错 | 源码待定(需复现) | Upload error after local file edit needs runtime repro; no obvious defect in InputFile source. |
| [14059](https://github.com/baidu/amis/issues/14059) | combo下的service数据域污染问题 | 源码待定(需复现) | Combo/service scope pollution requires runtime repro; no clear isolation defect in source. |
| [12216](https://github.com/baidu/amis/issues/12216) | bug: conditions组合条件组件，非内嵌模式，脱拽排序报错 | 源码现存(高确信) ✅已修复(本轮) | condition-builder/index.tsx handleDragDrop 读取 `this.props.value/onChange`，非内嵌 Picker 下拿到的是未含草稿的旧值导致排序丢失；改为拖拽开始时记录当前 value/onChange（同步 PR #21519） |
| [12185](https://github.com/baidu/amis/issues/12185) | 【bug】使用下拉框开启[可编辑 or 可创建], 设置配置新增表单无法保存 amis 6.13.0 | 源码待定(需复现) | Select creatable/editable save flow spans amis-ui Select/Selection; no concrete defect located. Needs repro. |
| [12079](https://github.com/baidu/amis/issues/12079) | BUG: 文本组件设置全局变量为默认值，切换为预览状态不显示 | 源码待定(需复现) | Global-variable value expression in static preview; no obvious source handling located. Needs repro. |
| [12020](https://github.com/baidu/amis/issues/12020) | 弹窗里公式变量获取不到form表单 | 源码待定(需复现) | Dialog data scope/formula resolution for new dialog action not clearly addressed in source; needs runtime repro. |
| [11848](https://github.com/baidu/amis/issues/11848) | 6.11.0升级到6.12.0后表单的快速编辑按钮不显示 | 源码待定(需复现) | Quick-edit display depends on Table/QuickEdit flow and version; no clear regression in current source. Needs runtime rep… |
| [11583](https://github.com/baidu/amis/issues/11583) | 严重bug Cannot read properties of undefined (reading 'error')  6.8 升级到 6.10，老版本1.x… | 源码待定(需复现) | No bare `.error` read on undefined found; api.ts:478 guards data.hasOwnProperty('error'). Needs backend payload/repro. |
| [11070](https://github.com/baidu/amis/issues/11070) | 使用 dialog 给外部表单设置数据时候, 数组设置空数据时会遇到报错 [mobx-state-tree] You are trying to read or… | 源码待定(需复现) | Mobx-state-tree 'no longer part of state tree' error is lifecycle/runtime; no static isAlive guard evident at Form.tsx:1… |
| [10985](https://github.com/baidu/amis/issues/10985) | combo删除按钮二次确认，未点击确认就已经删除 | 源码待定(需复现) | Combo.tsx:744-751 confirm only runs when deleteApi is effective; schema truncated so cannot confirm deleteApi configured… |
| [10958](https://github.com/baidu/amis/issues/10958) | 在@FormItem渲染器下自定义组件报错，换成@Renderer就正常 | 源码待定(需复现) | wrapControl.tsx:197 calls rootStore.addStore; RootStoreContext supplied by WithRootStore.tsx:44. Custom-component usage … |
| [10893](https://github.com/baidu/amis/issues/10893) | JSONSchema 远程获取schema提交表单时，首先没有按照name传参，其次传参数带上了远程获取的schema | 源码待定(需复现) | JSONSchema.tsx:43 sourceField:'schema' maps fetched schema into form value; correct submit filtering unclear. |
| [10578](https://github.com/baidu/amis/issues/10578) | editor的bug，input-tree组件，配置节点的新增、编辑表单弹窗，表单的部分内容无法保存（例如事件、外观配置等） | 源码待定(需复现) | Editor input-tree node dialog config persistence lives in amis-editor; requires runtime repro of save/reopen. |
| [10531](https://github.com/baidu/amis/issues/10531) | 条件组件，里面是一个且的条件下，有值，表单校验位空：bug | 源码待定(需复现) | ConditionBuilder.tsx:159-184 validate() inspects value.children/op/right; no schema given to reproduce false-empty resul… |
| [10458](https://github.com/baidu/amis/issues/10458) | 6.5.0版本多tab选项卡内dialog弹出的表单中默认的“确认”和“取消”被disable | 源码待定(需复现) | Form.tsx:2090 btnDisabled=disabled//form.loading//form.validating; nested multi-tab dialog regression needs runtime repr… |
| [10452](https://github.com/baidu/amis/issues/10452) | 弹框中表单包含级联模式的select下拉框异常 | 源码待定(需复现) | ChainedSelect.tsx:368-410 has popOverContainer/modal-container handling; dialog cascade anomaly needs runtime repro. |
| [9808](https://github.com/baidu/amis/issues/9808) | 增删改查的表单在点击搜索后点击新增的面板中的控件默认值有问题 | 源码待定(需复现) | No static handling found isolating CRUD filter data from add-form defaults; depends on runtime data scope. |
| [9623](https://github.com/baidu/amis/issues/9623) | select autoComplete 在 form 设置了 initApi 的时候不会自动加载 | 源码待定(需复现) | Select.tsx:209-223 and 351-357 guard autoComplete reload via isApiOutdated/init hook; form initApi interaction needs run… |
| [9490](https://github.com/baidu/amis/issues/9490) | combo内嵌套input-rich-text,拖动元素改变排序后，富文本框会被清空 | 源码待定(需复现) | Combo.tsx:1119-1156 drag onEnd reorders value+keys but no rich-text preservation code; requires runtime repro. |
| [9409](https://github.com/baidu/amis/issues/9409) | Combo InputGroup 组件联动不生效 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputGroup.tsx:218 filters children by getExprProperties(item,data); combo subform reac… |
| [9319](https://github.com/baidu/amis/issues/9319) | 采用receiver文件上传后表单自动退出 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputFile.tsx:944 onChange after upload; dialog auto-close trigger is event/action-leve… |
| [8861](https://github.com/baidu/amis/issues/8861) | clearValueOnHidden在combo嵌套时失效 | 源码待定(需复现) | packages/amis-core/src/renderers/wrapControl.tsx:596 clearValueOnHidden deleteValueByName on dispose; nested combo propa… |
| [8659](https://github.com/baidu/amis/issues/8659) | 同一个表单校验，出现多次弹框提示 | 源码待定(需复现) | packages/amis-core/src/store/form.ts:556 per-store toast throttle (since 2022); nested combo stores may still multi-toas… |
| [8168](https://github.com/baidu/amis/issues/8168) | form表单 设置本地缓存后 重置按钮重置的是最后一次的缓存内容，并不是初始内容或者空内容 | 源码待定(需复现) | packages/amis-core/src/store/form.ts:766-771 reset restores pristine; :820 persist load uses updateData not pristine. |
| [7894](https://github.com/baidu/amis/issues/7894) | 使用service 组件实现动态渲染表单项时，设置columnCount显示异常 | 源码待定(需复现) | packages/amis-core/src/renderers/Form.tsx:2152,2169 columnCount applies Form--column CSS; service-wrapped controls layou… |
| [7359](https://github.com/baidu/amis/issues/7359) | select 组件在 combo 内 指定 labelField 和 valueField 时，第二个下拉框为空 | 源码待定(需复现) | Select/combo option labelField/valueField fallback behavior not statically conclusive; needs runtime repro. |
| [6484](https://github.com/baidu/amis/issues/6484) | JSON-SCHEME这个组件在做必填校验时不生效 | 源码待定(需复现) | packages/amis/src/renderers/Form/JSONSchema.tsx:62 validate delegates to control; json-schema/Object.tsx:272 only checks… |
| [6213](https://github.com/baidu/amis/issues/6213) | InputKV 键值对，value值已经自定义为input-number类型，从表单上http发出去，后端接收到的value还是字符串 | 源码待定(需复现) | packages/amis/src/schemaExtend.ts:94 valueType sets item type; InputNumber.tsx:365 emits number, reported string needs r… |
| [6065](https://github.com/baidu/amis/issues/6065) | select组件人员点选与form组件api结合使用时，select组件内source api接口中拿不到form表单中的字段值 | 源码待定(需复现) | packages/amis-core/src/renderers/Options.tsx:1472 strictMode:false is long-standing; source-vs-form-data timing needs ru… |
| [5619](https://github.com/baidu/amis/issues/5619) | 使用富文本的对话框内表单,多次弹出时发生错误 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputRichText.tsx:398 tinymce plugin loading; TypeError inside tinymce.js, vendor/versi… |
| [5575](https://github.com/baidu/amis/issues/5575) | Tabs的选项卡片中，内嵌一个Combo，动态数据回显异常 | 源码待定(需复现) | packages/amis/src/renderers/Tabs.tsx:262 mountOnEnter:true lazy-mounts inactive tabs; combo回显 failure needs runtime repr… |
| [5542](https://github.com/baidu/amis/issues/5542) | actionType 为 clear 或 clear-and-submit 时会带上数据域中的数据 | 源码待定(需复现) | packages/amis-core/src/store/form.ts:779-794 clear resets only named item values; super/data-domain carry-over into subm… |
| [5319](https://github.com/baidu/amis/issues/5319) | 在form类型的页面，grid内部的输入组件，无法被disabled | 源码待定(需复现) | packages/amis/src/renderers/Grid.tsx:232-237 forwards disabled to children; form-level disabled interaction requires run… |
| [5195](https://github.com/baidu/amis/issues/5195) | autoGenerateFilter自动生成的查询表单，select的source出现错误 | 源码待定(需复现) | packages/amis/src/renderers/Table/AutoFilterForm.tsx:60-76 searchable schema spread per column; source/options caching c… |
| [5111](https://github.com/baidu/amis/issues/5111) | url中的参数作为表单项的默认值，无法被清除 | 源码待定(需复现) | packages/amis-core/src/store/form.ts:779-794 clear sets item.resetValue only; url-param/super-data interplay requires ru… |
| [5101](https://github.com/baidu/amis/issues/5101) | 表单提交数据给CRUD组件，如果在CRUD外包裹一个service，功能就不可用了 | 源码待定(需复现) | packages/amis-core/src/Scoped.tsx:172-193 getComponentByName searches own components then parent only; nested service sc… |
| [5060](https://github.com/baidu/amis/issues/5060) | 接收适配器再次调接口payload回显form有问题 | 源码待定(需复现) | packages/amis-core/src/utils/api.ts:514-520 responseData/dataMapping applied per response; user adaptor does async XHR, … |
| [5027](https://github.com/baidu/amis/issues/5027) | sdk（2.0.2/2.1.0）表单项设置样式失效 | 源码待定(需复现) | packages/amis-core/src/renderers/Item.tsx:639-646 labelClassName applied to label; utility class vs Form-label specifici… |
| [4907](https://github.com/baidu/amis/issues/4907) | combo tabs模式下 tab标签标题过长导致删除按钮无法点击 | 源码待定(需复现) | packages/amis-ui/scss/components/form/_combo.scss:319-323 word-break:break-all on tab link; delete-button overlap needs … |
| [4042](https://github.com/baidu/amis/issues/4042) | 项目升级至 React 18.0 后，form 组件设置 initApi，表单内的 select 组件的 autoComplete 无法正常初始化，React … | 源码待定(需复现) | packages/amis/src/renderers/Form/Select.tsx:213-216 autoComplete lazy-load/effect logic; React 18 init ordering not stat… |
| [4024](https://github.com/baidu/amis/issues/4024) | 表单使用Combo组合后，会额外提交非表单数据 | 源码待定(需复现) | packages/amis/src/renderers/Form/Combo.tsx:2025 sub-form onChange emits sub-form values; no filtering by item names visi… |
| [2010](https://github.com/baidu/amis/issues/2010) | 嵌套combo没有实时渲染数据域的数据 | 源码待定(需复现) | packages/amis/src/renderers/Form/Combo.tsx:1226 memoizedFormatValue syncs data domain only when strictMode!==false or sy… |

### Select/下拉选择 （56 条）

| # | 标题 | 验证结论 | 源码证据 / 备注 |
| --- | --- | --- | --- |
| [11639](https://github.com/baidu/amis/issues/11639) | Select 通过menuTpl实现多行option，option被遮挡 | 源码现存(高确信) | Select.tsx:456 itemHeight fixed (32); option container not auto-sized for menuTpl |
| [11314](https://github.com/baidu/amis/issues/11314) | select组件搜索后，下拉选项顺序错乱 | 源码现存(高确信) ✅已修复(本轮) | Select.tsx:968-974 filterOption=defaultFilterOption uses matchSorter ranking |
| [10359](https://github.com/baidu/amis/issues/10359) | select的source是表达式时，数据域发生变化后已选值不会自动清空 | 源码现存(高确信) | packages/amis-ui/src/components/Select.tsx:466-482 |
| [9295](https://github.com/baidu/amis/issues/9295) | picker组件的嵌套crud模式多选时能否支持下选中节点时不要自动把子节点自动选中 | 源码现存(高确信) | packages/amis/src/renderers/Form/Picker.tsx (no cascade/autoCheckChildren prop) |
| [9200](https://github.com/baidu/amis/issues/9200) | picker组件回显不能根据id映射name | 源码现存(高确信) | packages/amis/src/renderers/Form/Picker.tsx:246-263 |
| [21186](https://github.com/baidu/amis/issues/21186) | 6.13.0 picker组件选择后再点击选择器的空白处，是输入光标没有触发弹窗（在线文档演示也有这个问题） | 源码待定(需复现) | Picker.tsx focus/click handling not isolating blank click |
| [14310](https://github.com/baidu/amis/issues/14310) | 【BUG】Picker 弹窗搜索与选中事件冲突 | 源码待定(需复现) | Picker.tsx:69 close() on interaction |
| [12212](https://github.com/baidu/amis/issues/12212) | 居右展示抽屉弹框中如有下拉框，点击后会居左 | 源码待定(需复现) | drawer + select popover positioning, popOverContainer set |
| [12161](https://github.com/baidu/amis/issues/12161) | bug: (频繁偶现)select 接口联动不触发 刷新页面重新操作恢复 | 源码待定(需复现) | select interface linkage race, no specific handler |
| [12127](https://github.com/baidu/amis/issues/12127) | TabsTransfer 组合穿梭器搜索有BUG | 源码待定(需复现) | TabsTransfer search path not isolated |
| [12055](https://github.com/baidu/amis/issues/12055) | 结果面板跟随模式 resultListModeFollowSelect  设置为true 右侧已选项无法下拉 | 源码待定(需复现) | Transfer.tsx:245 resultListModeFollowSelect handled in render |
| [12019](https://github.com/baidu/amis/issues/12019) | crud里的勾选数据,然后点击按钮触发broadcast后,无法在event.data里获取selectedItems,以前是可以 | 源码待定(需复现) | crud broadcast/selectedItems, unrelated to Select |
| [12013](https://github.com/baidu/amis/issues/12013) | 富文本工具栏 选择 formatselect 等无效 | 源码待定(需复现) | input-rich-text/tinymce, not in select source |
| [11991](https://github.com/baidu/amis/issues/11991) | Select控件下拉框大小配置不生效 | 源码待定(需复现) | Form/Select.tsx:626,785 overlay prop passed to popover |
| [11923](https://github.com/baidu/amis/issues/11923) | 当 dropwodn-button 遇到 each 永远只能显示一个下拉菜单 | 源码待定(需复现) | dropdown-button + each rendering, unrelated to Select.tsx |
| [11851](https://github.com/baidu/amis/issues/11851) | 级联组件nested-select搜索结果不带路径 | 源码待定(需复现) | Cascader.tsx:170 flattenTreeWithLeafNodes flattens for search |
| [11627](https://github.com/baidu/amis/issues/11627) | picker设置了默认值时的bug | 源码待定(需复现) | Picker.tsx default-value path not isolated |
| [11381](https://github.com/baidu/amis/issues/11381) | Transfer 组件 searchapi 搜索的数据，右侧已选项无法正常反显 Label | 源码待定(需复现) | Transfer.tsx:287 value2array resolves label via options; no visible search-result merge |
| [10860](https://github.com/baidu/amis/issues/10860) | select组件，全选问题 | 源码待定(需复现) | Select.tsx:968-974 filterOption uses matchSorter; no special-char escaping for check-all scope |
| [10775](https://github.com/baidu/amis/issues/10775) | select在modal中，如果配置popOverContainerSelector：body，下拉框内容被modal遮挡 | 源码待定(需复现) | packages/amis-ui/src/components/Select.tsx:1242-1269 |
| [10650](https://github.com/baidu/amis/issues/10650) | 下拉input边框不显示 | 源码待定(需复现) | n/a |
| [10609](https://github.com/baidu/amis/issues/10609) | 组件 Picker 列表选择器  为树形结构时 无法正确选中子项菜单 | 源码待定(需复现) | n/a |
| [10176](https://github.com/baidu/amis/issues/10176) | tree-select autoComplete Bug | 源码待定(需复现) | packages/amis/src/renderers/Form/TreeSelect.tsx:466-493,745 |
| [10074](https://github.com/baidu/amis/issues/10074) | 【6.3.0】下拉展示内容错位问题 | 源码待定(需复现) | n/a |
| [10049](https://github.com/baidu/amis/issues/10049) | 6.3.0版本Picker 列表选择器树形单选选中不了非叶子节点 | 源码待定(需复现) | n/a |
| [9375](https://github.com/baidu/amis/issues/9375) | Picker组件弹出列表为嵌套懒加载模式时，弹出列表后展开节点时没有自动勾选上字段值中包含的选项 | 源码待定(需复现) | n/a |
| [9314](https://github.com/baidu/amis/issues/9314) | picker 中 tree的层级超过两层且存在某个节点的 "children": null时，当选中了该节点，编辑状态下 该节点显示 undefined | 源码待定(需复现) | n/a |
| [9268](https://github.com/baidu/amis/issues/9268) | 移动端 select组件 上下滑动时 如果动画未加载完 则无法选中当前值 | 源码待定(需复现) | n/a |
| [9203](https://github.com/baidu/amis/issues/9203) | 下拉菜单DropDownButton中的下载按钮Button弹不出文件另存对话框 | 源码待定(需复现) | n/a |
| [9171](https://github.com/baidu/amis/issues/9171) | input-text组件添加了options后,放在Dialog和Drawer中在手机端无法选中下拉选项 | 源码待定(需复现) | n/a |
| [9159](https://github.com/baidu/amis/issues/9159) | TreeSelect组件设置labelField,hover不显示label信息 | 源码待定(需复现) | packages/amis/src/renderers/Form/TreeSelect.tsx:657-669 |
| [9116](https://github.com/baidu/amis/issues/9116) | transfer-picker中左侧的选项大概超过100个时样式异常，label显示不全。 | 源码待定(需复现) | n/a |
| [8805](https://github.com/baidu/amis/issues/8805) | crud组件的行内使用input-number组件修改行数据时selectedItems的值变化有bug | 源码待定(需复现) | n/a |
| [8692](https://github.com/baidu/amis/issues/8692) | NestedSelect控件在amis3.5.2版本下显示不正常 | 源码待定(需复现) | n/a |
| [8199](https://github.com/baidu/amis/issues/8199) | Transfer 穿梭器添加分页功能后，结果面板中的数据就无法显示了 | 源码待定(需复现) | packages/amis-ui/src/components/Transfer.tsx:85,177 |
| [8024](https://github.com/baidu/amis/issues/8024) | 富文本组件tinymce相关报错，TypeError: Cannot read properties of undefined (reading 'select… | 源码待定(需复现) | n/a |
| [7510](https://github.com/baidu/amis/issues/7510) | picker组件,不加入value时, 有分页效果. 加入value后, 分页参数没有添加在url中, 无分页效果 | 源码待定(需复现) | Picker pagination param binding with preset value not statically provable |
| [7473](https://github.com/baidu/amis/issues/7473) | 移动端模式下 select 组件的 autocomplete不显示搜索框 | 源码待定(需复现) | Select.tsx:958,1144 mobileUI branch; autocomplete search box in mobile not verifiable |
| [7407](https://github.com/baidu/amis/issues/7407) | drawer组件中如果嵌套了select组件，在移动端会出现无法确认的情况 | 源码待定(需复现) | Drawer+select mobile close handling not found; mobile UI branch only (Select.tsx:1225) |
| [6626](https://github.com/baidu/amis/issues/6626) | tabs-transfer-picker通过deferApi动态加载不同tab，当树节点存在相同value时，树展开异常 | 源码待定(需复现) | TabsTransfer/Transfer tree node keying with duplicate values not inspectable statically |
| [6491](https://github.com/baidu/amis/issues/6491) | picker组件内嵌模式，从列表删除非首页的项，不会更新保存 | 源码待定(需复现) | Picker embed delete/commit logic not statically provable |
| [6428](https://github.com/baidu/amis/issues/6428) | select组件使用遇到问题 | 源码待定(需复现) | Select value handling does not show special-char splitting; autofill path not locatable |
| [5892](https://github.com/baidu/amis/issues/5892) | tree-select设置多选以后，没有value的节点（禁止选择）也可以选择了 | 源码待定(需复现) | TreeSelection.tsx:93 only guards disabled; Tree.tsx:628,638 child.value!=='undefined' hack for autoCheck |
| [5710](https://github.com/baidu/amis/issues/5710) | Picker 列表选择器回显数据异常，版本：2.4.0 | 源码待定(需复现) | Picker.tsx:19,45,102 use valueField/labelField; echo binding not statically provable |
| [5346](https://github.com/baidu/amis/issues/5346) | tree-select 懒加载，展开一个懒加载节点时，其它已加载过的所有的懒加载节点会同时自动展开 | 源码待定(需复现) | Tree.tsx:423-451 defer load keyed per node (deferField/loaded) but expand-all regression not provable |
| [5281](https://github.com/baidu/amis/issues/5281) | pickerSchema的搜索回显和重复选择问题 | 源码待定(需复现) | Picker.tsx:102,19 handle valueField; echo/dup-select depends on runtime state |
| [5122](https://github.com/baidu/amis/issues/5122) | picker的内嵌模式，选中值会丢失，非内嵌模式不会丢 | 源码待定(需复现) | Picker embed value persistence not statically provable (Picker.tsx:45 valueField only) |
| [5080](https://github.com/baidu/amis/issues/5080) | NestedSelect在移动端选中之后无法获取值 | 源码待定(需复现) | NestedSelect mobile value capture not inspectable; mobile UI branch exists |
| [5014](https://github.com/baidu/amis/issues/5014) | Picker 列表选择器  取消值拼接 页面卡死奔溃  必现   bug   | 源码待定(需复现) | Picker.tsx:102 passes valueField; crash with value-concat off not statically reproducible |
| [4863](https://github.com/baidu/amis/issues/4863) | sdk方式select的overflowTagPopover不生效 | 源码待定(需复现) | Select.tsx:817-825 implements overflowTagPopover; SDK-specific failure is environmental |
| [4843](https://github.com/baidu/amis/issues/4843) | TreeSelect多选搜索问题 | 源码待定(需复现) | Select.tsx:758 clearSearchValue only bound to clear button (1165); no auto-clear on select found |
| [4771](https://github.com/baidu/amis/issues/4771) | transfer-picker失效 | 源码待定(需复现) | TransferPicker.tsx exists; click handling not statically provable as fixed |
| [4559](https://github.com/baidu/amis/issues/4559) | amis1.9.0 平板端 横屏Select组件下拉不能滑动 | 源码待定(需复现) | No tablet/landscape-specific scroll handling found; only is-mobile class (Select.tsx:1144) |
| [4065](https://github.com/baidu/amis/issues/4065) | 使用tree-select 组件时，设置了cascade为true（当选中父节点时不自动选择子节点）时，无论选个节点，都会全选上！ | 源码待定(需复现) | Tree.tsx:602-699 cascade logic matches documented behavior; cascade=true still adds children (664) |
| [3393](https://github.com/baidu/amis/issues/3393) | 160版本下拉框条目过多在移动端展示不全无法选择 | 源码待定(需复现) | condition-builder/popover rendering not inspectable for mobile scroll; Select.tsx:1225 only switches UI mode |
| [3252](https://github.com/baidu/amis/issues/3252) | 移动端的 Select 选择器 选项过多无法下拉 | 源码待定(需复现) | Select.tsx:1225,1289 (mobileUI branch exists) but scroll behavior of long option lists on mobile not verifiable statical… |

### Input/输入 （50 条）

| # | 标题 | 验证结论 | 源码证据 / 备注 |
| --- | --- | --- | --- |
| [12253](https://github.com/baidu/amis/issues/12253) | input-file组件通过receiver自定义接口的时候默认 /api/upload/startChunk | 源码现存(高确信) ✅已修复(本轮) | InputFile.tsx:140-142,329,854-858 startChunkApi default /api/upload/startChunk |
| [11801](https://github.com/baidu/amis/issues/11801) | inputTree默认收起配置无效 | 源码现存(高确信) | packages/amis-ui/src/components/Tree.tsx:410 |
| [11729](https://github.com/baidu/amis/issues/11729) | InputImage组件，回现时，点击查看大图，使用的还是perview的地址 | 源码现存(高确信) ✅已修复(本轮) | packages/amis/src/renderers/Form/InputImage.tsx:945-950 |
| [11641](https://github.com/baidu/amis/issues/11641) | 组件数字输入框 展示不全大数字，或者变成科学计数法 | 源码现存(高确信) | packages/amis/src/renderers/Form/InputNumber.tsx:381,515,520 |
| [8259](https://github.com/baidu/amis/issues/8259) | quickEdit 中 input-image 开启 multiple 后 hideUploadButton 失效 | 源码现存(高确信) | packages/amis/src/renderers/Form/InputImage.tsx:2010 |
| [4201](https://github.com/baidu/amis/issues/4201) | 光标在输入框，按钮的快捷键无效，光标不在输入框时，按钮的快捷键有效  | 源码现存(高确信) | packages/amis/src/renderers/Action.tsx:345 |
| [3889](https://github.com/baidu/amis/issues/3889) | InputTree懒加载不显示添加/编辑控件 | 源码现存(高确信) | packages/amis-ui/src/components/Tree.tsx:1450 |
| [21268](https://github.com/baidu/amis/issues/21268) | input-city控件选择重庆下的县市后报错 | 源码待定(需复现) | CityArea.tsx:216-226 db.district[province][city] lookup |
| [12254](https://github.com/baidu/amis/issues/12254) | InputFile 文件上传 组件中的 downloadUrl 属性 返回结果异常 | 源码待定(需复现) | InputFile.tsx:627-636 downloadUrl template via handleApi |
| [12208](https://github.com/baidu/amis/issues/12208) | input-excel 无法导入excel文件，出现错误 hook.js:608 Excel parsing error: Error: Can't read … | 源码待定(需复现) | InputExcel.tsx:483-501 FileReader.readAsArrayBuffer then XLSX.read |
| [12204](https://github.com/baidu/amis/issues/12204) | input-text自动补全和单选的placeholder文字部分点击光标无法移入，input-text的多选可以点击光标可以移入 | 源码待定(需复现) | InputBox.tsx:129-140 Input rendered with placeholder |
| [12045](https://github.com/baidu/amis/issues/12045) | Bug: input-text 加 options 和 placeholder 一起使用，placeholder文字区域不能点击 | 源码待定(需复现) | InputBox.tsx:129-140 Input rendered with placeholder |
| [11996](https://github.com/baidu/amis/issues/11996) | input-file选择完文件后，有时候会卡在那没响应 | 源码待定(需复现) | InputFile.tsx:854-873 upload fn dispatch |
| [11953](https://github.com/baidu/amis/issues/11953) | InputRichText统计的字符有问题 | 源码待定(需复现) | RichText.tsx:16 imports froala char_counter plugin |
| [11925](https://github.com/baidu/amis/issues/11925) | InputFile 组件在form组件内没有上传按钮，在form组件外正常显示。 | 源码待定(需复现) | InputFile.tsx:1484-1509 select Button always rendered regardless of form context |
| [11646](https://github.com/baidu/amis/issues/11646) | inputree defer的节点 特定模式 value不正确 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTree.tsx |
| [11600](https://github.com/baidu/amis/issues/11600) | 文件上传组件有bug | 源码待定(需复现) | packages/amis/src/renderers/Form/InputFile.tsx:1196 |
| [11347](https://github.com/baidu/amis/issues/11347) | 输入框配置 placeholder: "Content" 被显示成了中文“内容” | 源码待定(需复现) | packages/amis/src/renderers/Form/InputText.tsx:217 |
| [11259](https://github.com/baidu/amis/issues/11259) | filterable multiple 模式下， number 类型枚举过滤会导致页面崩溃 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx / BaseSelection |
| [11036](https://github.com/baidu/amis/issues/11036) | 文本框点AddOn之后，添加了前或后附加按钮。但是关闭这个AddOn之后，附加按钮不消失。 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputText.tsx:1202 |
| [11001](https://github.com/baidu/amis/issues/11001) | input-kv 组件数据异常 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputKV.tsx |
| [10994](https://github.com/baidu/amis/issues/10994) | checkboxes组件，同时配置"optionType": "button"，"static": true，会报错 | 源码待定(需复现) | packages/amis/src/renderers/Form/Checkboxes.tsx:338 |
| [10990](https://github.com/baidu/amis/issues/10990) | input-array增加了clearValueOnHidden属性，隐藏后再显示，值会被清空 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputArray.tsx |
| [10873](https://github.com/baidu/amis/issues/10873) | inputTree配置懒加载的行，鼠标hover后按钮不会展示 | 源码待定(需复现) | packages/amis-ui/src/components/Tree.tsx:1450 |
| [10689](https://github.com/baidu/amis/issues/10689) | 城市选择器input-city编辑问题 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputCity.tsx:392 |
| [10635](https://github.com/baidu/amis/issues/10635) | input-image类型字段在手机端多选状态下上传图片无法上传图片 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputImage.tsx (mobile) |
| [10507](https://github.com/baidu/amis/issues/10507) | 复制带分隔符的文本到inputTag，max属性和去重会失效 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTag.tsx:239 |
| [9985](https://github.com/baidu/amis/issues/9985) | 【6.2.2】无法通过 url 带参传递给 input-text 组件进行赋值 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputText.tsx |
| [9932](https://github.com/baidu/amis/issues/9932) | [bug]InputTree 组件，设置addControls后，新增事件产生的数据缺少parent信息 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTree.tsx:334 |
| [9527](https://github.com/baidu/amis/issues/9527) | 通过数据接口获取值的单选框，在设置默认值后无法再选择其他选项 | 源码待定(需复现) | packages/amis/src/renderers/Form/Radios.tsx |
| [9465](https://github.com/baidu/amis/issues/9465) | inputTree展开层级后高度不会自适应 | 源码待定(需复现) | packages/amis-ui/src/components/Tree.tsx:1706 |
| [9354](https://github.com/baidu/amis/issues/9354) | "name": "model_operator[0].intranet_op", 导致列开关不受控 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx |
| [9278](https://github.com/baidu/amis/issues/9278) | textarea使用static: true时格式丢失 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputText.tsx (Textarea static) |
| [8690](https://github.com/baidu/amis/issues/8690) | InputImage   上传图片之后，然后其他联动的选项切换之后这个图片大小的限制就变了，但是这个图片的大小校验就不会再次触发了 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputImage.tsx:~937 |
| [8144](https://github.com/baidu/amis/issues/8144) | 手机端多行文本框显示异常 | 源码待定(需复现) | packages/amis-ui/src/components/Textarea.tsx |
| [7691](https://github.com/baidu/amis/issues/7691) | 已经给input-file组件设置了"joinValues": false，但是在事件中不能通过event.data.file获取到接口返回的全部字段,只能获取… | 源码待定(需复现) | packages/amis/src/renderers/Form/InputFile.tsx:366 |
| [7651](https://github.com/baidu/amis/issues/7651) | Action组件作为容器组件时，里面包裹的input-tree的话，无法通过点击勾选框选中选项 | 源码待定(需复现) | packages/amis/src/renderers/Action.tsx |
| [7441](https://github.com/baidu/amis/issues/7441) | InputKV在指定keySchema的情况下，如何支持自定义key的输入，且不受keySchema的数量限制 | 源码待定(需复现) | packages/amis/src/renderers/Form/Combo.tsx |
| [6667](https://github.com/baidu/amis/issues/6667) | input-file带初始化数据时，编辑后原有数据丢失 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputFile.tsx:385 |
| [6091](https://github.com/baidu/amis/issues/6091) | addOn 里面的label内容， 一旦有数据后，不会再随着数据变化而变化 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputText.tsx:1218 |
| [5531](https://github.com/baidu/amis/issues/5531) | Crud组件  即时保存 quickSaveItemApi字段 使用input-text  按一下键盘 还没有输入完成就会保存 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx |
| [5513](https://github.com/baidu/amis/issues/5513) | InputSubForm 拖拽排序有概率顺序错误 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputSubForm.tsx |
| [5091](https://github.com/baidu/amis/issues/5091) | InputKV 在quickEdit中再次更新数据时，之前的数据丢失了 | 源码待定(需复现) | packages/amis/src/renderers/Form/Combo.tsx |
| [5071](https://github.com/baidu/amis/issues/5071) | [bug] 2.1.0 input-tabel 无法新增，新增按钮样式丢失, 点击新增一直闪烁。 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx |
| [5053](https://github.com/baidu/amis/issues/5053) | inputFile 开启自动上传 + 多选后, 第一次多选文件后自动上传正常. 之后再选择文件后,不自动上传. | 源码待定(需复现) | packages/amis/src/renderers/Form/InputFile.tsx:564 |
| [4929](https://github.com/baidu/amis/issues/4929) | input-city配合input-array在移动端下的问题 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputCity.tsx:33 |
| [4859](https://github.com/baidu/amis/issues/4859) | InputTree父节点值重复填充 | 源码待定(需复现) | packages/amis-ui/src/components/Tree.tsx:113 |
| [4319](https://github.com/baidu/amis/issues/4319) | 1.8 crud筛选输入框输入会连带其他字段 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx |
| [3228](https://github.com/baidu/amis/issues/3228) | inputTree懒加载初始化回显不定时失效 | 源码待定(需复现) | packages/amis-ui/src/components/Tree.tsx:427 |
| [2499](https://github.com/baidu/amis/issues/2499) | 倒计时的时候验证错误的是不应该开始倒计时 | 源码待定(需复现) | packages/amis/src/renderers/Action.tsx:308 |

### Tree/树 （14 条）

| # | 标题 | 验证结论 | 源码证据 / 备注 |
| --- | --- | --- | --- |
| [12193](https://github.com/baidu/amis/issues/12193) | 6.13版本，Input-tree在source返回两超过100后，checkbox选择无响应，滑动树后，会显示已被选择，同样场景在6.12没问题 | 源码待定(需复现) | packages/amis-ui/src/components/Tree.tsx:1642-1648 — VirtualList with itemSize=itemHeight for >100 items. |
| [12130](https://github.com/baidu/amis/issues/12130) | 6.12.0 input-tree 数据多就白屏 bug  | 源码待定(需复现) | packages/amis-ui/src/components/Tree.tsx:1639 — VirtualList for lazy-load large data. |
| [11954](https://github.com/baidu/amis/issues/11954) | inputtree组件将static设置为true后，树不展示 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTree.tsx (static prop) — static display path not inspected for tree. |
| [11818](https://github.com/baidu/amis/issues/11818) | input-tree 没有设置 heightAuto:true 的情况下 input-tree 高度无限增加 | 源码待定(需复现) | packages/amis-ui/src/components/Tree.tsx:1706-1708 — comment: virtual scroll only without heightAuto or with flexGrow. |
| [11721](https://github.com/baidu/amis/issues/11721) | tree组件严重bug,数据过多，渲染失败 | 源码待定(需复现) | packages/amis-ui/src/components/Tree.tsx:1639 — VirtualList engaged when flattenedOptions>virtualThreshold(100). |
| [11651](https://github.com/baidu/amis/issues/11651) | input-tree   "initiallyOpen": false  属性不生效 | 源码待定(需复现) | packages/amis-ui/src/components/Tree.tsx:410 — ret = initiallyOpen ? true : level < expandLevel. |
| [11649](https://github.com/baidu/amis/issues/11649) | Input-tree 数据多了无法显示 | 源码待定(需复现) | packages/amis-ui/src/components/Tree.tsx:1639 — VirtualList gating on virtualThreshold for large static options. |
| [11604](https://github.com/baidu/amis/issues/11604) | inputTree添加节点后，树结构会全部自动展开 | 源码待定(需复现) | packages/amis-ui/src/components/Tree.tsx:1449-1451 (creatable) & flattenOptions/initial unfold state. |
| [10497](https://github.com/baidu/amis/issues/10497) | input-tree 懒加载数据过多时 不会显示 | 源码待定(需复现) | packages/amis-ui/src/components/Tree.tsx:1639 — VirtualList used when list>virtualThreshold for lazy-loaded nodes. |
| [6229](https://github.com/baidu/amis/issues/6229) | input tree  指定 valueField 时 构建valuePath 重复 | 源码待定(需复现) | packages/amis-ui/src/components/Tree.tsx:486-517 — transform2NodePath builds valuePath via node[valueField] joined by se… |
| [5865](https://github.com/baidu/amis/issues/5865) | crud的嵌套模式嵌套树状的时候选中第一级时第二级不会选中 | 源码待定(需复现) | packages/amis-ui/src/components/Tree.tsx:603 — autoCheckChildren default true handles parent->child cascade. |
| [1718](https://github.com/baidu/amis/issues/1718) | tree 组件 edit 编辑完调用完editApi 接口成功之后，不会自动重新调用source接口，并且修改的值也会变为原来的， | 源码待定(需复现) | packages/amis-ui/src/components/Tree.tsx (editable/deferLoad) & InputTree.tsx — no visible post-editApi source reload in… |
| [1637](https://github.com/baidu/amis/issues/1637) | tree组件子节点选中问题 | 源码待定(需复现) | packages/amis-ui/src/components/Tree.tsx:701-715 — handleCheck uncheck branch deletes item & children, but all-children-… |
| [1567](https://github.com/baidu/amis/issues/1567) | "submitOnChange": true,这个属性升到1.1.4版无效了已经。——半年后更新：1.1.5也无效，没修复啊——仨月后更新：1.1.6版也无效，… | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTree.tsx — submitOnChange handled generically by FormItem, not tree-specific; old … |

### Dialog/Drawer （21 条）

| # | 标题 | 验证结论 | 源码证据 / 备注 |
| --- | --- | --- | --- |
| [12250](https://github.com/baidu/amis/issues/12250) | 弹窗中通过onEvent发送ajax请求时，弹窗的关闭按钮无法点击 | 源码现存(高确信) | packages/amis/src/renderers/Dialog.tsx:593 |
| [11128](https://github.com/baidu/amis/issues/11128) | actionType: 'dialog'配置data时，dialog层配的data无效 | 源码现存(高确信) | Dialog.tsx:1037-1052 action.actionType==='dialog' calls store.openDialog(data,...) passing only action data |
| [12048](https://github.com/baidu/amis/issues/12048) | actionType触发submit提交会导致dialog弹窗变成空白，然后关闭 | 源码待定(需复现) | Dialog.tsx:993-1021 confirm/submit path triggers onClose; no blank-flash guard visible |
| [12022](https://github.com/baidu/amis/issues/12022) | 配置了二次确认的按钮，其action中有dialog存在时 | 源码待定(需复现) | Action double-execution with confirm+dialog not determinable from Dialog/Drawer renderers |
| [11441](https://github.com/baidu/amis/issues/11441) | dialog组件setValue page之后，dialog弹窗读取不到最新值 | 源码待定(需复现) | Dialog.tsx:815 shouldSyncSuperStore + trackExpression support |
| [11338](https://github.com/baidu/amis/issues/11338) | 在弹框内配置确定事件，如果目标组件选择弹框外的页面上的组件，无法回显 | 源码待定(需复现) | Confirm-event echo for external target is amis-editor event-config behavior |
| [11204](https://github.com/baidu/amis/issues/11204) | drawer的close選項無效 | 源码待定(需复现) | Drawer.tsx:869-881 confirm -> tryChildrenToHandle; tryChildrenToHandle checks action.close!==false |
| [11032](https://github.com/baidu/amis/issues/11032) | 弹窗中使用crud并开启显示切换页码的功能，当点击切换页码，弹窗会消失 | 源码待定(需复现) | .has-popover CSS in amis-ui/scss/base/_common.scss; applied to inner controls not dialog root |
| [10710](https://github.com/baidu/amis/issues/10710) | 弹窗的数据，在提交的时候setValue给了page组件，再次打开的时候，弹窗没有读到数据 | 源码待定(需复现) | Dialog.tsx:815 shouldSyncSuperStore syncs when dialogOpen && data changed |
| [10422](https://github.com/baidu/amis/issues/10422) | 当编辑弹窗中添加多个list-text只能获取到一个的值 | 源码待定(需复现) | Multiple list-select handled by form/list-select, not dialog renderer |
| [10338](https://github.com/baidu/amis/issues/10338) | 点击不同按钮的dialog会发生classname被继承 | 源码待定(需复现) | Dialog.tsx:493-540 className spread from {...this.props,...store.schema} |
| [10311](https://github.com/baidu/amis/issues/10311) | 与类似golden-layout结合，每个窗口有一个独立的amis实例，很多类似弹框总是显示到第一tab里去了 | 源码待定(需复现) | Dialog.tsx:570 / Drawer.tsx:550 container={env?.getModalContainer} |
| [10110](https://github.com/baidu/amis/issues/10110) | CRUD动态列-操作列-按钮打开dialog嵌套子表CRUD数据链取值失败 BUG | 源码待定(需复现) | Dialog.tsx:768-784 nested dialog rendered; data chain via scoped context |
| [9444](https://github.com/baidu/amis/issues/9444) | 弹窗里点击按钮关闭当前弹窗并弹出新弹窗，会导致新弹窗意外关闭 | 源码待定(需复现) | Dialog.tsx:566 closeOnOutside={!store.dialogOpen && closeOnOutside} guards nested |
| [9117](https://github.com/baidu/amis/issues/9117) | CRUD控件使用【添加事件】按钮新增点事件，并配置为打开已有的编辑框，保存时报错：index.js:6 Uncaught (in promise) TypeEr… | 源码待定(需复现) | 'dialog-ref-1' string not present in packages/amis or amis-ui dialog source |
| [8933](https://github.com/baidu/amis/issues/8933) | 【bug】crud在点击下一页之后再点上一页 column下的开关 dialog确认框获取到的还是旧行的数据 | 源码待定(需复现) | Dialog.tsx:320 store.reset() on handleExited resets form data |
| [8895](https://github.com/baidu/amis/issues/8895) | 【bug】操作并下一个 功能把官方示例dialog改成drawer抽屉弹窗后失效 获取不到hasNext hasPrev | 源码待定(需复现) | Drawer.tsx:827-962 DrawerRenderer.handleAction has no 'next'/'prev' case |
| [8173](https://github.com/baidu/amis/issues/8173) | input-text组件使用autoComplete属性时 点击了选项 选项组弹框不消失 需要点击空白处才能消失 | 源码待定(需复现) | autoComplete handled in amis-ui InputBox/autoComplete (not in Dialog/Drawer) |
| [7060](https://github.com/baidu/amis/issues/7060) | drawer下配置一个button, button中配置一个dialog， 当给button配置close："xx", 点击button时，drawer和dia… | 源码待定(需复现) | Drawer.tsx:882-892 dialog action opens nested dialog without closing drawer |
| [6970](https://github.com/baidu/amis/issues/6970) | dialog嵌套锚点导航 在size为full时，弹框页面下半部分全空白 | 源码待定(需复现) | Dialog.tsx:536 render uses Wrapper with size full; anchor-nav layout not in dialog source |
| [1970](https://github.com/baidu/amis/issues/1970) | Dialog内部的状态没有受控于React state | 源码待定(需复现) | Dialog.tsx:320 handleExited only resets store on close; no re-init of internal form state on visible toggle |

### JS SDK/嵌入 （22 条）

| # | 标题 | 验证结论 | 源码证据 / 备注 |
| --- | --- | --- | --- |
| [12062](https://github.com/baidu/amis/issues/12062) | 同一个页面渲染两个amis页面，toast只会显示到后渲染的页面上 | 源码现存(高确信) | packages/amis-ui/src/components/Toast.tsx:35 `let toastRef` is a module singleton; :125 `toastRef=this`, :130 nulled on … |
| [9401](https://github.com/baidu/amis/issues/9401) | amis@2.9.0在react@18+的concurrent模式下，出现报错问题 | 源码现存(高确信) | packages/amis-core/src/renderers/Form.tsx:2442 |
| [11872](https://github.com/baidu/amis/issues/11872) | vue2 sdk官方demo 分页器被遮挡 | 源码待定(需复现) | Report targets external aisuda/vue2-amis-demo repo and a pager page-size dropdown being clipped; no amis source defect i… |
| [11730](https://github.com/baidu/amis/issues/11730) | 使用JSSDK时，主题样式无法切换 | 源码待定(需复现) | examples/embed.tsx |
| [11316](https://github.com/baidu/amis/issues/11316) | js sdk6.9.0和6.10.0 无法获取amisInstance.getComponentById(id)返回值 | 源码待定(需复现) | packages/amis-core/src/Scoped.tsx:217 |
| [11219](https://github.com/baidu/amis/issues/11219) | js sdk 6.9版本，date组件启用fromNow默认显示英文 | 源码待定(需复现) | packages/amis/src/renderers/Date.tsx:160 |
| [11096](https://github.com/baidu/amis/issues/11096) | JSDK中使用单页app组件如果录入参数是json数据会崩溃 | 源码待定(需复现) | packages/amis/src/renderers/App.tsx |
| [10847](https://github.com/baidu/amis/issues/10847) | amis升级6.6=>6.7版本后报错Renderer: `key` is not a prop. Trying to access it will resul… | 源码待定(需复现) | packages/amis-core/src/factory.tsx |
| [10576](https://github.com/baidu/amis/issues/10576) | Service schemaApi 中 url 拼接_replace出错 | 源码待定(需复现) | packages/amis-core/src/store/service.ts:420,426 |
| [10419](https://github.com/baidu/amis/issues/10419) | 6.5.0更新SDK后页面显示部分空白 | 源码待定(需复现) | sdk build |
| [9037](https://github.com/baidu/amis/issues/9037) | 通过js sdk的updateProps方法无法更新crud行数据 | 源码待定(需复现) | embed.updateProps |
| [8990](https://github.com/baidu/amis/issues/8990) | bug: JSSDK 升级到 3.5.3 之后 action 组件 target 无效 | 源码待定(需复现) | packages/amis-core/src/Scoped.tsx:34 |
| [8334](https://github.com/baidu/amis/issues/8334) | jssdk 3.4.2 debug调试工具数据不显示 | 源码待定(需复现) | DebugAction |
| [7854](https://github.com/baidu/amis/issues/7854) | 【formItem注册sdk】组件label渲染bug，（有在线demo） | 源码待定(需复现) | packages/amis-core/src/renderers/Form.tsx |
| [7134](https://github.com/baidu/amis/issues/7134) | amisScoped.getComponentById("XXXX")在3.1+不升生效 | 源码待定(需复现) | packages/amis-core/src/Scoped.tsx:217 |
| [7071](https://github.com/baidu/amis/issues/7071) | sdk在云舍主题下的action组件使用到confirmText时无法弹出确认框导致按钮点击行为无响应 | 源码待定(需复现) | theme/云舍 css |
| [5956](https://github.com/baidu/amis/issues/5956) | vue3中sdk报错 | 源码待定(需复现) | examples/embed.tsx |
| [4944](https://github.com/baidu/amis/issues/4944) | sdk 2.0.2下部分className的样式失效了? | 源码待定(需复现) | packages/amis/src/renderers/Button.tsx |
| [4939](https://github.com/baidu/amis/issues/4939) | JS SDK 多语言不生效 | 源码待定(需复现) | packages/amis/src/embed / locale |
| [4802](https://github.com/baidu/amis/issues/4802) | dateTime组件，在sdk下报错（移动端） | 源码待定(需复现) | packages/amis/src/renderers/Date.tsx |
| [2342](https://github.com/baidu/amis/issues/2342) | sdk使用模式下，app组件菜单点击不跳转 | 源码待定(需复现) | packages/amis/src/renderers/App.tsx |
| [2020](https://github.com/baidu/amis/issues/2020) | 使用JS SDK，APP模式，在移动端下，侧边栏在选择页面后不会自动折叠 | 源码待定(需复现) | packages/amis/src/renderers/App.tsx:230,363 |

### Date/日期 （28 条）

| # | 标题 | 验证结论 | 源码证据 / 备注 |
| --- | --- | --- | --- |
| [12101](https://github.com/baidu/amis/issues/12101) | 日期范围选择shortcuts中的最近7天不包含今日 | 源码现存(高确信) ✅已修复(本轮) | packages/amis-ui/src/components/DateRangePicker.tsx:169-177 |
| [11734](https://github.com/baidu/amis/issues/11734) | 日期值格式YYYY-MM-DD，DATEMODIFY后提交的格式错误 | 源码现存(高确信) | packages/amis-formula/src/evalutor.ts:1974 fnDATEMODIFY |
| [9422](https://github.com/baidu/amis/issues/9422) | Date 日期时间组件的updateFrequency不支持使用数据映射，报错Moment Timezone has no data for ${ } | 源码现存(高确信) ✅已修复(本轮) | packages/amis/src/renderers/Date.tsx:149-150 - normalizeDate.clone().tz(displayTimeZone) with no empty/unresolved guard;… |
| [12205](https://github.com/baidu/amis/issues/12205) | 日期输入组件国际化不正确 | 源码待定(需复现) | packages/amis-ui/src/components/calendar/Calendar.tsx:214-220,305 |
| [11813](https://github.com/baidu/amis/issues/11813) | timeline样式异常 | 源码待定(需复现) | n/a |
| [11682](https://github.com/baidu/amis/issues/11682) | 进入某些页面时会一直触发update，循环执行 | 源码待定(需复现) | n/a |
| [11184](https://github.com/baidu/amis/issues/11184) | 日期时间组件显示成文本框 | 源码待定(需复现) | packages/amis-ui/src/components/DatePicker.tsx:1085-1103 |
| [10993](https://github.com/baidu/amis/issues/10993) | 时间范围组件，点击确定后第一次点击其他区域，失去焦点效果失效 | 源码待定(需复现) | packages/amis-ui/src/components/DateRangePicker.tsx:779,2097 |
| [10580](https://github.com/baidu/amis/issues/10580) | input-group 包裹的 input-text 设置"validateOnChange": true, 每次值发生改变没有触发 input-group 的… | 源码待定(需复现) | packages/amis/src/renderers/Form/InputGroup.tsx:174 validate() |
| [10373](https://github.com/baidu/amis/issues/10373) | 移动端input-datetime组件设置timeConstraints无效 | 源码待定(需复现) | packages/amis-ui/src/components/DatePicker.tsx:507 - timeConstraints consumed on PC; mobile input-datetime constraints i… |
| [10360](https://github.com/baidu/amis/issues/10360) | validateApi 验证 联动数据时, 即使设置了 ``"validateOnChange": true,`` , 也只会验证第一次时候的数据 | 源码待定(需复现) | validateApi/validateOnChange linkage - runtime form behavior; not date-specific and needs repro at 3.5.2 |
| [10120](https://github.com/baidu/amis/issues/10120) | input-time类型控件值来自字段value而不是上层作用域data中字段值时，会差8小时 | 源码待定(需复现) | packages/amis-ui/src/components/DatePicker.tsx:651-658 - utc branch; input-time 8h offset with value vs parent-scope nee… |
| [10032](https://github.com/baidu/amis/issues/10032) | InputDateRange 日期范围移动端BUG | 源码待定(需复现) | packages/amis-ui/src/components/calendar/YearsView.tsx:154-155 - desktop year range is currentYear±100 (covers 1964-2133… |
| [9256](https://github.com/baidu/amis/issues/9256) | 日期范围选择器组件/日期自动跳转 | 源码待定(需复现) | packages/amis-ui/src/components/DateRangePicker.tsx:912-921 - filterDate autoInitDefaultValue; date auto-jump on time ch… |
| [9250](https://github.com/baidu/amis/issues/9250) | 日期范围会选中多个 | 源码待定(需复现) | packages/amis-ui/src/components/DateRangePicker.tsx:1032-1062 - selection state editState start/end; multi-select highli… |
| [9220](https://github.com/baidu/amis/issues/9220) | 【input-time】，当设置小时范围，在没有选中小时的时候，直接点击确定，会变成00:00 | 源码待定(需复现) | packages/amis-ui/src/components/DatePicker.tsx:507-511 - closeOnSelect gating; input-time confirm-with-empty-hour=>00:00… |
| [9185](https://github.com/baidu/amis/issues/9185) | InputDatetimeRange 首次选择时无法选择00项/日期自动跳转/最大值限制无效 | 源码待定(需复现) | packages/amis-ui/src/components/DateRangePicker.tsx:912-921 - filterDate autoInitDefaultValue; 00-select / date-jump / m… |
| [9036](https://github.com/baidu/amis/issues/9036) | 移动端InputDateRange 日期范围组件在不同版本ios显示有不同的问题 | 源码待定(需复现) | packages/amis-ui/src/components/DateRangePicker.tsx - iOS17 +1year / iOS16 zoom are Safari/WebKit rendering issues; need… |
| [6840](https://github.com/baidu/amis/issues/6840) | Cordova环境下input-date、input-datetime、input-time三个组件使用报错 | 源码待定(需复现) | packages/amis-ui/src/components/DatePicker.tsx - Cordova-specific runtime error not reproducible from source; needs Cord… |
| [5287](https://github.com/baidu/amis/issues/5287) | InputDateRange选择时间错乱 | 源码待定(需复现) | packages/amis-ui/src/components/DateRangePicker.tsx:1032-1049 - filterDate/setDate clamps to minDate; selection-order/ti… |
| [5066](https://github.com/baidu/amis/issues/5066) | amisScoped.updateProps 的 callback 不执行 | 源码待定(需复现) | amis-core scoped updateProps callback - runtime SDK behavior; not date-specific and needs SDK repro at version 2.1.0 |
| [4936](https://github.com/baidu/amis/issues/4936) | InputDate日期选择器，相对值无效 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputDate.tsx:433 - filterDate(defaultValue) resolves relative; +1days-not-applied need… |
| [4891](https://github.com/baidu/amis/issues/4891) | 项目使用了1.9.0 的 ”InputTimeRange 时间范围“ 组件内嵌模式，升级到任意最新 1.10.0， 2.0.0 无法正常加载 | 源码待定(需复现) | packages/amis-ui/src/components/DatePicker.tsx:1016 - embed branch present; InputTimeRange (time) component embed loadin… |
| [4842](https://github.com/baidu/amis/issues/4842) | InputDateRange 组件放在fieldSet中，选择弹层会宣示不全 | 源码待定(需复现) | packages/amis-ui/src/components/DateRangePicker.tsx:1308-1336 - popover/closeOnSelect; CSS clipping inside fieldSet/Coll… |
| [4841](https://github.com/baidu/amis/issues/4841) | InputDatetimeRange 有秒的情况，点击确定无法关闭选择弹层 | 源码待定(需复现) | packages/amis-ui/src/components/DateRangePicker.tsx:886-910 - confirm() closes via this.close(true); seconds-specific bl… |
| [4472](https://github.com/baidu/amis/issues/4472) | InputDatetime UTC异常 | 源码待定(需复现) | packages/amis-ui/src/components/DatePicker.tsx:651-658 - utc branch formats via moment.utc; display/jump bug with format… |
| [4279](https://github.com/baidu/amis/issues/4279) | InputDateRange 日期范围选择 移动版和pc版提交数据不统一 | 源码待定(需复现) | packages/amis-ui/src/components/DateRangePicker.tsx - no setHours(23) end-of-day logic; PC vs mobile submit-format diver… |
| [3733](https://github.com/baidu/amis/issues/3733) | 日期范围控件解析默认值错误 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputDate.tsx:433 - filterDate handles default value; comma-separated range value parsi… |

### amis-editor （63 条）

| # | 标题 | 验证结论 | 源码证据 / 备注 |
| --- | --- | --- | --- |
| [21084](https://github.com/baidu/amis/issues/21084) | 事件，执行动作，目标组件选择输入组件id，保存后刷新，再次进去绑定的事件配置面板中，组件id丢失 | 源码现存(高确信) | packages/amis-editor/src/renderer/event-control/eventControlConfigHelper.ts:388,616 and helper.tsx:211 still use __cmptI… |
| [12114](https://github.com/baidu/amis/issues/12114) | amis-editor  向前添加组件必导致错误 bug | 源码现存(高确信) | packages/amis-core/src/utils/resize-sensor.ts:214 resizeSensorV2 calls element.getBoundingClientRect() with no null guar… |
| [11897](https://github.com/baidu/amis/issues/11897) | 编辑器源码中使用amisRender渲染的schema都无法根据主题渲染 | 源码现存(高确信) | packages/amis-editor/src/renderer/event-control/index.tsx:1417; TransferTableControl.tsx:489; TimelineItemControl.tsx:41… |
| [11808](https://github.com/baidu/amis/issues/11808) | 编辑器左侧全局变量弹窗无法指定主题 | 源码现存(高确信) | packages/amis-editor/src/renderer/global-var-control/GlobalVarManagerPanel.tsx:310 ConfirmBox rendered with no theme/cla… |
| [11735](https://github.com/baidu/amis/issues/11735) | amis-eidtor 容器固定宽高时，拖拽未对 % 等单位特殊处理 | 源码现存(高确信) | packages/amis-editor/src/plugin/Container.tsx:268 drag resize hardcodes `${width}px`, no unit handling for %/em/vw/vh. |
| [11694](https://github.com/baidu/amis/issues/11694) | diff-editor 的左侧值diffValue无法动态更新 | 源码现存(高确信) | packages/amis-editor/src/plugin/Form/DiffEditor.tsx:178 diffValue only read at config time (valueFormula), no dynamic bi… |
| [11428](https://github.com/baidu/amis/issues/11428) | amis editor重做(redo)操作只能进行一次 | 源码现存(高确信) | packages/amis-editor-core/src/store/editor.ts:2289 traceableSetSchema still splices future history on every call (idx+1.… |
| [11034](https://github.com/baidu/amis/issues/11034) | editor中List2组件buildDataSchemas方法不关注root scope数据 | 源码现存(高确信) | packages/amis-editor/src/plugin/List2.tsx:574-576 only reads node.schema.source/name, never root-scope props schema. |
| [10820](https://github.com/baidu/amis/issues/10820) | 编辑器内拖拽问题 | 源码现存(高确信) | packages/amis-editor-core/src/dnd/index.ts:107-116,121-125 |
| [9390](https://github.com/baidu/amis/issues/9390) | amis-ui/lib/components/Editor定义全局window.MonacoEnvironment导致非amis的monaco editor无法… | 源码现存(高确信) | packages/amis-ui/src/components/Editor.tsx:19-20 still assigns global window.MonacoEnvironment when unset; amis-first sc… |
| [8283](https://github.com/baidu/amis/issues/8283) | 编辑器中-状态显示组件-编辑左侧源码-添加className，再在右侧面板修改图标配置-比如修改颜色，组件刷新后定义的className不见了 | 源码现存(高确信) ✅已修复(本轮) | packages/amis-editor/src/plugin/Status.tsx:257-261 onChange rebuilds source with pick(['label','color','icon']) only, dr… |
| [7987](https://github.com/baidu/amis/issues/7987) | amis-editor的CRUD的headerToolbar每次设置后都会覆盖掉在外观设置添加的其他按钮 | 源码现存(高确信) ✅已修复(本轮) | packages/amis-editor/src/plugin/CRUD.tsx:921 sets headerToolbar=[createSchemaBase,'bulkActions'] when create is added, d… |
| [3012](https://github.com/baidu/amis/issues/3012) | amis-editor 无法配置 combo 多条件分支的子表单集合 | 源码现存(高确信) | packages/amis-editor/src/plugin/Form/Combo.tsx:95-98 defines only one 'items' region; no `conditions` handling anywhere … |
| [12236](https://github.com/baidu/amis/issues/12236) | amis 代码编辑器拖入富文本后顶部工具栏 格式 菜单不能正常使用 | 源码待定(需复现) | Rich text editor (froala/tinymce) not in editor source; reporter notes 6.12.0 runtime fix |
| [12106](https://github.com/baidu/amis/issues/12106) | amis 6.12.0 fromNow选项展示变成英文的了, 在编辑器里是正常的 | 源码待定(需复现) | No fromNow handling in packages/amis-editor/src or amis-editor-core/src |
| [11900](https://github.com/baidu/amis/issues/11900) | 6.12 编辑器 白屏崩溃 | 源码待定(需复现) | packages/amis-editor/src/renderer/CRUDControl.tsx (no preview/edit toggle crash logic locatable) |
| [11857](https://github.com/baidu/amis/issues/11857) | 自定义组件用panelBodyCreator构建，打包后报找不到渲染器 | 源码待定(需复现) | panelBodyCreator + context minified 'cannot find renderer' is a build/closure issue, not static source defect. |
| [11854](https://github.com/baidu/amis/issues/11854) | setSchemaTpl有bug | 源码待定(需复现) | packages/amis-editor/src/plugin/Button.tsx:286,290 both use getSchemaTpl('icon'); left/right differ by name only; setSch… |
| [11809](https://github.com/baidu/amis/issues/11809) | 编辑器移动端预览PreviewIFrame不限制高度导致弹窗超出页面 | 源码待定(需复现) | packages/amis-editor-core/src/component/IFramePreview.tsx:46 sets height:100%; modal overflow fix unverifiable staticall… |
| [11763](https://github.com/baidu/amis/issues/11763) | vue3 + vite 整合amis-editor 6.11.0 在拖动组件到内容区时控制台报错 | 源码待定(需复现) | vue3+vite drag console error is build/bundling integration; not reproducible from editor source alone. |
| [11750](https://github.com/baidu/amis/issues/11750) | amis编辑器使用旧版事件配置，部分页面会出现 无法找到渲染器bug | 源码待定(需复现) | Legacy event-config 'cannot find renderer' relates to event-control action registry; no clear fix in source. |
| [11655](https://github.com/baidu/amis/issues/11655) | amis-editor 时间轴无法正常展示颜色 | 源码待定(需复现) | packages/amis-editor/src/plugin/Timeline.tsx:87 delegates to timelineItemControl; color rendering is amis-core renderer. |
| [11449](https://github.com/baidu/amis/issues/11449) | 在变量赋值事件中为页面变量赋值保存后，想要重新编辑该事件时无法带出赋值过的变量，只能删除这个事件重新创建一个才行 | 源码待定(需复现) | Duplicate of #11380/#11434 (same symptom, version 6.11.0-beta.3); no source change identified. |
| [11434](https://github.com/baidu/amis/issues/11434) | 在变量赋值事件中为页面变量赋值保存后，想要重新编辑该事件时无法带出赋值过的变量，只能删除这个事件重新创建一个才行 | 源码待定(需复现) | Duplicate of #11380; same setValue.tsx action panel, re-edit value restore unverifiable statically. |
| [11415](https://github.com/baidu/amis/issues/11415) | 使用 setValue 设置组件值为带'.' 属性的 json 对象，设置的值被错误转换 | 源码待定(需复现) | setValue with '.' property is amis-core runtime (not amis-editor); editor only configures the action. |
| [11380](https://github.com/baidu/amis/issues/11380) | 在变量赋值事件中为页面变量赋值保存后，想要重新编辑该事件时无法带出赋值过的变量，只能删除这个事件重新创建一个才行 | 源码待定(需复现) | packages/amis-editor/src/renderer/event-control/actionsPanelPlugins/componentActionsPanel/setValue.tsx:143 builds args f… |
| [11329](https://github.com/baidu/amis/issues/11329) | 表格可视化编辑字段文本框时会失去焦点 | 源码待定(需复现) | Table2/TableCell2 editing field focus loss is re-render behavior; no obvious fix in plugin source. |
| [11181](https://github.com/baidu/amis/issues/11181) | amis-editor组件关闭后不能正常关闭 会有内存泄漏的情况出现 官方在线demo也会出现这个情况 | 源码待定(需复现) | No teardown/cleanup logic identifiable in editor mount; memory leak is runtime/observational. |
| [11168](https://github.com/baidu/amis/issues/11168) | 升级到6.9.0打开编辑器后控制台会报很多warn | 源码待定(需复现) | packages/amis-editor/src/tpl/style.tsx:1411 playAnimation(animations...) referenced; guard exists via visibleOn:1575 but… |
| [11126](https://github.com/baidu/amis/issues/11126) | databinding组件二次打开时，无法正确获取上次设置的值 | 源码待定(需复现) | packages/amis-editor/src/renderer/DataBindingControl.tsx:62 onChange(result.value); value-passing depends on custom bind… |
| [11121](https://github.com/baidu/amis/issues/11121) | input-image组件宽高比率(aspectRatio)配置有误，小数会强制改成整数（amis-editor配置） | 源码待定(需复现) | packages/amis-editor/src/plugin/Form/InputImage.tsx:465 uses input-number for limit.aspectRatio; integer coercion happen… |
| [11025](https://github.com/baidu/amis/issues/11025) | 可视化编辑器JSON编辑器json-ast-comments会自动删除尾部注释 | 源码待定(需复现) | No json-ast-comments usage found in packages/amis-editor/src; JSON comment handling delegated to external dep/lib. |
| [10913](https://github.com/baidu/amis/issues/10913) | amis-eidtor 升级 6.8.0 后，自定义组件首次无法修改属性值 | 源码待定(需复现) | Custom component prop update first-change not firing; custom-component/plugin state handling. No clear fix in packages/a… |
| [10885](https://github.com/baidu/amis/issues/10885) | 6.8.0版本编辑器首次修改配置不会生效 | 源码待定(需复现) | packages/amis-editor-core/src/component/Panel/PropsPanel.tsx |
| [10866](https://github.com/baidu/amis/issues/10866) | amis-editor-demo编辑器无法监听到页面数据的实时变化 | 源码待定(需复现) | packages/amis-editor-core/src/store/editor.ts (getSnapshot reaction) |
| [10831](https://github.com/baidu/amis/issues/10831) | amis-editor编辑器变量值失效问题 | 源码待定(需复现) | packages/amis-editor-core/src/manager.ts (variable/expression) |
| [10801](https://github.com/baidu/amis/issues/10801) | v6.7 编辑器中找不到Rmark标记组件 | 源码待定(需复现) | packages/amis-editor/src/plugin/* (no remark editor plugin) |
| [10747](https://github.com/baidu/amis/issues/10747) | amis edit使用时，外观下面的框里面。一直显示错误找不到对应渲染器 | 源码待定(需复现) | packages/amis-editor/src/index.tsx:66 imports amis-theme-editor-helper |
| [10739](https://github.com/baidu/amis/issues/10739) | amis-editor 点击部分组件会报type 错误 | 源码待定(需复现) | packages/amis-editor-core/src/component/Editor.tsx |
| [10733](https://github.com/baidu/amis/issues/10733) | amis-editor 点击 service 服务报错 | 源码待定(需复现) | packages/amis-editor-core/src/plugin/* (service) |
| [10732](https://github.com/baidu/amis/issues/10732) | amis-editor 选择crud 组件，切换预览模式 报2个错，应该和 Table 组件的默认值有关，方便帮忙看看吗 | 源码待定(需复现) | packages/amis-editor/src/plugin/CRUD.tsx |
| [10729](https://github.com/baidu/amis/issues/10729) | amis editor 拖拽了增删改查，或服务service 会报错 ， | 源码待定(需复现) | packages/amis-core/src/store/table.ts:2010 |
| [10546](https://github.com/baidu/amis/issues/10546) | 编辑器设计中对按钮点击事件设置打开弹窗为对话框模式有BUG，只能编辑一次，后面都无法打开修改。 | 源码待定(需复现) | packages/amis-editor/src/plugin/Action.tsx |
| [10505](https://github.com/baidu/amis/issues/10505) | isMobie=true的时候，图片的宽高无法拖拽，快捷键-删除，也没响应 | 源码待定(需复现) | packages/amis-editor/src/plugin/Form/InputImage.tsx |
| [10494](https://github.com/baidu/amis/issues/10494) | 页面嵌套了多个编辑器制作的表单，最上层的表单的所有弹层无法触发 | 源码待定(需复现) | packages/amis-ui/src/components/Overlay (react-overlays Portal) |
| [10454](https://github.com/baidu/amis/issues/10454) | 表格编辑器严重bug | 源码待定(需复现) | packages/amis-editor/src/plugin/Form/InputTable.tsx |
| [10367](https://github.com/baidu/amis/issues/10367) | 【amis-editor】编辑schema时格式化异常，删除的内容又还原了 | 源码待定(需复现) | packages/amis-editor/* (schema code panel) |
| [10352](https://github.com/baidu/amis/issues/10352) | 6.4.1版本编辑器中使用表格2.0组件，渲染出来的页面上点击查看和编辑未弹框出来，其余新增、删除以及批量删除都弹框正确 | 源码待定(需复现) | packages/amis-editor/src/plugin/Table2.tsx |
| [10137](https://github.com/baidu/amis/issues/10137) | amis-editor，编辑器初始化改变schema，导致功能无法使用 | 源码待定(需复现) | packages/amis-editor-core/src/store/editor.ts |
| [10008](https://github.com/baidu/amis/issues/10008) | 【严重BUG】编辑器属性表单输入不正常，无法正常输入 | 源码待定(需复现) | packages/amis-editor-core/src/component/Panel/* |
| [9912](https://github.com/baidu/amis/issues/9912) | amis-editor编辑器，schema编码面板和可以写代码的地方，光标出现位置和输入位置对不上 | 源码待定(需复现) | packages/amis-editor/* (CodeEditor/Monaco) |
| [9874](https://github.com/baidu/amis/issues/9874) | 6.2.1左侧组件Panel新增Tab，当Tab个数超过两个时，最后一个Tab下的所有组件拖拽到页面会陷入死循环 | 源码待定(需复现) | packages/amis-editor-core/src/dnd/index.ts |
| [9690](https://github.com/baidu/amis/issues/9690) | 【6.1.0】编辑器中添加CRUD组件时，列集合中的字段列表丢失！ | 源码待定(需复现) | packages/amis-editor/src/plugin/CRUD.tsx:620-631 scaffold sets columns via props.formStore.setValues; persistence on con… |
| [9645](https://github.com/baidu/amis/issues/9645) | amis-editor编辑器中，使用悬浮容器插件，右键该插件显示浏览器原生上下文菜单 | 源码待定(需复现) | packages/amis-editor-core/src/component/Editor.tsx:472-523 handleContextMenu only preventDefault after finding a data-ed… |
| [9286](https://github.com/baidu/amis/issues/9286) | 编辑器 样式更换为 antd  点击组件 右键 样式 还是cxd  导致 UI 显示异常 | 源码待定(需复现) | packages/amis-editor-core/src/manager.ts:2496 uses config.theme for classPrefix; context-menu style panel theme needs ru… |
| [9178](https://github.com/baidu/amis/issues/9178) | 表格编辑器-增加表单校验，导致新增行前面行数据置空问题 | 源码待定(需复现) | packages/amis/src/renderers/Form/InputTable.tsx:834-907 addItem preserves existing items via spliceTree; issue needs run… |
| [8557](https://github.com/baidu/amis/issues/8557) | editor中的表格编辑器配置弹出窗口会导致nested-select中的options配置值消失 | 源码待定(需复现) | NestedSelect options-loss after input-table popup confirm; no concrete handling located in editor plugin. |
| [8460](https://github.com/baidu/amis/issues/8460) | 编辑器使用antd主题 ，右侧   外观  面板 部分控件样式 没能正常显示 | 源码待定(需复现) | antd-theme appearance-panel styling depends on external theme CSS; needs runtime repro. |
| [7904](https://github.com/baidu/amis/issues/7904) | amis + vite + eggjs 手机模式预览报错 | 源码待定(需复现) | Mobile preview error tied to external vite+eggjs environment; needs runtime repro. |
| [7763](https://github.com/baidu/amis/issues/7763) | TypeError: Cannot read properties of undefined (reading 'concat') | 源码待定(需复现) | packages/amis-editor/src/plugin/Page.tsx:468 node.children.concat(); node.ts:64 children optional defaults to []. Exact … |
| [6013](https://github.com/baidu/amis/issues/6013) | 每当第一次 进 amis-editor的编辑页面  会出现 Uncaught Error: [mobx-state-tree] Error while conv… | 源码待定(需复现) | No function-stripping before MST frozen schema located in amis-editor-core; error depends on runtime schema containing a… |
| [4972](https://github.com/baidu/amis/issues/4972) | 新版本编辑器 5.2.0  "hidden": "typeof this.hiddenOn === \"string\" ? 2 : 1", | 源码待定(需复现) | No generated `hidden` expression matching the reported string found across packages; handling not locatable. |
| [2737](https://github.com/baidu/amis/issues/2737) | editor编辑器内容显示错误 | 源码待定(需复现) | packages/amis/src/renderers/Form/Editor.tsx:315-319 passes value through unchanged; no editor-side stripping located, ne… |

### App/多页 （13 条）

| # | 标题 | 验证结论 | 源码证据 / 备注 |
| --- | --- | --- | --- |
| [12073](https://github.com/baidu/amis/issues/12073) | app的logo中对参数的解析异常 | 源码现存(高确信) ✅已修复(本轮) | packages/amis/src/renderers/App.tsx:348-356 |
| [11997](https://github.com/baidu/amis/issues/11997) | app组件的左侧导航栏使用iconfont下载的svg图标显示特别小 | 源码现存(高确信) | packages/amis-ui/scss/layout/_aside.scss (img.AsideNav-itemIcon) |
| [11948](https://github.com/baidu/amis/issues/11948) | 关于amis 编辑框 在移动端 的选择栏 无法被选中的BUG | 源码待定(需复现) | packages/amis/src/renderers/Form/InputText.tsx |
| [11099](https://github.com/baidu/amis/issues/11099) | pc状态画布样式正常，切换为移动端画布样式失效 | 源码待定(需复现) | packages/amis-editor/* |
| [10590](https://github.com/baidu/amis/issues/10590) | AppFoldBtn 点击没反应,不能收起菜单 | 源码待定(需复现) | packages/amis/src/renderers/App.tsx:363; store/app.ts:71 |
| [10504](https://github.com/baidu/amis/issues/10504) | app多页应用类型组件配置后重叠 | 源码待定(需复现) | packages/amis/src/renderers/App.tsx:491-552 |
| [10436](https://github.com/baidu/amis/issues/10436) | App多页应用中，actionType为ajax并配置了confirmText时，取消和确认按钮的文字，多语言无效，显示中文的取消和确认 | 源码待定(需复现) | packages/amis/src/renderers/App.tsx:262-285 |
| [9739](https://github.com/baidu/amis/issues/9739) | 移动端文本框的label字体大小无法设置，被响应式css覆盖 | 源码待定(需复现) | packages/amis-ui/scss/ |
| [9103](https://github.com/baidu/amis/issues/9103) | columnCount在crud的filter的移动端设置故障 | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx |
| [7109](https://github.com/baidu/amis/issues/7109) | App 多页应用页面跳转无法接收 url 参数. | 源码待定(需复现) | packages/amis-core/src/store/app.ts:64-67 |
| [6102](https://github.com/baidu/amis/issues/6102) | App多页应用模式下，菜单切换后，iframe的onEvent 事件反复执行 | 源码待定(需复现) | packages/amis/src/renderers/App.tsx:532-536 |
| [3725](https://github.com/baidu/amis/issues/3725) | condition-builder当fields过多时在移动端上无法显示靠后的属性 | 源码待定(需复现) | packages/amis/src/renderers/ConditionBuilder/* |
| [3570](https://github.com/baidu/amis/issues/3570) | Amis official  example, menu wont appear in android phone | 源码待定(需复现) | packages/amis/src/renderers/App.tsx:377-484 |

### Tabs （6 条）

| # | 标题 | 验证结论 | 源码证据 / 备注 |
| --- | --- | --- | --- |
| [11150](https://github.com/baidu/amis/issues/11150) | Tabs组件bug，内容溢出时，左右点击滑动后，鼠标移动到tab上方，会出现tabs闪回到滑动前位置 | 源码现存(高确信) ✅已修复(本轮) | packages/amis-ui/src/components/Tabs.tsx:387-394 - showSelected() re-centers active tab whenever computedWidth runs (isO… |
| [12044](https://github.com/baidu/amis/issues/12044) | tabs 选中后，tab 页签无法切换 | 源码待定(需复现) | packages/amis/src/renderers/Tabs.tsx:670 - handleSelect sets activeKey and CTabs (uncontrolled) reacts; 6.12.0 switching… |
| [11142](https://github.com/baidu/amis/issues/11142) | error throws when add a tabs component | 源码待定(需复现) | packages/amis-ui/src/components/Tabs.tsx:739 - renderTab clones child; 'reading type' of undefined is amis-editor-specif… |
| [10081](https://github.com/baidu/amis/issues/10081) | crud2的syncLocation会导致tabs的hash不见的问题 | 源码待定(需复现) | packages/amis/src/renderers/Tabs.tsx:414 - tabs responds to location.hash changes; whether crud2 preserves hash on syncL… |
| [7830](https://github.com/baidu/amis/issues/7830) | 【Bug反馈】tabs组件 设置hash后 内部使用crud并开启syncLocation后 筛选条件带tabs的hash值 | 源码待定(需复现) | packages/amis/src/renderers/Tabs.tsx:704 - handleSelect writes env.updateLocation('#'+key); crud syncLocation including … |
| [3120](https://github.com/baidu/amis/issues/3120) | 1.5.0 版本. page 初始化数据，无法专递到 tabs  | 源码待定(需复现) | packages/amis/src/renderers/Tabs.tsx:325 - source resolved via resolveVariableAndFilter(props.data); page initApi data r… |

### Chart （3 条）

| # | 标题 | 验证结论 | 源码证据 / 备注 |
| --- | --- | --- | --- |
| [11841](https://github.com/baidu/amis/issues/11841) | Chart组件间联动，会同时发起两个请求 | 源码现存(高确信) | packages/amis/src/renderers/Chart.tsx:561-566 (receive->reload) and :273-277 (componentDidUpdate->reload via isApiOutdat… |
| [7339](https://github.com/baidu/amis/issues/7339) | chart组件toolbox自定义事件无法绑定函数 | 源码现存(高确信) ✅已修复(本轮) | packages/amis/src/renderers/Chart.tsx:177-212 (recoverFunctionType key list omits 'onclick') |
| [9448](https://github.com/baidu/amis/issues/9448) | chart组件制作graph类型（关系图时）itemStyle的颜色都不生效 | 源码待定(需复现) | packages/amis/src/renderers/Chart.tsx:568-627 (renderChart passes config through, no itemStyle/normal handling) |

### Wizard （2 条）

| # | 标题 | 验证结论 | 源码证据 / 备注 |
| --- | --- | --- | --- |
| [9308](https://github.com/baidu/amis/issues/9308) | 数据域更新延迟bug | 源码待定(需复现) | packages/amis/src/renderers/Wizard.tsx:727-739 (handleChange dispatches 'change' and store.updateData on form change) |
| [5019](https://github.com/baidu/amis/issues/5019) | Wizard组件中角标显示异常 | 源码待定(需复现) | packages/amis/src/renderers/Wizard.tsx:1225-1250 (body renders nested type:'form'; no badge-specific handling, badge is … |

### Combo （1 条）

| # | 标题 | 验证结论 | 源码证据 / 备注 |
| --- | --- | --- | --- |
| [5555](https://github.com/baidu/amis/issues/5555) | 2.3版本数据更新的继承性问题 | 源码待定(需复现) | packages/amis/src/renderers/Form/Combo.tsx:2102 setData calls onChange to propagate; Combo.tsx:565/615 guards on disable… |

### 其他/通用 （56 条）

| # | 标题 | 验证结论 | 源码证据 / 备注 |
| --- | --- | --- | --- |
| [12202](https://github.com/baidu/amis/issues/12202) | 【bug】Cards拖拽排序，取消排序后，无法重置数据 | 源码现存(高确信) ✅已修复(本轮) | packages/amis/src/renderers/Cards.tsx:1308-1310 cancelDrag only calls store.stopDragging(); packages/amis-core/src/store… |
| [12116](https://github.com/baidu/amis/issues/12116) | 长图预览时放大功能bug | 源码现存(高确信) | packages/amis-ui/src/components/ImageGallery.tsx:283-298 ZOOM_IN/ZOOM_OUT/SCALE_ORIGIN all set tx:0, ty:0, so zooming af… |
| [12058](https://github.com/baidu/amis/issues/12058) | 面包屑组件，label和href设置成模板变量之后，重新点击面包屑组件，模板变量消失 | 源码现存(高确信) ✅已修复(本轮) | packages/amis/src/renderers/Breadcrumb.tsx:129-135 assigns item.label = filter(item.label) and item.href = ... in place,… |
| [11847](https://github.com/baidu/amis/issues/11847) | 下载后保存的中文文件文件名乱码 | 源码现存(高确信) ✅已修复(本轮) | packages/amis-core/src/utils/attachmentAdpator.ts:27-31 regex matches the first filename= (the garbled one) and never pr… |
| [11597](https://github.com/baidu/amis/issues/11597) | 自定义组件里触发动作不生效 | 源码现存(高确信) | packages/amis-core/src/RootRenderer.tsx:190-358 handleAction (props.onAction) has no branch for setValue/custom; only di… |
| [11566](https://github.com/baidu/amis/issues/11566) | aside 设置最小宽度，每次都需要拖拽下，才可以，默认不生效 | 源码现存(高确信) ✅已修复(本轮) | packages/amis/src/renderers/Page.tsx:695,702 asideMinWidth is only read inside handleResizeMouseMove; no initial width/s… |
| [11537](https://github.com/baidu/amis/issues/11537) | 轮播图Carousel组件的图片信息不显示 | 源码现存(高确信) | packages/amis/src/renderers/Carousel.tsx:156-192 defaultSchema renders Image (snapshot shows cxd-Image-title/caption), b… |
| [11536](https://github.com/baidu/amis/issues/11536) | 广播订阅事件中无法执行指定了 componentId/componentName 的动作 | 源码现存(高确信) | packages/amis-core/src/utils/renderer-event.ts:229 passes renderer.context as scoped; packages/amis-core/src/actions/Act… |
| [10634](https://github.com/baidu/amis/issues/10634) | 卡片组件中头部标题和副标题未做自适应 | 源码现存(高确信) ✅已修复(本轮) | packages/amis-ui/scss/components/_card.scss:77-82 Card-meta lacks min-width:0 while Card-title (19-21) is nowrap |
| [10181](https://github.com/baidu/amis/issues/10181) | action的防抖不生效，设置leading为true，trailing为false，没有起到防抖作用 | 源码现存(高确信) | packages/amis-core/src/utils/renderer-event.ts:352-374 - new lodash debounce instance created per dispatch |
| [10145](https://github.com/baidu/amis/issues/10145) | image配置enlargeTitle、enlargeCaption文字超过一行时展示有问题 | 源码现存(高确信) ✅已修复(本轮) | packages/amis-ui/scss/components/_image-gallery.scss:39-48 - title/caption fixed height 18px, line-height 18px |
| [9093](https://github.com/baidu/amis/issues/9093) | 设置delay为1000的spinner组件，show 属性设为 true 后，并没有延迟显示 | 源码现存(高确信) | Spinner.tsx:216,225-230 uses delay only as the Transition enter timeout; no delayed-show logic exists. |
| [7605](https://github.com/baidu/amis/issues/7605) | 在编排动作里加入“刷新目标组件”的动作，但实际结上无法刷新目标组件 | 源码现存(高确信) | CmptAction.ts:40-62,90-101 resolves target only via componentId/componentName; `target` is ignored inside onEvent action… |
| [5927](https://github.com/baidu/amis/issues/5927) | 数据映射中 数组/pick  和 isTrue 配合使用时结果一成不变 | 源码现存(高确信) ✅已修复(本轮) | filter.ts:465-476 isTrue uses !!input; array returned by pick is always truthy so isTrue yields trueValue |
| [3643](https://github.com/baidu/amis/issues/3643) | condition-builder 中not 交互不生效 | 源码现存(高确信) ✅已修复(本轮) | GroupOrItem.tsx:145-169 renders nested ConditionGroup without forwarding showNot; Group.tsx:248 not button only top leve… |
| [3254](https://github.com/baidu/amis/issues/3254) | Cards 卡片组中Card点击高亮无法无法禁用 | 源码现存(高确信) ✅已修复(本轮) | Cards.tsx:959 passes item.checkable (data row) not card.checkable; Card.tsx:305 defaults checkable:true, so card checkab… |
| [12000](https://github.com/baidu/amis/issues/12000) | divider配置color渐变色无效 | 源码待定(需复现) | packages/amis/src/renderers/Divider.tsx:96-103 does handle 'linear-gradient' by setting borderImage; cannot verify the r… |
| [11883](https://github.com/baidu/amis/issues/11883) | Service组件初始化时死循环调用接口 | 源码待定(需复现) | packages/amis/src/renderers/Service.tsx:228-241 refetch is gated by isApiOutdated (packages/amis-core/src/utils/api.ts:8… |
| [11819](https://github.com/baidu/amis/issues/11819) | qrcode 在 6.12.0 版本错误 | 源码待定(需复现) | Stack points to third-party qrcode-react-next@1.0.0 (useQrCode.js/QRCodeCanvas.js); packages/amis/src/renderers/QRCode.t… |
| [11765](https://github.com/baidu/amis/issues/11765) | IFrame全是灰屏空白，根本没法用 | 源码待定(需复现) | packages/amis/src/renderers/IFrame.tsx renders src/width/height normally; blank frame likely caused by target site X-Fra… |
| [11636](https://github.com/baidu/amis/issues/11636) | 下载操作无法下载文件 | 源码待定(需复现) | packages/amis-core/src/factory.tsx:433 default fetcher rejects; blob download is delegated to host env.fetcher + attachm… |
| [11427](https://github.com/baidu/amis/issues/11427) | card 组件报错 | 源码待定(需复现) | packages/amis/src/renderers/Card.tsx:645-658 renderSubTitle; amis-ui/Card.tsx:129-137 |
| [11368](https://github.com/baidu/amis/issues/11368) | pagination组件 选择每页数据大于总条数时 整个分页组件都消失了 | 源码待定(需复现) | packages/amis-ui/src/components/Pagination.tsx:315-330 getLastPage; amis Pagination.tsx:122-134 |
| [11312](https://github.com/baidu/amis/issues/11312) | 打印事件，无法正常使用 | 源码待定(需复现) | packages/amis-core/src/actions/PrintAction.ts:40-44 queries [data-id]; CRUD.tsx:3227 sets data-id |
| [11279](https://github.com/baidu/amis/issues/11279) | 下载文件功能报错：Should have "Content-Disposition" in Header | 源码待定(需复现) | packages/amis-core/src/utils/api.ts:455-456 throws when blob response is a string |
| [11147](https://github.com/baidu/amis/issues/11147) | service组件schemaApi渲染alert组件，jdk 6.9.0前端不显示 | 源码待定(需复现) | packages/amis/src/renderers/Service.tsx:564-580 afterSchemaFetch; store/service.ts:431 fetcher |
| [11065](https://github.com/baidu/amis/issues/11065) | 关于按钮加入disable变成隐藏了应该是禁用 | 源码待定(需复现) | packages/amis/src/renderers/Action.tsx:530 passes disabled to Button; amis-ui/Button.tsx:87-120 renders disabled |
| [11043](https://github.com/baidu/amis/issues/11043) | 卡片组-点击全选按钮的时候version为5.5的不被选中 | 源码待定(需复现) | packages/amis/src/renderers/Cards.tsx:419,437 store.toggleAll + syncSelected; list store toggleAll list.ts:300 |
| [10975](https://github.com/baidu/amis/issues/10975) | 锚点导航-默认三个锚点，点击第二个锚点标题不跳转 | 源码待定(需复现) | packages/amis-ui/src/components/AnchorNav.tsx:124-138 scrollToSection uses this.sections find by key |
| [10932](https://github.com/baidu/amis/issues/10932) | [bug]6.8.0 的样式主题不生效 | 源码待定(需复现) | packages/amis/src/renderers/Page.tsx:385-411 injects cssVars into :root |
| [10916](https://github.com/baidu/amis/issues/10916) | 设计器组件设置属性或者事件，首次操作无效 | 源码待定(需复现) | packages/amis-editor (attribute/event control) - no targeted fix located |
| [10662](https://github.com/baidu/amis/issues/10662) | wrapper size:none 无默认边距配置下，存在minHeight:34px默认值 | 源码待定(需复现) | packages/amis-ui/scss/components/_wrapper.scss:1-6 sets min-height:0; no 34px there |
| [9605](https://github.com/baidu/amis/issues/9605) | 嵌套的折叠器交互行为不正确 | 源码待定(需复现) | packages/amis-ui/src/components/Collapse.tsx:104-117 - toggleCollapsed has no stopPropagation; nesting DOM unknown |
| [9254](https://github.com/baidu/amis/issues/9254) | CRUD参数上传出现“脏数据“ | 源码待定(需复现) | packages/amis/src/renderers/CRUD.tsx (filter/query build) - no evidence of stripping empty-string params; needs runtime … |
| [9101](https://github.com/baidu/amis/issues/9101) | 给自定义组件setValue无效 | 源码待定(需复现) | CmptAction.ts:76-86 setValue uses component.setData or props.onChange; custom FormItem registration path not locatable. |
| [8829](https://github.com/baidu/amis/issues/8829) | 锚点导航添加style设置高度100%后，锚点效果失效 | 源码待定(需复现) | AnchorNav.tsx:85 creates IntersectionObserver with viewport root; no handling for a height:100% scroll container. |
| [8580](https://github.com/baidu/amis/issues/8580) | 函数类注册自定义组件dispatchEvent不能执行绑定的事件，class注册组件没有问题 | 源码待定(需复现) | SchemaRenderer.tsx:475-503 passes dispatchEvent to SFCs as well; no clear SFC-only gap found. |
| [8540](https://github.com/baidu/amis/issues/8540) | nav组件数据很多时样式会错乱，多出两个div元素 | 源码待定(需复现) | Schema shown uses input-tree, not nav; extra div layout artifact not localizable from source alone. |
| [8191](https://github.com/baidu/amis/issues/8191) | Toast Action 不展示，已配置 env.notify 并加载 <ToastComponent /> | 源码待定(需复现) | Toast.tsx:35-41 show() silently returns when toastRef is null; toastRef set in ToastComponent.componentDidMount. |
| [7775](https://github.com/baidu/amis/issues/7775) | "name": "${result/toJson/pick:status}",  之前可以这么取值在在组件里，现在3.1 取不到值 | 源码待定(需复现) | Mapping.tsx:328 getPropValue resolves name via resolveValueByName; no expression-name handling evident. |
| [7511](https://github.com/baidu/amis/issues/7511) | bug-i18n | 源码待定(需复现) | i18n compile warning appears only in local dev, not after build; no reproducible schema provided. |
| [7403](https://github.com/baidu/amis/issues/7403) | 通过amisLib.registerFilter自定义过滤器，发现部分组件不生效 | 源码待定(需复现) | Custom filters registered via registerFilter are applied through filter(); the specific failing components are not ident… |
| [6082](https://github.com/baidu/amis/issues/6082) | Mapping使用localstorage存储options报错，列表中会卡顿 | 源码待定(需复现) | Mapping.tsx:197-207 pure-variable branch; ls: parseJson returns a fresh ref each resolve (evalutor.ts:437-456), but no g… |
| [5502](https://github.com/baidu/amis/issues/5502) | action组件className颜色问题 | 源码待定(需复现) | Action.tsx:496-520 applies className and level together; color conflict is CSS cascade/specificity, needs runtime |
| [5425](https://github.com/baidu/amis/issues/5425) | Service reload 会使组件下包裹的所有组件都显示加载状态并且 silentPolling 无效 | 源码待定(需复现) | service.ts:190 silent fetch skips loading, but Service.tsx:842-848 overlay still covers children; intended behavior uncl… |
| [5286](https://github.com/baidu/amis/issues/5286) | calendar异常-Cannot read property 'width' of undefined | 源码待定(需复现) | DaysView.tsx:536-552 reads item.width; undefined item depends on runtime schedule data |
| [5191](https://github.com/baidu/amis/issues/5191) | iframe 的url带hash路由时，reload 不生效 | 源码待定(需复现) | IFrame.tsx:172-183 reload reassigns src; hash-route reload behavior needs runtime repro |
| [4801](https://github.com/baidu/amis/issues/4801) | 使用react-dom/client 导致 amis-nav collapse交互失效 | 源码待定(需复现) | ReactDOM.createRoot nav collapse failure is environment-specific; no source-level handling evidence |
| [4716](https://github.com/baidu/amis/issues/4716) | 手机端，nav导航响应式收纳，里面更多的选项无法显示出来，不能滑动 | 源码待定(需复现) | Nav.tsx:1009 horizontal scroll only when overflow.mode==='swipe'; default popup-mode mobile scrolling unverified |
| [4649](https://github.com/baidu/amis/issues/4649) | CRUD组件列设置固定宽度后，第一次调整列宽后，第二次无法拖动 | 源码待定(需复现) | table/index.tsx:622-681 resize reads colWidth.width; no clear fix for second-drag with fixed-width column |
| [4638](https://github.com/baidu/amis/issues/4638) | crud控件headerToolbar中嵌套form后，页面首次加载，里面的控件会初始化两次 | 源码待定(需复现) | CRUD headerToolbar nested form double init; requires runtime repro, no source-level evidence found |
| [4634](https://github.com/baidu/amis/issues/4634) | 事件动作custom js 将context,doAction,event传递到别的函数后再调用失效 | 源码待定(需复现) | CustomAction.ts:67-73 passes renderer/doAction closure/event to script; no targeted fix evidence for deferred-call failu… |
| [4275](https://github.com/baidu/amis/issues/4275) | 1.9版本 jdk  7个Bug反馈 | 源码待定(需复现) | Bundle of 7 bugs; input-datetime timeConstraints fixed by commit 8c64dc000, but other sub-items unverified |
| [4122](https://github.com/baidu/amis/issues/4122) | React 18 react-router-dom lazy的方式引入amis页面导致crash | 源码待定(需复现) | React18 + react-router lazy crash; environment/runtime specific, no source-level handling evidence |
| [3125](https://github.com/baidu/amis/issues/3125) | 升级到1.3.0版本后在vue中使用，button 的ajax功能失效 | 源码待定(需复现) | Button ajax path only reproducible in external vue amis-admin project on 1.3-1.5; no version-specific source evidence |
| [3121](https://github.com/baidu/amis/issues/3121) | 1.5.0版本 mapping 组件 在crud中使用，数据映射显示数据有问题 | 源码待定(需复现) | Mapping.tsx:318-324 renders map[key]; display depends on fetched source/adaptor data, no clear code defect |

## 四、被已合并 PR 引用的候选（优先复核）

| # | 标题 | 关联已合并 PR |
| --- | --- | --- |
| [12214](https://github.com/baidu/amis/issues/12214) | switch组件值“开”和“关”无法国际化，语言为英文时显示的还是中文 | #12244 |
| [12070](https://github.com/baidu/amis/issues/12070) | BUG:crud2.0表格组件查询组件的默认值，初始化请求的时候没有携带默认值，手动点击查询才会携带 | #12209 |
| [11827](https://github.com/baidu/amis/issues/11827) | loadDataOnceFetchOnFilter false时，总条数展示数据有误 | #11828 |
| [11431](https://github.com/baidu/amis/issues/11431) | 当 select 组件使用表格模式展示时，change 事件无 selectedItems 数据 | #11437 |
| [11186](https://github.com/baidu/amis/issues/11186) | crud组件，开启列排序功能，列渲染bug | #11616 |
| [10873](https://github.com/baidu/amis/issues/10873) | inputTree配置懒加载的行，鼠标hover后按钮不会展示 | #10883 |
| [10775](https://github.com/baidu/amis/issues/10775) | select在modal中，如果配置popOverContainerSelector：body，下拉框内容被modal遮挡 | #10777 |
| [10623](https://github.com/baidu/amis/issues/10623) | 更新到6.6.0版本后input-table设置width无效 | #21197 |
| [10599](https://github.com/baidu/amis/issues/10599) | 6.6 table2快速编辑提交成功后按钮不消失 | #10701 |
| [10359](https://github.com/baidu/amis/issues/10359) | select的source是表达式时，数据域发生变化后已选值不会自动清空 | #10361 |
| [9185](https://github.com/baidu/amis/issues/9185) | InputDatetimeRange 首次选择时无法选择00项/日期自动跳转/最大值限制无效 | #9255 |
| [9093](https://github.com/baidu/amis/issues/9093) | 设置delay为1000的spinner组件，show 属性设为 true 后，并没有延迟显示 | #10999 |
| [7558](https://github.com/baidu/amis/issues/7558) | 数字框在同时设置千分位和小数位下不能连续输入 | #10475 |
| [6213](https://github.com/baidu/amis/issues/6213) | InputKV 键值对，value值已经自定义为input-number类型，从表单上http发出去，后端接收到的value还是字符串 | #6240 |
| [4575](https://github.com/baidu/amis/issues/4575) | 1.10.0+版本crud点击联动功能异常 | - |
| [2499](https://github.com/baidu/amis/issues/2499) | 倒计时的时候验证错误的是不应该开始倒计时 | #6954,#7809 |

## 五、已排除项（供参考）

### 5.1 疑似已修复 likely_fixed（127 条，节选前 40）

| # | 标题 | 证据 |
| --- | --- | --- |
| [21220](https://github.com/baidu/amis/issues/21220) | CRUD/TABLE 组件在fixed冻结列和columntoggle两个功能同时使用时，table内容left计算错误 | packages/amis/src/renderers/Table/Cell.tsx:70-77 — sticky left style useMemo now depends o… |
| [20778](https://github.com/baidu/amis/issues/20778) | Options 选择器表单项，配置支持检索，输入检索内容后，选项没有居左对齐 | _select.scss:456 sets Select-option-content justify-content:flex-start; no space-between r… |
| [14136](https://github.com/baidu/amis/issues/14136) | 升级到3.4.1之后，input-table的单元格name存在点时数据域有影响 | 源码现存(高确信) ✅已修复(本轮) | Table/Table2 Row.change 使用 immutableExtends 非深度 merge，name="obj.a"/"obj.b" 会整体替换 obj 导致互相覆盖；immutableExtends 增加 deep 支持并在 Row.change 启用（同步 PR #21326） |
| [13455](https://github.com/baidu/amis/issues/13455) | InputFile 文件上传组件展示文件名时存在反射型xss攻击 | InputFile.tsx:1574,1578,1545-1552 filename rendered as {filename} JSX + tooltip React node |
| [12251](https://github.com/baidu/amis/issues/12251) | packages/amis项目缺少mobx-react-lite的依赖 | packages/amis/package.json:78 declares `"mobx-react-lite": "^2.2.0"` under dependencies; p… |
| [12248](https://github.com/baidu/amis/issues/12248) | 基于表单提交的服务端验证不起作用 | form.ts:416-417 maps server status 422 payload.errors via setFormItemErrors. |
| [12214](https://github.com/baidu/amis/issues/12214) | switch组件值“开”和“关”无法国际化，语言为英文时显示的还是中文 | Switch.tsx:134-136 translates 'swith.on'/'swith.off'; en-US.ts:444-445 defines them, so st… |
| [12184](https://github.com/baidu/amis/issues/12184) | 【BUG】VirtualTableBody 虚拟表格主体组件在下滑时，只能显示一部分数据，其余为空白 | packages/amis/src/renderers/Table/VirtualTableBody.tsx:109-128 |
| [12182](https://github.com/baidu/amis/issues/12182) | 【bug】变量赋值导致数据丢失 | setVariable deep-copies nested plain objects/arrays (object.ts:138-144); autoFill merges t… |
| [12153](https://github.com/baidu/amis/issues/12153) | 日期范围，快捷选择无效 | packages/amis-ui/src/components/DateRangePicker.tsx:1397-1419 |
| [12070](https://github.com/baidu/amis/issues/12070) | BUG:crud2.0表格组件查询组件的默认值，初始化请求的时候没有携带默认值，手动点击查询才会携带 | packages/amis/src/renderers/CRUD2.tsx:1416-1417 |
| [12032](https://github.com/baidu/amis/issues/12032) | 表格第一次调用接口，没有携带默认值 | packages/amis/src/renderers/CRUD2.tsx:1416-1417 |
| [12025](https://github.com/baidu/amis/issues/12025) | 【安去问题】标签预览存在xss漏洞 | Tag.tsx:160 renders {label} (React auto-escapes); Tag.tsx:157 title attr only |
| [11989](https://github.com/baidu/amis/issues/11989) | 行为按钮配置countDown，页面刷新倒计时失效 | Action.tsx:231-247 restores countdown from localStorage on mount; saved at Action.tsx:315. |
| [11976](https://github.com/baidu/amis/issues/11976) | amis-editor 下拉框/开关组件自定义选项设置数字类型保存后变成文本 | packages/amis-editor/src/renderer/ValueFormatControl.tsx:40 normalizeOptionValue(value,'nu… |
| [11928](https://github.com/baidu/amis/issues/11928) | 6.12.0  增删改查组件，卡片形式 瀑布流设置固定行数不生效 | packages/amis/src/renderers/Cards.tsx:1032 |
| [11902](https://github.com/baidu/amis/issues/11902) | button icon 中使用变量如果是URL格式时无法正确解析 | packages/amis/src/renderers/Action.tsx:452-453 filters icon template; packages/amis-ui/src… |
| [11886](https://github.com/baidu/amis/issues/11886) |  修改输入框，快速点击确定按钮，自定义JS的event.data无法获取表单数据，即使加延时也不行 | Form.tsx:1352-1354 awaits flush() before action; flush applies debounced lazyEmitChange (F… |
| [11864](https://github.com/baidu/amis/issues/11864) | 升级到6.10.0/6.11.0/6.12.0这三个版本，文档里面的公共方法amisRequire('amis').toast方法不存在了 | packages/amis-ui/src/components/index.tsx:202 exports `toast`; propagated via amis-ui/inde… |
| [11862](https://github.com/baidu/amis/issues/11862) | 6.12弹出对话框，计算高度异常 | packages/amis-ui/src/components/Modal.tsx:311 handleDragStart guards `if (!node // !offset… |
| [11827](https://github.com/baidu/amis/issues/11827) | loadDataOnceFetchOnFilter false时，总条数展示数据有误 | packages/amis-core/src/store/crud.ts:287 |
| [11817](https://github.com/baidu/amis/issues/11817) | input-table 组件 添加分页后，点击分页，会导致列表数据混乱，丢失，出现重复数据 | packages/amis/src/renderers/Form/InputTable.tsx:1938-1942 |
| [11791](https://github.com/baidu/amis/issues/11791) | Wizard + InputTable 来回切换时，操作列内置操作按钮会一直增加，导致重复 | packages/amis/src/renderers/Form/InputTable.tsx:1747-1756 |
| [11769](https://github.com/baidu/amis/issues/11769) | 组合条件condition-builder在手机上显示不全，无法交互的问题 | packages/amis/src/renderers/Form/ConditionBuilder.tsx:213 adds {'is-mobile': mobileUI}; pa… |
| [11677](https://github.com/baidu/amis/issues/11677) | input-datetime-range 在crud的数据筛选区中使用, clear有bug | packages/amis-core/src/store/formItem.ts:314 splitExtraValue + wrapControl.tsx:849-864 |
| [11635](https://github.com/baidu/amis/issues/11635) | 回车后表单提交事件不执行 | Form.tsx:1405 dispatchEvent('submit') runs via handleFormSubmit; hidden submit input at Fo… |
| [11619](https://github.com/baidu/amis/issues/11619) | 6.11.0 里面crud简单分页，按钮不可点。 | packages/amis-ui/src/components/Pagination.tsx:493 |
| [11461](https://github.com/baidu/amis/issues/11461) | picker组件，当数据是树状结构，使用table模式时，单选会触发父子都选中的逻辑 | packages/amis-core/src/store/table.ts:404-409 |
| [11456](https://github.com/baidu/amis/issues/11456) | ignoreError不生效 | packages/amis-core/src/actions/Action.ts:204-226 catch honors ignoreError and calls stopPr… |
| [11431](https://github.com/baidu/amis/issues/11431) | 当 select 组件使用表格模式展示时，change 事件无 selectedItems 数据 | packages/amis/src/renderers/Form/Transfer.tsx:274,362 |
| [11393](https://github.com/baidu/amis/issues/11393) | input-table添加总结行在确认模式下取消编辑报错：row not found | packages/amis/src/renderers/Form/InputTable.tsx:1250-1251 |
| [11374](https://github.com/baidu/amis/issues/11374) | select组件的"selectMode": "list"模式  点击搜索之后返回的数据选中之后显示的是value而不是label | Form/Select.tsx:385,397-420 mergeOptions merges search results into options for label look… |
| [11361](https://github.com/baidu/amis/issues/11361) | 使用了已删除的api 导致在react19 中崩溃 | Item.tsx:730 calls findDomCompat; findDomCompat.ts:28-63 walks React fiber, only falls bac… |
| [11360](https://github.com/baidu/amis/issues/11360) | [bug] 表格2组件 查询表单设置了默认值, 打开页面第一次自动请求没有带上表单的默认值 | packages/amis/src/renderers/CRUD2.tsx:1416-1418 |
| [11339](https://github.com/baidu/amis/issues/11339) | CRUD组件使用mapping映射数据，使用tag组件展示时，配置的label不生效 | packages/amis/src/renderers/Mapping.tsx:297 |
| [11186](https://github.com/baidu/amis/issues/11186) | crud组件，开启列排序功能，列渲染bug | packages/amis/src/renderers/Table/ColumnToggler.tsx:215 |
| [10842](https://github.com/baidu/amis/issues/10842) | input-table编辑表格批量删除示例代码无效 | packages/amis/src/renderers/Form/InputTable.tsx:2337-2356 |
| [10828](https://github.com/baidu/amis/issues/10828) | crud组件 设置filter-toggler，查询条件切换没有显示 | packages/amis/src/renderers/CRUD.tsx:3032 |
| [10821](https://github.com/baidu/amis/issues/10821) | input-table在needConfirm模式下开启canAccessSuperData，初始化数据没同步到form中 | packages/amis/src/renderers/QuickEdit.tsx:744-754 |
| [10749](https://github.com/baidu/amis/issues/10749) | InputDatetime组件设置timeConstraints在移动模式无效 | packages/amis-ui/src/components/DatePicker.tsx:1228 |

### 5.2 非缺陷 not_a_defect（21 条）

| # | 标题 |
| --- | --- |
| [12249](https://github.com/baidu/amis/issues/12249) | each通过name拿到的数据源，在items中取数据有问题 |
| [11894](https://github.com/baidu/amis/issues/11894) | 希望将CRUD/CRUD2合并成同一份实现代码 |
| [11852](https://github.com/baidu/amis/issues/11852) | 当CRUD组件设置syncLocation为false时，出现筛选参数未携带的情况 |
| [11743](https://github.com/baidu/amis/issues/11743) | 开了一个在线写 Amis Demo 的工具，接了AI，欢迎体验下～ |
| [11519](https://github.com/baidu/amis/issues/11519) | Pagination 分页组件bug |
| [10709](https://github.com/baidu/amis/issues/10709) | 新项目使用vue3+jssdk好还是react好 |
| [10084](https://github.com/baidu/amis/issues/10084) | Reopen Combo 嵌套 自定义 deleteBtn 不显示 Bug #9975 |
| [9287](https://github.com/baidu/amis/issues/9287) | 希望canAccessSuperData在Service组件中生效 |
| [9274](https://github.com/baidu/amis/issues/9274) | kilobitSeparator可以支持设置变量控制么，目前好像不支持 |
| [8492](https://github.com/baidu/amis/issues/8492) | checkboxes能否按照分组选择全选/不选 |
| [7806](https://github.com/baidu/amis/issues/7806) | App 菜单栏支持过滤 |
| [7672](https://github.com/baidu/amis/issues/7672) | submit 按钮支持 feedback |
| [7663](https://github.com/baidu/amis/issues/7663) | crud的重置和搜索有没有事件监听？如何控制这个按钮的显示和隐藏？ |
| [7653](https://github.com/baidu/amis/issues/7653) | 日历日程组件优化，细分日程事件数据 |
| [7589](https://github.com/baidu/amis/issues/7589) | Select组件下拉可以支持Tabs模式吗？ |
| [7487](https://github.com/baidu/amis/issues/7487) | 请问amis是否能实现类似saleforce的多行单字段编辑 |
| [7479](https://github.com/baidu/amis/issues/7479) | 对外导出默认 AmisUI 所有的 Plugin 实现。 |
| [7317](https://github.com/baidu/amis/issues/7317) | crud组件支持虚拟滚动 |
| [5405](https://github.com/baidu/amis/issues/5405) | crud内联模式的快速编辑效果与文档上不一致 |
| [5232](https://github.com/baidu/amis/issues/5232) | 编辑器升级到5.2.0后的一些问题 |
| [3689](https://github.com/baidu/amis/issues/3689) | json-editor编辑后提交的数据类型会发生改变 |

---

*由 CodeBuddy 基于 `baidu/amis` 开放 issue + 本地源码交叉比对生成。验证结论为静态代码分析的工程判断，部分 `cannot_determine` 需结合实际版本/运行时复现确认。*
