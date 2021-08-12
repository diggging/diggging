const list = [];
const postList = []; //post fields
const postIdList = []; // post id

const getPost = async() => {
    const url = '/posts/search_axios/';
    const postData = await axios.get(url)
    list.push(postData.data);
    
    for (let i=0; i < list[0].length; i++) {
        postList.push(list[0][i].fields);
    }

    for (let i=0; i < list[0].length; i++) {
        postIdList.push(list[0][i].pk);
    }
    console.log(postList);
    console.log(postIdList);
    console.log(list);
    return postList, postIdList
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function findMatches(wordToMatch, postList) {
    return postList.filter(post => {
        const regex = new RegExp(wordToMatch, 'gi') //패턴을 사용해 텍스트를 판별할 때 사용하는 정규 표현식 객체를 생성
        // return post.title.match(regex) || post.desc.match(regex);
        return post.title.match(regex) || post.desc.match(regex) || post.tag.match(regex)
    });
}

function displayMatches(){
    const matchArray = findMatches(this.value, postList);
    const html = matchArray.map(post => {
        const regex = new RegExp(this.value, 'gi');
        const title = post.title.replace(regex, this.value);
        const desc = post.desc.replace(regex, this.value);
        const tag = post.tag.replace(regex, this.value);
        console.log(tag)

        return `
                <div class="post_card">
                    <a href="{% url 'posts:post_detail' user_id=post.user.id post_id=post.id %}" class="post_image">
                        <div class="post_image_container">
                            {% if post.image %}
                                <img src="{{post.image.url}}" alt="" class="post_image_container">
                            {% endif %}
                        </div>
                    </a>

                    <div class="post_element">
                        <a href="{% url 'posts:post_detail' user_id=post.user.id post_id=post.id %}" class="post_link">
                            <div class="post_title">
                                ${title}
                            </div>
                            <div class="post_tag">
                                # ${tag}
                            </div>
                            <p class="post_desc">
                                ${desc}
                            </p>
                        </a>
                    </div>

                    <div class="post_user">
                        <a href="{% url 'users:my_page' post.user.id %}" class="user_info">
                            <div class="user_info_image">
                                {% if post.user.user_profile_image %}
                                    <img src="{{post.user.user_profile_image.url}}" class="user_info_image">
                                {% endif %}
                            </div>
                            <span>
                                by {{post.user}}
                            </span>
                        </a>

                        <div class="likes">
                            👍
                            <div class="likes_count">
                                24
                            </div>
                        </div>
                    </div>
                </div>
        `
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.post_container');

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


// <li>
// <span class="name">${title}</span>
// <span class="population">${numberWithCommas(post.title)}</span>
// </li>