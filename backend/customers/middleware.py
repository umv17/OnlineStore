import logging

logger = logging.getLogger(__name__)


class RequestLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        client_ip = request.META.get('REMOTE_ADDR')
        client_agent = request.META.get('HTTP_USER_AGENT')
        logger.info('Client IP: %s, User-Agent: %s', client_ip, client_agent)
        response = self.get_response(request)
        return response
