from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def root(request):
    """
    Checks the HTTP method of the incoming request and passes it to the
    appropriate method

    :param request Django request object
    :returns JSON response
    """
    if request.method == 'GET':
        return GET(request)

    elif request.method == 'POST':
        return POST(request)

    else:
        return HttpResponse(status=404, content='Invalid request method used')


def POST(request):
    """
    """
    return JsonResponse({ 'hello': 'world'})

def GET(request):
    """
    """
    return JsonResponse({ 'hello': 'world' })
