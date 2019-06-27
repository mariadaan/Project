# Eindverslag

## Inhoud
- [Introductie](#introductie)
- [Technisch design](#technisch-design)
    - [Onderdelen](#onderdelen)
    - [Functies](#functies)
- [Uitdagingen en oplossingen](#uitdagingen-en-oplossingen)
- [Beslissingen](#Beslissingen)
- [Toekomst](#toekomst)

## Introductie
Als student zijnde weet ik zelf hoe lastig het is om een woning te vinden in Amsterdam. Ik was benieuwd naar hoe dit nou precies kwam en hoe verschillende factoren bij kunnen dragen aan de betaalbaarheid en beschikbaarheid van woningen binnen Amsterdam. Deze datavisualisatie is een eerste stap in de juiste richting om hier duidelijkheid over te verkrijgen.

Daarnaast is dit project voor mij een oefening geweest om bekend te raken met het maken van datavisualisaties in het algemeen. Door verschillende technieken te gebruiken en te experimenteren met soorten visualisaties, heb ik veel geleerd.

## Technisch design
Maar hoe zit dit project nou precies in elkaar? Om deze vraag te beantwoorden, geef ik eerst een globale uitleg van de funcionaliteit van het product. Later ga ik dieper in op specifieke delen van de code.

### Onderdelen
De pagina bestaat uit de volgende onderdelen:
- Menubalk bovenaan de pagina met twee navigatielinks
- Drie D3 visualisaties, allen interactief
  - Kaart van Amsterdam met on-click event
  - Barchart met buttons om te wisselen tussen data
  - Piechart met dropdown menu om te wisselen tussen categorieën
- Link naar de databron

![blah](https://github.com/mariadaan/Project/blob/master/doc/screen.jpg)

#### File & Code Structure
Elk paginaonderdeel wordt aangemaakt in een aparte file. Deze verdeling maakt alles overzichtelijk en goed te vinden.

##### Locatie: /code/javascript/
|      Bestandsnaam       |                                                                     Functie                                                                     |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| main.js    | Inladen data en maken van initiële pagina visualisatie.html door aanroepen functie _makeMap_                |
| map.js | Creeërt de kaart van Amsterdam en roept via een on-click event functies aan om de charts te tekenen                                                                                               |
| barchart.js | Barchart maken en updaten                                                                                             |
| piechart.js          | Piechart maken en updaten |
| info.js    | Extra informatie op de pagina tonen en updaten      |
| extras.js    | Extra functies die handig zijn binnen meerdere andere functies                                                   |

##### Locatie: /code/data
Data afkomstig van [Gemeente Amsterdam](https://data.amsterdam.nl/datasets/02qYaKxMyQZGWQ/). Deze originele data staat in /code/data/original. De verwerkte data, geschikt om in te laden en te gebruiken voor de visualisaties, staat in /code/data/merged.

|              Bestandsnaam               |                                                                              Functie                                                                              |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| database.json                | Hoofd-dataset, gebruikt voor alle visualisaties. Gebaseerd op data.xlsx, een zelfgemaakt Excel bestand met alle nodige originele data samengevoegd.                                                             |
| buurten.json                 | Dataset die hoort bij de [datamap van Amsterdam](http://bl.ocks.org/JulesBlm/918e2987805c7189f568d95a4e8855b4). Nodig om geodata te koppelen aan de data uit database.json  |
| stadsdeel_info.json | Kort stukje tekst voor elk stadsdeel om weer te geven in het tekstblokje onder de kaart.                                                                                      |



##### Locatie: /code/python/ & Starter Template for Bootstrap_files
Als laatste zijn er nog wat bestanden die nodig zijn geweest om de data in de gewenste stuctuur te krijgen en een css bestand om de pagina eruit te laten zien zoals ik wil.

|          Bestandsnaam          |                                                                           Functie                                                                           |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| starter-template.css                   | Bootstrap stylesheet, aangevuld met eigen styleafspraken voor alle onderdelen op de pagina                                                                                          |
| convertXLS2CSV.py   | Python script om Excel bestand om te zetten in CSV bestand                                                                                           |
| convertCSV2JSON.py             | Python script om CSV bestand om te zetten in JSON bestand

De andere bestanden in het mapje Starter Template for Bootstrap_files zijn niet door mij aangepast en horen bij het template van [Bootstrap](https://getbootstrap.com/docs/4.3/examples/starter-template/).

## Functies
De belangrijkste functies worden hier kort toegelicht.
#### map.js
_makeMap_: Aanmaken van een svg voor de kaart, kaart van Amsterdam hierop weergeven, data koppelen aan kaart. Kaart kleur geven op basis van deze data met bijbehorende gradient legenda. On-click event om andere charts te updaten. Titel bovenaan pagina. Alle functies om de charts te teken worden vanuit hier aangeroepen voor de initiële pagina.
_fillAgain_: Stadsdeel groen maken na klik, weer blauw maken na achtergrondklik.

#### barchart.js
_handleButtons_: Buttons voor barchart actief maken zodat functies aanroepen bij een klik.
_makeBarchart_: Maakt barchart svg aan en alles wat hierbij hoort (titels, assen, etc.)
_updateBarchart_: Update de barchart na een button klik of kaart klik

#### piechart.js
_makePiechart_: Maakt piechart svg aan en alles wat hierbij hoort (titels, assen, etc.). De update functie voor de piechart zit hierbinnen.

#### info.js
_showInfo_: Maakt plek op de pagina voor het tekstvakje
_updateInfo_: Update de tekst in het vak

#### extras.js
_updateTitle_: Update titel bovenaan de pagina
_initialPage_: Roept functies om initiële pagina te creeëren aan
_percentageFormat__: Maakt string in percentage format van een float
_getData_: Selecteert data uit array (gebruikt voor barchart)



## Uitdagingen en oplossingen
De grootste uitdaging is vooral aan het begin geweest. De data die ik wilde gebruiken was verdeeld over allemaal losse Excel bestanden. Met Python probeerde ik dit samen te voegen, maar dit was een beetje _mission impossible_. Toen besloot ik om gewoon handmatig de data in één bestand te zetten, dit was misschien 2 uur werk. Dit is een hele goede beslissing geweest want hierdoor had ik alles precies in het gewenste format en heb ik later nooit meer problemen gehad met de data.

Kleine dingen als het klikbaar maken van de achtergrond om terug te gaan naar de initiële pagina waren een hele uitdaging. De initialPage functie kon namelijk niet zomaar nog een keer aangeroepen worden, dan werden er opnieuw svgs aangemaakt die al bestonden. Ook wist ik niet goed hoe ik de achtergrond een klikbaar element moest maken, omdat het niet een g element is zoals een buurt maar het letterlijk niks is. Door een speciale functie te gebruiken die voorkomt dat bij het klikken van een element ook de 'parents' geselecteerd worden, heb ik toch kunnen bereiken wat ik wilde.

Over de piechart was wat onenigheid. Ik vond de animatie namelijk juist erg leuk en ik vond de gebruikte kleuren ook mooi. De meeste mensen waren dit met me eens, maar sommige begeleiders (~~Nigel~~) waren het hier niet mee eens en vonden dat het één kleur en een simpelere animatie moest hebben. Ik heb besloten om dit niet aan te passen omdat ik de verschillende kleuren juist goed bij de pagina vind passen en omdat dit duidelijk maakt dat de categorieën niet allemaal ordinaal zijn. Ook zou één kleur verwarrend zijn doordat de piechart op volgorde van grootte staat. Dit heb ik gedaan om duidelijk te maken hoe de volgorde in grootte zit.

## Toekomst
Het zou in te toekomst nog leuk zijn om het tekstvakje beter te gebruiken en meer informatie te tonen die over dit specifieke onderwerp gaat, een verklaring van de data die zichtbaar is. Helaas heb ik hier geen tijd meer voor gehad omdat het ook niet echt prioriteit had. Een ander ding wat ik graag nog had willen fixen, is het updaten van de piechart. Met de dropdown gebeurt dit wel, maar bij het wisselen tussen stadsdelen wordt nog steeds de hele svg verwijderd en opnieuw gemaakt. Dat had anders gekund!
