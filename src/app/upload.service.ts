import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ResponseType } from './response.type';

const defaultResponse: ResponseType = { url: 'assets/idle.mp4', type: 'movie' };

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private http = inject(HttpClient);
  private lastUrl = '';
  private urlStorage = new Subject<ResponseType>();
  url = new BehaviorSubject<ResponseType>(defaultResponse);

  constructor() {
    this.urlStorage.subscribe((v) => {
      console.log('setting url');
      this.url.next({
        type: 'movie',
        url: 'assets/transition.mp4',
      });
      setTimeout(() => {
        this.url.next(v);
      }, 2000);
    });
  }

  getUrl() {
    return this.url.asObservable();
  }

  loadUrl() {
    // Replace 'your-api-endpoint' with your actual backend API endpoint
    this.http.get<Response>('http://localhost:3000/upload').subscribe((v) => {
      if (v.url == this.lastUrl) {
        console.log('abbruch');
        return;
      }
      this.lastUrl = v.url;
      const parts = v.url.split('.');
      const ext = parts[parts.length - 1].toLowerCase();
      if (v.url == '') {
        this.urlStorage.next(defaultResponse);
        return;
      }
      if (ext == 'png' || ext == 'jpg' || ext == 'jpeg') {
        this.urlStorage.next({ type: 'image', url: v.url });
        return;
      }
      if (ext == 'mp4') {
        this.urlStorage.next({ type: 'movie', url: v.url });
        return;
      }
      this.urlStorage.next({ type: 'none', url: v.url });
    });
  }
}
