/* ============================================================
   MUZE — trilingual static site generator
   Generates index.html (EN), fi.html (FI), sv.html (SV) from a
   single source of copy + a shared template, so the three
   language versions stay structurally identical.

   Prices & technical specs live in shared constants ($ / specs)
   so the numbers are guaranteed identical across languages.
   FI & SV copy is written fresh by native hand — never machine
   translated — and bulletproofed by native-speaker review.
   ============================================================ */
import { writeFileSync, readFileSync } from 'node:fs';

const SITE = 'https://corak80.github.io/muze';

/* ---- shared, language-neutral price numbers ---- */
const $ = {
  wd:['150 €','180 €','250 €','300 €'],
  we:['200 €','230 €','300 €','350 €'],
  weekend:'450 €', seat:'1,50 €', clean:'50–150 €',
  sl:['300 €','200 €'],
  ent:['350–500 €','500 €','750 €','1200–2500 €'],
  buffet:'32–46 €', catering:'5 €', servDevice:'20 €',
  setS:'150 €', setM:'300 €', setL:'500 €', setXL:'600 €',
  led:'100 €', rgb:'20 €', hazer:'150 €',
  table:'10 €', chair:'2,50 €', tent3:'60 €', tent6:'80 €',
  cloth:'3,50 €', piece:'0,40 €', dev:'20 €', glass:'0,50 €'
};

