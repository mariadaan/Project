## Data
Ik maak gebruik van 7 verschillende excel bestanden. Deze hebben allemaal dezelfde structuur en de data is compleet. De Excel bestanden hebben allemaal 37 verschillende sheets, waarvan er 7 door mij gebruikt worden. Omdat elke sheet anders in elkaar zit en de hoeveelheid data te overzien is, was het het snelste om de relevante data handmatig in één bestand te zetten.

Gebruikte datasets:
- centrum_excel.xlsx
- west_excel.xlsx
- nieuw-west_excel.xlsx
- zuid_excel.xlsx
- oost_excel.xlsx
- noord_excel.xlsx
- zuidoost_excel.xlsx

Gebruikte sheets:
- 1: Omvang woningvoorraad naar eigendomscategorie per (samengestelde) buurtcombinatie
- 2: Omvang huurvoorraad in vier klassen
- 16: Gemiddeld inkomen van de instromers en zittende bewoners
- 17: Recente instromers en zittende bewoners naar inkomensgroepen
- 18: Vorige woonsituatie recente instromers en zittende bewoners
- 19: Leeftijdsgroep recente instromers en zittende bewoners
- 20: Opleidingsniveau recente instromers en zittende bewoners

De gesimplificeerde namen voor deze sheets die in de code worden gebruikt zijn:
- 1: Eigendomscategorie
- 2: Huurvoorraad
- 16: Inkomen
- 17: Inkomensgroepen
- 18: Woonsituatie
- 19: Leeftijdsgroep
- 20: Opleidingsniveau

Binnen de sheets moet ook nog veel gefilterd worden. Omdat de informatie alleen per stadsdeel en niet per buurt weergegeven gaat worden, wordt naar de totaalcijfers in de bestanden gekeken. Deze totaalcijfers heb ik gekopieerd naar het samengevoegde Excel bestand in een gewenste structuur. Het CSV bestand moet in de rijen alle stadsdelen en in de kolommen alle bijbehorende cijfers hebben. De cijfers zijn allemaal naast elkaar in de kolommen genoteerd.

Het JSON bestand moet zo uit gaan zien:
JSON File:
{
	"Centrum": {
		"koopwoningen": 0.36,
		"corporatie-woningen": 0.31,
		"particuliere huurwoningen": 0.33,
		"< 425": 0.45,
		"425-575": 0.29,
		"575-681": 0.07,
		.....
		"lager middelbaar": 0.15,
		"hoger middelbaar": 0.31,
		"HBO/WO": 0.51
	},
	"West": {
		"koopwoningen": 0.29,
    ....
  }
}

Om hier te komen gebruik ik de volgende files:
- convertXLS2CSV.py
- convertCSV2JSON.py

### Functionaliteit

De kleur van de stadsdelen in de kaart: sheet 2.
Stacked barchart: sheet 2 en 17.
Cirkeldiagram : sheet 1, 16, 18, 19, 20.

De namen van de stadsdelen kunnen gekoppeld worden aan de namen van de stadsdelen die de kaart bevat. Ik gebruik een bestaande D3 kaart van Amsterdam (http://bl.ocks.org/JulesBlm/918e2987805c7189f568d95a4e8855b4#trammetro.json). Deze kaart beschikt over stadsdeel-informatie, ook al is de kaart meer op buurtschaal gemaakt. Elke buurt heeft een 'Stadsdeel_code', die gebruikt kan worden om mijn data te koppelen aan de kaartobjecten. De initiële kaart gaat over het ov netwerk, wat voor mij niet interessant is. Dit onderdeel wordt dus verwijderd. De informatie uit sheet 2, de omvang van de huurvoorraad, wordt gebruikt om de kleur van elk stadsdeel op de kaart weer te geven: hoe donkerder, hoe hoger de huurprijs. De omvang van de huurvoorraad in de data is verdeeld over 4 categorieën en is dus niet één gemiddelde. Omdat de laagste categorie vooral interessant is voor studenten, wordt het percentage huurwoningen onder de 425 euro weergegeven. Als je over de stadsdelen heen beweegt met je muis, krijg je in een tooltip de naam van het stadsdeel en dit exacte percentage te zien.

Als je vervolgens op een stadsdeel klikt, komen er 2 grafieken in beeld. In de stacked barchart zijn twee variabelen af te lezen. Allereerst de inkomensverdeling (sheet 17) waarin zichtbaar is hoe groot het aandeel mensen in elke inkomensklasse is. In de andere bar is een gedetailleerde verdeling te zien van de informatie die de kleuren op de kaart ook al weergeven: het aandeel mensen in elke huurklasse. Dit is interessant om naast elkaar te zien omdat er een verband bestaat tussen deze variabelen.

In de cirkeldiagram wordt in eerste instantie duidelijk hoe het zit met de eigendomscategorieën in het aangeklikte stadsdeel. In de tooltip staat hoe groot het percentage van elke categorie precies is. Met een drop-down menu kan je overschakelen naar andere informatie (sheet 16, 18, 19 of 20). Een aantal van de elementen hierin zullen klikbaar zijn. Er zal een tekstje met meer informatie zichtbaar worden over dit onderwerp in dit specifieke stadsdeel. Deze informatie zal ik zelf bij elkaar zoeken en komt niet uit één specifieke database.

### Functies
In de javascript code worden verschillende functies gebruikt om deze functionaliteit te realiseren.

- makeMap
- makeBarchart
- makePiechart

De eerste en belangrijkste functie is "makeMap". Deze functie wordt gebruikt om de volledige kaart van Amsterdam op de pagina te zetten.

Vervolgens zijn de functies "makeBarchart" en "makePiechart" nodig om de grafieken te maken. Deze functies worden beide aangeroepen op het moment dat de gebruiker een stadsdeel aanklikt.
