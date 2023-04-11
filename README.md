[![Python](https://img.shields.io/badge/-Python-464646?style=flat-square&logo=Python)](https://www.python.org/)
[![Django](https://img.shields.io/badge/-Django-464646?style=flat-square&logo=Django)](https://www.djangoproject.com/)
[![Django REST Framework](https://img.shields.io/badge/-Django%20REST%20Framework-464646?style=flat-square&logo=Django%20REST%20Framework)](https://www.django-rest-framework.org/)
[![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-464646?style=flat-square&logo=PostgreSQL)](https://www.postgresql.org/)
[![Nginx](https://img.shields.io/badge/-NGINX-464646?style=flat-square&logo=NGINX)](https://nginx.org/ru/)
[![gunicorn](https://img.shields.io/badge/-gunicorn-464646?style=flat-square&logo=gunicorn)](https://gunicorn.org/)
[![docker](https://img.shields.io/badge/-Docker-464646?style=flat-square&logo=docker)](https://www.docker.com/)

## Project Description: OnlineStore

OnlineStore is a web-based platform for selling and buying goods and services. It allows users to create accounts, search and browse for products, add items to a shopping cart, and place orders online. The platform includes features for managing user accounts, products, orders, payments, and shipping. The project is developed using modern web technologies such as Python, Django, HTML, CSS, and JavaScript.

### The project includes 3 services:

- backend - the backend image of the project
- frontend - the frontend image of the project
- postgres - the PostgreSQL database image
- nginx - the nginx web server image

### Prerequisites:

- Install Docker and Docker Compose.

### Set up the project:

1. Clone the repository:

```bash
git clone https://github.com/umv17/OnlineStore
```

2. Navigate to the infra folder and create a settings file '.env'; an example file can be viewed in '.env.example'.

3. Build the images with

```bash 
docker-compose up --build
``` 
### Perform initial setup:

4. Make migrations:

```bash 
docker-compose exec backend python manage.py makemigrations
```
5. Migrate the database:

```bash 
docker-compose exec backend python manage.py migrate
```

6. Create a superuser:

```bash 
docker-compose exec backend python manage.py createsuperuser
```

7. Collect static files:

```bash 
docker-compose exec backend python manage.py collectstatic --no-input
```

8. Load example dataset:

```bash 
docker-compose exec backend bash -c "shopt -s globstar; python manage.py loaddata /app/tests/fixtures/**/*.json"
```

### Configure photo upload settings:

1. Run the Minio service, create Buckets and Access Keys; modify the corresponding parameters in the .env settings file.

2. Access the Minio service:

```bash
http://127.0.0.1:9090/
```

### Restart docker-compose:

```bash
docker-compose down
docker-compose up
```

### Run a test suite:

```bash 
docker-compose exec backend pytest
```

### Author:
MU
