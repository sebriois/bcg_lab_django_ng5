export class PermissionModel {
  name: string;
  codename: string;
}

export class GroupModel {
  name: string;
  permissions: PermissionModel[];
}

export class UserModel {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
  is_active: boolean;
  last_login: Date;
  date_joined: Date;
  groups: GroupModel[];

}
