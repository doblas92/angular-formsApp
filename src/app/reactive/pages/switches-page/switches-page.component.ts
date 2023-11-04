import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {

  constructor( private fb: FormBuilder ) {}

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

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors &&
           this.myForm.controls[field].touched;
  }

}
