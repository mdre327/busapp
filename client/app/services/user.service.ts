// DEPENDENCIES
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

// SECURITY
import { AuthenticationService } from '../security/authentication.service';

// CONFIG
import { config } from "../../config/properties";

// MODEL
import { UserBaseService } from "./base/user.base.service";
import { User } from '../domain/locations_db/user';

/**
 * YOU CAN OVERRIDE HERE UserBaseService
 */

@Injectable()
export class UserService extends UserBaseService {
    
    // CONSTRUCTOR
    constructor(http: Http, authenticationService: AuthenticationService) {
            super(http, authenticationService);
    }
    
    /**
     * Change user password
     */
    changePassword(id: string, passwordNew:string, passwordAdmin:string): Observable<void> {
        return this.http
            .post(this.contextUrl + '/' + id + '/changePassword' , {
                passwordNew: passwordNew, 
                passwordAdmin: passwordAdmin 
            })
            .map(response => response.json());
    }
}