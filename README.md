## Travel Agency 
## INSTABOOK 
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
