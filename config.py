CSRF_ENABLED = True
SECRET_KEY = '52be9208-e113-476e-9391-9793cc30ea16'

OPENID_PROVIDERS = [
    { 'name': 'google-plus', 'url': 'https://www.google.com/accounts/o8/id' },
    { 'name': 'vk', 'url': 'http://vkontakteid.ru/'},
    { 'name': 'facebook', 'url': 'http://facebook-openid.appspot.com/'}
]