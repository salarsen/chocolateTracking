import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { authService } from '../../services/auth.service';
import { ingredientService } from '../../services/ingredient.service';
import { batchService } from '../../services/batch.service';

import { Ingredient } from '../../class/ingredient';
import { Batch } from '../../class/batch';
@Component({
  selector: 'app-batch-new',
  templateUrl: './batch-new.component.html',
  styleUrls: ['./batch-new.component.css']
})
export class BatchNewComponent implements OnInit {

  batch : Batch = new Batch();
  ingredients : Array<Ingredient> = [];
  // batchIngredients : Array<{'ingredient' : Ingredient, 'amount' : number}> = [];
  // batchIngredients : Array<String> = [];
  batchIngredients : Array<Object> = [];
  ingredientToAdd: Ingredient = new Ingredient();
  amountToUse : number;
  // test : Ingredient = new Ingredient();

  errorMessage : String;

  constructor(
    private auth : authService,
    private ingredService : ingredientService,
    private batchService : batchService,
    private router : Router,
  ) { }

  ngOnInit() {
    if (!this.auth.isAuthed()) {
      console.log('Not authed');
      this.router.navigate(['home']);
    }

    console.log(`attempting to fetch available ingredients`)
    this.ingredService.getIngredientsAvailable()
      .subscribe(ingredients => {
         this.ingredients = ingredients;
      },error => {
         console.log(`Error fetching ingredients: ${error}`)
      });
  }

  addIngredient(event : Event) : void {
    //  console.log(Boolean(this.batchIngredients.indexOf(this.ingredientToAdd)));
      if(this.ingredientToAdd._id && this.amountToUse !== null && this.amountToUse !== 0){ // check to see if the user submitted a blank option
        // if(this.batchIngredients.indexOf(this.ingredientToAdd)){
          // update batch amount at location
          // this.ingredientToAdd = new Ingredient();
        // } else {
        this.batchIngredients.push({ ingredient : this.ingredientToAdd, amount : this.amountToUse});
        this.ingredientToAdd = new Ingredient();
        this.amountToUse = null;
        console.log(this.batchIngredients);
        // }
      }
  }

  removeIngredient(event : Event, ingredient : Ingredient) : void {
    console.log(this.batchIngredients.indexOf(ingredient));
    // this.batchIngredients.splice(this.batchIngredients.indexOf(ingredient),1);
  }

}
