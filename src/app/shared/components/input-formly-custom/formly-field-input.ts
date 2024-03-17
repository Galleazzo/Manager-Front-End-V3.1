import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-input',
  template: `
    <input type="file" [formControl]="formControl" [formlyAttributes]="field" (change)="fileChangeEvent($event)">
  `,
})
export class InputFieldType extends FieldType<FieldTypeConfig> { 
  fileName: any = null
  fileType: any = null;

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
    console.log(fileHandel);
    
    
  }
}

export interface FileHandel {
  file: File,
  url: SafeUrl
}