# fetch 

调用

```js
fetch(url, option)
.then(res => res.json())
.then(data => console.log(data));
```

```js
(async function(){
    try{
        const res = await fetch(url, option);
        const data = await res.json();
        console.log(data);
    }catch(e){
        console.log(e);
    }
})();
```


```js
fetch(url)
.then(response=>{
    console.log(response.headers.get('Content-Type'));
    console.log(response.headers.get('Date'));

    console.log(response.status);
    console.log(response.statusText);
    console.log(response.type);
    console.log(response.url);
})
```
