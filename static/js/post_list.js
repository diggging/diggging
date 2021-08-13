const scrapList = []; // post data 추출용
const helpedList = [];
const followList = [];
const recentList = [];

let scrapPost = []; // post fields
let helpedPost =[];
let followPost = [];
let recentPost = [];

let list = [];

const requestLike = new XMLHttpRequest();

const onClickLike = (id) => {
    const url = '/posts/scrap_axios/';
    requestLike.open('POST', url, true); // post 방식으로 url에 보낼거다(true)
    requestLike.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded'
);
requestLike.send(JSON.stringify({id:id})); // JSON 형식으로 보내줘야 한다.
}; // like_ajax views에 request

const likeHandleResponse = () => {
    if(requestLike.status < 400) {
        const {id} = JSON.parse(requestLike.response) // views에서 보내주는 response
        const element = document.querySelector(`.post_container`)
        // const originHTML = element.innerHTML
        // const [buttonType, num] = originHTML.split(' ')
        // const count = Number(num) + 1

        // element.innerHTML = `<div class=".${id}">
        //                         <div >{{post.title}}</div>
        //                         <div >{{post.desc}}</div>
        //                         <div >{{post.user}}</div>
        //                     </div>`
        element.innerHTML = `${id}`
    }
}

requestLike.onreadystatechange = () => {
    if(requestLike.readyState === XMLHttpRequest.DONE) {
        likeHandleResponse()
    }
}

// scrap
// const getPostScrap = async(id) => {
//     const url = '/posts/scrap_axios/';
//     const {data} = await axios.post(url, {
//         id
//     })
//     console.log(data)
//     likeHandleResponse(data.id)
//     // const postData = await axios.post(url);
//     // scrapList.push(postData.data)
    
//     // for (let i=0; i < scrapList[0].length; i++) {
//     //     scrapPost.push(scrapList[0][i].fields);
//     // }
//     // console.log(scrapList);
//     // displayScrap();
//     // scrapPost = [];
// }

// const likeHandleResponse = (id) => {
//     const element = document.querySelector('.post_container')
//     console.log(element)
//     // const html = element.innerHTML

//     // element.innerHTML = `${id}`
//     element.innerHTML = `
//     <div class=".${id}">
//         <div >{{post.title}}</div>
//         <div >{{post.desc}}</div>
//         <div >{{post.user}}</div>
//     </div>
//     `

// }

const displayScrap = () => {
    const element = document.querySelector('.post_container');
    const html = scrapPost.map(post => {
        return `
        <div class="post_card">
        <a href="{% url 'posts:post_detail' user_id=post.user.id post_id=post.id %}" class="post_image">
            <div class="post_image_container">
            {% if post.image %}
                <img src="${post.image}" alt="" class="post_image_container">
            {% endif %}
            </div>
        </a>
        <div class="post_element">
            <a href="{% url 'posts:post_detail' user_id=post.user.id post_id=post.id %}" class="post_link">
                <div class="post_title">
                    ${post.title}
                </div>
                <div class="post_tag">
                    # ${post.tag}
                </div>
                <p class="post_desc">
                    ${post.desc}
                </p>
            </a>
        </div>
        <div class="post_user">
            <a href="{% url 'users:my_page' post.user.id %}" class="user_info">
            {% if post.user.user_profile_image %}    
                <img src="{{post.user.user_profile_image.url}}" class="user_info_image">
            {% endif %}
                <span>
                    ${post.user}
                </span>
            </a>

            <div class="likes">
                👍
                <div class="likes_count">
                    ${post.scrap_num}
                </div>
            </div>
        </div>
    </div>
        `
    })

    element.innerHTML = html
}

// helped
const getPostHelped = async() => {
    const url = '/posts/helped_axios/';
    const postData = await axios.get(url);
    helpedList.push(postData.data)
    
    for (let i=0; i < helpedList[0].length; i++) {
        helpedPost.push(helpedList[0][i].fields);
    }
    console.log(postData)
    displayhelped();
    helpedPost = [];
}

