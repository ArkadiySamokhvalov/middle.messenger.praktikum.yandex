import { expect } from 'chai';
import { Block } from './Block';

describe('Block', () => {
  class Component extends Block {
    render() {
      return '<div></div>';
    }
  }

  it('should have own id if created', () => {
    const instance = new Component({});
    const typeOfId = typeof instance.id;
    expect(typeof instance.id).to.eq(typeOfId);
  });
});
