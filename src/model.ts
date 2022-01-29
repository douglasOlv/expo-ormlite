import { Schema } from './schema';

export class Model {
  table: string;
  schema: Schema;

  constructor(name: string, schema: Schema) {
    this.table = name.toUpperCase();
    this.schema = schema;
  }
}
