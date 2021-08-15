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