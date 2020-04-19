import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../quote.service';
import { Quote } from 'src/app/models/quote';

@Component({
  selector: 'app-show-quote',
  templateUrl: './show-quote.component.html',
  styleUrls: ['./show-quote.component.css']
})
export class ShowQuoteComponent implements OnInit {

  quote = new Quote;

  constructor(private quoteService: QuoteService) { }

  ngOnInit(): void {
    this.quoteService.getQuote().subscribe((data: any) => {
      this.quote = data;
    })
  }

}
