import { Component, Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

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

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  fileChangeEvent(e: any) {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const fileHandel: FileHandel = {
      file: file,
      url: this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      ),
    };
    this.fileFinal = fileHandel;
    return fileHandel;
  }

  get finalValue() {
    return this.fileFinal;
  }
}

export interface FileHandel {
  file: File,
  url: SafeUrl
}