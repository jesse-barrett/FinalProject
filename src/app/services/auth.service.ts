import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async register({ email, password }) {
    try {
      const user = createUserWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async login({ email, password }) {
    try {
      const user = signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  logOut() {
    return signOut(this.auth);
  }
}
