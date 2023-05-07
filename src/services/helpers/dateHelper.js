import dayjs from "dayjs";

export default class DateHelper {
    constructor() {}

    static formatDate(dateString, format){
        const date = dayjs(dateString);
        // Then specify how you want your dates to be formatted
        return date.format(format);
    }
}