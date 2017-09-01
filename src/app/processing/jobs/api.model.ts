export class Job {
    constructor(
        public id: number,
        public job_type: object,
        public job_type_rev: object,
        public event: object,
        public error: object,
        public status: string,
        public priority: number,
        public num_exes: number,
        public timeout: number,
        public max_tries: number,
        public cpus_required: number,
        public mem_required: number,
        public disk_in_required: number,
        public disk_out_required: number,
        public is_superseded: boolean,
        public root_superseded_job: object,
        public superseded_job: object,
        public superseded_by_job: object,
        public delete_superseded: boolean,
        public created: string,
        public queued: string,
        public started: string,
        public ended: string,
        public last_status_change: string,
        public superseded: string,
        public last_modified: string,
        public data: object,
        public results: object,
        public recipes: object[],
        public job_exes: object[],
        public inputs: object[],
        public outputs: object[]
    ) {}
}