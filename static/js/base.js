const toggleBtn = () => {
    console.log('click')
    const x = document.querySelector(".toggle");

    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}