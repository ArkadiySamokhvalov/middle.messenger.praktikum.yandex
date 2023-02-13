import { expect } from 'chai';
import { set } from './set';

describe('Set helper', () => {
  it('should return passed object if it is not an object', () => {
    // arrange
    const object = 'not object';

    // act
    const result = set(object, 'test.test', 'value');

    // assert
    expect(result).to.eq(object);
  });

  it('should return passed null if null is passed as first argument', () => {
    // arrange
    const object = null;

    // act
    const result = set(object, 'test.test', 'value');

    // assert
    expect(result).to.eq(null);
  });

  it('should throw an error if path is not a string', () => {
    // arrange
    const object = {};
    const path = 3 as any;

    // act
    const func = () => set(object, path, 'value');

    // assert
    expect(func).to.throw(Error);
  });

  it('should set new property to passed object with passed vlaue', () => {
    // arrange
    const object = {};
    const path = 'a.b.c';
    const value = 'value';

    // act
    const result = set(object, path, value);

    // assert
    expect((result as any).a.b.c).to.eq(value);
  });

  it('should not return new object', () => {
    // arrange
    const object = {};
    const path = 'a.b.c';

    // act
    const result = set(object, path, 'value');

    // assert
    expect(result).to.eq(object);
  });
});
