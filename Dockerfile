FROM python:3.10-slim
WORKDIR /app
COPY ./templates templates/
COPY ./static static/
COPY main.py .
COPY requirements.txt .
RUN pip install -r requirements.txt
EXPOSE 8888
