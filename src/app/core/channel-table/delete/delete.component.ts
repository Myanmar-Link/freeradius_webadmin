import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  isLoading: boolean = false;
  channel: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private channelService: ChannelService,
    private dialog: MatDialog
  ) { }

  private setData(){
    this.channel = this.data;
  }

  async confirm(){
    this.isLoading = true;
    await this.channelService.del(this.channel.id);
    this.dialog.closeAll();
    this.isLoading = false;
  }

  async close(){
    this.dialog.closeAll();
  }


  ngOnInit(): void {
    this.setData();
    console.log(this.data);
  }

}
