import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {RouterLink} from '@angular/router-deprecated';
import {SpinnerComponent} from '../shared/spinner.component';

@Component({
    template:`
        <h1>Users</h1>
        <a [routerLink]="['NewUser']" class="btn btn-primary" role="button">Add User</a><br/><br/>
        <spinner [visible]="users == null"></spinner>
        <div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                <tr *ngFor=" let user of users">
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td><i class="glyphicon glyphicon-edit" [routerLink]="['EditUser',{id:user.id}]"></i></td>
                    <td><i class="glyphicon glyphicon-remove" (click)="delete(user)"></i></td>
                </tr>
                </tbody>
        </table>
     </div>
    `,
    styles:[`
        .glyphicon{
            cursor:pointer;
        }
    `],
    providers:[UserService, HTTP_PROVIDERS],
    directives:[RouterLink, SpinnerComponent]
})
export class UserListComponent implements OnInit{
    users = null;

    constructor(private _userService:UserService){

    }

    delete(user){
        console.log(user);
        var response = confirm("Do you want to delete ?");
        if(response === true){
            //first remove the user from the list
            var index = this.users.indexOf(user);
            this.users.splice(index, 1);
            this._userService.deleteUser(user.id).subscribe(res =>{
                console.log(res);
            },error =>{
                console.log(error);
                this.users.splice(index,0,user);
            });
        }
    }

    ngOnInit(){
        this._userService.getUsers().subscribe(result =>{
            this.users = result;
            console.log(this.users);
        });
    }

}