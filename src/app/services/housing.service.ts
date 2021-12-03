import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  url = "houses";

  constructor(
    private utitlitiesService: UtilitiesService,
    private apiService: ApiService
  ) { }

  async create(newRequest: any){
    return this.apiService.post(this.url, newRequest).then((response: any) =>{
      if(response.status === "Success"){
        this.utitlitiesService.openToast('House create successfully', 'CREATE');
      }
    }).catch((error: any) => {
      return error;
    });
  }

  async getAll(){
    return this.apiService.get(this.url).then((response: any) => {
      if(response.status === "Success"){
        console.log(response.data);
        return response.data;
      }
    }).catch((error: any) => {
      return error;
    });
  }

  async update(id: string | number, data: any){
    return this.apiService.put(`${this.url}/${id}`, data).then((response: any) => {
      if(response.status === "Successful"){
        this.utitlitiesService.openToast('Edit successfully', 'UPDATE');
      }
    }).then((error: any) => {
      return error;
    });
  }

  async del(id: string | number){
    return this.apiService.delete(`${this.url}/${id}`).then((response: any) => {
      if(response.status === "Successful"){
        this.utitlitiesService.openToast('Delete Successfully', 'DELETE');
      }
    }).catch((error: any) => {
      return error;
    });
  }
}
