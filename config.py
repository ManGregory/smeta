CSRF_ENABLED = True
SECRET_KEY = '52be9208-e113-476e-9391-9793cc30ea16'

OPENID_PROVIDERS = [
    { 'name': 'google-plus', 'display_name': 'Google', 'url': 'https://www.google.com/accounts/o8/id' },
    { 'name': 'vk', 'display_name': 'VKontakte', 'url': 'http://vkontakteid.ru/'},
    { 'name': 'facebook', 'display_name': 'Facebook', 'url': 'http://facebook-openid.appspot.com/'}
]

import os
basedir = os.path.abspath(os.path.dirname(__file__))