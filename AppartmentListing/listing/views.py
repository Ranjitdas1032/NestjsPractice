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

import re
from rest_framework.decorators import api_view
from rest_framework.response import Response

CITIES = ["noida", "delhi", "gurgaon", "gurugram", "pune"]

@api_view(['POST'])
def parsh_search(request):
    query = (request.data.get('query') or "").lower()
    result = {}

    for c in CITIES:
        if c in query:
            result["city"] = c

    q = re.search(r"(\d+)\s*bhk",query)

    if q:
        result["bedrooms"] = int(q.group(1))

    q = re.search(r"under\s*(\d+)s*k",query)

    if q:
        result["price"] = int(q.group(1)) * 1000

    return Response(result)