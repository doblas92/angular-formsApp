import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
    ) {}

  ngOnInit(): void {

  }

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required ],
    wantNotifications: [true, Validators.required ],
    termsAndConditions: [false, Validators.requiredTrue ],
  });

  public person = {
    gender: 'F',
    wantNotifications: false
  }

  onSave() {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    const {termsAndConditions, ...newPerson} = this.myForm.value;
    this.person = newPerson;
    this.myForm.reset();

  }

  isValidField( field: string ) {
    return this.validatorService.isValidField(this.myForm, field);
  }

}
