import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UtilitiesService } from './utilities.service';

export interface channel{
  [x:string]: any,
  id: number;
  channel_name: string;
  created_at: string;
  updated_at: string;
}
@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  public createChannel(channel_name:string){
    const request = {
      channel_name: channel_name,
    }
    this.apiService.post('channels',request).then((response:any) =>{
      if(response.data){
        this.utilitiesService.openToast('Channel Successfully Create');
      }
    }
    );
  }
  public getChannel(){
    return this.apiService.get('channels').then((response:any) =>{
      if(response.data){
        return response.data;
      }
    }
    );
  }

  constructor(
    private apiService: ApiService,
    private utilitiesService: UtilitiesService
  ) { }
}
