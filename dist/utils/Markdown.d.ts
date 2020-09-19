declare class Markdown {
    parse(md?: string): any;
    getImage(md?: string): string;
    getDescription(md: string): string;
    getReadingTime(md: string): string;
}
declare const singleton: Markdown;
export { singleton as Markdown };
