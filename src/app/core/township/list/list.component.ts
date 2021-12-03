import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TownshipService } from 'src/app/services/township.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  townshipList = new MatTableDataSource([]);
  isLoading: boolean = false;

  displayedColumns: string[] = ['index', 'township_name', 'state_name', 'status', 'created_at', 'updated_at', 'action'];
  


  constructor(
    private utilititesService: UtilitiesService,
    private townshipService: TownshipService,
    private dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild (MatSort) sort: MatSort | any;

  private async loadingData(){
    this.isLoading = true;
    const getTownship = await this.townshipService.getAll();
    this.townshipList = new MatTableDataSource(getTownship);
    this.townshipList.paginator = this.paginator;
    this.townshipList.sort = this.sort;

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
