//언어별 폴더
const questionFolderBtn = document.getElementById('question_folder_btn');

const questionsBtnReset = (host_id) => {
    btnTap.innerHTML = `
            <button id="questions_language_btn" value="${host_id}">언어</button>
            <button id="questions_problem_btn" value="${host_id}">해결/미해결</button>
            <button id="questions_framework_btn" value="${host_id}">프레임워크</button>
        `
}  

questionFolderBtn.addEventListener('click', () => {
    id = questionFolderBtn.value;
    var a = "http://127.0.0.1:8000/users/" + id
    var url = a + "/questions_folder/"
    console.log(url)
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
        questionsBtnReset(id)
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
    })
})

// const questionsLanguageBtn = document.querySelector('.questions_language_btn')

// questionsLanguageBtn.addEventListener('click', () => {
//     id =langBtn.value;
//     var a = "http://127.0.0.1:8000/users/" + id
//     var url = a + "/questions_lang_folder/"
    
//     fetch(url, {
//         method: "GET",
//         headers : { 
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);

//         if (data.length === 0) {
//             categoryTab.innerHTML = "폴더없음"
//         } else {
//             const txt = data.map(folder => {
//                 return `
//                 <button class="lang_post_btn" id="${folder.id}" value="${folder.id}">
//                     ${folder.folder_name}
//                     엥????
//                 </button>    
//                 `
//             })
//             categoryTab.innerHTML = txt;
//         }
//         langPost()
//     })
// })