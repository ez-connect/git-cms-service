declare class Markdown {
    parse(md?: string): any;
    getImage(md?: string): string;
    getDescription(body: string): string;
    getReadingTime(body: string): string;
}
declare const singleton: Markdown;
export { singleton as Markdown };
