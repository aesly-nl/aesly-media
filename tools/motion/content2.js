// Weken 2-4: 4 nov t/m 26 nov 2026, 69 items, slots 12 / 16 / 20
const SH='file:///home/claude/aesly-media/screenshots/';
const CTA='\n\n👉 Ga naar aesly.nl: vraag je gratis homepage-ontwerp aan of laat je bestaande website vernieuwen.\n🌐 aesly.nl/gratis-homepage-ontwerp\n👉 Link in bio\n\n';
const BASE='#website #ondernemer #mkb #aesly';
const P={}; // per template: lijst items {spec, cap, name, branche, hook}

// ---------- PAINS (14)
const pd=[
['Horeca','Gasten zoeken eerst online.',['Menukaart is lastig te vinden','Reserveren kost moeite','Je site is traag op mobiel'],['Menu en tijden direct zichtbaar','Eén klik naar reserveren','Snel op elke telefoon'],'🍽️','horeca','#horeca #restaurant #cafe'],
['Fysio & praktijk','Patiënten zoeken je online.',['Behandelingen zijn onduidelijk','Afspraak maken is omslachtig','Je site oogt verouderd'],['Duidelijk wat je behandelt','Direct een afspraak aanvragen','Rustig, professioneel ontwerp'],'🩺','zorg','#fysio #praktijk #zorg'],
['Autogarage','Garages worden online vergeleken.',['Klanten weten niet wat je doet','Offerte aanvragen is lastig','Je site laadt traag'],['Diensten helder op een rij','Offerte of afspraak in één klik','Snel en mobielvriendelijk'],'🚗','garage','#garage #autobedrijf #apk'],
['Schilder & afwerking','Mooi werk, matig online?',['Je werk is niet te zien','Aanvragen komen niet binnen','Je site is verouderd'],['Foto’s van je werk voorop','Een duidelijke offerte-knop','Modern en strak ontwerp'],'🎨','schilder','#schilder #afwerking #vakman'],
['Fotografen & creatieven','Je portfolio verdient beter.',['Je werk laadt langzaam','Weinig aanvragen','Je site oogt standaard'],['Snel ladend portfolio','Een duidelijke contactknop','Een stijl die bij je past'],'📸','creatief','#fotograaf #creatief #portfolio'],
['Tandarts & mondzorg','Vertrouwen begint online.',['Behandelingen onduidelijk','Afspraak maken kost moeite','Weinig uitstraling'],['Behandelingen helder uitgelegd','Direct online een afspraak','Een betrouwbare uitstraling'],'🦷','zorg','#mondzorg #tandarts #praktijk'],
['Administratie & advies','Klanten kiezen op vertrouwen.',['Je site oogt niet professioneel','Onduidelijk wat je aanbiedt','Contact opnemen kost moeite'],['Een betrouwbare uitstraling','Diensten helder op een rij','Eén klik naar contact'],'📊','zakelijk','#boekhouder #administratie #advies'],
['Hovenier & tuin','Je tuinen verdienen een etalage.',['Geen foto’s van je projecten','Aanvragen via bellen en app','Je site laadt traag'],['Projecten mooi in beeld','Aanvraagformulier op maat','Snel op elke telefoon'],'🌿','hovenier','#hovenier #tuinaanleg #tuin'],
['Schoonmaak','Klanten willen snel een prijs.',['Offerte aanvragen is omslachtig','Diensten niet duidelijk','Je site oogt verouderd'],['Eenvoudig een offerte aanvragen','Diensten helder op een rij','Fris en betrouwbaar ontwerp'],'🧼','schoonmaak','#schoonmaak #schoonmaakbedrijf'],
['Rijscholen','Leerlingen kiezen online.',['Pakketten zijn onduidelijk','Proefles aanvragen is lastig','Je site is niet mobiel'],['Pakketten en prijzen helder','Proefles in één klik','Snel op elke telefoon'],'🚦','rijschool','#rijschool #rijles'],
['Fitness & sport','Leden zoeken je op Google.',['Rooster en tarieven onduidelijk','Proefles boeken is lastig','Je site oogt gedateerd'],['Rooster en tarieven helder','Direct een proefles boeken','Energiek, modern ontwerp'],'🏋️','fitness','#fitness #sportschool #personaltrainer'],
['Coaches & trainers','Wat bied je eigenlijk aan?',['Bezoekers snappen je aanbod niet','Weinig kennismakingen','Je site oogt algemeen'],['Eén heldere boodschap','Een duidelijke kennismaking-knop','Een uitstraling die bij je past'],'🧠','coach','#coach #training #zzp'],
['Bruiloft & events','Jullie eerste indruk telt.',['Je werk is niet goed te zien','Aanvragen blijven uit','Je site laadt traag'],['Sfeerbeelden mooi in beeld','Een duidelijke aanvraag-knop','Snel op elke telefoon'],'💍','events','#bruiloft #events #weddingdecor'],
['Interieur & wonen','Mooi interieur, matige site?',['Je projecten komen niet tot hun recht','Weinig aanvragen','Je site is traag'],['Projecten groot in beeld','Een duidelijke contactknop','Snel en strak'],'🛋️','interieur','#interieur #wonen #design']
];
P.pains=pd.map(([k,t,p,f,e,b,tags])=>({branche:b,hook:'stelling',name:t,spec:{tpl:'pains',cover:2.4,kicker:k,title:t,sub:'Herken je dit?',head:'Herken je dit?',pains:p,fixes:f},
 cap:`${t} ${e}\n\nVoor ${k.toLowerCase()} geldt: de eerste indruk is je website.\n\n${p.map(x=>'❌ '+x).join('\n')}\n\nDe oplossing:\n${f.map(x=>'✅ '+x).join('\n')}${CTA}${tags} ${BASE}`}));

