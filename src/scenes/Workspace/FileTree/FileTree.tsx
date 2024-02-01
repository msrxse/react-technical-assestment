import { TreeItem } from '@mui/x-tree-view/TreeItem'
import { TreeView } from '@mui/x-tree-view/TreeView'

import SVGFileIcon, { getIcon } from '@/components/SVGFileIcon/SVGFileIcon'

import { useWorkspace } from '../context/workspaceContext'
import { RenderTree } from '../types'
import styles from './fileTree.module.css'

interface FileTreeProps {
  setActiveFile: React.Dispatch<React.SetStateAction<RenderTree | undefined>>
}

export default function FileTree({ setActiveFile }: FileTreeProps) {
  const { state, dispatch } = useWorkspace()

  const onSingleClick = (nodes: RenderTree) => {
    if (nodes.contents) {
      return setActiveFile(nodes)
    }

    return null
  }

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
    <div className={styles.fileTree}>
      <TreeView aria-label="rich object" defaultExpanded={['1 - 0']}>
        {renderTree(state.data[0])}
      </TreeView>
    </div>
  )
}
