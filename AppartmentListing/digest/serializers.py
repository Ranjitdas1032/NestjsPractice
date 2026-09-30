from rest_framework import serializers
from .models import Digest

class DigestSerializers(serializers.ModelSerializer):
    class Meta:
        model = Digest
        fields = "__all__"