// ---------- PHONE (9)
const ph=[
['mechesalon.nl','Kappers & beauty','Zo kan jouw salon-site eruitzien',['Online afspraak','Strak ontwerp'],'kappers','💇‍♀️','#kapper #salon #beauty'],
['curaezorg.nl','Zorg & welzijn','Zo kan jouw zorgsite eruitzien',['Rustig en duidelijk','Direct contact'],'zorg','🌿','#zorg #welzijn #praktijk'],
['cosmeticaparadijs.com','Webshops & retail','Zo kan jouw webshop eruitzien',['Overzichtelijke shop','Fijn op mobiel'],'webshop','🛍️','#webshop #ecommerce #beauty'],
['azr-law.nl','Juridisch & advies','Zo kan jouw adviessite eruitzien',['Betrouwbare uitstraling','Duidelijke contactknop'],'zakelijk','⚖️','#advocaat #juridisch #advies'],
['fastfixcleaning.nl','Schoonmaak','Zo kan jouw schoonmaaksite eruitzien',['Diensten helder','Snel een offerte'],'schoonmaak','🧼','#schoonmaak #schoonmaakbedrijf'],
['rijschoolurbanflow.nl','Rijscholen','Zo kan jouw rijschool-site eruitzien',['Pakketten helder','Proefles aanvragen'],'rijschool','🚦','#rijschool #rijles'],
['idoweddingdecor.nl','Bruiloft & events','Zo kan jouw events-site eruitzien',['Sfeer in beeld','Eenvoudig aanvragen'],'events','💍','#bruiloft #events #decor'],
['vina-interior.com','Interieur & wonen','Zo kan jouw interieursite eruitzien',['Projecten groot in beeld','Snel en strak'],'interieur','🛋️','#interieur #wonen #design'],
['livingin-balance.nl','Coaches & welzijn','Zo kan jouw coachsite eruitzien',['Rustige uitstraling','Duidelijke kennismaking'],'coach','🧘','#coach #welzijn #balans']
];
P.phone=ph.map(([s,k,t,c,b,e,tags])=>({branche:b,hook:'stelling',name:t,spec:{tpl:'phone',cover:3.6,kicker:k,title:t,shot:SH+s+'_mobile_full.jpg',calls:c},
 cap:`${t}. ${e}\n\nStrak, snel en met een duidelijke weg naar contact. Dit is een van de 30 websites die wij hebben opgeleverd. Bekijk meer op aesly.nl/portfolio.${CTA}${tags} ${BASE}`}));

