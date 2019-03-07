from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)


@app.route('/')
def route_index():
    return render_template('index.html')

@app.route('/cards')
def cards():
    card_number = 2 * int(request.args['card-number'])
    return render_template('cards.html'
                           , card_number=card_number
                           )


if __name__ == '__main__':
    app.secret_key = "some_key"
    app.run(
        host='0.0.0.0',
        port=7000,
        debug=True
    )
