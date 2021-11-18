import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UtilitiesService } from './utilities.service';

const httpErrMessages = {
  UNAUTHORIZED : 'Unauthorized! Invalid access token. Please login again.',
  CONNECTION_ERROR: 'Connection Error! Please check your internet connection.'
};

@Injectable({ providedIn: 'root'})
export class ApiService {

  constructor(
    private http: HttpClient,
    private utitlitesService: UtilitiesService
  ) { }

  private httpErrorHandler(status: number) {
    if(status === 0) {
      return this.utitlitesService.openToast(httpErrMessages.CONNECTION_ERROR);
    }

    if(status === 401) {
      return this.utitlitesService.openToast(httpErrMessages.UNAUTHORIZED);
    }

    return;
  }

  async get(url: string, options?: any): Promise<any> {
    return this.http.get(`${environment.apiUrl}/${url}`, options).toPromise().then((respone: any) => {
      return respone;
    }).catch((error: any) => {
      return this.httpErrorHandler(error.status);
    });
  }

  async post(url: string, body: any): Promise<any> {
    return this.http.post(`${environment.apiUrl}/${url}`, body).toPromise().then((response: any) => {
      return response;
    }).catch((error: any) => {
      return this.httpErrorHandler(error.status);
    });
  }

  put(url: string, options?: any): Promise<any> {
    return this.http.put(`${environment.apiUrl}/${url}`, options).toPromise();
  }

  delete(url: string, options?: any): Promise<any> {
    return this.http.delete(`${environment.apiUrl}/${url}`, options).toPromise();
  }
}