// ---------- CHECKLIST (6)
const cl=[
['Webshop-check','Verkoopt je webshop?',['Producten zijn snel te vinden','Afrekenen kan in een paar klikken','Hij is snel op je telefoon','Foto’s en teksten overtuigen'],'3 vinkjes of minder?','Dan lekt er omzet weg.','webshop','#webshop #ecommerce'],
['Lokaal gevonden?','Word je lokaal gevonden?',['Je staat met je bedrijfsnaam in Google','Je adres en tijden kloppen','Je site noemt je regio','Je krijgt reviews'],'Maar 2 vinkjes?','Dan gaan klanten naar de buurman.','alle','#lokaleseo #google'],
['Vertrouwen','Straalt je site vertrouwen uit?',['Een modern, rustig ontwerp','Duidelijk wie je bent','Echte foto’s en voorbeelden','Contactgegevens direct zichtbaar'],'Mist er één?','Dan twijfelen klanten.','zakelijk','#vertrouwen #webdesign'],
['Mobiele check','Werkt je site op mobiel?',['Tekst is goed leesbaar','Knoppen zijn makkelijk aan te tikken','Hij laadt snel','Je menu is overzichtelijk'],'Eén keer nee?','Dan haken bezoekers af.','alle','#mobiel #website'],
['Contact-check','Kunnen klanten je bereiken?',['Telefoon of formulier staat bovenaan','Je reageert snel','Er is een duidelijke knop','Je openingstijden staan erbij'],'Eén keer nee?','Dan verlies je aanvragen.','alle','#contact #leads'],
['Klaar voor groei?','Is je website klaar voor groei?',['Hij is makkelijk uit te breiden','Hij is veilig en up-to-date','Je weet wat hij oplevert','Hij past bij je bedrijf van nu'],'Twijfel je?','Vraag een gratis ontwerp aan.','alle','#groei #website']
];
P.checklist=cl.map(([k,t,it,v,vs,b,tags])=>({branche:b,hook:'vraag',name:k,spec:{tpl:'checklist',cover:2.0,kicker:k,title:t,items:it,verdict:v,verdictSub:vs},
 cap:`${k}: ${t.toLowerCase()} ✅\n\n${it.map((x,i)=>`${i+1}. ${x}`).join('\n')}\n\n${v} ${vs}${CTA}${tags} ${BASE}`}));

