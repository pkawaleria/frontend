export const formatToOptions = (array) => {
    return (Array.isArray(array) ? array : []).map(element => ({
        value: element.id,
        label: element.name
    }));
}

export const formatToUrlOption = (label, value) => {
    return JSON.stringify({
        value: value,
        label: label
    });
}
