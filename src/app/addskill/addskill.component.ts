import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase , AngularFireList}  from 'angularfire2/database' ;
import {Observable} from 'rxjs/Observable';
import { AngularFireAction } from 'angularfire2/database/interfaces';
import { Router } from '@angular/router';
import { MyskillComponent } from '../myskill/myskill.component';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.component.html',
  styleUrls: ['./addskill.component.css']
})
export class AddskillComponent implements OnInit {

  
data={
  name:'',
  phone:'',
  comments:'',
  skill: '',
  province:'',
  price: ''


}
items: Observable<any[]>;
itemList: AngularFireList<any>;
email:string='';
uid:any;
  constructor(public fire:AngularFireAuth,public db:AngularFireDatabase , public router:Router) { 
    this.itemList=db.list('skills');
    let user=localStorage.getItem('email');
    this.email=user;

    console.log("Email for User====" +  user);
this.uid=localStorage.getItem('uid');

    // this.fire.authState.subscribe(auth=>{
    //   if(auth){
    //     this.uid=auth.uid;
    //     console.log("Email for uid====" +  this.uid);
    //   }
    // })
  }

  ngOnInit() {
    console.log(this.data.name);
  }

  insertSkill()
  {
    this.itemList.push ({
      name:this.data.name,
      phone:this.data.phone,
      comments:this.data.comments,
      skill: this.data.skill,
      province:this.data.province,
      price: this.data.price,
      email: this.email ,
      uid:this.uid


    })
    this.reset();
    this.router.navigate(['/myskill']);
  }
  reset()
  {
    this.data.name='';
    this.data.comments='';
    this.data.phone='';
    this.data.price='';
    this.data.province='';
    this.data.skill='';
  }
}
