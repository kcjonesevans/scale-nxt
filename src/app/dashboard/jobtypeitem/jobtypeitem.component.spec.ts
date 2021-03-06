import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFavoritesService } from '../favorites.service';
import { JobtypeitemComponent } from './jobtypeitem.component';


describe('JobtypeitemComponent', () => {
    let component: JobtypeitemComponent;
    let fixture: ComponentFixture<JobtypeitemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JobtypeitemComponent],
            providers: [DashboardFavoritesService]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JobtypeitemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
