const listPost = []; //post data 추출용
const listUser = []; //user data 추출용
const postList = []; // post fields -> 여기에 post, username까지 들어감.
const userList = []; // user fields


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

// 검색 관련 함수
function numberWithCommas(x) { //숫자 3자리마다  ,
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 검색어 match
function findMatches(wordToMatch, postList) {
    return postList.filter(post => {
        const regex = new RegExp(wordToMatch, 'gi') //패턴을 사용해 텍스트를 판별할 때 사용하는 정규 표현식 객체를 생성
        return post.title.match(regex) 
        || post.desc.match(regex) 
        || post.tag.match(regex)
    });
}

// matching된 검색 관련 글 출력
function displayMatches(){
    const matchArray = findMatches(this.value, postList);
    const html = matchArray.map(post => {
        const regex = new RegExp(this.value, 'gi');
        const title = post.title.replace(regex, `<span class="h1">${this.value}</span>`);
        const desc = post.desc.replace(regex, `<span class="h1">${this.value}</span>`);
        const tag = post.tag.replace(regex, `<span class="h1">${this.value}</span>`);

        return `
            <div>
                ${title}
            </div>
                `
    }).join('');

    // not empty
    if (checkEmpty.value && // if exist AND
        checkEmpty.value.length > 0 && // if value have one charecter at least
        checkEmpty.value.trim().length > 0 )// if value is not just spaces
    {   
        suggestions.innerHTML = html;
        console.log('value is:    ' + checkEmpty.value);
    }
    // empty
    else if(!checkEmpty.value) {
        suggestions.innerHTML = "";
        console.log('No value!');
    } 
}

const checkEmpty = document.querySelector('.search');
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.post_container');

searchInput.addEventListener('input', displayMatches);

function init() {
    getPost();
    // checkInput();
}
init();