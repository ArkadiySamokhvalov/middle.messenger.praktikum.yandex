import Block from "./Block";
import Handlebars, { HelperOptions } from "handlebars";

export default function registerComponent(Component: typeof Block) {
  Handlebars.registerHelper(Component.name, ({ data, fn, hash} : HelperOptions) => {
    if (!data.root.children) {
      data.root.children = {};
    }

    const { children } = data.root;
    const component = new Component(hash);

    children[component.id] = component;

    // @ts-ignore
    const contents = fn ? fn(this) : '';

    return `<div data-id="id-${component.id}">${contents}</div>`;
  });
}
