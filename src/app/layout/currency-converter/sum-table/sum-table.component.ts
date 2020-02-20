import { Component, OnInit, Input } from '@angular/core';
import { SumTableData } from 'src/app/shared/data';

@Component({
  selector: 'app-sum-table',
  templateUrl: './sum-table.component.html'
})
export class SumTableComponent implements OnInit {

  @Input() tableData: SumTableData[];

  displayedColumns: string[] = ['amount', 'currency', 'converted'];

  ngOnInit() {
    console.log(this.tableData);
  }

  getTotalCost() {
    const total = this.tableData.map(t => t.converted).reduce((acc, value) => acc + value, 0);
    return this.roundConverted(total);
  }

  roundConverted(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

}
