import { Database, DatabaseConfig, RowSql, RunerInit, SQLite } from './type';

export class Runner {
  protected sqlite: SQLite;
  protected opt: DatabaseConfig;

  constructor(init: RunerInit) {
    this.sqlite = init.sqlite;
    this.opt = init.opt;
  }

  get openDatabase() {
    return this.sqlite.openDatabase(this.opt);
  }

  executeBulkSql(sqls: Array<string>, params: Array<string[]>): Promise<RowSql[]> {
    return new Promise((txResolve, txReject) => {
      this.openDatabase.transaction((tx) =>
        Promise.all(
          sqls.map(
            (sql, index): Promise<RowSql> =>
              new Promise((sqlResolve, sqlReject) => {
                tx.executeSql(
                  sql,
                  params[index],
                  (_, { rows, insertId }) => {
                    sqlResolve({ rows: rows._array, insertId });
                  },
                  (_, error) => {
                    sqlReject(error);
                  },
                );
              }),
          ),
        )
          .then(txResolve)
          .catch(txReject),
      );
    });
  }

  executeSql(sql: string, params: Array<string> = []) {
    return this.executeBulkSql([sql], [params]).then((value) => value[0]);
  }
}
