import { Component, OnInit } from '@angular/core';
import { ChannelService } from 'src/app/services/channel.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  chName: string = '';

  constructor(
    private utilitiesService: UtilitiesService,
    private channelService: ChannelService
  ) { }

  createChannel(){
    if(this.chName === ''){
      return this.utilitiesService.openToast('Channel Name is Required','REQUIRED')
    }
    return this.channelService.createChannel(this.chName);
  }

  ngOnInit(): void {
  }

}
