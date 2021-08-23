// 언어별 폴더
const logFolderBtn = document.getElementById('log_folder_btn');
const categoryTab = document.querySelector('.folder_category');
const btnTap = document.getElementById('btn_tap');

const langBtn = document.querySelector('.language_btn');
const frameworkBtn = document.querySelector('.framework_btn');
const problemBtn = document.querySelector('.problem_btn');

langBtn.addEventListener('click', () => {
    langBtn.style.background = "#FFBA42";
    frameworkBtn.style.background = "#FFD358";
    problemBtn.style.background = "#FFD358";

    id =langBtn.value;
    var a = "https://diggging.com/users/" + id
    var url = a + "/lang_folder/"
    
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

const langPost = () => {
    const langPostBtn = document.querySelectorAll('.lang_post_btn');
    const thirdContainer = document.querySelector('.third_container');
    for(let i=0; i < langPostBtn.length; i++) {
        langPostBtn[i].addEventListener('click', () => {

            id =langPostBtn[i].value;
            var a = "https://diggging.com/users/" + id
            var url = a + "/lang_folder_posts/"
            fetch(url, {
                method: "GET",
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            })
            // title, desc, scrap, help // username, userprofile, comments
            .then(res => res.json())
            .then(data => {
                
                //글자 수 잘라주기
                let desc = [];
                for(j=0; j < data.length; j++) {
                    if(data[j].desc.length > 300) {
                        desc[j] = data[j].desc.slice(0, 200)
                        data[j].desc = desc[j]
                    }
                }
                
                const extractTextPattern = /(<([^>]+)>)/gi;
                // 태그 삭제하기
                let replaceDesc = [];
                for(k=0; k < desc.length; k++) {
                        replaceDesc[k] = data[k].desc.replace(extractTextPattern, "")
                }

                // 날짜 한글로 변환하기\
                let dateToKo = [];
                for(let l = 0; l < data.length; l++) {
                    dateToKo[l] = moment(data[0].created, 'YYYY-MM-DDTHH:mm:ssZ')
                    dateToKo[l].format('LLL')
                    data[l].created = dateToKo[l].format('LLL')
                }

                if (data.length === 0) {
                    thirdContainer.innerHTML = ""
                } else {
                    const txt = data.map(post => {
                        return `
                    <a class="post_link" href="https://diggging.com/posts/${post.user_id}/${post.id}/detail">
                        <div class="my_post_list">
                            <div class="post_title">
                                ${post.title}
                            </div>
                            <div class="post_desc">
                                ${replaceDesc}
                            </div>
                            <div class="post_user">
                                <div class="post_created">
                                    ${post.created}
                                </div>
                                <div class="scrap_num">
                                    <span class="bold">스크랩</span>
                                    ${post.scrap_num}
                                </div>
                                <div class="helped_num">
                                    <span class="bold">도움</span>
                                    ${post.helped_num}
                                </div>
                            </div>
                        </div>
                    </a>
                        `
                    }).join('')
                    thirdContainer.innerHTML = txt;
                }
            })
        });
    }
}


//해결 미해결


problemBtn.addEventListener('click', () => {
    langBtn.style.background = "#FFD358";
    frameworkBtn.style.background = "#FFD358";
    problemBtn.style.background = "#FFBA42";

    id =problemBtn.value;
    var a = "https://diggging.com/users/" + id
    var url = a + "/solved_folder/"
    
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
                <button class="problem_post_btn" id="${folder.id}" value="${folder.id}">
                    <svg width="60" height="44" viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M54.375 7.33333H31.875L24.375 0H5.625C2.51836 0 0 2.4624 0 5.5V38.5C0 41.5376 2.51836 44 5.625 44H54.375C57.4816 44 60 41.5376 60 38.5V12.8333C60 9.79573 57.4816 7.33333 54.375 7.33333Z" fill="#FFE59C"/>
                    </svg>
                    <div class="folder_name">${folder.folder_name}</div>
                </button>
                `
            }).join('')
            categoryTab.innerHTML = txt;
        }
        problemPost()
    })
})

const problemPost = () => {
    const problemBtn = document.querySelectorAll('.problem_post_btn');
    const thirdContainer = document.querySelector('.third_container');
    for(let i=0; i < problemBtn.length; i++) {
        problemBtn[i].addEventListener('click', () => {

            id =problemBtn[i].value;
            var a = "https://diggging.com/users/" + id
            var url = a + "/solved_folder_posts/"
            
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
                for(j=0; j < data.length; j++) {
                    if(data[j].desc.length > 300) {
                        desc[j] = data[j].desc.slice(0, 200)
                        data[j].desc = desc[j]
                    }
                }
                
                const extractTextPattern = /(<([^>]+)>)/gi;
                // 태그 삭제하기
                let replaceDesc = [];
                for(k=0; k < desc.length; k++) {
                        replaceDesc[k] = data[k].desc.replace(extractTextPattern, "")
                }

                // 날짜 한글로 변환하기\
                let dateToKo = [];
                for(let l = 0; l < data.length; l++) {
                    dateToKo[l] = moment(data[0].created, 'YYYY-MM-DDTHH:mm:ssZ')
                    dateToKo[l].format('LLL')
                    data[l].created = dateToKo[l].format('LLL')
                }

                if (data.length === 0) {
                    thirdContainer.innerHTML = "";
                } else {
                    const txt = data.map(post => {
                        return `
                        <a class="post_link" href="https://diggging.com/posts/${post.user_id}/${post.id}/detail">
                            <div class="my_post_list">
                                <div class="post_title">
                                    ${post.title}
                                </div>
                                <div class="post_desc">
                                    ${replaceDesc}
                                </div>
                                <div class="post_user">
                                    <div class="post_created">
                                        ${post.created}
                                    </div>
                                    <div class="scrap_num">
                                        <span class="bold">스크랩</span>
                                        ${post.scrap_num}
                                    </div>
                                    <div class="helped_num">
                                        <span class="bold">도움</span>
                                        ${post.helped_num}
                                    </div>
                                </div>
                            </div>
                        </a>
                        `
                    }).join('')
                    thirdContainer.innerHTML = txt;
                }
            })
        });
    }
}

//프레임 워크
    frameworkBtn.addEventListener('click', () => {
        langBtn.style.background = "#FFD358";
        frameworkBtn.style.background = "#FFBA42";
        problemBtn.style.background = "#FFD358";

        id =frameworkBtn.value;
        var a = "https://diggging.com/users/" + id
        var url = a + "/framework_folder/"
        
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
                        <div class="folder_name">${folder.folder_name}</div>
                    </button>      
                    `
                }).join('')
                categoryTab.innerHTML = txt;
            }
            framePost()
        })
    })

