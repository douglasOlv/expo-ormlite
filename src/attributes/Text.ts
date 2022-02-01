import { Attributes } from './Attributes';

export class Text extends Attributes {
  constructor() {
    super('TEXT');
  }
  parseToObj(value: any) {
    return new String(value);
  }
}
