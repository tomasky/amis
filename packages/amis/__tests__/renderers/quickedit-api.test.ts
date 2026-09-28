import {getQuickEditApi} from '../../src/renderers/QuickEdit';

test('uses the CRUD item API for boolean immediate save', () => {
  expect(getQuickEditApi(true, '/api/item')).toBe('/api/item');
});

test('uses the column API for object immediate save', () => {
  expect(getQuickEditApi({api: '/api/column'}, '/api/item')).toBe(
    '/api/column'
  );
});

test('preserves the CRUD item API for direct saves', () => {
  expect(getQuickEditApi(undefined, '/api/item')).toBe('/api/item');
});

test('reports an invalid object configuration', () => {
  expect(() => getQuickEditApi({} as any, '/api/item')).toThrow(
    'quickEdit.saveImmediately.api is required'
  );
});
