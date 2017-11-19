from django.conf.urls import url

from provider.views import ProviderList, ProviderDetail

urlpatterns = [
    url(r'^(?P<pk>[0-9]+)$', ProviderDetail.as_view(), name = 'detail'),
    url(r'^$', ProviderList.as_view(), name = 'list')
]
