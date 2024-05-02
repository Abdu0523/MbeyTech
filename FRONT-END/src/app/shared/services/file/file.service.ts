// shared/file.service.ts
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private file: File | null = null;
  apiUrl = 'http://localhost:3000/api/';
  enpdoint = 'uploads';
  serviceEndpoint = 'services';
  url = this.apiUrl + this.enpdoint;
  serviceUrl = this.apiUrl + this.serviceEndpoint;

  constructor(private http: HttpClient) {}

  setFile(file: File) {
    this.file = file;
  }

  getFile(): File | null {
    return this.file;
  }

  clearFile() {
    this.file = null;
  }

  getFileUpload(filename: string): Observable<string> {
    return this.http
      .get<string>(`${this.url}/${filename}`)
      .pipe(tap((filename) => console.log(filename)));
  }
}
