export class JobTypesDatatable {
    constructor(
        public first: number,
        public rows: number,
        public sortField: string,
        public sortOrder: number,
        public started: Date,
        public ended: Date,
        public name: string,
        public category: string,
        public is_active: boolean,
        public is_operational: boolean
    ) {}
}

export const initialJobTypesDatatable: JobTypesDatatable = {
    first: 0,
    rows: 10,
    sortField: 'title',
    sortOrder: 1,
    started: null,
    ended: null,
    name: null,
    category: null,
    is_active: null,
    is_operational: null
};
