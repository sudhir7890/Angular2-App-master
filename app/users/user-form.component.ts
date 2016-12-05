import {Component, OnInit} from '@angular/core';
import {ControlGroup, FormBuilder, Validators} from '@angular/common';
import {EmailValidator} from '../shared/emailvalidator';
import {Router,CanDeactivate, RouteParams} from '@angular/router-deprecated';
import {UserService} from './user.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {User} from './user';

@Component({
    templateUrl:'app/users/user.html',
    providers:[UserService, HTTP_PROVIDERS]
})
export class UserFormComponent implements CanDeactivate, OnInit{
    userForm:ControlGroup;
    user = new User();
    pageTitle:string = 'Add User';

    constructor(fb:FormBuilder, private _router:Router, 
        private _userService:UserService, private _routeParams:RouteParams){
        
        var addressGroup = fb.group({
            street:[''],
            suite:[''],
            city:[''],
            zipcode:['']
        });

        this.userForm = fb.group({
            name:['',Validators.required],
            email:['',Validators.compose([Validators.required, EmailValidator.validateEmail])],
            phone:[''],
            address: addressGroup
        })
    }

    saveUser(){
        console.log(this.userForm.value);
        if(this._routeParams.get("id") == null){
            this._userService.createUser(this.userForm.value).subscribe(res => {
                console.log(res);
                //this.userForm.markAsPristine()
                this._router.navigate(['Users']);
            });
        }else{
            this._userService.updateUser(this.user).subscribe(res => {
                console.log(res);
                this._router.navigate(['Users']);
            })
        }
    }

    routerCanDeactivate(next, prev){
        if(this.userForm.dirty){
            return confirm("You have unsaved changes, Do you want to navigate away ?");
        }
    }

    ngOnInit(){
        var id = this._routeParams.get("id");
        console.log(id);
        if (id){
            this.pageTitle = 'Edit User';
            this._userService.getUserById(id).subscribe(user =>{
                console.log(user);
                this.user = user;
            },error =>{
                if(error.status === 404){
                    this._router.navigate(['NotFound']);
                }
            })
        }
    }
}