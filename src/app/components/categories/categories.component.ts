import { Component } from '@angular/core';
import { WordService } from '../../services/word.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  constructor(private wordService: WordService) { }

  chooseAnimalsCategory: boolean = false;
  chooseClothesCategory: boolean = false;
  chooseSchoolSuppliesCategory: boolean = false;

  chooseAnimals(){
    this.chooseAnimalsCategory = true;
    this.chooseClothesCategory = false;
    this.chooseSchoolSuppliesCategory = false;
    this.wordService.chooseAnimals()
    this.wordService.getWords()
  }
  chooseClothes(){
    this.chooseAnimalsCategory = false;
    this.chooseClothesCategory = true;
    this.chooseSchoolSuppliesCategory = false;  
    this.wordService.chooseClothes()
    this.wordService.getWords()
  }
  chooseSchoolSupplies(){
    this.chooseAnimalsCategory = false;
    this.chooseClothesCategory = false;
    this.chooseSchoolSuppliesCategory = true;
    this.wordService.chooseSchoolSupplies()
    this.wordService.getWords()
  }

}
