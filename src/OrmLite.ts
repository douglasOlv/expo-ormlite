/* tslint:disable:max-classes-per-file */
import { Repository } from './Repository';
import { RunnerInit } from './Runner';
import { Schema } from './Schema';
import { SQLite, Database, DatabaseConfig } from './type';

export class OrmLite {
  protected database: RunnerInit;

  constructor(SQLite: SQLite, options: DatabaseConfig) {
    this.database = new RunnerInit(SQLite, options);
  }

  model(name: string, schema: Schema): Repository {
    return new Repository(name, schema, this.database);
  }
}
