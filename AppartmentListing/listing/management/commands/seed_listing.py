import random
from django.core.management.base import BaseCommand
from listing.models import Listing

CITIES = ["Noida","Gurugram","Delhi","Pune"]
TITLES = ["Cozy Apartment", "Modern Flat", "Spacious Home", "Budget Studio", "Luxury Suite"]

class Command(BaseCommand):
    help = "Seed the database with sample listing"

    def handle(self,*args,**kwargs):
        Listing.objects.all().delete()

        for i in range(25):
            Listing.objects.create(
                title=f"{random.choice(TITLES)} #{i+1}",
                city=random.choice(CITIES),
                price=random.choice([15000, 25000, 35000, 45000, 60000, 80000]),
                bedrooms=random.randint(1, 4),
            )

        self.stdout.write(self.style.SUCCESS("Seeded 25 listings"))