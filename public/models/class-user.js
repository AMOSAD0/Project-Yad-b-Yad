
export class user {
  id;
  name;
  role;
  isActive;
  email;
  password;

  constructor(id, name, role, isActive, email, password) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.isActive = isActive;
    this.email = email;
    this.password = password;
  }
}
