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
  test : String = "";
  errorMessage : string;

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

   addIngredient(ingredient : Ingredient, amount : number) : void {
      this.batchIngredients.push({ingredient, amount})
  }

}