/* ---- copy decks ---- */
const D = {
/* ============================ ENGLISH ============================ */
en:{
  code:'en', label:'EN', dir:'ltr',
  title:'MUZE — A versatile event space in the heart of Vaasa',
  desc:'MUZE is a 165 m² event space at Funkkis in Vaasa. Bright and airy by day, a glowing club by night — for weddings, parties, seminars and every special moment. Up to 150 guests.',
  nav:{space:'The Space',layouts:'Layouts',gallery:'Gallery',info:'Details',pricing:'Pricing',rentals:'Rentals',contact:'Contact',book:'Book the room',night:'Night',day:'Day'},
  info:{heading:'Good to know',snum:'/ practical details',fees:'Rental fees',included:'What’s included',hire:'Equipment for hire',rules:'House rules'},
  hero:{eyebrow:'Vaasa · Funkkis · Sepänkyläntie 2',
    tagline:'A versatile event space in the heart of Vaasa — a beautiful venue for all your special moments.',
    meta:'165 m² · up to 150 guests · one unforgettable room',
    cta:'Reserve your date', scroll:'scroll'},
  marquee:['Birthday','Graduation','Engagement','Wedding','Baptism','Confirmation','Exhibition','Screening','Seminar','Team Building','Dance','Music'],
  intro:{
    big:`A versatile space with charming interiors — <span class="sg">open</span> or private, intimate or full house. Birthdays, weddings, seminars, exhibitions: <b>you name it</b>, MUZE hosts it.`,
    body1:'MUZE suits a broad variety of events, both open and private, thanks to its flexible space and charming interiors.',
    body2:'It is great for family occasions — birthdays, baptisms, confirmations, graduations, engagements, weddings — and just as equipped for groups and companies, from seminars to team-building. Art installations, music, dance and other cultural happenings feel right at home here.'},
  stats:[{n:'165',u:'m²',l:'Open floor'},{n:'90',u:'seated',l:'At dinner tables'},{n:'150',u:'standing',l:'For a party'},{n:'135',u:'inch',l:'3 m projection screen'}],
  duo:{day:{k:'By day',h:'Daylight &amp;<br>open space',p:'A dozen windows flood the room with northern light. Lay long tables for a lunch, a graduation, a workshop or a seminar with the big screen rolled down.'},
       night:{k:'By night',h:'Curtains close,<br>the room glows',p:'Thick acoustic curtains wrap the whole interior for 100% darkness, smart lighting in any colour, a club-level sound system and a disco ball waiting. Dance until late.'}},
  feat:{title:'Everything the <em>room</em> already includes',snum:'/ key features',items:[
    {h:'Central location',p:'In the heart of Vaasa, with parking possibilities on both sides of the building.'},
    {h:'Wheelchair accessible',p:'Step-free and welcoming to every guest.'},
    {h:'165 m² of open space',p:'One generous, open room to shape exactly as you like.'},
    {h:'Hard wooden floor',p:'Warm, hard wooden flooring throughout.'},
    {h:'90 seated · 150 standing',p:'Room for up to 90 seated guests — tables and chairs available — or 150 standing.'},
    {h:'Wardrobe & kitchen',p:'Own wardrobe, lavatory spaces and a kitchen for serving and final prepping (no cooking).'},
    {h:'Club-level sound',p:'A serious, club-level sound system built right in.'},
    {h:'Smart lighting',p:'Tunable smart lighting for every mood.'},
    {h:'Daylight or full dark',p:'Plenty of daylight from a dozen windows, plus thick acoustic curtains for 100% darkness when needed.'},
    {h:'135″ projection',p:'A big projection screen — 135″, a full 3 metres — with projector included.'},
    {h:'Entertainment on request',p:'Add a DJ or a live band whenever you like.'},
    {h:'Food & drink, your way',p:'Catering or serving on request; otherwise bring and serve your own food and drinks.'}]},
  lay:{title:'Lay out the <em>room</em> your way',snum:'/ floor plans',plantag:'Sepänkyläntie 2 · Funkkis',
    lead:'Dinner tables, a dance floor, a band corner, a play area, lounge and reception — the same room, arranged for your evening. Tap a layout to preview.',
    opts:[{s:'36',h:'Intimate dinner',p:'Long tables, a generous dance floor, band / DJ corner.'},
          {s:'48',h:'Celebration',p:'More seats and a lounge, with room still left to dance.'},
          {s:'62',h:'Full house',p:'Theatre-style rows or banquet — up to 90 seated.'}],
    note:'↳ Up to 90 seated at tables · 150 standing · fully accessible · main entrance on Sepänkyläntie.'},
  gal:{title:'A room that <em>remembers</em> the night',snum:'/ gallery',
    caps:['Dance night · full glow','Seminar · by day','Live music · intimate set','165 m² · open floor','Milestone birthday','Screening · 135″','After dark','Dinner & lounge','Daytime gathering','Dressed for a party','Evening event','Good company']},
  price:{title:'Rent the <em>space</em>',snum:'/ rates incl. projector, screen & basic sound',
    disclaimer:'Prices are indicative — ask for a customised quote for your event.',
    spaceNote:'Includes the use of a projector, big screen and basic sound system.',
    wd:{label:'Monday — Thursday',sub:'Weekday rates',rows:[
      {d:'4 hours',s:'ending by 21:00',p:$.wd[0]},{d:'4 hours',s:'ending later',p:$.wd[1]},
      {d:'8 hours',s:'ending by 21:00',p:$.wd[2]},{d:'8 hours',s:'ending later',p:$.wd[3]}]},
    we:{label:'Friday or Saturday',sub:'Weekend rates',rows:[
      {d:'4 hours',s:'ending by 21:00',p:$.we[0]},{d:'4 hours',s:'ending later',p:$.we[1]},
      {d:'8 hours',s:'ending by 21:00',p:$.we[2]},{d:'8 hours',s:'ending later',p:$.we[3]}]},
    long:{label:'The whole weekend',sub:'Friday to Sunday — make it a proper celebration',rows:[
      {d:'48 hours',s:'Friday → Sunday, ending by 2 pm',p:$.weekend},
      {d:'Tables, chairs & tablecloths',s:'',p:`${$.seat} / seat`},
      {d:'Cleaning fee',s:'by event type, guest count & catering',p:$.clean}]},
    sl:{title:'Advanced sound & light',rows:[
      {d:'4 subs · 4 tops · 2 monitors · mixer · mics',p:$.sl[0]},
      {d:'Disco ball · LED · lasers · hazer (fog) machine',p:$.sl[1]}]},
    ent:{title:'Entertainment',note:'You are also welcome to play your own music.',rows:[
      {d:'DJ',p:$.ent[0]},{d:'Live music — solo artist',p:$.ent[1]},{d:'Duo',p:$.ent[2]},{d:'Band',p:$.ent[3]}]},
    din:{title:'Dining',rows:[
      {d:'Dinner buffet',s:'starters, mains, desserts, coffee & tea — tableware included',p:`${$.buffet} / pp`},
      {d:'External catering or your own food',s:'coordination & tableware',p:`${$.catering} / guest`},
      {d:'Buffet serving devices',s:'warmers, coolers, coffee / ice maker…',p:`${$.servDevice} / device`}]},
    foot:`MUZE does not offer bar service. For private events you may bring and serve your own drinks; we can provide glasses and ice at ${$.glass} / item (included free with the buffet and catering options). Free cancellation up to 10 days before the event; later cancellations are charged 50%.`},
  rent:{title:'Rent the <em>gear</em>, take it anywhere',snum:'/ external rentals',
    intro:'Got an event coming up but don’t have everything you need? No worries — we’ve got you covered. Contact us to rent exactly the equipment your event or party needs.',
    groups:[
      {head:'Sound systems',rows:[
        {d:'Set S — 1× Behringer 15″ active sub · 2× Mackie 12″ 1000 W speakers · mixer, cables, mics, stands',p:$.setS},
        {d:'Set M — 2× Pyrit dual 12″ active subs · 2× Mackie 15″ 1400 W speakers · mixer, cables, mics, stands',p:$.setM},
        {d:'Set L — 4× Pyrit dual 12″ active subs · 4× Mackie 15″ 1400 W speakers · mixer, cables, mics, stands',p:$.setL},
        {d:'Set XL — 4× Pyrit dual 12″ subs · 4× Mackie 15″ + 2× Mackie 12″ speakers · mixer, cables, mics, stands',p:$.setXL}]},
      {head:'Lighting',rows:[
        {d:'LED & laser light',p:`${$.led} / unit`},{d:'RGB flood light',p:`${$.rgb} / unit`},{d:'High-end hazer (fog) machine',p:$.hazer}]},
      {head:'Party furniture',rows:[
        {d:'Foldable table 180 × 75 cm',p:`${$.table} / table`},{d:'Stackable chair',p:`${$.chair} / chair`},
        {d:'Tent 3 × 3 m',p:$.tent3},{d:'Tent 3 × 6 m',p:$.tent6}]},
      {head:'Tableware',note:'Picked up from and returned to MUZE, washed.',rows:[
        {d:'Tablecloth',p:`${$.cloth} / pc`},
        {d:'Plates, bowls, cutlery & glassware — champagne, wine, water, coffee & teacups',p:`${$.piece} / pc`,full:true}]},
      {head:'Food serving devices',rows:[
        {d:'Electric soup warmer · 9 L',p:$.dev},{d:'Electric chafing dish · 1/1 GN',p:$.dev},
        {d:'Electric heating plate · 55 × 35 cm',p:$.dev},{d:'Large coffee maker · 40 cups',p:$.dev},
        {d:'Small refrigerator · h. 85 cm',p:$.dev},{d:'Ice maker · ~2 L',p:$.dev}]}]},
  rules:{title:'Good to <em>know</em>',snum:'/ rental rules',items:[
    'A contract is signed by the event’s main organiser / responsible person.',
    'Guests are expected to treat the premises with care.',
    'Keep away from the large mirrors; wipe any spills on the wooden floor immediately.',
    'Don’t drag furniture across the wooden floor — lift it instead.',
    'Keep doors closed during the event and locked when leaving the premises.',
    'Afterwards, return the space to the condition it was received in — decorations removed, furniture back in place.',
    'A cleaning fee of 50–150 € applies, depending on the event, guest count and food & beverage service.',
    'The organiser must report any damage to the premises or equipment immediately and compensate for damage caused during the event.',
    'Free cancellation up to 10 days before the event; later cancellations are charged 50% of the agreed fee.']},
  contact:{eyebrow:'Bookings & inquiries',title:'Let’s host<br>your <em>moment</em>.',
    here:'Located at Funkkis (former Opistotalo), a stone’s throw from both Vaasa’s market square and train station. Free parking on both sides of the building, plus a large parking area at the old bus station across the street.',
    whereL:'Where',where:'Sepänkyläntie 2, Vaasa — Funkkis',
    capL:'Capacity',cap:'90 seated · 150 standing · fully accessible',
    mgmtL:'Managed by',mgmt:'Salsa Vaasa rf · 2842111-4'},
  foot:{tag:'One room, every mood —<br>in the heart of Vaasa.',exploreH:'Explore',visitH:'Visit',bookH:'Book',
    send:'Send an inquiry',maps:'Open in maps',addr1:'Sepänkyläntie 2',addr2:'65100 Vaasa',
    copy:'© 2025 MUZE Finland · Managed by Salsa Vaasa rf',rights:'A versatile event space for all your special moments.'}
},

/* ============================ SUOMI (FI) ============================ */
fi:{
  code:'fi', label:'FI', dir:'ltr',
  title:'MUZE — Monipuolinen juhla- ja tapahtumatila Vaasan sydämessä',
  desc:'MUZE on 165 m² tapahtumatila Funkkiksella Vaasassa. Päivällä valoisa ja avara, illalla hehkuva juhlatila — häihin, juhliin, seminaareihin ja kaikkiin tärkeisiin hetkiin. Jopa 150 vierasta.',
  nav:{space:'Tila',layouts:'Pohjat',gallery:'Galleria',info:'Tiedot',pricing:'Hinnasto',rentals:'Vuokraus',contact:'Yhteystiedot',book:'Varaa tila',night:'Ilta',day:'Päivä'},
  info:{heading:'Hyvä tietää',snum:'/ käytännön tiedot',fees:'Vuokrahinnat',included:'Mitä tila sisältää',hire:'Vuokrakalusto',rules:'Vuokrausehdot'},
  hero:{eyebrow:'Vaasa · Funkkis · Sepänkyläntie 2',
    tagline:'Monipuolinen juhla- ja tapahtumatila Vaasan sydämessä — kaunis paikka kaikille elämäsi tärkeille hetkille.',
    meta:'165 m² · jopa 150 vierasta · yksi unohtumaton tila',
    cta:'Varaa päiväsi', scroll:'vieritä'},
  marquee:['Syntymäpäivät','Valmistujaiset','Kihlajaiset','Häät','Ristiäiset','Rippijuhlat','Näyttelyt','Elokuvaillat','Seminaarit','Tiimipäivät','Tanssi','Musiikki'],
  intro:{
    big:`Muunneltava tila viehättävine sisätiloineen — <span class="sg">avoin</span> tai yksityinen, intiimi tai täyteen pakattu. Syntymäpäivät, häät, seminaarit, näyttelyt: <b>mitä ikinä keksitkin</b>, MUZE on sille koti.`,
    body1:'MUZE taipuu mitä erilaisimpiin tapahtumiin, niin avoimiin kuin yksityisiinkin, joustavan tilansa ja viehättävän sisustuksensa ansiosta.',
    body2:'Se on oiva paikka perhejuhlille — syntymäpäiville, ristiäisille, rippijuhlille, valmistujaisille, kihlajaisille ja häille — ja yhtä lailla valmis ryhmien ja yritysten tarpeisiin seminaareista tiimipäiviin. Myös taideinstallaatiot, musiikki, tanssi ja muut kulttuuritapahtumat viihtyvät täällä mainiosti.'},
  stats:[{n:'165',u:'m²',l:'Avointa tilaa'},{n:'90',u:'istuen',l:'Juhlapöydissä'},{n:'150',u:'seisten',l:'Bileissä'},{n:'135',u:'tuumaa',l:'3 m valkokangas'}],
  duo:{day:{k:'Päivällä',h:'Päivänvaloa &amp;<br>avaraa tilaa',p:'Tusina ikkunaa tulvii pohjoista valoa. Kata pitkät pöydät lounaalle, valmistujaisille, työpajaan tai seminaariin ja vedä iso valkokangas alas.'},
       night:{k:'Illalla',h:'Verhot kiinni,<br>tila syttyy hehkuun',p:'Paksut akustiikkaverhot kietovat koko tilan täydelliseen pimeyteen, älyvalaistus minkä väriseksi tahansa, klubitason äänentoisto ja diskopallo odottamassa. Tanssia myöhään yöhön.'}},
  feat:{title:'Kaikki, mitä <em>tila</em> jo sisältää',snum:'/ tilan ominaisuudet',items:[
    {h:'Keskeinen sijainti',p:'Vaasan sydämessä, pysäköintimahdollisuudet rakennuksen molemmin puolin.'},
    {h:'Esteetön',p:'Kynnyksetön ja kaikille vieraille avoin.'},
    {h:'165 m² avointa tilaa',p:'Yksi avara, yhtenäinen tila, jonka muotoilet juuri haluamaksesi.'},
    {h:'Kova puulattia',p:'Lämmin, kova puulattia koko tilassa.'},
    {h:'90 istuen · 150 seisten',p:'Tilaa jopa 90 istuvalle vieraalle — pöydät ja tuolit saatavilla — tai 150 seisovalle.'},
    {h:'Naulakko & keittiö',p:'Oma naulakko, wc-tilat ja keittiö tarjoiluun ja viimeistelyyn (ei varsinaista ruoanlaittoa).'},
    {h:'Klubitason ääni',p:'Tilaan rakennettu tehokas, klubitason äänentoisto.'},
    {h:'Älyvalaistus',p:'Säädettävä älyvalaistus jokaiseen tunnelmaan.'},
    {h:'Valoa tai täysi pimeys',p:'Runsaasti päivänvaloa tusinasta ikkunasta ja paksut akustiikkaverhot täydelliseen pimeyteen tarvittaessa.'},
    {h:'135″ valkokangas',p:'Iso valkokangas — 135″, kokonaiset 3 metriä — projektori mukaan lukien.'},
    {h:'Ohjelmaa pyynnöstä',p:'Lisää DJ tai live-bändi aina halutessasi.'},
    {h:'Ruoka & juoma tyylilläsi',p:'Tarjoilu tai catering pyynnöstä; muutoin saat tuoda ja tarjoilla omat ruoat ja juomat.'}]},
  lay:{title:'Muotoile <em>tila</em> omaksesi',snum:'/ pohjapiirrokset',plantag:'Sepänkyläntie 2 · Funkkis',
    lead:'Juhlapöydät, tanssilattia, bändinurkkaus, leikkialue, lounge ja vastaanotto — sama tila, aseteltuna juuri sinun iltaasi varten. Napauta pohjaa nähdäksesi esikatselun.',
    opts:[{s:'36',h:'Intiimi illallinen',p:'Pitkät pöydät, avara tanssilattia, bändi-/DJ-nurkkaus.'},
          {s:'48',h:'Juhlat',p:'Enemmän istumapaikkoja ja lounge, tanssitilaa silti jää.'},
          {s:'62',h:'Täysi talo',p:'Teatteririvit tai juhlakattaus — jopa 90 istuen.'}],
    note:'↳ Jopa 90 istuen pöydissä · 150 seisten · täysin esteetön · pääsisäänkäynti Sepänkyläntieltä.'},
  gal:{title:'Tila, joka <em>muistaa</em> illan',snum:'/ galleria',
    caps:['Tanssi-ilta · täysi hehku','Seminaari · päivällä','Livemusiikkia · intiimi keikka','165 m² · avoin lattia','Merkkipäivä','Elokuvailta · 135″','Pimeän tultua','Illallinen & lounge','Päiväkattaus','Juhlaksi pukeutuneena','Iltatapahtuma','Hyvää seuraa']},
  price:{title:'Vuokraa <em>tila</em>',snum:'/ hinnat sis. projektorin, kankaan & perusäänet',
    disclaimer:'Hinnat ovat suuntaa-antavia — pyydä tapahtumallesi räätälöity tarjous.',
    spaceNote:'Sisältää projektorin, ison valkokankaan ja perusäänentoiston käytön.',
    wd:{label:'Maanantai — torstai',sub:'Arkihinnat',rows:[
      {d:'4 tuntia',s:'päättyen klo 21:00 mennessä',p:$.wd[0]},{d:'4 tuntia',s:'päättyen myöhemmin',p:$.wd[1]},
      {d:'8 tuntia',s:'päättyen klo 21:00 mennessä',p:$.wd[2]},{d:'8 tuntia',s:'päättyen myöhemmin',p:$.wd[3]}]},
    we:{label:'Perjantai tai lauantai',sub:'Viikonloppuhinnat',rows:[
      {d:'4 tuntia',s:'päättyen klo 21:00 mennessä',p:$.we[0]},{d:'4 tuntia',s:'päättyen myöhemmin',p:$.we[1]},
      {d:'8 tuntia',s:'päättyen klo 21:00 mennessä',p:$.we[2]},{d:'8 tuntia',s:'päättyen myöhemmin',p:$.we[3]}]},
    long:{label:'Koko viikonloppu',sub:'Perjantaista sunnuntaihin — vietä kunnon juhlat',rows:[
      {d:'48 tuntia',s:'perjantaista sunnuntaihin, päättyen klo 14 mennessä',p:$.weekend},
      {d:'Pöydät, tuolit & liinat',s:'',p:`${$.seat} / paikka`},
      {d:'Siivousmaksu',s:'tapahtuman, vierasmäärän & tarjoilun mukaan',p:$.clean}]},
    sl:{title:'Tehoäänet & valot',rows:[
      {d:'4 subia · 4 topia · 2 monitoria · mikseri · mikit',p:$.sl[0]},
      {d:'Diskopallo · LED · laserit · savukone',p:$.sl[1]}]},
    ent:{title:'Ohjelma',note:'Voit myös soittaa omaa musiikkiasi.',rows:[
      {d:'DJ',p:$.ent[0]},{d:'Livemusiikki — sooloartisti',p:$.ent[1]},{d:'Duo',p:$.ent[2]},{d:'Bändi',p:$.ent[3]}]},
    din:{title:'Ruokailu',rows:[
      {d:'Illallisbuffet',s:'alkuruoat, pääruoat, jälkiruoat, kahvi & tee — astiat sisältyvät',p:`${$.buffet} / hlö`},
      {d:'Ulkopuolinen catering tai omat ruoat',s:'koordinointi & astiat',p:`${$.catering} / vieras`},
      {d:'Buffetin tarjoiluvälineet',s:'lämmittimet, kylmälaitteet, kahvin-/jääpalakone…',p:`${$.servDevice} / laite`}]},
    foot:`MUZE ei tarjoa baaripalvelua. Yksityistilaisuuksissa saat tuoda ja tarjoilla omat juomasi; voimme tarjota lasit ja jäät hintaan ${$.glass} / kpl (sisältyvät maksutta buffet- ja cateringvaihtoehtoihin). Maksuton peruutus 10 päivää ennen tapahtumaa; myöhemmistä peruutuksista veloitamme 50 %.`},
  rent:{title:'Vuokraa <em>kalusto</em> mukaasi',snum:'/ ulkoinen vuokraus',
    intro:'Tapahtuma tulossa, mutta kaikkea tarvittavaa ei ole? Ei hätää — meiltä saat. Ota yhteyttä ja vuokraa juuri se kalusto, jonka tapahtumasi tai juhlasi tarvitsee.',
    groups:[
      {head:'Äänentoisto',rows:[
        {d:'Setti S — 1× Behringer 15″ aktiivisubi · 2× Mackie 12″ 1000 W kaiutinta · mikseri, kaapelit, mikit, telineet',p:$.setS},
        {d:'Setti M — 2× Pyrit tupla-12″ aktiivisubia · 2× Mackie 15″ 1400 W kaiutinta · mikseri, kaapelit, mikit, telineet',p:$.setM},
        {d:'Setti L — 4× Pyrit tupla-12″ aktiivisubia · 4× Mackie 15″ 1400 W kaiutinta · mikseri, kaapelit, mikit, telineet',p:$.setL},
        {d:'Setti XL — 4× Pyrit tupla-12″ subia · 4× Mackie 15″ + 2× Mackie 12″ kaiutinta · mikseri, kaapelit, mikit, telineet',p:$.setXL}]},
      {head:'Valot',rows:[
        {d:'LED- & laservalo',p:`${$.led} / kpl`},{d:'RGB-tulvavalo',p:`${$.rgb} / kpl`},{d:'Huippuluokan savukone',p:$.hazer}]},
      {head:'Juhlakalusteet',rows:[
        {d:'Taitettava pöytä 180 × 75 cm',p:`${$.table} / pöytä`},{d:'Pinottava tuoli',p:`${$.chair} / tuoli`},
        {d:'Teltta 3 × 3 m',p:$.tent3},{d:'Teltta 3 × 6 m',p:$.tent6}]},
      {head:'Astiat',note:'Noudetaan MUZElta ja palautetaan tiskattuina.',rows:[
        {d:'Pöytäliina',p:`${$.cloth} / kpl`},
        {d:'Lautaset, kulhot, ruokailuvälineet & lasit — samppanja-, viini- ja vesilasit sekä kahvi- ja teekupit',p:`${$.piece} / kpl`,full:true}]},
      {head:'Tarjoiluvälineet',rows:[
        {d:'Sähköinen keittolämmitin · 9 L',p:$.dev},{d:'Sähköinen GN-lämpöhaude · 1/1',p:$.dev},
        {d:'Sähköinen lämpölevy · 55 × 35 cm',p:$.dev},{d:'Iso kahvinkeitin · 40 kupille',p:$.dev},
        {d:'Pieni jääkaappi · k. 85 cm',p:$.dev},{d:'Jääpalakone · n. 2 L',p:$.dev}]}]},
  rules:{title:'Hyvä <em>tietää</em>',snum:'/ vuokrausehdot',items:[
    'Tapahtuman pääjärjestäjä / vastuuhenkilö allekirjoittaa sopimuksen.',
    'Vieraiden odotetaan kohtelevan tiloja huolella.',
    'Pysykää erossa isoista peileistä; pyyhkikää puulattialle läikkynyt heti pois.',
    'Älkää raahatko huonekaluja puulattiaa pitkin — nostakaa ne sen sijaan.',
    'Ovet pidetään kiinni tapahtuman aikana ja lukitaan tiloista poistuttaessa.',
    'Tilaisuuden jälkeen tila palautetaan samaan kuntoon kuin se vastaanotettiin — koristeet pois, kalusteet paikoilleen.',
    'Siivousmaksu 50–150 € peritään tapahtuman, vierasmäärän sekä ruoka- ja juomatarjoilun mukaan.',
    'Järjestäjän on ilmoitettava heti tiloille tai laitteille aiheutuneista vahingoista ja korvattava tapahtumansa aikana aiheutuneet vahingot.',
    'Maksuton peruutus 10 päivää ennen tapahtumaa; myöhemmistä peruutuksista veloitetaan 50 % sovitusta hinnasta.']},
  contact:{eyebrow:'Varaukset & tiedustelut',title:'Järjestetään<br>sinun <em>hetkesi</em>.',
    here:'Sijaitsemme Funkkiksella (entinen Opistotalo), kivenheiton päässä sekä Vaasan torilta että rautatieasemalta. Maksuton pysäköinti rakennuksen molemmin puolin sekä iso parkkialue vanhalla linja-autoasemalla kadun toisella puolella.',
    whereL:'Missä',where:'Sepänkyläntie 2, Vaasa — Funkkis',
    capL:'Kapasiteetti',cap:'90 istuen · 150 seisten · täysin esteetön',
    mgmtL:'Hallinnoi',mgmt:'Salsa Vaasa rf · 2842111-4'},
  foot:{tag:'Yksi tila jokaiseen tunnelmaan —<br>Vaasan sydämessä.',exploreH:'Tutustu',visitH:'Käy',bookH:'Varaa',
    send:'Lähetä tiedustelu',maps:'Avaa kartalla',addr1:'Sepänkyläntie 2',addr2:'65100 Vaasa',
    copy:'© 2025 MUZE Finland · Hallinnoi Salsa Vaasa rf',rights:'Monipuolinen tapahtumatila kaikkiin tärkeisiin hetkiisi.'}
},

/* ============================ SVENSKA (SV) ============================ */
sv:{
  code:'sv', label:'SV', dir:'ltr',
  title:'MUZE — En mångsidig evenemangslokal mitt i Vasa',
  desc:'MUZE är en 165 m² evenemangslokal på Funkkis i Vasa. Ljus och luftig om dagen, en glödande festlokal om kvällen — för bröllop, fester, seminarier och alla viktiga stunder. Upp till 150 gäster.',
  nav:{space:'Lokalen',layouts:'Planlösningar',gallery:'Galleri',info:'Detaljer',pricing:'Priser',rentals:'Uthyrning',contact:'Kontakt',book:'Boka lokalen',night:'Kväll',day:'Dag'},
  info:{heading:'Bra att veta',snum:'/ praktisk info',fees:'Hyrespriser',included:'Vad som ingår',hire:'Utrustning att hyra',rules:'Uthyrningsvillkor'},
  hero:{eyebrow:'Vasa · Funkkis · Sepänkyläntie 2',
    tagline:'En mångsidig fest- och evenemangslokal mitt i Vasa — en vacker plats för livets alla viktiga stunder.',
    meta:'165 m² · upp till 150 gäster · ett oförglömligt rum',
    cta:'Boka ditt datum', scroll:'skrolla'},
  marquee:['Födelsedagar','Studentfester','Förlovningar','Bröllop','Dop','Konfirmationer','Utställningar','Filmkvällar','Seminarier','Teambuilding','Dans','Musik'],
  intro:{
    big:`En förvandlingsbar lokal med charmig inredning — <span class="sg">öppen</span> eller privat, intim eller fullsatt. Födelsedagar, bröllop, seminarier, utställningar: <b>vad du än hittar på</b> — MUZE är hemmet för det.`,
    body1:'MUZE passar för de mest skilda evenemang, både öppna och privata, tack vare sin flexibla lokal och charmiga inredning.',
    body2:'Den är perfekt för familjefester — födelsedagar, dop, konfirmationer, studentfester, förlovningar och bröllop — och lika väl utrustad för grupper och företag, från seminarier till teambuilding. Även konstinstallationer, musik, dans och andra kulturevenemang trivs utmärkt här.'},
  stats:[{n:'165',u:'m²',l:'Öppen yta'},{n:'90',u:'sittande',l:'Vid festborden'},{n:'150',u:'stående',l:'På fest'},{n:'135',u:'tum',l:'3 m projektorduk'}],
  duo:{day:{k:'Om dagen',h:'Dagsljus &amp;<br>öppen yta',p:'Ett dussin fönster fyller rummet med nordiskt ljus. Duka långbord för en lunch, en studentfest, en workshop eller ett seminarium med den stora duken nerfälld.'},
       night:{k:'Om kvällen',h:'Gardinerna dras,<br>rummet börjar glöda',p:'Tjocka akustikgardiner sveper in hela lokalen i fullständigt mörker. Smart belysning i vilken färg som helst, ett ljudsystem på klubbnivå och en discokula som väntar. Dansa långt in på natten.'}},
  feat:{title:'Allt som <em>lokalen</em> redan har',snum:'/ egenskaper',items:[
    {h:'Centralt läge',p:'Mitt i Vasa, med parkeringsmöjligheter på båda sidor om byggnaden.'},
    {h:'Tillgänglig',p:'Tröskelfri och välkomnande för alla gäster.'},
    {h:'165 m² öppen yta',p:'Ett enda generöst, öppet rum att forma precis som du vill.'},
    {h:'Hårt trägolv',p:'Varmt, hårt trägolv i hela lokalen.'},
    {h:'90 sittande · 150 stående',p:'Plats för upp till 90 sittande gäster — bord och stolar finns — eller 150 stående.'},
    {h:'Garderob & kök',p:'Egen garderob, toaletter och ett kök för servering och slutberedning (ingen matlagning).'},
    {h:'Ljud på klubbnivå',p:'Ett kraftfullt ljudsystem på klubbnivå inbyggt i lokalen.'},
    {h:'Smart belysning',p:'Justerbar smart belysning för varje stämning.'},
    {h:'Dagsljus eller mörker',p:'Gott om dagsljus från ett dussin fönster, plus tjocka akustikgardiner för fullständigt mörker vid behov.'},
    {h:'135″ projektorduk',p:'En stor projektorduk — 135″, hela 3 meter — projektor inkluderad.'},
    {h:'Underhållning på begäran',p:'Lägg till en DJ eller ett liveband när du vill.'},
    {h:'Mat & dryck på ditt sätt',p:'Servering eller catering på begäran; annars får du ta med och servera egen mat och dryck.'}]},
  lay:{title:'Forma <em>lokalen</em> som du vill',snum:'/ planlösningar',plantag:'Sepänkyläntie 2 · Funkkis',
    lead:'Festbord, dansgolv, en bandhörna, lekyta, lounge och reception — samma lokal, arrangerad just för din kväll. Tryck på en planlösning för förhandsvisning.',
    opts:[{s:'36',h:'Intim middag',p:'Långbord, ett generöst dansgolv, band- / DJ-hörna.'},
          {s:'48',h:'Fest',p:'Fler sittplatser och en lounge, med plats kvar att dansa.'},
          {s:'62',h:'Fullsatt',p:'Biosittning i rader eller bankett — upp till 90 sittande.'}],
    note:'↳ Upp till 90 sittande vid bord · 150 stående · fullt tillgänglig · huvudentré från Sepänkyläntie.'},
  gal:{title:'Ett rum som <em>minns</em> kvällen',snum:'/ galleri',
    caps:['Danskväll · full glöd','Seminarium · om dagen','Livemusik · intim spelning','165 m² · öppen yta','Stor födelsedag','Filmkväll · 135″','När mörkret faller','Middag & lounge','Dagsträff','Klädd för fest','Kvällsevenemang','Gott sällskap']},
  price:{title:'Hyr <em>lokalen</em>',snum:'/ priser inkl. projektor, duk & grundljud',
    disclaimer:'Priserna är riktgivande — be om en skräddarsydd offert för ditt evenemang.',
    spaceNote:'Inkluderar användning av projektor, stor duk och grundläggande ljudsystem.',
    wd:{label:'Måndag — torsdag',sub:'Vardagspriser',rows:[
      {d:'4 timmar',s:'avslutas senast 21:00',p:$.wd[0]},{d:'4 timmar',s:'avslutas senare',p:$.wd[1]},
      {d:'8 timmar',s:'avslutas senast 21:00',p:$.wd[2]},{d:'8 timmar',s:'avslutas senare',p:$.wd[3]}]},
    we:{label:'Fredag eller lördag',sub:'Helgpriser',rows:[
      {d:'4 timmar',s:'avslutas senast 21:00',p:$.we[0]},{d:'4 timmar',s:'avslutas senare',p:$.we[1]},
      {d:'8 timmar',s:'avslutas senast 21:00',p:$.we[2]},{d:'8 timmar',s:'avslutas senare',p:$.we[3]}]},
    long:{label:'Hela helgen',sub:'Fredag till söndag — fira på riktigt',rows:[
      {d:'48 timmar',s:'fredag → söndag, avslutas senast kl. 14',p:$.weekend},
      {d:'Bord, stolar & dukar',s:'',p:`${$.seat} / plats`},
      {d:'Städavgift',s:'enligt evenemang, gästantal & servering',p:$.clean}]},
    sl:{title:'Avancerat ljud & ljus',rows:[
      {d:'4 subar · 4 toppar · 2 monitorer · mixer · mikar',p:$.sl[0]},
      {d:'Discokula · LED · lasrar · rökmaskin',p:$.sl[1]}]},
    ent:{title:'Underhållning',note:'Du får också gärna spela din egen musik.',rows:[
      {d:'DJ',p:$.ent[0]},{d:'Livemusik — soloartist',p:$.ent[1]},{d:'Duo',p:$.ent[2]},{d:'Band',p:$.ent[3]}]},
    din:{title:'Mat',rows:[
      {d:'Middagsbuffé',s:'förrätter, varmrätter, desserter, kaffe & te — porslin ingår',p:`${$.buffet} / pers`},
      {d:'Extern catering eller egen mat',s:'koordinering & porslin',p:`${$.catering} / gäst`},
      {d:'Serveringsutrustning för buffé',s:'värmare, kylare, kaffe- / ismaskin…',p:`${$.servDevice} / enhet`}]},
    foot:`MUZE erbjuder ingen barservice. Vid privata evenemang får du ta med och servera egen dryck; vi kan tillhandahålla glas och is för ${$.glass} / st (ingår kostnadsfritt i buffé- och cateringalternativen). Kostnadsfri avbokning fram till 10 dagar före evenemanget; vid senare avbokning debiteras 50 %.`},
  rent:{title:'Hyr <em>utrustningen</em>, ta den vart som helst',snum:'/ extern uthyrning',
    intro:'Har du ett evenemang på gång men saknar allt som behövs? Ingen fara — vi hjälper dig. Kontakta oss och hyr precis den utrustning ditt evenemang eller din fest behöver.',
    groups:[
      {head:'Ljudsystem',rows:[
        {d:'Set S — 1× Behringer 15″ aktiv sub · 2× Mackie 12″ 1000 W högtalare · mixer, kablar, mikar, stativ',p:$.setS},
        {d:'Set M — 2× Pyrit dubbel-12″ aktiva subar · 2× Mackie 15″ 1400 W högtalare · mixer, kablar, mikar, stativ',p:$.setM},
        {d:'Set L — 4× Pyrit dubbel-12″ aktiva subar · 4× Mackie 15″ 1400 W högtalare · mixer, kablar, mikar, stativ',p:$.setL},
        {d:'Set XL — 4× Pyrit dubbel-12″ subar · 4× Mackie 15″ + 2× Mackie 12″ högtalare · mixer, kablar, mikar, stativ',p:$.setXL}]},
      {head:'Belysning',rows:[
        {d:'LED- & laserljus',p:`${$.led} / st`},{d:'RGB-flödesljus',p:`${$.rgb} / st`},{d:'Rökmaskin av toppklass',p:$.hazer}]},
      {head:'Festmöbler',rows:[
        {d:'Hopfällbart bord 180 × 75 cm',p:`${$.table} / bord`},{d:'Stapelbar stol',p:`${$.chair} / stol`},
        {d:'Tält 3 × 3 m',p:$.tent3},{d:'Tält 3 × 6 m',p:$.tent6}]},
      {head:'Porslin',note:'Hämtas hos och återlämnas till MUZE, diskat.',rows:[
        {d:'Bordsduk',p:`${$.cloth} / st`},
        {d:'Tallrikar, skålar, bestick & glas — champagne-, vin-, vatten-, kaffe- och tekoppar',p:`${$.piece} / st`,full:true}]},
      {head:'Serveringsutrustning',rows:[
        {d:'Elektrisk soppvärmare · 9 L',p:$.dev},{d:'Elektrisk GN-värmehäll · 1/1',p:$.dev},
        {d:'Elektrisk värmeplatta · 55 × 35 cm',p:$.dev},{d:'Stor kaffebryggare · 40 koppar',p:$.dev},
        {d:'Liten kyl · h. 85 cm',p:$.dev},{d:'Ismaskin · ca 2 L',p:$.dev}]}]},
  rules:{title:'Bra att <em>veta</em>',snum:'/ uthyrningsvillkor',items:[
    'Evenemangets huvudarrangör / ansvarsperson skriver under ett avtal.',
    'Gästerna förväntas behandla lokalen varsamt.',
    'Håll er borta från de stora speglarna; torka genast upp spill på trägolvet.',
    'Dra inte möbler längs trägolvet — lyft dem i stället.',
    'Dörrarna hålls stängda under evenemanget och låses när lokalen lämnas.',
    'Efteråt återställs lokalen till samma skick som vid mottagandet — dekorationer borttagna, möbler på plats.',
    'En städavgift på 50–150 € tillkommer, beroende på evenemang, gästantal samt mat- och dryckesservering.',
    'Arrangören måste genast anmäla skador på lokal eller utrustning och ersätta skador som orsakats under evenemanget.',
    'Kostnadsfri avbokning fram till 10 dagar före evenemanget; vid senare avbokning debiteras 50 % av det överenskomna priset.']},
  contact:{eyebrow:'Bokningar & förfrågningar',title:'Vi ordnar<br>din <em>stund</em>.',
    here:'Vi finns på Funkkis (forna Opistotalo), ett stenkast från både Vasa torg och järnvägsstationen. Gratis parkering på båda sidor om byggnaden, samt en stor parkering vid gamla busstationen tvärs över gatan.',
    whereL:'Var',where:'Sepänkyläntie 2, Vasa — Funkkis',
    capL:'Kapacitet',cap:'90 sittande · 150 stående · fullt tillgänglig',
    mgmtL:'Förvaltas av',mgmt:'Salsa Vaasa rf · 2842111-4'},
  foot:{tag:'Ett rum, varje stämning —<br>mitt i Vasa.',exploreH:'Utforska',visitH:'Besök',bookH:'Boka',
    send:'Skicka en förfrågan',maps:'Öppna i kartan',addr1:'Sepänkyläntie 2',addr2:'65100 Vasa',
    copy:'© 2025 MUZE Finland · Förvaltas av Salsa Vaasa rf',rights:'En mångsidig evenemangslokal för alla dina viktiga stunder.'}
}
};

