// user.model.ts
import { Request, Response } from 'express';
import BaseModel from './BaseModel';

class User extends BaseModel {
        public userName!: string;
        public phoneNumber!: string;
        public city!: string;        
        public password!: string;
        public userRole!: string;       
        public email!: string;        
        public userStatus!: string;
        constructor(requestJSON:any)
        {
          super(requestJSON);  
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
