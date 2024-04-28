from celery import shared_task
from tbot_base.bot import tbot as bot
from tbot.models import TelegramUser
from news_app.models import News
from backend.settings import STATIC_URL
from django.utils import timezone
import os

@shared_task
def send_news_to_users(news_id):
    news = News.objects.get(id=news_id)
    image_url = news.image.url
    image_path = os.path.join(STATIC_URL, image_url.lstrip('/'))

    current_timezone = timezone.get_current_timezone()
    dt_value_with_timezone = timezone.localtime(news.date, current_timezone)
    news_title = f'<b>{news.title}</b>'
    news_date = f'<b>{news.date.strftime("%d-%m-%Y")} {dt_value_with_timezone.strftime("%H:%M")}</b>'
    news_caption = f'{news_title}\n\n{news.text}\n\n{news_date}'

    with open(image_path, 'rb') as photo:
        users = TelegramUser.objects.all()
        for user in users:
            bot.send_photo(user.user_id, photo=photo, caption=news_caption, parse_mode='HTML')
