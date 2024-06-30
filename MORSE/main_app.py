from flask import Flask, render_template, jsonify, request
from a import *

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('morse-code-index.html')


@app.route('/text2morse', methods=['POST'])
def text2morse():
    data = request.get_json('text')
    print(data)
    return jsonify({'result': t2m(data['text'])})

@app.route('/morse2text', methods=['POST'])
def morse2text():
    text = request.get_json('morse')
    print(text)
    return jsonify({'result': m2t(text['morse'])})


if __name__ == '__main__':
    app.run(debug=True, port=5002)