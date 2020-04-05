import { Activity } from './activity';

export class UserActivitiesViewModel {
    id: string;
    name: string;
    email: string;
    signedUpDate: Date;
    activities: Activity[];
}