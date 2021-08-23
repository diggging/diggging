// console.log(alarm);
var urlName = "https://diggging.com";

const toggleBtn = () => {
    const x = document.querySelector(".toggle");
    console.log('click')
    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}

const alarmMessage = () => {
    // const alarm = document.querySelector('.alarm').getAttribute('value');
    id = document.querySelector('.alarm').getAttribute('value');
    const alarmToggle = document.querySelector('.alarm_toggle');
    var a = urlName + "/users/" + id
    var url = a + "/alarm/"

    fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
        .then(res => res.json())
        .then(data => {
            const alarmJson = JSON.parse(data.data);
            let alarmReason = [];
            //혹시 몰라서 날짜도 넣어 놨음
            let alarmDate = [];
            // 알람 목록, date 추출
            for (i = 0; i < alarmJson.length; i++) {
                alarmReason[i] = alarmJson[i].fields.reason;
                alarmDate[i] = alarmJson[i].fields.created;
            }

            // 글자수 제한
            for (i = 0; i < alarmReason.length; i++) {
                alarmReason[i] = alarmReason[i].substr(0, 35);
                if (alarmReason[i].length > 34) {
                    alarmReason[i] += '...';
                }
            }

            if (alarmReason.length === 0) {
                alarmToggle.innerHTML = "알람이 없습니다."
            } else {
                const txt = alarmReason.map(alarm => {
                    return `
                    <div class="alarm_element">${alarm}</div>
                    `
                }).join('')
                alarmToggle.innerHTML = txt;
            }
        })
    if (alarmToggle.style.display === "none") {
        alarmToggle.style.display = "flex";
    } else {
        alarmToggle.style.display = "none";
    }
}

