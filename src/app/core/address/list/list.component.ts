import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddressService } from 'src/app/services/address.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { AddressModule } from '../address.module';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  addressList = new MatTableDataSource([]);
  displayedColumns: string [] = ['index', 'floor', 'building_number', 'street', 'near_street',
  'location', 'ward_name', 'state_name', 'township_name', 'created_at', 'updated_at'];

  lists: string[] = ['Order Form', 'Employee', 'Company'];

  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private addressService: AddressService,
    private utilitiesService: UtilitiesService
  ){}  

  private async loadingData(){
    this.isLoading = true;
    const getAddress = await this.addressService.getAddress();
    this.addressList = new MatTableDataSource(getAddress);
    this.addressList.paginator = this.paginator;
    this.addressList.sort = this.sort;
    this.isLoading = false;
  }

  async filterAdd(value: string){
    switch(value){
      case "orderForm":
        this.isLoading = true;
        const getForm = await this.addressService.getOrderForm();
        this.addressList = new MatTableDataSource(getForm);
        this.isLoading = false;
        break;

      case "employee":
        this.isLoading = true;
        const getemp = await this.addressService.getEmployee();
        this.addressList = new MatTableDataSource(getemp);
        this.isLoading = false;
        break;
      
      case "company":
        this.isLoading = true;
        const getcom = await this.addressService.getCompany();
        this.addressList = new MatTableDataSource(getcom);
        this.isLoading = false;
        break;
    }
  }

  ngOnInit(): void {
    this.loadingData();
  }

}
