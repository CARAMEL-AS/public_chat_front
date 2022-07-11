export const dateToTime = (dt) => {
    const date = new Date(dt);
    const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const ampm = date.getHours() > 12 ? 'PM' : 'AM';
    return `${hour}:${date.getMinutes()} ${ampm}`
}