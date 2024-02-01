import { act, renderHook } from '@testing-library/react'

import { Menu } from '@/types/menu'
import { createQueryHookWrapper } from '@/utils/test-utils'

import { edit, init, useWorkspace } from './workspaceContext'

describe('useWorkspace', () => {
  it('should return empty state', async () => {
    const { result } = renderHook(() => useWorkspace(), {
      wrapper: createQueryHookWrapper(),
    })

    expect(result.current.state.editedMenuData).toHaveLength(0)
    expect(result.current.state.data).toHaveLength(0)
  })

  it('init changes state as expected', () => {
    const { result } = renderHook(() => useWorkspace(), {
      wrapper: createQueryHookWrapper(),
    })
    const menuData: Menu[] = [
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
    ]
    const resultedState = [
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
    ]
    act(() => {
      init(result.current.dispatch, menuData)
    })

    expect(result.current.state.editedMenuData).toEqual(menuData)
    expect(result.current.state.data).toEqual(resultedState)
  })

  /**
   * NOTE: will need to mock previous state since edit() uses state to output
   */
  it.skip('edit changes state as expected', () => {
    const { result } = renderHook(() => useWorkspace(), {
      wrapper: createQueryHookWrapper(),
    })
    const menuData: Menu[] = [
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
    ]
    const givenChange = {
      id: '1 - 2',
      name: 'App.tsx',
      contents: "import React from 'react'",
    }
    const resultedState = [
      {
        id: '1 - 0',
        name: 'app',
        children: [
          {
            id: '1 - 2',
            name: 'src',
            children: [
              {
                id: '1 - 2',
                name: 'App.tsx',
                contents: 'import React from react',
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
    ]
    act(() => {
      edit(result.current.dispatch, {
        activeFile: givenChange,
        newContents: 'import React from react',
      })
    })

    expect(result.current.state.editedMenuData).toEqual(menuData)
    expect(result.current.state.data).toEqual(resultedState)
  })

  it('should error out, when called without workspaceContext', () => {
    expect(() => {
      useWorkspace()
    }).toThrowError()
  })
})
