import {fireEvent, render} from '@testing-library/react';
import '../../src';
import {render as amisRender} from '../../src';
import {makeEnv} from '../helper';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const makeSchema = (debounce: any) => ({
  type: 'page',
  body: [
    {
      type: 'button',
      label: 'btn',
      onEvent: {
        click: {
          debounce,
          actions: [{actionType: 'ajax', api: '/api/xxx'}]
        }
      }
    }
  ]
});

test('EventAction:debounce leading:true trailing:false 连续点击只触发一次', async () => {
  const fetcher = jest.fn().mockImplementation(() =>
    Promise.resolve({data: {status: 0, msg: 'ok', data: {}}})
  );
  const {getByText} = render(
    amisRender(
      makeSchema({leading: true, wait: 1000, trailing: false}),
      {},
      makeEnv({fetcher})
    )
  );

  const btn = getByText('btn');
  fireEvent.click(btn);
  fireEvent.click(btn);
  fireEvent.click(btn);

  await sleep(100);
  expect(fetcher).toHaveBeenCalledTimes(1);
});

test('EventAction:debounce trailing:true 连续点击只触发一次（尾部）', async () => {
  const fetcher = jest.fn().mockImplementation(() =>
    Promise.resolve({data: {status: 0, msg: 'ok', data: {}}})
  );
  const {getByText} = render(
    amisRender(
      makeSchema({leading: false, wait: 100, trailing: true}),
      {},
      makeEnv({fetcher})
    )
  );

  const btn = getByText('btn');
  fireEvent.click(btn);
  fireEvent.click(btn);
  fireEvent.click(btn);

  await sleep(50);
  expect(fetcher).toHaveBeenCalledTimes(0);

  await sleep(150);
  expect(fetcher).toHaveBeenCalledTimes(1);
});
