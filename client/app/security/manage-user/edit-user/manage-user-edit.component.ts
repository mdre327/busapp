// Import Libraries
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalChangePasswordComponent } from '../../../components/modal-change-password.component';
import { Md5 } from 'ts-md5/dist/md5';
import { MatDialog } from "@angular/material";

// Security
import { AuthenticationService } from '../../authentication.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../domain/locations_db/user';

declare var jQuery:any;

/**
 * Edit user by Admin
 */
@Component({
    selector: 'manage-user-edit',
    templateUrl : './manage-user-edit.component.html',
})
export class ManageUserEditComponent implements OnInit {

    user: User;
    passwordNew:string;
    passwordNewConfirm:string;
    passwordAdmin:string;
    showError:boolean = false;

    constructor(
        private userService: UserService, 
        private authenticationService:AuthenticationService,
        private router:Router,
        private route:ActivatedRoute,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {

        this.route.params.subscribe( params => {

            if (params.id == "new") {
                // New User
                this.user = new User(null, null, null, []);
            } else {
                // Get User
                this.userService.get(params.id).subscribe(user => this.user = user);
            }
        })
    }
    
    /**
     * Save or create User
     */
    save(): void {
        if (this.user._id) {
            // Save
            this.userService.update(this.user).subscribe(data => this.router.navigateByUrl('/manage-users'));
        } else {
            // Create
            this.user.password = Md5.hashStr(this.user.password).toString();
            this.userService.create(this.user).subscribe(data => this.router.navigateByUrl('/manage-users'));
        }
    }
    
    /**
     * Delete user
     */
    deleteUser(): void {
        this.userService.remove(this.user._id).subscribe(data => this.router.navigateByUrl('/manage-users'));
    }

    //Manage Roles
   addRole(role:any): void {
        if(role.value){
            if (!this.user.roles) this.user.roles = [];
            this.user.roles.push(role.value);
            role.value = "";
        }
    }

    removeRole(index:number) {
        this.user.roles.splice(index, 1);
    }

    /**
     * Change user password
     */
    changePassword() {
        var passwordNew =  Md5.hashStr(this.passwordNew).toString();
        var passwordAdmin = Md5.hashStr(this.passwordAdmin).toString();

        this.userService.changePassword(this.user._id, passwordNew, passwordAdmin ).subscribe(data => {
            this.passwordAdmin = null;
            this.passwordNew = null;
            this.passwordNewConfirm = null;
            this.showError = false;
        }, err => {
            this.showError = true;
        })
    };

    /**
     * Open modal change password
     */
    openModal(id: string): void {
        let dialogRef = this.dialog.open(ModalChangePasswordComponent, {
            data: { id}
        });
    }

    trackByFn(index:number, item:any) {
        return index;
    }
}