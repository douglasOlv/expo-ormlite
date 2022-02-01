import { Attributes } from './Attributes';

export class Integer extends Attributes {
  constructor() {
    super('INTEGER');
  }
  parseToObj(value: any) {
    return parseInt(value);
  }
}
