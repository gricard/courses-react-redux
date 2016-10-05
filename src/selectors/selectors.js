export function authorsFormattedForDropdown(authors) {
    // TODO replace below with authorFormattedForDropdown
    return authors.map(author => {
        return {
            value: author.id,
            text: author.firstName + ' ' + author.lastName
        };
    });
}

export function authorFormattedForDropdown(author) {
    return {
        value: author.id,
        text: author.firstName + ' ' + author.lastName
    };
}
