import { Component } from '@angular/core';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.css'
})
export class MusicPlayerComponent {

  musicPlayer: HTMLAudioElement | undefined
  music: string = 'assets/soundtrack.mp3';
  isPlaying: boolean = false;

  toggleMusic() {
    if (this.isPlaying) {
      this.musicStop()
    } else {
      this.musicPlay()
    }
  }
  musicPlay() {
    this.musicPlayer = new Audio(this.music)
    this.musicPlayer.play()
    this.isPlaying = true

  }
  musicStop() {
    if (this.musicPlayer) {
      this.musicPlayer.pause()
      this.isPlaying = false
    }
  }



}
