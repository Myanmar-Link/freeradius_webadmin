import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InstallTeamService } from 'src/app/services/install-team.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  installTeamList: any = new MatTableDataSource([]);
  isLoading: boolean = false;

  displayedColumns: string[] = ['id', 'install_team_name', 'employee_id', 'status', 'created_at', 'updated_at', 'action'];

  constructor(
    private installTeamService: InstallTeamService,
    private utilitiesServiceService: UtilitiesService,
    private dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator)paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort |any;

  async loadingData(){
    this.isLoading = true;
    const getInstallTeam = await this.installTeamService.getAll();

    this.installTeamList = new MatTableDataSource(getInstallTeam);
    this.installTeamList.paginator = this.paginator;
    this.installTeamList.sort = this.sort;
    this.isLoading = false;
  }

  openEditModel(element: any){
    const dialogRef = this.dialog.open(EditComponent, {data: element, width: '400px'});
    dialogRef.afterClosed().subscribe(() =>{
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
