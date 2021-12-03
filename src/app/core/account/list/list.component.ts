import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'src/app/services/account.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  isLoading: boolean = false;
  accountList = new MatTableDataSource([]);

  displayedColumns: string[] = ['index', 'mac_address', 'password', 'mac_address_cm', 'is_ip_address_mode_cm', 'is_ip_address_mode_cpe', 'mac_address_cpe',
                                  'allow_this_mac_only', 'ip_address_mode_cpe_id', 'simultaneous_use', 'vat_id', 'is_active', 'created_at', 'updated_at', 'action']

  constructor(
    private utilitiesService: UtilitiesService,
    private accountService: AccountService,
    private dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  async loadingData(){
    this.isLoading = true;
    const getAccount = await this.accountService.getAll();

    this.accountList = new MatTableDataSource(getAccount);
    this.accountList.paginator = this.paginator;
    this.accountList.sort = this.sort;
    this.isLoading = false;
  }

  openEditModel(element: any){
    const dialogRef = this.dialog.open(EditComponent, {data: element, width: '400px', maxHeight: '90vh'});
    dialogRef.afterClosed().subscribe(() =>{
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
