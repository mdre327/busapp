import { TokenEmitter } from '../security/token-emitter';
import { User } from '../domain/locations_db/user';
import { AuthenticationService } from '../security/authentication.service';
import { Component } from '@angular/core';

/**
 * Top navbar component
 */
@Component({
    selector: "navbar",
    templateUrl: "./navbar.component.html",
})
export class NavbarComponent{
    user: User;

    constructor(
        private authenticationService: AuthenticationService, private tokenEmitter: TokenEmitter) {
            
            // Get user
            this.refreshUser();

            // Update user on login/logout
            tokenEmitter.emitter.on("refreshToken", () => {this.refreshUser()});
        }

    /**
     * Refresh user in component navbar
     */
    refreshUser(){

        // Get user from Authentication Serice
        this.authenticationService.getUser().subscribe((user:User) => {
            this.user = user;
        });
    }

    /**
     * Logout action
     */
    logout(e:Event) {
        e.preventDefault();
        this.authenticationService.logout();
    }
}