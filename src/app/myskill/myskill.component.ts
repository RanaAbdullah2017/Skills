import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase , AngularFireList}  from 'angularfire2/database' ;
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-myskill',
  templateUrl: './myskill.component.html',
  styleUrls: ['./myskill.component.css']
})
export class MyskillComponent implements OnInit {

  itemKey:string='';
  itemList:AngularFireList<any>;
  itemArray=[];


  data={
    name:'',
    phone:'',
    comments:'',
    skill: '',
    province:'',
    price: '',
    email: '',
    uid:'',
  }

  myUid:any;
  constructor(public db:AngularFireDatabase) {
    this.itemList=db.list('skills')
    this.itemList.snapshotChanges().subscribe(actions=> {
      actions.forEach(action=>{
        let y=action.payload.toJSON()
        y['$key']=action.key
        this.itemArray.push(y as ListItemClass)
        
      })
      // console.log(this.itemArray)
    })
    this.myUid=localStorage.getItem('uid');
   }

  ngOnInit() {
  }
  editForm($key){
    
    for(let value of this.itemArray)
    {
      if (value['$key'] == $key){
        this.itemKey=$key;
        console.log("EditForm " + $key);
        this.data.name=value['name'];
        this.data.phone=value['phone'];
        this.data.comments=value['comments'];
        this.data.skill=value['skill'];
        this.data.province=value['province'];
        this.data.price=value['price'];
        this.data.email=value['email'];
      }
     
    }


  }
onEdit( $key ){
    
    for(let value of this.itemArray)
    {
      if (value['$key'] == $key){
        console.log(value['$key']);
      }
    }
    
    
    this.itemList.set(this.itemKey , {
      name  : this.data.name,
      phone : this.data.phone,
      comments : this.data.comments,
      skill : this.data.skill,
      province : this.data.province,
      price : this.data.price,
      email: this.data.email,
      uid: this.myUid

    })

    
    this.itemArray=[];
  }
  onDelete($key){
    console.log($key);
    this.itemList.remove($key);
    this.itemArray = []
  }
 
}

export class ListItemClass{
  $key:string;
  name:string;
  phone:string;
  comments:string;
  skill: string;
  province:string;
  price : string;
  email: string;
  uid:string;
}