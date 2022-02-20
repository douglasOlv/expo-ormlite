import { Schema } from '.';

export class QueryBuilder {
  insert<T extends Object>(table: string, obj: T) {
    const keys = Object.keys(obj);
    const columns = keys.join(', ');
    const values = keys.map(() => '?').join(', ');

    return `INSERT INTO ${table} (${columns}) VALUES (${values});`;
  }

  insertOrReplace<T extends Object>(table: string, obj: T) {
    return this.insert(table, obj).replace('INSERT INTO', 'INSERT OR REPLACE INTO');
  }

  createTable(table: string, schema: Schema) {
    const columns = schema.fields
      .map((field) => {
        const [name, attr] = field;
        return name.concat(attr.make());
      })
      .join(', ');

    return `CREATE TABLE IF NOT EXISTS ${table} (${columns});`;
  }

  destroy(table: string, where: Object) {
    const list = Object.keys(where).map((p) => `${this.getPropertyOperator(p)} ?`);
    return `DELETE FROM ${table} WHERE ${list.join(' AND ')};`;
  }

  dropTable(table: string) {
    return `DROP TABLE IF EXISTS ${table};`;
  }

  find<T extends Object>(table: string, opt: T) {
    const list = Object.keys(opt).map((p) => `${this.getPropertyOperator(p)} ?`);
    return list.length > 0 ? `SELECT * FROM ${table} WHERE ${list.join(' AND ')};` : '';
  }
  findOne<T extends Object>(table: string, opt: T) {
    return this.find(table, opt).replace(';', ' LIMIT 1;');
  }

  private getPropertyOperator(statement: string) {
    const operations: Record<string, string> = {
      eq: '=',
      neq: '<>',
      lt: '<',
      lteq: '<=',
      gt: '>',
      gteq: '>=',
      cont: 'LIKE',
    };

    const pieces = statement.split('_');
    const lastIndex = pieces.length - 1;
    let keyOp = pieces[lastIndex];

    if (Object.keys(operations).includes(keyOp)) {
      pieces.pop();
    } else {
      keyOp = 'eq';
    }

    const property = pieces.join('_');
    const operator = operations[keyOp];

    return `${property} ${operator}`;
  }
}
