import { HttpInterceptorFn } from '@angular/common/http';

export const setHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  if(typeof localStorage !== 'undefined'){
     req = req.clone
      ({
        setHeaders : {
          token : localStorage.getItem('authToken') || ''
        }
  })
  }
  return next(req);
};
