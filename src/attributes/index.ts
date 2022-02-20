import { Integer } from './Integer';
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
}
