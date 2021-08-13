const scrapList = []; // post data 추출용
const helpedList = [];
const followList = [];
const recentList = [];

let scrapPost = []; // post fields
let helpedPost =[];
let followPost = [];
let recentPost = [];

let list = [];

// scrap
const getPostScrap = async() => {
    const url = '/posts/scrap_axios/';
    const postData = await axios.post(url);
    scrapList.push(postData.data)
    
    for (let i=0; i < scrapList[0].length; i++) {
        scrapPost.push(scrapList[0][i].fields);
    }
    console.log(scrapList);
    displayScrap();
    // scrapPost = [];
}

const morePostScrap = async() => {
    const url = '/posts/scrap_axios/';
    const data = await axios.post(url);
    

}

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

