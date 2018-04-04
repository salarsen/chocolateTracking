import { Component, Output, EventEmitter, NgModule, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// File handling req's
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Ingredient } from '../../class/ingredient'

import { authService } from '../../services/auth.service';
import { ingredientService } from '../../services/ingredient.service';
import { fileService } from '../../services/file.service';

@Component({
  selector: 'app-ingredient-new',
  templateUrl: './ingredient-new.component.html',
  styleUrls: ['./ingredient-new.component.css']
})
export class IngredientNewComponent {

  ingredient : Ingredient = new Ingredient();

  ingredientErrors: string[] = [];

  acceptedMimeTypes = [
    'image/gif',
    'image/jpeg',
    'image/png',
  ];

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Access-Control-Allow-Headers': "Content-Type",
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin' : '*',
  //     "Access-Control-Allow-Methods": "POST",
  //   })
  // };

  @ViewChild('fileInput') fileInput: ElementRef;
  fileDataUri = '';
  errorMsg = '';

  @Output()
  addIngredient = new EventEmitter<Ingredient>();

  constructor(
    private auth : authService,
    private ingred : ingredientService,
    private file : fileService,
    private router : Router,
    private http : HttpClient,
  ) { }

  onSubmit(event : Event, form : NgForm) : void {
    event.preventDefault();

    console.log(form.value);
    
    this.ingred.createIngredient(form.value)
      .subscribe(ingredient => {
        this.addIngredient.emit(ingredient);
        this.ingredient = new Ingredient();
        form.reset();
      }, error => this.handleErrors(error.json()));
      console.log(`We submitted an ingredient`);
    }

  previewFile() : void {
    const file = this.fileInput.nativeElement.files[0];
    if(file && this.validateFile(file)){
      const reader = new FileReader();
      // console.log(this.fileInput.nativeElement.files)
      reader.readAsDataURL(this.fileInput.nativeElement.files[0]);
      reader.onload = () => {
        this.fileDataUri = reader.result;
      }
    } else {
      this.errorMsg = 'File must be a jpg, png, or gif and cannot exceed 500 KB in size';
    }
  }

  uploadFile(event : Event) : void {
    event.preventDefault();

    if(this.fileDataUri.length > 0){
      // console.log(this.fileDataUri)
      const base64File = this.fileDataUri.split(',')[1];
      // console.log(typeof base64File);
      const data = { 'image' : base64File };
      // console.log(typeof data)
    //   // console.log(this.httpOptions)
      this.file.uploadFile(data)
        .subscribe(res => {
          console.log('res',res);
          // this.fil
        },error => this.handleErrors(error.json()));
    //   this.http.post(`${environment.apiUrl}/upload-invoice`, data) //, this.httpOptions)
    //     .subscribe(res => {
    //       console.log('res',res);
    //       this.fileInput.nativeElement.value = '';
    //     }, error => this.handleErrors(error));
    }
  }

  logout(event: Event): void {
    event.stopPropagation();
    this.auth.logout()
      .then(() => this.router.navigate(['home']))
      .catch(response => console.log(response.json()));
  }

  private validateFile(file): boolean {
    return this.acceptedMimeTypes.includes(file.type) && file.size < 5000000;
  }

  private handleErrors(errors: string[] | Error): void {
    console.log(errors);
    this.ingredientErrors = Array.isArray(errors) ? errors : [errors.message];
  }
}
