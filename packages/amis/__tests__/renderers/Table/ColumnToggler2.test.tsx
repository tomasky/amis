import React from 'react';
import {ColumnTogglerRenderer} from '../../../src/renderers/Table2/ColumnToggler';

test('passes the actual column when hidden columns precede the clicked item', () => {
  const columns = [
    {name: 'hidden', label: 'Hidden', toggable: false, toggled: false},
    {name: 'visible', label: 'Visible', toggled: true}
  ];
  const toggleToggle = jest.fn();
  const renderer = new ColumnTogglerRenderer({
    cols: columns,
    toggleToggle,
    classnames: (value: string) => value,
    classPrefix: 'cxd-',
    translate: (value: string) => value,
    render: () => null,
    env: {getModalContainer: () => document.body},
    data: {}
  } as any);

  const menu = renderer.render() as React.ReactElement;
  const items = React.Children.toArray(menu.props.children);
  const columnItem = items[1] as React.ReactElement;
  columnItem.props.onClick();

  expect(toggleToggle).toHaveBeenCalledWith(columns[1]);
});
