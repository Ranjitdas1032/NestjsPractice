"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from listing.views import ListingView
from rest_framework.routers import DefaultRouter
from listing import views
from digest.views import DigestView
from digest import views as aiviews

router = DefaultRouter()
router.register(r"api/listings", ListingView, basename="listing")
router.register(r"api/digest", DigestView, basename="digest")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include(router.urls)),
    path("api/parse-search/",views.parsh_search , name='parsh_search'),
    path('api/ai-summerised/',aiviews.detail, name='detail'),
]
