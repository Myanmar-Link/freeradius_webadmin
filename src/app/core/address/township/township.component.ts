import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddressService } from 'src/app/services/address.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-township',
  templateUrl: './township.component.html',
  styleUrls: ['./township.component.css']
})
export class TownshipComponent implements OnInit {

  name: string = '';

  townshipList: any = new MatTableDataSource([]);
  stateList: any = [];
  isLoading: boolean = false;

  displayedColumns: string[] = ['township_name', 'status', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private addressService: AddressService,
    private utilitiesService: UtilitiesService,
    private dialog: MatDialog
  ) { }
  
  /**
   * Loading data from API call
   */
  private async loadingData() {
    const getPermissionList = await this.addressService.getAllTownship();

    this.townshipList = new MatTableDataSource(getPermissionList);
    this.townshipList.paginator = this.paginator;
    this.townshipList.sort = this.sort;

    this.stateList = await this.addressService.getAllState();

    this.isLoading = false;
  }

  /**
   * Open Edit Modal Dialog 
   * @param element 
   */
  openEditModel(element: any) {
    const dialogRef = this.dialog.open(EditComponent, { data: element, width: '400px'});
    dialogRef.afterClosed().subscribe(() => {
      this.loadingData();
    })
  }

  /**
   * Create State
   * @returns 
   */
  async create() {
    if(this.name === '') {
      return this.utilitiesService.openToast('Township name is required', 'REQUIRED')
    }

    const newState = {
      state_name: this.name,
    }

    this.isLoading = true;
    await this.addressService.createState(newState);
    this.isLoading = false;
    return;
  }

  /**
   * Initialize State
   */
  async ngOnInit() {
    await this.loadingData()
  }

}
