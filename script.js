

// const onReady = (jsObject) => {
//     console.log(jsObject);
// } 

// // fetch api
// const onSuccess = (response) => {
//     // read body stream as string
//     // parse string -> js object
//     const promise = response.json();
//     promise.then(onReady);
// };

// const onFail = (error) => {
//     console.log(error);
// };

// const promise = fetch('http://localhost:3000/api/questions');
// promise.then(onSuccess, onFail);

const content = document.querySelector('#content');

function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

function createQuestionView(question) {
    const date = new Date(question.createdAt);
    const dateHumanReadable = timeDifference(new Date(), date);

    const html = `<article class="question">
                    <h3>${question.text}</h3>
                    <p>${question.content}</p>
                    <div class="info">
                        <div class="user">
                            <img src="${question.user.avatar}" alt="">
                            <div class="profile">
                                <strong>${question.user.name}</strong>
                                <span>${dateHumanReadable}</span>
                            </div>
                        </div>
                        <div class="answer">
                            ${question.answers.length} answers
                        </div>
                    </div>
                </article>`;
    content.innerHTML += html;
}

function createQuestionsView(questions) {
    for(const question of questions) {
        createQuestionView(question);
    }
}

async function start() {
    const response = await fetch('http://localhost:3000/api/questions');
    const questions = await response.json();
    
    createQuestionsView(questions);
}

start();


/////////////////////// profile menu
const profile = document.querySelector('#profile');
const menuProfile = document.querySelector('#menu-profile');
profile.addEventListener('click', () => {
    menuProfile.classList.toggle('hidden');
});