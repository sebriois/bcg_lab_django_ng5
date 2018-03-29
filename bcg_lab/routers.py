from rest_framework.routers import DefaultRouter, DynamicDetailRoute, Route


class CustomRouter(DefaultRouter):
    routes = [
        Route(
            url=r'^{prefix}$',
            mapping={'get': 'list', 'post': 'create'},
            name='{basename}-list',
            initkwargs={'suffix': 'List'}
        ),
        Route(
            url=r'^{prefix}/{lookup}$',
            mapping={'get': 'retrieve', 'put': 'update', 'delete': 'delete'},
            name='{basename}-detail',
            initkwargs={'suffix': 'Detail'}
        ),
        DynamicDetailRoute(
            url = r'^{prefix}/{lookup}/{methodnamehyphen}$',
            name = '{basename}-{methodnamehyphen}',
            initkwargs = {}
        )
    ]