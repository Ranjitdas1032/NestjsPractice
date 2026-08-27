from django.shortcuts import render
from .serializers import noteSerializer
from .models import Notes
from rest_framework import viewsets
# Create your views here.

class NoteView(viewsets.ModelViewSet):
    queryset = Notes.objects.all().order_by("-updated_at")
    serializer_class = noteSerializer

