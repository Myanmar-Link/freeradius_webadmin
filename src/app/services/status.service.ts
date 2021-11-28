import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  url = "status"

  constructor(
    private apiService: ApiService,
    private utilitiesService: UtilitiesService
  ) { }

  async create(newRequest: any){
    return this.apiService.post(this.url, newRequest).then((response: any) => {
      if(response.status === "Success"){
        this.utilitiesService.openToast('Create Successfully', 'CREATED');
      }
      return response.data;
    }).catch((error: any) => {
      return error;
    });
  }
  async getAll(){
    return this.apiService.get(this.url).then((response: any) => {
      return response.data;
    }).catch((error: any) => {
      return error;
    });
  }

  async update(id: string | number, data: any){
    return this.apiService.put(`${this.url}/${id}`, data).then((response: any) => {
      if(response.status === "Success")
      {
        this.utilitiesService.openToast('Edit Successfully', 'UPDATE');
      }
      return response.data;
    }).catch((error: any) => {
      return error;
    });
  }

  async del(id: string | number){
    return this.apiService.delete(`${this.url}/${id}`).then((response: any) => {
      if(response.status === "Successful"){
        this.utilitiesService.openToast('Delete Successfully', 'DELETE');
      }
    }).catch((error: any) => {
      return error;
    });
  }
}
