import { Issue } from '../models';
import { QueryParams } from './query';
import { ServiceBase } from './ServiceBase';
declare class Service extends ServiceBase {
    findNav(): Promise<Issue>;
    findHeader(): Promise<Issue>;
    findFooter(): Promise<Issue>;
    findTag(): Promise<Issue>;
    findPosts(params?: QueryParams): Promise<Issue[]>;
    findPostsByLabel(value: string, params?: QueryParams): Promise<Issue[]>;
    findPinPosts(params?: QueryParams): Promise<Issue[]>;
    findOnePost(id: number): Promise<Issue>;
}
declare const singleton: Service;
export { singleton as Service };
