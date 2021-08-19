// console.log(alarm);

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
    var a = "http://127.0.0.1:8000/users/" + id
    var url = a + "/alarm/"

    fetch(url, {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => {

        const alarmJson = JSON.parse(data.data);
        let alarmReason = [];
        // for (let i=0; i < key; i++) {
        //     alarmReason[key] = alarmJson[i]
        // }
        // console.log(alarmJson)
        //혹시 몰라서 날짜도 넣어 놨음
        let alarmDate = {};
        // 알람 목록, date 추출

        for (i=0; i < alarmJson.length; i++) {
            alarmReason[i] = alarmJson[i].fields.reason;
            // alarmReason[i] = alarmJson[i].fields.is_checked;
            alarmDate[i] = alarmJson[i].fields.created; 
        }
        // 글자수 제한
        for (i=0; i < alarmReason.length; i++) {
            alarmReason[i] = alarmReason[i].substr(0,35);
            if(alarmReason[i].length > 34) {
                alarmReason[i] += '...';
            }
        }
        //is_checked 확인
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
    if(alarmToggle.style.display === "none") {
        alarmToggle.style.display = "flex";
    } else {
        alarmToggle.style.display = "none";
    }
}