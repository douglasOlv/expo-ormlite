import { Type } from './Type';

export class Numeric extends Type {
  constructor() {
    super();
    this.type.push('NUMERIC');
  }
}
