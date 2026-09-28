import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '../../src';
import {render as amisRender} from '../../src';
import {makeEnv, wait} from '../helper';

test('drawer confirm respects close false without a child target', async () => {
  render(
    amisRender(
      {
        type: 'page',
        body: {
          type: 'button',
          label: 'Open drawer',
          actionType: 'drawer',
          drawer: {
            title: 'Drawer title',
            body: 'Drawer body',
            actions: [
              {
                type: 'button',
                label: 'Keep open',
                actionType: 'confirm',
                close: false
              }
            ]
          }
        }
      },
      {},
      makeEnv({})
    )
  );

  fireEvent.click(screen.getByText('Open drawer'));
  await waitFor(() => expect(screen.getByText('Drawer title')).toBeVisible());

  fireEvent.click(screen.getByText('Keep open'));
  await wait(200);
  expect(screen.getByText('Drawer title')).toBeVisible();
});
