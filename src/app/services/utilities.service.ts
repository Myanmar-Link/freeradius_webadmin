import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const snackbarOption: MatSnackBarConfig = {
  verticalPosition: 'bottom',
  horizontalPosition: 'center',
  duration: 3000
}

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(
    private snackbarCtrl: MatSnackBar,
    private route: Router
  ) { }

  /**
   * Tost Notification;
   * @param message 
   * @param action 
   * @returns 
   */
  public openToast(message: string, action?: string) {
    return this.snackbarCtrl.open(message, action ? action : 'Dismiss', snackbarOption);
  }

  /**
   * AES Crypto Encryption;
   * @param data 
   * @returns 
   */
  public encrypt(data: any) {
    return CryptoJS.AES.encrypt(JSON.stringify(data).trim(), environment.enc_key.trim()).toString();
  }

  /**
   * AES Crypto Decryption;
   * @param data 
   * @returns 
   */
  public decrypt(data: any) {
    return CryptoJS.AES.decrypt( data,  environment.enc_key.trim() ).toString(CryptoJS.enc.Utf8);
  }

  /**
   * Generate Encryption Key;
   * @param message 
   * @returns 
   */
  public generateEncKey(message: string) {
    return CryptoJS.SHA256('mmlink_free_radius').toString().toLocaleUpperCase();
  }

}
