import { UserBase } from './base/user.base';
/**
 * YOU CAN OVERRIDE HERE UserBase.ts
 */
export class User extends UserBase {
    
    // Insert here your custom attributes and function
    
    
    // Functions for User
    
    public token: string;
    
    constructor(
        _id?: string,
        username?: string,
        token?: string,
        roles?: string[]
    ){
        super();
        this._id = _id;
        this.username = username;
        this.token = token;
        this.roles = roles;
    }

    // UTILS FUNCTIONS

    /**
     * Check if logged user is admin 
     */
    isAdmin():boolean {
        if (!this.roles)
            return false;
        
        return this.roles.indexOf("ADMIN") == 0;
    }

    /**
     * Check if logged user has one role 
     */
    hasRole(role:string | Array<string>):boolean {
        if (!this.roles) return false;

        if (typeof role == "string") {
            return (this.roles.indexOf(role) != -1);
        } else {
            let found = role.filter(rol => {
                return (this.roles.indexOf(rol) != -1);
            })
            return found.length > 0;
        }
    }
    
}