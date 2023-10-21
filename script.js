const TIME_DEFAULT = 15;
let timeEachRound = TIME_DEFAULT;
let currentRound = 1;
let maxRounds = 4;
let deukJoemBlueArr = Array(maxRounds).fill(0);
let gamJoemBlueArr = Array(maxRounds).fill(0);
let deukJoemRedArr = Array(maxRounds).fill(0);
let gamJoemRedArr = Array(maxRounds).fill(0);

var scoreOfBlue = 0;
var scoreOfRed = 0;

var gamJoemBlue = 0;
var gamJoemRed = 0;
let isConfig = false;
let isReg = false;

let keysPressed = new Set();
let oDisplay2 = null;

let keyCombinations = [
    { keys: ['4', 'R', 'F', 'V'], score: 1, team: 'red' },
    { keys: ['1', 'Q', 'A', 'Z'], score: 2, team: 'red' },
    { keys: ['3', 'E', 'D', 'C'], score: 3, team: 'red' },
    { keys: ['7', 'U', 'J', 'M'], score: 1, team: 'blue' },
    { keys: ['2', 'W', 'S', 'X'], score: 2, team: 'blue' },
    { keys: ['8', 'I', 'K', ','], score: 3, team: 'blue' }
];

let timeLeft = TIME_DEFAULT;

let halfTimeBreak = 45;
let halfTimeBreakTemp = 45;
// let halfTimeBreakEnd = timeLeft - 45;

let lastKeyPressTime = 0;

let halfTimeBreakOptions = [
    { value: 15, label: '15 giây' },
    { value: 30, label: '30 giây' },
    { value: 45, label: '45 giây' },
    { value: 60, label: '1 phút' },
    { value: 90, label: '1 phút 30 giây' }
];

let timeOfRoundArr = [
    { value: 15, label: 'Thử 15 giây' },
    { value: 30, label: '30 giây' },
    { value: 45, label: '45 giây' },
    { value: 60, label: '1 phút' },
    { value: 90, label: '1 phút 30 giây' },
    { value: 120, label: '2 phút' },
    { value: 150, label: '2 phút 30 giây' },
    { value: 180, label: '3 phút' },
    { value: 300, label: '5 phút' }
];

let roundResetArr = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' }
];

const keyMatchingTimeOptions = [
    { value: 1, label: '1 giây' },
    { value: 1.5, label: '1.5 giây' },
    { value: 2, label: '2 giây' }
];
let keyDeukGamJoem = {
    blue_plus_deuk_key: 'T',
    blue_minus_deuk_key: 'Y',
    blue_minus_gam_joem_key: 'H',
    blue_plus_gam_joem_key: 'G',
    red_plus_deuk_key: 'P',
    red_minus_deuk_key: 'O',
    red_minus_gam_joem_key: 'N',
    red_plus_gam_joem_key: 'B',
    start_and_continue_key: '0',
    stop_taking_care_key: '5',
    stop_considering_key: '9'
};

let timer;

let isPaused = false;
let secondsRemaining = 0;
// save value for modal
let regResult = {};
// first athlete
var athleteNameBlue = document.getElementById('athlete-name-blue');

// second athlete
var athleteNameRed = document.getElementById('athlete-name-red');

// var plusPointLeftButton = document.getElementById('custom-button-top-red');
// var minusPointLeftButton = document.getElementById('custom-button-bottom-red');
var txtScoreBlue = document.getElementById('score-blue');
var txtScoreRed = document.getElementById('score-red');
var txtGamJoemBlue = document.getElementById('gam-joem-blue');
var txtGamJoemRed = document.getElementById('gam-joem-red');

var txtDeukJoemRound1Blue = document.getElementById('deuk-joem-round1-blue');
var txtDeukJoemRound2Blue = document.getElementById('deuk-joem-round2-blue');
var txtDeukJoemRound3Blue = document.getElementById('deuk-joem-round3-blue');
var txtDeukJoemRound4Blue = document.getElementById('deuk-joem-round4-blue');
var txtDeukJoemTotalBlue = document.getElementById('deuk-joem-total-blue');

var txtGamJoemRound1Blue = document.getElementById('gam-joem-round1-blue');
var txtGamJoemRound2Blue = document.getElementById('gam-joem-round2-blue');
var txtGamJoemRound3Blue = document.getElementById('gam-joem-round3-blue');
var txtGamJoemRound4Blue = document.getElementById('gam-joem-round4-blue');
var txtGamJoemTotalBlue = document.getElementById('gam-joem-total-blue');

var txtDeukJoemRound1Red = document.getElementById('deuk-joem-round1-red');
var txtDeukJoemRound2Red = document.getElementById('deuk-joem-round2-red');
var txtDeukJoemRound3Red = document.getElementById('deuk-joem-round3-red');
var txtDeukJoemRound4Red = document.getElementById('deuk-joem-round4-red');
var txtDeukJoemTotalRed = document.getElementById('deuk-joem-total-red');

var txtGamJoemRound1Red = document.getElementById('gam-joem-round1-red');
var txtGamJoemRound2Red = document.getElementById('gam-joem-round2-red');
var txtGamJoemRound3Red = document.getElementById('gam-joem-round3-red');
var txtGamJoemRound4Red = document.getElementById('gam-joem-round4-red');
var txtGamJoemTotalRed = document.getElementById('gam-joem-total-red');
var txtWeightLevel = document.getElementById('weight-title');
const txtMatchValue = document.getElementById('match-value');

const viewContentTime = document.getElementById('content-result');
const viewContentTimeBreak = document.getElementById(
    'content-result-break-time'
);
const txtTitleBreakTime = document.getElementById('content-title-break');

var txtNumberOfRound = document.getElementById('round-number');

//TIMER
var txtTimer = document.getElementById('timer');
var txtTimerBreak = document.getElementById('break-timer');
const btnStart = document.getElementById('btn-start');
const btnStopCaring = document.getElementById('btn-stop-caring');
const btnStopConsidering = document.getElementById('btn-stop-considering');
const btnResume = document.getElementById('btn-resume');
const btnStop = document.getElementById('btn-stop');

