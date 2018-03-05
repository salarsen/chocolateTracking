import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';

import { authService } from './services/auth.service';
import { batchService } from './services/batch.service';
import { ingredientService } from './services/ingredient.service';

import { AppComponent } from './app.component';
// import { IngredientComponent } from './ingredient/ingredient.component';
import { BatchComponent } from './batch/batch.component';
import { IngredientNewComponent } from './ingredient/ingredient-new/ingredient-new.component';
import { IngredientEditComponent } from './ingredient/ingredient-edit/ingredient-edit.component';
import { IngredientTableComponent } from './ingredient/ingredient-table/ingredient-table.component';
import { IngredientDetailComponent } from './ingredient/ingredient-detail/ingredient-detail.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { BatchNewComponent } from './batch/batch-new/batch-new.component';
import { BatchListComponent } from './batch/batch-list/batch-list.component';
import { BatchDetailComponent } from './batch/batch-detail/batch-detail.component';
import { BatchEditComponent } from './batch/batch-edit/batch-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    // IngredientComponent,
    BatchComponent,
    IngredientNewComponent,
    IngredientEditComponent,
    IngredientTableComponent,
    IngredientDetailComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    BatchNewComponent,
    BatchListComponent,
    BatchDetailComponent,
    BatchEditComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    CookieModule.forRoot(),
  ],
  providers: [authService, batchService, ingredientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
