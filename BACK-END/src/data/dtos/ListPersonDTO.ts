import { IPersonne } from "../interfaces/IPersonne";


export class ListPersonneDTO implements IPersonne {
  constructor(
    public prenom: string,
    public nom: string,
    public email: string,
    public countryCode: string,
    public phone: string,
    public adresse: string,
    public statut: string,
    public password: string,
    public createdAt: Date,
    public updatedAt: Date
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

  getStatut(): string {
    return this.statut;
  }

  setStatut(statut: string): void {
    this.statut = statut;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  // Méthodes supplémentaires (facultatives)
  toString(): string {
    return `Personne: ${this.prenom} ${this.nom}, Email: ${this.email}`;
  }

  estActif(): boolean {
    return this.statut === 'actif';
  }
}