let isTimerRunning = false;

// END TIME

// Modal
var modal = document.getElementById('myModal');
const configModal = document.getElementById('config-modal');
var btnReg = document.getElementById('btn-reg');
const btnConfig = document.getElementById('btn-config');
var btnModalClose = document.getElementsByClassName('close')[0];
var btnConfigModalClose = document.getElementById('close-config-modal');

const minuteOfRoundSelect = document.getElementById('minute-of-round');

const ckbTimeOfRoundSelect = document.getElementById('time-of-round-select');

const secondOfRoundSelect = document.getElementById('second-of-round');
const halfTimeBreakSelect = document.getElementById('half-time-break');
const keyMatchingTimeSelect = document.getElementById('key-matching-time');
const roundResetSelect = document.getElementById('round-reset');

const hourResetRoundSelect = document.getElementById('hour-reset-round');
const minuteResetRoundSelect = document.getElementById('minute-reset-round');
const secondResetRoundSelect = document.getElementById('second-reset-round');
const ckbTwoScreen = document.getElementById('ckb-two-screen');
const ckbResetRound = document.getElementById('ckb-reset-round');

const txtTeamBlue = document.getElementById('team-blue');
const txtTeamRed = document.getElementById('team-red');

const ckbReferee = document.getElementById('referee');
let isReferee = false;

let isResetRound = false;

const txtBlueStatus = document.getElementById('blue_status');
const txtRedStatus = document.getElementById('red_status');
let blueWinStatus = 0;
let redWinStatus = 0;

const initializeGame = () => {
    txtTimer.textContent = formatTimeAsMMSS(timeLeft);

    const timeDefault = formatTimeAsMMSS(timeLeft);
    const { minute, seconds } = extractMMSS(timeDefault);
    console.log(minute);
    console.log(seconds);
    // initTimeOfRound(minuteOfRoundSelect, parseInt(minute, 10), 59);
    // initTimeOfRound(secondOfRoundSelect, parseInt(seconds, 10), 59);
    initHalfTimeBreak(halfTimeBreakSelect, halfTimeBreakOptions, halfTimeBreak);
    initHalfTimeBreak(keyMatchingTimeSelect, keyMatchingTimeOptions, 1);
    initHalfTimeBreak(roundResetSelect, roundResetArr, 1);

    initHalfTimeBreak(ckbTimeOfRoundSelect, timeOfRoundArr, 15);

    initTimeOfRound(minuteResetRoundSelect, 0, 3);
    initTimeOfRound(secondResetRoundSelect, 0, 59);
    initWinStatus(blueWinStatus, redWinStatus);

    let isTwoScreen = ckbTwoScreen.checked;
    if (isTwoScreen) {
        openOtherWindows();
    }
};

const initWinStatus = (left, right) => {
    txtBlueStatus.textContent = left;
    txtRedStatus.textContent = right;
};

const extractMMSS = (inputString) => {
    const [minute, seconds] = inputString.split(':');
    return { minute, seconds };
};

const onPlusScoreForBlue = () => {
    if (isTimerRunning) {
        scoreOfBlue++;
        txtScoreBlue.textContent = scoreOfBlue;
        sendMessage('score_blue', scoreOfBlue);
        //     console.log(scoreOfBlue);
    } else {
        alert('Trận đấu chưa bắt đầu hoặc đang bị tạm dừng...');
    }
};

const onMinusScoreForBlue = () => {
    if (isTimerRunning) {
        if (scoreOfBlue > 0) {
            scoreOfBlue--;
            txtScoreBlue.textContent = scoreOfBlue;
            sendMessage('score_blue', scoreOfBlue);
        }
    } else {
        alert('Trận đấu chưa bắt đầu hoặc đang bị tạm dừng...');
    }
};

const onPlusScoreForRed = () => {
    if (isTimerRunning) {
        scoreOfRed++;

        txtScoreRed.textContent = scoreOfRed;
        sendMessage('score_red', scoreOfRed);
    } else {
        alert('Trận đấu chưa bắt đầu hoặc đang bị tạm dừng...');
    }
};

const onMinusScoreForRed = () => {
    if (isTimerRunning) {
        if (scoreOfRed > 0) {
            scoreOfRed--;
            txtScoreRed.textContent = scoreOfRed;
            sendMessage('score_red', scoreOfRed);
        }
    } else {
        alert('Trận đấu chưa bắt đầu hoặc đang bị tạm dừng...');
    }
};

//GAM-JOEM
const onPlusGamJoemBlue = () => {
    if (isTimerRunning) {
        gamJoemBlue++;
        scoreOfRed++;
        txtGamJoemBlue.textContent = gamJoemBlue;
        txtScoreRed.textContent = scoreOfRed;
        sendMessage('gam_joem_blue', gamJoemBlue);
        sendMessage('score_red', scoreOfRed);
    } else {
        alert('Trận đấu chưa bắt đầu hoặc đang bị tạm dừng...');
    }
};

const onMinusGamJoemBlue = () => {
    if (isTimerRunning) {
        if (gamJoemBlue > 0) {
            gamJoemBlue--;
            scoreOfRed--;
            txtGamJoemBlue.textContent = gamJoemBlue;
            txtScoreRed.textContent = scoreOfRed;
            sendMessage('gam_joem_blue', gamJoemBlue);
            sendMessage('score_red', scoreOfRed);
        }
    } else {
        alert('Trận đấu chưa bắt đầu hoặc đang bị tạm dừng...');
    }
};

const onPlusGamJoemRed = () => {
    if (isTimerRunning) {
        gamJoemRed++;
        scoreOfBlue++;
        txtGamJoemRed.textContent = gamJoemRed;
        txtScoreBlue.textContent = scoreOfBlue;
        sendMessage('gam_joem_red', gamJoemRed);
        sendMessage('score_blue', scoreOfBlue);
    } else {
        alert('Trận đấu chưa bắt đầu hoặc đang bị tạm dừng...');
    }
};

