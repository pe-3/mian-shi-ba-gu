# promise 发送 Ajax

```js
function ajax(method, url, data) {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(xhr.statusText);
            }
        }
        xhr.open(method, url);
        xhr.send(data);
    })
}
```

