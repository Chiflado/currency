import { Component, Input } from '@angular/core';
import { SumTableData } from 'src/app/shared/data';

@Component({
  selector: 'app-sum-table',
  templateUrl: './sum-table.component.html'
})
export class SumTableComponent {

  @Input() tableData: SumTableData[];

  readonly displayedColumns: string[] = ['amount', 'currency', 'converted'];

  getTotalCost(): number {
    const total = this.tableData.map(t => t.converted).reduce((acc, value) => acc + value, 0);
    return this.roundConverted(total);
  }

  roundConverted(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

}
