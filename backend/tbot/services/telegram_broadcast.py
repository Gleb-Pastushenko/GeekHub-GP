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
        
        news_title = f'<b>{news.title}</b>'
        news_date = f'<b>{news.date.strftime("%d-%m-%Y")} {news.date.strftime("%H:%M")}</b>'
        news_caption = f'{news_title}\n\n{news.text}\n\n{news_date}'
        
        bot.send_photo(user.user_id, photo=photo, caption=news_caption, parse_mode='HTML')