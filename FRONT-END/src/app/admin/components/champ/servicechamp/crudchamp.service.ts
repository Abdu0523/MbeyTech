import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudchampService {

  fullUrl ='http://localhost:3000/api/champs';
 


  constructor(private http: HttpClient) { }
  //Methode Http
  post(gert: any) {
    return this.http.post(this.fullUrl+'/create', gert);
  }

  put(gert: any, id:any) {
    return this.http.put(this.fullUrl+'/'+id, gert);
  }

  delete($id:any) {
    return this.http.delete(this.fullUrl+'/' +$id);
  }
  get() {
    return this.http.get(this.fullUrl+'/getAll');
  }
  getById($id:any) {
    return this.http.get(this.fullUrl+'/' +$id);
  }
}
