import { Schema } from './Schema';
import { Database } from './type';

export class BaseModel {
  static table: string;
  static schema: Schema;
  static database: () => Database;

  static init(name: string, schema: Schema, database: () => Database) {
    this.table = name.toUpperCase();
    this.schema = schema;
    this.database = database;
  }

  constructor(props: object) {
    this.fill(props);
  }

  private fill(props: Record<string, any>) {
    this.schema.fields().map((field) => {
      const key = field[0];
      const { parseToObj } = field[1];
      const value = parseToObj(props[key]);
      Object.defineProperty(this, key, { value });
    });
  }

  private get static() {
    return this.constructor as typeof BaseModel;
  }

  private get table() {
    return this.static.table;
  }

  private get schema() {
    return this.static.schema;
  }

  private get database() {
    return this.static.database();
  }
}
