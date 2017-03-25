import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from "api/models/app-models";
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { EventListPage } from '../../pages/event-list/event-list';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  account: User = {};
  submitted: boolean = false;
  users: FirebaseListObservable<User>;

  constructor(
    af: AngularFire,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    let fireData = navParams.get('auth');
    this.account = {
      'uid': fireData.uid,
      'name': fireData.facebook.displayName,
      'email': fireData.facebook.email,
      'picture': fireData.facebook.photoURL

    }
    this.users = af.database.list('/users');
  }

  onAccountCreate(form) {
    this.submitted = true;
    let accountData: User;

    if (form.valid) {
      accountData = this.account;

      this.users.push(accountData).then(res => {
        this.navCtrl.push(EventListPage);
      });
    }
  }

}
