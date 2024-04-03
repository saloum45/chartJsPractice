import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericService } from 'src/app/services/generic.service';
import { userRoute } from 'src/app/utils/constante';
import { User } from 'src/app/utils/interfaces';

import { Confirm } from 'notiflix/build/notiflix-confirm-aio';

@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.scss']
})
export class GestionUserComponent implements OnInit {
  public allUsers: User[] = [];
  public user!: User;

  updateForm!: FormGroup;
  addForm!: FormGroup;

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal!: ElementRef;

  constructor(private fb: FormBuilder, private genericService: GenericService) {
    this.addForm = this.fb.group({
      nom: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      prenom: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      age: this.fb.control(null, [Validators.required, Validators.min(1)]),
    });

    this.updateForm = this.fb.group({
      nom: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      prenom: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      age: this.fb.control(null, [Validators.required, Validators.minLength(1)]),
    });

  }
  ngOnInit(): void {
    this.onLoadAllUser();
  }

  clearInput(form: any) {
    form.reset();
  }

  onAddUser() {
    console.log(this.addForm.get('nom'));
    if (this.addForm.get('nom')?.value == '' || this.addForm.get('prenom')?.value == '' || this.addForm.get('age')?.value == null) {
      this.genericService.notify('failure', 'Veuillez renseigner tout les champs')
    } else {
      this.genericService.add(userRoute, this.addForm.value).then(
        () => {
          this.genericService.notify('success', 'Utilisateur ajouter avec succées')
          this.addForm.reset();
          this.onLoadAllUser();
        }
      ).catch(
        (err) => {
          console.log(err);
        }
      );
    }
  }

  onLoadAllUser() {
    this.genericService.getAll(userRoute).then(
      (res) => {
        this.allUsers = res
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  onGetUserToUpdate(id: string) {
    this.genericService.getById(userRoute, id).then(
      (res) => {
        this.user = res;

        this.updateForm.patchValue({
          nom: this.user.nom,
          prenom: this.user.prenom,
          age: this.user.age
        });
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  onUpdateUser(id: string) {
    if (this.updateForm.get('nom')?.value == '' || this.updateForm.get('prenom')?.value == '' || this.updateForm.get('age')?.value == null) {
      this.genericService.notify('failure', 'Veuillez renseigner tout les champs')
    } else {
      this.genericService.update(userRoute, id, this.updateForm.value).then(
        (res) => {
          this.genericService.notify('success', 'Utilisateur modifier avec succées')
          this.closeAddExpenseModal.nativeElement.click();
          this.onLoadAllUser();
        }
      ).catch(
        (err) => {
          console.log(err);
        }
      );
    }

  }


  onDeleteUser(id: string) {
    Confirm.show(
      'Supprimer utilisateur',
      'Voulez vous suprimmer l\'utilisateur',
      'Oui',
      'Non',
      () => {
        this.genericService.delete(userRoute, id).then(
          () => {
            this.genericService.notify('success', 'Utilisateur supprimer avec succées')
            this.onLoadAllUser();
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
