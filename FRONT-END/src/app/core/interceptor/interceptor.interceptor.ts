import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  // Récupérer le jeton du localStorage
  const token = localStorage.getItem('token');
  
  // Vérifier si le jeton existe
  if (token) {
    // Cloner la requête et ajouter l'en-tête Authorization avec le jeton
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    // Passer la requête clonée au prochain gestionnaire
    return next(clonedReq);
  } else {
    // Si aucun jeton, passer la requête originale au prochain gestionnaire
    return next(req);
  }
};
