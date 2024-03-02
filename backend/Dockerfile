FROM python:3.13.0a4-slim
WORKDIR /app
COPY . .
RUN pip3 install --upgrade pip && pip3 install -r requirements.txt --no-cache-dir
CMD ["gunicorn", "core.wsgi:application", "--bind", "0:8000"]