export function sleep(ms : number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const radians = (degrees : number) => {
    return degrees * (Math.PI / 180);
}
