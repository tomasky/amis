import {
  getExcelColumnValue,
  getMappedExcelCellValue
} from '../../../src/renderers/Table/exportExcel';

const column = {pristine: {}};
const map = {'1': '漂亮', '2': '开心', '3': '惊吓'};

test('maps each value when exporting an array', () => {
  const row = {type: ['1', '2']};
  expect(getMappedExcelCellValue(row.type, map, column, row)).toBe(
    '漂亮, 开心'
  );
});

test('resolves an expression column before exporting its mapping', () => {
  const row = {type: '1,2,3'};
  const value = getExcelColumnValue(row, '${type|split}');
  expect(value).toEqual(['1', '2', '3']);
  expect(getMappedExcelCellValue(value, map, column, row)).toBe(
    '漂亮, 开心, 惊吓'
  );
});

test('keeps scalar and unmatched mapping values unchanged', () => {
  const row = {type: 'unknown'};
  expect(getMappedExcelCellValue('1', map, column, row)).toBe('漂亮');
  expect(getMappedExcelCellValue(row.type, map, column, row)).toBe('unknown');
});