const onMinusGamJoemRed = () => {
    if (isTimerRunning) {
        if (gamJoemRed > 0) {
            gamJoemRed--;
            scoreOfBlue--;
            txtGamJoemRed.textContent = gamJoemRed;
            txtScoreBlue.textContent = scoreOfBlue;
            sendMessage('gam_joem_red', gamJoemRed);
            sendMessage('score_blue', scoreOfBlue);
        }
    } else {
        alert('Trận đấu chưa bắt đầu hoặc đang bị tạm dừng...');
    }
};
let isStopCaringFlag = false;
let isStopConsideringFlag = false;
const handleKeyEvent = (event, isKeyDown) => {
    if (!isTimerRunning) {
        return;
    }

    const currentTime = Date.now();
    const timeSinceLastKeyPress = currentTime - lastKeyPressTime;
    const key = event.key.toUpperCase();

    if (isKeyDown) {
        keysPressed.add(key);
        console.log(key);
        switch (key) {
            case keyDeukGamJoem.blue_minus_deuk_key:
                onMinusScoreForBlue();
                break;
            case keyDeukGamJoem.blue_plus_deuk_key:
                onPlusScoreForBlue();
                break;
            case keyDeukGamJoem.blue_plus_gam_joem_key:
                onPlusGamJoemBlue();
                break;
            case keyDeukGamJoem.blue_minus_gam_joem_key:
                onMinusGamJoemBlue();
                break;
            case keyDeukGamJoem.red_plus_deuk_key:
                onPlusScoreForRed();
                break;
            case keyDeukGamJoem.red_minus_deuk_key:
                onMinusScoreForRed();
                break;
            case keyDeukGamJoem.red_plus_gam_joem_key:
                onPlusGamJoemRed();
                break;
            case keyDeukGamJoem.red_minus_gam_joem_key:
                onMinusGamJoemRed();
                break;
            case keyDeukGamJoem.start_and_continue_key:
                startTimer();
                break;
            case keyDeukGamJoem.stop_taking_care_key:
                // if (isStopConsideringFlag == false) {
                if (isStopCaringFlag == false) {
                    pauseCaring();
                    console.log('ON');
                    const minutess = Math.floor(timeStopCaring / 60);
                    const secondss = timeStopCaring % 60;
                    let _times = `${minutess < 10 ? '0' : ''}${minutess}:${
                        secondss < 10 ? '0' : ''
                    }${secondss}`;
                    let time_arr = {
                        title: 'Dừng săn sóc',
                        timer: _times
                    };
                    sendMessage('timeArr', time_arr);
                    // btnResume.disabled = true;
                    isStopCaringFlag = true;
                } else {
                    resumeRound();
                    console.log('OFF');
                    const minutesss = Math.floor(timeLeft / 60);
                    const secondsss = timeLeft % 60;
                    let _times = `${minutesss < 10 ? '0' : ''}${minutesss}:${
                        secondsss < 10 ? '0' : ''
                    }${secondsss}`;
                    let time_arr = {
                        title: '',
                        timer: _times
                    };
                    sendMessage('timeArr', time_arr);
                    isStopCaringFlag = false;
                    // btnResume.disabled = false;
                }
                // } else {
                //     alert('Đang dừng xem xét');
                // }

                break;
            case keyDeukGamJoem.stop_considering_key:
                // if (isStopCaringFlag == false) {
                if (isStopConsideringFlag == false) {
                    // btnResume.disabled = true;
                    pauseConsidering();
                    const minutes3 = Math.floor(0 / 60);
                    const seconds3 = 0 % 60;
                    var _time3 = `${minutes3 < 10 ? '0' : ''}${minutes3}:${
                        seconds3 < 10 ? '0' : ''
                    }${seconds3}`;
                    let time_arr3 = {
                        title: 'Dừng xem xét',
                        timer: _time3
                    };
                    sendMessage('timeArr', time_arr3);
                    isStopConsideringFlag = true;
                } else {
                    resumeRound();

                    const minutesss2 = Math.floor(timeLeft / 60);
                    const secondsss2 = timeLeft % 60;
                    let _times2 = `${minutesss2 < 10 ? '0' : ''}${minutesss2}:${
                        secondsss2 < 10 ? '0' : ''
                    }${secondsss2}`;
                    let time_arr2 = {
                        title: '',
                        timer: _times2
                    };
                    sendMessage('timeArr', time_arr2);
                    isStopCaringFlag = false;
                    isStopConsideringFlag = false;
                    // btnResume.disabled = false;
                }

                break;
            default:
                break;
        }
    } else {
        keysPressed.delete(key);
    }

    for (const combination of keyCombinations) {
        const keysInCombination = combination.keys;
        const pressedKeysInCombination = keysInCombination.filter((k) =>
            keysPressed.has(k)
        );
        let minKey = 0;
        if (isReferee) {
            minKey = 2;
        } else {
            minKey = 3;
        }
        if (pressedKeysInCombination.length >= minKey) {
            if (combination.team === 'red') {
                scoreOfRed += combination.score;
                txtScoreRed.textContent = scoreOfRed;
                sendMessage('score_red', scoreOfRed);
            } else {
                scoreOfBlue += combination.score;
                txtScoreBlue.textContent = scoreOfBlue;
                sendMessage('score_blue', scoreOfBlue);
            }
            keysPressed.clear();
        }
    }
};

// END GAM-JOEM

// TIME For Math
const startTimer = () => {
    if (isConfig && isReg) {
        btnStart.disabled = true;
        btnStopCaring.disabled = false;
        btnStopConsidering.disabled = false;
        btnStop.disabled = false;
        btnResume.disabled = true;
        displayHalfTimeBreak(1);
        if (timerIntervalBreak != null) {
            stopTimerBreak();
        }
        // startTimerBreak()

        // scoreOfBlue = 0;
        if (timeLeft === TIME_DEFAULT) {
            deukJoemBlueArr[currentRound - 1] = scoreOfBlue;
            gamJoemBlueArr[currentRound - 1] = gamJoemBlue;
            deukJoemRedArr[currentRound - 1] = scoreOfRed;
            gamJoemRedArr[currentRound - 1] = gamJoemRed;
        }

        if (currentRound <= maxRounds) {
            timerInterval = setInterval(updateTimer, 1000);
            isTimerRunning = true;
        }
    } else {
        alert(
            'Vui lòng chỉnh sửa cấu hình trong Reg và Config trước khi bắt đầu trận đấu'
        );
    }
    // updateStatusOfRound();
};

