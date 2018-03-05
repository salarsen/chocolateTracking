import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

// import { IngredientComponent } from './ingredient/ingredient.component';
import { IngredientNewComponent } from './ingredient/ingredient-new/ingredient-new.component';
import { IngredientDetailComponent } from './ingredient/ingredient-detail/ingredient-detail.component';
import { IngredientEditComponent } from './ingredient/ingredient-edit/ingredient-edit.component';
import { IngredientTableComponent } from './ingredient/ingredient-table/ingredient-table.component';

// import { BatchComponent } from './batch/batch.component';
import { BatchListComponent } from './batch/batch-list/batch-list.component';
import { BatchNewComponent } from './batch/batch-new/batch-new.component';
import { BatchDetailComponent } from './batch/batch-detail/batch-detail.component';
import { BatchEditComponent } from './batch/batch-edit/batch-edit.component';


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
    redirectTo: 'batch/list',
    pathMatch : 'full',
  },
  {
    path : 'batch/list',
    component : BatchListComponent,
  },
  {
    path : 'batch/new',
    component : BatchNewComponent,
  },
  {
    path : 'batch/detail/:id',
    component : BatchDetailComponent,
  },
  {
    path : 'batch/edit/:id',
    component : BatchEditComponent,
  },
  {
    path : 'ingredients',
    redirectTo : 'ingredients/list',
    pathMatch : 'full',
  },
  {
    path : 'ingredients/list',
    component : IngredientTableComponent,
  },
  {
    path: 'ingredients/new',
    component : IngredientNewComponent,
  },
  {
    path : 'ingredients/detail/:id',
    component : IngredientDetailComponent,
  },
  {
    path: 'ingredients/edit/:id',
    component: IngredientEditComponent,
  },
];

@NgModule({
  imports : [
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})

export class AppRoutingModule {}
