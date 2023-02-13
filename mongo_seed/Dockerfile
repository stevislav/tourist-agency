FROM mongo

COPY active2.json /active2.json
COPY active3.json /active3.json
COPY active4.json /active4.json
COPY active5.json /active5.json
COPY neaktivni2.json /neaktivni2.json
COPY korisnici2.json /korisnici2.json
COPY pending2.json /pending2.json

CMD mongoimport 'mongodb://mongodb:27017/test' --collection offers --drop --jsonArray --file /active2.json  &&    \
     mongoimport 'mongodb://mongodb:27017/test' --collection offers --jsonArray --file /active3.json  &&    \
     mongoimport 'mongodb://mongodb:27017/test' --collection offers --jsonArray --file /active4.json  &&    \
     mongoimport 'mongodb://mongodb:27017/test' --collection offers --jsonArray --file /active5.json  &&    \
     mongoimport 'mongodb://mongodb:27017/test' --collection offers --jsonArray --file /neaktivni2.json &&    \
     mongoimport 'mongodb://mongodb:27017/test' --collection users  --drop --jsonArray --file /korisnici2.json  &&    \
     mongoimport 'mongodb://mongodb:27017/test' --collection pendingoffers  --drop --jsonArray --file /pending2.json 


