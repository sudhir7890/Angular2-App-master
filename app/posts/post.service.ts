import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class PostService{
    private _url:string="http://jsonplaceholder.typicode.com/posts";


    constructor(private _http:Http){

    }

    getPosts(){
        return this._http.get(this._url)
            .map(result => result.json())
    }

    getComments(id){
        return this._http.get(this._url+"/"+id+"/comments")
                   .map(result => result.json());
    }

    getPostsForaUser(id){
        return this._http.get(this._url+"?userId="+id)
                    .map(result => result.json());
    }
}