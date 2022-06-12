import { mockField } from 'test/mock/mock-field';

describe('Field', () => {
  describe('siblings getter', () => {
    it('should return empty array if no parent field', () => {
      expect(mockField().siblings).toEqual([]);
    });
  });
});
