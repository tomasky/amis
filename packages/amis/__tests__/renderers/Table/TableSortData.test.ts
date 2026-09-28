import {getSortData} from '../../../../amis-ui/src/components/table/util';

const columns = [
  {
    name: 'score',
    sorter: (left: any, right: any) => left.score - right.score
  }
];

test('unsorted Table2 data keeps its array and rows', () => {
  const rows = [{score: 2}, {score: 1}];
  expect(getSortData(rows, columns as any, 'children')).toBe(rows);
  expect(
    getSortData(rows, columns as any, 'children', {
      orderBy: 'missing',
      orderDir: 'asc'
    })
  ).toBe(rows);
});

test('Table2 sorts each nested row array without changing its input', () => {
  const rows = [
    {score: 2, children: [{score: 4}, {score: 3}]},
    {score: 1, children: [{score: 6}, {score: 5}]}
  ];

  const sorted = getSortData(rows, columns as any, 'children', {
    orderBy: 'score',
    orderDir: 'asc'
  });

  expect(sorted.map(row => row.score)).toEqual([1, 2]);
  expect(sorted[0].children.map((row: any) => row.score)).toEqual([5, 6]);
  expect(sorted[1].children.map((row: any) => row.score)).toEqual([3, 4]);
  expect(rows[0].children.map(row => row.score)).toEqual([4, 3]);
});
