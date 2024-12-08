from flask import Flask, render_template, request, jsonify
from spellchecker import SpellChecker
from nltk.corpus import wordnet
import nltk

# Download necessary NLTK data files
nltk.download('wordnet')
nltk.download('omw-1.4')

app = Flask(__name__)

# Initialise spell checker
spell = SpellChecker(language='en')


def check_spelling(message):
    if not message.strip():
        return {}
    misspelled = spell.unknown(message.split())
    corrections = {word: spell.correction(word) for word in misspelled if spell.correction(word)}
    return corrections


def suggest_synonyms(message):
    words = message.split()
    synonyms = {}
    for word in words[:5]:
        try:
            syns = wordnet.synsets(word)
            if syns:
                unique_synonyms = list(set(lemma.name() for syn in syns for lemma in syn.lemmas() if lemma.name() != word))
                synonyms[word] = unique_synonyms[:5]
        except Exception:
            pass
    return synonyms


def chatbot_response(user_message):
    user_message = user_message.lower()
    corrections = check_spelling(user_message)
    synonyms = suggest_synonyms(user_message)

    if corrections:
        corrected_message = ' '.join(corrections.get(word, word) for word in user_message.split())
        feedback = f"I noticed some typos: {', '.join(f'{k} -> <b>{v}</b>' for k, v in corrections.items())}."
        return {
            "reply": f"Here's the corrected version: '<b>{corrected_message}</b>'.\n\n{feedback}",
            "corrections": corrections,
            "synonyms": synonyms,
        }

    return {
        "reply": "No spelling issues detected.",
        "corrections": {},
        "synonyms": synonyms,
    }


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '')
    bot_reply = chatbot_response(user_message)
    return jsonify(reply=bot_reply['reply'], corrections=bot_reply['corrections'], synonyms=bot_reply['synonyms'])


if __name__ == '__main__':
    app.run(debug=True)
