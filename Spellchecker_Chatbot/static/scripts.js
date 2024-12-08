const chatBody = document.getElementById('chatBody');
const userInput = document.getElementById('userInput');
const synonymData = document.getElementById('synonymData');

function addMessage(message, isUser) {
    const timestamp = new Date().toLocaleTimeString();
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message ' + (isUser ? 'user-message' : 'bot-message');
    messageDiv.innerHTML = `<strong>${timestamp}</strong> - ${message}`;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function updateSynonymSuggestions(synonyms) {
    if (Object.keys(synonyms).length === 0) {
        synonymData.textContent = 'No suggestions available.';
        return;
    }
    synonymData.innerHTML = Object.entries(synonyms)
        .map(([word, suggestions]) => 
            `<p class="synonym-item"><strong>${word}:</strong> ${suggestions.join(', ')}</p>`
        )
        .join('');
}

function typeMessageSlowly(message, isUser) {
    const timestamp = new Date().toLocaleTimeString();
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message ' + (isUser ? 'user-message' : 'bot-message');
    chatBody.appendChild(messageDiv);

    let index = 0;
    const interval = setInterval(() => {
        messageDiv.innerHTML = `<strong>${timestamp}</strong> - ${message.substring(0, index)}`;
        index++;
        if (index > message.length) {
            clearInterval(interval);
        }
    }, 50);
}

function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = '';

    fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
    })
    .then(response => response.json())
    .then(data => {
        typeMessageSlowly(data.reply, false);
        updateSynonymSuggestions(data.synonyms);
    })
    .catch(error => {
        console.error('Fetch error:', error);
        addMessage("Error: Could not connect to the server.", false);
    });
}

function clearChat() {
    chatBody.innerHTML = '';
    synonymData.textContent = 'No data yet.';
}
