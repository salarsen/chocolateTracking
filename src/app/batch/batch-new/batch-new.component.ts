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
    batchIngredients : Array<{ 'ingredient' : Ingredient, 'amount' : number}> = [];
    ingredientIndexer : Array<string> = []; // because find/filter/indexOf doesn't work on nested objects, more work to be done...

    ingredientToAdd: Ingredient = new Ingredient();
    amountToUse : number;

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

        console.log(this.batch)

        this.ingredService.getIngredientsAvailable()
            .subscribe(ingredients => {
                this.ingredients = ingredients;
            },error => {
                console.log(`Error fetching ingredients: ${error}`)
            });
    }

    addIngredient(event : Event) : void {
        // Check if the values the user has submitted are correct
        if(this.ingredientToAdd._id && this.amountToUse !== null && this.amountToUse !== 0){
            
            let idx = this.ingredientIndexer.indexOf(this.ingredientToAdd._id);

            if(idx >= 0 && this.amountToUse + this.ingredientToAdd.amountUsed + this.batch.ingredients[idx].amount <= this.ingredientToAdd.amount){
                this.batch.ingredients[idx].amount += this.amountToUse;
            } else if(this.amountToUse + this.ingredientToAdd.amountUsed <= this.ingredientToAdd.amount){
                this.batch.ingredients.push({ 'ingredient' : this.ingredientToAdd, 'amount' : this.amountToUse });
                this.ingredientIndexer.push(this.ingredientToAdd._id);
            }
            this.ingredientToAdd = new Ingredient();
            this.amountToUse = null;
        }
        console.log(this.batch);
    }

    removeIngredient(event : Event, ingredientId : string) : void {
        // console.log(ingredientId)
        let idx = this.ingredientIndexer.indexOf(ingredientId);
        this.batch.ingredients.splice(idx,1);
        this.ingredientIndexer.splice(idx, 1);
    }

    createBatch(event : Event) : void {
        event.stopPropagation();
        //   this.batch.ingredients = this.batchIngredients;
        console.log(this.batch);
    }

}
