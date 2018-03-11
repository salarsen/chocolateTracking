export class Batch {
   _id : string;
   barCount : number = 0;
   ingredients : Array<{'ingredient' : Object, 'amount' : number}> = [];
   // amountUsed : Array<number>;
   _addedBy : number;
}