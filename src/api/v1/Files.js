export default class Files {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** List files in a directory. params: { organization_id, directory, per_page } */
    list(params = {})           { return this.#client.get('/files', params); }

    /** Get a single file record by ID. */
    get(id)                     { return this.#client.get(`/files/${id}`); }

    /** Upload a file (FormData). Supports: file, folder, organization_id, filename, generate_webp, … */
    upload(formData)            { return this.#client.upload('/files', formData); }

    /** Create a logical folder (JSON PUT, no file involved). body: { path } */
    createFolder(body)          { return this.#client.put('/files/folder', body); }

    /** Update file description. body: { description } */
    update(id, body)            { return this.#client.patch(`/files/${id}`, body); }

    /** Soft-delete a file. Pass s3=true to also remove from S3. */
    delete(id, s3 = false)      { return this.#client.del(`/files/${id}${s3 ? '?s3=1' : ''}`); }
}
