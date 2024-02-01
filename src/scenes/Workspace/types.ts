export interface RenderTree {
  id: string
  name: string
  contents?: string
  children?: readonly RenderTree[]
}
