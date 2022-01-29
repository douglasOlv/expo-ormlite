import { Attributes } from './attributes/Attributes';

type FieldTypes = 'INTEGER' | 'FLOAT' | 'TEXT' | 'NUMERIC' | 'DATE' | 'DATETIME' | 'BOOLEAN' | 'JSON';
type Fields = Record<string, Attributes>;
