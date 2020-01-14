(async function () {
    const res = await fetch('https://picsum.photos/v2/list?limit=1000');
    const srcUrls = await res.json();
    const container = document.querySelector('.container');

    const innerHTML = srcUrls.slice(5)
        .map(({download_url: url}, index) => `<div class="lzy_img" data-id="${index}"></div>`)
        .join('');
    container.innerHTML = innerHTML;

    window.addEventListener('scroll', () => {
        console.log(Math.ceil(window.scrollY / 229.375));
        const index = Math.ceil(window.scrollY / 229.375) - 1;
        (new Array(4))
            .fill()
            .map((elem, i) => index + i)
            .forEach(index =>
                updateBackgroundImage(container.children[index], srcUrls[index]));
    });

    // Use this code to add an image
    function updateBackgroundImage(div, srcObj) {
        if (!div.style.backgroundImage) {
            div.style.backgroundImage = `url("${srcObj.download_url}")`;
        }
    }
})();
