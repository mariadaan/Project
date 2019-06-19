# Process book
### Dag 1
Vandaag heb ik de belangrijkste beslissingen gemaakt rondom de exacte data die ik in de visualisatie wil gaan betrekken. Hierbij heb ik voornamelijk vanuit mijzelf als student nagedacht en bedacht wat ik vooral zou willen weten over een buurt als ik zoek naar een huis. Welke informatie zegt iets over de toegankelijkheid? Hiervoor ben ik door databases van de Gemeente Amsterdam gaan kijken om te weten wat er beschikbaar is. Ook ben ik op zoek gegaan naar een kaart van Amsterdam die ik kan gebruiken voor de visualisatie.

Gedaan:
- README geschreven met idee over hoe het eruit moet gaan zien
- Plaatje gemaakt
- Bepaald welke data gebruikt gaat worden
- Kaart van Amsterdam ingeladen en aangepast

### Dag 2
Ik ben erachter gekomen dat het transformeren naar csv op de manier dat ik wil lastiger is dan verwacht. Ook de manier waarop ik het precies wil bedenken kostte wat tijd. Ik heb er uiteindelijk voor gekozen om 1 groot csv bestand te maken, met in de kolommen alle informatie en op de rijen alle stadsdelen. Het wordt dus een vrij 'breed' bestand, maar dan staat alles wel gewoon duidelijk gesorteerd en is het makkelijker om straks alles aan het stadsdeel te koppelen. Ik merk dat het al 5 maanden geleden is dat ik heb geprogrammeerd dus ik moet veel opzoeken op internet.

Ook kwam ik er vandaag achter dat er 2 interactieve onderdelen in de visualisatie moeten zitten, dus hier heb ik over nagedacht. Om het nog nuttiger voor studenten te maken, wil ik het mogelijk maken om op specifieke dingen in de visualisatie te klikken, waarna er meer informatie over dit onderwerp verschijnt. Dit zorgt ervoor dat alles net wat minder oppervlakkig is en dit maakt de visualisatie unieker.

### Dag 3
Tijdens de stand-up ben ik door de plannen van mijn medestudenten op ideeën gekomen hoe ik de 'extra informatie' niet gewoon in een tabelletje kan zetten. Ik kan er namelijk met een drop-down menu voor zorgen dat de pie-chart aangepast wordt en niet alleen over de eigendomscategorie gaat maar dus ook andere dingen kan laten zien: de leeftijdsverdeling en opleidingsniveau verdeling. Ook kan ik de informatie die de kaart laat zien laten veranderen met een button, ik heb namelijk twee interactieve elementen nodig. Deze zou ik dus naast het aandeel woningen in de laagste huurklasse ook het aandeel woningen in de andere huurklassen laten zien, bijvoorbeeld met een slider.

Omdat het transformeren van de data met python echt heel lastig was en de hoeveelheid data best te overzien is, besloot ik om het handmatig in excel te doen. Dit was met wat handige trucjes in een halfuurtje gedaan. Nu heb ik de data zoals ik het wil hebben in een JSON.

In de bestaande d3 kaart stond nog het stadsdeel "Westpoort". Dit stadsdeel bestaat niet meer en is nu gedeeltelijk Nieuw-west en gedeeltelijk West. Het gedeelte dat onder West valt is echter zo klein, dat ik ervoor heb gekozen om het hele Westpoort gedeelte Nieuw-west te noemen.

### Dag 4
Vandaag heb ik de tooltip werkend gekregen en een beginnetje gemaakt met de barchart. Ik heb nagedacht over wat handig is qua kleur van de kaart. Ik dacht namelijk dat het percentage huurwoningen in de laagste klasse nuttig zou zijn, maar ik besefte nu dat dat eigenlijk allemaal sociale huurwoningen zijn en dus niet per se interessant voor studenten. Omdat het per stadsdeel is, is het ook niet zo nauwkeurig dus twijfel ik een beetje aan de functionaliteit van mijn visualisatie. Omdat de dataset die ik nu gebruik geen buurtinformatie bevat hou ik het wel bij stadsdelen. Ik moet er slechts voor zorgen dat er genoeg extra informatie aan gekoppeld wordt om het toch nog nuttig genoeg te maken. Ook denk ik dat ik een afspraak ga maken met iemand van de gemeente om meer te weten te komen over hoe deze cijfers tot stand zijn gekomen zodat ik hier meer over kan vertellen. Ik studeer Sociale Geografie dus dat vind ik wel een interessante toevoeging aan deze abstracte weergave.

Ik twijfel nog of ik de 'hover'kleur per buurt of per stadsdeel moet doen. Nu krijg je de indruk dat de informatie in de tooltip etc wel op buurtniveau is, terwijl dat niet zo is. Maar het is ook wel weer leuk om de buurtnamen te zien en om wel te erkennen dat het verschillende buurten zijn. Morgen tijdens de stand-up maar even bespreken!

### Dag 5
Weinig vooruitgang vandaag. Barchart en piechart interactief maken lukt niet, heb dit nog nooit gedaan en op internet kan ik lastig bruikbare dingen vinden. Heb besloten om eerst een normale barchart te maken, kan later nog wel stacked barchart proberen.

