import { render, screen } from '@testing-library/react'

import SVGFileIcon from './SVGFileIcon'

const props = {
  svg: '<svg viewBox="0 0 1200 1000"><path d="M394.1 537.8h411.7v54.7H394.1v-54.7zm0-130.3H624v54.7H394.1v-54.7zm0-130.3h411.7v54.7H394.1v-54.7zm0 390.9H700v54.7H394.1v-54.7z"/></svg>',
  color: 'black',
}

describe('SVGFileIcon', () => {
  it('should render when props given', () => {
    render(<SVGFileIcon icon={props} />)
    expect(screen.getByRole('img', { name: /filetype icon/i })).toBeInTheDocument()
  })
})
