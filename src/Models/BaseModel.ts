import { Request, Response } from 'express';

class BaseModel {
    public id!: string;
    public createdOn!: string;
    public updatedOn!: string;
    public createdBy: BaseModel | null;
    public updatedBy: BaseModel | null;
    constructor(requestJSON:any)
    {
        this.id = (requestJSON['id']) ? requestJSON['id'] : '';
        this.createdOn = (requestJSON['createdOn']) ? requestJSON['createdOn'] : '';
        this.updatedOn = (requestJSON['updatedOn']) ? requestJSON['updatedOn'] : '';
        this.createdBy = (requestJSON['createdBy']) ? requestJSON['createdBy'] : null ;
        this.updatedBy = (requestJSON['updatedBy']) ? requestJSON['updatedBy'] : null ;
    }
}

export default BaseModel;