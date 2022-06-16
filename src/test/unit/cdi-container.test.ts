import { CDIContainer } from 'cdi-container';

describe('CDIContainer', () => {
  class BaseClass {}

  class FirstChildClass extends BaseClass {
    readonly type = 'FirstChildClass';
  }

  class SecondChildChass extends BaseClass {
    readonly type = 'SecondChildChass';
  }

  describe('singleton', () => {
    it('should always get the same instance', () => {
      const container = new CDIContainer();

      container.singleton(BaseClass, () => new BaseClass());

      expect(container.get(BaseClass)).toBe(container.get(BaseClass));
    });
  });

  describe('dependent', () => {
    it('should always get different instance', () => {
      const container = new CDIContainer();

      container.dependent(BaseClass, () => new BaseClass());

      expect(container.get(BaseClass)).not.toBe(container.get(BaseClass));
    });
  });

  describe('get', () => {
    it('should return instance if only one instance exists', () => {
      const container = new CDIContainer();
      container.singleton(FirstChildClass, () => new FirstChildClass());

      const instance = container.get(FirstChildClass);

      expect(instance).toBeInstanceOf(FirstChildClass);
    });

    it('should return instance even if base class was provided', () => {
      const container = new CDIContainer();
      container.singleton(FirstChildClass, () => new FirstChildClass());

      const instance = container.get(BaseClass);

      expect(instance).toBeInstanceOf(FirstChildClass);
    });

    it('should throw error if no instances', () => {
      const container = new CDIContainer();

      expect(() => container.get(FirstChildClass)).toThrow(new Error('Expected 1 instance of FirstChildClass but was 0'));
    });

    it('should throw error if more than one instance', () => {
      const container = new CDIContainer();
      container.singleton(FirstChildClass, () => new FirstChildClass());
      container.singleton(FirstChildClass, () => new FirstChildClass());

      expect(() => container.get(FirstChildClass)).toThrow(new Error('Expected 1 instance of FirstChildClass but was 2'));
    });
  });

  describe('getAll', () => {
    it('should return empty array if no instances', () => {
      const container = new CDIContainer();

      const instances = container.getAll(BaseClass);

      expect(instances).toEqual([]);
    });

    it('should return empty array if no instances', () => {
      const container = new CDIContainer();
      container.singleton(BaseClass, () => new BaseClass());
      container.singleton(FirstChildClass, () => new FirstChildClass());
      container.singleton(SecondChildChass, () => new SecondChildChass());

      const instances = container.getAll(BaseClass);

      expect(instances).toEqual([new BaseClass(), new FirstChildClass(), new SecondChildChass()]);
    });
  });
});
