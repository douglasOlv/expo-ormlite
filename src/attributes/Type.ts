import { FieldTypes } from '../type';

export abstract class Type {
  protected type: FieldTypes[];
  constructor() {
    this.type = [];
  }

  protected make() {
    return this.type;
  }

  allowNull() {
    return this;
  }

  autoIncrement() {
    return this;
  }

  primaryKey() {
    return this;
  }

  unique() {
    return this;
  }
}
