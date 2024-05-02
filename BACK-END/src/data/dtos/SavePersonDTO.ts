import { IPersonne } from "../interfaces/IPersonne";


export class SavePersonDTO {
  constructor(
    public prenom: string,
    public nom: string,
    public email: string,
    public countryCode: string,
    public phone: string,
    public adresse: string,
     public password: string,

  ) {}

  // Getters et setters pour toutes les propriétés
  getPrenom(): string {
    return this.prenom;
  }

  setPrenom(prenom: string): void {
    this.prenom = prenom;
  }

  getNom(): string {
    return this.nom;
  }

  setNom(nom: string): void {
    this.nom = nom;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getCountryCode(): string {
    return this.countryCode;
  }

  setCountryCode(countryCode: string): void {
    this.countryCode = countryCode;
  }

  getPhone(): string {
    return this.phone;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  getAdresse(): string {
    return this.adresse;
  }

  setAdresse(adresse: string): void {
    this.adresse = adresse;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string): void {
    this.password = password;
  }
  // Méthodes supplémentaires (facultatives)
  toString(): string {
    return `Personne: ${this.prenom} ${this.nom}, Email: ${this.email}`;
  }

}
