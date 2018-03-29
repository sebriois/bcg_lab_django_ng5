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
from django.urls import path, include, re_path
from django.views.generic import TemplateView, RedirectView
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

from bcg_lab.routers import CustomRouter
from provider import views as provider_views
from product import views as product_views
from order import views as order_views
from budget import views as budget_views
from team import views as team_views
from bcg_lab import user_views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'api/users', user_views.UserViewSet)
router.register(r'api/teams', team_views.TeamViewSet)
router.register(r'api/providers', provider_views.ProviderViewSet)
router.register(r'api/resellers', provider_views.ResellerViewSet)
router.register(r'api/products', product_views.ProductViewSet)
router.register(r'api/cart', order_views.CartViewSet)
router.register(r'api/budgets', budget_views.BudgetViewSet)
router.register(r'api/budgetlines', budget_views.BudgetLineViewSet)

custom_router = CustomRouter()
router.register(r'api/orders', order_views.OrderViewSet)

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/login/', obtain_jwt_token),
    path('api/auth/verify-token/', verify_jwt_token),
    path('api/auth/refresh-token/', refresh_jwt_token),
    path('api/', include(router.urls)),
    re_path('^(?!/?static/)(?!/?media/)(?P<path>.*\..*)$', RedirectView.as_view(url='/static/%(path)s', permanent=False)),
    path('', TemplateView.as_view(template_name="%s/index.html" % (settings.DEBUG and 'src' or 'dist'))),
]

urlpatterns += router.urls
urlpatterns += custom_router.urls

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
