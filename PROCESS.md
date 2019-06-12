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
Ik heb besloten om nog even te wachten met de hover veranderen van buurt naar stadsdeel, omdat ik het misschien nog wel toch per buurt wil doen als dat lukt met de data. 
