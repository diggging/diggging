const searchInput = async(post) => {
    const url = '/search_axios/';
    const {data} = await axios.get(url);
    console.log(data);
    searchHandle(data.post);
}

const searchHandle = (post) => {

}