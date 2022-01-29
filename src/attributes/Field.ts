import { FieldTypes } from '../type';

export abstract class Field {
  protected type: FieldTypes;
  protected isNullable = false;
  protected isPrimary = false;
  protected isAutoincrement = false;
  protected isUnique = false;

  constructor(type: FieldTypes) {
    this.type = type;
  }

  protected make() {
    const field: string[] = [this.type];

    if (this.isPrimary) {
      field.push('NOT NULL PRIMARY KEY AUTOINCREMENT');
    } else {
      if (this.unique) field.push('UNIQUE');
      if (!this.isNullable) field.push('NOT NULL');
      if (this.isAutoincrement) field.push('AUTOINCREMENT');
    }

    return field.join(' ,');
  }

  allowNull() {
    this.isNullable = true;
    return this;
  }

  autoIncrement() {
    this.isAutoincrement = true;
    return this;
  }

  primaryKey() {
    this.isPrimary = true;
    return this;
  }

  unique() {
    this.isUnique = true;
    return this;
  }
}
