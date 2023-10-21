const txtFirstAtheleName = document.getElementById(
    'athlete-name-first-athlete-preview'
);
const txtSecondAtheleName = document.getElementById(
    'athlete-name-second-athlete-preview'
);

const txtFirstTeamPreview = document.getElementById('first-team-preview');

const txtSecondTeamPreview = document.getElementById('second-team-preview');

const txtMatchNumber = document.getElementById('match_number');
const txtTimeOfRound = document.getElementById('time-of-round');

const txtGamJoemRed = document.getElementById('gam-joem-red');
const txtGamJoemBlue = document.getElementById('gam-joem-blue');
const txtDeukJoemRed = document.getElementById('deuk-joem-red');
const txtDeukJoemBlue = document.getElementById('deuk-joem-blue');

const txtCurrentRound = document.getElementById('current-round');
const txtLeftStatus = document.getElementById('left-status');
const txtRightStatus = document.getElementById('right-status');
const txtWeightLevel = document.getElementById('weight-level');
const txtTitleBreakPreview = document.getElementById(
    'content-title-break-preview'
);

const onLoadData = () => {
    // console.log('ssss');
    // const info = localStorage.getItem('info');
    // const dataInfo = JSON.parse(info);
    // const timeOfRound = JSON.parse(localStorage.getItem('timeOfRound'));
    // if (dataInfo) {
    //     // Kiểm tra xem dữ liệu có tồn tại trong localStorage không
    //     console.log(dataInfo.red_fullname);
    //     txtFirstAtheleName.textContent = dataInfo.blue_fullname;
    //     txtSecondAtheleName.textContent = dataInfo.red_fullname;
    //     txtMatchNumber.textContent = dataInfo.match_number;
    //     txtFirstTeamPreview.textContent = dataInfo.blue_team_name;
    //     txtSecondTeamPreview.textContent = dataInfo.red_team_name;
    //     txtWeightLevel.textContent =
    //         'Hạng cân ' +
    //         dataInfo.weight_lever +
    //         ' Kg' +
    //         ' - ' +
    //         dataInfo.gender;
    // }
    // if (timeOfRound) {
    //     txtTimeOfRound.textContent = formatTimeAsMMSS(timeOfRound);
    // }
    // const deukGam = JSON.parse(localStorage.getItem('deukGam'));
    // if (deukGam) {
    //     txtDeukJoemBlue.textContent = deukGam.deukJoemBlue;
    //     txtDeukJoemRed.textContent = deukGam.deukJoemRed;
    //     txtGamJoemBlue.textContent = deukGam.gamJoemBlue;
    //     txtGamJoemRed.textContent = deukGam.gamJoemRed;
    //     txtCurrentRound.textContent = deukGam.currentRound;
    //     txtLeftStatus.textContent = deukGam.blueWinStatus;
    //     txtRightStatus.textContent = deukGam.redWinStatus;
    // }
};

window.addEventListener('message', function (event) {
    console.log(event.data);
    if (event.data !== undefined) {
        // Giải mã dữ liệu JSON từ trang index
        var data = JSON.parse(event.data);

        if (data.type === 'score_blue') {
            txtDeukJoemBlue.textContent = data.value;
        }
        if (data.type === 'score_red') {
            txtDeukJoemRed.textContent = data.value;
        }
        if (data.type === 'gam_joem_blue') {
            txtGamJoemBlue.textContent = data.value;
        }
        if (data.type === 'gam_joem_red') {
            txtGamJoemRed.textContent = data.value;
        }

        if (data.type === 'info_rd') {
            console.log(data.value);
            var dataInfo = data.value;
            console.log(dataInfo.red_fullname);
            txtFirstAtheleName.textContent = dataInfo.blue_fullname;
            txtSecondAtheleName.textContent = dataInfo.red_fullname;
            txtMatchNumber.textContent = dataInfo.match_number;
            txtFirstTeamPreview.textContent = dataInfo.blue_team_name;
            txtSecondTeamPreview.textContent = dataInfo.red_team_name;
            if (dataInfo.weight_lever === 0) {
                txtWeightLevel.textContent = 'Hạng cân - Giới Tính ';
            } else {
                txtWeightLevel.textContent =
                    'Hạng cân ' +
                    dataInfo.weight_lever +
                    ' Kg' +
                    ' - ' +
                    dataInfo.gender;
            }
        }
        if (data.type === 'deukGam') {
            var deukGam = data.value;

            txtCurrentRound.textContent = deukGam.currentRound;
            txtLeftStatus.textContent = deukGam.blueWinStatus;
            txtRightStatus.textContent = deukGam.redWinStatus;
        }
        if (data.type === 'timeArr') {
            var timeLeft = data.value;
            console.log(JSON.stringify(timeLeft));
            txtTimeOfRound.textContent = timeLeft.timer;
            txtTitleBreakPreview.textContent = timeLeft.title;
        }
    } else {
        console.log('Error');
    }
});

const formatTimeAsMMSS = (number) => {
    if (typeof number !== 'number' || isNaN(number) || number < 0) {
        return 'Invalid input';
    }
    const minutes = String(Math.floor(number / 60)).padStart(2, '0');
    const seconds = String(number % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
};
