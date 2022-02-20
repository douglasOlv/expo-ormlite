/* tslint:disable:max-classes-per-file */
import { Repository } from './Repository';
import { Schema } from './Schema';
import { SQLite, Database, DatabaseConfig } from './type';

export class OrmLite {
  protected SQLite: SQLite;
  protected opt: DatabaseConfig;

  constructor(SQLite: SQLite, opt: DatabaseConfig) {
    this.SQLite = SQLite;
    this.opt = opt;
  }

  model(name: string, schema: Schema): Repository {
    const database = { db: this.SQLite, opt: this.opt };
    return new Repository(name, schema, database);
  }
}
