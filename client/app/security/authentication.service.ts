// Import Libraries
import { TokenEmitter } from './token-emitter';
import { RequestOptions } from 'http';
import { TokenInterceptor } from './token-interceptor';
import { Router } from '@angular/router';
import { map } from 'rxjs/operator/map';
import { Injectable, Injector } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { config } from '../../config/properties';
import 'rxjs/add/operator/map';

// Security
import { SecurityService } from './services/security.service';
import { UserService } from './../services/user.service';
import { User } from './../domain/locations_db/user';

/**
 * This class manage the security
 */
@Injectable()
export class AuthenticationService {
    currentUser: any;
    allow: Observable<{}>;

    constructor(
        private router: Router,
        private tokenEmitter: TokenEmitter,
        private securityService: SecurityService
    ) {}

    /**
     * Get logged user
     */
    public getUser(): Observable<User> {
        
        return new Observable<User>((ob:any ) => {

            // Get JWT token from browser storage
            let token = sessionStorage.getItem("token") || localStorage.getItem("token");

            if(token && this.currentUser) {
                // if logged
                ob.next(this.currentUser);
            }
            else if(token && !this.currentUser) {
                // if refresh page and have token
                // Verify token
                this.verifyToken(token, function(data:any) {
                    ob.next(data);
                });
            } else {
                ob.next(this.currentUser);
            }
        });
    }

    /**
     * Set logged user
     */
    public setUser(user: User): void {
        let userObj = new User(null, null, null, null);
        Object.assign(userObj, user);
        this.currentUser = userObj;
    }

    /**
     * Verify JWT token
     */
    verifyToken(token: string, cb:any): any {
        this.securityService.verifyToken(token).subscribe((user: User) => {
            this.setUser(user);
            cb(this.currentUser);
        }, (err) => {
            this.setUser(null);
            cb()
        });
    }
   
    /**
     * Login action
     */
    login(username: string, password: string, remember:boolean): Observable<boolean> {

        return new Observable((ob:any ) => {
            
            this.securityService.login(username, password ).subscribe( (user: User) => {
                // store user in local storage to keep user logged in between page refreshes 
                if (remember) {
                    localStorage.setItem('token', user.token);
                } else {
                    sessionStorage.setItem('token', user.token);
                }
                
                this.setUser(user);
                this.tokenEmitter.emitter.emit("refreshToken");
                // return true to indicate successful login
                ob.next(true); 
            }, (err:any) => {
                //error login
                ob.next(false);
            });
        });

    }

    /**
     * Logout action
     */
    logout() {
        //clear token and remove user from local storage to log user logout
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        this.currentUser = null;
        this.tokenEmitter.emitter.emit("refreshToken");
        this.router.navigate(['/login']);
    }
}