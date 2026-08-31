from django.db import models
from django.utils.text import slugify

# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=100)
    desc = models.TextField()
    slug = models.SlugField(max_length=100,unique=True,blank=True)
    pick = models.ImageField(upload_to='blog_pics',null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self,*args,**kwargs):
        if not self.slug:
            self.slug = slugify(self.title)

        super().save(*args,**kwargs)



    def __str__(self):
        return self.title