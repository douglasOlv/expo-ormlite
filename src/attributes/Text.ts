import { Type } from './Type';

export class Text extends Type {
  constructor() {
    super();
    this.type.push('TEXT');
  }
}
