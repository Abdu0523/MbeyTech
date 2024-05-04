import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ajouter l'API key dans l'en-tête de chaque requête
    const apiKey = 'abd23AghQYJK8cP2aXKY4zR/YWGGZq8HsErTbfW1E7k=';
    request = request.clone({
      setHeaders: {
        'api-key': apiKey
      }
    });
    return next.handle(request);
  }
}
