import slugify from 'slugify';
import { Base64 } from './Base64';
class Routing {
    getTagSlug(value) {
        const slug = slugify(value, { lower: true });
        const id = Base64.encode(value);
        return `${slug}-${id}`;
    }
    getTagNameFromPath(value) {
        const matches = value.match(/.*-(.*)$/);
        if (matches && matches.length > 0) {
            return Base64.decode(matches[1]);
        }
        return '';
    }
    getPostSlug(title, id) {
        const slug = slugify(title, { lower: true });
        return `${slug}-${id}`;
    }
    getPostIdFromPath(value) {
        const matches = value.match(/.*-(\d+)$/);
        if (matches && matches.length > 0) {
            return Number.parseInt(matches[1], 10);
        }
        return 0;
    }
}
const singleton = new Routing();
export { singleton as Routing };
