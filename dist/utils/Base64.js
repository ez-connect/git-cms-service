import { Buffer } from 'buffer';
class Base64 {
    encode(value) {
        const buff = new Buffer(value);
        return buff.toString('base64');
    }
    decode(value) {
        const buff = new Buffer(value, 'base64');
        return buff.toString('utf-8');
    }
}
const singleton = new Base64();
export { singleton as Base64 };
