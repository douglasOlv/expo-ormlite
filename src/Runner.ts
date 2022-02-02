import { Database, DatabaseConfig, SQLite } from './type';

export class Runner {
  protected database: Database;
  constructor({ db, opt }: { db: SQLite; opt: DatabaseConfig }) {
    this.database = db.openDatabase(opt);
  }

  protected executeBulkSql(sqls: Array<string>, params: Array<string[]>) {
    return new Promise((txResolve, txReject) => {
      this.database.transaction((tx) => {
        Promise.all(
          sqls.map((sql, index) => {
            return new Promise((sqlResolve, sqlReject) => {
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
            });
          }),
        )
          .then(txResolve)
          .catch(txReject);
      });
    });
  }

  protected executeSql(sql: string, params: Array<string> = []) {
    return this.executeBulkSql([sql], [params]);
  }
}
