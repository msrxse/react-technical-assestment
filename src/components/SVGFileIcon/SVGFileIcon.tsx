import { themeIcons } from 'seti-icons'

const getIcon = themeIcons({
  blue: '#268bd2',
  grey: '#657b83',
  'grey-light': '#839496',
  green: '#859900',
  orange: '#cb4b16',
  pink: '#d33682',
  purple: '#6c71c4',
  red: '#dc322f',
  white: 'black',
  yellow: '#b58900',
  ignore: '#586e75',
})

interface SVGFileIconProps {
  icon?: { svg: string; color: string }
  size?: string
}

const SVGFileIcon = ({ icon, size = '22px' }: SVGFileIconProps) => {
  if (!icon) {
    return null
  }

  const image = icon.svg
    .replace(
      '<svg',
      `<svg width='${size}' height='${size}' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'`,
    )
    .replace(/<path/g, `<path fill='${icon.color}'`)

  return <img alt="Filetype icon" src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`} />
}

export default SVGFileIcon
export { getIcon }
