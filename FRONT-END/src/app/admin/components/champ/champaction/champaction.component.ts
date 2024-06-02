import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudchampService } from '../servicechamp/crudchamp.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-champaction',
  templateUrl: './champaction.component.html',
  styleUrl: './champaction.component.css'
})
export class ChampactionComponent {
  public champs:any=[];
  public addchampForm!:FormGroup ;
  currentindex:any;
  affichedetail:any;
  currenttype:any;
  typechamp=['Location','Vente'];
  constructor(private formBuilder: FormBuilder,private crud:CrudchampService,  private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currenttype = params.get('id');
      this.getlistchamp(this.currenttype);
    });
  }
  getlistchamp($type:any){
    this.champs=[];
    this.crud.getaction().subscribe((data:any)=>{
      this.champs=data;
      var mychamp:any=[];
      this.champs.filter((it:any) => {
        if(it.champ.type==$type){
          mychamp.push(it);
        }
      }); 
      this.champs=mychamp;
    });
  }
  
  initaddchampForm($name:any) {
    this.addchampForm = this.formBuilder.group({
      champ:[$name?.champ?._id],
      date_debut:[$name?.date_debut],
      date_fin:[$name?.date_fin],
      prenom:[$name?.prenom],
      nom:[$name?.nom],
      telephone:[$name?.telephone],
      status:[$name?.status]
    });  
    this.addchampForm.disable();
  }
  action($name:any,$val?:any,$statut?:any){
    this.affichedetail=undefined;
    this.currentindex=undefined;
    if($name=='update'){
      this.currentindex=$val;
      this.affichedetail='ok';
      this.champs[this.currentindex].status=$statut;
      this.initaddchampForm(this.champs[this.currentindex]);
      this.update();
    }
    if($name=='detail'){
      this.currentindex=$val;
      this.initaddchampForm(this.champs[this.currentindex]);
      this.affichedetail='ok';
    }

  }
  update(){
    this.crud.putaction(this.addchampForm.value,this.champs[this.currentindex]._id).subscribe({
      next:(data:any)=>{
        this.champs[this.currentindex]=data;
        this.affichedetail=undefined;
      },
      error:(error)=>{
        alert("Erreur au niveau de la modification");
      }
    });
  }


}
