import React from 'react';
import {render, screen} from '@testing-library/react';
import CityArea from '../src/components/CityArea';

test('CityArea displays a direct county of Chongqing without a district column', async () => {
  render(<CityArea value="500229" onChange={jest.fn()} />);

  expect(await screen.findByText('重庆市,城口县')).toBeInTheDocument();
});

test('CityArea still displays districts under a city', async () => {
  render(<CityArea value="110108" onChange={jest.fn()} />);

  expect(
    await screen.findByText('北京市,北京市市辖区,海淀区')
  ).toBeInTheDocument();
});
