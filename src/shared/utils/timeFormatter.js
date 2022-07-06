export const formatLocalTime = (time) => {
    const option = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
    };
    const localTime = new Date(time).toLocaleString("en-AU", option);

    return localTime;
};
