import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  sidebarItems = [
    { id: 1, title: "Tableau de bord", link: "/", icon: "bi bi-grid" },
    { id: 2, title: "Gestion des utilisateurs", link: "/utilisateur", icon: "bi bi-person" },
    { id: 3, title: "Gestion des categories", link: "/categorie", icon: "bi bi-person" },
    { id: 4, title: "Gestion des marques", link: "/marque", icon: "bi bi-menu-button-wide" },
    { id: 5, title: "Gestion des produis", link: "/produit", icon: "bi bi-menu-button-wide" }
  ];


}
