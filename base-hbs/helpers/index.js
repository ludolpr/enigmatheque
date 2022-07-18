// On définit notre fonction
exports.limitArray = (arr, limit) => {
    if (!Array.isArray(arr)) {
        return [];
    }
    return arr.slice(0, limit);
}

// On définit notre fonction
exports.limitArrayReverse = (arr, limit) => {
    if (!Array.isArray(arr.reverse())) {
        return [];
    }
    return arr.slice(0, limit);
}

exports.upper = (str) => str.toUpperCase()

exports.stripTags = (Input) => {
    //Pour l'éditeur de texte; fonction permettant de remplacer tous ces symboles par des ''.
    if (Input) return Input.replace(/<(?:.|\n)*?>/gm, ' ');
}
// Incrémentation 
exports.inc = (value, option) => {
    return parseInt(value) + 1
}
// Pour les commentaires
exports.ifCond = (v1, v2, options) => {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
}
// Dates
exports.formatDate = (date, format) => {
    return moment(date).utc().format(format)
}