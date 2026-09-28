import React from 'react';
import {render} from '@testing-library/react';
import TableContent from '../../src/renderers/Table/TableContent';
import {TableBody} from '../../src/renderers/Table/TableBody';

test('loading changes do not render unchanged table rows again', () => {
  const renderRows = jest.spyOn(TableBody.prototype, 'renderRows');
  const row = {
    id: 'row-1',
    depth: 1,
    newIndex: 0,
    children: [],
    rowSpans: {},
    data: {},
    locals: {},
    markAppeared: jest.fn()
  };
  const store = {
    rows: [row],
    lazyRenderAfter: 100,
    tableLayout: 'auto',
    initTableWidth: jest.fn(),
    syncTableWidth: jest.fn()
  };
  const props = {
    classnames: (...names: any[]) => names.filter(Boolean).join(' '),
    columns: [],
    columnsGroup: [],
    rows: [row],
    store,
    render: jest.fn(),
    renderHeadCell: jest.fn(),
    renderCell: jest.fn(),
    onScroll: jest.fn(),
    tableRef: jest.fn(),
    onCheck: jest.fn(),
    onRowClick: jest.fn(),
    onRowDbClick: jest.fn(),
    onRowMouseEnter: jest.fn(),
    onRowMouseLeave: jest.fn(),
    footableColumns: [],
    locale: 'zh-CN',
    translate: (value: string) => value
  } as any;

  try {
    const {rerender} = render(<TableContent {...props} loading={false} />);
    expect(renderRows).toHaveBeenCalledTimes(1);

    rerender(<TableContent {...props} loading />);
    expect(renderRows).toHaveBeenCalledTimes(1);

    rerender(
      <TableContent {...props} loading onEvent={{rowClick: jest.fn()}} />
    );
    expect(renderRows).toHaveBeenCalledTimes(2);
  } finally {
    renderRows.mockRestore();
  }
});
