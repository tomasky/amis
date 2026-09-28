import React from 'react';
import classNames from 'classnames';
import {render} from '@testing-library/react';
import {Table} from '../../../../amis-ui/src/components/table';

test('Table2 builds columns once for all rows', () => {
  let breakpointReads = 0;
  const column = {
    title: 'Score',
    name: 'score',
    get breakpoint() {
      breakpointReads++;
      return undefined;
    },
    render: (value: number) => value
  };
  const dataSource = Array.from({length: 20}, (_, score) => ({score}));

  const view = render(
    <Table
      {...({
        columns: [column],
        dataSource,
        lazyRenderAfter: 100,
        classnames: classNames,
        classPrefix: 'cxd-'
      } as any)}
    />
  );

  expect(view.container.querySelectorAll('tbody tr')).toHaveLength(20);
  expect(view.container.querySelectorAll('tbody td')).toHaveLength(20);
  expect(breakpointReads).toBeLessThan(dataSource.length);
});
