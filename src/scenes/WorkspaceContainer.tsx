import Workspace from '@/scenes/Workspace/Workspace'
import { WorkspaceProvider } from '@/scenes/Workspace/context/workspaceContext'

const WorkspaceContainer = () => (
  <WorkspaceProvider>
    <Workspace />
  </WorkspaceProvider>
)

export default WorkspaceContainer
