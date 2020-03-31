
import { User } from './user';

export class Activity {
    name: string;
    category: Category;
    percentage: number;
    deadline: Date;
    concurrent: Concurrent;
    done: boolean;
    user: User;
    description: string;
  }


export enum Category {
    School,
    PersonalGoal
}

export enum Concurrent {
    No,
    Daily,
    Weekly,
    Monthly,
    Quarterly,
    HalfYearly,
    Yearly
}