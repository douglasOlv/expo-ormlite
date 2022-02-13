import { Schema, OrmLite, Field, Repository } from '../src';
import { Database, SQLite } from '../src/type';

describe('OrmLite', () => {
  const sqlite: SQLite = { openDatabase: () => ({} as Database) };
  const opt = 'database.db';
  const Orm = new OrmLite(sqlite, opt);

  const schema = new Schema({
    id: Field.integer().primaryKey(),
    name: Field.text(),
    post_id: Field.integer(),
  });

  const Users = Orm.model('Users', schema);

  test('function save', () => {
    expect(typeof Users.save).toBe('function');
  });

  test('function saveMany', () => {
    expect(typeof Users.saveMany).toBe('function');
  });

  test('function find', () => {
    expect(typeof Users.find).toBe('function');
  });

  test('function findOne', () => {
    expect(typeof Users.findOne).toBe('function');
  });

  test('function createTable', () => {
    expect(typeof Users.createTable).toBe('function');
  });
});
