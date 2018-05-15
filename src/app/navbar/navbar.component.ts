import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // user: Observable<firebase.User>;
  private isLoggedIn:Boolean=false;
  private email:String;

  constructor(public afAuth:AngularFireAuth,public router:Router) {

    let status=localStorage.getItem('isLoggedIn')
    console.log("status === " + status);

    if (status === 'true')
    {
      this.isLoggedIn=true;
      console.log("isLoggedIn === " + this.isLoggedIn);
    }else
    {
      this.isLoggedIn=false;
      console.log("isLoggedIn === " + this.isLoggedIn);
    }
    // this.user=afAuth.authState;
    // firebase.auth().onAuthStateChanged(function(user){
    //   if(user){
    //     this.isLoggIn=true;
    //   }
    //   else{
    //     this.isLoggIn=false;
    //     this.router.navigate(['/login']);
    //   }
    // })
   }

  ngOnInit() {
  }
  logout(){
    this.afAuth.auth.signOut();
    this.isLoggedIn=false;
    localStorage.setItem('isLoggedIn','false');
    this.router.navigate(['/login']);

  }

}
