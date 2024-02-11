import { Component, OnInit } from '@angular/core';
import { MusicPlayerComponent } from "../music-player/music-player.component";
import { CardComponent } from "../card/card.component";
import { CategoriesComponent } from "../categories/categories.component";
import { WordService } from '../../services/word.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [MusicPlayerComponent, CardComponent, CategoriesComponent]
})
export class HomeComponent implements OnInit{
    musicPlayer: HTMLAudioElement | undefined
    soundEffect: string = "assets/fairy dust sound effect.mp3";
    startOn: boolean = true;
    categorySelected: boolean = false;
    subscriptions: Subscription[] = [];
    constructor(private wordService: WordService){
       
        wordService.goHome.subscribe(data => {
            if(data){
                this.startOn = true;
            }
        })
        
   
}
    ngOnInit(): void {
        this.subscriptions.push(
            this.wordService.schoolSuppliesCategories.subscribe(value => this.checkCategories()),
            this.wordService.clothesCategories.subscribe(value => this.checkCategories()),
            this.wordService.animalsCategories.subscribe(value => this.checkCategories())
          );
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
      }

    checkCategories() {
        if(this.wordService.schoolSuppliesCategories.value === false && 
           this.wordService.clothesCategories.value === false && 
           this.wordService.animalsCategories.value === false) {
          this.categorySelected = false;
        } else {
          this.categorySelected = true;
        }
      }

    start() {
        
         console.log(this.categorySelected)
        this.startOn = false;
        this.musicPlayer = new Audio(this.soundEffect)
        this.musicPlayer.volume = 0.15;
        this.musicPlayer.play()
       
    }

}
