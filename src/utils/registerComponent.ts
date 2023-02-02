import { Block } from './Block';
import Handlebars, { HelperOptions } from 'handlebars';

export function registerComponent(Component: typeof Block) {
  Handlebars.registerHelper(
    Component.componentName,
    ({ data, fn, hash }: HelperOptions) => {
      if (!data.root.children) {
        data.root.children = {};
      }

      const { children } = data.root;
      const component = new Component(hash);

      children[component.id] = component;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const contents = fn ? fn(this) : '';

      return `<div data-id="id-${component.id}">${contents}</div>`;
    }
  );
}
