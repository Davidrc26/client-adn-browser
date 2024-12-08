import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Record } from '../models/all_models';
import { SearchService } from '../services/search.service';

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
  public totalItems: number = 0;
  public results: Record[] = [];
  public page: number = 1;
  public pageSize: number = 20;
  private searchService = inject(SearchService);

  search(){
    this.searchService.search(undefined, this.searchTerm, this.page, this.pageSize).subscribe({
      next: (resp: any) => {
        this.results = resp.records.map((record: any) => {
          return {
            chrom: record._source["#CHROM"],
            pos: record._source["POS"],
            id: record._source["ID"],
            ref: record._source["REF"],
            alt: record._source["ALT"],
            qual: record._source["QUAL"],
            filter: record._source["FILTER"],
            info: record._source["INFO"],
            format: record._source["FORMAT"],
          } as Record;
        } );
        this.page = resp.page;
        this.totalItems = resp.total;
        this.searchPerformed = true;
      },
      error: (error) => {
        console.error('Error searching', error);
      }
    });
  }

  pageChanged(event: any){
    this.page = event;
  }

} 
