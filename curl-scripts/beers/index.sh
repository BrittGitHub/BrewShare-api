#!/bin/sh

TOKEN="ad2f90da225c034c5b4c717b42cc0e07"

API="http://localhost:4741"
URL_PATH="/beers"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo