/* tslint:disable:max-classes-per-file */
import { Repository } from './Repository';
import { Schema } from './Schema';
import { SQLite, Database, DatabaseConfig, RunerInit } from './type';

export class OrmLite {
  protected SQLite: SQLite;
  protected opt: DatabaseConfig;

  constructor(SQLite: SQLite, options: DatabaseConfig) {
    this.SQLite = SQLite;
    this.opt = options;
  }

  model(name: string, schema: Schema): Repository {
    const database: RunerInit = { sqlite: this.SQLite, opt: this.opt };
    return new Repository(name, schema, database);
  }
}
