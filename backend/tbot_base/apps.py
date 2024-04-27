from django.apps import AppConfig


class TbotConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tbot_base'
    verbose_name = 'Telegram bot settings'
    verbose_name_plural = 'Telegram bot settings'
