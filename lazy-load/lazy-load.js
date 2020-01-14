(async function () {
    const res = await fetch('https://picsum.photos/v2/list?limit=1000');
    const srcUrls = await res.json();
    const container = document.querySelector('.container');

    const innerHTML = srcUrls.slice(5)
        .map(({download_url: url}, index) => `<div class="lzy_img" data-id="${index}"></div>`)
        .join('');
    container.innerHTML = innerHTML;


    let config = {
        root: null,
        rootMargin: "0px",
        threshold: 0.01
    };

    let observer = new IntersectionObserver(handleIntersect, config);

    function handleIntersect(entries) {
        entries.forEach((entry) => {
            // if the entry is within the browser’s viewport
            if (entry.isIntersecting) {
                const collection = Array.from(document.getElementsByClassName('lzy_img'));

                for (let i = 0; i < collection.length; i++) {
                    container.children[i].classList.add('fadeIn');
                    updateBackgroundImage(container.children[i], srcUrls[i]);
                }
            }
        });
    }

    observer.observe(container);

    // Use this code to add an image
    function updateBackgroundImage(div, srcObj) {
        if (!div.style.backgroundImage) {
            div.style.backgroundImage = `url("${srcObj.download_url}")`;
        }
    }
})();
