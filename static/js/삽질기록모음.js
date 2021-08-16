// 언어별 폴더
const logFolderBtn = document.getElementById('log_folder_btn');
const categoryTab = document.querySelector('.folder_category');
const btnTap = document.getElementById('btn_tap');

console.log(btnTap.childElementCount)

const removeId = () => {
    while (btnTap.hasChildNodes()) {
        btnTap.removeChild(btnTap.firstChild);
    }
}  

const createId = (id) => {
    const idName = ['language_btn', 'problem_btn', 'framework_btn'];
    const idText = ['언어', '해결/미해결', '프레임워크'];
    for(let i=0; i < 3; i++) {
        let btn = document.createElement('button');
        btn.setAttribute('id', idName[i]);
        btn.setAttribute('value', id);
        let btnText = document.createTextNode(idText[i]);
        btn.appendChild(btnText);
        btnTap.appendChild(btn);
    }
}

logFolderBtn.addEventListener('click', () => {
    //url를 user.pk로 설정해줘야 한다.
    id =logFolderBtn.value;
    
    var a = "http://127.0.0.1:8000/users/" + id
    var url = a + "/digging_folder/"
    
    fetch(url, {
        method: "GET",
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => {
        removeId()
        createId(id)
        console.log(data)
        if (data.length === 0) {
            categoryTab.innerHTML = "폴더없음"
        } else {
            const txt = data.map(folder => {
                return `
                <button class="lang_post_btn" id="${folder.id}" value="${folder.id}">
                    ${folder.folder_name}
                </button>    
                `
            })
            categoryTab.innerHTML = txt;
        }
        langPost()
    })
})

const langBtn = document.getElementById('language_btn');

langBtn.addEventListener('click', () => {
    id =langBtn.value;
    var a = "http://127.0.0.1:8000/users/" + id
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
        console.log(data);

        if (data.length === 0) {
            categoryTab.innerHTML = "폴더없음"
        } else {
            const txt = data.map(folder => {
                return `
                <button class="lang_post_btn" id="${folder.id}" value="${folder.id}">
                    ${folder.folder_name}
                </button>    
                `
            })
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
            console.log(langPostBtn[i])

            id =langPostBtn[i].value;
            var a = "http://127.0.0.1:8000/users/" + id
            var url = a + "/lang_folder_posts/"
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
                    thirdContainer.innerHTML = "파일없음"
                } else {
                    const txt = data.map(post => {
                        return `
                        ${post.title}    
                        `
                    })
                    thirdContainer.innerHTML = txt;
                }
            })
        });
    }
}

//해결 미해결

const problemBtn = document.getElementById('problem_btn');

problemBtn.addEventListener('click', () => {
    id =problemBtn.value;

    var a = "http://127.0.0.1:8000/users/" + id
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
        console.log(data)

        if (data.length === 0) {
            categoryTab.innerHTML = "폴더없음"
        } else {
            const txt = data.map(folder => {
                return `
                <button class="problem_post_btn" id="${folder.id}" value="${folder.id}">
                    ${folder.folder_name}
                </button>    
                `
            })
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
            console.log(problemBtn[i])

            id =problemBtn[i].value;
            var a = "http://127.0.0.1:8000/users/" + id
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
                console.log(data)
                if (data.length === 0) {
                    thirdContainer.innerHTML = "파일없음";
                } else {
                    const txt = data.map(post => {
                        return `
                        ${post.title}    
                        `
                    })
                    thirdContainer.innerHTML = txt;
                }
            })
        });
    }
}

//프레임 워크
const frameworkBtn = document.getElementById('framework_btn');
    frameworkBtn.addEventListener('click', () => {
        id =frameworkBtn.value;
        var a = "http://127.0.0.1:8000/users/" + id
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
            console.log(data[0].folder_name)
            if (data.length === 0) {
                categoryTab.innerHTML = "폴더없음"
            } else {
        
                const txt = data.map(folder => {
                    return `
                    <button class="framework_post_btn" id="${folder.id}" value="${folder.id}">
                        ${folder.folder_name}
                    </button>    
                    `
                })
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
            console.log(framePostBtn[i])

            id =framePostBtn[i].value;
            var a = "http://127.0.0.1:8000/users/" + id
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
                console.log(data)
                if (data.length === 0) {
                    thirdContainer.innerHTML = "파일없음"
                } else {
                    const txt = data.map(post => {
                        return `
                        ${post.title}    
                        `
                    })
                    thirdContainer.innerHTML = txt;
                }
            })
        });
    }
}

