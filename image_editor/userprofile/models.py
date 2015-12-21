from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class UserProfile(models.Model):

    user = models.OneToOneField(User,related_name="profile")
    social_id = models.CharField(max_length=200, null=True)
    image = models.CharField(max_length=200, null=True)

    def get_user(self):
        return User.objects.get(id=self.user_id)


User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])