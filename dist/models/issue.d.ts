import { Label } from './label';
import { User } from './user';
export interface Issue {
    id: number;
    number?: number;
    iid?: number;
    title: string;
    labels: Label[];
    body: string;
    description?: string;
    state: 'open' | 'closed';
    user: User;
    author?: User;
    created_at: string;
    updated_at: string;
}
