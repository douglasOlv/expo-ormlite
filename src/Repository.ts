import { Schema } from './Schema';
import { Runner } from './Runner';
import { Database, DatabaseConfig, SQLite } from './type';

interface EntityType {}

export class Repository extends Runner {
  protected table: string;
  protected schema: Schema;

  constructor(table: string, schema: Schema, database: { db: SQLite; opt: DatabaseConfig }) {
    super(database);
    this.table = table.toUpperCase();
    this.schema = schema;
  }

  protected fill(props: Record<string, any>) {
    const entity: Record<string, any> = {};

    this.schema.fields.forEach((item) => {
      const key = item[0];
      const { parseToObj } = item[1];
      entity[key] = parseToObj(props[key]);
    });

    return entity;
  }

  save<T extends Object>(entity: T) {
    const fillEntity = this.fill(entity);
  }

  find<T extends Object>(where: T) {}

  findOne<T extends Object>(where: T) {}

  createTable() {}
}
