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
    // console.log(scrapList);
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

// const YesScroll = () => {
//     const pagination = document.querySelector('.paginaiton');
//     const fullContent = document.querySelector('.post_card');
//     const screenHeight = screen.height;
//     let oneTime = false;

//     document.addEventListener('scroll',OnScroll,{passive:true})
//     function OnScroll () {
//         const fullHeight = fullContent.clientHeight;   
//         const scrollPosition = pageYOffset;
//         if (fullHeight-screenHeight/2 <= scrollPosition && !oneTime) 
//         {

// }

var count = 0;
//스크롤 바닥 감지
window.onscroll = function(e) {
    //추가되는 임시 콘텐츠
    //window height + window scrollY 값이 document height보다 클 경우,
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    	//실행할 로직 (콘텐츠 추가)
        count++;
        var addContent = '<div class="block"><p>'+ count +'번째로 추가된 콘텐츠</p></div>';
        // let addContent = getPostScrap()
        //article에 추가되는 콘텐츠를 append
        $('article').append(addContent);
    }
};


// let isEnd = false;
    
// $(function(){
//     $(window).scroll(function(){
//         let $window = $(this);
//         let scrollTop = $window.scrollTop();
//         let windowHeight = $window.height();
//         let documentHeight = $(document).height();
        
//         console.log("documentHeight:" + documentHeight + " | scrollTop:" + scrollTop + " | windowHeight: " + windowHeight );
        
//         // scrollbar의 thumb가 바닥 전 30px까지 도달 하면 리스트를 가져온다.
//         if( scrollTop + windowHeight + 100 > documentHeight ){
//             getPostScrap()
//         }
//     })
//     getPostScrap()
// })

// let fetchList = function(){
//     if(isEnd == true){
//         return;
//     }
    
//     // 방명록 리스트를 가져올 때 시작 번호
//     // renderList 함수에서 html 코드를 보면 <li> 태그에 data-no 속성이 있는 것을 알 수 있다.
//     // ajax에서는 data- 속성의 값을 가져오기 위해 data() 함수를 제공.
//     // let startNo = $("#list-guestbook li").last().data("no") || 0;
//     $.ajax({
//         url:"/posts/scrap_axios/",
//         // type: "GET",
//         dataType: "json",
//         success: function(result){
//             // 컨트롤러에서 가져온 방명록 리스트는 result.data에 담겨오도록 했다.
//             // 남은 데이터가 5개 이하일 경우 무한 스크롤 종료
//             console.log(result);
//             let length = result.data.length;
//             if( length < 1 ){
//                 isEnd = true;
//             }
//             $.each(result.data, function(index, vo){
//                 renderList(false, vo);
//             })
//         }
//     });
// }

// let renderList = function(mode, vo){
//     // 리스트 html을 정의
//     let html = "<li data-no='"+ vo.no +"'>" +
//         "<strong>"+ vo.title +"</strong>" +
//         "<p>"+ vo.desc.replace(/\n/gi, "<br>") +"</p>" +
//         "<strong></strong>" +
//         "<a href='#' data-no='"+ vo.no +"'>삭제</a>" +
//         "</li>"
    
//     if( mode ){
//         $("#list-guestbook").prepend(html);
//     }
//     else{
//         $("#list-guestbook").append(html);
//     }
// }