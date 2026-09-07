from django.shortcuts import render
from .serializers import ListingSerializers
from .models import Listing
from rest_framework import viewsets

# Create your views here.

class ListingView(viewsets.ModelViewSet):
    serializer_class = ListingSerializers

    def get_queryset(self):
        qs = Listing.objects.all().order_by('-created_at')

        city = self.request.query_params.get("city")
        max_price = self.request.query_params.get("max_price")
        bedrooms = self.request.query_params.get("bedroom")

        if city:
            qs = qs.filter(city__icontains=city)

        if max_price:
            qs = qs.filter(price__ite=max_price)

        if bedrooms:
            qs = qs.filter(bedrooms=bedrooms)

        return qs