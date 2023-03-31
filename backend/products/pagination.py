from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class ProductPagination(PageNumberPagination):
    page_size = 6

    def get_paginated_response(self, data):
        page = int(self.request.query_params.get(self.page_query_param, 1))
        pages = (self.page.paginator.count - 1) // self.page_size + 1
        previous_num_page = page - 1 if page > 1 else None
        next_num_page = page + 1 if pages > page else None
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link(),
                'next_num_page': next_num_page,
                'previous_num_page': previous_num_page
            },
            'page': page,
            'pages': pages,
            'count': self.page.paginator.count,
            'result': data
        })
