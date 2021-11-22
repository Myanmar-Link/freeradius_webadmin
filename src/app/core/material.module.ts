import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

const MaterialModules: any = [
  MatInputModule, 
  MatButtonModule, 
  MatSnackBarModule, 
  MatToolbarModule, 
  MatIconModule, 
  MatMenuModule,
  MatSidenavModule, 
  MatExpansionModule,
  MatCardModule, 
  MatCheckboxModule, 
  MatTableModule, 
  MatProgressBarModule,
  MatChipsModule, 
  MatDialogModule, 
  MatPaginatorModule,
  MatSortModule
];

@NgModule({
  declarations: [
  ],
  imports: [
    ...MaterialModules
  ],
  exports: [
    ...MaterialModules
  ]
})
export class MaterialModule { }
