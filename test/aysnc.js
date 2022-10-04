async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}

setTimeout(() => {
    console.log('setTimeout0')
})

async function async2() {
    console.log('async2 start')
    await async3()
    console.log('async2 end')
}

async function async3() {
    console.log('async3')
}

console.log('script start')
async1()

setTimeout(() => {
    console.log('setTimeout1')
})

new Promise((resolve) => {
    console.log('promise1')
    resolve()
}).then(() => {
    console.log('promise2')
})

console.log('script end')

// script start
// async1 start
// async2 start
// async3
// promise1
// script end
// async2 end
// promise2
// async1 end
// setTimeout0
// setTimeout1

function debounce(func, delay) {
    return function (...arguments) {
        if (timer) {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                func.call(this, arguments);
            }, delay);
        }
    }
}