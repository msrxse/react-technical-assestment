import { TreeItem } from '@mui/x-tree-view/TreeItem'
import { TreeView } from '@mui/x-tree-view/TreeView'

import SVGFileIcon, { getIcon } from '@/components/SVGFileIcon/SVGFileIcon'
import { useMenu } from '@/hooks/menu'
import { Menu } from '@/types/menu'

import styles from './Workspace.module.css'

interface RenderTree {
  id: string
  name: string
  contents?: string
  children?: readonly RenderTree[]
}

const initData = (paths: Menu[]) => {
  let result: RenderTree[] = []
  let level = { result }

  paths?.map((each, index) => {
    return each.path.split('/').reduce((acc, name, currentIndex) => {
      if (!acc[name]) {
        acc[name] = { result: [] }
        acc.result.push({
          id: `${index} - ${currentIndex}`,
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

export default function Workspace() {
  const { isPending, error, data } = useMenu()

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const renderTree = (nodes: RenderTree) => {
    const icon = getIcon(nodes.name)

    return (
      <div key={nodes.id}>
        <TreeItem
          key={nodes.id}
          nodeId={nodes.id}
          label={nodes.name}
          icon={<SVGFileIcon icon={icon} />}
          onClick={() => {
            if (nodes.name.includes('.')) {
              return console.log(nodes.contents)
            }
            return null
          }}
        >
          {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
      </div>
    )
  }

  return (
    <div className={styles.workspace}>
      <div className={styles.fileMenu}>
        <TreeView aria-label="rich object" defaultExpanded={['0 - 0']}>
          {renderTree(initData(data)[0])}
        </TreeView>
      </div>
      <div className={styles.editor}>
        <TreeView aria-label="rich object" defaultExpanded={['0 - 0']}>
          {renderTree(initData(data)[0])}
        </TreeView>
      </div>
    </div>
  )
}
