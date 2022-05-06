export function CamelCase(str) {
    return (str.replace(/(?:^\w|[a-z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toUpperCase() : word.toLowerCase();
    }).replace(/\s+/g, ""));
}