import { Routes } from '@angular/router';
import { AnimalsComponent } from './animals/animals.component';
import { AnimalsFormComponent } from './animals/animals-form/animals-form.component';

export const routes: Routes = [
  { path: 'animals', component: AnimalsComponent },
  { path: 'animals/new', component: AnimalsFormComponent },
];
