import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from '../../security/authentication.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

/**
 * Component for manage login
 */
@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent {
    username: string = "";
    password: string = "";
    remember: boolean = false;
    showError: boolean = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ){ }

    closeError = function(){
        this.showError = null;
    }

    /**
     * Login action
     */
    login() {
        let md5pass = Md5.hashStr(this.password).toString();

        this.authenticationService.login(this.username, md5pass, this.remember).subscribe(result => {
            if (result == true) {
                this.router.navigate(['/']);
            } else {
                // show login error
                if (this.showError) {
                    this.closeError();
                    setTimeout(()=>{
                        this.showError = true; 
                }, 100);
                } else {
                    this.showError = true; 
                }
            }
        });
    }
}