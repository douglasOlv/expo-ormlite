import { Attributes } from './Attributes';

export class Numeric extends Attributes {
  constructor() {
    super('NUMERIC');
  }
  parseToObj(value: any) {
    return parseFloat(value);
  }
}
