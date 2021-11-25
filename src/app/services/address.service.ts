import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  url = {
    state: 'states',
    township: 'townships'
  };

  constructor(
    private apiService: ApiService,
    private utilitiesService: UtilitiesService
  ) { }
  
  /**
   * [State]
   * Create Address State
   * @param newRequest 
   * @returns 
   */
  async createState(newRequest: any) {
    return this.apiService.post(this.url.state, newRequest).then((response: any) => {
      if(response.status === "Success") {
        this.utilitiesService.openToast('Create Successfully', 'CREATE');
      }
      return response.data;
    }).catch((error: any) => {
      return error;
    })
  }

  /**
   * [State]
   * Get All Address State
   * @returns 
   */
  async getAllState(): Promise<any> {
    return this.apiService.get(this.url.state).then((response: any) => {
      return response.data;
    }).catch((error: any) => {
      return error;
    })
  }

  /**
   * [State]
   * Update Address State
   * @param id 
   * @param data 
   * @returns 
   */
  async updateState(id: string | number, data: any) {
    return this.apiService.put(`${this.url.state}/${id}`, data).then((response: any) => {
      if(response.status === "Success") {
        this.utilitiesService.openToast('Edit Successfully', 'UPDATE');
      }
      return response.data;
    }).catch((error: any) => {
      return error;
    });
  }

  /**
   * [Township]
   * Update Address Township
   * @param id 
   * @param data 
   * @returns 
   */
   async updateTownship(id: string | number, data: any) {
    return this.apiService.put(`${this.url.township}/${id}`, data).then((response: any) => {
      if(response.status === "Success") {
        this.utilitiesService.openToast('Edit Successfully', 'UPDATE');
      }
      return response.data;
    }).catch((error: any) => {
      return error;
    });
  }

  /**
   * [Township]
   * Create Address Township
   * @param newRequest 
   * @returns 
   */
   async createTownship(newRequest: any) {
    return this.apiService.post(this.url.township, newRequest).then((response: any) => {
      if(response.status === "Success") {
        this.utilitiesService.openToast('Create Successfully', 'CREATE');
      }
      return response.data;
    }).catch((error: any) => {
      return error;
    })
  }

  /**
   * [Township]
   * Get All Address Township
   * @returns 
   */
  async getAllTownship(): Promise<any> {
    return this.apiService.get(this.url.township).then((response: any) => {
      return response.data;
    }).catch((error: any) => {
      return error;
    })
  }
  
}
