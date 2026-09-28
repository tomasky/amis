import React from 'react';
import {act, cleanup, fireEvent, render} from '@testing-library/react';
import {clearStoresCache} from '../../src';
import TreeSelector from 'amis-ui/lib/components/Tree';

afterEach(() => {
  cleanup();
  clearStoresCache();
});

test('Tree #6229: enableNodePath + valueField 与 labelField 同名时 valuePath 不重复', () => {
  const onChange = jest.fn();
  const {getByText} = render(
    <TreeSelector
      classPrefix="cxd"
      className="Tree"
      enableNodePath
      valueField="label"
      options={[
        {
          label: 'A',
          value: 1,
          children: [{label: 'A1', value: 11}]
        },
        {label: 'B', value: 2}
      ]}
      onChange={(value: any) => onChange(value)}
    />
  );

  fireEvent.click(getByText('A1'));

  expect(onChange).toHaveBeenCalled();
  const value = onChange.mock.calls[onChange.mock.calls.length - 1][0];
  // 期望值路径为 "A/A1"，不应重复成 "A/A1/A/A1"
  expect(value).toBe('A/A1');
});

test('Tree #11604: options 被克隆（新对象引用）后展开态按路径保留', () => {
  const options = () => [
    {
      label: 'Parent',
      value: 1,
      children: [{label: 'Child', value: 11}]
    }
  ];

  const {getByText, rerender} = render(
    <TreeSelector
      classPrefix="cxd"
      className="Tree"
      options={options()}
    />
  );

  // 默认 initiallyOpen，Child 可见
  expect(getByText('Child')).toBeTruthy();

  // 折叠 Parent
  fireEvent.click(document.querySelector('.cxd-Tree-itemArrow') as HTMLElement);

  // 用「克隆」后的 options（全新对象引用）重新渲染
  rerender(
    <TreeSelector
      classPrefix="cxd"
      className="Tree"
      options={JSON.parse(JSON.stringify(options()))}
    />
  );

  // 折叠态应按路径保留，Child 不应再次出现
  expect(document.querySelector('.cxd-Tree-itemText')).toBeTruthy();
  const texts = Array.from(
    document.querySelectorAll('.cxd-Tree-itemText')
  ).map(el => el.textContent);
  expect(texts).not.toContain('Child');
});
