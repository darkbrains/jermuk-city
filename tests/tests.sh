#!/bin/bash


# Create Docker network
docker network create test-net --driver bridge


# Start jermuk-city Docker container
docker run --network test-net --name jermuk-city \
  -p 8880:8888 \
  blackdocs/jermuk-city:local &

sleep 5


# Test /api/healthz endpoint
HTTP_STATUS_HEALTHZ=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8880/api/healthz -H "Content-Type: application/json")
if [ "$HTTP_STATUS_HEALTHZ" -eq 200 ]; then
  echo "/api/healthz $HTTP_STATUS_HEALTHZ OK" >> status_report.txt
else
  echo "/api/healthz $HTTP_STATUS_HEALTHZ Failed" >> status_report.txt
fi

sleep 5


# Test / endpoint
HTTP_STATUS_SLASH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8880/ -H "Content-Type: application/json")
if [ "$HTTP_STATUS_SLASH" -eq 302 ]; then
  echo "/ $HTTP_STATUS_SLASH OK" >> status_report.txt
else
  echo "/ $HTTP_STATUS_SLASH Failed" >> status_report.txt
fi

sleep 5


# Test /en endpoint
HTTP_STATUS_EN=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8880/en -H "Content-Type: application/json")
if [ "$HTTP_STATUS_EN" -eq 200 ]; then
  echo "/en $HTTP_STATUS_EN OK" >> status_report.txt
else
  echo "/en $HTTP_STATUS_EN Failed" >> status_report.txt
fi

sleep 5


# Test /ru endpoint
HTTP_STATUS_RU=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8880/ru -H "Content-Type: application/json")
if [ "$HTTP_STATUS_RU" -eq 200 ]; then
  echo "/ru $HTTP_STATUS_RU OK" >> status_report.txt
else
  echo "/ru $HTTP_STATUS_RU Failed" >> status_report.txt
fi

sleep 5


# Test /am endpoint
HTTP_STATUS_AM=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8880/am -H "Content-Type: application/json")
if [ "$HTTP_STATUS_AM" -eq 200 ]; then
  echo "/am $HTTP_STATUS_AM OK" >> status_report.txt
else
  echo "/am $HTTP_STATUS_AM Failed" >> status_report.txt
fi

sleep 5


# Test /hotels endpoint
HTTP_STATUS_SLASH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8880/hotels -H "Content-Type: application/json")
if [ "$HTTP_STATUS_SLASH" -eq 302 ]; then
  echo "/hotels $HTTP_STATUS_SLASH OK" >> status_report.txt
else
  echo "/hotels $HTTP_STATUS_SLASH Failed" >> status_report.txt
fi

sleep 5


# Test /hotels/en endpoint
HTTP_STATUS_HOTELS_EN=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8880/hotels/en -H "Content-Type: application/json")
if [ "$HTTP_STATUS_HOTELS_EN" -eq 200 ]; then
  echo "/hotels/en $HTTP_STATUS_HOTELS_EN OK" >> status_report.txt
else
  echo "/hotels/en $HTTP_STATUS_HOTELS_EN Failed" >> status_report.txt
fi

sleep 5


# Test /hotels/ru endpoint
HTTP_STATUS_HOTELS_RU=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8880/hotels/ru -H "Content-Type: application/json")
if [ "$HTTP_STATUS_HOTELS_RU" -eq 200 ]; then
  echo "/hotels/ru $HTTP_STATUS_HOTELS_RU OK" >> status_report.txt
else
  echo "/hotels/ru $HTTP_STATUS_HOTELS_RU Failed" >> status_report.txt
fi

sleep 5


# Test /hotels/am endpoint
HTTP_STATUS_HOTELS_AM=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8880/hotels/am -H "Content-Type: application/json")
if [ "$HTTP_STATUS_HOTELS_AM" -eq 200 ]; then
  echo "/hotels/am $HTTP_STATUS_HOTELS_AM OK" >> status_report.txt
else
  echo "/hotels/am $HTTP_STATUS_HOTELS_AM Failed" >> status_report.txt
fi

sleep 5


# Test /empty
HTTP_STATUS_EMPTY=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8880/empty -H "Content-Type: application/json")
if [ "$HTTP_STATUS_EMPTY" -eq 404 ]; then
  echo "/empty $HTTP_STATUS_EMPTY OK" >> status_report.txt
else
  echo "/empty $HTTP_STATUS_EMPTY Failed" >> status_report.txt
fi

sleep 5


# Stop and remove the Docker containers
docker stop jermuk-city
docker rm jermuk-city


# Status Report
if grep -iwq "Failed" status_report.txt; then
  echo "Tests Failed"
  grep -iw "Failed" status_report.txt
  exit 1
else
  echo "Tests Passed"
  grep -iw "OK" status_report.txt
fi
