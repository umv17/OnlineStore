from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


class CustomCreateUpdateAPIView(viewsets.GenericViewSet,
                                mixins.CreateModelMixin,
                                mixins.UpdateModelMixin):
    pass


class CustomGenericViewSet(viewsets.GenericViewSet,
                           mixins.ListModelMixin,
                           mixins.RetrieveModelMixin,
                           mixins.DestroyModelMixin,
                           mixins.CreateModelMixin):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
