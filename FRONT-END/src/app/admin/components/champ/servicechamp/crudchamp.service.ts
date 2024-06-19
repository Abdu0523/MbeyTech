import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudchampService {

  fullUrl ='http://localhost:3000/api/champs';
  champactUrl ='http://localhost:3000/api/champactions';


  constructor(private http: HttpClient) { }
  //Methode Http
  post(gert: any) {
    return this.http.post(this.fullUrl+'/create', gert);
  }
  getbase($url:any){
    return this.http.get($url+'/getAll');
  }
  putbase($url:any,gert: any, id:any) {
    return this.http.put($url+'/'+id, gert);
  }
  deletebase($url:any,$id:any) {
    return this.http.delete($url+'/' +$id);
  }

  postaction(gert: any) {
    gert.status='En attente';
    return this.http.post(this.champactUrl+'/create', gert);
  }
  getaction() {
   return  this.getbase(this.champactUrl);
  }
  putaction(gert: any, id:any) {
   return this.putbase(this.champactUrl,gert,id);
  }

  put(gert: any, id:any) {
   return this.putbase(this.fullUrl, gert,id);
  }

  delete($id:any) {
   return this.deletebase(this.fullUrl,$id);
  }
  deleteaction($id:any) {
    return this.deletebase(this.champactUrl,$id);
  }
  get() {
    return this.getbase(this.fullUrl);
  }

  getById($id:any) {
    return this.http.get(this.fullUrl+'/' +$id);
  }
  getBystatut($statut:any) {
    return this.http.get(this.fullUrl+'/statut/' +$statut);
  }
}
