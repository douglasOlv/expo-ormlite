import { FieldTypes } from '../type';

export abstract class Attributes {
  protected type: FieldTypes;
  protected isNullable = false;
  protected isPrimary = false;
  protected isAutoincrement = false;
  protected isUnique = false;

  constructor(type: FieldTypes) {
    this.type = type;
  }

  /** @internal */
  make() {
    const field: string[] = [this.type];

    if (this.isPrimary) {
      field.push('NOT NULL PRIMARY KEY AUTOINCREMENT');
    } else {
      if (this.isUnique) field.push('UNIQUE');
      if (!this.isNullable) field.push('NOT NULL');
      if (this.isAutoincrement) field.push('AUTOINCREMENT');
    }

    return ' '.concat(field.join(' '));
  }

  get allowNull() {
    this.isNullable = true;
    return this;
  }

  get autoIncrement() {
    this.isAutoincrement = true;
    return this;
  }

  get primaryKey() {
    this.isPrimary = true;
    return this;
  }

  get unique() {
    this.isUnique = true;
    return this;
  }

  parseToObj(value: any) {
    return value;
  }

  parseToBase(value: any) {
    return value;
  }
}
