// On définit notre fonction
exports.tabEnigme = (arrEnigme, limit) => {
    if (!Array.isArray(arrEnigme)) {
        return [];
    }
    return arrEnigme.slice(0, limit);
}

// On définit notre fonction
exports.limitArrayReverse = (arrEnigme, limit) => {
    if (!Array.isArray(arrEnigme.reverse())){
        return [];
    } 
    return arrEnigme.slice(0, limit);
}

// mettre en majuscule
exports.upper = (str) => str.toUpperCase()


// fonction nombres de caractere max 40 
exports.cutStr = (str) => str.substr(0, 40);