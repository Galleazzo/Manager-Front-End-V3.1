import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { PageHeaderComponent } from '@shared';
import { AnimalsService } from '@shared/services/animals.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-animalsForm',
  templateUrl: './animals-form.component.html',
  styleUrls: ['./animals-form.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    FormlyModule,
    PageHeaderComponent,
  ],
})
export class AnimalsFormComponent implements OnInit {


  animalForm = new FormGroup({});
  model = {};
  type: string = "";

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'name',
          templateOptions: {
            label: 'Nome',
            required: true,
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'instagramURL',
          templateOptions: {
            label: 'URL do instagram',
            required: false,
          }
        },
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-4',
          type: 'combobox',
          key: 'animalAge',
          templateOptions: {
            label: 'Idade',
            options: [
              { id: 0, name: 'BELOW_TWO_MONTHS' },
              { id: 1, name: 'TWO_TO_SIX_MONTHS' },
              { id: 2, name: 'SEVEN_TO_ELEVEN_MONTHS' },
              { id: 3, name: 'ONE_YEARS' },
              { id: 4, name: 'TWO_YEARS' },
              { id: 5, name: 'THREE_YEARS' },
              { id: 6, name: 'FOUR_YEARS' },
              { id: 7, name: 'FIVE_YEARS' },
              { id: 8, name: 'MORE_SIX_YEARS' },
            ],
            labelProp: 'name',
            valueProp: 'id',
            required: true,
          },
        },
        {
          className: 'col-sm-4',
          type: 'combobox',
          key: 'animalType',
          templateOptions: {
            label: 'Tipo',
            options: [
              { id: 0, name: 'DOG' },
              { id: 1, name: 'CAT' },
            ],
            labelProp: 'name',
            valueProp: 'id',
            required: true,
          },
        },
        {
          className: 'col-sm-4',
          type: 'combobox',
          key: 'size',
          templateOptions: {
            label: 'Tamanho',
            options: [
              { id: 0, name: 'SMALL' },
              { id: 1, name: 'AVERAGE' },
              { id: 2, name: 'BIG' },
            ],
            labelProp: 'name',
            valueProp: 'id',
            required: true,
          },
        },
      ],
    },
    {
      type: 'textarea',
      key: 'description',
      templateOptions: {
        label: 'Descrição',
      },
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'race',
          templateOptions: {
            label: 'Raça',
            required: true,
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'priority',
          templateOptions: {
            type: 'number',
            label: 'Prioridade',
            max: 10,
            min: 0,
            pattern: '\\d{5}',
          },
        },
      ],
    },
  ];

  constructor(private toast: ToastrService, private animalService: AnimalsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.data['type'];

    console.log(this.type);
    
  }


  submit() {

    this.animalService.save(this.animalForm.value).subscribe((response: any) => {
      console.log(response);
      return this.router.navigate(['/registrations/animals']);
    })

  }

  showToast(obj: any) {
    this.toast.success(JSON.stringify(obj));
  }

  cancel() {
    return this.router.navigate(['/registrations/animals']);
  }
}