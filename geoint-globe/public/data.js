// GEOINT COUNTRY DATABASE v2.0
// Sources: World Bank, CIA World Factbook, OEC/Economic Complexity Atlas, SIPRI, open-source intelligence
const COUNTRY_DB = {
"840": {
  name:"United States",flag:"🇺🇸",capital:"Washington, D.C.",population:334914895,area:9833520,
  gdp:27360,gdpPC:81695,
  ethnicities:[{n:"White",p:57.8},{n:"Hispanic/Latino",p:18.7},{n:"Black",p:12.1},{n:"Asian",p:5.9},{n:"Other/Mixed",p:5.5}],
  culture:"Multicultural federal republic; dominant global cultural exporter in media, technology, and entertainment. English-speaking with significant Spanish-speaking minority.",
  terrain:{plains:45,hills:30,mountains:25},
  mountains:["Rocky Mountains","Appalachians","Sierra Nevada","Cascades","Alaska Range"],
  plains:["Great Plains","Mississippi Valley","Atlantic Coastal Plain","Central Valley"],
  rivers:["Mississippi","Missouri","Colorado","Columbia","Rio Grande","Ohio"],
  lakes:["Superior","Michigan","Huron","Erie","Ontario","Great Salt Lake"],
  exports:["Refined Petroleum","Aircraft","Integrated Circuits","Crude Oil","Natural Gas","Soybeans","Motor Vehicles"],
  imports:["Motor Vehicles","Crude Oil","Computers","Packaged Medicaments","Broadcasting Equipment"],
  extraction:[
    {n:"Permian Basin",lat:31.9,lng:-102.1,r:"Oil & Gas"},
    {n:"Powder River Basin",lat:44.8,lng:-106.2,r:"Coal"},
    {n:"Bingham Canyon",lat:40.5,lng:-112.1,r:"Copper"},
    {n:"Carlin Trend",lat:40.7,lng:-116.3,r:"Gold"},
    {n:"Marcellus Shale",lat:41.2,lng:-77.0,r:"Natural Gas"},
    {n:"Eagle Ford",lat:28.7,lng:-98.5,r:"Oil & Gas"}
  ],
  bases:[
    {n:"Pentagon / Fort Myer",lat:38.87,lng:-77.06,t:"Army HQ",f:false},
    {n:"Norfolk Naval Station",lat:36.95,lng:-76.33,t:"Navy",f:false},
    {n:"Fort Liberty (Bragg)",lat:35.14,lng:-79.0,t:"Army Airborne",f:false},
    {n:"Camp Pendleton",lat:33.3,lng:-117.35,t:"Marine Corps",f:false},
    {n:"Ramstein AB (DE)",lat:49.44,lng:7.6,t:"Air Force",f:false},
    {n:"Camp Humphreys (KR)",lat:36.96,lng:127.03,t:"Army",f:false},
    {n:"Yokosuka (JP)",lat:35.28,lng:139.67,t:"Navy",f:false},
    {n:"Al Udeid (QA)",lat:25.12,lng:51.32,t:"Air Force",f:false},
    {n:"Diego Garcia (IO)",lat:-7.32,lng:72.42,t:"Navy/Air",f:false},
    {n:"Guantánamo Bay (CU)",lat:19.9,lng:-75.1,t:"Navy",f:false}
  ]
},
"156": {
  name:"China",flag:"🇨🇳",capital:"Beijing",population:1425178782,area:9596960,
  gdp:18530,gdpPC:13000,
  ethnicities:[{n:"Han Chinese",p:91.1},{n:"Zhuang",p:1.3},{n:"Hui",p:0.8},{n:"Manchu",p:0.8},{n:"Uyghur",p:0.8},{n:"Other",p:5.2}],
  culture:"Ancient continuous civilization. Confucian philosophical tradition; Mandarin Chinese as standard language; 56 recognized ethnic groups. One-party socialist republic.",
  terrain:{plains:30,hills:25,mountains:45},
  mountains:["Himalayas","Kunlun","Tian Shan","Altai","Qinling","Greater Khingan"],
  plains:["North China Plain","Manchurian Plain","Yangtze Delta","Sichuan Basin"],
  rivers:["Yangtze","Yellow River","Pearl River","Mekong","Amur"],
  lakes:["Qinghai Lake","Poyang Lake","Dongting Lake","Taihu"],
  exports:["Broadcasting Equipment","Computers","Integrated Circuits","Telephones","Office Machine Parts"],
  imports:["Crude Oil","Integrated Circuits","Iron Ore","Natural Gas","Soybeans"],
  extraction:[
    {n:"Daqing Oilfield",lat:46.6,lng:125.0,r:"Oil"},
    {n:"Shengli Oilfield",lat:37.5,lng:118.5,r:"Oil"},
    {n:"Shanxi Coal Basin",lat:37.8,lng:112.5,r:"Coal"},
    {n:"Baotou",lat:40.6,lng:109.8,r:"Rare Earth Elements"},
    {n:"Dexing",lat:28.9,lng:117.6,r:"Copper"},
    {n:"Zhaotong",lat:27.3,lng:103.7,r:"Natural Gas"}
  ],
  bases:[
    {n:"Zhanjiang Naval Base",lat:21.2,lng:110.4,t:"Navy (South Sea Fleet)",f:false},
    {n:"Qingdao Naval Base",lat:36.0,lng:120.4,t:"Navy (North Sea Fleet)",f:false},
    {n:"Djibouti Support Base",lat:11.55,lng:43.15,t:"Navy Logistics",f:false},
    {n:"Fiery Cross Reef",lat:9.55,lng:112.89,t:"Air/Navy (SCS)",f:false},
    {n:"Korla Missile Test",lat:41.7,lng:86.1,t:"Missile/Space",f:false}
  ]
},
"643": {
  name:"Russia",flag:"🇷🇺",capital:"Moscow",population:144236933,area:17098242,
  gdp:2020,gdpPC:14000,
  ethnicities:[{n:"Russian",p:77.7},{n:"Tatar",p:3.7},{n:"Ukrainian",p:1.4},{n:"Bashkir",p:1.1},{n:"Chuvash",p:1.0},{n:"Other",p:15.1}],
  culture:"East Slavic, Eastern Orthodox tradition; Russian language. Vast multiethnic federation spanning Europe and Asia. Rich literary and artistic tradition (Tolstoy, Dostoevsky, Tchaikovsky).",
  terrain:{plains:55,hills:25,mountains:20},
  mountains:["Ural Mountains","Caucasus","Altai","Sayan","Kamchatka volcanoes"],
  plains:["East European Plain","West Siberian Plain","Central Siberian Plateau"],
  rivers:["Volga","Ob","Yenisei","Lena","Amur","Don"],
  lakes:["Baikal","Ladoga","Onega","Caspian Sea (border)"],
  exports:["Crude Oil","Refined Petroleum","Natural Gas","Coal","Wheat","Gold"],
  imports:["Motor Vehicles","Packaged Medicaments","Computers","Vehicle Parts","Telephones"],
  extraction:[
    {n:"West Siberian Basin",lat:61.0,lng:73.0,r:"Oil & Gas"},
    {n:"Kuzbass",lat:54.0,lng:87.0,r:"Coal"},
    {n:"Norilsk",lat:69.3,lng:88.2,r:"Nickel, Palladium, Copper"},
    {n:"Yakutia Diamonds",lat:62.5,lng:134.0,r:"Diamonds"},
    {n:"Sakhalin",lat:51.0,lng:143.0,r:"Oil & Gas"},
    {n:"Kola Peninsula",lat:68.0,lng:33.0,r:"Apatite, Nickel"}
  ],
  bases:[
    {n:"Severomorsk",lat:69.07,lng:33.42,t:"Northern Fleet HQ",f:false},
    {n:"Kaliningrad",lat:54.7,lng:20.5,t:"Baltic Fleet",f:false},
    {n:"Sevastopol",lat:44.6,lng:33.5,t:"Black Sea Fleet",f:false},
    {n:"Vladivostok",lat:43.1,lng:131.9,t:"Pacific Fleet",f:false},
    {n:"Tartus (SY)",lat:34.9,lng:35.9,t:"Navy (Mediterranean)",f:false},
    {n:"Khmeimim (SY)",lat:35.4,lng:35.95,t:"Air Force",f:false}
  ]
},
"826": {
  name:"United Kingdom",flag:"🇬🇧",capital:"London",population:67736802,area:242495,
  gdp:3340,gdpPC:49300,
  ethnicities:[{n:"White British",p:81.7},{n:"Asian",p:7.5},{n:"Black",p:3.3},{n:"Mixed",p:2.2},{n:"Other",p:5.3}],
  culture:"Anglo-Saxon heritage with Celtic influences; constitutional monarchy and parliamentary democracy. Global cultural influence through language, literature, music. Common law system origin.",
  terrain:{plains:50,hills:35,mountains:15},
  mountains:["Scottish Highlands","Pennines","Snowdonia","Lake District fells","Grampians"],
  plains:["English Lowlands","East Anglia","Midlands"],
  rivers:["Thames","Severn","Trent","Great Ouse","Mersey"],
  lakes:["Lough Neagh","Windermere","Loch Lomond","Loch Ness"],
  exports:["Gold","Motor Vehicles","Crude Oil","Packaged Medicaments","Gas Turbines"],
  imports:["Gold","Motor Vehicles","Crude Oil","Refined Petroleum","Computers"],
  extraction:[
    {n:"North Sea Oil",lat:57.5,lng:1.5,r:"Oil & Gas"},
    {n:"West Shetland",lat:60.5,lng:-3.0,r:"Oil"},
    {n:"Wytch Farm",lat:50.65,lng:-2.1,r:"Onshore Oil"}
  ],
  bases:[
    {n:"HMNB Portsmouth",lat:50.8,lng:-1.1,t:"Royal Navy",f:false},
    {n:"HMNB Devonport",lat:50.38,lng:-4.18,t:"Royal Navy",f:false},
    {n:"HMNB Clyde (Faslane)",lat:56.06,lng:-4.82,t:"Nuclear Submarine",f:false},
    {n:"RAF Lakenheath",lat:52.41,lng:0.56,t:"USAF in UK",f:true},
    {n:"Akrotiri (CY)",lat:34.58,lng:32.99,t:"RAF",f:false},
    {n:"Diego Garcia (IO)",lat:-7.32,lng:72.42,t:"Joint US/UK",f:false}
  ]
},
"250": {
  name:"France",flag:"🇫🇷",capital:"Paris",population:68042591,area:643801,
  gdp:3050,gdpPC:44850,
  ethnicities:[{n:"French (various origins)",p:85},{n:"North African",p:8},{n:"Sub-Saharan African",p:4},{n:"Other",p:3}],
  culture:"Latin/Gallic heritage; centralized republic. Global influence in art, philosophy, cuisine, fashion, and diplomacy. Francophone cultural sphere across Africa and Caribbean.",
  terrain:{plains:40,hills:35,mountains:25},
  mountains:["Alps","Pyrenees","Massif Central","Vosges","Jura"],
  plains:["Paris Basin","Aquitaine Basin","Rhône Valley"],
  rivers:["Loire","Seine","Rhône","Garonne","Rhine (border)"],
  lakes:["Lake Geneva (border)","Lake Bourget","Lake Annecy"],
  exports:["Aircraft","Packaged Medicaments","Motor Vehicles","Wine","Perfumes"],
  imports:["Crude Oil","Motor Vehicles","Refined Petroleum","Natural Gas","Computers"],
  extraction:[
    {n:"Lacq (depleted)",lat:43.4,lng:-0.6,r:"Natural Gas (historical)"},
    {n:"New Caledonia",lat:-22.2,lng:166.5,r:"Nickel"}
  ],
  bases:[
    {n:"Toulon Naval Base",lat:43.1,lng:5.93,t:"Mediterranean Fleet",f:false},
    {n:"Brest Naval Base",lat:48.38,lng:-4.49,t:"Atlantic Fleet/Nuclear Sub",f:false},
    {n:"Djibouti",lat:11.55,lng:43.14,t:"Army/Navy",f:false},
    {n:"Réunion",lat:-20.88,lng:55.45,t:"Indian Ocean Forces",f:false},
    {n:"N'Djamena (TD)",lat:12.13,lng:15.05,t:"Sahel Operations",f:false}
  ]
},
"276": {
  name:"Germany",flag:"🇩🇪",capital:"Berlin",population:84482267,area:357022,
  gdp:4460,gdpPC:52820,
  ethnicities:[{n:"German",p:80},{n:"Turkish origin",p:3.5},{n:"Polish origin",p:1.8},{n:"Syrian/Iraqi",p:2},{n:"Other",p:12.7}],
  culture:"Central European, Germanic tradition. Federal republic; engineering and industrial excellence. Major cultural contributions in philosophy (Kant, Hegel), music (Bach, Beethoven), and science.",
  terrain:{plains:35,hills:40,mountains:25},
  mountains:["Alps (Bavarian)","Black Forest","Harz","Erzgebirge"],
  plains:["North German Plain","Upper Rhine Plain"],
  rivers:["Rhine","Danube","Elbe","Weser","Oder"],
  lakes:["Lake Constance (border)","Müritz","Chiemsee"],
  exports:["Motor Vehicles","Vehicle Parts","Packaged Medicaments","Aircraft","Medical Instruments"],
  imports:["Motor Vehicles","Crude Oil","Natural Gas","Vehicle Parts","Computers"],
  extraction:[
    {n:"Ruhr District",lat:51.5,lng:7.2,r:"Coal (historical)"},
    {n:"Lusatia",lat:51.7,lng:14.3,r:"Lignite"},
    {n:"Lower Saxony",lat:52.5,lng:8.0,r:"Natural Gas (small)"}
  ],
  bases:[
    {n:"Ramstein AB (US)",lat:49.44,lng:7.6,t:"USAF Europe HQ",f:true},
    {n:"Grafenwöhr (US)",lat:49.7,lng:11.9,t:"US Army Training",f:true},
    {n:"Büchel Air Base",lat:50.17,lng:7.07,t:"Luftwaffe/NATO Nuclear",f:false},
    {n:"Kiel Naval Base",lat:54.33,lng:10.15,t:"German Navy",f:false}
  ]
},
"380": {
  name:"Italy",flag:"🇮🇹",capital:"Rome",population:58870762,area:301340,
  gdp:2190,gdpPC:37200,
  ethnicities:[{n:"Italian",p:92},{n:"Romanian",p:1.2},{n:"North African",p:1.5},{n:"Albanian",p:0.8},{n:"Other",p:4.5}],
  culture:"Latin/Roman heritage; cradle of Renaissance and Roman law. Regional diversity between North and South. Global influence in art, architecture, fashion, design, and cuisine.",
  terrain:{plains:23,hills:42,mountains:35},
  mountains:["Alps","Apennines","Dolomites","Mount Etna","Mount Vesuvius"],
  plains:["Po Valley (Pianura Padana)","Tavoliere delle Puglie"],
  rivers:["Po","Tiber","Arno","Adige"],
  lakes:["Garda","Como","Maggiore","Trasimeno"],
  exports:["Packaged Medicaments","Motor Vehicles","Refined Petroleum","Wine","Leather"],
  imports:["Crude Oil","Motor Vehicles","Natural Gas","Refined Petroleum","Packaged Medicaments"],
  extraction:[
    {n:"Val d'Agri",lat:40.3,lng:15.9,r:"Oil"},
    {n:"Ravenna Offshore",lat:44.4,lng:12.8,r:"Natural Gas"},
    {n:"Sardinia",lat:39.2,lng:8.6,r:"Lead, Zinc (historical)"}
  ],
  bases:[
    {n:"Sigonella NAS (US)",lat:37.4,lng:14.92,t:"US Navy",f:true},
    {n:"Aviano AB (US)",lat:46.03,lng:12.6,t:"USAF",f:true},
    {n:"Taranto Naval Base",lat:40.47,lng:17.2,t:"Italian Navy",f:false},
    {n:"La Maddalena",lat:41.22,lng:9.4,t:"Italian Navy",f:false},
    {n:"Camp Darby (US)",lat:43.68,lng:10.35,t:"US Army",f:true}
  ]
},
"392": {
  name:"Japan",flag:"🇯🇵",capital:"Tokyo",population:123294513,area:377975,
  gdp:4210,gdpPC:34150,
  ethnicities:[{n:"Japanese",p:97.5},{n:"Chinese",p:0.6},{n:"Korean",p:0.4},{n:"Other",p:1.5}],
  culture:"East Asian island civilization; unique blend of ancient tradition and ultra-modernity. Shinto and Buddhist traditions. Constitutional monarchy with parliamentary government.",
  terrain:{plains:20,hills:30,mountains:50},
  mountains:["Japanese Alps","Mount Fuji","Daisetsuzan","Kii Mountains"],
  plains:["Kantō Plain","Nōbi Plain","Osaka Plain"],
  rivers:["Shinano","Tone","Ishikari","Kitakami"],
  lakes:["Biwa","Kasumigaura","Saroma"],
  exports:["Motor Vehicles","Vehicle Parts","Integrated Circuits","Machinery","Iron/Steel Products"],
  imports:["Crude Oil","Natural Gas","Computers","Coal","Refined Petroleum"],
  extraction:[
    {n:"Akita",lat:39.7,lng:140.1,r:"Oil (small)"},
    {n:"Hokkaido",lat:43.0,lng:141.3,r:"Coal (historical)"}
  ],
  bases:[
    {n:"Yokosuka (US)",lat:35.28,lng:139.67,t:"US 7th Fleet",f:true},
    {n:"Kadena AB (US)",lat:26.35,lng:127.77,t:"USAF Pacific",f:true},
    {n:"Sasebo (US)",lat:33.16,lng:129.72,t:"US Navy",f:true},
    {n:"JMSDF Yokosuka",lat:35.29,lng:139.68,t:"Japan Maritime SDF",f:false},
    {n:"JMSDF Kure",lat:34.23,lng:132.56,t:"Japan Maritime SDF",f:false},
    {n:"Camp Fuji (US)",lat:35.3,lng:138.92,t:"US Marines",f:true}
  ]
},
"356": {
  name:"India",flag:"🇮🇳",capital:"New Delhi",population:1428627663,area:3287263,
  gdp:3730,gdpPC:2610,
  ethnicities:[{n:"Indo-Aryan",p:72},{n:"Dravidian",p:25},{n:"Other (Tibeto-Burman, Austroasiatic)",p:3}],
  culture:"Ancient multi-civilizational state; Hindu-majority with large Muslim minority. 22 official languages; parliamentary federal democracy. Vast regional cultural diversity.",
  terrain:{plains:40,hills:25,mountains:35},
  mountains:["Himalayas","Western Ghats","Eastern Ghats","Aravalli","Vindhya"],
  plains:["Indo-Gangetic Plain","Deccan Plateau","Coastal Plains"],
  rivers:["Ganges","Brahmaputra","Indus (tributaries)","Godavari","Krishna","Narmada"],
  lakes:["Chilika","Vembanad","Wular","Dal","Sambhar"],
  exports:["Refined Petroleum","Diamonds","Packaged Medicaments","Rice","Jewelry"],
  imports:["Crude Oil","Gold","Coal","Diamonds","Natural Gas"],
  extraction:[
    {n:"Mumbai High",lat:19.5,lng:71.5,r:"Offshore Oil"},
    {n:"Jharia",lat:23.8,lng:86.4,r:"Coal"},
    {n:"Kolar",lat:12.9,lng:78.3,r:"Gold"},
    {n:"Rajasthan",lat:26.5,lng:71.0,r:"Oil & Gas"},
    {n:"Singhbhum",lat:22.5,lng:86.2,r:"Iron Ore, Copper"}
  ],
  bases:[
    {n:"INS Kadamba (Karwar)",lat:14.81,lng:74.12,t:"Navy",f:false},
    {n:"Mumbai Naval Dockyard",lat:18.92,lng:72.84,t:"Western Naval Command",f:false},
    {n:"Visakhapatnam",lat:17.7,lng:83.3,t:"Eastern Naval Command",f:false},
    {n:"Leh",lat:34.15,lng:77.58,t:"Army (border)",f:false},
    {n:"Andaman & Nicobar",lat:11.7,lng:92.7,t:"Tri-Service Command",f:false}
  ]
},
"76": {
  name:"Brazil",flag:"🇧🇷",capital:"Brasília",population:216422446,area:8515767,
  gdp:2170,gdpPC:10030,
  ethnicities:[{n:"White",p:43},{n:"Pardo (Mixed)",p:47},{n:"Black",p:8},{n:"Asian",p:1},{n:"Indigenous",p:1}],
  culture:"Lusophone Latin American nation; rich Afro-Brazilian, Indigenous, and European cultural synthesis. Samba, carnival, football culture. Federal presidential republic.",
  terrain:{plains:40,hills:35,mountains:25},
  mountains:["Serra do Mar","Serra da Mantiqueira","Chapada Diamantina","Pico da Neblina"],
  plains:["Amazon Basin","Pantanal","Cerrado Plateau","Pampas"],
  rivers:["Amazon","Paraná","São Francisco","Tocantins","Negro"],
  lakes:["Lagoa dos Patos","Lagoa Mirim","Tucuruí Reservoir"],
  exports:["Soybeans","Iron Ore","Crude Oil","Sugar","Poultry","Coffee"],
  imports:["Refined Petroleum","Vehicle Parts","Pesticides","Computers","Telephones"],
  extraction:[
    {n:"Pre-salt (Santos Basin)",lat:-25.0,lng:-43.0,r:"Deepwater Oil"},
    {n:"Carajás",lat:-6.0,lng:-50.3,r:"Iron Ore"},
    {n:"Minas Gerais",lat:-19.9,lng:-43.9,r:"Iron Ore, Gold"},
    {n:"Campos Basin",lat:-22.5,lng:-40.0,r:"Offshore Oil"}
  ],
  bases:[
    {n:"São Paulo Naval",lat:-23.95,lng:-46.3,t:"Navy HQ",f:false},
    {n:"Rio de Janeiro Arsenal",lat:-22.9,lng:-43.17,t:"Navy",f:false},
    {n:"Tabatinga",lat:-4.25,lng:-69.94,t:"Army (Amazon border)",f:false}
  ]
},
"410": {
  name:"South Korea",flag:"🇰🇷",capital:"Seoul",population:51784059,area:100210,
  gdp:1710,gdpPC:33100,
  ethnicities:[{n:"Korean",p:96},{n:"Chinese",p:2},{n:"Other",p:2}],
  culture:"East Asian; Confucian heritage with dynamic modernization. K-pop, technology, and export-driven economy. Constitutional republic, historically divided peninsula.",
  terrain:{plains:30,hills:35,mountains:35},
  mountains:["Taebaek","Sobaek","Hallasan (Jeju)"],
  plains:["Han River Basin","Honam Plain","Nakdong Basin"],
  rivers:["Han","Nakdong","Geum","Yeongsan"],
  lakes:["Chungju Dam","Andong Dam"],
  exports:["Integrated Circuits","Motor Vehicles","Refined Petroleum","Ships","Display Panels"],
  imports:["Crude Oil","Integrated Circuits","Natural Gas","Refined Petroleum","Coal"],
  extraction:[
    {n:"Taebaek",lat:37.2,lng:128.9,r:"Coal (declining)"}
  ],
  bases:[
    {n:"Camp Humphreys (US)",lat:36.96,lng:127.03,t:"US Army",f:true},
    {n:"Osan AB (US)",lat:37.09,lng:127.03,t:"USAF",f:true},
    {n:"Jinhae Naval Base",lat:35.14,lng:128.66,t:"ROK Navy",f:false},
    {n:"Pyeongtaek (US)",lat:36.97,lng:126.9,t:"US 2nd Infantry Division",f:true}
  ]
},
"682": {
  name:"Saudi Arabia",flag:"🇸🇦",capital:"Riyadh",population:36947025,area:2149690,
  gdp:1060,gdpPC:28670,
  ethnicities:[{n:"Arab",p:90},{n:"Afro-Asian",p:10}],
  culture:"Sunni Islamic monarchy; custodian of Islam's two holiest sites (Mecca, Medina). Arabic-speaking; tribal heritage with rapid modernization (Vision 2030).",
  terrain:{plains:35,hills:30,mountains:35},
  mountains:["Hejaz Mountains","Asir Mountains"],
  plains:["Rub' al Khali (Empty Quarter)","Nafud Desert","Central Najd Plateau"],
  rivers:["No perennial rivers"],
  lakes:["No natural freshwater lakes"],
  exports:["Crude Oil","Refined Petroleum","Polymers","Industrial Chemicals"],
  imports:["Motor Vehicles","Broadcasting Equipment","Telephones","Jewelry","Rice"],
  extraction:[
    {n:"Ghawar Field",lat:25.4,lng:49.5,r:"Oil (world's largest)"},
    {n:"Safaniyah",lat:28.0,lng:49.0,r:"Offshore Oil"},
    {n:"Shaybah",lat:22.5,lng:54.0,r:"Oil & Gas"},
    {n:"Mahd adh Dhahab",lat:23.5,lng:40.8,r:"Gold"}
  ],
  bases:[
    {n:"King Abdulaziz Naval Base (Jubail)",lat:27.0,lng:49.66,t:"Navy (Gulf)",f:false},
    {n:"Prince Sultan AB",lat:24.07,lng:47.58,t:"Air Force",f:false},
    {n:"King Faisal Naval Base (Jeddah)",lat:21.42,lng:39.14,t:"Navy (Red Sea)",f:false},
    {n:"Al Kharj",lat:24.07,lng:47.58,t:"RSAF/Joint",f:false}
  ]
},
"792": {
  name:"Turkey",flag:"🇹🇷",capital:"Ankara",population:85816199,area:783562,
  gdp:1110,gdpPC:12930,
  ethnicities:[{n:"Turkish",p:75},{n:"Kurdish",p:18},{n:"Other (Arab, Circassian, Laz)",p:7}],
  culture:"Transcontinental state bridging Europe and Asia. Turkic-Islamic heritage with Kemalist secular tradition. Rich Ottoman legacy; NATO member since 1952.",
  terrain:{plains:20,hills:35,mountains:45},
  mountains:["Taurus","Pontic Alps","Mount Ararat","Kaçkar"],
  plains:["Central Anatolian Plateau","Çukurova Plain","Thracian Plain"],
  rivers:["Euphrates","Tigris","Kızılırmak","Sakarya"],
  lakes:["Van","Tuz","Beyşehir","Burdur"],
  exports:["Motor Vehicles","Gold","Vehicle Parts","Iron/Steel","Textiles"],
  imports:["Gold","Refined Petroleum","Motor Vehicles","Iron/Steel","Crude Oil"],
  extraction:[
    {n:"Batman",lat:37.88,lng:41.13,r:"Oil"},
    {n:"Eti Mine (Eskişehir)",lat:39.77,lng:30.52,r:"Boron (largest reserves)"},
    {n:"Soma",lat:38.92,lng:27.6,r:"Lignite"}
  ],
  bases:[
    {n:"Incirlik AB (US)",lat:37.0,lng:35.43,t:"USAF/NATO",f:true},
    {n:"Aksaz Naval Base",lat:36.96,lng:28.37,t:"Turkish Navy",f:false},
    {n:"Gölcük Naval Base",lat:40.72,lng:29.82,t:"Turkish Navy HQ",f:false},
    {n:"Al-Watiya (LY)",lat:31.96,lng:12.0,t:"Turkish Military",f:false},
    {n:"Mogadishu (SO)",lat:2.04,lng:45.34,t:"Turkish Military",f:false}
  ]
},
"36": {
  name:"Australia",flag:"🇦🇺",capital:"Canberra",population:26439111,area:7692024,
  gdp:1720,gdpPC:65100,
  ethnicities:[{n:"European descent",p:76},{n:"Asian",p:12},{n:"Aboriginal/Torres Strait",p:3.2},{n:"Other",p:8.8}],
  culture:"Anglo-Celtic settler society with growing Asian influence and ancient Indigenous heritage (65,000+ years). Federal parliamentary constitutional monarchy.",
  terrain:{plains:60,hills:25,mountains:15},
  mountains:["Great Dividing Range","Snowy Mountains","MacDonnell Ranges"],
  plains:["Nullarbor Plain","Outback","Murray-Darling Basin"],
  rivers:["Murray","Darling","Murrumbidgee","Cooper Creek"],
  lakes:["Eyre (salt)","Torrens","Gairdner","Argyle"],
  exports:["Iron Ore","Coal","Natural Gas","Gold","Aluminum"],
  imports:["Refined Petroleum","Motor Vehicles","Computers","Telephones","Crude Oil"],
  extraction:[
    {n:"Pilbara",lat:-22.3,lng:118.5,r:"Iron Ore"},
    {n:"Bowen Basin",lat:-22.0,lng:148.0,r:"Coal"},
    {n:"North West Shelf",lat:-19.0,lng:116.0,r:"LNG/Gas"},
    {n:"Kalgoorlie",lat:-30.75,lng:121.47,r:"Gold"},
    {n:"Olympic Dam",lat:-30.45,lng:136.88,r:"Uranium, Copper, Gold"}
  ],
  bases:[
    {n:"HMAS Stirling",lat:-32.33,lng:115.69,t:"RAN (West)",f:false},
    {n:"Pine Gap (US/AU)",lat:-23.8,lng:133.74,t:"Joint Intel/SIGINT",f:true},
    {n:"RAAF Tindal",lat:-14.52,lng:132.38,t:"RAAF/US rotation",f:false},
    {n:"Darwin Naval Base",lat:-12.45,lng:130.84,t:"RAN (North)",f:false}
  ]
},
"818": {
  name:"Egypt",flag:"🇪🇬",capital:"Cairo",population:112716598,area:1002450,
  gdp:395,gdpPC:3500,
  ethnicities:[{n:"Egyptian Arab",p:91},{n:"Nubian",p:3},{n:"Berber/Bedouin",p:3},{n:"Other",p:3}],
  culture:"Ancient civilization (pharaonic, Coptic, Islamic layers). Arabic-speaking; Sunni Muslim majority with significant Coptic Christian minority. Suez Canal strategic importance.",
  terrain:{plains:65,hills:20,mountains:15},
  mountains:["Sinai Peninsula mountains","Eastern Desert ranges","Red Sea Mountains"],
  plains:["Nile Valley & Delta","Western Desert","Qattara Depression"],
  rivers:["Nile"],
  lakes:["Nasser","Qarun","Manzala","Burullus"],
  exports:["Refined Petroleum","Crude Oil","Natural Gas","Fertilizers","Citrus Fruit"],
  imports:["Wheat","Refined Petroleum","Crude Oil","Motor Vehicles","Iron/Steel"],
  extraction:[
    {n:"Western Desert",lat:28.5,lng:28.0,r:"Oil"},
    {n:"Gulf of Suez",lat:28.5,lng:33.0,r:"Offshore Oil"},
    {n:"Zohr Gas Field",lat:31.8,lng:31.5,r:"Natural Gas (offshore)"}
  ],
  bases:[
    {n:"Alexandria Naval Base",lat:31.2,lng:29.9,t:"Navy Mediterranean",f:false},
    {n:"Cairo West AB",lat:30.1,lng:30.9,t:"Air Force",f:false},
    {n:"Berenice (joint)",lat:23.95,lng:35.47,t:"Navy/Joint with allies",f:false}
  ]
},
"566": {
  name:"Nigeria",flag:"🇳🇬",capital:"Abuja",population:223804632,area:923768,
  gdp:475,gdpPC:2120,
  ethnicities:[{n:"Hausa",p:30},{n:"Yoruba",p:15.5},{n:"Igbo",p:15.2},{n:"Fulani",p:6},{n:"Other (250+ groups)",p:33.3}],
  culture:"Most populous African nation; extreme ethnic and linguistic diversity (500+ languages). Federal republic; divided roughly between Muslim north and Christian south.",
  terrain:{plains:50,hills:30,mountains:20},
  mountains:["Jos Plateau","Adamawa Highlands","Obudu Plateau"],
  plains:["Niger Delta","Chad Basin","Sokoto Plains","Benue Valley"],
  rivers:["Niger","Benue","Cross River","Sokoto"],
  lakes:["Chad (border)","Kainji Reservoir"],
  exports:["Crude Oil","Natural Gas","Cocoa","Ships","Rubber"],
  imports:["Refined Petroleum","Wheat","Motor Vehicles","Sugar","Plastics"],
  extraction:[
    {n:"Niger Delta",lat:5.0,lng:6.5,r:"Oil & Gas"},
    {n:"Bonga Deep Water",lat:4.0,lng:4.5,r:"Offshore Oil"},
    {n:"Jos Plateau",lat:9.9,lng:8.9,r:"Tin, Columbite"}
  ],
  bases:[
    {n:"Apapa Naval Base (Lagos)",lat:6.44,lng:3.37,t:"Navy Western",f:false},
    {n:"Calabar Naval Base",lat:4.95,lng:8.33,t:"Navy Eastern",f:false}
  ]
},
"710": {
  name:"South Africa",flag:"🇿🇦",capital:"Pretoria / Cape Town / Bloemfontein",population:60414495,area:1219090,
  gdp:399,gdpPC:6600,
  ethnicities:[{n:"Black African",p:81},{n:"Coloured",p:8.9},{n:"White",p:7.8},{n:"Indian/Asian",p:2.3}],
  culture:"'Rainbow Nation'; 11 official languages. Post-apartheid multiethnic democracy. Zulu, Xhosa, Afrikaner, and English cultural streams. Most industrialized economy in Africa.",
  terrain:{plains:35,hills:40,mountains:25},
  mountains:["Drakensberg","Cape Fold Belt","Magaliesberg"],
  plains:["Highveld","Bushveld","Karoo","Lowveld"],
  rivers:["Orange","Vaal","Limpopo","Tugela"],
  lakes:["Gariep Dam","Vaal Dam"],
  exports:["Gold","Platinum","Iron Ore","Motor Vehicles","Coal","Diamonds"],
  imports:["Crude Oil","Refined Petroleum","Motor Vehicles","Computers","Telephones"],
  extraction:[
    {n:"Witwatersrand",lat:-26.2,lng:27.9,r:"Gold"},
    {n:"Bushveld Complex",lat:-24.5,lng:29.0,r:"Platinum Group Metals"},
    {n:"Sishen",lat:-27.7,lng:23.0,r:"Iron Ore"},
    {n:"Kimberley",lat:-28.73,lng:24.77,r:"Diamonds"},
    {n:"Mpumalanga",lat:-26.0,lng:29.5,r:"Coal"}
  ],
  bases:[
    {n:"Simon's Town Naval Base",lat:-34.19,lng:18.44,t:"SA Navy HQ",f:false},
    {n:"AFB Waterkloof",lat:-25.81,lng:28.22,t:"SA Air Force",f:false}
  ]
},
"376": {
  name:"Israel",flag:"🇮🇱",capital:"Jerusalem (disputed) / Tel Aviv (de facto)",population:9174520,area:22072,
  gdp:525,gdpPC:57200,
  ethnicities:[{n:"Jewish",p:73.5},{n:"Arab",p:21},{n:"Other",p:5.5}],
  culture:"Jewish state in the Levant; Hebrew-speaking. Diverse immigrant society (Ashkenazi, Mizrahi, Ethiopian, Russian). Parliamentary democracy. High-tech and defense industry leader.",
  terrain:{plains:30,hills:35,mountains:35},
  mountains:["Golan Heights","Galilee hills","Judean Hills","Mount Meron"],
  plains:["Coastal Plain","Jezreel Valley","Negev Desert","Jordan Rift"],
  rivers:["Jordan","Yarkon","Kishon"],
  lakes:["Sea of Galilee (Kinneret)","Dead Sea"],
  exports:["Integrated Circuits","Diamonds","Refined Petroleum","Packaged Medicaments","Medical Instruments"],
  imports:["Crude Oil","Diamonds","Motor Vehicles","Computers","Refined Petroleum"],
  extraction:[
    {n:"Leviathan Gas Field",lat:32.6,lng:34.1,r:"Natural Gas (offshore)"},
    {n:"Tamar Gas Field",lat:32.0,lng:34.0,r:"Natural Gas (offshore)"},
    {n:"Negev Phosphates",lat:31.0,lng:34.8,r:"Phosphate"}
  ],
  bases:[
    {n:"Haifa Naval Base",lat:32.82,lng:34.99,t:"Israeli Navy",f:false},
    {n:"Palmachim AB",lat:31.9,lng:34.69,t:"IAF / Missile Test",f:false},
    {n:"Nevatim AB",lat:31.21,lng:34.82,t:"IAF (F-35 base)",f:false},
    {n:"Ramon AB (US radar nearby)",lat:30.77,lng:34.67,t:"IAF",f:false}
  ]
},
"364": {
  name:"Iran",flag:"🇮🇷",capital:"Tehran",population:88550922,area:1648195,
  gdp:401,gdpPC:4530,
  ethnicities:[{n:"Persian",p:61},{n:"Azeri",p:16},{n:"Kurd",p:10},{n:"Lur",p:6},{n:"Arab",p:2},{n:"Other",p:5}],
  culture:"Ancient Persian civilization (Cyrus, Darius). Shia Islam as state religion; theocratic republic. Rich literary tradition (Hafez, Rumi, Ferdowsi). Persian (Farsi) language.",
  terrain:{plains:20,hills:30,mountains:50},
  mountains:["Zagros","Alborz","Mount Damavand"],
  plains:["Kavir Desert","Lut Desert","Khuzestan Plain"],
  rivers:["Karun","Zayandeh","Atrek"],
  lakes:["Urmia (shrinking)","Namak"],
  exports:["Crude Oil","Refined Petroleum","Polymers","Iron/Steel","Petrochemicals"],
  imports:["Motor Vehicles","Cereals","Machinery","Iron/Steel","Rice"],
  extraction:[
    {n:"Ahvaz",lat:31.3,lng:48.7,r:"Oil"},
    {n:"South Pars",lat:27.0,lng:52.0,r:"Natural Gas (shared with QA)"},
    {n:"Gol-e-Gohar",lat:29.2,lng:55.3,r:"Iron Ore"},
    {n:"Sar Cheshmeh",lat:29.9,lng:55.9,r:"Copper"}
  ],
  bases:[
    {n:"Bandar Abbas Naval Base",lat:27.19,lng:56.28,t:"Navy (Strait of Hormuz)",f:false},
    {n:"Bushehr",lat:28.97,lng:50.84,t:"Navy / Nuclear Plant",f:false},
    {n:"Isfahan (nuclear related)",lat:32.65,lng:51.68,t:"Nuclear/Air",f:false},
    {n:"Chabahar",lat:25.29,lng:60.64,t:"Navy (Indian Ocean)",f:false}
  ]
},
"586": {
  name:"Pakistan",flag:"🇵🇰",capital:"Islamabad",population:240485658,area:881913,
  gdp:340,gdpPC:1410,
  ethnicities:[{n:"Punjabi",p:44},{n:"Pashtun",p:15},{n:"Sindhi",p:14},{n:"Saraiki",p:8},{n:"Muhajir",p:7},{n:"Baloch",p:4},{n:"Other",p:8}],
  culture:"Islamic republic; Urdu as national language. Indo-Islamic civilization with diverse ethnic groups. Nuclear-armed state; geopolitically positioned between South Asia, Central Asia, and Middle East.",
  terrain:{plains:35,hills:25,mountains:40},
  mountains:["Karakoram","Hindu Kush","Himalayas (western)","Sulaiman Range","K2"],
  plains:["Indus Plain","Thar Desert","Balochistan Plateau"],
  rivers:["Indus","Chenab","Jhelum","Ravi","Sutlej"],
  lakes:["Manchar","Keenjhar","Saiful Muluk"],
  exports:["Textiles","Rice","Leather","Cotton","Surgical Instruments"],
  imports:["Crude Oil","Refined Petroleum","Natural Gas","Palm Oil","Iron/Steel"],
  extraction:[
    {n:"Sui",lat:28.6,lng:68.8,r:"Natural Gas"},
    {n:"Saindak",lat:29.3,lng:61.6,r:"Copper, Gold"},
    {n:"Thar Coal",lat:24.8,lng:70.2,r:"Coal"}
  ],
  bases:[
    {n:"PNS Jinnah (Karachi)",lat:24.85,lng:66.98,t:"Pakistan Navy",f:false},
    {n:"Kamra (PAC)",lat:33.87,lng:72.4,t:"Air Force / Aerospace",f:false},
    {n:"Gwadar (Chinese-funded port)",lat:25.12,lng:62.33,t:"Navy (strategic)",f:true}
  ]
},
"834": {
  name:"Tanzania",flag:"🇹🇿",capital:"Dodoma / Dar es Salaam",population:65497748,area:945087,
  gdp:79,gdpPC:1200,
  ethnicities:[{n:"Bantu (120+ groups)",p:95},{n:"Other (Asian, Arab, European)",p:5}],
  culture:"East African Swahili-speaking nation; over 120 ethnic groups living in relative harmony. Nyerere's ujamaa socialist legacy. Muslim coastal regions; Christian and indigenous beliefs inland.",
  terrain:{plains:40,hills:35,mountains:25},
  mountains:["Kilimanjaro","Meru","Usambara","Uluguru","Southern Highlands"],
  plains:["Serengeti","Masai Steppe","Coastal Plains"],
  rivers:["Rufiji","Pangani","Ruvuma","Kagera"],
  lakes:["Victoria (border)","Tanganyika (border)","Nyasa/Malawi (border)","Natron"],
  exports:["Gold","Tobacco","Cashew Nuts","Coffee","Precious Stones"],
  imports:["Refined Petroleum","Wheat","Motor Vehicles","Palm Oil","Packaged Medicaments"],
  extraction:[
    {n:"Geita Gold Mine",lat:-2.8,lng:32.2,r:"Gold"},
    {n:"Buzwagi",lat:-3.5,lng:32.3,r:"Gold"},
    {n:"Mtwara",lat:-10.3,lng:40.2,r:"Natural Gas"},
    {n:"Tanzanite One (Mererani)",lat:-3.5,lng:36.9,r:"Tanzanite (unique)"}
  ],
  bases:[
    {n:"Dar es Salaam Naval",lat:-6.8,lng:39.28,t:"TZ Navy",f:false}
  ]
},
"804": {
  name:"Ukraine",flag:"🇺🇦",capital:"Kyiv",population:36744634,area:603500,
  gdp:179,gdpPC:4870,
  ethnicities:[{n:"Ukrainian",p:77.8},{n:"Russian",p:17.3},{n:"Other",p:4.9}],
  culture:"East Slavic nation; Ukrainian language. Rich Cossack heritage; major European breadbasket. Orthodox Christian tradition. Ongoing conflict with Russia since 2014/2022.",
  terrain:{plains:65,hills:25,mountains:10},
  mountains:["Carpathians","Crimean Mountains"],
  plains:["Pontic Steppe","Polesia Lowlands","Dnieper Lowland"],
  rivers:["Dnieper","Dniester","Southern Bug","Donets"],
  lakes:["Svityaz","Kakhovka Reservoir"],
  exports:["Corn","Sunflower Oil","Iron Ore","Wheat","Iron/Steel"],
  imports:["Refined Petroleum","Natural Gas","Motor Vehicles","Coal","Packaged Medicaments"],
  extraction:[
    {n:"Kryvyi Rih",lat:47.9,lng:33.4,r:"Iron Ore"},
    {n:"Donbas",lat:48.0,lng:38.0,r:"Coal"},
    {n:"Shebelinka",lat:49.4,lng:36.8,r:"Natural Gas"}
  ],
  bases:[
    {n:"Odesa Naval Base",lat:46.49,lng:30.74,t:"Ukrainian Navy",f:false},
    {n:"Starokostiantyniv AB",lat:49.75,lng:27.2,t:"Ukrainian Air Force",f:false}
  ]
},
"616": {
  name:"Poland",flag:"🇵🇱",capital:"Warsaw",population:37950802,area:312696,
  gdp:842,gdpPC:22180,
  ethnicities:[{n:"Polish",p:96.9},{n:"Silesian",p:1.1},{n:"Other",p:2}],
  culture:"Central European Slavic nation; Roman Catholic tradition deeply intertwined with national identity. Chopin, Copernicus. Major NATO frontline state. Rapidly growing economy.",
  terrain:{plains:55,hills:30,mountains:15},
  mountains:["Tatra Mountains","Sudetes","Bieszczady"],
  plains:["North European Plain","Masuria Lake District","Silesian Lowland"],
  rivers:["Vistula","Oder","Warta","Bug"],
  lakes:["Śniardwy","Mamry","Łebsko"],
  exports:["Motor Vehicles","Vehicle Parts","Furniture","Computers","Processed Foods"],
  imports:["Crude Oil","Motor Vehicles","Packaged Medicaments","Natural Gas","Vehicle Parts"],
  extraction:[
    {n:"Silesia",lat:50.3,lng:19.0,r:"Coal"},
    {n:"Bełchatów",lat:51.26,lng:19.36,r:"Lignite"},
    {n:"KGHM Lubin",lat:51.4,lng:16.2,r:"Copper, Silver"}
  ],
  bases:[
    {n:"Redzikowo (US Aegis)",lat:54.48,lng:17.1,t:"US Missile Defense",f:true},
    {n:"Poznań (US)",lat:52.41,lng:16.93,t:"US Army",f:true},
    {n:"Gdynia Naval Base",lat:54.53,lng:18.55,t:"Polish Navy",f:false}
  ]
},
"484": {
  name:"Mexico",flag:"🇲🇽",capital:"Mexico City",population:128455567,area:1964375,
  gdp:1790,gdpPC:13930,
  ethnicities:[{n:"Mestizo",p:62},{n:"Indigenous",p:21},{n:"European descent",p:10},{n:"Afro-Mexican",p:2},{n:"Other",p:5}],
  culture:"Latin American nation with rich pre-Columbian heritage (Aztec, Maya). Spanish-speaking; vibrant traditions in art (muralism), cuisine, and festivals (Día de los Muertos).",
  terrain:{plains:30,hills:35,mountains:35},
  mountains:["Sierra Madre Occidental","Sierra Madre Oriental","Trans-Mexican Volcanic Belt"],
  plains:["Yucatán Peninsula","Central Plateau","Coastal Plains"],
  rivers:["Río Grande/Bravo","Grijalva","Usumacinta","Lerma"],
  lakes:["Chapala","Cuitzeo","Pátzcuaro"],
  exports:["Motor Vehicles","Computers","Vehicle Parts","Crude Oil","Electrical Equipment"],
  imports:["Refined Petroleum","Vehicle Parts","Integrated Circuits","Motor Vehicles","Computers"],
  extraction:[
    {n:"Cantarell (declining)",lat:20.0,lng:-92.0,r:"Offshore Oil"},
    {n:"Ku-Maloob-Zaap",lat:19.5,lng:-92.5,r:"Offshore Oil"},
    {n:"Cananea",lat:30.95,lng:-110.3,r:"Copper"},
    {n:"Fresnillo",lat:23.18,lng:-102.87,r:"Silver (world leader)"}
  ],
  bases:[
    {n:"SEMAR HQ (Mexico City)",lat:19.43,lng:-99.13,t:"Mexican Navy",f:false},
    {n:"Puerto Vallarta Naval",lat:20.65,lng:-105.25,t:"Pacific Naval",f:false}
  ]
},
"124": {
  name:"Canada",flag:"🇨🇦",capital:"Ottawa",population:40097761,area:9984670,
  gdp:2240,gdpPC:55850,
  ethnicities:[{n:"European descent",p:72},{n:"South Asian",p:6},{n:"Chinese",p:5},{n:"Indigenous",p:5},{n:"Black",p:4},{n:"Other",p:8}],
  culture:"Bilingual (English/French) federal parliamentary democracy. Multicultural immigration-driven society. G7 member; vast natural resources; close alliance with US (NORAD, Five Eyes).",
  terrain:{plains:50,hills:25,mountains:25},
  mountains:["Rocky Mountains","Laurentians","Coast Mountains","Torngat"],
  plains:["Canadian Prairies","Hudson Bay Lowlands","St. Lawrence Lowlands"],
  rivers:["Mackenzie","St. Lawrence","Fraser","Nelson","Churchill"],
  lakes:["Great Bear","Great Slave","Winnipeg","Athabasca"],
  exports:["Crude Oil","Motor Vehicles","Gold","Natural Gas","Wood Products"],
  imports:["Motor Vehicles","Vehicle Parts","Computers","Crude Oil","Telephones"],
  extraction:[
    {n:"Alberta Oil Sands",lat:56.7,lng:-111.4,r:"Bitumen/Oil"},
    {n:"Sudbury",lat:46.49,lng:-81.0,r:"Nickel, Copper"},
    {n:"Potash Belt (SK)",lat:52.0,lng:-106.0,r:"Potash"},
    {n:"Voisey's Bay",lat:56.3,lng:-62.1,r:"Nickel, Cobalt"}
  ],
  bases:[
    {n:"CFB Esquimalt",lat:48.43,lng:-123.41,t:"RCN Pacific",f:false},
    {n:"CFB Halifax",lat:44.65,lng:-63.57,t:"RCN Atlantic",f:false},
    {n:"CFS Alert",lat:82.5,lng:-62.35,t:"Signals Intelligence",f:false},
    {n:"CFB Cold Lake",lat:54.4,lng:-110.28,t:"RCAF / NORAD",f:false}
  ]
},
"360": {
  name:"Indonesia",flag:"🇮🇩",capital:"Jakarta (moving to Nusantara)",population:277534122,area:1904569,
  gdp:1420,gdpPC:5110,
  ethnicities:[{n:"Javanese",p:40},{n:"Sundanese",p:15},{n:"Malay",p:3.7},{n:"Batak",p:3.6},{n:"Other (300+ groups)",p:37.7}],
  culture:"World's largest archipelago (17,000+ islands) and largest Muslim-majority nation. Extremely diverse: 700+ languages. Pancasila state philosophy; Bahasa Indonesia as unifying language.",
  terrain:{plains:35,hills:30,mountains:35},
  mountains:["Barisan (Sumatra)","Jayawijaya (Papua)","Volcanoes of Java"],
  plains:["Sumatran lowlands","Kalimantan swamps","Java coastal plains"],
  rivers:["Kapuas","Mahakam","Barito","Solo"],
  lakes:["Toba","Sentani","Maninjau"],
  exports:["Palm Oil","Coal","Natural Gas","Rubber","Nickel"],
  imports:["Refined Petroleum","Crude Oil","Telephones","Wheat","Iron/Steel"],
  extraction:[
    {n:"Grasberg",lat:-4.05,lng:137.12,r:"Gold, Copper (largest)"},
    {n:"Kalimantan Coal",lat:-1.5,lng:116.0,r:"Coal"},
    {n:"Morowali (Sulawesi)",lat:-2.9,lng:121.7,r:"Nickel"},
    {n:"Natuna Sea",lat:3.7,lng:108.0,r:"Natural Gas"}
  ],
  bases:[
    {n:"Surabaya Naval Base",lat:-7.25,lng:112.75,t:"Eastern Fleet",f:false},
    {n:"Jakarta Naval Base",lat:-6.1,lng:106.85,t:"Western Fleet",f:false},
    {n:"Natuna Islands",lat:3.9,lng:108.4,t:"Military (SCS border)",f:false}
  ]
},
"764": {
  name:"Thailand",flag:"🇹🇭",capital:"Bangkok",population:71801279,area:513120,
  gdp:515,gdpPC:7170,
  ethnicities:[{n:"Thai",p:75},{n:"Thai Chinese",p:14},{n:"Malay",p:3},{n:"Khmer",p:2},{n:"Other",p:6}],
  culture:"Theravada Buddhist kingdom; only Southeast Asian country never colonized by European powers. Thai language; constitutional monarchy with strong royal institution.",
  terrain:{plains:40,hills:30,mountains:30},
  mountains:["Northern Highlands","Doi Inthanon","Western Mountains"],
  plains:["Central Plain (Chao Phraya)","Khorat Plateau (Isan)","Southern Peninsula"],
  rivers:["Chao Phraya","Mekong (border)","Ping","Nan"],
  lakes:["Songkhla","Bhumibol Dam"],
  exports:["Computers","Motor Vehicles","Integrated Circuits","Rubber","Refined Petroleum"],
  imports:["Crude Oil","Integrated Circuits","Computers","Gold","Iron/Steel"],
  extraction:[
    {n:"Gulf of Thailand",lat:9.5,lng:101.0,r:"Natural Gas"},
    {n:"Akara",lat:16.5,lng:101.5,r:"Gold"},
    {n:"Mae Moh",lat:18.3,lng:99.7,r:"Lignite"}
  ],
  bases:[
    {n:"Sattahip Naval Base",lat:12.68,lng:100.88,t:"Royal Thai Navy",f:false},
    {n:"Utapao (joint US use)",lat:12.68,lng:101.0,t:"RTAF / US rotational",f:true}
  ]
},
"704": {
  name:"Vietnam",flag:"🇻🇳",capital:"Hanoi",population:99462000,area:331212,
  gdp:430,gdpPC:4320,
  ethnicities:[{n:"Kinh (Viet)",p:85.7},{n:"Tay",p:1.9},{n:"Thai",p:1.8},{n:"Muong",p:1.5},{n:"Other (50+ groups)",p:9.1}],
  culture:"East Asian socialist republic with Confucian, Buddhist, and French colonial influences. Vietnamese language. Rapid economic growth; manufacturing hub. Long coastline along South China Sea.",
  terrain:{plains:25,hills:35,mountains:40},
  mountains:["Hoàng Liên Son (Fansipan)","Annamite Range","Central Highlands"],
  plains:["Red River Delta","Mekong Delta","Coastal Plains"],
  rivers:["Mekong","Red River","Mã","Đồng Nai"],
  lakes:["Ba Bể","Hoàn Kiếm","Trị An Reservoir"],
  exports:["Broadcasting Equipment","Telephones","Integrated Circuits","Textiles","Footwear"],
  imports:["Integrated Circuits","Refined Petroleum","Telephones","Iron/Steel","Fabrics"],
  extraction:[
    {n:"Bạch Hổ (White Tiger)",lat:10.0,lng:108.5,r:"Offshore Oil"},
    {n:"Quảng Ninh",lat:21.0,lng:107.0,r:"Coal"},
    {n:"Lâm Đồng",lat:11.9,lng:108.4,r:"Bauxite"}
  ],
  bases:[
    {n:"Cam Ranh Bay",lat:11.95,lng:109.22,t:"Navy (strategic)",f:false}
  ]
},
"608": {
  name:"Philippines",flag:"🇵🇭",capital:"Manila",population:117337368,area:342353,
  gdp:435,gdpPC:3710,
  ethnicities:[{n:"Tagalog",p:24},{n:"Bisaya/Cebuano",p:24},{n:"Ilocano",p:9},{n:"Hiligaynon",p:8},{n:"Other",p:35}],
  culture:"Malay-Austronesian archipelagic nation with deep Spanish and American colonial influence. Only majority-Catholic country in Asia. Filipino/Tagalog and English languages.",
  terrain:{plains:30,hills:35,mountains:35},
  mountains:["Sierra Madre","Cordillera Central","Mount Apo"],
  plains:["Central Luzon Plain","Cagayan Valley","Visayan lowlands"],
  rivers:["Cagayan","Pampanga","Agno","Mindanao"],
  lakes:["Laguna de Bay","Lanao","Taal"],
  exports:["Integrated Circuits","Office Machine Parts","Insulated Wire","Coconut Oil","Bananas"],
  imports:["Integrated Circuits","Refined Petroleum","Motor Vehicles","Coal","Cereals"],
  extraction:[
    {n:"Tampakan",lat:6.4,lng:125.0,r:"Copper, Gold"},
    {n:"Palawan",lat:9.5,lng:118.5,r:"Natural Gas (Malampaya)"}
  ],
  bases:[
    {n:"Subic Bay",lat:14.79,lng:120.28,t:"Phil Navy / US rotational",f:true},
    {n:"Fort Magsaysay",lat:15.52,lng:121.06,t:"Phil Army",f:false}
  ]
},
"400": {
  name:"Jordan",flag:"🇯🇴",capital:"Amman",population:11337052,area:89342,
  gdp:50,gdpPC:4410,
  ethnicities:[{n:"Arab",p:95},{n:"Circassian",p:2},{n:"Armenian",p:1},{n:"Other",p:2}],
  culture:"Hashemite Kingdom; moderate Arab Muslim state bridging Levant and Gulf. Large Palestinian-origin population. Strategic buffer between Israel, Iraq, Syria, and Saudi Arabia.",
  terrain:{plains:30,hills:40,mountains:30},
  mountains:["Jordanian Highlands","Sharah Mountains"],
  plains:["Jordan Rift Valley","Eastern Desert (Badia)"],
  rivers:["Jordan","Zarqa","Yarmouk"],
  lakes:["Dead Sea (border)"],
  exports:["Phosphates","Potash","Textiles","Fertilizers","Vegetables"],
  imports:["Crude Oil","Motor Vehicles","Natural Gas","Refined Petroleum","Telephones"],
  extraction:[
    {n:"Al Hasa",lat:30.8,lng:36.0,r:"Phosphate"},
    {n:"Dead Sea",lat:31.5,lng:35.5,r:"Potash, Bromine"}
  ],
  bases:[
    {n:"Muwaffaq Salti AB",lat:32.36,lng:36.79,t:"RJAF / US ops",f:true}
  ]
}
};

