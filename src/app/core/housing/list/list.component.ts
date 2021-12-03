import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HousingService } from 'src/app/services/housing.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  housingList: any = new MatTableDataSource([]);
  isLoading: boolean =false;

  displayedColumns: string[] = ['index', 'state_id', 'township_id', 'ward_id', 'street_id', 'housing_name', 'location', 'created_at', 'updated_at', 'action'];

  constructor(
    private utilitiesService: UtilitiesService,
    private housingService: HousingService,
    private dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  async loadingData(){
    this.isLoading = true;
    const getHousing = await this.housingService.getAll();
    this.housingList = new MatTableDataSource(getHousing);
    this.housingList.paginator = this.paginator;
    this.housingList.sort = this.sort;
    this.isLoading = false;
  }

  openEditModel(element: any){
    const dialogRef = this.dialog.open(EditComponent, {data: element, width: '400px'});
    dialogRef.afterClosed().subscribe(() => {
      this.loadingData();
    });
  }
  
  openDelModel(element: any){
    const dialogRef = this.dialog.open(DeleteComponent, {data: element, width: '400px'});
    dialogRef.afterClosed().subscribe(() => {
      this.loadingData();
    });
  }

  ngOnInit(): void {
    this.loadingData();
  }

}
