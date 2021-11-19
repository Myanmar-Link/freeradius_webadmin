import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UtilitiesService } from './utilities.service';

export interface status{
  [x:string]: any;
  id: number;
  status_name: string;
  active: boolean;
  created_at: string;
  updated_at: string;

}

@Injectable({
  providedIn: 'root'
})
export class StatusgroupService {

  constructor(
    private utilitiesService: UtilitiesService,
    private apiService: ApiService
  ) { }

  public createStatusGroup(statusName: string,){
    const request = {
      status_name: statusName
    }
    this.apiService.post('status-groups',request).then((response:any) =>{
      if(response.data){
        this.utilitiesService.openToast('Status Group Successfully Create');
      }
    })
  }
  public getStatusGroup(){
    return this.apiService.get('status-groups').then((response:any) =>{
      if(response.data){
        return response.data;
      }
    })
  }
}
