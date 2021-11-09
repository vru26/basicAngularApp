import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  users;
  selectedUser;
  uid: number;
  userForm: FormGroup;
  editBool: boolean;
  error: string;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.users = [];
    this.selectedUser = {};
    this.error = '';
    this.userForm = formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.minLength(8)],
      confPassword: ['', Validators.minLength(8)]
    });
    this.editBool = false;
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  async fetchUsers() {
    const URL = 'http://localhost:5000/users';
    try {
      const response = await this.http.get(URL, {observe: 'response'}).toPromise();
      if (response.status === 200) {
        this.users = response.body;
      }
    }
    catch (err) {
      console.log('err', err)
    }
  }

  async onDelete() {
    const URL = 'http://localhost:5000/user/delete/' + this.uid;
    try {
      const response = await this.http.delete(URL, {observe: 'response'}).toPromise();
      if (response.status === 200) {
        this.users = response.body;
      }
    } catch (err) {
      console.log(err);
    }
  }

  userDetails(userId: number) {
    this.selectedUser = this.users.filter(user => user.id === userId)[0];
  }

  onEdit(userId: number) {
    const user = this.users.filter(user => user.id === userId)[0];
    this.userForm.get('confPassword').setValue(user.password);
    this.userForm.patchValue(user);
    this.editBool = true;
    this.userForm.get('email').disable({ onlySelf: true });
    this.uid = userId;
  }

  resetForm() {
    this.userForm.reset();
    this.editBool = false;
    this.userForm.get('email').enable({ onlySelf: true });
  }

  async handleData() {
    const URL = this.editBool ? `http://localhost:5000/user/edit/${this.uid}` : 'http://localhost:5000/user/add';
    if (this.userForm.valid && this.userForm.value.password === this.userForm.value.confPassword) {
      try {
        const response = this.editBool ? await this.http.put(URL, this.userForm.value, { observe: 'response' }).toPromise() : await this.http.post(URL, this.userForm.value, { observe: 'response' }).toPromise();
        if (response.status === 201) {
          this.users = response.body;
        }
      } catch (err) {
        console.log(err);
        this.error = err.error.message;
      }
    } else {
      this.error = 'Password & confirm password do not match.';
    }
  }
}
