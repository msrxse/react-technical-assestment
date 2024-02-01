import { screen } from '@testing-library/react'

import { renderWithQueryClient } from '@/utils/test-utils'

import Editor from './Editor'

const props = {
  value:
    'body, html {\n  height: 100%;\n  width: 100%;\n  font-family: comic-sans;\n  font-size: 1rem;\n  background: limegreen;\n}',
  language: 'css',
  onEditorChange: vitest.fn(),
}

// Missing mocking Monaco
describe('Editor', () => {
  it.skip('can render correctly', async () => {
    renderWithQueryClient(<Editor {...props} />)

    const editor = await screen.findByRole('textbox')
    expect(editor).toBeInTheDocument()
  })
})
