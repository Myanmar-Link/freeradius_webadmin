import { Component, OnInit } from '@angular/core';
import { ChannelService } from 'src/app/services/channel.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  channel_name: string = '';
  isLoading: boolean = false;
  channelList: any[] = [];

  constructor(
    private utilitiesService: UtilitiesService,
    private channelService: ChannelService
  ) { }

  private async loadingData(){
    this.isLoading = true;
    this.channelList = await this.channelService.getAll();

    this.isLoading = false;
  }

  async create(){
    if(this.channel_name === ''){
      return this.utilitiesService.openToast('Channel Name Is Required', 'REQUIRED');
    }
    const newRequest = {
      channel_name: this.channel_name
    }
    this.isLoading = true;
    await this.channelService.create(newRequest);
    this.isLoading = false;
    return;
  }

  ngOnInit(): void {
    this.loadingData();
  }

}
