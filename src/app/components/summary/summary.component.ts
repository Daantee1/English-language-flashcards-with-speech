import { Component, Input } from '@angular/core';
import { WordService } from '../../services/word.service';
import { CountUpModule } from 'ngx-countup';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CountUpModule,  HomeComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
  @Input() correctAnswerNumber : number = 0
  musicPlayer: HTMLAudioElement | undefined
  words: any = []
  winSoundEffect: string = "assets/win effect.mp3";
  constructor(private wordService : WordService) { 
    this.wordService.getWordsObs().subscribe(data => {
      this.words = data
    })
    this.musicPlayer = new Audio(this.winSoundEffect)
      this.musicPlayer.play()
}

goHome(){
  this.wordService.goHome.next(true)
}

}