const pauseCaring = () => {
    pauseTimer();

    // startTimerBreak();
    displayHalfTimeBreak(3);
};
const pauseConsidering = () => {
    pauseTimer();

    // startTimerBreak();
    displayHalfTimeBreak(4);
};

const pauseTimer = () => {
    btnStart.disabled = true;
    btnStopCaring.disabled = true;
    btnStopConsidering.disabled = true;
    btnStop.disabled = false;
    btnResume.disabled = false;

    clearInterval(timerInterval);
    isTimerRunning = false;
    displayHalfTimeBreak(1);
};
const stopRound = () => {
    displayHalfTimeBreak(2);
    stopTimer();
    startTimerBreak();
    stopTimerStopCaring();
    stopTimerStopConsidering();
    // displayHalfTimeBreak(1);
};
const stopTimer = () => {
    btnStart.disabled = false;
    btnStopCaring.disabled = true;
    btnStopConsidering.disabled = true;
    btnStop.disabled = true;
    btnResume.disabled = true;

    clearInterval(timerInterval);
    timeLeft = timeEachRound;
    updateTimer();
    isTimerRunning = false;
    updateStatusOfRound();
};

const resumeRound = () => {
    // stopTimerBreak();
    stopTimerStopCaring();
    stopTimerStopConsidering();
    displayHalfTimeBreak(1);
    resumeTimer();
};

const resumeTimer = () => {
    btnStart.disabled = true;
    btnStopCaring.disabled = false;
    btnStopConsidering.disabled = false;
    btnStop.disabled = false;
    btnResume.disabled = true;

    timerInterval = setInterval(updateTimer, 1000);
    isTimerRunning = true;
};

const startTimerBreak = () => {
    timerIntervalBreak = setInterval(updateTimerBreak, 1000);
    isRefereePlus = true;
};
let timerIntervalStopCaring = null;
const startTimerStopCaring = () => {
    timerIntervalStopCaring = setInterval(updateTimerStopCaring, 1000);
};
let timerIntervalStopConsidering = null;
const startTimerStopConsidering = () => {
    timerIntervalStopConsidering = setInterval(
        updateTimerStopConsidering,
        1000
    );
};

const pauseTimerBreak = () => {
    clearInterval(timerIntervalBreak);

    displayHalfTimeBreak(2);
    isRefereePlus = false;
};

const stopTimerBreak = () => {
    clearInterval(timerIntervalBreak);
    // clearInterval(timeStopCaring);
    // clearInterval(timeStopConsidering);
    halfTimeBreak = halfTimeBreakTemp;
    // const minutes = Math.floor(60 / 60);
    // const seconds = 60 % 60;
    // txtTimerBreak.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${
    //     seconds < 10 ? '0' : ''
    // }${seconds}`;
};

const stopTimerStopConsidering = () => {
    clearInterval(timerIntervalStopConsidering);
    // halfTimeBreak = halfTimeBreakTemp;
};
const stopTimerStopCaring = () => {
    clearInterval(timerIntervalStopCaring);
    // halfTimeBreak = halfTimeBreakTemp;
};
let timerIntervalBreak = null;
const resumeTimerBreak = () => {
    timerIntervalBreak = setInterval(updateTimerBreak, 1000);
};
let deukJoemTotalBlue = 0;
let gamJoemTotalBlue = 0;
let deukJoemTotalRed = 0;
let gamJoemTotalRed = 0;

