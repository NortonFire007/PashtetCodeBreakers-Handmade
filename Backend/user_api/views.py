from django.shortcuts import render

from .models import CustomUser
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(['POST'])
def reg_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    phone_number = request.data.get('phone_number')
    if not any([email, password, last_name, first_name, phone_number]):
        return Response(
            {'error': 'Please provide all required fields: email, password, first_name, last_name, phone_number'},
            status=status.HTTP_400_BAD_REQUEST)
    user, created = CustomUser.objects.get_or_create(email=email,
                                                     first_name=first_name,
                                                     last_name=last_name,
                                                     city=request.data.get('city', 'Київ'),
                                                     phone_number=phone_number,
                                                     username=email)
    if created:
        user.set_password(password)
        user.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
        }, status=status.HTTP_201_CREATED)
    return Response({'error': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        refresh_token = request.data['refresh_token']
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'message': 'Logged out successfully.'}, status=status.HTTP_200_OK)
    except Exception:
        return Response({'error': 'Invalid refresh token.'}, status=status.HTTP_400_BAD_REQUEST)
