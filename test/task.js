async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')


setTimeout(() => {
    console.log('setTimeout0')
})
setTimeout(() => {
    console.log('setTimeout1')
})

setImmediate(() => console.log('setImmediate'))

process.nextTick(() => console.log('nextTick1'))

async1()

process.nextTick(() => console.log('nextTick2'))

new Promise((resolve) => {
    console.log('promise1')
    resolve()
    console.log('promise2')
}).then(() => {
    console.log('promise3')
})
console.log('script end')