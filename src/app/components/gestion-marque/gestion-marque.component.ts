import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Confirm } from 'notiflix';
import { GenericService } from 'src/app/services/generic.service';
import { marqueRoute } from 'src/app/utils/constante';
import { Categorie, Marque } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-gestion-marque',
  templateUrl: './gestion-marque.component.html',
  styleUrls: ['./gestion-marque.component.scss']
})
export class GestionMarqueComponent implements OnInit{
  public allCategories: Marque[] = [];
  public categorie!: Marque;

  updateForm!: FormGroup;
  addForm!: FormGroup;

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal!: ElementRef;

  constructor(private fb: FormBuilder, private genericService: GenericService) {
    this.addForm = this.fb.group({
      libelle: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    });

    this.updateForm = this.fb.group({
      libelle: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    });

  }
  ngOnInit(): void {
    this.onLoadAll();
  }

  clearInput(form: any) {
    form.reset();
  }

  onAdd() {
    if (this.addForm.get('libelle')?.value == '') {
      this.genericService.notify('failure', 'Veuillez renseigner tout les champs')
    } else {
      this.genericService.add(marqueRoute, this.addForm.value).then(
        (res) => {
          console.log(res);

          this.genericService.notify('success', 'Marque ajouter avec succées')
          this.addForm.reset();
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
    this.genericService.getAll(marqueRoute).then(
      (res) => {
        this.allCategories = res
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  onGetItemToUpdate(id: string) {
    this.genericService.getById(marqueRoute, id).then(
      (res) => {
        this.categorie = res;

        this.updateForm.patchValue({
          libelle: this.categorie.libelle,
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
      this.genericService.update(marqueRoute, id, this.updateForm.value).then(
        (res) => {
          this.genericService.notify('success', 'Marque modifier avec succées')
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


  onDelete(id: string) {
    Confirm.show(
      'Supprimer Marque',
      'Voulez vous suprimmer cette Marque',
      'Oui',
      'Non',
      () => {
        this.genericService.delete(marqueRoute, id).then(
          () => {
            this.genericService.notify('success', 'Marque supprimer avec succées')
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
