import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { switchMap } from 'rxjs';
import { ClientService } from './client.service';

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  if (req.headers.get('oidc-request') === 'true') {
    const clientService = inject(ClientService);
    return clientService.oidc$.pipe(
      switchMap(({ getTokens, params }) => {
        const modifiedReq = req.clone({
          url: `${params.issuerUri}${req.url}`,
          headers: req.headers
            .delete('oidc-request')
            .set('Authorization', `Bearer ${getTokens().accessToken}`)
            .set('Content-Type', 'application/json'),
        });
        return next(modifiedReq);
      }),
    );
  } else {
    return next(req);
  }
};