// ---------- MYTHE (6)
const my=[
['Een goede website is altijd duur.','mythe',['Abonnement vanaf €49,95 p/m','Inclusief hosting en onderhoud','Bedragen excl. btw'],'Bij AESLY kan het vanaf €49,95 per maand, inclusief hosting en onderhoud (excl. btw).','alle'],
['Een landingspagina kost veel.','mythe',['Vanaf €495 eenmalig','Handig voor een actie of campagne','Bedragen excl. btw'],'Een losse landingspagina kan al vanaf €495 eenmalig (excl. btw).','alle'],
['Een website is eenmalig klaar.','mythe',['Een site heeft onderhoud nodig','Beheer en hosting €30 p/m','Of inbegrepen in het abonnement'],'Een website heeft onderhoud nodig. Beheer en hosting kosten €30 per maand, of het zit in het abonnement.','alle'],
['Alleen grote bedrijven hebben een site nodig.','mythe',['Klanten zoeken ook kleine bedrijven online','Zo ben je vindbaar en betrouwbaar','Ook voor zzp en mkb'],'Klanten zoeken ook kleine bedrijven online. Een goede site maakt je vindbaar en betrouwbaar.','zzp'],
['Eerst zien, dan beslissen kan bij een website.','feit',['Gratis homepage-ontwerp binnen 24 uur','Een visueel voorstel van je startpagina','Pas daarna kies je'],'Je vraagt een gratis homepage-ontwerp aan en ziet binnen 24 uur het resultaat. Pas daarna kies je.','alle'],
['Een trage website verbrandt advertentiebudget.','feit',['Bezoekers haken af bij traag laden','Dan betaal je voor klikken zonder resultaat','Daarom bouwen wij snel'],'Bezoekers haken af bij een trage site, en dan betaal je voor klikken zonder resultaat.','alle']
];
P.mythe=my.map(([c,a,ex,t,b])=>({branche:b,hook:'vraag',name:'Mythe of feit: '+c.slice(0,28),spec:{tpl:'mythe',cover:3.6,claim:c,answer:a,explain:ex},
 cap:`Mythe of feit? 🧐\n\n"${c}"\n\nHet antwoord: ${a}. ${t}${CTA}#mythe #feit #website #ondernemer #mkb #aesly`}));

// ---------- KINETIC (6)
const ki=[
['Zichtbaarheid',[['Je concurrent staat in Google.',104,false],['Jij ook?',130,true]],'Wij bouwen websites die klaar zijn om gevonden te worden.','alle','🔎','#google #vindbaarheid'],
['Mindset',[['Je website is geen kostenpost.',100,false],['Het is je beste verkoper.',100,true]],'Dag en nacht aan het werk, ook als jij slaapt.','alle','💼','#ondernemer #website'],
['Zonder risico',[['Eerst zien.',130,false],['Dan pas beslissen.',130,true]],'Vraag je gratis homepage-ontwerp aan en zie binnen 24 uur het resultaat.','alle','👀','#gratis #ontwerp'],
['Resultaat',[['Mooi is niet genoeg.',110,false],['Hij moet aanvragen opleveren.',90,true]],'Wij bouwen websites met één doel: klanten die contact opnemen.','alle','🎯','#leads #aanvragen'],
['Nog geen site?',[['Nog geen website?',116,false],['Dan mis je klanten die je zoeken.',90,true]],'Wij regelen ontwerp, bouw, hosting en onderhoud.','zzp','🚀','#zzp #startup'],
['Frisse start',[['Ouderwetse website?',116,false],['Tijd voor een frisse start.',96,true]],'Wij vernieuwen je bestaande website, snel en zonder gedoe.','alle','✨','#websitevernieuwen #redesign']
];
P.kinetic=ki.map(([k,l,s,b,e,tags])=>({branche:b,hook:'stelling',name:k+': '+l[0][0].slice(0,26),spec:{tpl:'kinetic',cover:6.0,kicker:k,lines:l.map(x=>({t:x[0],size:x[1],hl:x[2]})),sub:s},
 cap:`${l.map(x=>x[0]).join(' ')} ${e}\n\n${s}${CTA}${tags} ${BASE}`}));

