## Data
Ik maak gebruik van 7 verschillende excel bestanden. Deze hebben wel allemaal exact dezelfde structuur, dus 1 python script moet genoeg zijn om deze tot een bruikbare JSON file te transformeren. De Excel bestanden hebben allemaal 37 verschillende sheets, waar er 7 van door mij gebruikt worden.

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

De kleur van de stadsdelen in de kaart is gebaseerd op sheet 2.
De informatie in de stacked barchart is gebaseerd op sheet 2 en 17.
De cirkeldiagram toont de informatie in sheet 1.
Een tabel met extra informatie toont de data in sheet 16, 18, 19 en 20.

Binnen de sheets moet ook nog veel gefilterd worden. Omdat de informatie alleen per stadsdeel en niet per buurt weergegeven gaat worden, wordt naar de totaalcijfers in de bestanden gekeken. Dit is dus maar 1 line met data uit elke sheet. Sommige sheets moeten horizontaal worden gelezen, sommige verticaal. Hierin moet onderscheid gemaakt worden zodat alle data op de juiste manier ingelezen kan worden. Het transformeren van de data is een vrij groot obstakel, maar als dit eenmaal is gelukt ga ik ervanuit dat het makkelijk te gebruiken is om de datavisualisaties te maken. Er is genoeg data en alles is compleet en duidelijk gestructureerd. De vorm waarin ik het uiteindelijk wil hebben is zo:

JSON File:
{"Centrum":{"Eigendomscategorie":{"Koopwoningen": 36,"Corporatiewoningen": 31,"Particuliere huurwoningen": 33}, "Huurvoorraad": {...}, "Inkomen":{...}}, "West":{"1":{...}, "2":{...}}, "Nieuw-West":{...}}

Om hier te komen heb ik de volgende files nodig:
- convertXLS2CSV.py
- convertCSV2JSON.py

De namen van de stadsdelen kunnen zo gekoppeld worden aan de namen van de stadsdelen die de kaart bevat. Ik gebruik een bestaande D3 kaart van Amsterdam (http://bl.ocks.org/JulesBlm/918e2987805c7189f568d95a4e8855b4#trammetro.json). Deze pas ik zodanig aan dat het niet meer op buurschaal, maar op stadsdeel schaal opereert. Ook gaat deze kaart over het ov netwerk, wat voor mij niet interessant is. Dit onderdeel moet dus verwijderd worden.
