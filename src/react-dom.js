import { TAG_ROOT } from "./constants"

function render(element, container) {
  const rootFiber = {
    tag: TAG_ROOT,
    props: { children: [element] },
    stateNode: container
  }
  ScheduleRoot(rootFiber)
}

const ReactDOM = {
  render
}

export default ReactDOM
export {
  render
}