let postList = [];

const getPost = async() => {
    const url = '/posts/search_axios/';
    const result = axios.get(url)
                        .then(res => postList.push(...res.data));
    console.log(postList);
}

function init() {
    getPost()
}
init();

// .then(response => postList.push(...response.data));