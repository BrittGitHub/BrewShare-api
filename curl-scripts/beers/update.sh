
ID="6256dbf1c427fc39ec9933f5"
TOKEN="ad2f90da225c034c5b4c717b42cc0e07"
NAME="Rainbows are Real"
BEERSTYLE="Hazy Double IPA"
ABV="6.9"
BREWER="CLOWN SHOES"
OWNER="6255e72b84d24f2248c6b003"

API="http://localhost:4741"
URL_PATH="/beers"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "beer": {
      "name": "'"${NAME}"'",
      "beerStyle": "'"${BEERSTYLE}"'",
      "abv": "'"${ABV}"'",
      "brewer": "'"${BREWER}"'",
      "brewerCountry": "'"${BREWERCOUNTRY}"'",
      "consumptionType": "'"${CONSUMPTIONTYPE}"'",
      "personalRatingNum": "'"${PRN}"'",
      "ratingDescription": "'"${RATINGDESC}"'",
      "purchasedLocation": "'"${PURCHASEDLOCATION}"'",
      "purchasedPrice": "'"${PURCHASEDPRICE}"'",
      "purchasedDate": "'"${PURCHASEDATE}"'",
      "owner": "'"${OWNER}"'"
    }
  }'