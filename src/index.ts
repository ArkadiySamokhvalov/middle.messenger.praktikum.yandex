/* eslint-disable @typescript-eslint/ban-ts-comment */
import renderDOM from './utils/renderDOM';
import registerComponent from './utils/registerComponent';
import RoutePage from './pages';

// @ts-ignore
import components from './components/**/index.ts';

window.addEventListener('DOMContentLoaded', () => {
  Object.values(components).forEach((component) =>
    // @ts-ignore
    registerComponent(component.default)
  );

  renderDOM('root', new RoutePage());
});
