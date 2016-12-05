import {Component, Input} from '@angular/core';

@Component({
    template:`
    <div class="media">
        <div class="media-left">
            <a href="#">
            <img class="media-object commentImg" src="{{imgSrc}}" alt="...">
            </a>
        </div>
        <div class="media-body">
            <h4 class="media-heading">{{title}}</h4>
            {{description}}
        </div>
    </div>
    `,
    styles:[`
        .commentImg{
            border-radius:100%;
        }
    `],
    selector:'comments'
})
export class CommentComponent{
    
    @Input()title:string;
    @Input()description:string;
    @Input()imgSrc:string;

}