
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { config } from "../../../config/properties";
import { User } from '../../domain/locations_db/user';
import 'rxjs/add/operator/map';

/**
 * THIS SERVICE MAKE HTTP REQUEST TO SERVER, FOR MANAGE SECURITY
 */
@Injectable()
export class SecurityService {

    contextUrl:string = config.host;
    constructor(private http: Http) { }
    
    /**
     * Verify JWT token
     */
    verifyToken(token:string): Observable<User> {
        return this.http.post(this.contextUrl + "/verifyToken", {token: token})
        .map(response => response.json() as User);
    }

    /**
     * Login by username and md5 password
     */
    login(username: string, password:string): Observable<User> {
        return this.http
            .post(this.contextUrl + "/login", { username: username, password: password } )
            .map(response => response.json() as User);
    }
    
    /**
     * Change password for logged user
     */
    changePassword(passwordNew:string, passwordOld:string): Observable<void> {
        return this.http
            .post(this.contextUrl + '/changePassword' , {
                passwordNew: passwordNew, 
                passwordOld: passwordOld 
            })
            .map(response => response.json())
    }
    
}