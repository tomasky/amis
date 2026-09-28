import {fireEvent, render, waitFor} from '@testing-library/react';
import {render as amisRender} from '../../src';
import {makeEnv} from '../helper';

test.each([
  {clearAction: 'clear', resetAction: 'reset', syncLocation: false},
  {clearAction: 'clear-and-submit', resetAction: 'reset', syncLocation: false},
  {clearAction: 'clear', resetAction: 'reset-and-submit', syncLocation: false},
  {clearAction: 'clear', resetAction: 'reset', syncLocation: true}
])(
  'CRUD filter $clearAction and $resetAction with syncLocation=$syncLocation',
  async ({clearAction, resetAction, syncLocation}) => {
    const fetcher = jest.fn(async () => ({
      status: 200,
      headers: {},
      data: {status: 0, data: {count: 0, rows: []}}
    }));
    const updateLocation = jest.fn();
    const {container, getByText} = render(
      amisRender(
        {
          type: 'crud',
          api: '/api/items',
          syncLocation,
          defaultParams: {fixed: 'team-1'},
          filter: {
            body: [
              {type: 'input-text', name: 'scope', value: 'mine'},
              {type: 'hidden', name: 'tenant', value: 'team-1'}
            ],
            actions: [
              {type: 'button', actionType: clearAction, label: 'Clear'},
              {type: 'button', actionType: resetAction, label: 'Reset'}
            ]
          },
          headerToolbar: [],
          footerToolbar: [],
          columns: [{name: 'name', label: 'Name'}]
        },
        {},
        makeEnv({fetcher, updateLocation})
      )
    );

    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
    expect(fetcher.mock.calls[0][0].query).toMatchObject({
      scope: 'mine',
      tenant: 'team-1',
      fixed: 'team-1'
    });

    fireEvent.click(getByText('Clear'));
    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2));
    expect(fetcher.mock.calls[1][0].query).toMatchObject({
      scope: '',
      tenant: 'team-1',
      fixed: 'team-1',
      page: 1
    });
    if (syncLocation) {
      await waitFor(() =>
        expect(
          updateLocation.mock.calls.some(
            ([url]) =>
              url.includes('fixed=team-1') && !url.includes('scope=mine')
          )
        ).toBe(true)
      );
    }
    await waitFor(() =>
      expect(container.querySelector('input[name="scope"]')).toHaveValue('')
    );

    fireEvent.click(getByText('Reset'));
    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(3));
    expect(fetcher.mock.calls[2][0].query).toMatchObject({
      scope: 'mine',
      tenant: 'team-1',
      fixed: 'team-1'
    });
    await waitFor(() =>
      expect(container.querySelector('input[name="scope"]')).toHaveValue('mine')
    );
  }
);
