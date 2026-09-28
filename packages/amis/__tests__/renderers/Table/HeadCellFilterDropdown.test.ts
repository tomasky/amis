import {HeadCellFilterDropDown} from '../../../src/renderers/Table/HeadCellFilterDropdown';

test('uses parent data when loading column filter options', async () => {
  const fetcher = jest.fn().mockResolvedValue({
    data: {options: [{label: 'One', value: '1'}]}
  });
  const superData = {target_project_id: 42};
  const dropdown = new HeadCellFilterDropDown({
    env: {fetcher},
    filterable: {
      source: {
        url: '/api/projects',
        data: {ignore_project_id: '${target_project_id}'}
      }
    },
    name: 'project',
    data: {},
    superData
  } as any);
  dropdown.setState = jest.fn();

  await dropdown.fetchOptions();

  expect(fetcher).toHaveBeenCalledWith(
    expect.objectContaining({
      url: '/api/projects',
      data: {ignore_project_id: '${target_project_id}'}
    }),
    superData
  );
  expect(dropdown.setState).toHaveBeenCalledWith({
    filterOptions: [
      expect.objectContaining({label: 'One', value: '1', visible: true})
    ]
  });
});
