import {normalizeDate} from '../src/utils/date';

test('normalizes a UTC timestamp when the configured format does not match', () => {
  const date = normalizeDate('1710000000', 'YYYY-MM-DD', {utc: true});

  expect(date?.valueOf()).toBe(1710000000000);
});
