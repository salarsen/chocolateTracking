import { Component, Output, EventEmitter, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Ingredient } from '../../class/ingredient'

import { authService } from '../../services/auth.service';
import { ingredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-ingredient-new',
  templateUrl: './ingredient-new.component.html',
  styleUrls: ['./ingredient-new.component.css']
})
export class IngredientNewComponent {

  ingredient : Ingredient = new Ingredient();

  ingredientErrors: string[] = [];

  @Output()
  addIngredient = new EventEmitter<Ingredient>();

  constructor(
    private auth : authService,
    private ingred : ingredientService,
    private router : Router
  ) { }

  onSubmit(event : Event, form : NgForm) : void {
    event.preventDefault();

    console.log(form.value);
    
    this.ingred.createIngredient(form.value)
      .subscribe(ingredient => {
        this.addIngredient.emit(ingredient);
        this.ingredient = new Ingredient();
        form.reset();
      }, error => this.handleErrors(error.json()));
      console.log(`We submitted an ingredient`);
    }

  logout(event: Event): void {
    event.stopPropagation();
    this.auth.logout()
      .then(() => this.router.navigate(['home']))
      .catch(response => console.log(response.json()));
  }

  private handleErrors(errors: string[] | Error): void {
    console.log(errors);
    this.ingredientErrors = Array.isArray(errors) ? errors : [errors.message];
  }
}
