import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyService } from 'src/app/services/company.service';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  companyList: any = new MatTableDataSource([]);
  isLoading: boolean = true;

  displayedColumns: string[] = ['company_name', 'company_type', 'contact_persion', 'email_address', 'phone_number', 'floor', 'street', 'near_street', 'locaiton', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private companyService: CompanyService,
    private dialog: MatDialog
  ) { }

  private async loadingData() {
    const getCompanyList = await this.companyService.getAll();

    this.companyList = new MatTableDataSource(getCompanyList);
    this.companyList.paginator = this.paginator;
    this.companyList.sort = this.sort;

    this.isLoading = false;
  }

  openEditModel(element: any) {
    const dialogRef = this.dialog.open(EditComponent, { data: element, width: '400px'});
    dialogRef.afterClosed().subscribe(() => {
      this.loadingData();
    })
  }

  openDelModel(element: any) {
    const dialogRef = this.dialog.open(DeleteComponent, { data: element, width: '400px'});
    dialogRef.afterClosed().subscribe(() => {
      this.loadingData();
    })
  }

  async ngOnInit() {
    await this.loadingData()
  }

}
