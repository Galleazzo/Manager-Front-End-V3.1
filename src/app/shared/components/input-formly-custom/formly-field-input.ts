import { Component, Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { FileService } from '@shared/services/file.service';

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

  fileChangeEvent(e: any) {
    const file = e.target.files[0];
    const fileHandel: any = {
      file: file,
      url: this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
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