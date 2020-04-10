export class Activity {
    name: string;
    category: string;
    percentage: number;
    deadline: Date;
    recurrent: string;
    done: boolean;
    description: string;
    creationDate: Date;
}


export enum Category {
    School,
    PersonalGoal
}

export enum Recurrent {
    No,
    Daily,
    Weekly,
    Monthly,
    Quarterly,
    HalfYearly,
    Yearly
}