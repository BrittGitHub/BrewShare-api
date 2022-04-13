#!/bin/sh

ID="6256dbf1c427fc39ec9933f5"
TOKEN="ad2f90da225c034c5b4c717b42cc0e07"

API="http://localhost:4741"
URL_PATH="/beers"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \

  echo