import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { GenericService } from 'src/app/services/generic.service';
import {
  categorieRoute,
  marqueRoute,
  produitRoute,
  userRoute,
} from 'src/app/utils/constante';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public barChart: any;
  public circleChart: any;
  public produits: any[] = [];
  public categories: any;
  public marques: any;
  public users: any;
  public test: any[] = [];
  public testNumber: any[] = [1];
  public productCountByCategory: any[] = [120, 19, 3, 5, 2, 3];

  constructor(private service: GenericService) {}

  ngOnInit(): void {
    // this.loadAllCategorie();
    this.loadAllMarque();
    // this.loadAllProduct();
    this.loadAllUser();
    this.createBarChart();
    this.createCircleChart();
    // un peu de retouche pour que les tableaux produits et categories soient disponible lors du charment de la page afin que la courbe soit initialisé
    this.service
      .getAll(categorieRoute)
      .then((res) => {
        this.categories = res;
        // retrait des categories pour mettre à jour la courbe
        console.log(this.categories);
        this.categories.forEach((element: any, index: any) => {
          this.test.push(element.libelle);
        });
        // mise à jour de la courbe
        this.barChart.update();
        this.service
        .getAll(produitRoute)
        .then((res) =>{
          (this.produits = res)
          this.calculateProductCountByCategory();
        })
        .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }


  createBarChart() {
    this.barChart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.test,//le tableau test contient les catégories
        datasets: [
          {
            label: '# of Votes',
            data: this.productCountByCategory, //le tableau productCountByCategory contient le nombre de produit de chaque categorie et ça se base sur l'index des éléments du tableau exemple si la catégorie maison se trouve à lindex 0 du tableau test, donc son nombre de produit se trouvera sur l'index 0 du tableau productCountByCategory
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }

  createCircleChart() {
    this.circleChart = new Chart('MyChart', {
      type: 'pie', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ['Red', 'Pink', 'Green', 'Yellow', 'Orange', 'Blue'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [300, 240, 100, 432, 253, 34],
            backgroundColor: [
              'red',
              'pink',
              'green',
              'yellow',
              'orange',
              'blue',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  loadAllProduct() {
    this.service
      .getAll(produitRoute)
      .then((res) => (this.produits = res))
      .catch((err) => console.log(err));
  }

  loadAllMarque() {
    this.service
      .getAll(marqueRoute)
      .then((res) => (this.marques = res))
      .catch((err) => console.log(err));
  }

  loadAllCategorie() {
    this.service
      .getAll(categorieRoute)
      .then((res) => {
        this.categories = res;
        // retrait des categories pour mettre à jour la courbe
        console.log(this.categories);
        this.categories.forEach((element: any, index: any) => {
          this.test.push(element.libelle);
        });
        // mise à jour de la courbe
        this.barChart.update();
      })
      .catch((err) => console.log(err));
  }

  loadAllUser() {
    this.service
      .getAll(userRoute)
      .then((res) => (this.users = res))
      .catch((err) => console.log(err));
  }


  // calcul nombre produit par categorie
  calculateProductCountByCategory(): void {
    this.categories.forEach((category: any, index: any) => {
      let categoryId = category.id;
      this.productCountByCategory[index] = this.produits.filter((produit: any) => produit.categorie == categoryId).length;
    });
    // mise à jour de la courbe
    this.barChart.update();
    console.warn(this.productCountByCategory, 'je veu');
  }
}
