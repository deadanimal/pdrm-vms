import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
//import environment from 'src/environments'

/* Tambah baseURL dalam environment */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authObtainTokenURL: string = ''
  
  public userEmail: string = null
  public userUsername: string = null
  public userID: string = null
  public userType: string = null

  public retrievedToken: Object
  public retrievedTokenAccess: string
  public retrievedTokenRefresh: string

  constructor(
    private http: HttpClient
  ) { }

  createHeader() {
    if (this.retrievedTokenAccess){
      let headers = new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Authorization': 'Bearer ' + this.retrievedTokenAccess
        }
      )
      return headers
    }
    else {
      let headers = new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      )
      return headers
    }
  }

  private handleError(error: any) {
    console.log('error', error);
    return throwError(error);
  }

  retrieveToken(credentials: Form): Observable<any> {
    let headers = this.createHeader()
    let jwtHelper: JwtHelperService = new JwtHelperService()
    return this.http.post<any>(this.authObtainTokenURL, credentials, {headers: headers}).pipe(
      tap((res) => {
        this.retrievedToken = res
        this.retrievedTokenRefresh = res.refresh
        this.retrievedTokenAccess = res.access

        let decodedToken = jwtHelper.decodeToken(this.retrievedTokenAccess)
        this.userEmail = decodedToken.email
        this.userUsername = decodedToken.username
        this.userID = decodedToken.user_id
        this.userType = decodedToken.user_type
        //console.log('Decoded token: ', decodedToken)
        //console.log('Post response: ', res)
        //console.log('Retrieved token refresh', this.retrievedTokenRefresh)
        //console.log('Retrieved token access', this.retrievedTokenAccess)
        //console.log('Retrieved token: ', this.retrievedToken)
        //console.log('Email: ', this.email)
        //console.log('Username: ', this.username)
        //console.log('User ID: ', this.userID)
        //console.log('User type: ', this.userType)
        //this.isLoginSuccessful = true
        //this.retrieveSelfInformation(this.userID)
      }),
      catchError(this.handleError)
    )
  }

}
