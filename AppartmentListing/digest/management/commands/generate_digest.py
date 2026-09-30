from django.core.management.base import BaseCommand
from django.db.models import Avg, Count
from listing.models import Listing
from digest.models import Digest


class Command(BaseCommand):
    help = " generate a marke digest for current list"

    def handle(self,*args,**kwargs):
        rows = (Listing.objects.values("city")
                .annotate(avg_price=Avg("price"),count=Count('id')))

        stats = {r["city"].lower() : {"avg_price" : round(r["avg_price"]), "count" : round(r["count"])}
                 for r in rows}

        summary = "Mock" + ";".join(
            f"{city.title()}: {s['count']} listings, avg ₹{s['avg_price']:,}"
            for city, s in stats.items()
        )

        digest = Digest.objects.create(summary=summary,stats=stats,trend=5)
        self.stdout.write(self.style.SUCCESS(f"Created digest : #{digest.pk}"))