from django.shortcuts import render
from .serializers import DigestSerializers
from rest_framework import viewsets
from .models import Digest
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.
class DigestView(viewsets.ModelViewSet):
    queryset = Digest.objects.all()
    serializer_class = DigestSerializers

    @action(detail=False, methods=["get"])
    def latest(self, request):
        latest_digest = Digest.objects.order_by("-created_at").first()

        serializer = self.get_serializer(latest_digest)

        return Response(serializer.data)