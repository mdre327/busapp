import { TokenEmitter } from './token-emitter';
import { User } from './../domain/locations_db/user';
import { AuthenticationService } from './authentication.service';
import { BaseRequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

/**
 * This class set JWT token security header in each http request
 */
@Injectable()
export class TokenInterceptor extends BaseRequestOptions {

  headers: Headers;

  constructor(private tokenEmitter: TokenEmitter){
     super();
     this.refresh();
     let instance = this;

     // Register refreshToken event
     this.tokenEmitter.emitter.on("refreshToken", function(){
       instance.refresh()
     });
  }

  /**
   * Set JWT token from local storage to header
   */
  refresh() {

    // Get token from local or session storage
    let token = sessionStorage.getItem("token") || localStorage.getItem("token");
    
    // Set token header
    if (token) {
      this.headers = new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      });
    }
  }
  
}