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

function escapeRegExp (string) { // c++ 인식 해결
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// 검색어 match
function findInput(wordToMatch, postList) {
    return postList.filter(post => {
        const regex = new RegExp(wordToMatch, 'gi'); //패턴을 사용해 텍스트를 판별할 때 사용하는 정규 표현식 객체를 생성
        return post.title.match(regex) 
        || post.desc.match(regex) //p 인식의 주범,,,,,,,
        || post.tag.match(regex)
    });
}

function findSelect(wordToMatch, postList) {
    const matchLang = postList.filter(post => post.language === wordToMatch)
    const matchOs = postList.filter(post => post.os === wordToMatch)
    const matchSolve = postList.filter(post => post.problem_solving === wordToMatch)
    const matchFramework = postList.filter(post => post.framework === wordToMatch)

    return matchLang, matchOs, matchSolve, matchFramework
}

// matching된 검색 관련 글 출력
function displayInputMatches(){
    const matchArray = findInput(this.value, postList);
    const html = matchArray.map(post => {
        const regex = new RegExp(this.value, 'gi'); //대소문자 구별 없이!
        const title = post.title.replace(regex, `${this.value}`);
        const desc = post.desc.replace(regex, `${this.value}`);
        const tag = post.tag.replace(regex, `${this.value}`);

        return `
            <div>
                ${title}
                ${desc}
                ${tag}
                ${post.username}
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

function displayLanguageMatches(){
    let matchArray = []
    
    if (this.value === "전체") {
        matchArray = postList
    } else {
        matchArray = postList.filter(post => post.language === this.value)
    }

    const html = matchArray.map(post => {
        return `
            <div>
                ${post.title}
                ${post.desc}
                ${post.tag}
                ${post.username}
            </div>
                `
    }).join('');

    // not empty
    if (selectField.value) // if exist AND
    {   
        suggestions.innerHTML = html;
        console.log('select is:  ' + selectField.value);
    }
}

function displayOsMatches(){
    let matchArray = []

    if (this.value === "전체") {
        matchArray = postList
    } else {
        matchArray = postList.filter(post => post.os === this.value)
        console.log("전체가 아니야!")
    }

    const html = matchArray.map(post => {
        return `
            <div>
                ${post.title}
                ${post.desc}
                ${post.tag}
                ${post.username}
            </div>
                `
    }).join('');

    // not empty
    if (selectField2.value) // if exist AND
    {   
        suggestions.innerHTML = html;
        console.log('select is:  ' + selectField2.value);
    }
}

function displaySolveMatches(){
    let matchArray = []

    if (this.value === "전체") {
        matchArray = postList
    } else {
        matchArray = postList.filter(post => post.problem_solving === this.value)
    }

    const html = matchArray.map(post => {
        return `
            <div>
                ${post.title}
                ${post.desc}
                ${post.tag}
                ${post.username}
            </div>
                `
    }).join('');

    // not empty
    if (selectField3.value) // if exist AND
    {   
        suggestions.innerHTML = html;
        console.log('select is:  ' + selectField3.value);
    }
}

function displayFrameWorkMatches(){
    let matchArray = []

    if (this.value === "전체") {
        matchArray = postList
    } else {
        matchArray = postList.filter(post => post.framework === this.value)
        console.log("전체가 아니야!")
    }

    const html = matchArray.map(post => {
        return `
            <div>
                ${post.title}
                ${post.desc}
                ${post.tag}
                ${post.username}
            </div>
                `
    }).join('');

    // not empty
    if (selectField4.value) // if exist AND
    {   
        suggestions.innerHTML = html;
        console.log('select is:  ' + selectField4.value);
    }
}

const checkEmpty = document.querySelector('.search');
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.post_container');

const selectField = document.querySelector('#id_field');
const selectField2 = document.querySelector('#id_field2');
const selectField3 = document.querySelector('#id_field3');
const selectField4 = document.querySelector('#id_field4');

searchInput.addEventListener('input', displayInputMatches);
selectField.addEventListener('change', displayLanguageMatches);
selectField2.addEventListener('change', displayOsMatches);
selectField3.addEventListener('change', displaySolveMatches);
selectField4.addEventListener('change', displayFrameWorkMatches);

function init() {
    getPost();
}
init();