import { Request, Response } from 'express';

class BaseModel {
    public id!: string;
    public name!: string;
    public createdOn!: string;
    public updatedOn!: string;
    public createdBy: BaseModel | null;
    public updatedBy: BaseModel | null;
    constructor(requestJSON:any)
    {
        this.id = (requestJSON['id']) ? requestJSON['id'] : '';
        this.name = (requestJSON['name']) ? requestJSON['name'] : '';
        this.createdOn = (requestJSON['createdOn']) ? requestJSON['createdOn'] : '';
        this.updatedOn = (requestJSON['updatedOn']) ? requestJSON['updatedOn'] : '';
        this.createdBy = (requestJSON['createdBy']) ? new BaseModel(requestJSON['createdBy']) :null ;
        this.updatedBy = (requestJSON['updatedBy']) ? new BaseModel(requestJSON['updatedBy']) : null ;
    }
}

export default BaseModel;