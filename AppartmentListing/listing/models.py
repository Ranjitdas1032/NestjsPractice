from django.db import models

# Create your models here.
class Listing(models.Model):
    title = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    price = models.IntegerField()
    bedrooms = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title