let isRefereePlus = false;
let pop = null;
const updateStatusOfRound = () => {
    deukJoemBlueArr[currentRound - 1] = scoreOfBlue;
    gamJoemBlueArr[currentRound - 1] = gamJoemBlue;
    deukJoemRedArr[currentRound - 1] = scoreOfRed;
    gamJoemRedArr[currentRound - 1] = gamJoemRed;
    ///
    if (deukJoemBlueArr[currentRound - 1] > deukJoemRedArr[currentRound - 1]) {
        ++blueWinStatus;
    } else if (
        deukJoemBlueArr[currentRound - 1] < deukJoemRedArr[currentRound - 1]
    ) {
        ++redWinStatus;
    } else {
        // Do not something
        if (
            gamJoemBlueArr[currentRound - 1] > gamJoemRedArr[currentRound - 1]
        ) {
            ++redWinStatus;
        } else if (
            gamJoemBlueArr[currentRound - 1] < gamJoemRedArr[currentRound - 1]
        ) {
            ++blueWinStatus;
        } else {
        }
    }

    initWinStatus(blueWinStatus, redWinStatus);

    if (currentRound <= maxRounds) {
        txtDeukJoemRound1Blue.textContent = deukJoemBlueArr[0];
        txtDeukJoemRound2Blue.textContent = deukJoemBlueArr[1];
        txtDeukJoemRound3Blue.textContent = deukJoemBlueArr[2];
        txtDeukJoemRound4Blue.textContent = deukJoemBlueArr[3];

        txtGamJoemRound1Blue.textContent = gamJoemBlueArr[0];
        txtGamJoemRound2Blue.textContent = gamJoemBlueArr[1];
        txtGamJoemRound3Blue.textContent = gamJoemBlueArr[2];
        txtGamJoemRound4Blue.textContent = gamJoemBlueArr[3];

        txtDeukJoemRound1Red.textContent = deukJoemRedArr[0];
        txtDeukJoemRound2Red.textContent = deukJoemRedArr[1];
        txtDeukJoemRound3Red.textContent = deukJoemRedArr[2];
        txtDeukJoemRound4Red.textContent = deukJoemRedArr[3];

        txtGamJoemRound1Red.textContent = gamJoemRedArr[0];
        txtGamJoemRound2Red.textContent = gamJoemRedArr[1];
        txtGamJoemRound3Red.textContent = gamJoemRedArr[2];
        txtDeukJoemRound4Red.textContent = deukJoemRedArr[3];
        // txtDeukJoemRound1Blue.textContent = scores[0];
        // txtDeukJoemRound1Blue.textContent = scores[0];
        deukJoemTotalBlue = deukJoemBlueArr.reduce(
            (acc, current) => acc + current,
            0
        );
        gamJoemTotalBlue = gamJoemBlueArr.reduce(
            (acc, current) => acc + current,
            0
        );
        deukJoemTotalRed = deukJoemRedArr.reduce(
            (acc, current) => acc + current,
            0
        );
        gamJoemTotalRed = gamJoemRedArr.reduce(
            (acc, current) => acc + current,
            0
        );
        txtDeukJoemTotalBlue.textContent = deukJoemTotalBlue;
        txtGamJoemTotalBlue.textContent = gamJoemTotalBlue;
        txtDeukJoemTotalRed.textContent = deukJoemTotalRed;
        txtGamJoemTotalRed.textContent = gamJoemTotalRed;

        if (currentRound == 3 && deukJoemTotalBlue != deukJoemTotalRed) {
            displayHalfTimeBreak(1);
            stopTimerBreak();
            stopTimerStopCaring();
            stopTimerStopConsidering();
            btnStart.disabled = true;
            btnStopCaring.disabled = true;
            btnStopConsidering.disabled = true;
            btnStop.disabled = true;
            btnResume.disabled = true;
            txtNumberOfRound.textContent = currentRound;
            clearInterval(timerIntervalBreak);
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            let _time = `${minutes < 10 ? '0' : ''}${minutes}:${
                seconds < 10 ? '0' : ''
            }${seconds}`;
            let time_arr = {
                title: '',
                timer: _time
            };
            sendMessage('timeArr', time_arr);
        }
        if (currentRound == 4) {
            displayHalfTimeBreak(1);
            stopTimerBreak();
            stopTimerStopCaring();
            stopTimerStopConsidering();
            btnStart.disabled = true;
            btnStopCaring.disabled = true;
            btnStopConsidering.disabled = true;
            btnStop.disabled = true;
            btnResume.disabled = true;
            txtNumberOfRound.textContent = currentRound;
            let _time = `${minutes < 10 ? '0' : ''}${minutes}:${
                seconds < 10 ? '0' : ''
            }${seconds}`;
            let time_arr = {
                title: '',
                timer: _time
            };
            sendMessage('timeArr', time_arr);
        }

        currentRound++;
        // isRefereePlus = false;
    }

    //reset score for each team
    scoreOfBlue = 0;
    gamJoemBlue = 0;
    scoreOfRed = 0;
    gamJoemRed = 0;
    txtScoreBlue.textContent = scoreOfBlue;
    txtGamJoemBlue.textContent = gamJoemBlue;
    txtScoreRed.textContent = scoreOfRed;
    txtGamJoemRed.textContent = gamJoemRed;
    timeLeft = timeEachRound;
    txtTimer.textContent = formatTimeAsMMSS(timeLeft);

    if (currentRound == 4 && deukJoemTotalBlue != deukJoemTotalRed) {
        pop = 3;
        txtNumberOfRound.textContent = 3;
    } else if (currentRound == 5) {
        pop = 4;
        txtNumberOfRound.textContent = 4;
    } else {
        txtNumberOfRound.textContent = currentRound;
        pop = currentRound;
    }
    let arr = {
        blueWinStatus: blueWinStatus,
        redWinStatus: redWinStatus,
        currentRound: pop
    };
    // localStorage.setItem('deukGam', JSON.stringify(arr));
    sendMessage('deukGam', arr);
    sendMessage('gam_joem_blue', 0);
    sendMessage('score_red', 0);

    sendMessage('score_blue', 0);
    sendMessage('gam_joem_red', 0);

    // openOtherWindows();
};

const formatTimeAsMMSS = (number) => {
    if (typeof number !== 'number' || isNaN(number) || number < 0) {
        return 'Invalid input';
    }
    const minutes = String(Math.floor(number / 60)).padStart(2, '0');
    const seconds = String(number % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
};

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    let _time = `${minutes < 10 ? '0' : ''}${minutes}:${
        seconds < 10 ? '0' : ''
    }${seconds}`;
    txtTimer.textContent = _time;
    let time_arr = {
        title: '',
        timer: _time
    };
    sendMessage('timeArr', time_arr);

    if (timeLeft === 0) {
        clearInterval(timerInterval);
        btnStart.disabled = false;
        btnStopCaring.disabled = true;
        btnStopConsidering.disabled = true;
        btnStop.disabled = true;
        btnResume.disabled = true;
        startTimerBreak();
        displayHalfTimeBreak(2);
        updateStatusOfRound();
    } else {
        timeLeft--;
    }
};

const updateTimerBreak = () => {
    const minutes = Math.floor(halfTimeBreak / 60);
    const seconds = halfTimeBreak % 60;
    var _time = `${minutes < 10 ? '0' : ''}${minutes}:${
        seconds < 10 ? '0' : ''
    }${seconds}`;
    txtTimerBreak.textContent = _time;
    let time_arr = {
        title: 'Nghỉ giữa hiệp',
        timer: _time
    };
    sendMessage('timeArr', time_arr);

    if (halfTimeBreak === 0) {
        clearInterval(timerIntervalBreak);
    } else {
        halfTimeBreak--;
    }
};
let timeStopCaring = 60;

