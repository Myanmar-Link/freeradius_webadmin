import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StatusGroupService } from 'src/app/services/status-group.service';
import { EditComponent } from '../edit/edit.component';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  statusGroupList: any = new MatTableDataSource([]);
  isLoading: boolean = true;

  displayedColumns: string[] = ['id', 'status_name', 'active', 'created_at', 'updated_at', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private utilitiesService: UtilitiesService,
    private dialog: MatDialog,
    private statusGroupService: StatusGroupService
  ) { }

  private async loadingData(){
    const getStatusList = await this.statusGroupService.getAll();

    this.statusGroupList = new MatTableDataSource(getStatusList);
    this.statusGroupList.paginator = this.paginator;
    this.statusGroupList.sort = this.sort;

    this.isLoading = false;
  }

  openEditModel(element:any){
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

  async ngOnInit(){
    await this.loadingData();
  }

}
