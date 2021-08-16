// search input
const searchField =document.querySelector('#search_input');
const searchContainer = document.querySelector('.search_container');

searchField.addEventListener('keyup', (e) => {
    const searchValue = e.target.value;

    if(searchValue.trim().length > 0) {
        console.log('searchValue', searchValue);

        fetch('/posts/search_input/', {
            body: JSON.stringify({text:searchValue}),
            method: "POST",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then((res) => res.json())
            .then((data) => {
            console.log(data)
            if (data.length === 0){
                searchContainer.innerHTML = "검색어와 맞는 글이 없어요"
            } else {
                const txt = data.map(post => {
                    return  `
                        ${post.title}
                        ${post.desc}
                    `
                })
                searchContainer.innerHTML = txt;
            }
            })
    } else {

        searchContainer.innerHTML = "검색해주셈"
    }
})




let baseUrl = "{% url 'posts:scrap_axios' %}"; //baseUrl만 바꿔주면 동기가 될꺼 같은데?
    const a = () => {
        const baseUrl = "{% url 'posts:scrap_axios' %}";
        return baseUrl;
    }

    const b = () => {
        const baseUrl = "{% url 'posts:helped_axios' %}";
        return baseUrl;
    }
    
    const c = () => {
        const baseUrl = "{% url 'posts:follow_axios' %}";
        return baseUrl;
    }
    const d = () => {
        const baseUrl = "{% url 'posts:my_recent_axios' %}";
        return baseUrl;
    }

    document.addEventListener('DOMContentLoaded', () => {
        console.log( 'document was not ready, place code here' );
        let bottomSentinal = document.querySelector("#bottom-sentinel");
        let scrollElement = document.querySelector("#scroll-element");
        
        attachInfiniteScroll(bottomSentinal, scrollElement, baseUrl);
        console.log(baseUrl);
    });