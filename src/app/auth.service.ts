import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn;

  constructor() {
    this.isLoggedIn = undefined;
  }

  isAuthenticated(): boolean {
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn');
    return this.isLoggedIn === 'true';
  }}
