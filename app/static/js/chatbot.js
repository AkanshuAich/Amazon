class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
            console.log("1");
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    async onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);
        this.updateChatText(chatbox);
        textField.value = '';

        // await this.sleep(2000); // Pause for 1 second
        // console.log("Hello")
        this.addTypingIndicator(chatbox);
        // Add typing indicator
        // this.addTypingIndicator(chatbox);

        fetch('/chat', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            // Remove typing indicator
            this.removeTypingIndicator(chatbox);

            let msg2 = { name: "Sam", message: r.answer };
            this.messages.push(msg2);
            this.updateChatText(chatbox);
            textField.value = '';

        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox);
            textField.value = '';
        });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item) {
            if (item.name === "Sam") {
                html += '<div class="messages__item messages__item--visitor">' + formatResponseText(item.message) + '</div>';
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;

        // this.addTypingIndicator(chatbox);
    }

    addTypingIndicator(chatbox) {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'messages__item messages__item--typing';
        typingIndicator.innerHTML = `
        <span class="messages__dot"></span>
        <span class="messages__dot"></span>
        <span class="messages__dot"></span>
        <br>
        <div style="font-size: 12px; color: black;">Amapay is typing...</div>
        `;
        chatbox.querySelector('.chatbox__messages').appendChild(typingIndicator);
    }

    removeTypingIndicator(chatbox) {
        const typingIndicator = chatbox.querySelector('.messages__item--typing');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

function formatResponseText(text) {
    // Split the text into paragraphs
    let paragraphs = text.split('\n').filter(paragraph => paragraph.trim() !== '');
    let formattedText = '';
    
    paragraphs.forEach(paragraph => {
        // Replace **text** with <strong>text</strong>
        paragraph = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formattedText += '<p>' + paragraph.trim() + '</p>';
    });

    return formattedText;
}

const chatbox = new Chatbox();
chatbox.display();