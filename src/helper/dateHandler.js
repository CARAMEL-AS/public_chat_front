export const dateToTime = (dt) => {
    const date = new Date(dt);
    const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const ampm = date.getHours() > 12 ? 'PM' : 'AM';
    return `${hour === 0 ? 12 : hour}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} ${ampm}`
}