const updateTimerStopCaring = () => {
    const minutes = Math.floor(timeStopCaring / 60);
    const seconds = timeStopCaring % 60;

    var _time = `${minutes < 10 ? '0' : ''}${minutes}:${
        seconds < 10 ? '0' : ''
    }${seconds}`;
    txtTimerBreak.textContent = _time;

    let time_arr = {
        title: 'Dừng săn sóc',
        timer: _time
    };
    sendMessage('timeArr', time_arr);

    if (timeStopCaring === 0) {
        console.log('Clear: ' + timeStopCaring);
        clearInterval(timerIntervalStopCaring);
    } else {
        console.log('Continue: ' + timeStopCaring);
        timeStopCaring--;
    }
    console.log('+++++: ' + timeStopCaring);
};
let timeStopConsidering = 0;
const updateTimerStopConsidering = () => {
    const minutes = Math.floor(timeStopConsidering / 60);
    const seconds = timeStopConsidering % 60;
    var _time = `${minutes < 10 ? '0' : ''}${minutes}:${
        seconds < 10 ? '0' : ''
    }${seconds}`;
    txtTimerBreak.textContent = _time;
    let time_arr = {
        title: 'Dừng xem xét',
        timer: _time
    };
    sendMessage('timeArr', time_arr);
    // if (time === 0) {
    //     clearInterval(timerIntervalStopCaring);
    // } else {
    timeStopConsidering++;
    // }
};

//end time for match

// When the user clicks the button, open the modal
btnReg.onclick = function () {
    modal.style.display = 'block';
};

const showConfigModal = () => {
    configModal.style.display = 'block';
};
const closeConfigModal = () => {
    configModal.style.display = 'none';
};

btnConfigModalClose.onclick = function () {
    closeConfigModal();
};
// When the user clicks on <span> (x), close the modal
btnModalClose.onclick = function () {
    modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
// Event get all value of Modal

const onCloseRedModal = () => {
    isReg = true;
    regResult = getRegValues();
    console.log(regResult);
    // display first athlete
    athleteNameBlue.textContent = regResult.blue_fullname;

    //load content for second of athlete
    athleteNameRed.textContent = regResult.red_fullname;
    txtMatchValue.textContent = regResult.match_number;
    // localStorage.setItem('info', JSON.stringify(regResult));
    sendMessage('info_rd', regResult);

    let weight = '' + regResult.weight_lever + ' Kg - ' + regResult.gender;
    txtWeightLevel.textContent = weight;
    txtTeamBlue.textContent = regResult.blue_team_name;
    txtTeamRed.textContent = regResult.red_team_name;
    // close modal
    modal.style.display = 'none';
};
const getRegValues = () =>
    [...document.querySelectorAll('#myModal input, #myModal select')].reduce(
        (values, input) => {
            values[input.name] = input.value;
            return values;
        },
        {}
    );

const getConfigValues = () =>
    [
        ...document.querySelectorAll(
            '#config-modal input, #config-modal select'
        )
    ].reduce((values, input) => {
        values[input.name] = input.value;
        return values;
    }, {});

const initTimeOfRound = (selectElement, start, end) => {
    for (let i = start; i <= end; i++) {
        const option = document.createElement('option');
        option.value = i < 10 ? `0${i}` : `${i}`;
        option.textContent = option.value;
        selectElement.appendChild(option);
    }
};

const initHalfTimeBreak = (selectElement, options, defaultValue) => {
    options.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        selectElement.appendChild(optionElement);

        if (option.value === defaultValue) {
            optionElement.selected = true;
        }
    });
};

const convertObjectToKeyCombinations = (inputObject) => {
    for (const key in inputObject) {
        const value = inputObject[key];
        const [color, number, subNumber] = key.split('_');
        const team = color === 'blue' ? 'blue' : 'red';
        const score = parseInt(number);

        const combination = keyCombinations.find(
            (item) => item.team === team && item.score === score
        );
        if (combination) {
            combination.keys.push(value);
        }
    }

    return keyCombinations;
};

const findCombination = (keyCombinations, team, score) => {
    return keyCombinations.find(
        (item) => item.team === team && item.score === score
    );
};

const convertMinutesToSeconds = (timeString) => {
    const [minutes, seconds] = timeString.split(':');
    const totalSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    return totalSeconds;
};

const onSubmitConfigModal = () => {
    isConfig = true;
    let values = getConfigValues();
    console.log(values);
    clearKeys(keyCombinations);
    console.log(keyDeukGamJoem);
    keyCombinations = convertObjectToKeyCombinations(values);
    updateKeyDeukGamJoem(values);
    if (isResetRound) {
        // formatTimeAsMMSS(values.time_of_round_select);
        timeLeft = convertMinutesToSeconds(
            `${values.minute_reset_round}:${values.seconds_reset_round}`
        );
        currentRound = values.round_reset;
        txtNumberOfRound.textContent = currentRound;
    } else {
        currentRound = currentRound;
        console.log('-----:' + values.time_of_round_select);
        txtNumberOfRound.textContent = currentRound;
        timeLeft = parseInt(values.time_of_round_select, 10);
    }
    // timeLeft = convertMinutesToSeconds(
    //     `${values.minute_of_round}:${values.seconds_of_round}`
    // );
    txtTimer.textContent = formatTimeAsMMSS(timeLeft);

    halfTimeBreak = values.half_time_break;
    timeEachRound = parseInt(values.time_of_round_select, 10);
    // halfTimeBreakEnd = timeLeft - halfTimeBreak;
    // localStorage.setItem(
    //     'timeOfRound',
    //     JSON.stringify(
    //         convertMinutesToSeconds(
    //             `${values.minute_of_round}:${values.seconds_of_round}`
    //         )
    //     )
    // );
    halfTimeBreakTemp = values.half_time_break;
    configModal.style.display = 'none';

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    let _time = `${minutes < 10 ? '0' : ''}${minutes}:${
        seconds < 10 ? '0' : ''
    }${seconds}`;
    let time_arr = {
        title: '',
        timer: _time
    };
    sendMessage('timeArr', time_arr);
};
const clearKeys = (keyCombinationsParams) => {
    for (const combination of keyCombinationsParams) {
        combination.keys = [];
    }
};
const updateKeyDeukGamJoem = (value) => {
    keyDeukGamJoem['blue_plus_deuk_key'] = value.blue_plus_deuk_key;
    keyDeukGamJoem['blue_minus_deuk_key'] = value.blue_minus_deuk_key;
    keyDeukGamJoem['blue_minus_gam_joem_key'] = value.blue_minus_gam_joem_key;
    keyDeukGamJoem['blue_plus_gam_joem_key'] = value.blue_plus_gam_joem_key;
    keyDeukGamJoem['red_plus_deuk_key'] = value.red_plus_deuk_key;
    keyDeukGamJoem['red_minus_deuk_key'] = value.red_minus_deuk_key;
    keyDeukGamJoem['red_minus_gam_joem_key'] = value.red_minus_gam_joem_key;
    keyDeukGamJoem['red_plus_gam_joem_key'] = value.red_plus_gam_joem_key;
    keyDeukGamJoem['start_and_continue_key'] = value.start_and_continue_key;
    keyDeukGamJoem['stop_taking_care_key'] = value.stop_taking_care_key;
    keyDeukGamJoem['stop_considering_key'] = value.stop_considering_key;
};

