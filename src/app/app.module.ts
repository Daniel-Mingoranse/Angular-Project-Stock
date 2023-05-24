import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root/root.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBhN8CaCFElgAIE238E_LCeWtGyLyQxMSU",
    authDomain: "angular-project-3558c.firebaseapp.com",
    projectId: "angular-project-3558c",
    storageBucket: "angular-project-3558c.appspot.com",
    messagingSenderId: "240526118246",
    appId: "1:240526118246:web:6c4b0e1547c5917b940ca7",
    measurementId: "G-6HS4Z489ME"
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  declarations: [RootComponent],
  bootstrap: [RootComponent],
  providers: [AuthService]
})
export class AppModule {}
