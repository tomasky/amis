import React = require('react');
import {render, cleanup, fireEvent} from '@testing-library/react';
import '../../src';
import {render as amisRender} from '../../src';
import {makeEnv, wait} from '../helper';
import {clearStoresCache} from '../../src';

jest.mock('echarts', () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    resize: jest.fn(),
    dispose: jest.fn(),
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    getDom: jest.fn()
  })),
  registerTheme: jest.fn()
}));
jest.mock('echarts-stat', () => ({}));
jest.mock('echarts/extension/dataTool', () => ({}));
jest.mock('echarts/extension/bmap/bmap', () => ({}));
jest.mock('echarts-wordcloud/dist/echarts-wordcloud', () => ({}));

afterEach(() => {
  cleanup();
  clearStoresCache();
});

test('Renderer:chart form target linkage should request only once (#11841)', async () => {
  const fetcher = jest.fn().mockImplementation(() =>
    Promise.resolve({
      data: {
        status: 0,
        data: {
          series: [{type: 'bar', data: [1, 2, 3]}],
          xAxis: {type: 'category', data: ['a', 'b', 'c']},
          yAxis: {type: 'value'}
        }
      }
    })
  );

  const {getByText} = render(
    amisRender(
      {
        type: 'page',
        body: [
          {
            type: 'form',
            id: 'theForm',
            target: 'theChart',
            wrapWithPanel: false,
            body: [
              {type: 'input-text', name: 'name', label: 'name'},
              {type: 'submit', label: 'Submit'}
            ]
          },
          {
            type: 'chart',
            id: 'theChart',
            api: '/api/chart?name=${name}'
          }
        ]
      },
      {},
      makeEnv({fetcher})
    )
  );

  // 初始渲染 chart initFetch 请求一次
  await wait(300);
  expect(
    fetcher.mock.calls.filter((c: any[]) => c[0]?.url === '/api/chart?name=')
      .length
  ).toBe(1);

  // 修改表单值后提交，触发 form.target 联动，chart 只应再请求一次
  const input = document.querySelector(
    'input[name="name"]'
  ) as HTMLInputElement;
  fireEvent.change(input, {target: {value: 'amis'}});
  await wait(100);
  fireEvent.click(getByText('Submit'));
  await wait(500);

  expect(
    fetcher.mock.calls.filter(
      (c: any[]) => c[0]?.url === '/api/chart?name=amis'
    ).length
  ).toBe(1);
});
