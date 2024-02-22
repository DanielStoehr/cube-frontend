import { AsyncPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('ContentVideo') contentVideo!: ElementRef<HTMLVideoElement>;
  service = inject(UploadService);
  file$ = this.service.getUrl();

  constructor() {
    this.file$.subscribe((v) => {
      setTimeout(() => {
        this.play();
      }, 500);
    });
  }

  ngOnInit(): void {
    setInterval(() => {
      this.service.loadUrl();
    }, 3000);
  }

  play() {
    try {
      const media = this.contentVideo.nativeElement;
      media.muted = true;
      media.load();
      media.play();
    } catch {
      console.log('no video - skip play');
    }
  }
}
