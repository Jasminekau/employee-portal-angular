import { Component, OnInit, inject } from '@angular/core';
import { UsersService, User } from './users.service';
import { CommonService } from './common';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  selectedTab: string = 'home';

  public userForm: FormGroup;
  users: User[] = [];
  editMode: boolean = false;
  editUserId: string | number | null = null;

  private usersService = inject(UsersService);

  constructor(public fb: FormBuilder, private service: CommonService) {
    this.userForm = this.fb.group({
      Name: [''],
      Email: [''],
      Profession: [''],
      Age: [''],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
      console.log('Users loaded:', this.users);
    });
  }
  
  SubmitForm() {
    if (this.editMode && this.editUserId !== null) {
      // Update user
      const updatedUser = { ...this.userForm.value, id: this.editUserId };
      this.service.AddUpdateUsers(updatedUser).subscribe(data => {
        Swal.fire('Success', 'User updated successfully', 'success');
        this.userForm.reset();
        this.editMode = false;
        this.editUserId = null;
        this.loadUsers();
        console.log(data);
      });
    } else {
      // Add new user
      this.service.AddUpdateUsers(this.userForm.value).subscribe(data => {
        Swal.fire('Success', 'User added successfully', 'success');
        this.userForm.reset();
        this.loadUsers();
        console.log(data);
      });
    }
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  EditUser(user: User) {
    this.editMode = true;
    this.editUserId = user.id;
    this.userForm.patchValue({
      Name: user.Name,
      Email: user.Email,
      Profession: user.Profession,
      Age: user.Age,
    });
    this.selectTab('home');
  }

  CancelEdit() {
    this.editMode = false;
    this.editUserId = null;
    this.userForm.reset();
  }

  DeleteUserByID(ID: string | number){
    console.log('DeleteUserByID called with ID:', ID);
    this.service.DeleteUserByID(ID.toString()).subscribe({
      next: data => {
        Swal.fire('Deleted', 'User deleted successfully', 'success');
        this.loadUsers();
        console.log('Delete response:', data);
      },
      error: err => {
        console.error('Delete error:', err);
        Swal.fire('Error', 'Failed to delete user', 'error');
      }
    });
  }
}
