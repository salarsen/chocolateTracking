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

import { AuthGuard } from './auth.guard';

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
    canActivate : [AuthGuard],
  },
  {
    path : 'batch/list',
    component: BatchListComponent,
    canActivate: [AuthGuard],
  },
  {
    path : 'batch/new',
    component: BatchNewComponent,
    canActivate: [AuthGuard],
  },
  {
    path : 'batch/detail/:id',
    component: BatchDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path : 'batch/edit/:id',
    component: BatchEditComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path : 'ingredients',
  //   children : []
  // },
  {
    path : 'ingredients',
    redirectTo : 'ingredients/list',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path : 'ingredients/list',
    component: IngredientTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ingredients/new',
    component: IngredientNewComponent,
    canActivate: [AuthGuard],
  },
  {
    path : 'ingredients/detail/:id',
    component: IngredientDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ingredients/edit/:id',
    component: IngredientEditComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports : [
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})

export class AppRoutingModule {}
