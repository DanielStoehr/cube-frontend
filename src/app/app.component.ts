import { Component, OnInit, inject } from '@angular/core';
import { UploadService } from './upload.service';
import { AsyncPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { ResponseType } from './response.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  service = inject(UploadService);
  file$ = this.service.getUrl();

  ngOnInit(): void {
    setInterval(() => {
      this.service.loadUrl();
    }, 1000);
  }
}
