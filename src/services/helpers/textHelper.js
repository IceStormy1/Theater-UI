export default class TextHelper {
    constructor() {}

    static replaceBr(text){
        return text === null ? text : text.replace(/\n/g, "<br/>")
    }
}