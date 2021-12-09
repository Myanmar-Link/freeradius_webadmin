import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderFormService } from 'src/app/services/order-form.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  orderFormList = new MatTableDataSource([]);
  isLoading: boolean = false;

  displayedColumns: string[] = ['index', 'customer_name', 'service_plan', 'customer_group', 'user_address',
                                'nrc', 'passport', 'pass_front_img', 'pass_back_img', 'nrc_front_img', 'nrc_back_img',
                               'is_company', 'sale_remark', 'channel_name', 'status_name', 'install_team_name', 'billing_zone_name',
                               'remark', 'created_at', 'updated_at', 'action'];

  async loadingData() {
    this.isLoading = true;
    const getOrderForm = await this.orderFormService.getAll();
    this.orderFormList = new MatTableDataSource(getOrderForm);
    this.orderFormList.paginator = this.paginator;
    this.orderFormList.sort = this.sort;
    this.isLoading = false;
  }  
  
  openEditModel(element: any){

  }

  openDelModel(element: any) {

  }

  constructor(
    private orderFormService: OrderFormService,
    private dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  ngOnInit(): void {
    this.loadingData();
  }

}
