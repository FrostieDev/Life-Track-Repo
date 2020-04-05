export class Activity {
    name: string;
    category: string;
    percentage: number;
    deadline: Date;
    concurrent: string;
    done: boolean;
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