const displayHalfTimeBreak = (type) => {
    switch (type) {
        case 1:
            viewContentTime.style.display = 'block';
            txtTitleBreakTime.textContent = '';
            viewContentTimeBreak.style.display = 'none';
            break;
        case 2:
            viewContentTime.style.display = 'none';
            txtTitleBreakTime.textContent = 'Nghỉ giữa hiệp';
            viewContentTimeBreak.style.display = 'block';
            break;
        case 3:
            viewContentTime.style.display = 'none';
            txtTitleBreakTime.textContent = 'Dừng săn sóc';
            viewContentTimeBreak.style.display = 'block';
            timeStopCaring = 60;
            const minutes = Math.floor(timeStopCaring / 60);
            const seconds = timeStopCaring % 60;
            txtTimerBreak.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${
                seconds < 10 ? '0' : ''
            }${seconds}`;
            startTimerStopCaring();
            break;
        case 4:
            viewContentTime.style.display = 'none';
            txtTitleBreakTime.textContent = 'Dừng xem xét';
            viewContentTimeBreak.style.display = 'block';
            timeStopConsidering = 0;
            const minutesBreak = Math.floor(timeStopConsidering / 60);
            const secondsBreak = timeStopConsidering % 60;
            txtTimerBreak.textContent = `${
                minutesBreak < 10 ? '0' : ''
            }${minutesBreak}:${secondsBreak < 10 ? '0' : ''}${secondsBreak}`;
            startTimerStopConsidering();
            break;
        default:
            break;
    }
};

const onCheckedScreen = () => {
    let isTwoScreen = ckbTwoScreen.checked;
    if (isTwoScreen) {
        openOtherWindows();
        console.log('++++: ' + JSON.stringify(regResult));
        sendMessage('info_rd', regResult);
    }
};

const onCheckedResetRound = () => {
    isResetRound = ckbResetRound.checked;
};

const openOtherWindows = () => {
    if (oDisplay2 && !oDisplay2.closed) {
        oDisplay2.close();
    }

    oDisplay2 = window.open(
        'home.htm',
        '_blank',
        'location=no;menubar=no;status=no;toolbar=no'
    );
};

const onReferee = () => {
    isReferee = ckbReferee.checked;
};

function sendMessage(type, value) {
    if (oDisplay2 && !oDisplay2.closed) {
        var data = {
            type: type,
            value: value
        };
        oDisplay2.postMessage(JSON.stringify(data), '*');
    }
}

const onStartNewMatch = () => {
    let timeRes = TIME_DEFAULT;
    // const timeDefault = formatTimeAsMMSS(timeRes);
    // const { minute, seconds } = extractMMSS(timeRes);
    // console.log(minute);
    // console.log(seconds);
    // initTimeOfRound(minuteOfRoundSelect, parseInt(minute, 10), 59);
    // initTimeOfRound(secondOfRoundSelect, parseInt(seconds, 10), 59);
    initHalfTimeBreak(halfTimeBreakSelect, halfTimeBreakOptions, halfTimeBreak);
    initHalfTimeBreak(keyMatchingTimeSelect, keyMatchingTimeOptions, 1);
    initHalfTimeBreak(roundResetSelect, roundResetArr, 1);
    displayHalfTimeBreak(1);

    initHalfTimeBreak(ckbTimeOfRoundSelect, timeOfRoundArr, timeRes);

    initTimeOfRound(minuteResetRoundSelect, 0, 3);
    initTimeOfRound(secondResetRoundSelect, 0, 59);
    initWinStatus(blueWinStatus, redWinStatus);

    txtTimer.textContent = formatTimeAsMMSS(timeRes);

    txtMatchValue.textContent = '0';
    regResult = {};

    //rết score
    scoreOfBlue = 0;
    gamJoemBlue = 0;
    scoreOfRed = 0;
    gamJoemRed = 0;
    txtScoreBlue.textContent = scoreOfBlue;
    txtGamJoemBlue.textContent = gamJoemBlue;
    txtScoreRed.textContent = scoreOfRed;
    txtGamJoemRed.textContent = gamJoemRed;

    //reset socre for table
    deukJoemBlueArr = [0, 0, 0, 0];
    gamJoemBlueArr = [0, 0, 0, 0];
    deukJoemRedArr = [0, 0, 0, 0];
    gamJoemRedArr = [0, 0, 0, 0];
    txtDeukJoemRound1Blue.textContent = deukJoemBlueArr[0];
    txtDeukJoemRound2Blue.textContent = deukJoemBlueArr[1];
    txtDeukJoemRound3Blue.textContent = deukJoemBlueArr[2];
    txtDeukJoemRound4Blue.textContent = deukJoemBlueArr[3];

    txtGamJoemRound1Blue.textContent = gamJoemBlueArr[0];
    txtGamJoemRound2Blue.textContent = gamJoemBlueArr[1];
    txtGamJoemRound3Blue.textContent = gamJoemBlueArr[2];
    txtGamJoemRound4Blue.textContent = gamJoemBlueArr[3];

    txtDeukJoemRound1Red.textContent = deukJoemRedArr[0];
    txtDeukJoemRound2Red.textContent = deukJoemRedArr[1];
    txtDeukJoemRound3Red.textContent = deukJoemRedArr[2];
    txtDeukJoemRound4Red.textContent = deukJoemRedArr[3];

    txtGamJoemRound1Red.textContent = gamJoemRedArr[0];
    txtGamJoemRound2Red.textContent = gamJoemRedArr[1];
    txtGamJoemRound3Red.textContent = gamJoemRedArr[2];
    txtDeukJoemRound4Red.textContent = deukJoemRedArr[3];

    deukJoemTotalBlue = 0;
    gamJoemTotalBlue = 0;
    deukJoemTotalRed = 0;
    gamJoemTotalRed = 0;
    txtDeukJoemTotalBlue.textContent = deukJoemTotalBlue;
    txtGamJoemTotalBlue.textContent = gamJoemTotalBlue;
    txtDeukJoemTotalRed.textContent = deukJoemTotalRed;
    txtGamJoemTotalRed.textContent = gamJoemTotalRed;

    isTimerRunning = false;
    btnStart.disabled = false;
    btnStopCaring.disabled = true;
    btnStopConsidering.disabled = true;
    btnStop.disabled = true;
    btnResume.disabled = true;
    isReferee.checked = false;

    //reset name
    athleteNameBlue.textContent = 'Tên VDV';
    athleteNameRed.textContent = 'Tên VDV';
    txtTeamBlue.textContent = 'Đoàn';
    txtTeamRed.textContent = 'Đoàn';
    // txtTeamRed.textContent = 'Hạng Cân - Giới Tính';

    txtWeightLevel.textContent = ' Hạng Cân - Giới Tính';
    ckbReferee.checked = false;
    isReferee = false;
    isResetRound = false;

    blueWinStatus = 0;
    redWinStatus = 0;
    ckbTwoScreen.checked = true;
    resetModal();

    //reset home page
    sendMessage('score_blue', 0);
    sendMessage('score_red', 0);
    sendMessage('gam_joem_blue', gamJoemBlue);
    sendMessage('gam_joem_red', gamJoemRed);
    stopTimer();
    stopTimerBreak();
    stopTimerStopCaring();
    stopTimerStopConsidering();
    displayHalfTimeBreak(1);
    txtTimer.textContent = formatTimeAsMMSS(timeRes);
    currentRound = 1;
    txtNumberOfRound.textContent = '1';
    const minutes = Math.floor(timeRes / 60);
    const seconds = timeRes % 60;
    let _time = `${minutes < 10 ? '0' : ''}${minutes}:${
        seconds < 10 ? '0' : ''
    }${seconds}`;
    let time_arr = {
        title: '',
        timer: _time
    };
    sendMessage('timeArr', time_arr);
    let arr = {
        blueWinStatus: 0,
        redWinStatus: 0,
        currentRound: 1
    };

    // localStorage.setItem('deukGam', JSON.stringify(arr));
    sendMessage('deukGam', arr);
    let ss = {
        weight_lever: 0,
        gender: 'Nam',
        match_number: '0',
        blue_fullname: 'Tên VDV ',
        blue_team_name: 'Đoàn',
        red_fullname: 'Tên VDV',
        red_team_name: 'Đoàn'
    };
    sendMessage('info_rd', ss);

    isReg = false;
    isConfig = true;
};

const resetModal = () => {
    const txtWeightLevelModal = document.getElementById('weight_lever_modal');
    const txtGenderModal = document.getElementById('gender_modal');
    const txtMatchModal = document.getElementById('match_number_modal');
    const txtBlueNameModal = document.getElementById('blue_fullname_modal');
    const txtBlueTeamNameModal = document.getElementById(
        'blue_team_name_modal'
    );
    const txtRedNameModal = document.getElementById('red_fullname_modal');
    const txtRedTeamNameModal = document.getElementById('red_team_name_modal');

    txtWeightLevelModal.value = '';
    txtGenderModal.value = 'Nam';
    txtMatchModal.value = '';
    txtBlueNameModal.value = '';
    txtBlueTeamNameModal.value = '';
    txtRedNameModal.value = '';
    txtRedTeamNameModal.value = '';
    isRefereePlus = false;
};
const onRefereePlusForBlue = () => {
    if (isRefereePlus) {
        ++blueWinStatus;
        initWinStatus(blueWinStatus, redWinStatus);
        let arr = {
            blueWinStatus: blueWinStatus,
            redWinStatus: redWinStatus,
            currentRound: pop
        };
        // localStorage.setItem('deukGam', JSON.stringify(arr));
        sendMessage('deukGam', arr);
    } else {
        alert('Chức năng này chỉ hoạt động khi đang nghỉ giữa hiệp');
    }
};
const onRefereePlusForRed = () => {
    if (isRefereePlus) {
        ++redWinStatus;
        initWinStatus(blueWinStatus, redWinStatus);
        let arr = {
            blueWinStatus: blueWinStatus,
            redWinStatus: redWinStatus,
            currentRound: pop
        };
        // localStorage.setItem('deukGam', JSON.stringify(arr));
        sendMessage('deukGam', arr);
    } else {
        alert('Chức năng này chỉ hoạt động khi đang nghỉ giữa hiệp');
    }
};
const onRefereeMinusForBlue = () => {
    if (isRefereePlus) {
        --blueWinStatus;
        initWinStatus(blueWinStatus, redWinStatus);
        let arr = {
            blueWinStatus: blueWinStatus,
            redWinStatus: redWinStatus,
            currentRound: pop
        };
        // localStorage.setItem('deukGam', JSON.stringify(arr));
        sendMessage('deukGam', arr);
    } else {
        alert('Chức năng này chỉ hoạt động khi đang nghỉ giữa hiệp');
    }
};
const onRefereeMinusForRed = () => {
    if (isRefereePlus) {
        --redWinStatus;
        initWinStatus(blueWinStatus, redWinStatus);
        let arr = {
            blueWinStatus: blueWinStatus,
            redWinStatus: redWinStatus,
            currentRound: pop
        };
        // localStorage.setItem('deukGam', JSON.stringify(arr));
        sendMessage('deukGam', arr);
    } else {
        alert('Chức năng này chỉ hoạt động khi đang nghỉ giữa hiệp');
    }
};
