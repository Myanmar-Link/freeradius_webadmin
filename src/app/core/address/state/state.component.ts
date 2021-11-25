import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddressService } from 'src/app/services/address.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  name: string = '';

  stateList: any = new MatTableDataSource([]);
  isLoading: boolean = true;

  displayedColumns: string[] = ['state_name', 'status', 'action'];

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
    const getPermissionList = await this.addressService.getAllState();

    this.stateList = new MatTableDataSource(getPermissionList);
    this.stateList.paginator = this.paginator;
    this.stateList.sort = this.sort;

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
      return this.utilitiesService.openToast('State name is required', 'REQUIRED')
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
