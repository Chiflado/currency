import { Component, OnInit, Input } from '@angular/core';
import { SumTableData } from 'src/app/shared/data';

@Component({
  selector: 'app-sum-table',
  templateUrl: './sum-table.component.html'
})
export class SumTableComponent implements OnInit {

  @Input() tableData: SumTableData[];

  constructor() { }

  ngOnInit() {
    console.log(this.tableData);
  }

}
