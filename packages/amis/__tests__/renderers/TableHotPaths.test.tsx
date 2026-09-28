import Table from '../../src/renderers/Table';
import {getTwoRowHeaderColumns} from '../../src/renderers/Table/TableContent';

test('wide grouped headers identify columns by object reference', () => {
  const columns = Array.from({length: 32}, (_, index) => ({index})) as any[];
  const groups = [
    {rowSpan: 2, has: columns.slice(0, 16)},
    {rowSpan: 1, has: columns.slice(16)}
  ];

  expect(getTwoRowHeaderColumns(columns.slice(0, 16), groups)).toBeUndefined();
  const twoRowColumns = getTwoRowHeaderColumns(columns, groups);
  expect(twoRowColumns?.has(columns[0])).toBe(true);
  expect(twoRowColumns?.has(columns[15])).toBe(true);
  expect(twoRowColumns?.has(columns[16])).toBe(false);
  expect(twoRowColumns?.has({...columns[0]})).toBe(false);
});

test('row hover updates only the previous and target rows', () => {
  const makeRow = (id: string) => {
    const row = {
      id,
      isHover: false,
      children: [] as any[],
      setIsHover: jest.fn()
    };
    row.setIsHover.mockImplementation((value: boolean) => {
      row.isHover = value;
    });
    return row;
  };
  const parent = makeRow('parent');
  const child = makeRow('child');
  parent.children.push(child);
  const rows = [parent];
  const findRow = (id: string): any =>
    rows.flatMap(row => [row, ...row.children]).find(row => row.id === id);
  const store = {
    rows,
    get hoverRow() {
      return rows
        .flatMap(row => [row, ...row.children])
        .find(row => row.isHover);
    },
    getRowById: jest.fn(findRow)
  };
  const table = {props: {store}} as any;
  const moveTo = (id: string) => {
    const tr = document.createElement('tr');
    tr.dataset.id = id;
    const td = document.createElement('td');
    tr.appendChild(td);
    Table.prototype.handleMouseMove.call(table, {target: td} as any);
  };

  moveTo('child');
  expect(child.setIsHover).toHaveBeenCalledTimes(1);
  expect(child.isHover).toBe(true);

  moveTo('child');
  expect(child.setIsHover).toHaveBeenCalledTimes(1);

  moveTo('parent');
  expect(child.setIsHover).toHaveBeenLastCalledWith(false);
  expect(parent.setIsHover).toHaveBeenLastCalledWith(true);

  Table.prototype.handleMouseLeave.call(table);
  expect(parent.setIsHover).toHaveBeenLastCalledWith(false);

  moveTo('missing');
  expect(store.hoverRow).toBeUndefined();

  const replacement = makeRow('parent');
  rows[0] = replacement;
  moveTo('parent');
  expect(replacement.setIsHover).toHaveBeenLastCalledWith(true);
});
