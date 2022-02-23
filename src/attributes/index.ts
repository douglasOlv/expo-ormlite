import { Integer } from './Integer';
import { Json } from './Json';
import { Numeric } from './Numeric';
import { Text } from './Text';

export class Field {
  static get integer() {
    return new Integer();
  }

  static get numeric() {
    return new Numeric();
  }
  static get text() {
    return new Text();
  }

  static get json() {
    return new Json();
  }
}
