# *INSTABOOK* 
### Travel Agency 

## **MERN / Docker**
#### Šta je MERN stek?
MERN stek je JavaScript stek koji je dizajniran da učini proces razvoja lakšim. MERN uključuje četiri komponente otvorenog koda: MongoDB, Express, React i Node.js. Ove komponente nude pridruženi ****end-to-end okvir u kojem programeri mogu da rade.

### Bliži pogled na komponente MERN steka
#### MongoDB: baza podataka dokumenata na više platformi
MongoDB je NoSQL (non-relational) dokumentalno-orijentisana baza podataka. Podaci se čuvaju u fleksibilnim dokumentima sa jezikom upita zasnovanim na JSON (JavaScript Object Notation). MongoDB je poznat po tome što je fleksibilan i lak za skaliranje.
#### Express: Okvir za pozadinske web aplikacije
Express je okvir veb aplikacije za Node.js, drugu MERN komponentu. Umesto da ručno pišu kompletan kod web servera na Node.js direktno, programeri koriste Express da pojednostave zadatak pisanja serverskog koda.

## Inicijalizacija projekta
   Inicijalizacija aplikacije obavlja se u koracima koji slede: klonirajte sa GitHub linka https://github.com/stevislav/tourist-agency vezu u lokalnu fasciklu na računaru. Otvorite fasciklu koristeći VSCode ili bilo koji uređivač teksta po vašem izboru.

## Docker Compose 
  Compose je alatka za definisanje i pokretanje Docker aplikacija sa više kontejnera. Sa Compose, koristite YAML datoteku da biste konfigurisali usluge vaše aplikacije. Zatim, sa jednom komandom, kreirate i pokrećete sve usluge iz vaše konfiguracije.
Da bismo pokrenuli celu našu aplikaciju zajedno, tj. paralelno pokrenuli sve kontejnere, moramo da konfigurišemo datoteku docker-compose.


## Kreiranje i pokretanje aplikacije
**This is bold text**
Da bismo napravili build za celu aplikaciju, potrebno je da pokrenemo sledeću komandu: docker-compose build

Sistem sa više kontejnera možemo pokrenuti pomoću sledeće komande: docker-compose up

Konačno, možemo da otvorimo http://localhost:3000 da vidimo naš React Frontend.

Pozadinski server je aktivan na http://localhost:8800

A MongoDB radi na http://localhost:27017
