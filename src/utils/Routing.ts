import slugify from 'slugify';

import { Base64 } from './Base64';

class Routing {
  /**
   * Returns slug from a label, includes encoded name
   * @param value The name of label
   */
  public getTagSlug(value: string): string {
    const slug = slugify(value, { lower: true });
    const id = Base64.encode(value);
    return `${slug}-${id}`;
  }

  /**
   * Returns label name from a path
   * @param value A encoded path
   */
  public getTagNameFromPath(value: string): string {
    const matches = value.match(/.*-(.*)$/);
    if (matches.length > 0) {
      return Base64.decode(matches[1]);
    }

    return '';
  }

  /**
   * Returns slug from an issue, includes id
   */
  public getPostSlug(title: string, id: number): string {
    const slug = slugify(title, { lower: true });
    return `${slug}-${id}`;
  }

  /**
   * Returns issue's id from a path
   * @param value A path
   */
  public getPostIdFromPath(value: string): number {
    const matches = value.match(/.*-(\d+)$/);
    if (matches.length > 0) {
      return Number.parseInt(matches[1], 10);
    }

    return 0;
  }
}

const singleton = new Routing();
export { singleton as Routing };
