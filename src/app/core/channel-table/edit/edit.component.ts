import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChannelService } from 'src/app/services/channel.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  channel_name: string = '';
  isLoading: boolean = false;
  channelList: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private channelService: ChannelService,
    private utilitiesService: UtilitiesService,
    private dialog: MatDialog
  ) { }

  private async loadingData(){
    this.isLoading = true;
    this.channelList = await this.channelService.getAll();

    this.isLoading = false;
  }

  async update(){
    if( this.channel_name === ''){
      return this.utilitiesService.openToast('Channel name is required', 'REQUIRED');
    }
    const updateRequest = {
      channel_name: this.channel_name
    }
    this.isLoading = true;
    await this.channelService.update(this.data.id, updateRequest);
    this.dialog.closeAll();
    this.isLoading = false;
    return;
  }

  ngOnInit(): void {
    this.channel_name = this.data.channel_name;
  }

}
