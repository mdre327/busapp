// Import Libraries
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Md5 } from "ts-md5/dist/md5";
import { MatDialog } from "@angular/material";

// Security
import { SecurityService } from '../services/security.service';
import { AuthenticationService } from '../authentication.service';
import { ModalChangePasswordComponent } from '../../components/modal-change-password.component';

// Services
import { UserService } from '../../services/user.service';
import { User } from '../../domain/locations_db/user';

/**
 * Edit my profile
 */
@Component({
    selector: 'profile',
    templateUrl : './profile.component.html',
})
export class ProfileComponent implements OnInit {

    user: User;

    constructor(
        private userService: UserService, 
        private authenticationService:AuthenticationService,
        private router:Router,
        private route:ActivatedRoute,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe( params => {
            // Get logged user
            this.authenticationService.getUser().subscribe((user:User) => {
               this.user = user;
            });
        })
    }
    
    /**
     * Save User
     */
    save(valid:boolean): void{
        if (valid)
            this.userService.update(this.user).subscribe(data => this.router.navigateByUrl('/home'));
    }

    /**
     * Open change password modal
     */
    openModal(id: string): void {
        let dialogRef = this.dialog.open(ModalChangePasswordComponent, {
            data: {}
        });
    }

}