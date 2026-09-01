from django.db import models
from django.utils.text import slugify

# Create your models here.
class Blogs(models.Model):
    title = models.CharField(max_length=100)
    excerpt = models.CharField(max_length=300)  
    body = models.TextField(null=True,blank=True)
    slug = models.SlugField(max_length=100,unique=True,blank=True)
    published_at = models.DateTimeField(auto_now_add=True)

    def save(self,*args,**kwargs):
        if not self.slug:
            base = slugify(self.title)
            slug = base
            n = 1

            while Blogs.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                n += 1
                slug = f"{base}-{n}"
            self.slug = slug
        super().save(*args,**kwargs)


    def __str__(self):
        return self.title