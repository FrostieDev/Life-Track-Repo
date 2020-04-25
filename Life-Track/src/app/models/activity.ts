export class Activity {
    _id: string;
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
    School = "School",
    PersonalGoal = "Personal Goal"
}

export enum Recurrent {
    No = "No",
    Daily = "Daily",
    Weekly = "Weekly",
    Monthly = "Monthly",
    Quarterly = "Quarterly",
    HalfYearly = "Half Yearly",
    Yearly = "Yearly"
}

export enum Progression {
    Repetition = "Repetition",
    Percentage = "Percentage",
    Time = "Time"
}