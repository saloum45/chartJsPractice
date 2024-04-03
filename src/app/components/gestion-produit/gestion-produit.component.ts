import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Confirm } from 'notiflix';
import { GenericService } from 'src/app/services/generic.service';
import { categorieRoute, marqueRoute, produitRoute } from 'src/app/utils/constante';
import { Categorie, Marque, Produit } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-gestion-produit',
  templateUrl: './gestion-produit.component.html',
  styleUrls: ['./gestion-produit.component.scss']
})
export class GestionProduitComponent {
  public allProduit: Produit[] = [];
  public allCategories: Categorie[] = [];
  public allMarque: Marque[] = [];
  public produit!: Produit;

  updateForm!: FormGroup;
  addForm!: FormGroup;

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal!: ElementRef;
  @ViewChild('closeAddExpenseModalUpdate') closeAddExpenseModalUpdate!: ElementRef;

  constructor(private fb: FormBuilder, private genericService: GenericService) {
    this.addForm = this.fb.group({
      libelle: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      quantite: this.fb.control(null, [Validators.required, Validators.min(1)]),
      categorie: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      marque: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    });

    this.updateForm = this.fb.group({
      libelle: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      quantite: this.fb.control(null, [Validators.required, Validators.min(1)]),
      categorie: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      marque: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    });

  }
  ngOnInit(): void {
    this.onLoadAll();
    this.onLoadAllCategorie();
    this.onLoadAllMarque();
  }

  clearInput(form: any) {
    form.reset();
  }

  onAdd() {
    if (this.addForm.get('libelle')?.value == '') {
      this.genericService.notify('failure', 'Veuillez renseigner tout les champs')
    } else {
      this.genericService.add(produitRoute, this.addForm.value).then(
        () => {
          this.genericService.notify('success', 'Produit ajouter avec succées')
          this.addForm.reset();
          this.closeAddExpenseModal.nativeElement.click();
          this.onLoadAll();
        }
      ).catch(
        (err) => {
          console.log(err);
        }
      );
    }
  }

  onLoadAll() {
    this.genericService.getAll(produitRoute).then(
      (res) => {
        this.allProduit = res
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  onLoadAllCategorie() {
    this.genericService.getAll(categorieRoute).then(
      (res) => {
        this.allCategories = res
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  onLoadAllMarque() {
    this.genericService.getAll(marqueRoute).then(
      (res) => {
        this.allMarque = res
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  onGetItemToUpdate(id: string) {
    this.genericService.getById(produitRoute, id).then(
      (res) => {
        this.produit = res;

        this.updateForm.patchValue({
          libelle: this.produit.libelle,
          quantite: this.produit.quantite,
          categorie: this.produit.categorie,
          marque: this.produit.marque,
        });
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  onUpdate(id: string) {
    if (this.updateForm.get('libelle')?.value == '') {
      this.genericService.notify('failure', 'Veuillez renseigner tout les champs')
    } else {
      this.genericService.update(produitRoute, id, this.updateForm.value).then(
        (res) => {
          this.genericService.notify('success', 'Produit modifier avec succées')
          this.closeAddExpenseModalUpdate.nativeElement.click();
          this.onLoadAll();
        }
      ).catch(
        (err) => {
          console.log(err);
        }
      );
    }

  }


  onDelete(id: string) {
    Confirm.show(
      'Supprimer Produit',
      'Voulez vous suprimmer cette Produit',
      'Oui',
      'Non',
      () => {
        this.genericService.delete(produitRoute, id).then(
          () => {
            this.genericService.notify('success', 'Produit supprimer avec succées')
            this.onLoadAll();
          }
        ).catch(
          (err) => {
            console.log(err);
          }
        )
      },
      () => {
        //ne rien afficher s'il ne souhaite pas supprimer
      },
      {
      },
    );

  }
}
