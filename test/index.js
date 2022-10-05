setTimeout(() => console.log("timeout"));

Promise.resolve()
    .then(() => console.log("promise"));

console.log("code");

queueMicrotask(() => {
    console.log('code1');
});

setTimeout(() => {
    console.log('code2')
})