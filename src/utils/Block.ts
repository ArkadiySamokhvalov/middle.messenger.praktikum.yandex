import EventBus from "./EventBus";
import { nanoid } from 'nanoid';
import Handlebars from "handlebars";

type BlockEvents<P = any> = {
  "init": [];
  "flow:component-did-mount": [];
  "flow:component-did-update": [P, P];
  "flow:render": [];
};

type Props<P extends Record<string, unknown> = any> = {
  events?: Record<string, () => void>;
} & P;

export default class Block<P extends Record<string, unknown> = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;
  private _element: HTMLElement | null = null;
  private _meta: { props: any };
  private _eventBus: () => EventBus<BlockEvents<Props<P>>>;
  protected props: Props<P>;
  protected name: string | null = null;
  public children: Record<string, Block>;
  public id = nanoid(6);

  constructor(propsWithChildren: Props<P> = {} as Props<P>) {
    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this._meta = { props };
    this.props = this._makePropsProxy(props);
    this.children = children;
    this.initChildren();

    const eventBus = new EventBus<BlockEvents<Props<P>>>();
    this._eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildrenAndProps(childrenAndProps: Props<P>): {
    props: Props<P>;
    children: Record<string, Block>;
  } {
    const props = {} as Record<string, unknown>;
    const children: Record<string, Block> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      }
      // else if (Array.isArray(value) && value.every(v => (v instanceof Block))) {
      //   children[key] = value;
      // }
      else {
        props[key] = value;
      }
    });

    return { props: props as Props<P>, children };
  }

  private _makePropsProxy(props: Props<P>) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as string];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = {...target}

        target[prop as keyof Props<P>] = value;
        self._eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);

        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }

  protected initChildren() {}

  private _registerEvents(eventBus: EventBus<BlockEvents>) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {}

  public dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate(oldProps: Props<P>, newProps: Props<P>) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: Props<P>, newProps: Props<P>) {
    return true;
  }

  private _render() {
    const template = this.render();

    const fragment = this.compile(template, {...this.props, children: this.children });

    const newElement = fragment.firstElementChild as HTMLElement;

    this._element?.replaceWith(newElement);

    this._element = newElement;

    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  private _addEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
    // const events: Record<string, () => void> = (this.props as any).events;

    // if (!events) {
    //   return;
    // }

    // Object.entries(events).forEach(([event, listener]) => {
    //   this._element!.addEventListener(event, listener);
    // });
  }

  protected compile(template: string, context: any) {
    const contextAndStubs = { ...context };
    const compiled = Handlebars.compile(template)
    const temp = this._createDocumentElement('template') as HTMLTemplateElement;

    temp.innerHTML = compiled(contextAndStubs);

    Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id="id-${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));
      stub.replaceWith(component.getContent()!);
    });

    return temp.content;
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  public setProps = (nextProps: Partial<Props<P>>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  public getContent() {
    return this.element;
  }

  protected show() {
    this.getContent()!.removeAttribute('style');
  }

  protected hide() {
    this.getContent()!.style.display = 'none';
  }
}
