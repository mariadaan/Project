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
