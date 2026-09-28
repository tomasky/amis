import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '../../src';
import {render as amisRender} from '../../src';
import {makeEnv} from '../helper';

test('CRUD drawer can open the next row', async () => {
  render(
    amisRender(
      {
        type: 'crud',
        data: {
          items: [
            {id: 1, name: 'First'},
            {id: 2, name: 'Second'}
          ]
        },
        columns: [
          {name: 'name', label: 'Name'},
          {
            type: 'operation',
            label: 'Action',
            buttons: [
              {
                type: 'button',
                label: 'Open drawer',
                actionType: 'drawer',
                drawer: {
                  title: 'Edit row',
                  body: {type: 'tpl', tpl: 'Current ${name}'},
                  actions: [
                    {
                      type: 'button',
                      label: 'Previous row',
                      actionType: 'prev',
                      visibleOn: 'data.hasPrev'
                    },
                    {
                      type: 'button',
                      label: 'Next row',
                      actionType: 'next',
                      visibleOn: 'data.hasNext'
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      {},
      makeEnv({})
    )
  );

  fireEvent.click(screen.getAllByText('Open drawer')[0]);
  await waitFor(() => expect(screen.getByText('Current First')).toBeVisible());

  fireEvent.click(screen.getByText('Next row'));
  await waitFor(() => expect(screen.getByText('Current Second')).toBeVisible());
  expect(screen.queryByText('Next row')).not.toBeInTheDocument();

  fireEvent.click(screen.getByText('Previous row'));
  await waitFor(() => expect(screen.getByText('Current First')).toBeVisible());
});
