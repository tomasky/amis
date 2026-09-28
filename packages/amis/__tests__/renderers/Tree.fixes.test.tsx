import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import TreeSelector from '../../../amis-ui/src/components/Tree';

const baseProps = {value: undefined, onChange: () => {}};

afterEach(() => {
  cleanup();
});

test('Tree #6229: enableNodePath + valueField 与 labelField 同名时 valuePath 不重复', () => {
  const onChange = jest.fn();
  const {getByText} = render(
    <TreeSelector
      {...baseProps}
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
      children: [{label: 'Child'}]
    }
  ];

  const {getByText, rerender} = render(
    <TreeSelector
      {...baseProps}
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
      {...baseProps}
      classPrefix="cxd"
      className="Tree"
      options={JSON.parse(JSON.stringify(options()))}
    />
  );

  // 折叠态应按路径保留，Child 不应再次出现
  expect(document.querySelector('.cxd-Tree-itemText')).toBeTruthy();
  const texts = Array.from(document.querySelectorAll('.cxd-Tree-itemText')).map(
    el => el.textContent
  );
  expect(texts).not.toContain('Child');
});

test('Tree: 超过虚拟化阈值时仍渲染后续节点，并使用配置的行高', () => {
  const options = Array.from({length: 150}, (_, index) => ({
    label: `Item ${index}`,
    value: index
  }));
  const {getByText, container} = render(
    <TreeSelector
      {...baseProps}
      classPrefix="cxd"
      className="Tree"
      virtualThreshold={2}
      itemHeight={48}
      options={options}
    />
  );

  expect(getByText('Item 2')).toBeTruthy();
  const renderedCount = container.querySelectorAll('.cxd-Tree-item').length;
  expect(renderedCount).toBeGreaterThan(1);
  expect(renderedCount).toBeLessThan(options.length);
  expect((getByText('Item 1').closest('li') as HTMLElement).style.top).toBe(
    '48px'
  );
});

test('Tree: 节点重排后展开态跟随节点', () => {
  const a = {
    label: 'A',
    value: 1,
    children: [{label: 'A child', value: 11}]
  };
  const b = {
    label: 'B',
    value: 2,
    children: [{label: 'B child', value: 21}]
  };
  const {getByText, queryByText, rerender, container} = render(
    <TreeSelector
      {...baseProps}
      classPrefix="cxd"
      className="Tree"
      options={[a, b]}
    />
  );

  fireEvent.click(
    container.querySelector('.cxd-Tree-itemArrow') as HTMLElement
  );
  expect(queryByText('A child')).toBeNull();

  rerender(
    <TreeSelector
      {...baseProps}
      classPrefix="cxd"
      className="Tree"
      options={[b, a]}
    />
  );

  expect(getByText('B child')).toBeTruthy();
  expect(queryByText('A child')).toBeNull();

  rerender(
    <TreeSelector
      {...baseProps}
      classPrefix="cxd"
      className="Tree"
      options={JSON.parse(JSON.stringify([a, b]))}
    />
  );
  expect(getByText('B child')).toBeTruthy();
  expect(queryByText('A child')).toBeNull();
});