// Add basic entries for remaining major countries
const BASIC_COUNTRIES = {
"32":{name:"Argentina",flag:"🇦🇷",capital:"Buenos Aires",population:45810000,area:2780400,gdp:631,gdpPC:13770},
"40":{name:"Austria",flag:"🇦🇹",capital:"Vienna",population:9104000,area:83871,gdp:516,gdpPC:56650},
"56":{name:"Belgium",flag:"🇧🇪",capital:"Brussels",population:11686000,area:30528,gdp:624,gdpPC:53400},
"100":{name:"Bulgaria",flag:"🇧🇬",capital:"Sofia",population:6520000,area:110879,gdp:103,gdpPC:15810},
"116":{name:"Cambodia",flag:"🇰🇭",capital:"Phnom Penh",population:17168000,area:181035,gdp:32,gdpPC:1860},
"152":{name:"Chile",flag:"🇨🇱",capital:"Santiago",population:19493000,area:756102,gdp:335,gdpPC:17180},
"170":{name:"Colombia",flag:"🇨🇴",capital:"Bogotá",population:52085000,area:1141748,gdp:363,gdpPC:6970},
"178":{name:"Congo",flag:"🇨🇬",capital:"Brazzaville",population:6106000,area:342000,gdp:14,gdpPC:2310},
"180":{name:"DR Congo",flag:"🇨🇩",capital:"Kinshasa",population:102262000,area:2344858,gdp:66,gdpPC:645},
"192":{name:"Cuba",flag:"🇨🇺",capital:"Havana",population:11212000,area:109884,gdp:107,gdpPC:9540},
"196":{name:"Cyprus",flag:"🇨🇾",capital:"Nicosia",population:1251000,area:9251,gdp:31,gdpPC:24870},
"203":{name:"Czechia",flag:"🇨🇿",capital:"Prague",population:10827000,area:78867,gdp:330,gdpPC:30470},
"208":{name:"Denmark",flag:"🇩🇰",capital:"Copenhagen",population:5946000,area:43094,gdp:405,gdpPC:68090},
"218":{name:"Ecuador",flag:"🇪🇨",capital:"Quito",population:18001000,area:283561,gdp:118,gdpPC:6560},
"231":{name:"Ethiopia",flag:"🇪🇹",capital:"Addis Ababa",population:126527000,area:1104300,gdp:156,gdpPC:1230},
"233":{name:"Estonia",flag:"🇪🇪",capital:"Tallinn",population:1366000,area:45228,gdp:41,gdpPC:30020},
"246":{name:"Finland",flag:"🇫🇮",capital:"Helsinki",population:5541000,area:338424,gdp:300,gdpPC:54160},
"268":{name:"Georgia",flag:"🇬🇪",capital:"Tbilisi",population:3729000,area:69700,gdp:28,gdpPC:7510},
"288":{name:"Ghana",flag:"🇬🇭",capital:"Accra",population:33476000,area:238533,gdp:77,gdpPC:2300},
"300":{name:"Greece",flag:"🇬🇷",capital:"Athens",population:10341000,area:131957,gdp:239,gdpPC:23130},
"340":{name:"Honduras",flag:"🇭🇳",capital:"Tegucigalpa",population:10433000,area:112492,gdp:32,gdpPC:3070},
"348":{name:"Hungary",flag:"🇭🇺",capital:"Budapest",population:10156000,area:93028,gdp:212,gdpPC:20880},
"352":{name:"Iceland",flag:"🇮🇸",capital:"Reykjavik",population:388000,area:103000,gdp:31,gdpPC:79900},
"368":{name:"Iraq",flag:"🇮🇶",capital:"Baghdad",population:44496000,area:438317,gdp:264,gdpPC:5930},
"372":{name:"Ireland",flag:"🇮🇪",capital:"Dublin",population:5149000,area:70273,gdp:533,gdpPC:103500},
"398":{name:"Kazakhstan",flag:"🇰🇿",capital:"Astana",population:19621000,area:2724900,gdp:260,gdpPC:13250},
"404":{name:"Kenya",flag:"🇰🇪",capital:"Nairobi",population:55100000,area:580367,gdp:113,gdpPC:2050},
"414":{name:"Kuwait",flag:"🇰🇼",capital:"Kuwait City",population:4310000,area:17818,gdp:164,gdpPC:38060},
"422":{name:"Lebanon",flag:"🇱🇧",capital:"Beirut",population:5490000,area:10452,gdp:19,gdpPC:3460},
"434":{name:"Libya",flag:"🇱🇾",capital:"Tripoli",population:6812000,area:1759540,gdp:45,gdpPC:6600},
"440":{name:"Lithuania",flag:"🇱🇹",capital:"Vilnius",population:2832000,area:65300,gdp:78,gdpPC:27550},
"458":{name:"Malaysia",flag:"🇲🇾",capital:"Kuala Lumpur",population:33938000,area:330803,gdp:407,gdpPC:11990},
"496":{name:"Mongolia",flag:"🇲🇳",capital:"Ulaanbaatar",population:3398000,area:1564116,gdp:20,gdpPC:5880},
"504":{name:"Morocco",flag:"🇲🇦",capital:"Rabat",population:37458000,area:446550,gdp:141,gdpPC:3770},
"508":{name:"Mozambique",flag:"🇲🇿",capital:"Maputo",population:33897000,area:801590,gdp:20,gdpPC:590},
"516":{name:"Namibia",flag:"🇳🇦",capital:"Windhoek",population:2604000,area:824292,gdp:13,gdpPC:5000},
"524":{name:"Nepal",flag:"🇳🇵",capital:"Kathmandu",population:30896000,area:147181,gdp:40,gdpPC:1290},
"528":{name:"Netherlands",flag:"🇳🇱",capital:"Amsterdam / The Hague",population:17618000,area:41543,gdp:1090,gdpPC:61870},
"554":{name:"New Zealand",flag:"🇳🇿",capital:"Wellington",population:5185000,area:268021,gdp:252,gdpPC:48620},
"578":{name:"Norway",flag:"🇳🇴",capital:"Oslo",population:5474000,area:323802,gdp:554,gdpPC:101260},
"512":{name:"Oman",flag:"🇴🇲",capital:"Muscat",population:4644000,area:309500,gdp:105,gdpPC:22610},
"604":{name:"Peru",flag:"🇵🇪",capital:"Lima",population:34050000,area:1285216,gdp:268,gdpPC:7870},
"620":{name:"Portugal",flag:"🇵🇹",capital:"Lisbon",population:10379000,area:92212,gdp:287,gdpPC:27650},
"634":{name:"Qatar",flag:"🇶🇦",capital:"Doha",population:2930000,area:11586,gdp:235,gdpPC:80230},
"642":{name:"Romania",flag:"🇷🇴",capital:"Bucharest",population:19659000,area:238391,gdp:351,gdpPC:17850},
"688":{name:"Serbia",flag:"🇷🇸",capital:"Belgrade",population:7114000,area:77474,gdp:75,gdpPC:10550},
"702":{name:"Singapore",flag:"🇸🇬",capital:"Singapore",population:5917000,area:733,gdp:497,gdpPC:84010},
"703":{name:"Slovakia",flag:"🇸🇰",capital:"Bratislava",population:5643000,area:49035,gdp:133,gdpPC:23570},
"724":{name:"Spain",flag:"🇪🇸",capital:"Madrid",population:47615000,area:505992,gdp:1580,gdpPC:33190},
"752":{name:"Sweden",flag:"🇸🇪",capital:"Stockholm",population:10522000,area:450295,gdp:593,gdpPC:56370},
"756":{name:"Switzerland",flag:"🇨🇭",capital:"Bern",population:8815000,area:41285,gdp:906,gdpPC:102800},
"760":{name:"Syria",flag:"🇸🇾",capital:"Damascus",population:22125000,area:185180,gdp:11,gdpPC:500},
"784":{name:"UAE",flag:"🇦🇪",capital:"Abu Dhabi",population:9441000,area:83600,gdp:509,gdpPC:53900},
"858":{name:"Uruguay",flag:"🇺🇾",capital:"Montevideo",population:3423000,area:176215,gdp:77,gdpPC:22490},
"860":{name:"Uzbekistan",flag:"🇺🇿",capital:"Tashkent",population:35648000,area:447400,gdp:90,gdpPC:2530},
"862":{name:"Venezuela",flag:"🇻🇪",capital:"Caracas",population:28302000,area:916445,gdp:100,gdpPC:3530},
"408":{name:"North Korea",flag:"🇰🇵",capital:"Pyongyang",population:26069000,area:120538,gdp:18,gdpPC:690},
"50":{name:"Bangladesh",flag:"🇧🇩",capital:"Dhaka",population:172954000,area:147570,gdp:460,gdpPC:2660},
"104":{name:"Myanmar",flag:"🇲🇲",capital:"Naypyidaw",population:54179000,area:676578,gdp:65,gdpPC:1200},
"418":{name:"Laos",flag:"🇱🇦",capital:"Vientiane",population:7529000,area:236800,gdp:21,gdpPC:2790},
"728":{name:"South Sudan",flag:"🇸🇸",capital:"Juba",population:11088000,area:644329,gdp:5,gdpPC:450},
"729":{name:"Sudan",flag:"🇸🇩",capital:"Khartoum",population:47958000,area:1861484,gdp:26,gdpPC:540},
"887":{name:"Yemen",flag:"🇾🇪",capital:"Sana'a / Aden",population:33697000,area:527968,gdp:21,gdpPC:625},
"706":{name:"Somalia",flag:"🇸🇴",capital:"Mogadishu",population:18143000,area:637657,gdp:8,gdpPC:440},
"894":{name:"Zambia",flag:"🇿🇲",capital:"Lusaka",population:20569000,area:752618,gdp:29,gdpPC:1410},
"716":{name:"Zimbabwe",flag:"🇿🇼",capital:"Harare",population:16665000,area:390757,gdp:28,gdpPC:1680},
"120":{name:"Cameroon",flag:"🇨🇲",capital:"Yaoundé",population:28647000,area:475442,gdp:45,gdpPC:1570},
"12":{name:"Algeria",flag:"🇩🇿",capital:"Algiers",population:44903000,area:2381741,gdp:240,gdpPC:5340},
"788":{name:"Tunisia",flag:"🇹🇳",capital:"Tunis",population:12458000,area:163610,gdp:47,gdpPC:3770},
"498":{name:"Moldova",flag:"🇲🇩",capital:"Chișinău",population:2615000,area:33846,gdp:16,gdpPC:6120},
"8":{name:"Albania",flag:"🇦🇱",capital:"Tirana",population:2854000,area:28748,gdp:23,gdpPC:8060},
"70":{name:"Bosnia & Herzegovina",flag:"🇧🇦",capital:"Sarajevo",population:3271000,area:51197,gdp:25,gdpPC:7640},
"191":{name:"Croatia",flag:"🇭🇷",capital:"Zagreb",population:3855000,area:56594,gdp:82,gdpPC:21250},
"705":{name:"Slovenia",flag:"🇸🇮",capital:"Ljubljana",population:2119000,area:20273,gdp:68,gdpPC:32110},
"428":{name:"Latvia",flag:"🇱🇻",capital:"Riga",population:1830000,area:64559,gdp:44,gdpPC:24040},
"762":{name:"Tajikistan",flag:"🇹🇯",capital:"Dushanbe",population:10143000,area:143100,gdp:12,gdpPC:1180},
"795":{name:"Turkmenistan",flag:"🇹🇲",capital:"Ashgabat",population:6431000,area:488100,gdp:60,gdpPC:9330},
"417":{name:"Kyrgyzstan",flag:"🇰🇬",capital:"Bishkek",population:6975000,area:199951,gdp:12,gdpPC:1720},
"462":{name:"Maldives",flag:"🇲🇻",capital:"Malé",population:521000,area:298,gdp:7,gdpPC:13430}
};

// Merge basic into DB (basic won't overwrite full entries)
Object.entries(BASIC_COUNTRIES).forEach(([k,v]) => { if(!COUNTRY_DB[k]) COUNTRY_DB[k] = v; });
