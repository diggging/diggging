// 언어별 폴더
const categoryTab = document.querySelector('.folder_area');
const langBtn = document.querySelector('.language_btn');
const frameworkBtn = document.querySelector('.framework_btn');

//폴더 뜨는 버튼
langBtn.addEventListener('click', () => {
    langBtn.style.background = "#FFBA42";
    frameworkBtn.style.background = "#FFD358";

    id =langBtn.value;
    var a = "https://diggging.com/questions/" + id
    var url = a + "/questions_lang_folder/"
    
    fetch(url, {
        method: "GET",
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => {

        if (data.length === 0) {
            categoryTab.innerHTML = ""
        } else {
            const txt = data.map(folder => {
                return `
                <button class="lang_post_btn" id="${folder.id}" value="${folder.id}">
                    <svg width="60" height="44" viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M54.375 7.33333H31.875L24.375 0H5.625C2.51836 0 0 2.4624 0 5.5V38.5C0 41.5376 2.51836 44 5.625 44H54.375C57.4816 44 60 41.5376 60 38.5V12.8333C60 9.79573 57.4816 7.33333 54.375 7.33333Z" fill="#FFE59C"/>
                    </svg>
                    <div class="folder_name">${folder.folder_name}</div>
                </button>     
                `
            }).join('')
            categoryTab.innerHTML = txt;
        }
        langPost()
    })
})

//글 뜨는 버튼
const langPost = () => {
    const langPostBtn = document.querySelectorAll('.lang_post_btn');
    const noAnswerListBox = document.querySelector('.no_answer_list_box');
    for(let i=0; i < langPostBtn.length; i++) {
        langPostBtn[i].addEventListener('click', () => {

            id =langPostBtn[i].value;
            var a = "https://diggging.com/questions/" + id
            var url = a + "/questions_lang_post/"
            fetch(url, {
                method: "GET",
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            })
            .then(res => res.json())
            .then(data => {
                 //글자 수 잘라주기
                
                let desc = [];
                for(j=0; j < data.data.length; j++) {
                    if(data.data[j].desc.length > 300) {
                        desc[j] = data.data[j].desc.slice(0, 100)
                        data.data[j].desc = desc[j]
                    } else {
                        data.data[j].desc = data.data[j].desc
                    }
                }
                
                const extractTextPattern = /(<([^>]+)>)/gi;
                // 태그 삭제하기
                let replaceDesc = [];
                for(k=0; k < data.data.length; k++) {
                    replaceDesc[k] = data.data[k].desc.replace(extractTextPattern, "")
                    data.data[k].desc = replaceDesc[k]
                }
                // console.log(replaceDesc)
                
                // 날짜 한글로 변환하기\
                let dateToKo = [];
                for(let l = 0; l < data.data.length; l++) {
                    dateToKo[l] = moment(data.data[0].created, 'YYYY-MM-DDTHH:mm:ssZ')
                    dateToKo[l].format('LLL')
                    data.data[l].created = dateToKo[l].format('LLL')
                }

                if (data.data.length === 0) {
                    noAnswerListBox.innerHTML = ""
                } else {
                    const txt = data.data.map(post => {
                        let img = "/media/" + post.image
                        return `
                        <a href="https://diggging.com/questions/${post.user_id}/${post.id}/detail">
                            <div class="no_answer_list_json" value="">
                                <div class="no_answer_titlebox">
                                    <div class="no_answer_title">${post.title}</div>
                                    <a href="https://diggging.com/users/${post.user_id}/my_page/" class="">
                                        <div class="no_user_info">
                                            <span class="no_answer_username_json">${data.user[0]}</span>
                                        </div>
                                    </a>
                                </div>
                                <span class="no_answer_desc">${post.desc}</span>
                                <span class="no_answer_category">
                                    <span>${post.language}</span>
                                    <span>${post.framework}</span>
                                    <span>${post.os}</span>
                                    <div class="no_answer_created">
                                        <h5>${post.created}</h5>
                                    </div>
                                </span>
                            </div>
                        </a>
                        `
                    }).join('')
                    noAnswerListBox.innerHTML = txt;
                }
            })
        });
    }
}


//프레임 워크
//폴더 뜨는 버튼
    frameworkBtn.addEventListener('click', () => {
        langBtn.style.background = "#FFD358";
        frameworkBtn.style.background = "#FFBA42";
        id =frameworkBtn.value;
        var a = "https://diggging.com/questions/" + id
        var url = a + "/questions_framework_folder/"
        
        fetch(url, {
            method: "GET",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                categoryTab.innerHTML = ""
            } else {
                
                const txt = data.map(folder => {
                    return `
                    <button class="framework_post_btn" id="${folder.id}" value="${folder.id}">
                    <svg width="60" height="44" viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M54.375 7.33333H31.875L24.375 0H5.625C2.51836 0 0 2.4624 0 5.5V38.5C0 41.5376 2.51836 44 5.625 44H54.375C57.4816 44 60 41.5376 60 38.5V12.8333C60 9.79573 57.4816 7.33333 54.375 7.33333Z" fill="#FFE59C"/>
                    </svg>
                        ${folder.folder_name}
                    </button>    
                    `
                }).join('')
                categoryTab.innerHTML = txt;
            }
            framePost()
        })
    })
