import {normalizeLink} from '../../src/utils/normalizeLink';

test('query navigation preserves the current tab hash after the query', () => {
  const location = {
    pathname: '/list',
    search: '?page=2',
    hash: '#tab3'
  } as Location;

  expect(normalizeLink('?page=3', location)).toBe('/list?page=3#tab3');
  expect(normalizeLink('#tab2', location)).toBe('/list?page=2#tab2');
  expect(normalizeLink('/list?page=3#tab2', location)).toBe(
    '/list?page=3#tab2'
  );
  expect(normalizeLink('/list#tab2?page=3', location)).toBe(
    '/list#tab2?page=3'
  );
});
