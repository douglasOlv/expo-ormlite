import { Schema } from './Schema';
import { Runner, RunnerInit } from './Runner';
import { QueryBuilder } from './QueryBuilder';
export class Repository {
  protected table: string;
  protected schema: Schema;
  protected buider: QueryBuilder;
  protected runner: Runner;

  constructor(table: string, schema: Schema, database: RunnerInit) {
    this.runner = new Runner(database);
    this.buider = new QueryBuilder();
    this.table = table.toUpperCase();
    this.schema = schema;
  }

  protected sanetize(props: Record<string, any>) {
    const entity: Record<string, any> = {};

    this.schema.fields.forEach((item) => {
      const key = item[0];
      const { parseToBase } = item[1];

      if (Object.keys(props).includes(key)) {
        entity[key] = parseToBase(props[key]);
      }
    });

    return entity;
  }

  protected parse(obj: Record<string, any>) {
    const entity: Record<string, any> = {};
    this.schema.fields.forEach((item) => {
      const key = item[0];
      const { parseToObj } = item[1];
      entity[key] = parseToObj(obj[key]);
    });
    return entity;
  }

  save<T extends Object>(entity: T) {
    const _entity = this.sanetize(entity);
    const sql = this.buider.insertOrReplace(this.table, _entity);
    const params = Object.values(_entity);
    return this.runner.executeSql(sql, params).then(({ insertId }) => insertId);
  }

  update(entity: Record<string, any>) {
    const pk = this.schema.namePrimaryKey;
    if (pk && entity[pk]) {
      const _entity = this.sanetize(entity);
      const sql = this.buider.update(this.table, pk, _entity);
      const values = Object.keys(_entity)
        .filter((key) => key !== pk)
        .map((key) => _entity[key]);

      return this.runner.executeSql(sql, [...values, _entity[pk]]);
    }
  }

  saveMany<T extends Object>(entitys: T[]) {
    const _entitys = entitys.map((entity) => this.sanetize(entity));
    const sqls = _entitys.map((entity) => this.buider.insertOrReplace(this.table, entity));
    const params = _entitys.map((entity) => Object.values(entity));
    return this.runner.executeBulkSql(sqls, params);
  }

  find(where = {}) {
    const sql = this.buider.find(this.table, where);
    const params = Object.values(where);
    return this.runner.executeSql(sql, params).then(({ rows }) => rows.map((item) => this.parse(item)));
  }

  findOne(where = {}) {
    const sql = this.buider.findOne(this.table, where);
    const params = Object.values(where);
    return this.runner.executeSql(sql, params).then(({ rows }) => this.parse(rows[0]));
  }

  destroy(where: Record<string, any>) {
    const sql = this.buider.destroy(this.table, where);
    const params = Object.values(where);
    return this.runner.executeSql(sql, params);
  }

  createTable() {
    const sql = this.buider.createTable(this.table, this.schema);
    return this.runner.executeSql(sql, []);
  }

  dropTable() {
    const sql = this.buider.dropTable(this.table);
    return this.runner.executeSql(sql, []);
  }
}
