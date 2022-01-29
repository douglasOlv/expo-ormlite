import { Integer } from './Integer';
import { Numeric } from './Numeric';
import { Text } from './Text';

export class Field {
  static integer() {
    return new Integer();
  }

  static numeric() {
    return new Numeric();
  }
  static text() {
    return new Text();
  }
}
