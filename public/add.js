// get form
const form = document.querySelector('form');

// listen for submit event
async function onSubmit(event) {
    event.preventDefault();

    // get user input
    const textInput = document.querySelector('input#text');
    const text = textInput.value;

    const contentInput = document.querySelector('input#content');
    const content = contentInput.value;
    
    // send data  -> server
    const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, content })
    });

    if (response.status === 400) {
        alert('Text & content are required!');
    } else {
        alert('Success');
        window.location.replace("/");
    }
}
form.addEventListener('submit', onSubmit);