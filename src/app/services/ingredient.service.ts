import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Ingredient } from '../class/ingredient';

import 'rxjs/add/operator/map';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class ingredientService {

  public static base = '/api/ingredients/';
  constructor(private http : Http) { }

  getIngredients() : Observable<Ingredient[]> {
    console.log('Attempting to fetch ingredients');
    return this.http.get(ingredientService.base)
      .map(response => response.json());
  }

  getIngredientsAvailable() : Observable<Ingredient[]> {
    console.log(`Attempting to fetch ingredients not used yet`);
    return this.http.get(ingredientService.base + 'unused')
      .map(response => response.json());
  }

  removeIngredient(ingredient : Ingredient) : Observable<Ingredient> {
    return this.http.delete(`${ ingredientService.base }${ingredient._id}`)
      .map(response => response.json());
  }

  createIngredient(ingredient : Ingredient) : Observable<Ingredient> {
    console.log(`Attempting to create ingredient: ${ingredient}`)
    return this.http.post(ingredientService.base, ingredient)
      .map(response => response.json());
  }

  getIngredient(id : string) : Observable<Ingredient> {
    return this.http.get(`${ ingredientService.base }${id}`)
      .map(response => response.json())
  }

  updateIngredient(ingredient : Ingredient) : Observable<Ingredient> {
    return this.http.patch(ingredientService.base, ingredient)
      .map(response => response.json());
  }

}
