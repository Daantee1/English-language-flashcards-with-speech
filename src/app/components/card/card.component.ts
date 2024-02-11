import { ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { WordService } from '../../services/word.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SummaryComponent } from "../summary/summary.component";



@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
    imports: [HttpClientModule, SummaryComponent]
})
export class CardComponent implements OnInit{
  

  musicPlayer: HTMLAudioElement | undefined
  musicPlayer2: HTMLAudioElement | undefined
  currentWordIndex: number = 0;
  recognition: any;
  words: any = []
  correctAnswer: boolean = false;
  wrongAnswer: boolean = false;
  showMainDiv: boolean = true;
  correctAnswerSoundEffect: string = "assets/correct answer.mp3";
  wrongAnswerSoundEffect: string = "assets/wrong answer.mp3";
  correctAnswerNumber: number = 0;
  summary: boolean = false;
  constructor(private wordService : WordService, private cd: ChangeDetectorRef) { 
    this.wordService.getWordsObs().subscribe(data => {
      this.words = data
      
    })
   


    
  }
  ngOnInit(): void {}
 
  startRecognition() {

    if ('webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.recognition.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            const transcript = event.results[i][0].transcript;
            console.log(transcript)
            this.checkTranscript(transcript);
            
          }
        }
      };

      this.recognition.start();
    }
  }
  
  nextWord() {
    if (this.currentWordIndex < this.words.length - 1) {
      this.currentWordIndex++;
      console.log(this.currentWordIndex)
      
    }else{
      this.summary = true;
      this.cd.detectChanges();
    }
  }

   checkTranscript(transcript: string) {
    const currentWord = this.words[this.currentWordIndex];
    if (currentWord.translate === transcript.trim().toLowerCase()) {
      console.log('correct')
      this.musicPlayer = new Audio(this.correctAnswerSoundEffect)
      this.musicPlayer.play()
       this.correctAnswer = true;
       this.wrongAnswer = false;
       this.showMainDiv = false;
       this.cd.detectChanges();
       setTimeout(() => {
        this.nextWord();
        this.correctAnswerNumber++
        this.correctAnswer = false;
        this.showMainDiv = true;
        this.recognition.stop();
        this.cd.detectChanges();
        
      }, 2000);
      
       
    } else {
      this.wrongAnswer = true;
      this.correctAnswer = false;
      this.musicPlayer2 = new Audio(this.wrongAnswerSoundEffect)
      this.musicPlayer2.play()
      console.log('wrong')
      this.cd.detectChanges();
    }
    

  }
  
}
