# Spelling Checker Chatbot

A Flask-based web application that serves as a spelling checker chatbot. It provides feedback on spelling errors in user messages and suggests synonyms for words to enhance vocabulary and language understanding. The application includes a visually appealing user interface built with HTML, CSS, and JavaScript.

---

## Features

- **Spelling Correction:** Detects and corrects misspelled words in user input.
- **Synonym Suggestions:** Provides up to five synonyms for each word in the input message.
- **Interactive Chat UI:** A responsive and user-friendly chat interface.
- **Real-Time Feedback:** Immediate responses for spelling corrections and synonym suggestions.

---

## Folder Structure

Below is a recommended folder structure for organizing the project:

```
Spellchecker Chatbot/
│   ├── assets/         
│   │   ├── Chatbot_example.PNG
│   ├── static/              
│   │   ├── styles.css       
│   │   ├── scripts.js       
│   ├── templates/           
│   │   ├── index.html       
└── app.py                   
```

---

## Installation

### Prerequisites

- Python 3.7+
- pip (Python package manager)

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Ruhul127/Spellchecker-Chatbot.git
   cd Spellchecker-Chatbot
   ```

2. **Set Up a Virtual Environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Download Required NLTK Data:**
   Ensure the following NLTK datasets are downloaded:
   ```python
   import nltk
   nltk.download('wordnet')
   nltk.download('omw-1.4')
   ```

5. **Run the Application:**
   ```bash
   python run.py
   ```

6. **Access the Application:**
   Open your browser and navigate to `http://127.0.0.1:5000`.

---

## Usage

1. Type a message in the input field of the chat interface.
2. Press the "Send" button to receive feedback on spelling and synonyms.
3. View corrected messages and synonym suggestions in the chat window and the right-hand panel.

---
