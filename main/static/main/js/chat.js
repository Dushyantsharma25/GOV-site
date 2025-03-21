class ChatBot {
    constructor() {
        this.genAI = null;
        this.initialized = false;
        this.initializeElements();
        this.addEventListeners();
        this.initializeGeminiAPI();
    }

    initializeElements() {
        this.chatToggleBtn = document.getElementById('chatToggleBtn');
        this.chatContainer = document.getElementById('chatContainer');
        this.chatCloseBtn = document.getElementById('chatCloseBtn');
        this.chatForm = document.getElementById('chatForm');
        this.messageInput = document.getElementById('messageInput');
        this.chatMessages = document.getElementById('chatMessages');
    }

    addEventListeners() {
        this.chatToggleBtn.addEventListener('click', () => this.toggleChat());
        this.chatCloseBtn.addEventListener('click', () => this.closeChat());
        this.chatForm.addEventListener('submit', (e) => this.handleSubmit(e));
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.chatForm.dispatchEvent(new Event('submit'));
            }
        });
    }

    async initializeGeminiAPI() {
        try {
            console.log('Initializing Gemini API...');
            const response = await fetch('/api/gemini-key/', {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': document.querySelector('[name=csrf-token]').content
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch API key');
            }

            const data = await response.json();
            
            if (data.apiKey) {
                console.log('API key received successfully');
                this.genAI = new GoogleGenerativeAI(data.apiKey);
                this.initialized = true;
            } else {
                throw new Error('API key not found in response');
            }
        } catch (error) {
            console.error('Error initializing Gemini API:', error);
            this.addMessage('bot', 'Sorry, I\'m having trouble connecting to my AI services. Please try again later.');
        }
    }

    toggleChat() {
        this.chatContainer.classList.toggle('active');
        if (this.chatContainer.classList.contains('active')) {
            this.messageInput.focus();
        }
    }

    closeChat() {
        this.chatContainer.classList.remove('active');
    }

    async handleSubmit(e) {
        e.preventDefault();
        const message = this.messageInput.value.trim();
        
        if (!message) return;

        // Clear input and disable form
        this.messageInput.value = '';
        this.setFormEnabled(false);

        // Add user message
        this.addMessage('user', message);

        // Show typing indicator
        const typingIndicator = this.showTypingIndicator();

        try {
            if (!this.initialized) {
                await this.initializeGeminiAPI();
                if (!this.initialized) {
                    throw new Error('Failed to initialize AI');
                }
            }

            // Get AI response
            const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(message);
            const response = await result.response;
            const text = response.text();

            // Remove typing indicator and add response
            typingIndicator.remove();
            this.addMessage('bot', text);

        } catch (error) {
            console.error('Error getting AI response:', error);
            typingIndicator.remove();
            this.addMessage('bot', 'I apologize, but I encountered an error. Please try again.');
        }

        // Re-enable form
        this.setFormEnabled(true);
        this.messageInput.focus();
    }

    addMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${this.escapeHtml(content)}</p>
            </div>
        `;

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot';
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
        return typingDiv;
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    setFormEnabled(enabled) {
        this.messageInput.disabled = !enabled;
        this.chatForm.querySelector('button').disabled = !enabled;
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
}); 