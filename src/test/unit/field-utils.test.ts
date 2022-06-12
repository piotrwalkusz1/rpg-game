import { Entity } from 'engine/core/ecs';
import { FieldObject, tryGetField, tryGetParentField } from 'engine/core/field';
import { mockField } from 'test/mock/mock-field';

describe('tryGetField', () => {
  it('should return field if field provider is entity with field', () => {
    const field = mockField();
    const entity = new Entity();
    entity.addComponent(field);

    expect(tryGetField(entity)).toBe(field);
  });

  it('should return field if field provider is entity with field object', () => {
    const field = mockField();
    const fieldObject = new FieldObject({ field: field });
    const entity = new Entity();
    entity.addComponent(fieldObject);

    expect(tryGetField(entity)).toBe(field);
  });

  it('should return undefined if field provider is entity with field object but field object has no field', () => {
    const fieldObject = new FieldObject();
    const entity = new Entity();
    entity.addComponent(fieldObject);

    expect(tryGetField(entity)).toBeUndefined();
  });
});

describe('tryGetParentField', () => {
  it('should return undefined if field provder does not provide field', () => {
    expect(tryGetParentField(new Entity())).toBeUndefined();
  });
});
