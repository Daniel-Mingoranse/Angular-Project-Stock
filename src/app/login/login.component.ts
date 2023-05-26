import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  SnapshotAction,
} from '@angular/fire/compat/database';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

export interface Item {
  key: string;
  email: string;
  name: string;
  cpf: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '' as string;
  password = '' as string;

  formNewName = '' as string;
  formNewCpf = '' as string;
  formNewEmail = '' as string;


  listRef: any;
  list: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  isPopupOpen = false;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(public auth: AuthService, private database: AngularFireDatabase) {
    this.listRef = database.list('list');
    /*this.list = this.listRef
      .snapshotChanges()
      .pipe(
        map((changes: SnapshotAction<Item>[]) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() })) 
        )
      );*/
     
  }

  ngOnInit() { }

  cadastrar() {
    this.listRef.push({
      name: this.formNewName,
      cpf: this.formNewCpf,
      email: this.formNewEmail,
    });
    this.formNewName = '';
    this.formNewCpf = '';
    this.formNewEmail = '';

    this.abrirPopup();
  }

  abrirPopup() {
    this.isPopupOpen = true;
  }

  fecharPopup() {
    this.isPopupOpen = false;
  }

  deleteItem(key: string) {
    this.listRef.remove(key);
  }

  visualizar() {
    this.listRef
      .snapshotChanges()
      .pipe(
        map((changes: SnapshotAction<Item>[]) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((items: Item[]) => {
        this.list.next(items);
      });
  }


}
