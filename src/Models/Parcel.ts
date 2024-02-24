// user.model.ts
import { Request, Response } from "express";
import BaseModel from "./BaseModel";

class Parcel extends BaseModel {
  public quantity!: string;
  public receiver!: string;
  public parcelStatus!: string;
  public cnType!: string;
  public weight!: string;
  public amount!: string;
  public cnNo!: string;
  public mobile!: string;
  public parcelFrom!: string;
  public parcelTo!: string;
  public remarks!: string;
  public dealer!: string;
  constructor(requestJSON: any) {
    super(requestJSON);
    this.quantity = requestJSON["quantity"];
    this.receiver = requestJSON["receiver"];
    this.parcelStatus = requestJSON["parcelStatus"];
    this.cnType = requestJSON["cnType"];
    this.weight = requestJSON["weight"];
    this.amount = requestJSON["amount"];
    this.cnNo = requestJSON["cnNo"];
    this.mobile = requestJSON["mobile"];
    this.parcelFrom = requestJSON["parcelFrom"];
    this.parcelTo = requestJSON["parcelTo"];
    this.remarks = requestJSON["remarks"];
    this.dealer = requestJSON["dealer"];
  }
}

export default Parcel;
