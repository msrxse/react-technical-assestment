import { useEffect, useState } from 'react'

import { TreeItem } from '@mui/x-tree-view/TreeItem'
import { TreeView } from '@mui/x-tree-view/TreeView'

import SVGFileIcon, { getIcon } from '@/components/SVGFileIcon/SVGFileIcon'
import { useMenu } from '@/hooks/menu'

import MonacoEditor from './Editor/Editor'
import styles from './Workspace.module.css'
import { edit, init, useWorkspace } from './context/workspaceContext'

interface RenderTree {
  id: string
  name: string
  contents?: string
  children?: readonly RenderTree[]
}

const getLanguageFromFilePath = (filePath: string) => {
  if (filePath.endsWith('.html')) {
    return 'html'
  } else if (filePath.endsWith('.css')) {
    return 'css'
  } else if (['.js', '.jsx', '.ts', '.tsx'].some((extension) => filePath.endsWith(extension))) {
    return 'javascript'
  }

  return 'plaintext'
}

export default function Workspace() {
  const { state, dispatch } = useWorkspace()
  const { isPending, error, data } = useMenu()
  const [activeFile, setActiveFile] = useState<RenderTree | undefined>()

  /**
   * INIT menu data
   */
  useEffect(() => {
    if (data) {
      init(dispatch, data)
    }
  }, [dispatch, data])

  const onSingleClick = (nodes: RenderTree) => {
    if (nodes.contents) {
      return setActiveFile(nodes)
    }

    return null
  }

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const renderTree = (nodes: RenderTree) => {
    if (!nodes) {
      return null
    }

    const icon = getIcon(nodes.name)

    return (
      <div key={nodes.id}>
        <TreeItem
          key={nodes.id}
          nodeId={nodes.id}
          label={nodes.name}
          icon={<SVGFileIcon icon={icon} />}
          onClick={() => onSingleClick(nodes)}
        >
          {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
      </div>
    )
  }

  return (
    <div className={styles.workspace}>
      <div className={styles.fileMenu}>
        <TreeView aria-label="rich object" defaultExpanded={['1 - 0']}>
          {renderTree(state.data[0])}
        </TreeView>
      </div>
      <div className={styles.editor}>
        {activeFile && activeFile.contents ? (
          <MonacoEditor
            value={activeFile.contents}
            language={getLanguageFromFilePath(activeFile.name)}
            onEditorChange={(newContents) =>
              edit(dispatch, { activeFile, newContents: newContents || '' })
            }
          />
        ) : null}
      </div>
    </div>
  )
}
