function openList(evt, follow_type) {
    var i, tabcontent, tablinks;

    // tabcontent class 모두 가져와서 hide 시킴
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // tablink class 모두 가져와서 active class 없애주기
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // 현재 탭을 보여주고 탭 연 button 에 active 붙여주기
    document.getElementById(follow_type).style.display = "block";
    evt.currentTarget.className += " active";
}