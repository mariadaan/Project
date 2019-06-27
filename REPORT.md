# Eindverslag

## Inhoud
- [Introductie](#introductie)
- [Technisch design](#technisch-design)
    - [Onderdelen](#onderdelen)
    - [Functies](#functies)
- [Uitdagingen](#uitdagingen)
- [Beslissingen: waarom?](#Beslissingen:-waarom?)
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
