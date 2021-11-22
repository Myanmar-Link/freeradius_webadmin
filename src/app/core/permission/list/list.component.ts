import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PermissionService } from 'src/app/services/permission.service';
import { EditComponent } from '../edit/edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  permissionList: any = new MatTableDataSource([]);
  isLoading: boolean = true;

  displayedColumns: string[] = ['permission_name', 'read', 'write', 'edit', 'delete', 'status', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private permissionService: PermissionService,
    private dialog: MatDialog
  ) { }

  private async loadingData() {
    const getPermissionList = await this.permissionService.getAll();

    this.permissionList = new MatTableDataSource(getPermissionList);
    this.permissionList.paginator = this.paginator;
    this.permissionList.sort = this.sort;

    this.isLoading = false;
  }

  openEditModel(element: any) {
    const dialogRef = this.dialog.open(EditComponent, { data: element, width: '400px'});
    dialogRef.afterClosed().subscribe(() => {
      this.loadingData();
    })
  }

  async ngOnInit() {
    await this.loadingData()
  }

}
