import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { PageHeaderComponent } from '@shared';
import { AnimalsService } from '@shared/services/animals.service';
import { finalize } from 'rxjs';

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
    { header: 'Name', field: 'name' },
    { header: 'animalAge', field: 'animalAge' },
    { header: 'animalType', field: 'animalType' },
    { header: 'instagramURL', field: 'instagramURL', type: 'link' },
    { header: 'registrationDate', field: 'registrationDate', type: 'date' },
    { header: 'priority', field: 'priority' }
  ];
  list: any[] = [];
  total = 0;
  isLoading = true;
  name: string = "";
  page: any = 0;
  pageSize: any = 10;
  sort: string = "id";
  order: string = "desc";

  query = {
    q: 'user:nzbin',
    sort: 'stars',
    order: 'desc',
    page: 0,
    per_page: 10,
  };



  constructor(private animalsService: AnimalsService
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.isLoading = true;

    this.animalsService.getByCriteria(this.name, this.page, this.pageSize, this.sort, this.order).pipe(finalize(() => {
      this.isLoading = false;
    })).subscribe(res => {
      console.log(res);

      this.list = res.content;
      this.total = res.totalElements;
      this.isLoading = false;
    });
  }

  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.per_page = e.pageSize;
    this.getList();
  }

  search() {
    this.query.page = 0;
    this.getList();
  }

  reset() {
    this.query.page = 0;
    this.query.per_page = 10;
    this.getList();
  }
}