import BaseFilter from "./baseFilter";

export default class UserTicketsFilter extends BaseFilter {
    constructor() {
        super();

        this.userId = null;
    }
}