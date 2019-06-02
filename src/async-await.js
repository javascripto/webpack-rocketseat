const minhaPromise = () => new Promise(resolve => {
    setTimeout(() => resolve('OK'), 1000);
});

export const executaPromise = async () => {
    console.log(await minhaPromise());
    console.log(await minhaPromise());
    console.log(await minhaPromise());
}
