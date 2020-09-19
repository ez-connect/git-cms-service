import Md2Json from 'md-2-json';
import readingTime from 'reading-time';

class Markdown {
  /**
   * Parse markdown to JSON, uses `md-2-json` package
   * @param md Markdown body
   */
  public parse(md?: string): any {
    return Md2Json.parse(md ?? '');
  }

  /**
   * Returns the first image in a issue body
   * @param md Markdown body
   */
  public getImage(md?: string): string {
    if (!md) {
      return '';
    }

    const matches = md.match(/!\[.*\]\((http.*\/.*)\)/);
    if (!matches || matches.length < 1) {
      return '';
    }

    return matches[1];
  }

  /**
   * Remove all images all keep a short description from `body`
   * @param md Markdown body
   */
  public getDescription(md: string): string {
    if (!md) {
      return '';
    }

    return md.replaceAll(/!?\[.*\]\((http.*\/.*)\)/g, '');
  }

  /**
   * Returns reading time, uses `reading-time` package
   * @param md Markdown body
   */
  public getReadingTime(md: string): string {
    return readingTime(md).text;
  }
}

const singleton = new Markdown();
export { singleton as Markdown };
