import { coerceStringArray } from '@angular/cdk/coercion';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChannelService } from 'src/app/services/channel.service';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  channelList: any =new MatTableDataSource([]);
  isLoading: boolean = false;

  displayedColumns: string[] = ['index', 'channel_name', 'status', 'created_at', 'updated_at', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private channelService: ChannelService,
    private dialog: MatDialog
  ) { }

  private async loadingData(){
    this.isLoading = true;
    const getChannelList = await this.channelService.getAll();
    
    this.channelList = new MatTableDataSource(getChannelList);
    this.channelList.paginator = this.paginator;
    this.channelList.sort = this.sort;
    
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
    })
  }

  async ngOnInit() {
    await this.loadingData();
  }

}
