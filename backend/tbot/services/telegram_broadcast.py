from tbot_base.bot import tbot as bot
from tbot.models import TelegramUser
from news_app.models import News
from backend.settings import STATIC_URL
from django.utils import timezone
from backend.celery import app

@app.task(name='send_news_to_users')
def send_news_to_users(news_id):
    users = TelegramUser.objects.all()
    news = News.objects.get(id=news_id)

    current_timezone = timezone.get_current_timezone()
    dt_value_with_timezone = timezone.localtime(news.date, current_timezone)
    
    news_title = f'<b>{news.title}</b>'
    news_date = f'<b>{news.date.strftime("%d-%m-%Y")} {dt_value_with_timezone.strftime("%H:%M")}</b>'
    news_caption = f'{news_title}\n\n{news.text}\n\n{news_date}'

    image_url = news.image.url
    with open(f'{STATIC_URL}{image_url}', 'rb') as photo:
        for user in users:
            bot.send_photo(user.user_id, photo=photo, caption=news_caption, parse_mode='HTML', timeout=60)