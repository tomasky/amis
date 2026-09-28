import {getExprProperties} from '../src/utils/filter-schema';

test('keeps a fixed-column class when classNameExpr is set', () => {
  const className = getExprProperties(
    {classNameExpr: 'custom-cell'},
    {},
    undefined,
    {className: 'Table-cell-fix-left'}
  ).className;
  expect(className).toContain('custom-cell');
  expect(className).toContain('Table-cell-fix-left');
});

test('leaves expression output unchanged without a supplied class', () => {
  expect(getExprProperties({classNameExpr: 'custom-cell'}, {}).className).toBe(
    'custom-cell'
  );
});
