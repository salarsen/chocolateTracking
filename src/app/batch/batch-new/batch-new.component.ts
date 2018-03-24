import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
    batchIngredients : Array<{ 'ingredient' : Ingredient, 'amount' : number }> = [];
    ingredientIndexer : Array<string> = []; // because find/filter/indexOf doesn't work on nested objects, more work to be done...


    ingredientToAdd: Ingredient = new Ingredient();
    amountToUse : number;

    batchErrors : string[] = [];
    @Output()
    addBatch = new EventEmitter<Batch>();

    constructor(
        private auth : authService,
        private ingredService : ingredientService,
        private batchService : batchService,
        private router : Router,
    ) { }

    ngOnInit() {
        // this.batch.ingredients = [];
        // this.batch.barCount = 0;
        console.log(this.batch)


        this.ingredService.getIngredientsAvailable()
            .subscribe(ingredients => {
                this.ingredients = ingredients;
            },error => this.handleErrors(error.json()));
    }

    addIngredient(event : Event) : void {
        event.stopPropagation();
        // Check if the values the user has submitted are correct
        if(this.ingredientToAdd._id && this.amountToUse !== null && this.amountToUse !== 0){
            
            let idx = this.ingredientIndexer.indexOf(this.ingredientToAdd._id);

            if(idx >= 0 && this.amountToUse + this.ingredientToAdd.amountUsed + this.batchIngredients[idx].amount <= this.ingredientToAdd.amount){
                this.batchIngredients[idx].amount += this.amountToUse;
            } else if(this.amountToUse + this.ingredientToAdd.amountUsed <= this.ingredientToAdd.amount){
                this.batchIngredients.push({ 'ingredient' : this.ingredientToAdd, 'amount' : this.amountToUse });
                this.ingredientIndexer.push(this.ingredientToAdd._id);
            } else {
                // error message here for not enough ingredients left
            }
            this.ingredientToAdd = new Ingredient();
            this.amountToUse = null;
        } else {
            // error message here for blank form data
        }
    }

    removeIngredient(event : Event, ingredientId : string) : void {
        // console.log(ingredientId)
        let idx = this.ingredientIndexer.indexOf(ingredientId);
        this.batchIngredients.splice(idx,1);
        this.ingredientIndexer.splice(idx, 1);
    }

    createBatch(event : Event, form : NgForm) : void {
        event.stopPropagation();
        // Object.assign(this.batch.ingredients, this.batchIngredients);
        for (let item in this.batchIngredients) {
            this.batch.ingredients.push({'_ingredientId' : this.batchIngredients[item].ingredient._id, 'amount' : this.batchIngredients[item].amount})
        }
        this.batchService.createBatch(this.batch)
            .subscribe(batch => {
                this.addBatch.emit(batch);
                this.batch = new Batch();
                this.batchIngredients = [];
                this.ingredientIndexer = [];
                form.reset();

                // reroute on success?
            }, error => this.handleErrors(error.json()));
    }

    private handleErrors(errors: string[] | Error): void {
        console.log(errors);
        this.batchErrors = Array.isArray(errors) ? errors : [errors.message];
    }

}
