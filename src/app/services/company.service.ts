import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private utilitiesService: UtilitiesService,
    private apiService: ApiService
  ) { }

  public createCompany(company_name:string){
    const request = {
      company_name:company_name
    }
    this.apiService.post('company',request).then((response:any) =>{
      if(response.data){
        return console.log(response.data);
      }
    });
  }
  public getCompany(){
    this.apiService.get('company').then((response:any) =>{
      console.log(response.data)
    });
  }
}