/* ---- template ---- */
const FILES = {en:'index.html',fi:'fi.html',sv:'sv.html'};
const order = ['en','fi','sv'];

function langSwitch(cur){
  return order.map(l=>`<a href="./${FILES[l]}" class="lang-opt${l===cur?' active':''}" hreflang="${l}">${D[l].label}</a>`).join('');
}
function navLinks(t){
  return ['space','layouts','gallery','info','contact']
    .map(k=>`<a href="#${k}">${t.nav[k]}</a>`).join('\n      ');
}
const LOGO = './assets/Muze-Logo-NEW_WHITE-scaled.webp';
function priceCard(card,feature=false){
  const rows=card.rows.map(r=>`<div class="prow"><div class="pd">${r.d}${r.s?`<small>${r.s}</small>`:''}</div><div class="pp">${r.p}</div></div>`).join('');
  return `<div class="pcard${feature?' feature':''} reveal">
        <div class="ptitle">${card.label}</div>
        <div class="psub">${card.sub}</div>
        ${rows}
      </div>`;
}
function addon(a){
  const rows=a.rows.map(r=>`<div class="arow"><span>${r.d}${r.s?` <small>${r.s}</small>`:''}</span><b>${r.p}</b></div>`).join('');
  return `<div class="addon reveal"><div class="at">${a.title}</div>${a.note?`<div class="arow" style="opacity:.7"><span><em>${a.note}</em></span><b></b></div>`:''}${rows}</div>`;
}

