const listPost = []; //post data 추출용
const listUser = []; //user data 추출용
const postList = []; // post fields -> 여기에 post, username까지 들어감.
const userList = []; // user fields

const test = '{{ posts.user }}'

//post data
const getPost = async() => {
    const url = '/posts/search_post_axios/';
    const postData = await axios.get(url);
    listPost.push(postData.data);
    
    //post fields data 추출
    for (let i=0; i < listPost[0].length; i++) {
        postList.push(listPost[0][i].fields);
    }

    getUser();
    console.log(postList)
    return postList
}

//user data
const getUser = async() => {
    const url = '/posts/search_user_axios/';
    const userData = await axios.get(url);
    listUser.push(userData.data);

    //username을 postList에 삽입
    for (let i=0; i < postList.length; i++) { //post 순회
        for (let j=0; j < listUser[0].length; j++) { //user 순회
            if(postList[i].user ===  listUser[0][j].pk) {
                postList[i]['username'] = listUser[0][j].fields.username;
            }
        }
    }
}




function numberWithCommas(x) { //숫자 3자리마다  ,
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function findMatches(wordToMatch, postList) {
    return postList.filter(post => {
        const regex = new RegExp(wordToMatch, 'gi') //패턴을 사용해 텍스트를 판별할 때 사용하는 정규 표현식 객체를 생성
        return post.title.match(regex) || post.desc.match(regex) || post.tag.match(regex)
    });
}

function displayMatches(){
    const matchArray = findMatches(this.value, postList, postIdList);
    const html = matchArray.map(post => {
        const regex = new RegExp(this.value, 'gu');
        const title = post.title.replace(regex, this.value);
        const desc = post.desc.replace(regex, this.value);
        const tag = post.tag.replace(regex, this.value);

        return `
            <div>
                ${title}
                ${desc}
                ${tag}
            </div>
                `
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.post_container');

function init() {
    getPost()
    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', displayMatches); //타이핑 할때마다.
    // searchInput.addEventListener("input", displayInputValue);

}
init();

// <li>
// <span class="name">${title}</span>
// <span class="population">${numberWithCommas(post.title)}</span>
// </li>