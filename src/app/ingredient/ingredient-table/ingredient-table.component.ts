import { Component, OnInit, Input } from '@angular/core';

import { ingredientService } from '../../services/ingredient.service';
import { authService } from '../../services/auth.service';

import { Ingredient } from '../../class/ingredient';

@Component({
  selector: 'app-ingredient-table',
  templateUrl: './ingredient-table.component.html',
  styleUrls: ['./ingredient-table.component.css']
})
export class IngredientTableComponent implements OnInit {

  ingredients: Array<Ingredient> = [];
  errorMessage: string;

  constructor(
    private auth: authService,
    private ingredService: ingredientService,
  ) { }

  ngOnInit(): void {
    this.ingredService.getIngredients()
      .subscribe(ingredients => {
        this.ingredients = ingredients;
      }, error => {
        console.log(`Error fetching ingredients: ${error}`);
      });
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
  }
}
