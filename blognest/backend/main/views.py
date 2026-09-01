from django.shortcuts import render
from rest_framework.viewsets import ReadOnlyModelViewSet,ModelViewSet
from .serializer import Blogserializer
from .models import Blogs
# Create your views here.

class Blogviews(ReadOnlyModelViewSet):
    queryset = Blogs.objects.all()
    serializer_class = Blogserializer
    lookup_field = "slug"