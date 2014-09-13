from flask.ext.wtf import Form
from wtforms.fields import HiddenField, BooleanField
from wtforms.validators import Required

class LoginForm(Form):
	openid = HiddenField('openid', validators = [Required()])
	remember_me = BooleanField('remember_me', default = False)