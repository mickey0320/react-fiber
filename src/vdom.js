import { TAG_HOST, TAG_TEXT } from "./constants";

export function createDOM(fiber) {
  if (fiber.type === TAG_TEXT) {
    return document.createTextNode(fiber.props.content)
  } else if (fiber.type === TAG_HOST) {
    const dom = document.createElement(fiber.props.type)
    // updateProps(dom, {}, fiber.props)
    return dom
  }

}