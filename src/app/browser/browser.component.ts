import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-browser',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule ],
  templateUrl: './browser.component.html',
  styleUrl: './browser.component.scss',
  standalone: true
})
export default class BrowserComponent {
  public searchTerm: string = '';
  public searchPerformed: boolean = false;
  public results: any[] = [];
  public page: number = 1;
  public pageSize: number = 20;

  search(){

  }

  pageChanged(event: any){
    this.page = event;
  }

} 
