import { Buffer } from 'buffer';

class Base64 {
  /**
   * Returns base64 encoded of a string
   */
  public encode(value: string): string {
    const buff = Buffer.from(value, 'utf8');
    return buff.toString('base64');
  }

  /**
   * Returns a string from base64 encoded
   */
  public decode(value: string): string {
    const buff = Buffer.from(value, 'base64');
    return buff.toString('utf-8');
  }
}

const singleton = new Base64();
export { singleton as Base64 };
