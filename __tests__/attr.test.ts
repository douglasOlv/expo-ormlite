import { Field } from '../src/attributes';

describe('Field Integer', () => {
  const num = Field.integer();
  test('integer type', () => {
    expect(Object(num).type).toBe('INTEGER');
  });

  test('integer no primary key', () => {
    expect(Object(num).isPrimary).toBeFalsy();
  });

  test('integer primary key', () => {
    num.primaryKey();
    expect(Object(num).isPrimary).toBeTruthy();
  });
});

describe('Field Text', () => {
  const text = Field.text();
  test('text type', () => {
    expect(Object(text).type).toBe('TEXT');
  });

  test('test not null', () => {
    expect(Object(text).isNullable).toBeFalsy();
  });

  test('text nullable', () => {
    text.allowNull();
    expect(Object(text).isNullable).toBeTruthy();
  });
});
