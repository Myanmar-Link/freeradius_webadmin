import { Injectable } from '@angular/core';
import { PERMISSION } from '../models/permission.model';
import { ApiService } from './api.service';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  url = "permissions";

  constructor(
    private apiService: ApiService,
    private utilitiesService: UtilitiesService
  ) { }
  

  async create(newRequest: any) {
    return this.apiService.post(this.url, newRequest).then((response: any) => {
      if(response.status === "Success") {
        this.utilitiesService.openToast('Create Successfully', 'CREATE');
      }
      return response.data;
    }).catch((error: any) => {
      return error;
    })
  }

  async getAll(): Promise<any> {
    return this.apiService.get(this.url).then((response: any) => {
      return response.data;
    }).catch((error: any) => {
      return error;
    })
  }

  async update(id: string | number, data: any) {
    return this.apiService.put(`${this.url}/${id}`, data).then((response: any) => {
      if(response.status === "Success") {
        this.utilitiesService.openToast('Edit Successfully', 'UPDATE');
      }
      return response.data;
    }).catch((error: any) => {
      return error;
    });
  }
}