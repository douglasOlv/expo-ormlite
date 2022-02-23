import { Attributes } from './Attributes';

export class Json extends Attributes {
  constructor() {
    super('TEXT');
  }

  parseToObj(value: any) {
    return JSON.parse(value);
  }

  parseToBase(value: any) {
    return JSON.stringify(value);
  }
}
