import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { SecondPage } from '../second/second';
import { ContactProvider } from './../../providers/contact/contact';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
contacts: Observable<any>;
  constructor(public nav: NavController, private provider: ContactProvider,
  private toast: ToastController) {

    this.contacts = this.provider.getAll();
  }

  openPushPage(){
    this.nav.push(SecondPage);
  }

  newContact() {
    this.nav.push('ContactPage');
  }

  editContact(contact: any){
    this.nav.push('ContactPage', {contact: contact});
  }

  removeContact(key: string){
    this.provider.remove(key)
      .then(() => {
        this.toast.create({ message: 'Contato removido com sucesso.', duration: 3000 }).present();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao remover contato.', duration: 3000 }).present();
      })

  }
}
