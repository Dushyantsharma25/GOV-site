from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
import os

# Create your views here.

def home(request):
    return render(request, 'main/home.html')

def about(request):
    return render(request, 'main/about.html')

def contact(request):
    return render(request, 'main/contact.html')

def get_gemini_key(request):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        api_key = settings.GEMINI_API_KEY
        if not api_key:
            return JsonResponse({'error': 'API key not configured'}, status=500)
        return JsonResponse({'apiKey': api_key})
    return JsonResponse({'error': 'Invalid request'}, status=400)
