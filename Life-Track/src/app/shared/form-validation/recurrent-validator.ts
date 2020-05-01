import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Progression, Recurrent } from '../../models/activity';

//TODO: FIX : When an activity is added it does not validate consecutive.
export const recurrentValidator: ValidatorFn = (formGroup: AbstractControl) => {

    if (formGroup.get("recurrent").value.value !== null
        && formGroup.get("progression").value.value !== null) {
        const recurrentChoiceValue = formGroup.get("recurrent").value.value;
        const progressionChoiceValue = formGroup.get("progression").value.value;
        const expectedRepetition = formGroup.get("expectedRepetition");
        const expectedTime = formGroup.get("expectedTime");

        if (progressionChoiceValue == Progression.Time) {
            //Time value needs to be selected
            console.log(expectedTime);
            if (expectedTime.value == "") {
                return { 'progressionValidatorError': true }
            } else {
                return null;
            }
        } else if (progressionChoiceValue == Progression.Repetition) {
            //Repetition value needs to be selected
            console.log(expectedRepetition);
            if (expectedRepetition.value == "") {
                return { 'progressionValidatorError': true }
            } else {
                return null;
            }
        } else if (progressionChoiceValue == Progression.Percentage) {
            //Percentage does not need a new selection
            return null;
        } else if (recurrentChoiceValue == Recurrent.No) {
            return null;
        }
        else {
            console.log("Recurrent error with: " + progressionChoiceValue);
            return { 'recurrentValidatorError': true }
        }
    } else {
        return null;
    }
};

