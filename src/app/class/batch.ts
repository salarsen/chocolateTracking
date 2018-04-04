export class Batch {
   _id : string;
   barCount : number = 0;
   name : string;
    ingredients: Array<{ '_ingredientId' : string, 'amount' : number}> = [];
//    ingredients : Array<Object> = [];
   _addedBy : number;
}