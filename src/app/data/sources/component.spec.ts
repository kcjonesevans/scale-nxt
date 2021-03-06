import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

import { SourcesApiService } from './api.service';
import { SourcesComponent } from './component';
import { SourcesDatatableService } from './datatable.service';

describe('SourceFilesComponent', () => {
    let component: SourcesComponent;
    let fixture: ComponentFixture<SourcesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SourcesComponent],
            imports: [HttpModule],
            providers: [
                SourcesApiService, SourcesDatatableService,
                {provide: ActivatedRoute, useClass: class { navigate = jasmine.createSpy('navigate'); }},
                {provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); }}
            ],
            // Tells the compiler not to error on unknown elements and attributes
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SourcesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
