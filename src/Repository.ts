import { Schema } from './Schema';
import { Runner } from './Runner';
import { Database, DatabaseConfig, SQLite } from './type';
import { QueryBuilder } from './QueryBuilder';
export class Repository extends Runner {
  protected table: string;
  protected schema: Schema;
  protected buider: QueryBuilder;

  constructor(table: string, schema: Schema, database: { db: SQLite; opt: DatabaseConfig }) {
    super(database);
    this.buider = new QueryBuilder();
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
    const sql = this.buider.insertOrReplace(this.table, fillEntity);
    const params = Object.values(fillEntity);
    return this.executeSql(sql, params);
  }

  saveMany<T extends Object>(entitys: T[]) {
    const fillEntitys = entitys.map((entity) => this.fill(entity));
    const sqls = fillEntitys.map((entity) => this.buider.insertOrReplace(this.table, entity));
    const params = fillEntitys.map((entity) => Object.values(entity));
    return this.executeBulkSql(sqls, params);
  }

  find<T extends Object>(where: T) {}

  findOne<T extends Object>(where: T) {}

  createTable() {
    const sql = this.buider.createTable(this.table, this.schema);
    return this.executeSql(sql);
  }
}
