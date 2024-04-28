from django.db import models
from django.core.exceptions import ValidationError

from loguru import logger
from telebot.apihelper import ApiTelegramException

AUTO_FILLED_IN = 'це поле буде заповнено автоматично'


class BotConfig(models.Model):
    """ Base Telegram bot model """
    title = models.CharField(verbose_name="Ім'я бота", max_length=100,
                             blank=True, editable=False, default=AUTO_FILLED_IN)
    link = models.URLField(verbose_name='URL-адреса бота', max_length=150,
                           blank=True, editable=False, default=AUTO_FILLED_IN)
    username = models.CharField(max_length=100, blank=True, editable=False,
                                default=AUTO_FILLED_IN)
    tid = models.CharField(max_length=100, blank=True, editable=False,
                           default=AUTO_FILLED_IN)

    token = models.CharField(verbose_name='TOKEN бота', max_length=150,
                             help_text='вставте TOKEN, отриманий від BotFather')
    server_url = models.CharField(verbose_name='URL-адреса вебхуку', max_length=200,
                                  help_text="https://<ім'я домену>")

    is_active = models.BooleanField(default=True)

    def update_bot_config(self):
        from .bot import tbot

        tbot.config = self
        tbot.token = self.token

        return tbot

    def set_fields(self, tbot):
        j_data = tbot.get_me()

        self.title = j_data.first_name
        self.username = j_data.username
        self.tid = j_data.id
        self.link = f"https://t.me/{j_data.username}"

    def set_hook(self, tbot):
        webhook_url = f"{self.server_url}/get_tel_hook/"
        result = tbot.set_webhook(webhook_url, drop_pending_updates=True, timeout=10)
        logger.info(f"Webhook: {result}")

    def set_active_config(self):
        if self.is_active:
            other_active_configs = BotConfig.objects.filter(is_active=True)
            for config in other_active_configs:
                if config.pk != self.pk:
                    config.is_active = False
                    config.save()

    def clean(self):
        tbot = self.update_bot_config()

        try:
            self.set_fields(tbot)
            self.set_hook(tbot)
            self.set_active_config()

        except ApiTelegramException as e:
            logger.debug(e)
            raise ValidationError(
                'Недійсний "Token бота" або "Url-адреса вебхуку"!'
                'Виправте помилку та збережіть конфігурацію знову.'
            )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Налаштування Telegram бота'
        verbose_name_plural = 'Налаштування Telegram ботів'
