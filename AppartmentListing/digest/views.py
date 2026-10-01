from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Digest
from .serializers import DigestSerializers


class DigestView(viewsets.ModelViewSet):
    queryset = Digest.objects.all()
    serializer_class = DigestSerializers

    @action(detail=False, methods=["get"])
    def latest(self, request):
        latest_digest = Digest.objects.order_by("-created_at").first()

        serializer = self.get_serializer(latest_digest)

        return Response(serializer.data)


# ---------------- AI ----------------

import json
from rest_framework.decorators import api_view
from django.conf import settings
from openai import OpenAI


PROMPT = """
Suppose you are a real-estate analyst.

You will be provided with data:
city : average price, listing count

Provide ONLY a JSON object with exactly two keys:

"summary": A 3-4 line overview of prices. Mention the cheapest and most expensive city.

"trend": An integer from 1-10 showing overall market activity.

Data:
{query}
"""


@api_view(["POST"])
def detail(request):

    query = (request.data.get("query") or "").strip()

    if not query:
        return Response({"error": "Query is required"}, status=400)

    try:

        client = OpenAI(
            api_key=settings.LLM_API_KEY,
            base_url="https://api.groq.com/openai/v1",
        )

        completion = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            max_tokens=1000,
            messages=[
                {
                    "role": "user",
                    "content": PROMPT.format(query=query)
                }
            ],
        )

        text = completion.choices[0].message.content.strip()

        print("AI RESPONSE:", text)

        if text.startswith("```"):
            text = text.replace("```json", "")
            text = text.replace("```", "")
            text = text.strip()

        parsed = json.loads(text)

        return Response({
            "summary": parsed.get("summary"),
            "trend": parsed.get("trend")
        })

    except Exception as e:

        print("ERROR:", type(e).__name__, e)

        return Response({
            "error": type(e).__name__,
            "message": str(e)
        }, status=500)