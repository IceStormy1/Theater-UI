export default class BaseFilter {
    constructor() {
        this.limit = 10;
        this.offset = 0;
        this.sortColumn = null;
        this.sortOrder = 1; // 0 - ASC, 1 -DESC
    }
}