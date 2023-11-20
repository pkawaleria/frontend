export const formatToOptions = (array) => {
    return (Array.isArray(array) ? array : []).map(element => ({
        value: element.id,
        label: element.name
    }));
}