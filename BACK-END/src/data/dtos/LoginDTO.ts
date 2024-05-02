import { IPersonne } from "../interfaces/IPersonne";


export class LoginDTO {
  constructor(
    public email: string,
     public password: string,

  ) {}

  // Getters et setters pour toutes les propriétés

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string): void {
    this.password = password;
  }


}
