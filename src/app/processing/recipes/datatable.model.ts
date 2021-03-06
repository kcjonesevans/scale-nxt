export class RecipesDatatable {
    constructor(
        public first: number,
        public rows: number,
        public sortField: string,
        public sortOrder: number,
        public started: Date,
        public ended: Date,
        public type_id: number,
        public type_name: string,
        public batch_id: number,
        public include_superseded: boolean
    ) {}
}

export const initialRecipesDatatable: RecipesDatatable = {
    first: 0,
    rows: 10,
    sortField: 'last_modified',
    sortOrder: -1,
    started: null,
    ended: null,
    type_id: null,
    type_name: null,
    batch_id: null,
    include_superseded: null
};
