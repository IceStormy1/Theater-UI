import BaseFilter from "./baseFilter";

export default class UserReviewFilter extends BaseFilter {
    constructor() {
        super();

        this.userId = null;
        this.pieceId = null;
    }
}