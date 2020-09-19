import Md2Json from 'md-2-json';
import readingTime from 'reading-time';
class Markdown {
    parse(md) {
        return Md2Json.parse(md !== null && md !== void 0 ? md : '');
    }
    getImage(md) {
        if (!md) {
            return '';
        }
        const matches = md.match(/!\[.*\]\((http.*\/.*)\)/);
        if (!matches || matches.length < 1) {
            return '';
        }
        return matches[1];
    }
    getDescription(md) {
        if (!md) {
            return '';
        }
        return md.replaceAll(/!?\[.*\]\((http.*\/.*)\)/g, '');
    }
    getReadingTime(md) {
        return readingTime(md).text;
    }
}
const singleton = new Markdown();
export { singleton as Markdown };
