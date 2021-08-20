// 언어별 폴더
const logFolderBtn = document.getElementById('log_folder_btn');
const categoryTab = document.querySelector('.folder_category');
const btnTap = document.getElementById('btn_tap');

const langBtn = document.querySelector('.language_btn');

langBtn.addEventListener('click', () => {
    id =langBtn.value;
    var a = "http://127.0.0.1:8000/users/" + id
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
        console.log(data)
        if (data.length === 0) {
            categoryTab.innerHTML = "폴더없음"
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
            var a = "http://127.0.0.1:8000/users/" + id
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

                let desc = [];
                for(i=0; i < data.length; i++) {
                    if(data[i].desc.length > 300) {
                        desc[i] = data[i].desc.slice(0, 300)
                    }
                }
                const extractTextPattern = /(<([^>]+)>)/gi;

                let replaceDesc = [];
                for(i=0; i < desc.length; i++) {
                    replaceDesc[i] = desc[i].replace(extractTextPattern, "")
                }

                if (data.length === 0) {
                    thirdContainer.innerHTML = "파일없음"
                } else {
                    const txt = data.map(post => {
                        return `
                        <div class="my_post_list">
                            <div class="post_title">
                                ${post.title}
                            </div>
                            <div class="post_desc">
                                ${replaceDesc}
                            </div>
                            <div class="post_user">
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
                        `
                    }).join('')
                    thirdContainer.innerHTML = txt;
                }
            })
        });
    }
}


//프레임 워크
const frameworkBtn = document.querySelector('.framework_btn');
    frameworkBtn.addEventListener('click', () => {
        id =frameworkBtn.value;
        var a = "http://127.0.0.1:8000/users/" + id
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
                categoryTab.innerHTML = "폴더없음"
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
            framePost()
        })
    })

const framePost = () => {
    const framePostBtn = document.querySelectorAll('.framework_post_btn');
    const thirdContainer = document.querySelector('.third_container');
    for(let i=0; i < framePostBtn.length; i++) {
        framePostBtn[i].addEventListener('click', () => {

            id =framePostBtn[i].value;
            var a = "http://127.0.0.1:8000/users/" + id
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
                for(i=0; i < data.length; i++) {
                    if(data[i].desc.length > 300) {
                        desc[i] = data[i].desc.slice(0, 300)
                    }
                }
                const extractTextPattern = /(<([^>]+)>)/gi;

                let replaceDesc = [];
                for(i=0; i < desc.length; i++) {
                    replaceDesc[i] = desc[i].replace(extractTextPattern, "")
                }

                if (data.length === 0) {
                    thirdContainer.innerHTML = "파일없음"
                } else {
                    const txt = data.map(post => {
                        return `
                        <div class="my_post_list">
                            <div class="post_title">
                                ${post.title}
                            </div>
                            <div class="post_desc">
                                ${replaceDesc}
                            </div>
                            <div class="post_user">
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
                        `
                    }).join('')
                    thirdContainer.innerHTML = txt;
                }
            })
        });
    }
}

