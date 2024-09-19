import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'; // Firebase con soporte para compatibilidad

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log('Usuario autenticado:', user);
      } else {
        console.log('No hay ningún usuario autenticado');
      }
    }, error => {
      console.error('Error en la autenticación:', error);
    });
  }
  

  // Método para iniciar sesión con Google
  loginWithGoogle() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  // Obtener el estado del usuario autenticado
  getAuthState() {
    return this.afAuth.authState;
  }

  // Obtener la información del usuario autenticado
  getUserInfo() {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        const email = user.email;
        const displayName = user.displayName;
  
        const [firstName, lastName] = displayName?.split(' ') || ['', ''];
  
        const userInfo = {
          email: email,
          firstName: firstName,
          lastName: lastName
        };
  
        console.log('Información del usuario:', userInfo);
  
        return userInfo;
      } else {
        console.log('No hay información de usuario disponible');
        return null;
      }
    }).catch(error => {
      console.error('Error al obtener la información del usuario:', error);
      return null;
    });
  }
  

  // Método para cerrar sesión
  logout() {
    return this.afAuth.signOut();
  }
}
