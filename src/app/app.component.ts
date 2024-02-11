import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MusicPlayerComponent } from "./components/music-player/music-player.component";
import { HttpClientModule } from '@angular/common/http';
import { CountUpModule } from 'ngx-countup';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, MusicPlayerComponent, HttpClientModule, CountUpModule]
})
export class AppComponent {
  title = 'translator';
}
