import { AuthenticationService } from '../security/authentication.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { config } from "../../config/properties";
import 'rxjs/add/operator/map';

/**
 * This class intercept route change and check for security
 */
@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private http: Http,
        private authenticationService: AuthenticationService
    ){ }

    /**
     * Check route permission
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> {

        let that = this;

        // Get authorized roles for route
        let roles:Array<string> = [];
        for (let i in route.data) {
            roles.push(route.data[i]);
        }

        return new Observable<boolean>((ob:any ) => {

            // Get logged user
            this.authenticationService.getUser().subscribe(user => {
                if (!user) {
                    // Not logged
                    ob.next(false);
                    that.router.navigate(['/login']);
                } else {
                    // Check roles
                    if(roles && roles.length > 0) {
                        if(user.hasRole(roles)) {
                            ob.next(true);
                        } else {
                            // Not authorized
                            ob.next(false);
                            that.router.navigate(['/login']);
                        }
                    }
                    ob.next(true);
                }       
            })
        });
    }
}