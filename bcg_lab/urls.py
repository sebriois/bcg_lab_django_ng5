"""bcg_lab URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from django.views.generic import TemplateView, RedirectView
from rest_framework.routers import DefaultRouter

from provider import views as provider_views
from product import views as product_views
from order import views as order_views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'providers', provider_views.ProviderViewSet)
router.register(r'products', product_views.ProductViewSet)
router.register(r'orders', order_views.OrderViewSet)

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('^(?!/?static/)(?!/?media/)(?P<path>.*\..*)$', RedirectView.as_view(url='/static/%(path)s', permanent=False)),
    path('', TemplateView.as_view(template_name="%s/index.html" % (settings.DEBUG and 'src' or 'dist'))),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
