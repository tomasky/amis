import React from 'react';
import {render} from '@testing-library/react';
import {TableCell} from '../../../src/renderers/Table/TableCell';

function makeRows(values: number[], onRead: () => void) {
  return values.map(value => ({
    get score() {
      onRead();
      return value;
    }
  }));
}

test('background scale scans each rows array once per column', () => {
  let reads = 0;
  const values = [1, 5, 9];
  const rows = makeRows(values, () => reads++);
  const column = {name: 'score', backgroundScale: {}};
  const renderCells = (source: typeof rows) => (
    <table>
      <tbody>
        <tr>
          {values.map((value, index) => (
            <TableCell
              key={index}
              {...({
                classnames: (name: string) => name,
                render: () => null,
                column,
                data: {rows: source, score: value},
                value
              } as any)}
            />
          ))}
        </tr>
      </tbody>
    </table>
  );

  const view = render(renderCells(rows));
  expect(reads).toBe(values.length);
  expect(view.container.querySelectorAll('td')).toHaveLength(values.length);

  const nextRows = makeRows(values, () => reads++);
  view.rerender(renderCells(nextRows));
  expect(reads).toBe(values.length * 2);
});
