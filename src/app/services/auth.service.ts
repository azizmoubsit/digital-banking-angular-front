import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  roles: string[] = [];
  username!: string;
  accessToken!: string;

  constructor(private http: HttpClient) {}

  public login(username: string, password: string) {
    let params = new HttpParams()
      .set('username', username)
      .set('password', password);
    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };
    return this.http.post('http://localhost:8085/auth/login', params, options);
  }

  loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data.accessToken;
    const jwtDecoded: any = jwtDecode(this.accessToken);
    this.username = jwtDecoded.sub;
    this.roles = jwtDecoded.scope;
  }
}