// ---------- BIGNUM (4)
const bg=[
['Opgeleverd',{value:30,suffix:' websites',size:230,label:'Al opgeleverd door AESLY',head:'Voor ondernemers zoals jij',points:['Bouw, hosting en onderhoud','Binnen 24 uur een gratis ontwerp','Bekijk ze op aesly.nl/portfolio']},'Al 30 websites opgeleverd. 🏆\n\nBouw, hosting en onderhoud voor ondernemers zoals jij. Bekijk ze op aesly.nl/portfolio.','alle','#portfolio #opgeleverd'],
['Landingspagina',{prefix:'€',value:495,size:300,suffix:'',label:'Landingspagina vanaf, eenmalig excl. btw',head:'Handig als je één doel hebt',points:['Eén pagina, één boodschap','Handig voor een campagne','Snel online']},'Een landingspagina vanaf €495 eenmalig (excl. btw). 🎯\n\nEén pagina, één boodschap: handig voor een actie of campagne.','alle','#landingspagina #campagne'],
['Onderhoud',{prefix:'€',value:30,size:250,suffix:' p/m',label:'Beheer en hosting, excl. btw',head:'Zo blijft je site gezond',points:['Updates en beveiliging','Hosting inbegrepen','Of kies het abonnement: alles erin']},'Websitebeheer en hosting voor €30 per maand (excl. btw). 🔒\n\nZo blijft je site snel, veilig en up-to-date. In het abonnement zit het al inbegrepen.','alle','#websiteonderhoud #hosting'],
['Website kopen',{prefix:'€',value:1750,size:230,suffix:'',label:'Website kopen vanaf, tot 10 pagina’s',head:'Dit krijg je',points:['Tot 10 pagina’s','Op maat ontworpen','Eerst een gratis ontwerp']},'Een website kopen vanaf €1.750 (excl. btw), tot 10 pagina’s. 💶\n\nEerst een gratis ontwerp, dan beslis je.','alle','#websitekopen #maatwerk']
];
P.bignum=bg.map(([k,s,c,b,tags])=>({branche:b,hook:'getal',name:k,spec:{tpl:'bignum',cover:3.0,kicker:k,...s},cap:`${c}${CTA}${tags} ${BASE}`}));

// ---------- BEFOREAFTER (4)
const ba=[
['Webshop vernieuwen','Je webshop, opnieuw','Rommelig en traag','Overzichtelijk en snel','Shop met overzicht.','Producten snel gevonden, makkelijk afrekenen.','Bekijk de shop',['Snel op mobiel','Duidelijk afrekenen'],'webshop','🛒','#webshop #ecommerce'],
['Praktijk vernieuwen','Je praktijk-site, opnieuw','Verouderd en onduidelijk','Rustig en duidelijk','Welkom in onze praktijk.','Direct een afspraak aanvragen.','Maak een afspraak',['Rustig ontwerp','Duidelijke knop'],'zorg','🌿','#praktijk #zorg'],
['Homepage vernieuwen','Je homepage, opnieuw','Veel te druk','Eén duidelijke boodschap','Eén boodschap. Eén knop.','Bezoekers weten direct wat ze moeten doen.','Neem contact op',['Minder, maar beter','Gemaakt voor aanvragen'],'alle','🏠','#homepage #webdesign'],
['Bedrijfssite vernieuwen','Je bedrijfssite, opnieuw','Ouderwets','Professioneel','Klaar voor nieuwe klanten.','Strak, snel en betrouwbaar.','Vraag offerte aan',['Betrouwbare uitstraling','Snel op mobiel'],'zakelijk','🏢','#bedrijfssite #zakelijk']
];
P.beforeafter=ba.map(([k,t,ol,nl,nt,ns,nb,pts,b,e,tags])=>({branche:b,hook:'vergelijking',name:k,spec:{tpl:'beforeafter',cover:2.4,kicker:k,title:t,oldLabel:ol,newLabel:nl,newTitle:nt,newSub:ns,newBtn:nb,points:pts},
 cap:`${t}. ${e}\n\nVan ${ol.toLowerCase()} naar ${nl.toLowerCase()}. Wij vernieuwen je bestaande website zodat hij weer bij je bedrijf past.${CTA}${tags} ${BASE}`}));

