import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url = "accounts";

  constructor(
    private utilitiesService: UtilitiesService,
    private apiService: ApiService
  ) { }

  async create(element: any){
    return this.apiService.post(this.url, element).then((response: any) => {
      if(response.status === "Success"){
        this.utilitiesService.openToast('Account create successfully', 'CREATE');
      }
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
    return this.apiService.put(`${this.url}/${id}`, data).then((response: any) =>{
      if(response.status === 'Success'){
        this.utilitiesService.openToast('Edit successfully', 'UPDATE');
      }
    }).catch((error: any) => {
      return error;
    });
  }

  async del(id: string | number){
    return this.apiService.delete(`${this.url}/${id}`).then((response: any) => {
      if(response.status === "Success"){
        this.utilitiesService.openToast('Delete successfully', 'DELETE');
      }
    }).catch((error: any) => {
      return error;
      
    });
  }
}
