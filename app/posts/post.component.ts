import {Component, OnInit} from '@angular/core';
import {PostService} from './post.service';
import {UserService} from '../users/user.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {SpinnerComponent} from '../shared/spinner.component';
import {CommentComponent} from '../shared/comment.component';
import {PaginationComponent} from '../shared/pagination.component';

@Component({
    template:`
        <h1>Posts</h1>
        <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">{{textToDisplay}}
            <span class="caret"></span></button>
            <ul class="dropdown-menu">
                <li>
                    <a (click)="populatePosts(null)">Show All</a>
                </li>
                <li *ngFor="let user of users">
                    <a (click)="populatePosts(user)">{{user.name}}</a>
                </li>
            </ul>
        </div><br/>
        <paginator [totalCount]="posts?.length" [pageSize]="pageSize" (pageChanged)="handlePageChange($event)"></paginator>
        <spinner [visible]="posts == null"></spinner>
        <div class="row">
            <div class="col-md-6 col-lg-6">
                <ul *ngFor=" let post of postsToDisplay" class="list-group posts">
                    <li class="list-group-item" [class.active]="currentSelectedPost == post" (click)="showDetail(post)">{{post.title}}</li>
                </ul>
            </div>
            <div class="col-md-6 col-lg-6" *ngIf="currentSelectedPost != null">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">{{currentSelectedPost.title}}</h3>
                    </div>
                    <div class="panel-body">
                        {{currentSelectedPost.body}}
                    </div>
                </div>
                <spinner [visible]="comments == null"></spinner>
                <div *ngFor=" let comment of comments">
                    <comments 
                        [imgSrc]="comment.imgSrc"
                        [title]="comment.name" [description]="comment.body">
                    </comments>
                    <br/>
                </div>
            </div>
        </div>

    `,
    styles:[`
        .posts li{
            cursor:default;
        }
        .posts li:hover{
            background:#ecf0f1;
            color:black;
        }
        .list-­group-­item.active,.list-­group-­item.active:hover,.list-­group-­item.active:focus{
            background­‐color:#ecf0f1;
            border-­color:#ecf0f1;
            color:#2c3e50;
        }    
    `],
    providers:[PostService, UserService, HTTP_PROVIDERS],
    directives:[SpinnerComponent, CommentComponent, PaginationComponent]
})
export class PostComponent implements OnInit{
    posts = null;
    currentSelectedPost =null;
    comments = null;
    users = null;
    textToDisplay = "Select a User";
    postsToDisplay = new Array();
    pageSize = 5;

    constructor(private _postService:PostService, private _userService:UserService){

    }

    ngOnInit(){ 
        this._getAllPosts();
        this._userService.getUsers().subscribe(users =>{
            this.users = users;
        });        
    }

    handlePageChange(event){
        console.log(event.requestedPageNumber);
        this.postsToDisplay = new Array();
        var startIndex = (event.requestedPageNumber - 1) * this.pageSize;
        this.postsToDisplay = _.take(_.rest(this.posts,startIndex),this.pageSize);
    }

    private _getAllPosts(){
      this._postService.getPosts().subscribe(res =>{
            this.posts = res;
            this._populateFirstPage()
     });
    }

    private _populateFirstPage(){
        this.postsToDisplay = new Array();
        this.postsToDisplay = _.take(this.posts, this.pageSize);
    }

    showDetail(post){
        this.comments = null;
        this.currentSelectedPost = post;
        this._postService.getComments(this.currentSelectedPost.id).subscribe(comments =>{
            this.comments = comments;
            this.comments.forEach(element => {
                element.imgSrc="http://lorempixel.com/80/80/people?random="+element.id;
            });
        })
    }

    populatePosts(user){
        this.posts = null;
        this.currentSelectedPost = null;
        this.comments = null;
        if(user == null){
            this.textToDisplay = 'Select a User';
            this._getAllPosts();
        }else{
            this.textToDisplay = user.name;
            this._postService.getPostsForaUser(user.id).subscribe(posts =>{
                this.posts = posts;
                this._populateFirstPage()
            });
        }
    }
}