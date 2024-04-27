from telebot import types
from tbot_base.bot import tbot as bot
from tbot.models import TelegramUser

@bot.message_handler(commands=['start'])
def text_messages(message: types.Message):
    user_id = message.from_user.id
    first_name = message.from_user.first_name
    last_name = message.from_user.last_name
    username = message.from_user.username

    user, created = TelegramUser.objects.get_or_create(
        user_id=user_id,
        defaults={
            'first_name': first_name,
            'last_name': last_name,
            'username': username,
        },
    )

    if created:
        bot.send_message(user_id, f'Welcome {user.first_name}!')
    else:
        bot.send_message(user_id, f'Hello {user.first_name}!')