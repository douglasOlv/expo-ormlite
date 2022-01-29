import { Model } from './model';
import { Schema } from './schema';

export function model(name: string, schema: Schema) {
  return class extends Model {
    constructor() {
      super(name, schema);
    }
  };
}
