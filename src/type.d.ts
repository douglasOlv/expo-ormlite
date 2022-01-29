import { Field } from './attributes/Field';

type FieldTypes = 'INTEGER' | 'FLOAT' | 'TEXT' | 'NUMERIC' | 'DATE' | 'DATETIME' | 'BOOLEAN' | 'JSON';
type Fields = Record<string, Field>;
