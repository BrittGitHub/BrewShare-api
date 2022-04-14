#!/bin/sh

ID="625788e198f7ad6029f79b92"
TOKEN="ad2f90da225c034c5b4c717b42cc0e07"

API="http://localhost:4741"
URL_PATH="/beers"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \

  echo