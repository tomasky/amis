import React from 'react';
import {render} from '@testing-library/react';
import {Html} from '../src/components/Html';
import {HTMLFilterContext} from '../src/HTMLFilterContext';

test('filters HTML supplied without an explicit filter prop', () => {
  const {container} = render(
    <HTMLFilterContext.Provider
      value={input => input.replace(/<script[^>]*>.*?<\/script>/gi, '')}
    >
      <Html
        html="<b>safe</b><script>alert(1)</script>"
        classnames={(value: string) => value}
        classPrefix="cxd-"
        inline
      />
    </HTMLFilterContext.Provider>
  );

  expect(container.querySelector('span')?.innerHTML).toBe('<b>safe</b>');
});
