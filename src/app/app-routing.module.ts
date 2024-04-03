import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GestionCategorieComponent } from './components/gestion-categorie/gestion-categorie.component';
import { GestionMarqueComponent } from './components/gestion-marque/gestion-marque.component';
import { GestionProduitComponent } from './components/gestion-produit/gestion-produit.component';
import { GestionUserComponent } from './components/gestion-user/gestion-user.component';
import { NavigationComponent } from './components/layouts/navigation/navigation.component';

const routes: Routes = [
  {
    path: '', component: NavigationComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'utilisateur', component: GestionUserComponent },
      { path: 'categorie', component: GestionCategorieComponent },
      { path: 'marque', component: GestionMarqueComponent },
      { path: 'produit', component: GestionProduitComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
