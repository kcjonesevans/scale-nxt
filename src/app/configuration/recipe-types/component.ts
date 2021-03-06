import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng';
import * as _ from 'lodash';
import * as shape from 'd3-shape';
import { colorSets } from '@swimlane/ngx-charts-dag/release/utils';

import { RecipeTypesApiService } from './api.service';
import { RecipeType } from './api.model';
import { RecipeTypesDatatable } from './datatable.model';
import { RecipeTypesDatatableService } from './datatable.service';

@Component({
    selector: 'app-job-types',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class RecipeTypesComponent implements OnInit {
    datatableOptions: RecipeTypesDatatable;
    recipeTypes: RecipeType[];
    selectedRecipeType: RecipeType;
    selectedRecipeTypeKeys: string[];
    first: number;
    count: number;
    isInitialized: boolean;
    // ngx-charts-dag
    nodes = [];
    links = [];
    view: any[];
    width: number;
    height: number;
    showLegend = false;
    orientation: string; // LR, RL, TB, BT
    curve: any;
    colorScheme: any;

    constructor(
        private recipeTypesDatatableService: RecipeTypesDatatableService,
        private recipeTypesApiService: RecipeTypesApiService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.isInitialized = false;
        this.width = 700;
        this.height = 300;
        this.orientation = 'LR';
        this.curve = shape.curveLinear;
        this.colorScheme = colorSets.find(s => s.name === 'picnic');
        this.view = [this.width, this.height];
        this.showLegend = false;
    }

    private updateData() {
        this.recipeTypesApiService.getRecipeTypes(this.datatableOptions).then(data => {
            this.count = data.count;
            this.recipeTypes = data.results as RecipeType[];
        });
    }
    private updateOptions() {
        this.recipeTypesDatatableService.setRecipeTypesDatatableOptions(this.datatableOptions);

        // update querystring
        this.router.navigate(['/configuration/recipe-types'], {
            queryParams: this.datatableOptions
        });

        this.updateData();
    }
    private getRecipeTypeDetail(id: number) {
        this.recipeTypesApiService.getRecipeType(id).then(data => {
            this.selectedRecipeType = data as RecipeType;
            this.selectedRecipeTypeKeys = Object.keys(this.selectedRecipeType);

            // build nodes and links for DAG
            this.nodes = [{
                id: 'start',
                label: 'Start',
                name: 'start',
                job_type: null,
                dependencies: [],
                visible: true
            }];
            this.links = [];

            _.forEach(this.selectedRecipeType.definition.jobs, (job) => {
                this.nodes.push({
                    id: _.camelCase(job.name), // id can't have dashes or anything
                    label: job.job_type.name + ' v' + job.job_type.version,
                    name: job.name,
                    job_type: job.job_type,
                    dependencies: job.dependencies,
                    visible: true
                });
            });

            _.forEach(this.nodes, (node) => {
                if (node.id !== 'start' && node.id !== 'end') {
                    if (node.dependencies.length === 0) {
                        // job has no dependencies, so link it to start
                        this.links.push({
                            source: 'start',
                            target: node.id,
                            node: node,
                            visible: true
                        });
                    } else {
                        _.forEach(node.dependencies, (dependency) => {
                            this.links.push({
                                source: _.camelCase(dependency.name),
                                target: node.id,
                                node: node,
                                visible: true
                            });
                        });
                    }
                }
            });
        });
    }

    select(e) {
        let childNodes = [];
        const childLinks = [];

        const findChildNodes = (id) => {
            _.forEach(this.links, (link) => {
                if (link.source === id) {
                    childNodes.push(link.node);
                    link.visible = !link.visible;
                    childLinks.push(link);
                    findChildNodes(link.node.id);
                }
            });
        };
        findChildNodes(e.id);

        childNodes = _.uniqBy(childNodes, 'id');

        // todo: Figure out two-way binding
        this.nodes = _.pullAllBy(this.nodes, childNodes, 'id');
        console.log('nodes', this.nodes);
        console.log('links', this.links);
    }
    getUnicode(code) {
        return `&#x${code};`;
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
                sortOrder: e.sortOrder
            });
            this.updateOptions();
        } else {
            // data was just loaded by ngOnInit, so set flag to true
            this.isInitialized = true;
        }
    }
    onRowSelect(e) {
        this.datatableOptions = Object.assign(this.datatableOptions, {
            id: e.data.id
        });
        this.recipeTypesDatatableService.setRecipeTypesDatatableOptions(this.datatableOptions);
        this.router.navigate(['/configuration/recipe-types'], {
            queryParams: this.datatableOptions
        });
        this.getRecipeTypeDetail(e.data.id);
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
                id: params.id,
                started: params.started,
                ended: params.ended
            };
        } else {
            this.datatableOptions = this.recipeTypesDatatableService.getRecipeTypesDatatableOptions();
        }
        this.updateOptions();
        if (this.datatableOptions.id) {
            this.getRecipeTypeDetail(this.datatableOptions.id);
        }
    }
}
