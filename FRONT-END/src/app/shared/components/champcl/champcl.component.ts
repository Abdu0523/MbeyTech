import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudchampService } from '../../../admin/components/champ/servicechamp/crudchamp.service';

declare var $:any;

@Component({
  selector: 'app-champcl',
  templateUrl: './champcl.component.html',
  styleUrl: './champcl.component.css'
})
export class ChampclComponent {
  public champs:any=[];
  public addchampForm!:FormGroup ;
  currentindex:any;
  afficheadd:any='ok';
  affichedetail:any;
  typechamp=['Location','Vente'];
  statut=['Activer','Desactiver'];

  constructor(private formBuilder: FormBuilder,private crud:CrudchampService){}

  ngOnInit(): void {
    this.getlistchamp();
    this.initaddchampForm();
  }
  getlistchamp(){
    this.champs=[];
    this.crud.getBystatut(this.statut[0]).subscribe((data:any)=>{
      this.champs=data;
    });
  }
  
  initaddchampForm() {
    this.affichedetail=undefined;
    this.addchampForm = this.formBuilder.group({
      date_debut:[''],
      date_fin:[''],
      prenom:['',Validators.required],
      nom:['',Validators.required],
      telephone:['',Validators.required]
    });  
  }
  add(){
    this.addchampForm.value.champ=this.champs[this.currentindex]._id;
    this.crud.postaction(this.addchampForm.value).subscribe({
      next:(data:any)=>{
        //this.champs.splice(this.currentindex, 1);
        this.modalaction('clchamp');
      },
      error:(error)=>{
          alert("Erreur lors de l'ajout");
      }
    });
  }
  action($name:any,$val?:any){
    this.affichedetail=undefined;
    this.currentindex=undefined;
    if($name=='detail'){
      this.currentindex=$val;
      this.affichedetail='ok';
      this.modalaction('okk');
    }
  }
  modalaction($name?:any){
    if($name=='clchamp'){
      $('#confirmation').modal('toggle');
    }
    if($name=='clchamp2'){
      $('#confirmation').modal('hide');
    }
  }
  clchamp(){
    this.modalaction('clchamp2');
    this.initaddchampForm();
  } 
    

}
