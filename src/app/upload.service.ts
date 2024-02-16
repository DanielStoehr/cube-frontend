import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { ResponseType } from './response.type';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  http = inject(HttpClient);
  url = new BehaviorSubject<ResponseType>({ url: '', type: 'init' });

  getUrl() {
    return this.url.asObservable();
  }

  loadUrl() {
    // Replace 'your-api-endpoint' with your actual backend API endpoint
    this.http.get<Response>('http://localhost:3000/upload').subscribe((v) => {
      const parts = v.url.split('.');
      const ext = parts[parts.length - 1].toLowerCase();
      if (v.url == '') {
        this.url.next({ type: 'init', url: v.url });
        return;
      }
      if (ext == 'png' || ext == 'jpg' || ext == 'jpeg') {
        this.url.next({ type: 'image', url: v.url });
        return;
      }
      if (ext == 'mp4') {
        this.url.next({ type: 'movie', url: v.url });
        return;
      }
      this.url.next({ type: 'none', url: v.url });
    });
  }
}
