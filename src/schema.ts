import { Attributes } from './attributes/Attributes';

export class Schema {
  protected schema: Record<string, Attributes>;
  constructor(schema: Record<string, Attributes>) {
    this.schema = schema;
  }

  get fields() {
    return Object.entries(this.schema);
  }
}
