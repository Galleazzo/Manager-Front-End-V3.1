import { Component, Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { FileService } from '@shared/services/file.service';
import imageCompression from 'browser-image-compression';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'formly-field-input',
  template: `
    <input type="file" [formControl]="formControl" [formlyAttributes]="field" (change)="fileChangeEvent($event)">
  `,
})
export class InputFieldType extends FieldType<FieldTypeConfig> { 
  fileName: any = null
  fileType: any = null;

  fileFinal: any = null

  constructor(private sanitizer: DomSanitizer, private fileService: FileService) {
    super();
  }

  async fileChangeEvent(e: any) {
    const file = e.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };

    const compressedFile = await imageCompression(file, options);
    const fileHandel: any = {
      file: compressedFile,
      url: this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(compressedFile)
      ),
    };
    this.fileService.setFileFinal(fileHandel);
  }

  get finalValue() {
    return this.fileService.getFileFinal();
  }
}

export interface FileHandel {
  file: File,
  url: SafeUrl
}