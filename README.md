# *INSTABOOK* 
### Travel Agency 
      Cilj ovog projekta jeste da objasni modelovanje baze podataka koja zadovoljava zahteve realnog sistema kakav je Agencija za putovanja kao i samu implementaciju baze podataka na MongoDB Atlas serveru i aplikativnog softvera u Node.js okruženju.
## **MERN / Docker**
#### Šta je MERN stek?
MERN stek je JavaScript stek koji je dizajniran da učini proces razvoja lakšim. MERN uključuje četiri komponente otvorenog koda: MongoDB, Express, React i Node.js. Ove komponente nude pridruženi ****end-to-end okvir u kojem programeri mogu da rade.

### Bliži pogled na komponente MERN steka
#### MongoDB: baza podataka dokumenata na više platformi
[MongoDB](https://www.mongodb.com/) je NoSQL (non-relational) dokumentalno-orijentisana baza podataka. Podaci se čuvaju u fleksibilnim dokumentima sa jezikom upita zasnovanim na JSON (JavaScript Object Notation). MongoDB je poznat po tome što je fleksibilan i lak za skaliranje.
#### Express: Okvir za pozadinske web aplikacije
[Express](https://expressjs.com/) je okvir veb aplikacije za Node.js, drugu MERN komponentu. Umesto da ručno pišu kompletan kod web servera na Node.js direktno, programeri koriste Express da pojednostave zadatak pisanja serverskog koda.
#### React: JavaScript biblioteka za izgradnju korisničkih interfejsa
[React](https://reactjs.org/) je prvobitno kreirao softverski inženjer na Facebook-u, a kasnije je postao open-sourced. React biblioteka se može koristiti za kreiranje prikaza renderovanih u HTML-u.
#### Node.js: Višeplatformsko JavaScript okruženje za izvršavanje
[Node.js](https://nodejs.org/en/) je napravljen na Chrome-ovoj V8 JavaScript mašini. Dizajniran je za pravljenje skalabilnih mrežnih aplikacija i može da izvršava JavaScript kod van pretraživača. Za više informacija, možete pogledati članak u nastavku: https://medium.com/dsckiit/getting-started-with-node-js-89663e4e0e9e


## Inicijalizacija projekta
   Inicijalizacija aplikacije obavlja se u koracima koji slede: klonirajte sa GitHub linka https://github.com/stevislav/tourist-agency vezu u lokalnu fasciklu na računaru. Otvorite fasciklu koristeći VSCode ili bilo koji uređivač teksta po vašem izboru i ukucajte sledeću liniju koda u terminalu.
   
      git clone --single-branch -b "main" https://github.com/stevislav/tourist-agency.git .

## Docker Compose 
  Compose je alatka za definisanje i pokretanje Docker aplikacija sa više kontejnera. Sa Compose, koristite YAML datoteku da biste konfigurisali usluge vaše aplikacije. Zatim, sa jednom komandom, kreirate i pokrećete sve usluge iz vaše konfiguracije.
Da bismo pokrenuli celu našu aplikaciju zajedno, tj. paralelno pokrenuli sve kontejnere, moramo da konfigurišemo datoteku docker-compose.


## Kreiranje i pokretanje aplikacije

Da bismo napravili build za celu aplikaciju, potrebno je da pokrenemo sledeću komandu: 

      docker-compose build

Sistem sa više kontejnera možemo pokrenuti pomoću sledeće komande: 

      docker-compose up

Konačno, možemo da otvorimo http://localhost:3000 da vidimo naš React Frontend.

Pozadinski server je aktivan na http://localhost:8800

A MongoDB radi na http://localhost:27017

**Možete pokrenuti kontejnere svaki pojedinačno radi sigurnosti redosleda pokretanja, i to na sledeći način:**

      docker-compose up -d mongodb
      
      docker-compose up -d mongo_seed
      
      docker-compose up -d api
      
      docker-compose up -d client
      
**Na početnoj stranici se, pored pojedinog sadržaja koji je izdvojen, daje mogućnost pretrage unošenjem parametara:**
      
* lokacije
* kontinenta ili grada 
* načinu prevoza
* datumu odlaska I povratka

U aplikaciji postoje tri načina prijavljivanja i to kao:

*	admin
*	user
*	staff

      
![image](https://user-images.githubusercontent.com/85966007/218750174-e07feab5-2418-4f30-ba4a-b2a19dacfe96.png)

Na profilu Admina, on može da izmeni svoje lične podatke. Takođe, ima mogućnost uvida u tabelu aranžmana, kao i dozvolu da izmeni, obriše ili doda novu ponudu (slika ispod).

![image](https://user-images.githubusercontent.com/85966007/218790489-cbbd152c-b905-4110-988f-29face9cbb8a.png)
