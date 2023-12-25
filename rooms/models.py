from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Room(models.Model):
    name = models.CharField(max_length = 100)
    slug = models.SlugField(unique = True)
    image = models.URLField(max_length = 200,blank = True)
    text = models.TextField(blank = True)

    def __str__(self):
        return self.name
    
class Message(models.Model):
    room = models.ForeignKey(Room,related_name='messages',on_delete=models.CASCADE)
    user = models.ForeignKey(User,related_name="messages",on_delete=models.CASCADE)
    content = models.TextField()
    date_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('date_time',)
