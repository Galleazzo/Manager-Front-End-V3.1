import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { PageHeaderComponent } from '@shared';
import { AnimalsService } from '@shared/services/animals.service';
import { finalize } from 'rxjs';
import { ModalDeleteComponent } from './delete-modal/modal-delete.component';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MtxGridModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    PageHeaderComponent,
  ],
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.css',
})
export class AnimalsComponent implements OnInit {
  columns: MtxGridColumn[] = [
    { header: 'id', field: 'id' },
    { header: 'Nome', field: 'name' },
    { header: 'Idade', field: 'animalAge' },
    { header: 'Tipo', field: 'animalType' },
    { header: 'URL do insta', field: 'instagramURL', type: 'link' },
    { header: 'Data de cadastro', field: 'registrationDate', type: 'date' },
    { header: 'Prioridade', field: 'priority' },
    {
      header: 'Ações',
      field: 'actions',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: 'Editar',
          click: (record) => {
            this.editAnimal(record)
          }
        },
        {
          type: 'icon',
          icon: 'delete',
          tooltip: 'Excluir',
          click: (value) => {
            this.deleteById(value)
          }
        }
      ]
    }
  ];
  list: any[] = [];
  total = 0;
  isLoading = true;
  animalName: string = "";
  page: any = 0;
  pageSize: any = 10;
  sort: string = "id";
  order: string = "desc";

  constructor(private animalsService: AnimalsService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.isLoading = true;
    debugger
    this.animalsService.getByCriteria(this.animalName, this.page, this.pageSize, this.sort, this.order).pipe(finalize(() => {
      this.isLoading = false;
    })).subscribe(res => {

      this.list = res.content;
      this.total = res.totalElements;
      this.isLoading = false;
    });
  }

  getNextPage(e: PageEvent) {
    this.page = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getList();
  }

  search() {
    this.page = 0;
    this.getList();
  }

  reset() {
    this.page = 0;
    this.pageSize = 10;
    this.animalName = "";
    this.getList();
  }

  new() {
    this.router.navigateByUrl('/registrations/animals/new');
  };

  deleteById(value: any) {
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      data: {
        data: value
      },
    });
    dialogRef.afterClosed().subscribe(result => (
      this.ngOnInit()
    ));
  }

  editAnimal(value: any) {
    this.router.navigateByUrl(`/registrations/animals/edit/${value.id}`)
  }
}