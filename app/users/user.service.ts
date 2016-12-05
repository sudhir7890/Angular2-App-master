import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService{
    private _url = "http://jsonplaceholder.typicode.com/users";

    constructor(private _http:Http){

    }

    getUsers(){
        return this._http.get(this._url)
            .map(result => result.json());
    }

    createUser(user){
       return this._http.post(this._url, JSON.stringify(user))
            .map(result => result.json());
    }

    updateUser(user){
        return this._http.put(this._getUrl(user.id),JSON.stringify(user)).map(result => result.json);
    }

    deleteUser(id){
        return this._http.delete(this._getUrl(id)).map(res => res.json());
    }

    getUserById(id){
        return this._http.get(this._getUrl(id))
            .map(result => result.json());
    }

    private _getUrl(id){
        return this._url+"/"+id;
    }
}