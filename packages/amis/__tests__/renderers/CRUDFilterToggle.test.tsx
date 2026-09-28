import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react';
import {render as amisRender} from '../../src';
import {makeEnv} from '../helper';
import CRUD from '../../src/renderers/CRUD';

test('filter toggler does not submit a containing form', async () => {
  const initSpy = jest.spyOn(CRUD.prototype, 'handleFilterInit');
  const onSubmit = jest.fn(event => event.preventDefault());
  const fetcher = jest.fn(async () => ({
    status: 200,
    headers: {},
    data: {status: 0, data: {count: 1, rows: [{id: 1, name: 'first'}]}}
  }));
  const {container} = render(
    <form onSubmit={onSubmit}>
      {amisRender(
        {
          type: 'crud',
          api: '/api/items',
          syncLocation: false,
          filterTogglable: true,
          filterDefaultVisible: false,
          filter: {body: [{type: 'input-text', name: 'keyword'}]},
          headerToolbar: ['filter-toggler'],
          footerToolbar: [],
          columns: [{name: 'name', label: 'Name'}]
        },
        {},
        makeEnv({fetcher})
      )}
    </form>
  );

  await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
  const toggle = container.querySelector('.cxd-Crud .cxd-Button')!;
  expect(toggle).toHaveAttribute('type', 'button');
  fireEvent.click(toggle);
  await waitFor(() =>
    expect(container.querySelector('.cxd-Crud-filter')).toBeInTheDocument()
  );
  await waitFor(() => expect(initSpy).toHaveBeenCalledTimes(2));
  expect(fetcher).toHaveBeenCalledTimes(1);
  fireEvent.click(toggle);
  await waitFor(() =>
    expect(container.querySelector('.cxd-Crud-filter')).not.toBeInTheDocument()
  );
  fireEvent.click(toggle);
  await waitFor(() => expect(initSpy).toHaveBeenCalledTimes(3));
  expect(onSubmit).not.toHaveBeenCalled();
  expect(fetcher).toHaveBeenCalledTimes(1);
  initSpy.mockRestore();
});

test('opening a filter loads data when the form adds a default value', async () => {
  const fetcher = jest.fn(async () => ({
    status: 200,
    headers: {},
    data: {status: 0, data: {count: 0, rows: []}}
  }));
  const {container} = render(
    amisRender(
      {
        type: 'crud',
        api: '/api/items',
        syncLocation: false,
        filterTogglable: true,
        filterDefaultVisible: false,
        filter: {
          body: [{type: 'input-text', name: 'keyword', value: 'ready'}]
        },
        headerToolbar: ['filter-toggler'],
        footerToolbar: [],
        columns: [{name: 'name', label: 'Name'}]
      },
      {},
      makeEnv({fetcher})
    )
  );

  await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
  fireEvent.click(container.querySelector('.cxd-Crud .cxd-Button')!);
  await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2));
});
