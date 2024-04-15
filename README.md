##TESTING

#Curl commands used in testing:

curl -d name=pelle localhost:8080/games

curl -X PATCH localhost:8080/games/:id/join -H"Content-Type: application/json" -d '{"name":"ellla"}'

curl -X POST localhost:8080/games/{id}/move \
-H 'Content-Type: application/json' \
-d '{"name":"pelle","move":"stone"}' 

curl -g localhost:8080/games/:id
