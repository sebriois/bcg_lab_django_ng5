import {UserModel} from "../users/user.model";

export class ProviderModel {
    id: number;
    name: string;
    direct_reception?: boolean;
    is_local?: boolean;
    is_service?: boolean;
    notes?: string;
    reseller?: number;
    users_in_charge?: UserModel[];
}
export class ResellerModel {
  id: number;
  name: string;
}