function render(lang){
  const t=D[lang];
  const alts=order.map(l=>`<link rel="alternate" hreflang="${l}" href="${SITE}/${FILES[l]}" />`).join('\n');
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${t.dir}" data-mode="night">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${t.title}</title>
<meta name="description" content="${t.desc}" />
<meta property="og:title" content="${t.title}" />
<meta property="og:description" content="${t.desc}" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="${lang==='en'?'en_US':lang==='fi'?'fi_FI':'sv_FI'}" />
<meta property="og:url" content="${SITE}/${FILES[lang]}" />
<meta property="og:image" content="${SITE}/assets/20250517_221241-scaled.webp" />
<meta name="twitter:card" content="summary_large_image" />
${alts}
<link rel="alternate" hreflang="x-default" href="${SITE}/index.html" />
<link rel="canonical" href="${SITE}/${FILES[lang]}" />
<link rel="icon" href="./assets/cropped-Muze-Logo_profile-scaled-1.webp" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Hanken+Grotesk:wght@400;500;600&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="./site.css" />
</head>
<body>

<nav class="nav" id="nav">
  <div class="nav-inner">
    <a href="#top" class="brand" aria-label="MUZE — home"><img class="logo-img" src="${LOGO}" alt="MUZE" /></a>
    <div class="nav-links">
      ${navLinks(t)}
    </div>
    <div class="nav-tools">
      <div class="lang" role="group" aria-label="Language">${langSwitch(lang)}</div>
      <button class="toggle" id="modeToggle" aria-label="Day / night">
        <span class="dot"></span>
        <span class="lbl-night">${t.nav.night}</span><span class="lbl-day">${t.nav.day}</span>
      </button>
      <a href="mailto:info@muze.fi" class="btn btn-primary">${t.nav.book} <span class="arrow">→</span></a>
      <button class="menu-btn" id="menuBtn" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </div>
</nav>

<div class="mobile-menu" id="mobileMenu">
  <div class="lang lang-m" aria-label="Language">${langSwitch(lang)}</div>
  <a href="#space">${t.nav.space}</a>
  <a href="#layouts">${t.nav.layouts}</a>
  <a href="#gallery">${t.nav.gallery}</a>
  <a href="#info">${t.nav.info}</a>
  <a href="#contact">${t.nav.contact} <em>info@muze.fi</em></a>
</div>

<header class="hero" id="top">
  <div class="hero-bg"><div class="photo" id="heroPhoto"></div></div>
  <div class="wrap">
    <div class="hero-eyebrow"><span class="ln"></span><span class="eyebrow">${t.hero.eyebrow}</span></div>
    <h1 class="hero-logo"><img src="${LOGO}" alt="MUZE" /></h1>
    <div class="hero-bottom">
      <p class="hero-tag">${t.hero.tagline}</p>
      <div class="hero-cta">
        <span class="hero-meta">${t.hero.meta}</span>
        <a href="#contact" class="btn btn-primary">${t.hero.cta} <span class="arrow">→</span></a>
      </div>
    </div>
  </div>
  <div class="scrollcue"><span>${t.hero.scroll}</span><span class="bar"></span></div>
</header>

<div class="marquee" aria-hidden="true">
  <div class="marquee-track" id="marquee">${t.marquee.map(m=>`<span>${m}</span>`).join('')}</div>
</div>

<section class="section" id="space">
  <div class="wrap">
    <div class="intro-text">
      <p class="lead reveal">${t.intro.body1}</p>
      <p class="lead reveal d1" style="margin-top:14px">${t.intro.body2}</p>
    </div>
  </div>
</section>

<section class="section duality">
  <div class="duo">
    <div class="panel day">
      <img src="./assets/20250106_141251-scaled.webp" alt="MUZE — ${t.duo.day.k}" loading="lazy" />
      <div class="ov"></div>
      <div class="c"><div class="k"><b>◐</b> ${t.duo.day.k}</div><h3 class="display">${t.duo.day.h}</h3><p>${t.duo.day.p}</p></div>
    </div>
    <div class="panel night">
      <img src="./assets/20250517_221241-scaled.webp" alt="MUZE — ${t.duo.night.k}" loading="lazy" />
      <div class="ov"></div>
      <div class="c"><div class="k"><b>◑</b> ${t.duo.night.k}</div><h3 class="display">${t.duo.night.h}</h3><p>${t.duo.night.p}</p></div>
    </div>
    <div class="divide"></div>
  </div>
</section>

<section class="section layouts" id="layouts">
  <div class="wrap">
    <div class="shead"><h2 class="display reveal">${t.lay.title}</h2><span class="snum reveal d1">${t.lay.snum}</span></div>
    <div class="lay-wrap">
      <div class="lay-plan reveal" id="layPlan">
        <span class="tagn">${t.lay.plantag}</span>
        <img src="./assets/1_1.webp" data-i="0" class="on" alt="${t.lay.opts[0].h} — ${t.lay.opts[0].s}" />
        <img src="./assets/3_1.webp" data-i="1" alt="${t.lay.opts[1].h} — ${t.lay.opts[1].s}" />
        <img src="./assets/5_1.webp" data-i="2" alt="${t.lay.opts[2].h} — ${t.lay.opts[2].s}" />
      </div>
      <div class="reveal d1">
        <p class="lead">${t.lay.lead}</p>
        <div class="lay-opts" id="layOpts">
          ${t.lay.opts.map((o,i)=>`<button class="lay-opt${i===0?' active':''}" data-i="${i}"><span class="seats">${o.s}</span><div class="ld"><h5>${o.h}</h5><p>${o.p}</p></div></button>`).join('\n          ')}
        </div>
        <p class="lay-note">${t.lay.note}</p>
      </div>
    </div>
  </div>
</section>

<section class="section" id="gallery">
  <div class="wrap">
    <div class="shead"><h2 class="display reveal">${t.gal.title}</h2><span class="snum reveal d1">${t.gal.snum}</span></div>
    <div class="gal reveal">
      ${[
        ['20250517_221241-scaled',0],['4-scaled',1],['20250106_141251-scaled',3],
        ['20250613_194356-scaled',4],['20241213_213850-scaled',2],['6-scaled',7]
      ].map(([img,ci])=>`<figure><img src="./assets/${img}.webp" alt="MUZE — ${t.gal.caps[ci]}" loading="lazy"></figure>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section" id="info">
  <div class="wrap">
    <div class="shead"><h2 class="display reveal">${t.info.heading}</h2><span class="snum reveal d1">${t.info.snum}</span></div>
    <div class="acc reveal" id="acc">

      <div class="acc-item">
        <button class="acc-head">${t.info.fees} <span class="plus">+</span></button>
        <div class="acc-body"><div class="acc-inner">
          <p class="lay-note" style="margin:0 0 26px">${t.price.disclaimer} &nbsp;·&nbsp; ${t.price.spaceNote}</p>
          <div class="price-grid">${priceCard(t.price.wd)}${priceCard(t.price.we)}${priceCard(t.price.long,true)}</div>
          <div class="addons">${addon(t.price.sl)}${addon(t.price.ent)}${addon(t.price.din)}</div>
          <p class="lay-note" style="margin-top:24px">${t.price.foot}</p>
        </div></div>
      </div>

      <div class="acc-item">
        <button class="acc-head">${t.info.included} <span class="plus">+</span></button>
        <div class="acc-body"><div class="acc-inner">
          <div class="feat-grid">
          ${t.feat.items.map((f,i)=>`<div class="feat"><span class="fi">${String(i+1).padStart(2,'0')}</span><div><h4 class="display">${f.h}</h4><p>${f.p}</p></div></div>`).join('\n          ')}
          </div>
        </div></div>
      </div>

      <div class="acc-item">
        <button class="acc-head">${t.info.hire} <span class="plus">+</span></button>
        <div class="acc-body"><div class="acc-inner">
          <p class="lead" style="margin-bottom:26px">${t.rent.intro}</p>
          ${t.rent.groups.map(g=>`<div class="rgroup"><h5 class="rgroup-h">${g.head}</h5>${g.note?`<p class="lay-note" style="margin:0 0 12px">${g.note}</p>`:''}<div class="acc-grid">
            ${g.rows.map(r=>`<div class="arow${r.full?' full':''}"><span>${r.d}</span><b>${r.p}</b></div>`).join('\n            ')}
          </div></div>`).join('\n          ')}
        </div></div>
      </div>

      <div class="acc-item">
        <button class="acc-head">${t.info.rules} <span class="plus">+</span></button>
        <div class="acc-body"><div class="acc-inner">
          <div class="rule-grid">
          ${t.rules.items.map((r,i)=>`<div class="rule"><span class="rn display">${['①','②','③','④','⑤','⑥','⑦','⑧','⑨'][i]}</span><p>${r}</p></div>`).join('\n          ')}
          </div>
        </div></div>
      </div>

    </div>
  </div>
</section>

<section class="contact" id="contact">
  <div class="contact-bg"><img src="./assets/20240927_183017-scaled.webp" alt="MUZE" loading="lazy" /></div>
  <div class="wrap">
    <span class="eyebrow reveal">${t.contact.eyebrow}</span>
    <h2 class="display reveal d1" style="margin-top:18px">${t.contact.title}</h2>
    <div class="cgrid">
      <a href="mailto:info@muze.fi?subject=MUZE" class="cmail reveal d1">info@muze.fi <span class="arrow">→</span></a>
      <div class="cinfo reveal d2">
        <div class="ci"><span class="cl">${t.contact.whereL}</span><a class="cv" href="https://maps.google.com/?q=Sepänkyläntie+2+Vaasa" target="_blank" rel="noopener">${t.contact.where}</a></div>
        <div class="ci"><span class="cl">${t.contact.capL}</span><span class="cv">${t.contact.cap}</span></div>
        <div class="ci"><span class="cl">${t.contact.mgmtL}</span><span class="cv">${t.contact.mgmt}</span></div>
      </div>
    </div>
    <p class="lead reveal d2" style="margin-top:34px;max-width:60ch">${t.contact.here}</p>
  </div>
</section>

<footer>
  <div class="wrap foot">
    <div>
      <img class="foot-logo" src="${LOGO}" alt="MUZE" />
      <p class="lead" style="margin-top:20px;font-size:.95rem">${t.foot.tag}</p>
    </div>
    <div class="foot-links">
      <div class="foot-col"><h6>${t.foot.exploreH}</h6>
        <a href="#space">${t.nav.space}</a><a href="#layouts">${t.nav.layouts}</a><a href="#gallery">${t.nav.gallery}</a><a href="#info">${t.nav.info}</a>
      </div>
      <div class="foot-col"><h6>${t.foot.visitH}</h6>
        <span>${t.foot.addr1}</span><span>${t.foot.addr2}</span><a href="https://maps.google.com/?q=Sepänkyläntie+2+Vaasa" target="_blank" rel="noopener">${t.foot.maps} →</a>
      </div>
      <div class="foot-col"><h6>${t.foot.bookH}</h6>
        <a href="mailto:info@muze.fi">info@muze.fi</a><a href="mailto:info@muze.fi?subject=MUZE">${t.foot.send} →</a>
      </div>
    </div>
  </div>
  <div class="wrap foot-base"><span>${t.foot.copy}</span><span>${t.foot.rights}</span></div>
</footer>

<script src="./site.js"></script>
</body>
</html>
`;
}

/* ---- write ---- */
for(const lang of order){
  writeFileSync(new URL(`./${FILES[lang]}`,import.meta.url), render(lang));
  console.log('wrote',FILES[lang]);
}
console.log('done');
