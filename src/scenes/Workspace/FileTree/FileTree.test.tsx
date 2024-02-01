import { fireEvent, screen } from '@testing-library/react'

import { renderWithQueryClient } from '@/utils/test-utils'

import { useWorkspace } from '../context/workspaceContext'
import FileTree from './FileTree'

vitest.mock('../context/workspaceContext')
const mockUseWorkspace = useWorkspace as jest.MockedFunction<typeof useWorkspace>
const state = {
  editedMenuData: [
    {
      id: 1,
      path: 'app/src/App.tsx',
      contents:
        "import React from 'react'\nimport { WidgetList } from './WidgetList/WidgetList'\nimport featuredWidgets from '../data/featuredWidgets'\nimport clearanceWidgets from '../data/clearanceWidgets'\nimport discontinuedWidgets from '../data/discontinuedWidgets'\n\nconst widgets = featuredWidgets + clearanceWidgets + discontinuedWidgets\n\nexport const App = () => {\n  return (\n    <div>\n      <h1>Widgets R Us</h1>\n      <WidgetList widgets={widgets} />\n    </div>\n  )\n}",
    },
    {
      id: 2,
      path: 'app/data/featuredWidgets.js',
      contents:
        "export default [\n  { name: 'spadoink', price: 777 },\n  { name: 'kafloof', price: 1326 },\n  { name: 'sweezil', price: 966 }\n]",
    },
  ],
  data: [
    {
      id: '1 - 0',
      name: 'app',
      children: [
        {
          id: '1 - 1',
          name: 'src',
          children: [
            {
              id: '1 - 2',
              name: 'App.tsx',
              contents:
                "import React from 'react'\nimport { WidgetList } from './WidgetList/WidgetList'\nimport featuredWidgets from '../data/featuredWidgets'\nimport clearanceWidgets from '../data/clearanceWidgets'\nimport discontinuedWidgets from '../data/discontinuedWidgets'\n\nconst widgets = featuredWidgets + clearanceWidgets + discontinuedWidgets\n\nexport const App = () => {\n  return (\n    <div>\n      <h1>Widgets R Us</h1>\n      <WidgetList widgets={widgets} />\n    </div>\n  )\n}",
            },
          ],
        },
        {
          id: '2 - 1',
          name: 'data',
          children: [
            {
              id: '2 - 2',
              name: 'featuredWidgets.js',
              contents:
                "export default [\n  { name: 'spadoink', price: 777 },\n  { name: 'kafloof', price: 1326 },\n  { name: 'sweezil', price: 966 }\n]",
            },
          ],
        },
      ],
    },
  ],
}

/**
 * Mocking data comming from context hooks
 * https://stackoverflow.com/questions/60270013/how-to-mock-react-custom-hook-returned-value
 */
describe('FileTree', () => {
  const setActiveFile = vitest.fn()

  mockUseWorkspace.mockReturnValue({
    state: { data: state.data, editedMenuData: state.editedMenuData },
    dispatch: vitest.fn(),
  })

  it('should render 1 tree', () => {
    renderWithQueryClient(<FileTree setActiveFile={setActiveFile} />)
    const list = screen.getAllByRole('tree')

    expect(list.length).toBe(1)
  })

  it('should render 3 tree items', () => {
    renderWithQueryClient(<FileTree setActiveFile={setActiveFile} />)
    const list = screen.getAllByRole('treeitem')

    expect(list.length).toBe(3)
  })

  it('should render 1 icon per row (3 total)', () => {
    renderWithQueryClient(<FileTree setActiveFile={setActiveFile} />)
    const list = screen.getAllByRole('img', { name: /Filetype icon/i })

    expect(list.length).toBe(3)
  })

  it.skip('tree item click should call cb', () => {
    renderWithQueryClient(<FileTree setActiveFile={setActiveFile} />)
    const list = screen.getAllByRole('treeitem')

    fireEvent.click(list[0])
    expect(setActiveFile).toHaveBeenCalled()
  })
})
