import {fireEvent, render, within} from '@testing-library/react';
import {render as amisRender} from '../../src';
import {makeEnv} from '../helper';

test('mobile CRUD shows the chosen page size before updating the table', () => {
  const originalFrame = window.requestAnimationFrame;
  const originalCancel = window.cancelAnimationFrame;
  let nextFrame: FrameRequestCallback | undefined;
  window.requestAnimationFrame = callback => {
    nextFrame = callback;
    return 1;
  };
  window.cancelAnimationFrame = () => {};

  try {
    const {container} = render(
      amisRender(
        {
          type: 'crud',
          syncLocation: false,
          data: {items: [{id: 1, name: 'first'}]},
          columns: [{name: 'name', label: 'Name'}],
          footerToolbar: ['switch-per-page'],
          perPageAvailable: [10, 20]
        },
        {},
        makeEnv({isMobile: () => true})
      )
    );

    const select = container.querySelector('.cxd-Crud-pageSwitch .cxd-Select')!;
    expect(select).toHaveTextContent('10 条/页');

    fireEvent.click(select);
    fireEvent.click(within(select as HTMLElement).getByText('20 条/页'));

    expect(select.querySelector('.cxd-Select-valueWrap')).toHaveTextContent(
      '20 条/页'
    );
    expect(nextFrame).toBeDefined();
  } finally {
    window.requestAnimationFrame = originalFrame;
    window.cancelAnimationFrame = originalCancel;
  }
});
