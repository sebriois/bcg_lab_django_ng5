import {UserModel} from "../users/user.model";

export class MemberModel {
  id: string;
  user: UserModel;
}

export class TeamModel {
  id: number;
  name: string;
  fullname: string;
  shortname: string;
  is_active: boolean;
  members: MemberModel[]
}
