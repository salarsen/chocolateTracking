export class Batch {
   _id : string;
   barCount : number = 0;
   ingredients : Array<{ 'ingredient' : string, 'amount' : number}> = [];
//    ingredients : Array<Object> = [];
   _addedBy : number;
}