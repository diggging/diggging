// 언어별 폴더
const categoryTab = document.querySelector('.folder_area');
const langBtn = document.querySelector('.language_btn');

//폴더 뜨는 버튼
langBtn.addEventListener('click', () => {
    id =langBtn.value;
    var a = "http://127.0.0.1:8000/questions/" + id
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
            categoryTab.innerHTML = "폴더없음"
        } else {
            const txt = data.map(folder => {
                return `
                <button class="lang_post_btn" id="${folder.id}" value="${folder.id}">
                    <i class="far fa-folder folder_icon fa-3x"></i>
                    ${folder.folder_name}
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
            var a = "http://127.0.0.1:8000/questions/" + id
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
                console.log(data)
                if (data.length === 0) {
                    noAnswerListBox.innerHTML = "파일없음"
                } else {
                    const txt = data.map(post => {
                        return `
                        ${post.title}    
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
const frameworkBtn = document.querySelector('.framework_btn');
    frameworkBtn.addEventListener('click', () => {
        id =frameworkBtn.value;
        var a = "http://127.0.0.1:8000/questions/" + id
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
                    <button class="framework_post_btn" id="${folder.id}" value="${folder.id}">
                        <i class="far fa-folder folder_icon fa-3x"></i>
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
            var a = "http://127.0.0.1:8000/questions/" + id
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

                if (data.length === 0) {
                    noAnswerListBox.innerHTML = "파일없음"
                } else {
                    const txt = data.map(post => {
                        return `
                        ${post}
                        `
                    }).join('')
                    noAnswerListBox.innerHTML = txt;
                }
            })
        });
    }
}

