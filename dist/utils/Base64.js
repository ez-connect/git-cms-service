import { Buffer } from 'buffer';
class Base64 {
    encode(value) {
        const buff = Buffer.from(value, 'utf8');
        return buff.toString('base64');
    }
    decode(value) {
        const buff = Buffer.from(value, 'base64');
        return buff.toString('utf-8');
    }
}
const singleton = new Base64();
export { singleton as Base64 };
