import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Progression } from '../../models/activity';

//TODO: FIX : When an activity is added it does not validate consecutive.
/** A hero's name can't match the given regular expression */
export function recurrentValidator(showProgressionField: boolean): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value !== null) {
            console.log(showProgressionField);
            if (control.value.viewValue == Progression.Time
                || control.value.viewValue == Progression.Repetition
                || control.value.viewValue == Progression.Percentage) {
                return null;
            }
            else if (showProgressionField === true) {
                return { 'recurrentValidatorError': true }
            } else if (showProgressionField === false) {
                console.log("Somehow this does not work")
                return { 'recurrentValidatorError': true }
            }
        }
    }

}
