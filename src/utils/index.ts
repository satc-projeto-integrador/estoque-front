export const displayDate = (date: string | Date) => {
    if (typeof date === "string") date = new Date(date);
    return date.toLocaleDateString()
}