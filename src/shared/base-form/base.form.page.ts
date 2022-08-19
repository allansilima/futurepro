import { Component } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormPage {

  form: FormGroup;

  constructor() { }

  abstract submit();

  onSubmit() {
    if (this.form.valid) {
      this.submit();
    } else {
      this.verifyValidationsForm(this.form);
    }
  }

  verifyValidationsForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsDirty();
      control.markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.verifyValidationsForm(control);
      }
    });
  }

  reset() {
    this.form.reset();
  }

  verifyValidTouched(field: string) {
    return (
      !this.form.get(field).valid &&
      (this.form.get(field).touched || this.form.get(field).dirty)
    );
  }

  verifyRequired(field: string) {
    return (
      this.form.get(field).hasError('required') &&
      (this.form.get(field).touched || this.form.get(field).dirty)
    );
  }

  addErrorMessage(formGroup: FormGroup | FormArray, fieldName: string) {
    Object.keys(formGroup.controls).forEach(field => {
      if (field == fieldName) {
        const control = formGroup.get(field);
        control.setErrors({
          'error': true
        });
        control.markAsDirty();
        control.markAsTouched();
      }
    });
  }

  errorMessage(control: FormControl, label: string) {
    for (const propertyName in control.errors) {
      if (control.errors.hasOwnProperty(propertyName) &&
        control.touched) {
        return FormValidations.getErrorMsg(label, propertyName, control.errors[propertyName]);
      }
    }
  }
}