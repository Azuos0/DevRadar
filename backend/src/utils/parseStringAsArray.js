module.exports = function parseStringAsArray(arrayAsString){
    return arrayAsString.split(',').map(elem => elem.trim());
}