const framePost = () => {
    const framePostBtn = document.querySelectorAll('.framework_post_btn');
    const thirdContainer = document.querySelector('.third_container');
    for(let i=0; i < framePostBtn.length; i++) {
        framePostBtn[i].addEventListener('click', () => {

            id =framePostBtn[i].value;
            var a = "https://diggging.com/users/" + id
            var url = a + "/framework_folder_posts/"
            
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
                for(j=0; j < data.length; j++) {
                    if(data[j].desc.length > 300) {
                        desc[j] = data[j].desc.slice(0, 200)
                        data[j].desc = desc[j]
                    }
                }
                
                const extractTextPattern = /(<([^>]+)>)/gi;
                // 태그 삭제하기
                let replaceDesc = [];
                for(k=0; k < desc.length; k++) {
                        replaceDesc[k] = data[k].desc.replace(extractTextPattern, "")
                }

                // 날짜 한글로 변환하기\
                let dateToKo = [];
                for(let l = 0; l < data.length; l++) {
                    dateToKo[l] = moment(data[0].created, 'YYYY-MM-DDTHH:mm:ssZ')
                    dateToKo[l].format('LLL')
                    data[l].created = dateToKo[l].format('LLL')
                }

                if (data.length === 0) {
                    thirdContainer.innerHTML = ""
                } else {
                    const txt = data.map(post => {
                        return `
                    <a class="post_link" href="https://diggging.com/posts/${post.user_id}/${post.id}/detail">
                        <div class="my_post_list">
                            <div class="post_title">
                                ${post.title}
                            </div>
                            <div class="post_desc">
                                ${replaceDesc}
                            </div>
                            <div class="post_user">
                                <div class="post_created">
                                    ${post.created}
                                </div>
                                <div class="scrap_num">
                                    <span class="bold">스크랩</span>
                                    ${post.scrap_num}
                                </div>
                                <div class="helped_num">
                                    <span class="bold">도움</span>
                                    ${post.helped_num}
                                </div>
                            </div>
                        </div>
                    </a>
                        `
                    }).join('')
                    thirdContainer.innerHTML = txt;
                }
            })
        });
    }
}

