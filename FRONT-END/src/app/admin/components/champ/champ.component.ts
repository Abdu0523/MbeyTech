import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudchampService } from './servicechamp/crudchamp.service';

declare var $:any;

@Component({
  selector: 'app-champ',
  templateUrl: './champ.component.html',
  styleUrl: './champ.component.css'
})
export class ChampComponent implements OnInit {
  public champs:any=[];
  public addchampForm!:FormGroup ;
  currentindex:any;
  afficheadd:any='ok';
  afficheupdate:any;
  currentname:string='Ajouter un nouveau champ';
  typechamp=['Location','Vente'];
  statut=['Activer','Desactiver'];
  constructor(private formBuilder: FormBuilder,private crud:CrudchampService){}

  ngOnInit(): void {
    this.getlistchamp();
    this.initaddchampForm();
  }
  getlistchamp(){
    this.champs=[];
    this.crud.get().subscribe((data:any)=>{
      this.champs=data;
    });
  }
  
  initaddchampForm($name?:any) {
    this.addchampForm = this.formBuilder.group({
      surface:[$name?.surface,Validators.required],
      description:[$name?.description,Validators.required],
      geolocalisation:[$name?.geolocalisation,Validators.required],
      prix:[$name?.prix,Validators.required],
      type:[$name?.type,Validators.required],
      statut:[$name?.statut,Validators.required]
    });  
    if(!$name){
      this.modalaction();
    }
  }
  add(){
    this.crud.post(this.addchampForm.value).subscribe({
      next:(data:any)=>{
        this.champs.unshift(data);
        this.action('ok');
      },
      error:(error)=>{
          alert("Erreur lors de l'ajout");
      }
    });
  }
  action($name:any,$val?:any){
    this.afficheadd=undefined;
    this.afficheupdate=undefined;
    this.currentindex=undefined;
    if($name=='add'){
      this.afficheadd='ok';
      this.currentname='Ajouter un nouveau champ';
      this.modalaction('okk');
    }
    if($name=='update'){
      this.currentname='Modifier un champ';
      this.currentindex=$val;
      this.afficheupdate='ok';
      this.initaddchampForm(this.champs[this.currentindex]);
      this.modalaction('okk');
    }
    if($name=='delete'){
      this.currentindex=$val;
      this.modalaction('delete');
    }
    if($name=='ok'){
      this.initaddchampForm();
      this.modalaction();
    }
  }
  update(){
    this.crud.put(this.addchampForm.value,this.champs[this.currentindex]._id).subscribe({
      next:(data:any)=>{
        this.champs[this.currentindex]=data;
        this.action('ok');
      },
      error:(error)=>{
        alert("Erreur au niveau de la modification");
      }
    });
  }
  modalaction($name?:any){
    if(!$name){
      $('#add-champ').modal('hide');
    }
    if($name && $name!='delete' && $name!='delete2'){
      $('#add-champ').modal('toggle');
    }
    if($name=='delete'){
      $('#delete-champ').modal('toggle');
    }
    if($name=='delete2'){
      $('#delete-champ').modal('hide');
    }
  }
  delete(){
    this.crud.delete(this.champs[this.currentindex]._id).subscribe({
      next:(data:any)=>{
        this.champs.splice(this.currentindex, 1);
        this.modalaction('delete2');
      },
      error:(error)=>{
        alert("Erreur au niveau de la suppression");
      }
    });
    
  }
 

}
