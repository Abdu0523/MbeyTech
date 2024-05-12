export class CategorieDTO {
  constructor(
    public nom: string,
    // public description: string,
    public image: string,

  ) {}

  // Getters et setters pour toutes les propriétés

  getNom(): string {
    return this.nom;
  }

  setNom(nom: string): void {
    this.nom = nom;
  }

  getImage(): string {
    return this.image;
  }

  setImage(image: string): void {
    this.image = image;
  }

}
