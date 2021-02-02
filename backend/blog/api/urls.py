from rest_framework import routers
from .apis import BlogViewSet

router = routers.DefaultRouter()
router.register('blogs',BlogViewSet,'blogs')

urlpatterns = router.urls
