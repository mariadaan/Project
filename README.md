# Programmeerproject

Maria Daan (11243406)

## Amsterdamse woningmarkt
Het is in Amsterdam niet makkelijk om een betaalbaar huis te vinden, met name voor studenten. Door de grote vraag en het grote aandeel particuliere huur zijn de prijzen hoog. Deze datavisualisatie is bedoeld om inzicht te krijgen in de woningvoorraad per
stadsdeel en alles wat hierbij komt kijken: prijzen, omvang, eigendomscategorieën, bewonerskenmerken etc. Het doel van dit project is om een duidelijk overzicht van de huidige  woningmarkt in Amsterdam neer te zetten, wat aantoont in welke gebieden de kans op een woning voor studenten het grootste is.

## Visualisatie
Om duidelijk de verschillen tussen stadsdelen weer te geven, wordt er gebruik gemaakt van een kaart. Dit is een kaart van Amsterdam, waarbij elk stadsdeel over informatie beschikt. Als je op een stadsdeel klikt, komt er een histogram (stacked barchart) en een cirkeldiagram tevoorschijn. In het histogram is de inkomensverdeling te zien van de bewoners van dit gebied. In de cirkeldiagram is de samenstelling van de woningvoorraad te zien: aandeel particuliere huurwoningen, aandeel sociale huurwoningen, aandeel koopwoningen, etc. Verder wordt er nog wat extra informatie weergegeven zoals de naam van het stadsdeel, het aantal inwoners en kenmerken van recente instromers. In onderstaande afbeelding is een voorbeeld te zien van hoe dit er ongeveer uit gaat zien.

![blah](https://github.com/mariadaan/Project/blob/master/doc/map.jpg)

## Data sources
De kaart op de afbeelding is een bestaande D3 kaart van tram/metro/trein lijnen en haltes/stations in Amsterdam en omstreken. Deze kaart kan ik goed gebruiken voor mijn project. Omdat mijn project echter niet over openbaar vervoer gaat, moeten hier aanpassingen aan gedaan worden. Ook moeten de namen van de buurten gekoppeld worden aan stadsdelen en zo aan data over de woningmarkt. Deze kaart is gemaakt in D3 versie 4, dus dit moet ook getransformeerd worden naar versie 5.
- http://bl.ocks.org/JulesBlm/918e2987805c7189f568d95a4e8855b4

De data komt van Amsterdam City Data. Er is genoeg data te vinden hier, maar er moet wel het een en ander geherstructureerd worden. Zo is er een apart Excel bestand per stadsdeel, dit moet samengevoegd worden tot één database en de bruikbare data moet eruit gefilterd worden.
- https://data.amsterdam.nl/datasets/02qYaKxMyQZGWQ/

## External components
- https://d3js.org/d3.v5.min.js
- https://d3js.org/d3-scale-chromatic.v1.min.js
- https://d3js.org/d3-geo-projection.v1.min.js
- http://d3js.org/topojson.v2.min.js
- https://npmcdn.com/@turf/turf/turf.min.js
