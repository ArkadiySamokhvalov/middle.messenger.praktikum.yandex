// eslint-disable-next-line @typescript-eslint/no-var-requires
const { JSDOM } = require('jsdom');

const dom = new JSDOM(
  '<!DOCTYPE html><body><div id="root"></div></body></html>',
);

global.window = dom.window;
global.document = dom.window.document;
