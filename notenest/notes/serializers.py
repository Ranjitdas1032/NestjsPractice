from rest_framework import serializers
from .models import Notes

class noteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ["id", "title", "body", "created_at", "updated_at"]

