from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import JsonResponse
from django.shortcuts import render
from django.db.models import Case, When

from rest_framework import generics, viewsets, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken

from user_api.models import CustomUser
from .models import Product, Category, Favourites, ProductComment
from .serializers import ProductSerializer, CategorySerializer, FavouritesSerializer, ProductCommentSerializer
from .permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly


def paginate_data(data_list, request, page_size=20):
    paginator = Paginator(data_list, page_size)
    page_number = request.GET.get('page', 1)
    page = paginator.get_page(page_number)

    serializer = ProductSerializer(page, many=True)

    return {
        'page_number': page.number,
        'total_pages': paginator.num_pages,
        'has_previous': page.has_previous(),
        'has_next': page.has_next(),
        'data': serializer.data
    }


def get_page_range(products, max_pages=10):
    current_page = products.number
    total_pages = products.paginator.num_pages

    if total_pages <= max_pages:
        return range(1, total_pages + 1)

    start_page = max(1, current_page - 5)
    end_page = min(total_pages, current_page + 4)

    if start_page <= 3:
        end_page = max(end_page, 10)
    elif end_page >= total_pages - 2:
        start_page = min(start_page, total_pages - 9)

    page_range = list(range(start_page, end_page + 1))
    if start_page > 1:
        page_range.insert(0, '...')
    if end_page < total_pages:
        page_range.append('...')

    return page_range


def paginate_and_get_page_range(data_list, request, page_size=8):
    paginator = Paginator(data_list, page_size)
    page_number = request.GET.get('page', 1)

    try:
        data_list = paginator.page(page_number)
    except PageNotAnInteger:
        data_list = paginator.page(1)
    except EmptyPage:
        data_list = paginator.page(paginator.num_pages)

    page_range = get_page_range(data_list)

    return data_list, page_range


def apply_sorting_and_pagination(data_list, request, page_size=8):
    sort_by = request.GET.get('sort_by', '')
    if sort_by == 'price_asc':
        data_list = data_list.order_by('price')
    elif sort_by == 'price_desc':
        data_list = data_list.order_by('-price')
    elif sort_by == 'rating':
        data_list = data_list.order_by('-rating')
    elif sort_by == 'new':
        data_list = data_list.order_by('-created_at')

    return paginate_and_get_page_range(data_list, request, page_size)


def add_product(request):
    categories = Category.objects.all()

    return render(request, 'shop/addproduct.html', {'categories': categories})


def index(request):
    products = Product.objects.all().order_by('-created_at')[:4]
    token = request.COOKIES.get('accessToken')
    # token = request.headers.get('Authorization')
    access_token = AccessToken(token)
    user = access_token.payload.get('user_id')

    favourite_products = Favourites.objects.filter(user=user)[:4]

    top_rated_products = Product.objects.all().order_by('-rating', '-reviews_qty')[:4]

    last_viewed_products = list(filter(lambda x: x.strip(), get_last_viewed_products(request)))
    ordering = Case(*[When(id=id, then=pos) for pos, id in enumerate(last_viewed_products)])
    last_viewed_products = Product.objects.filter(id__in=last_viewed_products).order_by(ordering)

    return render(request, 'shop/index.html', {'products': products, 'favourite_products': favourite_products,
                                               'top_rated_products': top_rated_products,
                                               'last_viewed_products': last_viewed_products})


def get_last_viewed_products(request):
    last_viewed_products = []

    if last_viewed_cookie := request.COOKIES.get('recentlyViewed'):
        viewed_ids = last_viewed_cookie.split(',')
        last_viewed_products = viewed_ids[::-1]
        print('viewed_ids', last_viewed_products)
    return last_viewed_products


def search(request):
    products = Product.objects.all()

    if query := request.GET.get('query'):
        products = products.filter(title__icontains=query)

    products, page_range = apply_sorting_and_pagination(products, request)

    return render(request, 'shop/search.html', {'products': products, 'page_range': page_range})


def register(request):
    return render(request, 'shop/register.html')


def login(request):
    return render(request, 'shop/login.html')


def categories(request, cat_id):
    category = Category.objects.get(id=cat_id)
    products = Product.objects.filter(category=category.pk)

    products, page_range = apply_sorting_and_pagination(products, request)

    return render(request, 'shop/categories.html',
                  {'products': products, 'category': category, 'page_range': page_range})


def seller_page(request, user_id):
    user = CustomUser.objects.get(id=user_id)
    products = Product.objects.filter(user=user)
    return render(request, 'shop/itemofseller.html', {'user': user, 'products': products})


def favourite(request):
    # print('request', request)
    # token = request.headers.get('Authorization')
    token = request.COOKIES.get('accessToken')
    print('token: ', token)
    access_token = AccessToken(token)
    # print('token: ', access_token)
    user = access_token.payload.get('user_id')

    favourite_products = Favourites.objects.filter(user=user)

    favourite_products, page_range = paginate_and_get_page_range(favourite_products, request)

    context = {
        'favourite_products': favourite_products,
        'page_range': page_range
    }
    return render(request, 'shop/favorite.html', context)


class FavouritesApiList(APIView):
    def get(self, request, *args, **kwargs):
        favourites = Favourites.objects.all()
        product_id = request.query_params.get('product_id')
        user_id = request.query_params.get('user_id')
        if (user_id and product_id):
            favourites = favourites.filter(user=user_id, product_id=product_id)
        if (user_id):
            favourites = favourites.filter(user=user_id)

        serializer = FavouritesSerializer(favourites, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        token = request.headers.get('Authorization', '').split(' ')[1]
        access_token = AccessToken(token)
        user = access_token.payload.get('user_id')

        data = {
            'product': request.data.get('productId'),
            'user': user,
        }
        serializer = FavouritesSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        user = request.user
        productId = request.GET.get('productId')
        favourites = Favourites.objects.filter(user=user, product_id=productId)
        favourites.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def item(request, product_id):
    product = Product.objects.get(id=product_id)
    user = CustomUser.objects.get(id=product.user.id)
    comments = ProductComment.objects.filter(product=product).order_by('-created_at')
    return render(request, 'shop/item.html', {'product': product, 'user': user, 'comments': comments})


def userEdit(request):
    return render(request, 'shop/changeuserdata.html')


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductApiList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        queryset = Product.objects.all()
        name = self.request.query_params.get('title')
        if name:
            queryset = queryset.filter(title__icontains=name)
        return queryset


class ProductApiUpdate(generics.RetrieveUpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsOwnerOrReadOnly,)


class ProductApiDestroy(generics.RetrieveDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsOwnerOrReadOnly,)


class ProductCommentCreateView(generics.CreateAPIView):
    queryset = ProductComment.objects.all()
    serializer_class = ProductCommentSerializer
    permission_classes = (IsOwnerOrReadOnly,)
