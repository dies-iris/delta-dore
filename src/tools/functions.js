export default function upperCaseFirstLetter(titre) {
    var string = titre.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}