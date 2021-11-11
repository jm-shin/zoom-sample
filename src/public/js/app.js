const messageList = document.querySelector('ul');
const messageForm = document.querySelector('#message');
const nickForm = document.querySelector('#nickname');

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
    console.log('서버 연결 완료');
});

socket.addEventListener('message', (message) => {
    //console.log('New message:', message.data);
    const li = document.createElement('li');
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener('close', () => {
    console.log('서버 연결 종료');
});

function handleSubmit (event) {
    event.preventDefault();
    const input = messageForm.querySelector('input');
    socket.send(input.value);
    input.value = '';
}

function handleNickSubmit (event) {
        event.preventDefault();
        const input = nickForm.querySelector('input');
        socket.send(input.value);
}

messageForm.addEventListener('submit', handleSubmit);
nickForm.addEventListener('submit', handleNickSubmit);