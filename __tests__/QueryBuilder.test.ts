import { QueryBuilder } from '../src/QueryBuilder';
import { Schema } from '../src/Schema';
import { Field } from '../src/attributes';

describe('Query Buider', () => {
  const builder = new QueryBuilder();
  const table = 'USERS';

  test('create table', () => {
    const expected =
      'CREATE TABLE IF NOT EXISTS USERS (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, burn TEXT NOT NULL, post_id NUMERIC);';

    const schemaModel = new Schema({
      id: Field.integer().primaryKey(),
      name: Field.text(),
      burn: Field.text(),
      post_id: Field.numeric().allowNull(),
    });
    const sql = builder.createTable(table, schemaModel);
    expect(sql).toBe(expected);
  });

  test('insert to', () => {
    const expected = 'INSERT INTO USERS (nome, born VALUES ?, ?);';
    const obj = { nome: 'Alan Turing', born: '23 june 1912' };

    const sql = builder.insert(table, obj);
    expect(sql).toBe(expected);
  });

  test('insert or replace', () => {
    const expected = 'INSERT OR REPLACE INTO USERS (id, born VALUES ?, ?);';
    const obj = {id: 1, born: '1912-06-23' }

    const sql = builder.insertOrReplace(table, obj);
    expect(sql).toBe(expected);
  });

  test('delete register', () => {
    const expected = 'DELETE FROM USERS WHERE id = ?;';

    const sql = builder.destroy(table);
    expect(sql).toBe(expected);
  });

  test('delete table', () => {
    const expected = 'DROP TABLE IF EXISTS USERS;';

    const sql = builder.dropTable(table);
    expect(sql).toBe(expected);
  });
});
