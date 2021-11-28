import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StatusService } from 'src/app/services/status.service';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  statusList: any = new MatTableDataSource([]);
  isLoading: boolean = true;

  displayedColumns: string[] = ['id', 'status_group_id', 'status_name', 'remark', 'created_at', 'updated_at', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) private sort: MatSort | any;

  constructor(
    private statusService: StatusService,
    private dialog: MatDialog
  ) { }

  private async loadingData(){
    const getStatusList = await this.statusService.getAll();

    this.statusList = new MatTableDataSource(getStatusList);
    this.statusList.paginator = this.paginator;
    this.statusList.sort = this.sort;

    this.isLoading = false
  
  }

  openEditModel(element: any){
    const dialogRef = this.dialog.open(EditComponent, {data: element, width: '400px'});
    dialogRef.afterClosed().subscribe(() => {
      this.loadingData();
    })
  
  }

  openDelModel(element: any){
    const dialogRef = this.dialog.open(DeleteComponent, {data: element, width: '400px'});
    dialogRef.afterClosed().subscribe(() => {
      this.loadingData();
    })

  }

  async ngOnInit() {
    await this.loadingData();
  }

}
