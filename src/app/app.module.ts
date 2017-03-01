import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SecretSantaApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { EventListPage } from '../pages/event-list/event-list';
import { EventCreatePage } from '../pages/event-create/event-create';

import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../providers/auth-service';

export const firebaseConfig = {
  // Inclua as informações que você copiou do console do Firebase.
};

let pages = [
  SecretSantaApp,
  HomePage,
  LoginPage,
  EventCreatePage,
  EventListPage
];

export function declarations() {
  return pages;
}

export function entryComponents() {
  return pages;
}

export function providers() {
  return [
    AuthService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ];
}

@NgModule({
  declarations: declarations(),
  imports: [
    IonicModule.forRoot(SecretSantaApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule {}
