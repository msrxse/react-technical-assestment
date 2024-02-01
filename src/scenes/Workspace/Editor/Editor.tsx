import Editor from '@monaco-editor/react'

import styles from './Editor.module.css'

interface EditorProps {
  value: string
  language: string
  onEditorChange: (contents: string | undefined) => void
}

const editorOptions = {
  formatOnPaste: true,
  formatOnType: true,
  minimap: {
    enabled: false,
  },
}

const MonacoEditor = ({ value, language, onEditorChange }: EditorProps) => {
  return (
    <div className={styles.editor}>
      <Editor
        height="100%"
        language={language}
        value={value}
        options={editorOptions}
        onChange={onEditorChange}
      />
    </div>
  )
}

export default MonacoEditor
