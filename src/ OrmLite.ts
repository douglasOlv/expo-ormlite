/* tslint:disable:max-classes-per-file */
import { BaseModel } from './BaseModel';
import { Schema } from './Schema';
import { SQLite, Database } from './type';

export class OrmLite {
  database: () => Database;

  constructor(SQLite: SQLite, dbName: string) {
    this.database = () => SQLite.openDatabase(dbName);
  }

  model(name: string, schema: Schema): typeof BaseModel {
    const Model = class extends BaseModel {};
    Model.init(name, schema, this.database);
    return Model;
  }
}
