const fetchPage = async (url) => {
    let headers = new Headers()
    headers.append("X-Requested-With", "XMLHttpRequest")
    return fetch(url, { headers })
    }

const appendElements = async (scrollElement, counter, baseUrl) => {

    let url = `${baseUrl}?page=${counter + 1}` //url 변동되게 하는거 이런식으로 하면 될거 같다.
    let req = await fetchPage(url);
    if (req.ok) {
        let body = await req.text();
        console.log(body);
        scrollElement.innerHTML += body;
    } else {
        end = true;
    }
}

const attachInfiniteScroll = (sentinel, scrollElement, baseUrl) => {
    let counter = 0;
    let end = false;

    let observer = new IntersectionObserver(async (entries) => {
        let bottomEntry = entries[0];

        if (!end && bottomEntry.intersectionRatio > 0) {
            await appendElements(scrollElement, counter, baseUrl);
        counter += 1;
        }
    })
    observer.observe(sentinel);
};



