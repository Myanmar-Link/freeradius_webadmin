import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { WardService } from 'src/app/services/ward.service';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  wardList = new MatTableDataSource([]);
  isLoading: boolean = false;
  
  displayedColumns: string[] = ['index', 'township_name', 'ward_name', 'created_at', 'updated_at', 'action'];

  constructor(
    private wardService: WardService,
    private utilitiesService: UtilitiesService,
    private dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  private async loadingData(){
    this.isLoading = true;
    const getWard = await this.wardService.getAll();
    this.wardList = new MatTableDataSource(getWard);
    this.wardList.paginator = this.paginator;
    this.wardList.sort = this.sort;
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
    })
  }

  ngOnInit(): void {
    this.loadingData();
  }

}
