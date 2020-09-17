import { ServiceBase } from './ServiceBase';
class Service extends ServiceBase {
    async findNav() {
        return this.findOneIssuesByLabel(this.config.labels.nav);
    }
    async findHeader() {
        return this.findOneIssuesByLabel(this.config.labels.header);
    }
    async findFooter() {
        return this.findOneIssuesByLabel(this.config.labels.footer);
    }
    async findTag() {
        return this.findOneIssuesByLabel(this.config.labels.tags);
    }
    async findToc() {
        return this.findOneIssuesByLabel(this.config.labels.toc);
    }
    async findPosts(params) {
        return this.findIssuesByLabel([this.config.labels.post], params);
    }
    async findPostsByLabel(value, params) {
        return this.findIssuesByLabel([this.config.labels.post, value], params);
    }
    async findPinPosts(params) {
        return this.findPostsByLabel(this.config.labels.pin, params);
    }
    async findOnePost(id) {
        return this.findOneIssue(id);
    }
}
const singleton = new Service();
export { singleton as Service };