### Dag 6
Na standup van vandaag besloten om eerst wat aandacht te besteden aan de algehele setup van de webpagina. Met een bootstrap sample de website vormgegeven en mooier gemaakt.

Gewerkt aan piechart, besloten een dropdown-menu te gebruiken in plaats van buttons zodat het overzichtelijker is als er meer dan 2 opties zijn.

## Dag 7
Ik heb besloten om nog even te wachten met de hover veranderen van buurt naar stadsdeel, omdat ik het misschien nog wel toch per buurt wil doen als dat lukt met de data. Ben er wel achter gekomen dat de data die ik gebruik niet uit 2017 maar uit 2013 komt. Heel kut, maar ben nu te ver om dat nog te veranderen dus ik hou het bij deze data. Het is wel interessant om te beseffen hoeveel er in die 6 jaar tijd is veranderd in Amsterdam.

Piechart eindelijk gefixt en code opgeschoond. Lang met zelfde problemen gestruggled doordat de assistentie 3 uur(!!!) op zich liet wachten.

## Dag 8
Besloten alle elementen al op de pagina te zetten voordat er ergens op wordt geklikt, dit oogt netter. En dan heb je ook als eerste een overzicht van de situatie in heel Amsterdam. Gezorgd voor een interactieve barchart in plaats van een stacked barchart. Met behulp van 2 buttons kan je nu schaken tussen de datasets, dit ziet er overzichtelijk uit en de data is nog steeds goed te vergelijken.

Ik heb de data per buurt ook in de Excel sheet gezet. Dit is alleen beschikbaar voor sheet 1 en 2. De kleur van de kaart kan ik nu dus per buurt doen in plaats van per stadsdeel dus dat is top. Er zijn een paar buurten die nog niet bestaan in 2013, dus daar is geen data van. Ik twijfel of ik die buurten grijs moet maken of de data van het hele stadsdeel mee moet geven. Morgen tijdens de standup ga ik dat wel even bespreken.

## Dag 9
Met behulp van https://assets.amsterdam.nl/publish/pages/620096/wia_2013-_stadsdeelprofielen.pdf pagina 109 uit kunnen vinden welke data van mij overeenkomt met welke missende buurtcombinaties op de kaart. Data hierop aangepast zodat er van elke buurt informatie is.

Legenda toegevoegd aan cirkeldiagram om het overzichtelijker te maken. Ik moet nog wel iets bedenken om het duidelijker te maken dat de informatie in de charts per stadsdeel en niet per buurt is.

## Dag 10
Ik ben vandaag erg veel bezig geweest met het structureren van de elementen op de pagina. Ik dacht, doe ik effe, maar dit blijkt toch nog een stuk lastiger dan verwacht. Uiteindelijk wel grotendeels gelukt. Besloten om de barchart bovenaan te zetten omdat die in eerste instantie dezelfde informatie laat zien als de kaart. Ook kleur van kaart veranderd zodat dit verband duidelijker is. Door gridsysteem staat alles nu in een keer op de pagina, waardoor de kaart nu wel wat kleiner is. Ik vind het echter nog steeds duidelijk en vind het mooier zo dan als de plots eronder staan.

## Dag 11
Plan gemaakt om extra informatie op de pagina te zetten. Niet aan code gewerkt, deze is eigenlijk voor een groot deel wel af. Om het wat completer te maken besteed ik nu aandacht aan de argumentatie en reden achter de cijfers.

## Dag 12
Ik heb mijn standup groepje om advies gevraagd om een aantal zaken. Ik twijfelde of het misschien verwarrend was dat ik dezelfde kleur blauw gebruik in alle visualisaties terwijl ze niet hetzelfde betekenen. Volgens mijn medestudenten was dit niet per se verwarrend omdat er in de titels en legenda wel heel duidelijk is waar alles voor staat. Zij vonden het juist mooi voor de hele 'aesthetics' van de pagina dat alles bij elkaar past. Dit laat ik dus zo.

Ook wilde ik eerst graag dat de piechart de volgorde als in de legenda zou behouden, in plaats van op grootte gesorteerd. Mijn groepje vond echter dat ik het juist zo moet laten omdat het hierdoor duidelijk is welke groep het grootste is. Een veelvoorkomend probleem met piecharts is namelijk dat ze moeilijk te lezen zijn omdat mensen niet zo makkelijk hoeken kunnen aflezen.

Er zijn nog wel 2 andere problemen met de piechart die ik moet oplossen. Hieronder is te zien hoe hij er nu uit ziet bij de categorie woonsituatie. Blijkbaar is de kleur groen en rood niet te onderscheiden voor kleurenblinden dus dat is niet handig. Ook past de tekst niet overal binnen de svg, maar ik weet niet zo goed hoe ik dit het beste op kan lossen. Ik wil namelijk niet dat het nog breder wordt, maar ik denk ook dat het raar is als het op twee regels komt. Misschien kan ik het begin van het label wel verwijderen, zoals inwonend bij ouders/familie/vrienden -> bij ouders/familie/vrienden. Dan is het nog steeds wel duidelijk vind ik. In de tooltip kan ik dan wel nog het hele label laten staan.

![blah](https://github.com/mariadaan/Project/blob/master/doc/pie.png)
