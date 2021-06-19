import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
})
export class DocumentComponent implements OnInit {
  constructor() {}
  ngOnInit() {}

  openDocumentation(): void {
    let url =
      'https://docs.google.com/document/d/1A3jWuNJcBermWpvWdehPrNML6_a22j3SCsRvOBNxW1I/edit?usp=sharing';
    window.open(url, '_blank');
  }
}
