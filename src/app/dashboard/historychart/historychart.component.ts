import { Component, OnInit } from '@angular/core';

import { ColorService } from '../../color.service';


@Component({
    selector: 'app-historychart',
    templateUrl: './historychart.component.html',
    styleUrls: ['./historychart.component.scss']
})
export class HistorychartComponent implements OnInit {

    private data: any;
    private options: any;
    constructor(
        private colorService: ColorService
    ) {
        this.data = {
            labels: ['08/16/2017', '08/17/2017', '08/18/2017', '08/19/2017', '08/20/2017', '08/21/2017', '08/22/2017'],
            datasets: [{
                label: 'Completed',
                backgroundColor: colorService.COMPLETED,
                borderWidth: 0,
                data: [165, 159, 180, 181, 156, 155, 140]
            }, {
                label: 'Data',
                backgroundColor: colorService.ERROR_DATA,
                borderWidth: 0,
                data: [28, 48, 40, 19, 86, 27, 90]
            }, {
                label: 'Algorithm',
                backgroundColor: colorService.ERROR_ALGORITHM,
                borderWidth: 0,
                data: [28, 48, 40, 19, 86, 27, 90]
            }, {
                label: 'System',
                backgroundColor: colorService.ERROR_SYSTEM,
                borderWidth: 0,
                data: [28, 48, 40, 19, 86, 27, 90]
            }]
        }
        this.options = {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    }

    ngOnInit() {

    }

}
