import { Numeric, Text } from './attributes';

import { Fields } from './type';

export class Model {
  static fields(): Fields {
    return {};
  }

  static numeric() {
    return new Numeric();
  }
  static text() {
    return new Text();
  }
}
