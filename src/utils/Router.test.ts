import sinon from 'sinon';
import Router from './Router';
import { expect } from 'chai';

describe('Router', () => {
  const originalForward = window.history.forward;
  const originalBack = window.history.back;

  beforeEach(() => {
    Router.reset();
    window.history.forward = sinon.fake();
    window.history.back = sinon.fake();
  });

  after(() => {
    // срабатывает после всех тестов
    window.history.forward = originalForward;
    window.history.back = originalBack;
  });

  it('forward', () => {
    Router.forward();
    expect((window.history.forward as any).callCount).to.eq(1);
  });

  it('back', () => {
    Router.back();
    expect((window.history.back as any).callCount).to.eq(1);
  });
});
