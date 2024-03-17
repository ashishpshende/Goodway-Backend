// user.model.ts
import { Request, Response } from 'express';
import BaseModel from './BaseModel';

class User extends BaseModel {
        public name!: string;
        public userName!: string;
        public prefix!: string;
        public phoneNumber!: string;
        public city!: string;        
        public password!: string;
        public userRole!: string;       
        public email!: string;        
        public userStatus!: string;
        constructor(requestJSON:any)
        {
          super(requestJSON);  
          this.name = requestJSON["name"];
          this.prefix = requestJSON["prefix"];
          this.userName = requestJSON["userName"];
          this.phoneNumber =  requestJSON["phoneNumber"];
          this.password =  requestJSON["password"];
          this.city =  requestJSON["city"];
          this.userRole =   requestJSON["userRole"];
          this.email =   requestJSON["email"];        
          this.userStatus =   requestJSON["userStatus"];        

        }


}

export default User;