const displayhelped = () => {
    const element = document.querySelector('.post_container');
    const html = helpedPost.map(post => {
        return `
        <div class="post_card">
            <a href="{% url 'posts:post_detail' user_id=post.user.id post_id=post.id %}" class="post_image">
                <div class="post_image_container">
                {% if post.image %}
                    <img src="${post.image}" alt="" class="post_image_container">
                {% endif %}
                </div>
            </a>
            <div class="post_element">
                <a href="{% url 'posts:post_detail' user_id=post.user.id post_id=post.id %}" class="post_link">
                    <div class="post_title">
                        ${post.title}
                    </div>
                    <div class="post_tag">
                        # ${post.tag}
                    </div>
                    <p class="post_desc">
                        ${post.desc}
                    </p>
                </a>
            </div>
            <div class="post_user">
                <a href="{% url 'users:my_page' post.user.id %}" class="user_info">
                {% if post.user.user_profile_image %}    
                    <img src="{{post.user.user_profile_image.url}}" class="user_info_image">
                {% endif %}
                    <span>
                        ${post.user}
                    </span>
                </a>

                <div class="likes">
                    👍
                    <div class="likes_count">
                        ${post.scrap_num}
                    </div>
                </div>
            </div>
        </div>
        `
    })

    element.innerHTML = html
}

// following
const getPostfollow = async() => {
    const url = '/posts/follow_axios/';
    const postData = await axios.post(url);
    followList.push(postData.data)
    
    for (let i=0; i < followList[0].length; i++) {
        followPost.push(followList[0][i].fields);
        }
    
    displayFollow();
    followPost = [];
}

const displayFollow = () => {
    const element = document.querySelector('.post_container');
    const html = followPost.map(post => {
        return `
        <div class="post_card">
            <a href="{% url 'posts:post_detail' user_id=post.user.id post_id=post.id %}" class="post_image">
                <div class="post_image_container">
                {% if post.image %}
                    <img src="${post.image}" alt="" class="post_image_container">
                {% endif %}
                </div>
            </a>
            <div class="post_element">
                <a href="{% url 'posts:post_detail' user_id=post.user.id post_id=post.id %}" class="post_link">
                    <div class="post_title">
                        ${post.title}
                    </div>
                    <div class="post_tag">
                        # ${post.tag}
                    </div>
                    <p class="post_desc">
                        ${post.desc}
                    </p>
                </a>
            </div>
            <div class="post_user">
                <a href="{% url 'users:my_page' post.user.id %}" class="user_info">
                {% if post.user.user_profile_image %}    
                    <img src="{{post.user.user_profile_image.url}}" class="user_info_image">
                {% endif %}
                    <span>
                        ${post.user}
                    </span>
                </a>

                <div class="likes">
                    👍
                    <div class="likes_count">
                        ${post.scrap_num}
                    </div>
                </div>
            </div>
        </div>
        `
    })

    element.innerHTML = html
}

//my recent
const getPostRecent = async() => {
    const url = '/posts/my_recent_axios/';
    const postData = await axios.post(url);
    recentList.push(postData.data)
    for (let i=0; i < recentList[0].length; i++) {
        recentPost.push(recentList[0][i].fields);
        }
    
    displayPost();
    recentPost = [];
}

const displayPost = () => {
    const element = document.querySelector('.post_container');
    const html = recentPost.map(post => {
        return `
        <div class="post_card">
            <a href="{% url 'posts:post_detail' user_id=post.user.id post_id=post.id %}" class="post_image">
                <div class="post_image_container">
                {% if post.image %}
                    <img src="${post.image}" alt="" class="post_image_container">
                {% endif %}
                </div>
            </a>
            <div class="post_element">
                <a href="{% url 'posts:post_detail' user_id=post.user.id post_id=post.id %}" class="post_link">
                    <div class="post_title">
                        ${post.title}
                    </div>
                    <div class="post_tag">
                        # ${post.tag}
                    </div>
                    <p class="post_desc">
                        ${post.desc}
                    </p>
                </a>
            </div>
            <div class="post_user">
                <a href="{% url 'users:my_page' post.user.id %}" class="user_info">
                {% if post.user.user_profile_image %}    
                    <img src="{{post.user.user_profile_image.url}}" class="user_info_image">
                {% endif %}
                    <span>
                        ${post.user}
                    </span>
                </a>

                <div class="likes">
                    👍
                    <div class="likes_count">
                        ${post.scrap_num}
                    </div>
                </div>
            </div>
        </div>
        `
    })

    element.innerHTML = html
}