//글 뜨는 버튼
const framePost = () => {
    const framePostBtn = document.querySelectorAll('.framework_post_btn');
    const noAnswerListBox = document.querySelector('.no_answer_list_box');
    for(let i=0; i < framePostBtn.length; i++) {
        framePostBtn[i].addEventListener('click', () => {

            id =framePostBtn[i].value;
            var a = "https://diggging.com/questions/" + id
            var url = a + "/questions_framework_post/"
            
            fetch(url, {
                method: "GET",
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            })
            .then(res => res.json())
            .then(data => {

                let desc = [];
                for(j=0; j < data.data.length; j++) {
                    if(data.data[j].desc.length > 300) {
                        desc[j] = data.data[j].desc.slice(0, 100)
                        data.data[j].desc = desc[j]
                    } else {
                        data.data[j].desc = data.data[j].desc
                    }
                }
                
                const extractTextPattern = /(<([^>]+)>)/gi;
                // 태그 삭제하기
                let replaceDesc = [];
                for(k=0; k < data.data.length; k++) {
                    replaceDesc[k] = data.data[k].desc.replace(extractTextPattern, "")
                    data.data[k].desc = replaceDesc[k]
                }
                // console.log(replaceDesc)
                
                // 날짜 한글로 변환하기\
                let dateToKo = [];
                for(let l = 0; l < data.data.length; l++) {
                    dateToKo[l] = moment(data.data[0].created, 'YYYY-MM-DDTHH:mm:ssZ')
                    dateToKo[l].format('LLL')
                    data.data[l].created = dateToKo[l].format('LLL')
                }
                
                if (data.data.length === 0) {
                    noAnswerListBox.innerHTML = ""
                } else {
                    const txt = data.data.map(post => {
                        let img = "/media/" + post.image
                        return `
                        <a href="https://diggging.com/questions/${post.user_id}/${post.id}/detail">
                            <div class="no_answer_list_json" value="">
                                <div class="no_answer_titlebox">
                                    <div class="no_answer_title">${post.title}</div>
                                    <a href="https://diggging.com/users/${post.user_id}/my_page/" class="">
                                        <div class="no_user_info">
                                            <span class="no_answer_username_json">${data.user[0]}</span>
                                        </div>
                                    </a>
                                </div>
                                <span class="no_answer_desc">${post.desc}</span>
                                <span class="no_answer_category">
                                    <span>${post.language}</span>
                                    <span>${post.framework}</span>
                                    <span>${post.os}</span>
                                    <div class="no_answer_created">
                                        <h5>${post.created}</h5>
                                    </div>
                                </span>
                            </div>
                        </a>
                        `
                    }).join('')
                    noAnswerListBox.innerHTML = txt;
                }
            })
        });
    }
}
