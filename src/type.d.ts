import { Attributes } from './attributes/Attributes';

type FieldTypes = 'INTEGER' | 'FLOAT' | 'TEXT' | 'NUMERIC' | 'DATE' | 'DATETIME' | 'BOOLEAN' | 'JSON';
type Fields = Record<string, Attributes>;

type SQLite = { openDatabase: openDatabase };

type DatabaseConfig =
  | string
  | {
      name: string;
      version?: string;
      description?: string;
      size?: number;
      callback?: () => any;
    };
interface Database {
  transaction(
    callback: (transaction: Transaction) => any,
    error?: (error: any) => any, // TODO def of error
    success?: () => any,
  ): void;
}

interface Transaction {
  executeSql(
    sqlStatement: string,
    arguments?: string[] | number[],
    success?: (transaction: Transaction, resultSet: ResultSet) => any,
    error?: (transaction: Transaction, error: any) => any,
  ): void;
}

interface ResultSet {
  insertId: number;
  rowAffected: number;
  rows: {
    length: number;
    item: (index: number) => any;
    _array: any[];
  };
}

type openDatabase = (
  name: DatabaseConfig,
  version?: string,
  description?: string,
  size?: number,
  callback?: () => any,
) => Database;
