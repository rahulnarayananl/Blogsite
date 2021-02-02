from django.db import models

# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=100)
    body = models.CharField(max_length=1000)
    author = models.CharField(max_length=100)
    