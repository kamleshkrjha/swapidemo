import { Router } from '@angular/router';
import { ApiService } from './../_services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }
  username = '';
  password = '';

  onSubmit (): any {
    this.apiService.getCharacter(this.username)
    .subscribe((res) => {
      if (res.count) {
        const character = res.results[0];
        if (character.birth_year === this.password) {
          sessionStorage.setItem('currentChar', this.username);
          this.router.navigate(['/planets']);
        } else {
          alert ('Password incorrect!!');
        }
      } else {
        alert ('Incorrect response from server!!');
      }
    });
  }
  ngOnInit() {
    sessionStorage.removeItem('currentChar');
  }

}
