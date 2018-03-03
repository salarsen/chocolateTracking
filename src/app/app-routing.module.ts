import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { IngredientComponent } from './ingredient/ingredient.component';
import { IngredientNewComponent } from './ingredient/ingredient-new/ingredient-new.component';
import { IngredientDetailComponent } from './ingredient/ingredient-detail/ingredient-detail.component';
import { IngredientEditComponent } from './ingredient/ingredient-edit/ingredient-edit.component';
import { IngredientTableComponent } from './ingredient/ingredient-table/ingredient-table.component';

import { BatchComponent } from './batch/batch.component';

const routes : Routes = [
  {
    path : '',
    redirectTo : 'home',
    pathMatch : 'full',
  },
  {
    path : 'home',
    component : HomeComponent,
  },
  {
    path : 'batch',
    component : BatchComponent,
    // children : 
  },
  {
    path : 'ingredient',
    component : IngredientComponent,
    children : [
      {
        path : '',
        redirectTo : 'ingredientsTable',
        pathMatch : 'full',
      },
      {
        path : 'ingredientsTable',
        component : IngredientTableComponent,
      },
      {
        path : 'newIngredient',
        component : IngredientNewComponent,
      },
      {
        path : 'editIngredient/:id',
        component : IngredientEditComponent,
      },
      {
        path : 'viewIngredient/:id',
        component : IngredientDetailComponent,
      },
    ]
  },
];

@NgModule({
  imports : [
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})

export class AppRoutingModule {}
