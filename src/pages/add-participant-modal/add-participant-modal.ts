import { Component } from '@angular/core';
import { Events, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase'
import { FirebaseListObservable } from 'angularfire2/database';
import { User } from 'api/models/app-models';

@Component({
  selector: 'page-add-participant-modal',
  templateUrl: 'add-participant-modal.html'
})
export class AddParticipantModalPage {
  isUserListVisible: boolean;
  users: FirebaseListObservable<User[]>;
  usersCount: number;
  userList: User[];
  loadedUserList: User[];
  eventAttendees: FirebaseListObservable<any>;

  constructor(
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public firebaseProvider: FirebaseProvider
  ) {
    this.isUserListVisible = false;
    this.eventAttendees = firebaseProvider.getList(`/eventAttendees/${this.navParams.get('eventId')}`);
    this.users = firebaseProvider.query('/users', {
      query: {
        orderByChild: 'name'
      }
    });

    this.users.subscribe(snapshots => {
      let events = [];
      snapshots.forEach(snapshot => {
        events.push(snapshot);
      });

      this.loadedUserList = this.userList = events;
      this.usersCount = events.length;
    });
  }

  addParticipant(user):void {
    this.eventAttendees.update(user.$key, {
      name: user.name,
      gift: user.gift,
      picture: user.picture
    }).then(_ => {
      this.isUserListVisible = false;
    });
  }

  removeParticipant(user): void {
    let message = `Você acaba de remover "${user.name}" do seu Amigo Secreto com sucesso.`;

    this.eventAttendees.remove(user).then(_ => {
      this.events.publish('message:show', message, 'success');
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  getUsers(ev: any) {
    this.initializeUsers();
    let q = ev.target.value;

    if (!q) return;

    this.userList = this.userList.filter((v) => {
      if (v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  initializeUsers(): void {
    this.userList = this.loadedUserList;
  }

  userListDisplay(state): void {
    this.isUserListVisible = state;
  }

}
