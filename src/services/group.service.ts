import { AuthService } from 'src/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backend_url } from '../configs/config';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getGroupMembers() {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.token
    });
    return this.http.get(backend_url + '/mylarm/all-group-member', { headers })
      .pipe(res => {
        return res;
      });
  }

  addGroupMember(member) {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.token
    });
    return this.http.post(backend_url + '/mylarm/add-group-member', member, { headers })
      .pipe(res => {
        return res;
      });
  }

  removeGroupMember(member) {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.token
    });
    return this.http.post(backend_url + '/mylarm/remove-group-member', member, { headers })
      .pipe(res => {
        return res;
      });
  }

}
