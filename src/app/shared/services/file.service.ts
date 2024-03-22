import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  fileFinal: any = null;

  constructor() {}

  setFileFinal(fileHandel: any) {
    this.fileFinal = fileHandel;
  }

  getFileFinal() {
    return this.fileFinal;
  }
}
