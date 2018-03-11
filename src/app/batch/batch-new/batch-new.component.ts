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
  batchIngredients : Array<{'ingredient' : Ingredient, 'amount' : number}> = [];
//   batchIngredients : Array<Ingredient> = [];
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

    this.batch.barCount = 0;
    
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
        let idx = this.ingredients.indexOf(this.ingredientToAdd)
        console.log(`found at ${idx}`)
         //   if(this.ingredients[idx].amountUsed + this.amountToUse < this.ingredients[idx].amount){
         // check if already in batchingredients, if so update, otherwise add it.
          let internalIdx = this.batchIngredients.indexOf(this.ingredientToAdd)
         if(internalIdx >= 0 && this.batchIngredients[internalIdx].amountUsed + this.amountToUse <= this.batchIngredients[internalIdx].amount){
            this.batchIngredients[internalIdx].amountUsed += this.amountToUse;
         } else {
            this.ingredientToAdd.amountUsed = this.ingredients[idx].amountUsed + this.amountToUse;
            this.batchIngredients.push(this.ingredientToAdd);
         }
         // if not 
      //  }
        
      //   this.batchIngredients.push({ ingredient : this.ingredientToAdd, amount : this.amountToUse});
        this.ingredientToAdd = new Ingredient();
        this.amountToUse = null;
      }
  }

  removeIngredient(event : Event, ingredient : Ingredient) : void {
    console.log(this.batchIngredients.indexOf(ingredient));
    this.batchIngredients.splice(this.batchIngredients.indexOf(ingredient),1);
  }

  createBatch(event : Event) : void {
     event.stopPropagation();
   //   this.batch.ingredients = this.batchIngredients;
   Object.assign(this.batch.ingredients, this.batchIngredients)
     console.log(this.batch);
  }

}
