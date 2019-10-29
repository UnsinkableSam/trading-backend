[![Build Status](https://travis-ci.org/UnsinkableSam/trading-backend.svg?branch=master)](https://travis-ci.org/UnsinkableSam/trading-backend)
[![Code Coverage](https://scrutinizer-ci.com/g/UnsinkableSam/trading-backend/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/UnsinkableSam/trading-backend/?branch=master)

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/UnsinkableSam/trading-backend/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/UnsinkableSam/trading-backend/?branch=master)


### Krav 1: Backend

Jag valde att bygga min backend med express. Jag valde express för jag har jobbat med det i kursen och känner mig något säker på att använda 
express. Men tänkte även det skulle vara bra att jobba mer med det för att de finns mycket jag fortfarande inte kan.Något skulle 
vara att jag inte jobbar korrekt med models och liknande ännu. Gjorde bättre struktur och för just filer med api routes i sin egen map och databas modeler i sin. 
Jag gjorde det simpelt med socket genom att koppla ihop det via app.js där jag hämtar information från databasen. 

Min databas var mongodb för att jag känner jag lär mig mer att jobba med mongodb och har inte tidigare jobbat med det. Tycker mongo verkar coolt och väldigt enkelt att använda men försökte hitta lite små tricks med mongodb men inga som direkt kunde användas för projektet. 


### Krav 3: Realtid Backend

Realtid backend var lätt att implementera valde att göra det via app.js där socket emittar information direkt från databasen. Informationen av trading objekten för även här in i databasen för att kunna ha tillgång till de i hela backenden och kunna skicka över de enklare med socket.emit. Jag valde inte att göra någon direkt history eftersom detta skulle vara realtid så valde jag att skippa history. När man i vanliga fall tradar i realtid så brukar man köpa när det dippar och inte titta på historiken för det är ett kortids köp till det peakar igen under dagen. Skapar även datum till mina emits som skickas över till frontend där detta används för att visa x-axlen. 



### Krav 4 tester backend. 
Testerna består av mocha och chai. 
Det var inte så svårt att få kodtäckning hade nog kunnat få högre men kände att jag vill lägga mer engergi på andra krav. Tycker testning i kursen tidigare har varit en bra guide för hur man ska utföra och skapa test suites. 

Jag fick runt 82% kodtäckning det skulle kunna bli mer om jag la mer tid 
på att plocka bort alla console.logs vilket ger högre täckning. 


Jag är väl nöjd över min kodkvalitet fick 10 på första försökte så kan ju knappast vara något annat. Finns ju saker jag själv skulle vilja förbättra på min kod hur jag använder mina modeler och göra de mindre dependet på olika parametrar och annat. Finns mycket som kan bli bättre. 

#### Stocks post. 
Första testet här vi kollar att vi får rätt information från våran stocks post route. Statsu, array och att arrayen inte är tom. 

#### Register test. 
Vi kollar att det går att registerar sig via register routen med status och user id. 


#### getmember() 
Vi kollar att vi kan hämta en specifik användare med vårat id. Status, array och större än noll. 


#### post /stock
Här köper vi en stock till våran användare och kollar detta genom asserta status 200. 



#### post /sell
Vi kollar att vi kan sälja våran stock vi precis köpt med assert på status. 


#### post /login 
Vi kollar att man kan logga in på vårat api och assertar detta igenom status. 

