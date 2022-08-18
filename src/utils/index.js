export const buildAuthHeader = (token) => {
    return {
        headers: {
            Authorization: token,
        },
    };
};

export const dateFormat = (date) => {
    if (!date) return "";
    date = new Date(date);
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join("/");
};

const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
};
