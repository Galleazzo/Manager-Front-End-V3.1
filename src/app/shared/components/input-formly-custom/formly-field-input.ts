import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-input',
  template: `<input type="file" [formControl]="formControl" [formlyAttributes]="field">`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormlyModule
  ]
})
export class FormlyFieldInputFile extends FieldType<FieldTypeConfig> {
  selectedFile: any;
} 