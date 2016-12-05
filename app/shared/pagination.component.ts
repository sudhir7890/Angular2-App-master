import {Component, Input, Output, OnInit,OnChanges, EventEmitter} from '@angular/core';

@Component({
    selector:'paginator',
    template:`
        <nav *ngIf="active">
            <ul class="pagination">
                <li>
                    <a (click)="gotoPreviousPage()" aria-label="Previous" [class.disabled]="currentPageNumber === 1">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li *ngFor=" let pageNumber of pageNumbers " [class.active]="currentPageNumber === pageNumber">
                    <a (click)="handlePageChange(pageNumber)">{{pageNumber}}</a>
                </li>
 
                <li>
                <a (click)="gotoNextPage()" aria-label="Next" [class.disabled]="currentPageNumber === numOfPages">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>
    `,styles:[
        `
            a.disabled {
                pointer-events: none;
                cursor: not-allowed; 
            }
        `
    ]
})
export class PaginationComponent implements OnChanges{
    @Input() totalCount;
    @Input() pageSize;
    @Output() pageChanged = new EventEmitter();
    numOfPages:number = 0;
    active=true;
    pageNumbers = new Array();
    currentPageNumber = 1;
    

    init(){
        this.pageNumbers = new Array();
        this.currentPageNumber = 1;
        this.numOfPages = this.totalCount/this.pageSize;
        this.active = (this.numOfPages > 1)? true : false;
        if(this.active){
            for(var i=1; i<=this.numOfPages; i++){
                this.pageNumbers.push(i);
            }
        }
    }

    handlePageChange(pageNumber){
        this.currentPageNumber = pageNumber;
        this.emitPageChangeEvent();
    }


    emitPageChangeEvent(){
       this.pageChanged.emit({requestedPageNumber:this.currentPageNumber});
    }

    gotoPreviousPage(){
        this.currentPageNumber--;
        this.emitPageChangeEvent();
    }

    gotoNextPage(){
        this.currentPageNumber++;
        this.emitPageChangeEvent();
    }

    ngOnChanges(){
        console.log("inside ng onchange");
        console.log(this.totalCount);
        this.init();
    }


}