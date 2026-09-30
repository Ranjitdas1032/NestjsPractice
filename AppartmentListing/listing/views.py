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
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings

def regex_parse(query):
    result = {}

    for c in ['noida','gurugram','delhi']:
        if c in query:
            result['city'] = c 
            break

    if m := re.search(r"(\d+)\s*bhk",query):
        result['bedrooms'] = int(m.group(1))

    if m:= re.search(r"under\s*(\d+)\s*k",query):
        result['max_price'] = int(m.group(1)) * 1000

    return result



PROMPT = """Extract real-estate search filters from the user's query.
Return ONLY a JSON object, no other text. Allowed keys (include a key ONLY
if the query mentions it): "city" (lowercase string), "bedrooms" (integer),
"max_price" (integer, rupees per month; interpret "20k" as 20000, "1.5 lakh" as 150000).
Query: {query}"""


@api_view(['POST'])

def parsh_search(request):

    query = (request.data.get("query") or "").lower().strip()

    if not query:
        return Response({})

    try:
        from openai import OpenAI
        client = OpenAI(
            api_key=settings.LLM_API_KEY,
            base_url="https://api.groq.com/openai/v1",
        )

        completion = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            max_tokens=200,
            messages=[{"role":"user","content":PROMPT.format(query=query)}],
        )

        text= completion.choices[0].message.content.strip()

        if text.startswith("```"):
            text = text.strip("`").removeprefix("json").strip()

        parsed = json.loads(text)
        allowed= {k: parsed[k] for k in ("city","bedrooms","max_price") if k in parsed}

        return Response(allowed)

    except Exception as e:
        print("LLM parse failed:", type(e).__name__, e)
        return Response(regex_parse(query))


