import { Login } from "./login.model";

export interface Policy {
    PolicyId: number;
    PolicyName: string;
    LoginId: number;
    username: string;
    Insurer: string; 
  TPA: string; 
  PolicyPeriod: string; 
  }