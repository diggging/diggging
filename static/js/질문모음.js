//언어별 폴더
const questionFolderBtn = document.getElementById('question_folder_btn');

const questionsBtnReset = (host_id) => {
    btnTap.innerHTML = `
            <button id="questions_language_btn" value="${host_id}">언어</button>
            <button id="questions_problem_btn" value="${host_id}">해결/미해결</button>
            <button id="questions_framework_btn" value="${host_id}">프레임워크</button>
        `
}  

const setClassQuestions = () => {
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');

    btn1.setAttribute('class', 'questions_language_btn');
    btn2.setAttribute('class', 'questions_problem_btn');
    btn3.setAttribute('class', 'questions_framework_btn');
}  


questionFolderBtn.addEventListener('click', () => {
    id = questionFolderBtn.value;
    var a = "http://127.0.0.1:8000/users/" + id
    var url = a + "/questions_folder/"
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
        setClassQuestions()
        abc()
        if (data.length === 0) {
            categoryTab.innerHTML = "폴더없음"
        } else {
            const txt = data.map(folder => {
                return `
                <button class="lang_post_btn" id="${folder.id}" value="${folder.id}">
                    ${folder.folder_name}
                </button>
                엥  
                `
            })
            categoryTab.innerHTML = txt;
        }
    })
})

const a = () => {
    const questionsLangBtn = document.querySelector('.questions_language_btn')
    console.log(questionsLangBtn)
    questionsLangBtn.addEventListener('click', () => {
    console.log(questionsLangBtn)
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
        console.log(data);
        if (data.length === 0) {
            categoryTab.innerHTML = "폴더없음"
        } else {
            const txt = data.map(folder => {
                return `
                <button class="lang_post_btn" id="${folder.id}" value="${folder.id}">
                    ${folder.folder_name}
                    엥????
                </button>    
                `
            })
            categoryTab.innerHTML = txt;
        }
        langPost()
    })
})
}
    



