import { Issue, Label, ServiceConfig, User } from '../models';
import { QueryParams } from './query';
export declare class ServiceBase {
    protected config?: ServiceConfig;
    protected issue: {
        [key: string]: Issue;
    };
    protected labels: Label[];
    init(value: ServiceConfig): void;
    signIn(clientId: string, directUri: string): void;
    getAccessToken(code: string): Promise<string>;
    findOneUser(username: string): Promise<User>;
    protected findLabels(): Promise<Label[]>;
    protected findOneLabel(value: string): Promise<Label>;
    protected findIssues(params?: QueryParams): Promise<Issue[]>;
    protected findIssuesByLabel(value: string[], params?: QueryParams): Promise<Issue[]>;
    protected findOneIssue(number: number): Promise<Issue>;
    protected findOneIssuesByLabel(value: string): Promise<Issue>;
    private _buildParams;
    private _convertToGitHubIssue;
    private _removeSpecificLabel;
}
