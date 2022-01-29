import { Type } from './attributes/Type';

export type FieldTypes = 'INTEGER' | 'FLOAT' | 'TEXT' | 'NUMERIC' | 'DATE' | 'DATETIME' | 'BOOLEAN' | 'JSON';

type Fields = Record<string, Type>;
