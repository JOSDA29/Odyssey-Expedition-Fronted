import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {
  private authStatusSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatusSubject.asObservable();

  constructor(private oauthService: OAuthService, private router: Router) {
    this.initLogin();
  }

  initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '1045420781443-ffksmd1a6cfcvlf3fdllrrfr11m8rkt4.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/',
      scope: 'openid profile email',
    }

    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    
    // Subscribe to OAuth events to update authentication status
    this.oauthService.events.subscribe(event => {
      if (event.type === 'token_received') {
        this.authStatusSubject.next(true);
        sessionStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/clientProfile']);
      }
    });
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
    sessionStorage.removeItem('isLoggedIn');
    this.authStatusSubject.next(false);
    this.router.navigate(['/']); // Redirige a la página de login después del logout
  }

  getProfile(): Promise<any> {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return Promise.reject(new Error('User not authenticated or claims not available'));
    }
    return Promise.resolve(claims);
  }

  isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }
}
