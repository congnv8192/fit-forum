

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

function createQuestionView(question) {
    const date = new Date(question.createdAt);

    const html = `<article class="question">
                    <h3>${question.text}</h3>
                    <p>${question.content}</p>
                    <div class="info">
                        <div class="user">
                            <img src="${question.user.avatar}" alt="">
                            <div class="profile">
                                <strong>${question.user.name}</strong>
                                <br />
                                <span>${date}</span>
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