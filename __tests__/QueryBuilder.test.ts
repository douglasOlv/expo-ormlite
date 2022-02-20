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
      id: Field.integer.primaryKey,
      name: Field.text,
      burn: Field.text,
      post_id: Field.numeric.allowNull,
    });
    const sql = builder.createTable(table, schemaModel);
    expect(sql).toBe(expected);
  });

  test('insert to', () => {
    const expected = 'INSERT INTO USERS (nome, born) VALUES (?, ?);';
    const obj = { nome: 'Alan Turing', born: '23 june 1912' };

    const sql = builder.insert(table, obj);
    expect(sql).toBe(expected);
  });

  test('insert or replace', () => {
    const expected = 'INSERT OR REPLACE INTO USERS (id, born) VALUES (?, ?);';
    const obj = { id: 1, born: '1912-06-23' };

    const sql = builder.insertOrReplace(table, obj);
    expect(sql).toBe(expected);
  });

  test('find register', () => {
    const expected = 'SELECT * FROM USERS WHERE born >= ? AND post_id = ? LIMIT 1;';
    const where = { born_gteq: '1912-06-23', post_id_eq: 2 };

    const sql = builder.findOne(table, where);
    expect(sql).toBe(expected);
  });

  test('find all register', () => {
    const expected = 'SELECT * FROM USERS;';

    const sql = builder.find(table, {});
    expect(sql).toBe(expected);
  });

  test('find register default operator', () => {
    const expected = 'SELECT * FROM USERS WHERE born <= ? AND post_id = ? LIMIT 1;';
    const where = { born_lteq: '1912-06-23', post_id: 2 };

    const sql = builder.findOne(table, where);
    expect(sql).toBe(expected);
  });

  test('delete register', () => {
    const expected = 'DELETE FROM USERS WHERE id = ?;';

    const sql = builder.destroy(table, { id: 1 });
    expect(sql).toBe(expected);
  });

  test('delete register like', () => {
    const expected = 'DELETE FROM USERS WHERE name LIKE ?;';

    const sql = builder.destroy(table, { name_like: 'Al%' });
    expect(sql).toBe(expected);
  });

  test('delete table', () => {
    const expected = 'DROP TABLE IF EXISTS USERS;';

    const sql = builder.dropTable(table);
    expect(sql).toBe(expected);
  });
});
