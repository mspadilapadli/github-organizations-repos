import { formatDistanceToNow } from "date-fns";

export const distanceDate = (dateString) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
};
