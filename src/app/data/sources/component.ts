import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';
import * as moment from 'moment';

import { SourcesApiService } from './api.service';
import { Source } from './api.model';
import { SourcesDatatable } from './datatable.model';
import { SourcesDatatableService } from './datatable.service';

@Component({
    selector: 'app-sources',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class SourcesComponent implements OnInit {
    datatableOptions: SourcesDatatable;
    sources: Source[];
    first: number;
    count: number;
    started: Date = moment.utc().subtract(1, 'd').toDate();
    ended: Date = moment.utc().toDate();
    timeFieldOptions: SelectItem[];
    isInitialized: boolean;

    constructor(
        private sourcesDatatableService: SourcesDatatableService,
        private sourcesApiService: SourcesApiService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.isInitialized = false;
        this.timeFieldOptions = [
            {
                label: 'Data',
                value: 'data'
            },
            {
                label: 'Last Modified',
                value: 'last_modified'
            }
        ];
    }

    private updateData() {
        this.sourcesApiService.getSources(this.datatableOptions).then(data => {
            this.count = data.count;
            this.sources = data.results as Source[];
        });
    }
    private updateOptions() {
        this.datatableOptions = _.pickBy(this.datatableOptions, (d) => {
            return d !== null && typeof d !== 'undefined' && d !== '';
        });
        this.sourcesDatatableService.setSourcesDatatableOptions(this.datatableOptions);

        // update querystring
        this.router.navigate(['/data/sources'], {
            queryParams: this.datatableOptions
        });

        this.updateData();
    }

    paginate(e) {
        this.datatableOptions = Object.assign(this.datatableOptions, {
            first: e.first,
            rows: parseInt(e.rows, 10)
        });
        this.updateOptions();
    }
    onLazyLoad(e: LazyLoadEvent) {
        // let ngOnInit handle loading data to ensure query params are respected
        if (this.isInitialized) {
            this.datatableOptions = Object.assign(this.datatableOptions, {
                first: 0,
                sortField: e.sortField,
                sortOrder: e.sortOrder,
                file_name: e.filters['file_name'] ? e.filters['file_name']['value'] : null
            });
            this.updateOptions();
        } else {
            // data was just loaded by ngOnInit, so set flag to true
            this.isInitialized = true;
        }
    }
    onRowSelect(e) {
        this.router.navigate(['/data/sources/' + e.data.id]);
    }
    onStartSelect(e) {
        this.datatableOptions = Object.assign(this.datatableOptions, {
            first: 0,
            started: moment.utc(e, 'YYYY-MM-DD').toISOString()
        });
        this.updateOptions();
    }
    onEndSelect(e) {
        this.datatableOptions = Object.assign(this.datatableOptions, {
            first: 0,
            ended: moment.utc(e, 'YYYY-MM-DD').toISOString()
        });
        this.updateOptions();
    }
    onTimeFieldChange(e) {
        this.datatableOptions = Object.assign(this.datatableOptions, {
            first: 0,
            time_field: e.value
        });
        this.updateOptions();
    }
    ngOnInit() {
        if (this.route.snapshot &&
            Object.keys(this.route.snapshot.queryParams).length > 0) {

            const params = this.route.snapshot.queryParams;
            this.datatableOptions = {
                first: parseInt(params.first, 10),
                rows: parseInt(params.rows, 10),
                sortField: params.sortField,
                sortOrder: parseInt(params.sortOrder, 10),
                started: params.started,
                ended: params.ended,
                time_field: params.time_field,
                is_parsed: params.is_parsed,
                file_name: params.file_name
            };
            this.started = moment.utc(this.datatableOptions.started).toDate();
            this.ended = moment.utc(this.datatableOptions.ended).toDate();
        } else {
            this.datatableOptions = this.sourcesDatatableService.getSourcesDatatableOptions();
        }
        this.updateOptions();
    }
}
