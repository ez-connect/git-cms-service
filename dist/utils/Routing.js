import slugify from 'slugify';
import { Base64 } from './Base64';
class Routing {
    getTagSlug(value) {
        const slug = slugify(value.name, { lower: true });
        const id = Base64.encode(value.name);
        return `${slug}-${id}`;
    }
    getTagNameFromPath(value) {
        const matches = value.match(/.*-(.*)$/);
        if (matches.length > 0) {
            return Base64.decode(matches[1]);
        }
        return '';
    }
    getPostSlug(value) {
        const slug = slugify(value.title, { lower: true });
        const id = value.id;
        return `${slug}-${id}`;
    }
    getPostIdFromPath(value) {
        const matches = value.match(/.*-(\d+)$/);
        if (matches.length > 0) {
            return Number.parseInt(matches[1], 10);
        }
        return 0;
    }
}
const singleton = new Routing();
export { singleton as Routing };
