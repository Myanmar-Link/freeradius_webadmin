import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { channel, ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  displayedColumns: string[] = ['id', 'channel_name', 'created_at', 'updated_at', 'option'];
  channelData: any = new MatTableDataSource([]);

  constructor(
    private channelService: ChannelService
  ) { }

  @ViewChild(MatPaginator) paginator : MatPaginator | any;
  @ViewChild(MatTable) table : MatTable<channel> | any;

    async showctable(){
      let getTable = await this.channelService.getChannel();
      this.channelData = getTable;
      this.table.renderRows();
    }

  ngOnInit(): void {
    this.showctable();
  }

}
