import slugify from 'slugify';

import { Issue, Label } from '../models';
import { Base64 } from './Base64';

class Routing {
  /**
   * Returns slug from a label, includes encoded name
   * @param value A label
   */
  public getTagSlug(value: Label): string {
    const slug = slugify(value.name, { lower: true });
    const id = Base64.encode(value.name);
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
   * @param value An issue
   */
  public getPostSlug(value: Issue): string {
    const slug = slugify(value.title, { lower: true });
    const id = value.id;
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
