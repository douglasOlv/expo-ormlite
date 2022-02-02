import { Schema } from '.';

export class QueryBuilder {
  insert<T extends Object>(table: string, obj: T) {
    const keys = Object.keys(obj);
    const columns = keys.join(', ');
    const values = keys.map(() => '?').join(', ');

    return `INSERT INTO ${table} (${columns} VALUES ${values});`;
  }

  insertOrReplace<T extends Object>(table: string, obj: T) {
    return this.insert(table, obj).replace('INSERT INTO', 'INSERT OR REPLACE INTO');
  }

  createTable(table: string, schema: Schema) {
    const columns = schema.fields
      .map((field) => {
        const [name, attr] = field;
        return attr.make(name);
      })
      .join(', ');

    return `CREATE TABLE IF NOT EXISTS ${table} (${columns});`;
  }

  destroy(table: string) {
    return `DELETE FROM ${table} WHERE id = ?;`;
  }

  dropTable(table: string) {
    return `DROP TABLE IF EXISTS ${table};`;
  }

  find(table: string) {
    return `SELECT * FROM ${table} WHERE id = ? LIMIT 1;`;
  }
}
