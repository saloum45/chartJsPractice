export interface User {
  "id": string,
  "nom": string,
  "prenom": string,
  "age": number,
}

export interface Categorie {
  "id": string,
  "libelle": string,
}

export interface Marque {
  "id": string,
  "libelle": string,
}

export interface Produit {
  "id": string,
  "libelle": string,
  "quantite": number,
  "categorie": string,
  "marque": string,
}
