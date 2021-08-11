const postList = [];
const list = [];

const getPost = async() => {
    const url = '/posts/search_axios/';
    const postData = await axios.get(url)
    list.push(postData.data);

    for (let i=0; i < list[0].length; i++) {
        postList.push(list[0][i].fields);
    }
    console.log(postList);
    return postList
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function findMatches(wordToMatch, postList) {
    return postList.filter(post => {
        const regex = new RegExp(wordToMatch, 'gi') //패턴을 사용해 텍스트를 판별할 때 사용하는 정규 표현식 객체를 생성
        // return post.title.match(regex) || post.desc.match(regex);
        return post.title.match(regex)
    });
}

function displayMatches(){
    const matchArray = findMatches(this.value, postList);
    const html = matchArray.map(post => {
        const regex = new RegExp(this.value, 'gi');
        const title = post.title.replace(regex, `<span class="h1">${this.value}</span>`);

        return `
            <li>
                <span class="name">${title}</span>
                <span class="population">${numberWithCommas(post.title)}</span>
            </li>
        `
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.search_container');

// fetch('/posts/search_axios')
//     .then(blob => blob.json())
//     .then(data => postList.push(...data));

function init() {
    getPost()
    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', displayMatches); //타이핑 할때마다.
}
init();

// .then(response => postList.push(...response.data));
