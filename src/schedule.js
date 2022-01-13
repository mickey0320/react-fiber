import { TAG_HOST, TAG_ROOT } from "./constants"
import { createDOM } from "./vdom"

let workInProgressRoot = null
let nextUnitOfWork = null
export function scheduleRoot(rootFiber) {
  workInProgressRoot = rootFiber
  nextUnitOfWork = rootFiber
}

function workLoop(deadline) {
  while (deadline.timeRemainding() > 1 || nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
  if (nextUnitOfWork) {
    requestIdleCallback(workLoop)
  }
}

function performUnitOfWork(currentFiber) {
  beginWork(currentFiber)
  if (currentFiber.child) {
    return currentFiber.child
  }
  while (currentFiber) {
    completeUnitOfWork(currentFiber)
    if (currentFiber.sibling) {
      return currentFiber.sibling
    }
    currentFiber = currentFiber.return
  }
}

function beginWork(currentFiber) {
  if (currentFiber.tag === TAG_ROOT) {
    updateHostRoot(currentFiber)
  } else if (currentFiber.tag === TAG_HOST) {
    updateHost(currentFiber)
  }
}

function updateHostRoot(currentFiber) {
  const newChildren = currentFiber.props.children
  reconcileChildren(currentFiber, newChildren)
}

function reconcileChildren(currentFiber, newChildren) {
  let index = 0
  let previousFiber
  while (index < newChildren.length) {
    const newFiber = {
      type: TAG_HOST,
      stateNode: createDOM(currentFiber),
      props: newChildren[index].props
    }
    if (index === 0) {
      currentFiber.child = newFiber
    } else {
      previousFiber.sibling = newFiber
    }
    previousFiber = newFiber
  }
}

window.requestIdleCallback(workLoop)


