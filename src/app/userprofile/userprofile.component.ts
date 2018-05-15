import { Component, OnInit } from '@angular/core';
// import { emit } from 'cluster';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { AngularFireStorage, AngularFireStorageReference,AngularFireUploadTask } from 'angularfire2/storage';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
 
  data={
    name:'',
    phone:'',
    age:'',
    address: '',
    city:'',
    job: '',
    email:'',
    image:''
  }

  email:string='';
  myId:string='';
  itemList: AngularFireList<any>
itemArray = []
userKey:any

/////////Upload File/////
ref: AngularFireStorageReference;
task: AngularFireUploadTask;
downloadURL: Observable<string>;
imageURL:string;

  constructor(private afStorage:AngularFireStorage, public db:AngularFireDatabase ) { 
    this.email=localStorage.getItem('email');
    this.myId=localStorage.getItem('uid');

    this.itemList = db.list('users')

    this.itemList.snapshotChanges()
    .subscribe(actions=>{
          actions.forEach(action=>{
            let y = action.payload.toJSON()
            y["$key"] = action.key
           
           if (action.payload.child('uid').val() == this.myId ) {
             this.userKey=action.key
              this.itemArray.push(y as ListItemClass)
              this.data.name = this.itemArray[0]['name'] 
              this.data.phone = this.itemArray[0]['phone'] 
              this.data.age = this.itemArray[0]['age'] 
              this.data.city = this.itemArray[0]['city'] 
              this.data.address = this.itemArray[0]['address'] 
              this.data.job = this.itemArray[0]['job'] 
              this.data.email = this.itemArray[0]['email']
              this.data.image = this.itemArray[0]['image']
              console.log(" this.myId  =" +  this.myId )
              console.log(" this.userKey  =" +  this.userKey )
            }
  
          })
       })
  }

  ngOnInit() {
    console.log(this.email);
    console.log(this.myId);
  }
  
  upload(event)
  {
    const id=Math.random().toString(36).substring(2);/////يتمتغيير اسم الصورة بتوليد اسم عشوائي لتجنب حدوث الكونفلكت لإحتمال رفع صورتان بنفس الإسم
    this.ref=this.afStorage.ref(id);//// يعمل ريفرنس للستورج وتحديد مكانها في الستورج
    this.task=this.ref.put(event.target.files[0]);////بعدها يتم التخزين في الستورج اي رفع الصورة
    this.downloadURL=this.task.downloadURL();
    this.downloadURL.subscribe(url => {
      
      if (url)
      {
        console.log(url);
        this.imageURL=url;
      }
      console.log(this.imageURL);

      this.itemList.set(this.userKey , {
        name : this.data.name  ,
        phone :  this.data.phone ,
        age : this.data.age ,
        address :  this.data.address ,
        city :  this.data.city ,
        job :  this.data.job , 
        email:this.email,
        uid:this.myId,
        image: this.imageURL
      })

    })
      console.log("id ==" + id);
      console.log("ref ==" + this.ref);
      console.log("downloadURL ==" + this.downloadURL);

  }


  onEdit(){
    this.itemList.set(this.userKey , {
      name : this.data.name  ,
      phone :  this.data.phone ,
      age : this.data.age ,
      address :  this.data.address ,
      city :  this.data.city ,
      job :  this.data.job , 
      email:this.email,
      uid:this.myId,
      image: this.imageURL
    })
  }
}

export class ListItemClass{
  $key: string;
  name : string;
  phone :  string;
  age :  number;
  address :  string;
  city : string;
  job :  string;
  email: string;
  uid:string;
  image:string
}