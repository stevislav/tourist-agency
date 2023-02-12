FROM mongo

COPY active.json /active.json
COPY neaktivni2.json /neaktivni2.json
COPY korisnici.json /korisnici.json
COPY pending.json /pending.json

CMD mongoimport 'mongodb://mongodb:27017/test' --collection offers --drop --jsonArray --file /active.json  &&    \
     mongoimport 'mongodb://mongodb:27017/test' --collection offers  --jsonArray --file /neaktivni2.json &&    \
     mongoimport 'mongodb://mongodb:27017/test' --collection users  --drop --jsonArray --file /korisnici.json  &&    \
     mongoimport 'mongodb://mongodb:27017/test' --collection pendingoffers  --drop --jsonArray --file /pending.json 


