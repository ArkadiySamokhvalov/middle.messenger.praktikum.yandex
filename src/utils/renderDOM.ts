import Block from "./Block";

export default function renderDOM(rootSelector: string, component: Block) {
  const root = document.getElementById(rootSelector);

  if (!root) {
    throw new Error('Не найдена точка входа');
  }

  component.dispatchComponentDidMount();

  root.innerHTML = '';

  root.append(component.getContent()!);
}
