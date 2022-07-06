export const has_intersection = (array1, array2) => {
    let intersection = array1.filter((value) => array2.includes(value));
    if (intersection.length === 0) {
        return false;
    } else {
        return true;
    }
};
