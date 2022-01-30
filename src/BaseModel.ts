import { Schema } from './Schema';
import { Database } from './type';

export class BaseModel {
  static table: string;
  static schema: Schema;
  static database: Database;

  static init(name: string, schema: Schema, database: Database) {
    this.table = name.toUpperCase();
    this.schema = schema;
    this.database = database;
  }
}
