import { Issue, Label } from '../models';
declare class Routing {
    getTagSlug(value: Label): string;
    getTagNameFromPath(value: string): string;
    getPostSlug(value: Issue): string;
    getPostIdFromPath(value: string): number;
}
declare const singleton: Routing;
export { singleton as Routing };
