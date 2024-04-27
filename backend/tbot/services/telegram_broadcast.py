from tbot_base.bot import tbot as bot
from tbot.models import TelegramUser
from news_app.models import News
from backend.settings import STATIC_URL

def send_news_to_users(news_id):
    users = TelegramUser.objects.all()
    news = News.objects.get(id=news_id)
    
    for user in users:
        image_url = news.image.url
        photo = open(f'{STATIC_URL}{image_url}', 'rb')
        
        bot.send_photo(user.user_id, photo=photo, caption=news.title)