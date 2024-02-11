import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { get } from 'http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  private animalsWordsUrl = './assets/animals.json';
  private clothesWordsUrl = './assets/clothes.json';
  private schoolSuppliesWordsUrl = './assets/school-supplies.json';
  words: any = [];
  wordsObs = new BehaviorSubject<any>(this.words);

  animalsCategories: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  clothesCategories: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  schoolSuppliesCategories: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  goHome: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {

  }

  chooseAnimals(){
    this.animalsCategories.next(true);
    this.clothesCategories.next(false);
    this.schoolSuppliesCategories.next(false);
    
  }
  chooseClothes(){
    this.clothesCategories.next(true);
    this.animalsCategories.next(false);
    this.schoolSuppliesCategories.next(false);
    
  }
  chooseSchoolSupplies(){
    this.schoolSuppliesCategories.next(true);
    this.animalsCategories.next(false);
    this.clothesCategories.next(false);
  }

  getWords() {
    if(this.animalsCategories.value === true ){
    this.http.get(this.animalsWordsUrl).subscribe((data) => {
      this.words= data;
      this.wordsObs.next(this.words);
      
    });
  }
  else if(this.clothesCategories.value === true){
    this.http.get(this.clothesWordsUrl).subscribe((data) => {
      this.words= data;
      this.wordsObs.next(this.words);
    });
  }
  else if(this.schoolSuppliesCategories.value === true){
    this.http.get(this.schoolSuppliesWordsUrl).subscribe((data) => {
      this.words= data;
      this.wordsObs.next(this.words);
    });
  }
}
  getWordsObs(): Observable<any> {
    return this.wordsObs.asObservable();
    
  }

 
}
