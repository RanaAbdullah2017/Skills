import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase , AngularFireList}  from 'angularfire2/database' ;
import {Observable} from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-allskills',
  templateUrl: './allskills.component.html',
  styleUrls: ['./allskills.component.css']
})
export class AllskillsComponent implements OnInit {

  itemKey:string='';
  itemList:AngularFireList<any>;
  itemArray=[];


  data={
    name:'',
    phone:'',
    comments:'',
    skill: '',
    province:'',
    price: ''
  
  
  }
  constructor(public db:AngularFireDatabase,public router:Router) {
    this.itemList=db.list('skills')
    this.itemList.snapshotChanges().subscribe(actions=> {
      actions.forEach(action=>{
        let y=action.payload.toJSON()
        y['$key']=action.key
        this.itemArray.push(y as ListItemClass)
        
      })
      console.log(this.itemArray)
    })
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
      price : this.data.price
    })

    
    this.itemArray=[];
  }
  onDelete($key){
    console.log($key);
    this.itemList.remove($key);
    this.itemArray = []
  }
  moreInfo(key)
  {
    console.log(key);
    this.router.navigate(['details/' + key])
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
}
