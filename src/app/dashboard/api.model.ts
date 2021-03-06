export class JobType {
    constructor(
        public id: number,
        public name: string,
        public version: string,
        public title: string,
        public description: string,
        public category: string,
        public author_name: string,
        public author_url: string,
        public is_system: boolean,
        public is_long_running: boolean,
        public is_active: boolean,
        public is_operational: boolean,
        public is_paused: boolean,
        public icon_code: string,
        public uses_docker: boolean,
        public docker_image: string,
        public revision_num: number,
        public priority: number,
        public timeout: number,
        public max_scheduled: number,
        public max_tries: number,
        public cpus_required: number,
        public mem_required: number,
        public mem_const_required: number,
        public mem_mult_required: number,
        public shared_mem_required: number,
        public disk_out_const_required: number,
        public disk_out_mult_required: number,
        public created: string,
        public archived: string,
        public paused: string,
        public last_modified: string,
        public job_type_interface: object,
        public custom_resources: object,
        public error_mapping: object,
        public trigger_rule: object,
        public errors: object[],
        public job_counts_6h: object[],
        public job_counts_12h: object[],
        public job_counts_24h: object[]
    ) {}
}
