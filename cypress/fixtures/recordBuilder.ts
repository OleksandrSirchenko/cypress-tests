export class RecordBuilder {
    public recordType: string;

    constructor(recordType: any) {
        this.recordType = recordType;
    }

    setMapName(name: string) {
        return Object.assign(this, { name: name });
    }

    setUrl(url: string) {
        return Object.assign(this, { url: url });
    }
}