// ---------- TIMER (3)
const ti=[
['Vraag vandaag aan','Morgen zie je je ontwerp','Gratis en vrijblijvend',['Vraag je ontwerp aan','Wij ontwerpen je homepage','Binnen 24 uur zie je het resultaat'],'⏱️'],
['Geen verplichting','Eerst zien, dan beslissen','Gratis en vrijblijvend',['Vraag gratis aan','Ontvang je ontwerp','Kies: abonnement of kopen'],'👀'],
['Website vernieuwen?','Binnen 24 uur een nieuw voorstel','Gratis en vrijblijvend',['Vraag je gratis ontwerp aan','Wij maken een nieuw voorstel','Jij beslist of je doorgaat'],'🔄']
];
P.timer=ti.map(([k,t,l,s,e])=>({branche:'alle',hook:'stelling',name:t,spec:{tpl:'timer',cover:5.0,kicker:k,title:t,label:l,steps:s},
 cap:`${t}. ${e}\n\n${s.map((x,i)=>`${i+1}. ${x}`).join('\n')}${CTA}#gratis #ontwerp #website #ondernemer #mkb #aesly`}));

// ---------- LEADS (3)
const le=[
['Een site die gasten trekt',[['Nieuwe reservering','Tafel voor 4 · zaterdag'],['Groepsaanvraag','Verjaardag · 12 personen'],['Vraag over het menu','Via je website']],'horeca','🍽️','#horeca #restaurant'],
['Een praktijk-site die werkt',[['Nieuwe afspraak','Intake · donderdag 09:30'],['Aanmelding','Nieuwe cliënt'],['Bel mij terug','Via je website']],'zorg','🩺','#praktijk #zorg'],
['Een webshop die verkoopt',[['Nieuwe bestelling','2 artikelen'],['Nieuwe bestelling','Verzending vandaag'],['Vraag over levering','Via je website']],'webshop','🛍️','#webshop #ecommerce']
];
P.leads=le.map(([t,n,b,e,tags])=>({branche:b,hook:'stelling',name:t,spec:{tpl:'leads',cover:4.8,kicker:'Zo voelt het',title:t,notifs:n,sub:'Illustratie: zo kan een goed werkende site eruitzien.'},
 cap:`${t}. ${e}\n\nGeen gokken, maar een duidelijke weg voor bezoekers: aanvragen, afspraken, vragen. (Illustratie)${CTA}${tags} ${BASE}`}));

