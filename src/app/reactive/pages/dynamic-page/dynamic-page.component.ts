import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {



  constructor( private fb: FormBuilder ) {}

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  });

  public newFavorite: FormControl = new FormControl('', Validators.required);

  onDeleteFavorite( index: number ): void {
    this.favoriteGames.removeAt(index);
  }

  onAddToFavorite( ): void {
    if( this.newFavorite.invalid ) return;
    const newGame = this.newFavorite.value;
    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );
    this.newFavorite.reset();
  }

  onSubmit(): void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.favoriteGames.clear();
    this.myForm.reset();

  }

  get favoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors &&
           this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {
    if( !this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido'

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres.`
      }
    }

    return null;
  }

  isValidFieldInArray( formArrray: FormArray, index: number ) {
    return formArrray.controls[index].errors &&
           formArrray.controls[index].touched;
  }

}
