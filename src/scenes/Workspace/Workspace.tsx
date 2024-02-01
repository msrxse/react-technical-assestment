import { useEffect, useState } from 'react'

import { useMenu } from '@/hooks/menu'
import FileTree from '@/scenes/Workspace/FileTree/FileTree'

import MonacoEditor from './Editor/Editor'
import styles from './Workspace.module.css'
import { edit, init, useWorkspace } from './context/workspaceContext'
import { RenderTree } from './types'

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

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className={styles.workspace}>
      <div className={styles.fileMenu}>
        <FileTree setActiveFile={setActiveFile} />
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
