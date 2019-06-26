# Programmeerproject

Maria Daan (11243406)

## Amsterdamse woningmarkt
Het is in Amsterdam niet makkelijk om een betaalbaar huis te vinden, met name voor studenten. Door de grote vraag naar woningen zijn de prijzen hoog. Deze datavisualisatie is bedoeld om inzicht te krijgen in de woningvoorraad per stadsdeel en alles wat hierbij komt kijken: prijzen, omvang, eigendomscategorieën, bewonerskenmerken etc. Het doel van dit project is om een globaal overzicht van de huidige  woningmarkt in Amsterdam neer te zetten, wat aantoont in welke gebieden de kans op een woning voor studenten het grootste is.

## Visualisatie
Om duidelijk de verschillen tussen stadsdelen weer te geven, wordt er gebruik gemaakt van een kaart. Dit is een kaart van Amsterdam, waarbij elk stadsdeel over informatie beschikt. Hoe donker de kleur is die het stadsdeel heeft, zegt iets over de huurklasse. In de data worden 4 klasses gebruikt: tot €425,	€425-575, €575-681 en	>€681. De kleur betekent het percentage woningen in de eerste klasse. Op de afbeelding hieronder zijn alle kleuren nog verschillend, dit moet nog doorgevoerd worden.

Als je op een stadsdeel klikt, komt er een histogram (stacked barchart) en een cirkeldiagram tevoorschijn. In het histogram is iets gedetailleerder te zien hoe het precies zit met de woningvoorraad op gebied van huurprijzen. De 4 klasses die hiervoor besproken zijn, worden in de barchart weergegeven. De tweede bar geeft de inkomensverdeling weer, verdeeld over 6 klasses. Bij beide bars worden ook de absolute cijfers die hierbij horen weergegeven met behulp van een tooltip.

In de cirkeldiagram is de omvang van de woningvoorraad naar eigendomscategorie te zien: aandeel particuliere huurwoningen, aandeel corporatie-woningen en aandeel koopwoningen. Om deze aantallen concreter te maken wordt ook het exacte aantal weergegeven in dit diagram als je er met je muis overheen gaat.

Ook komt er wat algemene informatie in beeld: de naam van het stadsdeel, het aantal inwoners en het gemiddelde inkomen. Ook wordt hier extra informatie getoond die interessant kan zijn voor studenten: het percentage 18-25 jarigen in de buurt (zowel zittende bewoners als recente instromers), het percentage hurende bewoners dat gebruik maakt van huurtoeslag en het percentage bewoners met een HBO-WO opleidingsniveau. In onderstaande afbeelding is een voorbeeld te zien van hoe dit er ongeveer uit gaat zien.

![blah](https://github.com/mariadaan/Project/blob/master/doc/map.jpg)

## Extra
Aan deze datavisualisatie kunnen nog veel meer extra features toegevoegd worden die zouden kunnen helpen bij het vinden van een geschikte buurt voor een student. Zo zijn er bijvoorbeeld allerlei projecten voor de bouw van studentenwoningen gaande in Amsterdam, dus deze zouden benoemd kunnen worden als je op een stadsdeel klikt. Dit soort informatie is wat minder exact en is vooral leuk als er nog tijd over is.

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
