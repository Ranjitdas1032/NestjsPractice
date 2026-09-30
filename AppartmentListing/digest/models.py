from django.db import models

# Create your models here.
class Digest(models.Model):
    summary = models.TextField()
    stats = models.JSONField(default=dict)
    trend = models.PositiveSmallIntegerField(default=5)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Digest {self.created_at:%Y-%m-%d %H:%M}"
