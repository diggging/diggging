document.addEventListener("DOMContentLoaded", function() {
    const elements = document.getElementsByTagName("INPUT");
    for (var i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function(e) {
            e.target.setCustomValidity("빈칸 없이 모두 입력해주세욧!");
            if (!e.target.validity.valid) {
                e.target.
                e.target.setCustomValidity("");
            }
        };
        elements[i].oninput = function(e) {
            e.target.setCustomValidity("");
        };
    }
})