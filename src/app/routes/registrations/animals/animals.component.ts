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
import { TranslateService } from '@ngx-translate/core';
import { ImageProcessingService } from '@shared/services/image-processing.service';
import { ViewImageModalComponent } from './view-image-modal/view-image-modal.component';
import { ModalStatusComponent } from './change-status-modal/modal-status.component';

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
    { header: 'URL do insta', field: 'instagramURL', type: 'link' },
    { header: 'Data de cadastro', field: 'registrationDate', type: 'date' },
    { header: 'Prioridade', field: 'priority' },
    { header: 'Status', field: 'active' },
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
        },
        {
          type: 'icon',
          icon: 'crop_original',
          tooltip: 'Imagem',
          click: (value) => {
            this.openImageDetail(value)
          }
        },
        {
          type: 'icon',
          icon: 'pets',
          tooltip: 'Status',
          click: (value) => {
            this.changeStatus(value)
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

  constructor(private animalsService: AnimalsService, private router: Router, private dialog: MatDialog, private translate: TranslateService, private imageProcessingService: ImageProcessingService) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.isLoading = true;
    this.animalsService.getByCriteria(this.animalName, this.page, this.pageSize, this.sort, this.order).pipe(finalize(() => {
      this.isLoading = false;
    })).subscribe(res => {
      

      this.list = res.content;
      
      this.list.forEach(animal => {
        animal = this.imageProcessingService.createImages(animal)
      })

      this.list.forEach(animal => {
        if(animal.animalType == "DOG") {
          animal.animalType = "Cachorro";
        }
        if(animal.animalType == "CAT") {
          animal.animalType = "Gato";
        }
      })

      this.list.forEach(animal => {
        if (animal.animalAge == "BELOW_TWO_MONTHS") {
          animal.animalAge = "Menos que dois meses"
        }
        if (animal.animalAge == "TWO_TO_SIX_MONTHS") {
          animal.animalAge = "De dois a seis meses"
        }
        if (animal.animalAge == "SEVEN_TO_ELEVEN_MONTHS") {
          animal.animalAge = "De sete a onze meses"
        }
        if (animal.animalAge == "ONE_YEARS") {
          animal.animalAge = "Um ano"
        }
        if (animal.animalAge == "TWO_YEARS") {
          animal.animalAge = "Dois anos"
        }
        if (animal.animalAge == "THREE_YEARS") {
          animal.animalAge = "Três anos"
        }
        if (animal.animalAge == "FOUR_YEARS") {
          animal.animalAge = "Quatro anos"
        }
        if (animal.animalAge == "FIVE_YEARS") {
          animal.animalAge = "Cinco anos"
        }
        if (animal.animalAge == "MORE_SIX_YEARS") {
          animal.animalAge = "Mais de seis anos"
        }
      })
      

      this.total = res.totalElements;
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

  changeStatus(value: any) {
    const dialogRef = this.dialog.open(ModalStatusComponent, {
      data: {
        data: value
      },
    });
    dialogRef.afterClosed().subscribe(result => (
      this.ngOnInit()
    ));
  }

  openImageDetail(value: any) {
    const dialogRef = this.dialog.open(ViewImageModalComponent, {
      width: "auto",
      data: {
        data: value
      },
    });
    
  }

  editAnimal(value: any) {
    this.router.navigateByUrl(`/registrations/animals/edit/${value.id}`)
  }
}