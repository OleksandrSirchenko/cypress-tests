export class RecordBuilder {
    public recordType: string;

    constructor(recordType: any) {
        this.recordType = recordType;
    }

    setName(name: string) {
        return Object.assign(this, { name: name });
    }

    setUrls(urls: any) {
        return Object.assign(this, { urls: urls });
    }

    setStepNames(stepNames: any) {
        return Object.assign(this, { stepNames: stepNames });
    }
}