// ---------- CARROUSELS (14)
const ca=[
['Tips voor je restaurant-website',['Menu op de homepage','Reserveer-knop zichtbaar','Foto’s van gerechten'],['Openingstijden en route','Snel op mobiel'],'horeca','🍽️','#horeca #restaurant'],
['Tips voor je praktijk-website',['Behandelingen uitgelegd','Afspraak-knop','Foto’s van de praktijk'],['Tarieven en vergoedingen','Snel laden'],'zorg','🩺','#praktijk #zorg'],
['Tips voor je garage-website',['Diensten op een rij','Afspraak- of offerte-knop','Merken en specialisaties'],['Openingstijden en route','Snel op mobiel'],'garage','🚗','#garage #autobedrijf'],
['Laat je werk zien',['Foto’s van je projecten','Voor en na','Offerte-aanvraag'],['Werkgebied vermelden','Reviews of referenties'],'bouw','🛠️','#bouw #vakman #schilder'],
['Tips voor je webshop',['Duidelijke productfoto’s','Prijs en levertijd direct','Afrekenen in een paar klikken'],['Retour en contact helder','Snel op mobiel'],'webshop','🛒','#webshop #ecommerce'],
['Lokaal gevonden in 5 stappen',['Google Bedrijfsprofiel invullen','Adres en tijden kloppen','Regio op je site noemen'],['Vraag klanten om een review','Foto’s toevoegen'],'alle','📍','#lokaleseo #google'],
['Je homepage als zzp’er',['Wat doe je, voor wie?','Eén duidelijke knop','Bewijs of voorbeelden'],['Je gezicht erop','Contact direct bereikbaar'],'zzp','🙋','#zzp #homepage'],
['Website vernieuwen: 5 signalen',['Hij ziet er verouderd uit','Hij laadt traag','Hij is niet mobielvriendelijk'],['Je krijgt weinig aanvragen','Hij past niet meer bij je bedrijf'],'alle','🔄','#websitevernieuwen #redesign'],
['Abonnement of kopen: voor wie?',['Abonnement: je start klein','Abonnement: alles uit handen','Abonnement: geen grote investering'],['Kopen: een grotere site','Kopen: eenmalig betalen'],'alle','💶','#websiteabonnement #websitekopen'],
['Wat zit er in je gratis ontwerp?',['Een visueel voorstel voor je homepage','Gemaakt voor jouw bedrijf','Binnen 24 uur klaar'],['Geen verplichting','Daarna kies je zelf'],'alle','🎁','#gratis #homepage #ontwerp'],
['Zo schrijf je een goede homepagetekst',['Begin met wat klanten krijgen','Houd zinnen kort','Eén boodschap per sectie'],['Eindig met een duidelijke actie','Gebruik de woorden van je klant'],'alle','✍️','#copywriting #homepage'],
['Mobiel testen in 5 stappen',['Open je site op je telefoon','Tik alle knoppen aan','Lees alles zonder inzoomen'],['Let op de laadtijd','Test het contactformulier'],'alle','📱','#mobiel #websitetips'],
['Tips voor coaches en trainers',['Zeg wie je helpt','Toon je aanbod','Eén kennismaking-knop'],['Deel ervaringen','Laat zien wie je bent'],'coach','🧠','#coach #training'],
['Tips voor rijscholen en opleiders',['Pakketten en prijzen','Proefles-knop','Werkgebied'],['Foto’s van je team','Snel op mobiel'],'rijschool','🚦','#rijschool #opleiding']
];
P.carousel=ca.map(([t,a,b2,br,e,tags],i)=>({kind:'carousel',branche:br,hook:'lijst',name:t,
 slides:[{k:'cover',kicker:'Tips voor ondernemers',title:t,sub:'Swipe voor de tips'},{k:'list',title:'Dit helpt',items:a,foot:'1/2'},{k:'list',title:'En ook',items:b2,foot:'2/2'},{k:'cta'}],
 cap:`${t}: 🔖\n\n${[...a,...b2].map((x,j)=>`${j+1}. ${x}`).join('\n')}\n\nBewaar deze post voor later.${CTA}${tags} ${BASE}`}));

// ---------- PLANNING
const days=[];for(let d=new Date(Date.UTC(2026,10,4));d<=new Date(Date.UTC(2026,10,26));d.setUTCDate(d.getUTCDate()+1))days.push(d.toISOString().slice(0,10));
const pillarOf={pains:'pijnpunt',kinetic:'pijnpunt',phone:'bewijs',timer:'bewijs',leads:'bewijs',checklist:'waarde',carousel:'waarde',mythe:'interactie',bignum:'aanbod',beforeafter:'aanbod'};
const rem={};Object.keys(P).forEach(k=>rem[k]=P[k].length);
const total=Object.values(rem).reduce((a,b)=>a+b,0);
if(total!==days.length*3)throw new Error('aantal '+total+' != '+days.length*3);
const lastUsed={};let lastCarSlot=null;const items=[];let idx=0;
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
for(const d of days){const used=new Set();let prev=null;
 for(const t of [12,16,20]){
  const cands=Object.keys(rem).filter(k=>rem[k]>0&&!used.has(k)&&k!==prev&&!(k==='carousel'&&lastCarSlot===t));
  cands.sort((a,b)=>(rem[b]-rem[a])||((lastUsed[a]??-99)-(lastUsed[b]??-99))||(rnd()-.5));
  const pick=cands[0];if(!pick)throw new Error('geen kandidaat '+d+' '+t);
  const it=P[pick][P[pick].length-rem[pick]];rem[pick]--;used.add(pick);prev=pick;lastUsed[pick]=idx++;
  if(pick==='carousel')lastCarSlot=t;
  items.push({d,t,pillar:pillarOf[pick],tpl:pick,...it});
 }}
module.exports=items;
