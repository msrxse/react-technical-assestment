import { createContext, useContext, useReducer } from 'react'

import { RenderTree } from '@/scenes/Workspace/types'
import { Menu } from '@/types/menu'

type Action =
  | { type: 'init'; payload: Menu[] }
  | {
      type: 'edit'
      payload: { activeFile: RenderTree | undefined; newContents: string }
    }
  | {
      type: 'default'
    }
type Dispatch = (action: Action) => void
interface State {
  data: RenderTree[]
  editedMenuData: Menu[]
}
interface WorkspaceProviderProps {
  children: React.ReactNode
}

const WorkspaceStateContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined,
)

const initData = (paths: Menu[] | undefined) => {
  const result: RenderTree[] = []
  const level = { result }

  paths?.map((each) => {
    const names = each.path.split('/')
    return names.reduce<any>((acc, name, currentIndex) => {
      if (!acc[name]) {
        acc[name] = { result: [] }
        acc.result.push({
          id: `${each.id} - ${currentIndex}`,
          name,
          ...(name.includes('.')
            ? { contents: each.contents ?? '' }
            : { children: acc[name].result }),
        })
      }

      return acc[name]
    }, level)
  })

  return result
}

interface EditDataProps {
  id: string | undefined
  editedMenuData: Menu[]
  contents: string
}

const editData = ({ id, editedMenuData, contents }: EditDataProps) => {
  if (!contents || !id) {
    return []
  }

  return editedMenuData.map((each) =>
    each.id === Number(id[0])
      ? {
          ...each,
          contents,
        }
      : each,
  )
}

function workspaceReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'init': {
      const data = action.payload

      return { editedMenuData: data, data: initData(data) }
    }
    case 'edit': {
      const { activeFile, newContents } = action.payload
      const editedDataResult = editData({
        id: activeFile?.id,
        editedMenuData: state.editedMenuData,
        contents: newContents,
      })

      const newState = initData(editedDataResult)

      return { editedMenuData: editedDataResult, data: newState }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const initialState = {
  data: [],
  editedMenuData: [],
}

function WorkspaceProvider({ children }: WorkspaceProviderProps) {
  const [state, dispatch] = useReducer(workspaceReducer, initialState)

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch }

  return <WorkspaceStateContext.Provider value={value}>{children}</WorkspaceStateContext.Provider>
}

function useWorkspace() {
  const context = useContext(WorkspaceStateContext)
  if (context === undefined) {
    throw new Error(`useWorkspace must be used within a WorkspaceProvider`)
  }
  return context
}

const init = (dispatch: Dispatch, payload: Menu[]) => dispatch({ type: 'init', payload })
const edit = (
  dispatch: Dispatch,
  payload: { activeFile: RenderTree | undefined; newContents: string },
) => dispatch({ type: 'edit', payload })

export { WorkspaceProvider, useWorkspace, init, edit }
