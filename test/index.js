function getXpath(id) {
    const targetDom = document.getElementById(id);
    const res = [];
    while (targetDom.parentNode !== document.body) {
        const cur = {
            tagName: targetDom.tagName,
            index: 0,
        };
        while (targetDom.previousElementSibling) {
            cur.index++;
            targetDom = targetDom.previousElementSibling;
        }
        targetDom = targetDom.parentElement;
        res.push(cur);
    }
    return res.map((item) => {
        let resStr = item.tagName.toLowerCase();
        if (item.index) {
            resStr += (item.index + 1);
        }
        return resStr;
    }).join('-');
}