## Data
Ik maak gebruik van 7 verschillende excel bestanden. Deze hebben wel allemaal exact dezelfde structuur, dus 1 python script moet genoeg zijn om deze tot een bruikbare JSON file te transformeren. De Excel bestanden hebben allemaal 37 verschillende sheets, waarvan er 7 door mij gebruikt worden.

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

De kleur van de stadsdelen in de kaart: sheet 2.
Stacked barchart: sheet 2 en 17.
Cirkeldiagram : sheet 1.
Tabel: sheet 16, 18, 19 en 20.

Binnen de sheets moet ook nog veel gefilterd worden. Omdat de informatie alleen per stadsdeel en niet per buurt weergegeven gaat worden, wordt naar de totaalcijfers in de bestanden gekeken. Dit is dus maar 1 line met data uit elke sheet. Sommige sheets moeten horizontaal worden gelezen, sommige verticaal. Hierin moet onderscheid gemaakt worden zodat alle data op de juiste manier ingelezen kan worden. Het transformeren van de data is een vrij groot obstakel, maar als dit eenmaal is gelukt ga ik ervanuit dat het makkelijk te gebruiken is om de datavisualisaties te maken. Er is genoeg data en alles is compleet en duidelijk gestructureerd.

De CSV file moet in de rijen alle stadsdelen en in alle kolommen alle cijfers hebben. De meeste informatie heeft meerdere waarden per categorie, maar van veel categorieën wordt maar 1 waarde gebruikt die specifiek relevant is voor studenten (sheet 16, 18, 19, 20). Van een aantal categorieën worden echter meerdere waarden gebruikt (sheet 1, 2, 17), dus deze moeten achter elkaar in de rij genoteerd worden.

De vorm waarin ik de JSON uiteindelijk wil hebben is zo:
JSON File:
{"Centrum":{"Eigendomscategorie":{"Koopwoningen": 36,"Corporatiewoningen": 31,"Particuliere huurwoningen": 33}, "Huurvoorraad": {...}, "Inkomen":...}, "West":{"1":{...}, "2":{...}}, "Nieuw-West":{...}}

Om hier te komen heb ik de volgende files nodig:
- convertXLS2CSV.py
- convertCSV2JSON.py

### Functionaliteit

De namen van de stadsdelen kunnen zo gekoppeld worden aan de namen van de stadsdelen die de kaart bevat. Ik gebruik een bestaande D3 kaart van Amsterdam (http://bl.ocks.org/JulesBlm/918e2987805c7189f568d95a4e8855b4#trammetro.json). Deze pas ik zodanig aan dat het niet meer op buurtschaal, maar op stadsdeel schaal opereert. Ook gaat deze kaart over het ov netwerk, wat voor mij niet interessant is. Dit onderdeel moet dus verwijderd worden. De informatie uit sheet 2, de omvang van de huurvoorraad, wordt gebruikt om de kleur van elk stadsdeel op de kaart weer te geven: hoe donkerder, hoe hoger de huurprijs. De omvang van de huurvoorraad in de data is verdeeld over 4 categorieën en is dus niet één gemiddelde. Omdat de laagste categorie vooral interessant is voor studenten, wordt het percentage huurwoningen onder de 425 euro weergegeven. Als je over de stadsdelen heen 'hovert', krijg je in een tooltip de naam van het stadsdeel en dit exacte percentage te zien.

Als je vervolgens op een stadsdeel klikt, komen er 3 grafieken in beeld. In de stacked barchart zijn twee variabelen af te lezen. Allereerst de inkomensverdeling (sheet 17) waarin zichtbaar is hoe groot het aandeel mensen in elke inkomensklasse is. In de andere bar is een gedetailleerde verdeling te zien van de informatie die de kleuren op de kaart ook al weergeven: het aandeel mensen in elke huurklasse. Dit is interssant om naast elkaar te zien omdat er een verband bestaat tussen deze variabelen.

In de cirkeldiagram wordt duidelijk hoe het zit met de eigendomscategorieën in het aangeklikte stadsdeel. In de tooltip staat hoe groot het percentage van elke categorie precies is. Aan deze diagram is verder geen interactiviteit verbonden. Mocht dit later toch nog moeten, dan zou ik hierbij nog iets met sheet 3 kunnen doen: Verdeling huurvoorraad naar huurklassen en eigendomscategorie als percentage van de totale woningvoorraad.

Als laatste staat in de tabel alle overige informatie. Een aantal van de elementen hierin zullen klikbaar zijn. Er zal een tekstje met meer informatie zichtbaar worden over dit onderwerp in dit specifieke stadsdeel. Deze informatie zal ik zelf bij elkaar zoeken en komt niet uit één specifieke database.
