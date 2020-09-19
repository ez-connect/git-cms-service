declare class Routing {
    getTagSlug(value: string): string;
    getTagNameFromPath(value: string): string;
    getPostSlug(title: string, id: number): string;
    getPostIdFromPath(value: string): number;
}
declare const singleton: Routing;
export { singleton as Routing };
