import os
from flask import Flask, render_template, send_from_directory
from forms import LoginForm

# initialization
app = Flask(__name__)
app.config.from_object('config')
app.config.update(
    DEBUG = True
)

# controllers
@app.route("/")
def index():
	projects = [
		{
			'name' : 'Project 1'
		},
		{
			'name' : 'Project 2'
		}
	]
	return render_template("index.html", projects = projects)

@app.route("/login", methods = ['GET', 'POST'])
def login():
	form = LoginForm()
	return render_template('login.html',
		title = 'Sign in',
		form = form)	

@app.route("/favicon.ico")    
def favicon():
	return send_from_directory(os.path.join(app.root_path, 'static'), 'ico/favicon.ico')

@app.errorhandler(404)
def page_not_found(e):
	return render_template('404.html'), 404	

# launch
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)