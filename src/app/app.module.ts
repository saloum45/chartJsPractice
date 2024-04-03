import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { GestionUserComponent } from './components/gestion-user/gestion-user.component';
import { GestionCategorieComponent } from './components/gestion-categorie/gestion-categorie.component';
import { GestionMarqueComponent } from './components/gestion-marque/gestion-marque.component';
import { GestionProduitComponent } from './components/gestion-produit/gestion-produit.component';
import { NavigationComponent } from './components/layouts/navigation/navigation.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { SidebarComponent } from './components/layouts/sidebar/sidebar.component';
import { GenericService } from './services/generic.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GestionUserComponent,
    GestionCategorieComponent,
    GestionMarqueComponent,
    GestionProduitComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [GenericService],
  bootstrap: [AppComponent]
})
export class AppModule { }
