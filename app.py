import os
from flask import Flask, render_template, flash, redirect, session, url_for, request, g
from forms import LoginForm
from flask.ext.openid import OpenID
from config import basedir

# initialization
app = Flask(__name__)
app.config.from_object('config')
app.config.update(
    DEBUG = True
)
oid = OpenID(app, os.path.join(basedir, 'tmp'))

# controllers
@app.route("/")
@app.route("/index")
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
@oid.loginhandler
def login():
	form = LoginForm()
	if form.validate_on_submit():
		session['remember_me'] = form.remember_me.data		
		return oid.try_login(form.openid.data, ask_for = ['nickname', 'email'])		
	return render_template('login.html',
		title = 'Sign in',
		form = form,
		providers = app.config['OPENID_PROVIDERS'])

@oid.after_login
def after_login(resp):
	if resp.email is None or resp.email == "":
		flash('Invalid login. Please try again.', 'danger')
		return redirect(url_for('login'))
	remember_me = False
	if 'remember_me' in session:
		remember_me = session['remember_me']
		session.pop('remember_me', None)
	flash(request.args.get('next'), 'info')
	return redirect(request.args.get('next') or url_for('index'))

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