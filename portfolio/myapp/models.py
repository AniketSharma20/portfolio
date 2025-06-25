from django.db import models
from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=40)
    email = models.EmailField(max_length=40)
    number=models.CharField(max_length=400)
    content=models.TextField(max_length=13)

 
