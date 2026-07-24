// GEOINT v8 — Fill exports/imports/extraction/bases for all countries lacking them
// Approximate 2023-24 figures (~80-90% accuracy). Merges into COUNTRY_DB without overwriting.
(function(){
if(typeof COUNTRY_DB==='undefined')return;

const FILL={

// ============ MAJOR ECONOMIES ============
"643":{exports:[{n:"Crude Oil",p:23.8},{n:"Refined Petroleum",p:15.2},{n:"Natural Gas",p:9.5},{n:"Coal",p:7.1},{n:"Wheat",p:5.8},{n:"Iron",p:3.2},{n:"Fertilizers",p:3.0},{n:"Aluminum",p:2.5}],imports:[{n:"Machinery",p:18.4},{n:"Vehicle Parts",p:7.2},{n:"Pharmaceuticals",p:6.1},{n:"Electronics",p:5.8},{n:"Cars",p:4.5},{n:"Textiles",p:4.0},{n:"Plastics",p:3.5}],extraction:[{n:"Samotlor Oilfield",lat:60.97,lng:76.95,r:"Oil"},{n:"Yamal LNG",lat:71.27,lng:72.13,r:"Natural Gas"},{n:"Norilsk",lat:69.33,lng:88.20,r:"Nickel & Palladium"},{n:"Kuzbass Coal Basin",lat:54.0,lng:86.0,r:"Coal"},{n:"Sukhoy Log",lat:58.0,lng:114.5,r:"Gold"}],bases:[{n:"Severomorsk",lat:69.07,lng:33.42,t:"Northern Fleet",f:0},{n:"Sevastopol (occupied)",lat:44.62,lng:33.52,t:"Black Sea Fleet",f:0},{n:"Vladivostok",lat:43.12,lng:131.88,t:"Pacific Fleet",f:0},{n:"Tartus (Syria)",lat:34.89,lng:35.88,t:"Naval Base",f:1},{n:"Hmeimim (Syria)",lat:35.41,lng:35.95,t:"Air Base",f:1},{n:"Plesetsk Cosmodrome",lat:62.93,lng:40.58,t:"Strategic/Space",f:0}]},

"826":{exports:[{n:"Cars",p:9.6},{n:"Gold",p:8.2},{n:"Crude Oil",p:6.1},{n:"Pharmaceuticals",p:5.4},{n:"Aircraft Parts",p:3.9},{n:"Refined Petroleum",p:3.5}],imports:[{n:"Cars",p:7.8},{n:"Gold",p:6.5},{n:"Crude Oil",p:4.2},{n:"Refined Petroleum",p:3.9},{n:"Computers",p:3.1},{n:"Pharmaceuticals",p:3.0}],extraction:[{n:"North Sea Brent",lat:61.05,lng:1.71,r:"Oil & Gas"},{n:"Cornish Lithium",lat:50.27,lng:-5.05,r:"Lithium (planned)"}],bases:[{n:"RAF Lakenheath",lat:52.41,lng:0.56,t:"USAF host",f:0},{n:"Faslane HMNB Clyde",lat:56.07,lng:-4.84,t:"SSBN Trident",f:0},{n:"Diego Garcia",lat:-7.32,lng:72.42,t:"Joint UK/US",f:1},{n:"BFC Akrotiri Cyprus",lat:34.59,lng:32.99,t:"RAF Sovereign Base",f:1}]},

"250":{exports:[{n:"Aircraft",p:6.4},{n:"Cars",p:5.1},{n:"Pharmaceuticals",p:4.8},{n:"Wine",p:2.7},{n:"Perfumes",p:2.3},{n:"Aircraft Parts",p:2.1}],imports:[{n:"Crude Oil",p:7.0},{n:"Cars",p:5.8},{n:"Refined Petroleum",p:5.5},{n:"Natural Gas",p:4.1},{n:"Telephones",p:3.0}],extraction:[{n:"Lacq",lat:43.42,lng:-0.62,r:"Natural Gas (depleting)"}],bases:[{n:"Île Longue",lat:48.30,lng:-4.60,t:"SSBN base",f:0},{n:"Toulon",lat:43.12,lng:5.93,t:"Mediterranean Fleet",f:0},{n:"Djibouti",lat:11.55,lng:43.15,t:"FFDj base",f:1},{n:"Abu Dhabi",lat:24.47,lng:54.37,t:"FFEAU base",f:1}]},

"276":{exports:[{n:"Cars",p:11.2},{n:"Vehicle Parts",p:5.4},{n:"Machinery",p:5.0},{n:"Pharmaceuticals",p:4.5},{n:"Aircraft",p:1.8},{n:"Chemicals",p:3.2}],imports:[{n:"Crude Oil",p:5.8},{n:"Natural Gas",p:4.2},{n:"Cars",p:4.0},{n:"Vehicle Parts",p:3.5},{n:"Computers",p:3.0}],extraction:[],bases:[{n:"Ramstein AB",lat:49.44,lng:7.60,t:"USAFE HQ host",f:0},{n:"Stuttgart EUCOM",lat:48.78,lng:9.18,t:"US EUCOM host",f:0},{n:"Büchel AB",lat:50.17,lng:7.06,t:"Nuclear sharing B61",f:0}]},

"392":{exports:[{n:"Cars",p:13.5},{n:"Integrated Circuits",p:5.2},{n:"Vehicle Parts",p:4.8},{n:"Machinery",p:4.3},{n:"Optical Instruments",p:2.9}],imports:[{n:"Crude Oil",p:9.8},{n:"LNG",p:7.2},{n:"Coal",p:3.5},{n:"Integrated Circuits",p:3.4},{n:"Pharmaceuticals",p:2.8}],extraction:[{n:"Hishikari",lat:31.97,lng:130.65,r:"Gold"}],bases:[{n:"Yokosuka",lat:35.28,lng:139.67,t:"7th Fleet US host",f:0},{n:"Kadena AB Okinawa",lat:26.36,lng:127.77,t:"USAF host",f:0},{n:"Misawa AB",lat:40.70,lng:141.37,t:"USAF host",f:0}]},

"356":{exports:[{n:"Refined Petroleum",p:13.0},{n:"Diamonds",p:6.2},{n:"Pharmaceuticals",p:5.8},{n:"Jewelry",p:5.1},{n:"Rice",p:2.4},{n:"Vehicle Parts",p:2.8}],imports:[{n:"Crude Oil",p:21.2},{n:"Gold",p:6.5},{n:"Coal",p:4.1},{n:"Diamonds",p:3.8},{n:"Natural Gas",p:2.5}],extraction:[{n:"Mumbai High",lat:19.42,lng:71.20,r:"Oil & Gas"},{n:"Jharia Coalfield",lat:23.75,lng:86.42,r:"Coal"},{n:"Bailadila",lat:18.65,lng:81.27,r:"Iron Ore"},{n:"Jaduguda",lat:22.65,lng:86.35,r:"Uranium"}],bases:[{n:"INS Kadamba Karwar",lat:14.82,lng:74.13,t:"Naval Base",f:0},{n:"Andaman & Nicobar Cmd",lat:11.66,lng:92.74,t:"Tri-Service",f:0},{n:"Farkhor Tajikistan",lat:37.55,lng:69.37,t:"Air Base",f:1}]},

"76":{exports:[{n:"Soybeans",p:13.5},{n:"Crude Oil",p:9.8},{n:"Iron Ore",p:6.2},{n:"Soybean Meal",p:3.1},{n:"Beef",p:3.0},{n:"Sugar",p:2.5},{n:"Coffee",p:2.2}],imports:[{n:"Refined Petroleum",p:7.5},{n:"Vehicle Parts",p:4.2},{n:"Integrated Circuits",p:3.8},{n:"Pharmaceuticals",p:2.9},{n:"Fertilizers",p:5.2}],extraction:[{n:"Carajás",lat:-6.07,lng:-50.15,r:"Iron Ore"},{n:"Pre-Salt Santos",lat:-25.0,lng:-43.0,r:"Oil"},{n:"Itabira",lat:-19.62,lng:-43.23,r:"Iron Ore"}],bases:[{n:"Rio Naval HQ",lat:-22.91,lng:-43.17,t:"Navy HQ",f:0},{n:"Brasília Air HQ",lat:-15.78,lng:-47.93,t:"FAB",f:0}]},

"484":{exports:[{n:"Cars",p:8.4},{n:"Crude Oil",p:6.5},{n:"Vehicle Parts",p:5.1},{n:"Trucks",p:4.2},{n:"Computers",p:3.0},{n:"Avocados",p:0.9}],imports:[{n:"Integrated Circuits",p:8.2},{n:"Refined Petroleum",p:6.5},{n:"Vehicle Parts",p:5.8},{n:"Natural Gas",p:3.0}],extraction:[{n:"Cantarell",lat:19.40,lng:-92.20,r:"Oil"},{n:"Fresnillo",lat:23.18,lng:-102.87,r:"Silver"},{n:"Buenavista del Cobre",lat:30.97,lng:-110.31,r:"Copper"}],bases:[{n:"Mexico City SEDENA",lat:19.43,lng:-99.13,t:"Army HQ",f:0},{n:"Veracruz Naval",lat:19.20,lng:-96.13,t:"Gulf Naval",f:0}]},

"124":{exports:[{n:"Crude Oil",p:18.0},{n:"Cars",p:5.2},{n:"Gold",p:3.5},{n:"Wood",p:2.8},{n:"Wheat",p:2.2},{n:"Potash",p:2.0}],imports:[{n:"Cars",p:7.5},{n:"Vehicle Parts",p:4.8},{n:"Refined Petroleum",p:3.0},{n:"Computers",p:2.9}],extraction:[{n:"Athabasca Oil Sands",lat:57.05,lng:-111.65,r:"Oil"},{n:"Sudbury",lat:46.49,lng:-81.0,r:"Nickel & Copper"},{n:"Cigar Lake",lat:58.05,lng:-104.50,r:"Uranium"},{n:"Diavik",lat:64.50,lng:-110.30,r:"Diamonds"}],bases:[{n:"CFB Halifax",lat:44.65,lng:-63.58,t:"Atlantic Fleet",f:0},{n:"CFB Esquimalt",lat:48.43,lng:-123.43,t:"Pacific Fleet",f:0}]},

"36":{exports:[{n:"Iron Ore",p:25.5},{n:"Coal",p:15.2},{n:"LNG",p:11.0},{n:"Gold",p:5.8},{n:"Beef",p:2.5},{n:"Wheat",p:2.0}],imports:[{n:"Refined Petroleum",p:8.5},{n:"Cars",p:7.0},{n:"Crude Oil",p:3.2},{n:"Computers",p:3.0}],extraction:[{n:"Pilbara",lat:-22.69,lng:117.79,r:"Iron Ore"},{n:"Olympic Dam",lat:-30.44,lng:136.88,r:"Copper-Uranium-Gold"},{n:"Bowen Basin",lat:-22.5,lng:148.5,r:"Coking Coal"},{n:"Greenbushes",lat:-33.86,lng:116.06,r:"Lithium"}],bases:[{n:"HMAS Stirling",lat:-32.23,lng:115.69,t:"Submarine base",f:0},{n:"Pine Gap",lat:-23.80,lng:133.74,t:"Joint US/AU SIGINT",f:0},{n:"RAAF Tindal",lat:-14.52,lng:132.38,t:"Air Force / US rotation",f:0}]},

"380":{exports:[{n:"Pharmaceuticals",p:5.8},{n:"Cars",p:3.5},{n:"Machinery",p:8.2},{n:"Refined Petroleum",p:3.4},{n:"Wine",p:1.4},{n:"Furniture",p:1.8}],imports:[{n:"Natural Gas",p:5.2},{n:"Crude Oil",p:7.5},{n:"Refined Petroleum",p:3.5},{n:"Cars",p:4.0}],extraction:[{n:"Val d'Agri",lat:40.30,lng:15.80,r:"Oil & Gas"}],bases:[{n:"Naples / 6th Fleet",lat:40.85,lng:14.27,t:"US Navy host",f:0},{n:"Aviano AB",lat:46.03,lng:12.60,t:"USAF host",f:0},{n:"Sigonella NAS",lat:37.40,lng:14.92,t:"USN host",f:0},{n:"Ghedi AB",lat:45.43,lng:10.27,t:"Nuclear sharing B61",f:0}]},

// Europe
"40":{exports:[{n:"Vehicles",p:7.5},{n:"Pharmaceuticals",p:5.5},{n:"Machinery",p:9.0},{n:"Vehicle Parts",p:3.8}],imports:[{n:"Vehicles",p:5.8},{n:"Pharmaceuticals",p:4.0},{n:"Crude Oil",p:5.5}],extraction:[{n:"Erzberg",lat:47.53,lng:14.88,r:"Iron Ore"}],bases:[]},

"56":{exports:[{n:"Pharmaceuticals",p:9.5},{n:"Cars",p:7.0},{n:"Diamonds",p:6.8},{n:"Refined Petroleum",p:4.8}],imports:[{n:"Diamonds",p:7.5},{n:"Refined Petroleum",p:5.0},{n:"Cars",p:5.5}],extraction:[],bases:[{n:"NATO HQ Brussels",lat:50.88,lng:4.42,t:"Alliance HQ",f:0},{n:"SHAPE Mons",lat:50.46,lng:3.96,t:"NATO Operations",f:0},{n:"Kleine Brogel",lat:51.17,lng:5.47,t:"Nuclear sharing",f:0}]},

"752":{exports:[{n:"Cars",p:4.8},{n:"Refined Petroleum",p:4.5},{n:"Pharmaceuticals",p:4.2},{n:"Iron Ore",p:3.5},{n:"Machinery",p:6.0}],imports:[{n:"Crude Oil",p:6.0},{n:"Cars",p:5.0},{n:"Refined Petroleum",p:3.5}],extraction:[{n:"Kiruna",lat:67.86,lng:20.23,r:"Iron Ore"},{n:"Aitik",lat:67.07,lng:20.92,r:"Copper"}],bases:[{n:"Karlskrona Naval",lat:56.16,lng:15.59,t:"Navy HQ",f:0}]},

"578":{exports:[{n:"Crude Oil",p:18.5},{n:"Natural Gas",p:24.0},{n:"Fish",p:7.5},{n:"Aluminum",p:3.8}],imports:[{n:"Cars",p:8.0},{n:"Computers",p:3.5},{n:"Telephones",p:3.0}],extraction:[{n:"Ekofisk",lat:56.55,lng:3.20,r:"Oil"},{n:"Troll",lat:60.65,lng:3.72,r:"Natural Gas"},{n:"Johan Sverdrup",lat:58.82,lng:2.50,r:"Oil"}],bases:[{n:"Bodø",lat:67.27,lng:14.37,t:"F-35 base",f:0},{n:"Haakonsvern",lat:60.32,lng:5.27,t:"Submarine base",f:0}]},

"208":{exports:[{n:"Pharmaceuticals",p:14.0},{n:"Pork",p:3.2},{n:"Machinery",p:5.0},{n:"Fish",p:3.0}],imports:[{n:"Cars",p:5.5},{n:"Refined Petroleum",p:4.0},{n:"Pharmaceuticals",p:3.5}],extraction:[{n:"Dan Field N.Sea",lat:55.47,lng:5.20,r:"Oil & Gas"}],bases:[{n:"Karup AB",lat:56.30,lng:9.13,t:"Air Force HQ",f:0}]},

"246":{exports:[{n:"Refined Petroleum",p:8.5},{n:"Wood",p:7.5},{n:"Paper",p:5.8},{n:"Machinery",p:5.0}],imports:[{n:"Crude Oil",p:8.0},{n:"Cars",p:5.0},{n:"Refined Petroleum",p:4.5}],extraction:[{n:"Talvivaara",lat:63.98,lng:28.02,r:"Nickel-Zinc"},{n:"Outokumpu",lat:62.73,lng:29.0,r:"Chromium"}],bases:[{n:"Säkylä",lat:61.05,lng:22.36,t:"Army HQ",f:0}]},

"352":{exports:[{n:"Aluminum",p:34.0},{n:"Fish",p:18.5},{n:"Salmon",p:8.0}],imports:[{n:"Refined Petroleum",p:9.5},{n:"Cars",p:6.0}],extraction:[{n:"Hellisheiði",lat:64.04,lng:-21.40,r:"Geothermal"}],bases:[{n:"Keflavik",lat:63.99,lng:-22.61,t:"NATO US host",f:1}]},

"724":{exports:[{n:"Cars",p:9.0},{n:"Refined Petroleum",p:5.0},{n:"Pharmaceuticals",p:4.5},{n:"Olive Oil",p:1.0},{n:"Wine",p:1.5}],imports:[{n:"Crude Oil",p:7.5},{n:"Cars",p:6.5},{n:"Natural Gas",p:3.5}],extraction:[{n:"Las Cruces",lat:37.46,lng:-6.18,r:"Copper"}],bases:[{n:"Rota Naval",lat:36.62,lng:-6.35,t:"US Navy host",f:0},{n:"Morón AB",lat:37.17,lng:-5.61,t:"USAF host",f:0}]},

"620":{exports:[{n:"Cars",p:5.5},{n:"Refined Petroleum",p:4.5},{n:"Footwear",p:3.5},{n:"Wine",p:2.5},{n:"Cork",p:1.2}],imports:[{n:"Cars",p:6.0},{n:"Crude Oil",p:6.5},{n:"Vehicle Parts",p:3.5}],extraction:[{n:"Neves-Corvo",lat:37.58,lng:-8.10,r:"Copper-Zinc"},{n:"Panasqueira",lat:40.17,lng:-7.74,r:"Tungsten"}],bases:[{n:"Lajes AB Azores",lat:38.76,lng:-27.10,t:"USAF/Portuguese",f:0}]},

"528":{exports:[{n:"Refined Petroleum",p:7.5},{n:"Machinery",p:6.0},{n:"Pharmaceuticals",p:5.5},{n:"Computers",p:3.8},{n:"Telephones",p:3.0}],imports:[{n:"Crude Oil",p:8.5},{n:"Computers",p:3.5},{n:"Telephones",p:3.0}],extraction:[{n:"Groningen",lat:53.30,lng:6.85,r:"Natural Gas (closing)"}],bases:[{n:"Volkel AB",lat:51.66,lng:5.71,t:"Nuclear sharing",f:0},{n:"Den Helder",lat:52.96,lng:4.76,t:"Royal Navy HQ",f:0}]},

"756":{exports:[{n:"Pharmaceuticals",p:31.0},{n:"Watches",p:7.5},{n:"Machinery",p:5.5},{n:"Gold",p:21.0}],imports:[{n:"Gold",p:21.0},{n:"Cars",p:5.0},{n:"Pharmaceuticals",p:4.0}],extraction:[],bases:[{n:"Payerne AB",lat:46.84,lng:6.92,t:"Swiss AF",f:0}]},

"616":{exports:[{n:"Vehicle Parts",p:5.0},{n:"Cars",p:4.5},{n:"Furniture",p:3.5},{n:"Refined Petroleum",p:2.8}],imports:[{n:"Vehicle Parts",p:5.5},{n:"Cars",p:5.0},{n:"Crude Oil",p:6.5}],extraction:[{n:"KGHM Lubin",lat:51.40,lng:16.20,r:"Copper-Silver"},{n:"Bełchatów",lat:51.27,lng:19.30,r:"Lignite"}],bases:[{n:"Powidz AB",lat:52.38,lng:17.85,t:"Polish AF + US",f:0},{n:"Redzikowo",lat:54.49,lng:17.13,t:"Aegis Ashore US BMD",f:0}]},

"203":{exports:[{n:"Cars",p:9.5},{n:"Vehicle Parts",p:5.5},{n:"Computers",p:4.0},{n:"Machinery",p:5.0}],imports:[{n:"Vehicle Parts",p:6.5},{n:"Cars",p:4.5},{n:"Computers",p:3.5}],extraction:[],bases:[{n:"Náměšť AB",lat:49.17,lng:16.13,t:"Czech AF",f:0}]},

"703":{exports:[{n:"Cars",p:13.5},{n:"Vehicle Parts",p:7.0},{n:"Machinery",p:4.5},{n:"Refined Petroleum",p:3.5}],imports:[{n:"Vehicle Parts",p:7.5},{n:"Cars",p:4.5},{n:"Crude Oil",p:5.5}],extraction:[],bases:[{n:"Sliač AB",lat:48.64,lng:19.13,t:"Slovak AF",f:0}]},

"348":{exports:[{n:"Cars",p:9.5},{n:"Vehicle Parts",p:6.0},{n:"Machinery",p:6.5},{n:"Pharmaceuticals",p:3.0}],imports:[{n:"Vehicle Parts",p:7.0},{n:"Cars",p:4.5},{n:"Machinery",p:6.0}],extraction:[{n:"Mátra Lignite",lat:47.83,lng:20.0,r:"Lignite"}],bases:[{n:"Pápa AB",lat:47.36,lng:17.50,t:"NATO C-17",f:0}]},

"100":{exports:[{n:"Refined Copper",p:5.5},{n:"Refined Petroleum",p:5.0},{n:"Wheat",p:3.0},{n:"Sunflower Oil",p:2.5}],imports:[{n:"Crude Oil",p:8.5},{n:"Cars",p:4.5},{n:"Natural Gas",p:4.0}],extraction:[{n:"Asarel-Medet",lat:42.40,lng:24.18,r:"Copper"}],bases:[{n:"Bezmer AB",lat:42.45,lng:26.35,t:"NATO/US joint",f:0}]},

"642":{exports:[{n:"Cars",p:5.5},{n:"Vehicle Parts",p:6.0},{n:"Refined Petroleum",p:4.5},{n:"Machinery",p:4.0},{n:"Wheat",p:3.0}],imports:[{n:"Vehicle Parts",p:5.5},{n:"Crude Oil",p:5.0},{n:"Cars",p:4.5}],extraction:[{n:"Petrom",lat:44.75,lng:25.0,r:"Oil & Gas"}],bases:[{n:"M. Kogălniceanu",lat:44.36,lng:28.49,t:"NATO/US",f:0},{n:"Deveselu",lat:44.05,lng:24.40,t:"Aegis Ashore",f:0}]},

"688":{exports:[{n:"Refined Copper",p:6.0},{n:"Cars",p:5.5},{n:"Wheat",p:3.5},{n:"Vehicle Parts",p:3.0}],imports:[{n:"Crude Oil",p:7.0},{n:"Cars",p:5.5},{n:"Natural Gas",p:4.0}],extraction:[{n:"Bor Copper",lat:44.07,lng:22.10,r:"Copper-Gold"}],bases:[{n:"Niš AB",lat:43.34,lng:21.85,t:"Serbian AF",f:0}]},

"191":{exports:[{n:"Refined Petroleum",p:6.5},{n:"Medicaments",p:4.0},{n:"Furniture",p:2.5}],imports:[{n:"Crude Oil",p:5.5},{n:"Cars",p:4.5}],extraction:[{n:"Adriatic Oil",lat:43.85,lng:15.50,r:"Offshore Oil & Gas"}],bases:[{n:"Split Naval",lat:43.50,lng:16.43,t:"Navy",f:0}]},

"705":{exports:[{n:"Cars",p:9.0},{n:"Pharmaceuticals",p:7.0},{n:"Vehicle Parts",p:4.5},{n:"Machinery",p:5.0}],imports:[{n:"Cars",p:5.5},{n:"Vehicle Parts",p:5.0},{n:"Crude Oil",p:5.5}],extraction:[],bases:[{n:"Cerklje AB",lat:45.90,lng:15.53,t:"Slovenian AF",f:0}]},

"70":{exports:[{n:"Refined Petroleum",p:4.0},{n:"Aluminum",p:5.5},{n:"Furniture",p:5.0},{n:"Footwear",p:3.5}],imports:[{n:"Refined Petroleum",p:6.5},{n:"Cars",p:5.5}],extraction:[{n:"Tuzla Salt",lat:44.54,lng:18.67,r:"Salt"}],bases:[]},

"807":{exports:[{n:"Iron",p:5.5},{n:"Tobacco",p:3.5},{n:"Vehicle Parts",p:3.0}],imports:[{n:"Crude Oil",p:6.0},{n:"Cars",p:4.5}],extraction:[{n:"Bučim",lat:41.71,lng:22.20,r:"Copper"}],bases:[{n:"Petrovec AB",lat:41.96,lng:21.62,t:"NATO host",f:0}]},

"499":{exports:[{n:"Aluminum",p:14.5},{n:"Refined Petroleum",p:7.0},{n:"Tobacco",p:6.5}],imports:[{n:"Refined Petroleum",p:7.5},{n:"Cars",p:6.0}],extraction:[{n:"Niksić Bauxite",lat:42.77,lng:18.95,r:"Bauxite"}],bases:[]},

"8":{exports:[{n:"Footwear",p:9.0},{n:"Crude Oil",p:6.5},{n:"Apparel",p:8.5},{n:"Iron",p:4.5},{n:"Chromium",p:3.5}],imports:[{n:"Refined Petroleum",p:7.0},{n:"Cars",p:5.5}],extraction:[{n:"Bulqizë Chrome",lat:41.49,lng:20.22,r:"Chromium"},{n:"Patos-Marinza",lat:40.70,lng:19.55,r:"Oil"}],bases:[{n:"Kuçovë AB",lat:40.78,lng:19.91,t:"NATO airbase",f:0}]},

"300":{exports:[{n:"Refined Petroleum",p:25.0},{n:"Aluminum",p:3.5},{n:"Pharmaceuticals",p:3.5},{n:"Olive Oil",p:1.5}],imports:[{n:"Crude Oil",p:18.0},{n:"Cars",p:5.5}],extraction:[{n:"Stratoni",lat:40.52,lng:23.83,r:"Lead-Zinc-Silver"}],bases:[{n:"Souda Bay Crete",lat:35.49,lng:24.14,t:"US Navy host",f:0}]},

"233":{exports:[{n:"Communications Equip.",p:11.0},{n:"Wood",p:6.5},{n:"Refined Petroleum",p:5.5},{n:"Software",p:8.5}],imports:[{n:"Refined Petroleum",p:8.5},{n:"Cars",p:5.0}],extraction:[{n:"Estonian Oil Shale",lat:59.40,lng:27.50,r:"Oil Shale"}],bases:[{n:"Ämari AB",lat:59.26,lng:24.21,t:"NATO/Estonian",f:0},{n:"Tapa",lat:59.27,lng:25.96,t:"NATO eFP UK-led",f:0}]},

"428":{exports:[{n:"Wood",p:7.0},{n:"Iron",p:6.0},{n:"Pharmaceuticals",p:3.0},{n:"Furniture",p:3.5}],imports:[{n:"Refined Petroleum",p:9.0},{n:"Cars",p:6.0}],extraction:[],bases:[{n:"Lielvārde AB",lat:56.78,lng:24.84,t:"Latvian AF + NATO",f:0},{n:"Ādaži",lat:57.06,lng:24.32,t:"NATO eFP Canada-led",f:0}]},

"440":{exports:[{n:"Refined Petroleum",p:14.0},{n:"Furniture",p:5.5},{n:"Wheat",p:3.0}],imports:[{n:"Crude Oil",p:11.0},{n:"Cars",p:5.5}],extraction:[{n:"Mažeikiai Refinery",lat:56.30,lng:22.36,r:"Refining"}],bases:[{n:"Šiauliai AB",lat:55.89,lng:23.39,t:"NATO Air Policing",f:0},{n:"Rukla",lat:55.0,lng:24.30,t:"NATO eFP DE-led",f:0}]},

"498":{exports:[{n:"Insulated Wire",p:9.0},{n:"Sunflower Seeds",p:6.5},{n:"Wine",p:5.5}],imports:[{n:"Refined Petroleum",p:11.0},{n:"Cars",p:5.5}],extraction:[],bases:[]},

"804":{exports:[{n:"Corn",p:8.5},{n:"Sunflower Oil",p:8.0},{n:"Iron Ore",p:6.5},{n:"Wheat",p:5.0},{n:"IT Services",p:6.0}],imports:[{n:"Refined Petroleum",p:9.5},{n:"Cars",p:5.0},{n:"Coal",p:3.5}],extraction:[{n:"Krivoy Rog",lat:47.91,lng:33.39,r:"Iron Ore"},{n:"Donbas",lat:48.0,lng:38.0,r:"Coal (occupied)"}],bases:[{n:"Yavoriv Training",lat:49.95,lng:23.40,t:"Army (NATO trainers)",f:0},{n:"Mykolaiv Naval",lat:46.97,lng:32.0,t:"Navy",f:0}]},

"112":{exports:[{n:"Refined Petroleum",p:13.0},{n:"Potash",p:11.0},{n:"Trucks",p:5.5},{n:"Wood",p:4.0}],imports:[{n:"Crude Oil",p:13.0},{n:"Natural Gas",p:8.0},{n:"Cars",p:4.5}],extraction:[{n:"Belaruskali",lat:52.78,lng:27.55,r:"Potash"}],bases:[{n:"Asipovichy",lat:53.30,lng:28.65,t:"Russian nukes 2023+",f:1}]},

"792":{exports:[{n:"Cars",p:7.0},{n:"Vehicle Parts",p:5.5},{n:"Gold",p:5.5},{n:"Refined Petroleum",p:4.0},{n:"Apparel",p:5.0}],imports:[{n:"Crude Oil",p:8.0},{n:"Gold",p:5.5},{n:"Vehicle Parts",p:4.5},{n:"Natural Gas",p:5.0}],extraction:[{n:"Soma Lignite",lat:39.18,lng:27.61,r:"Lignite"},{n:"Çayeli",lat:41.0,lng:40.72,r:"Copper-Zinc"}],bases:[{n:"Incirlik AB",lat:37.0,lng:35.43,t:"USAF/Nuclear sharing",f:0}]},

// East Asia
"410":{exports:[{n:"Integrated Circuits",p:12.0},{n:"Cars",p:8.5},{n:"Refined Petroleum",p:6.5},{n:"Vehicle Parts",p:3.5},{n:"Ships",p:3.5}],imports:[{n:"Crude Oil",p:11.0},{n:"Integrated Circuits",p:8.0},{n:"Natural Gas",p:5.5},{n:"Coal",p:4.5}],extraction:[],bases:[{n:"Camp Humphreys",lat:36.96,lng:127.03,t:"US Army HQ Korea",f:0},{n:"Osan AB",lat:37.09,lng:127.03,t:"USFK Air HQ",f:0}]},

"408":{exports:[{n:"Coal",p:25.0},{n:"Iron Ore",p:8.0},{n:"Apparel",p:7.0}],imports:[{n:"Crude Oil",p:8.5},{n:"Refined Petroleum",p:7.0}],extraction:[{n:"Musan Iron",lat:42.23,lng:129.21,r:"Iron Ore"},{n:"Komdok",lat:40.92,lng:129.0,r:"Lead-Zinc"}],bases:[{n:"Yongbyon",lat:39.80,lng:125.75,t:"Nuclear weapons",f:0},{n:"Sohae",lat:39.66,lng:124.71,t:"Missile launch",f:0}]},

"158":{exports:[{n:"Integrated Circuits",p:38.0},{n:"Computers",p:8.5},{n:"Telephones",p:3.5},{n:"Vehicle Parts",p:3.0}],imports:[{n:"Integrated Circuits",p:18.0},{n:"Crude Oil",p:6.5},{n:"Natural Gas",p:5.0}],extraction:[],bases:[{n:"Hsinchu AB",lat:24.82,lng:121.0,t:"Air Force HQ",f:0},{n:"Zuoying Naval",lat:22.62,lng:120.27,t:"Navy HQ",f:0}]},

"344":{exports:[{n:"Gold",p:8.5},{n:"Integrated Circuits",p:7.5},{n:"Telephones",p:5.5},{n:"Diamonds",p:5.5}],imports:[{n:"Integrated Circuits",p:13.0},{n:"Gold",p:7.5}],extraction:[],bases:[{n:"PLA Garrison HK",lat:22.36,lng:114.13,t:"PLA Garrison",f:0}]},

"446":{exports:[{n:"Watches",p:5.0},{n:"Cars",p:3.5}],imports:[{n:"Telephones",p:6.5},{n:"Refined Petroleum",p:6.0}],extraction:[],bases:[]},

"496":{exports:[{n:"Coal",p:35.0},{n:"Copper",p:20.0},{n:"Gold",p:8.5},{n:"Iron Ore",p:5.5},{n:"Cashmere",p:3.0}],imports:[{n:"Refined Petroleum",p:25.0},{n:"Cars",p:6.5}],extraction:[{n:"Oyu Tolgoi",lat:43.0,lng:106.85,r:"Copper-Gold"},{n:"Tavan Tolgoi",lat:43.55,lng:105.65,r:"Coking Coal"},{n:"Erdenet",lat:49.03,lng:104.08,r:"Copper-Molybdenum"}],bases:[]},

// SE Asia
"704":{exports:[{n:"Telephones",p:14.0},{n:"Computers",p:13.5},{n:"Integrated Circuits",p:6.5},{n:"Footwear",p:3.5},{n:"Apparel",p:8.5}],imports:[{n:"Integrated Circuits",p:12.0},{n:"Telephones",p:5.5},{n:"Refined Petroleum",p:5.0}],extraction:[{n:"Bach Ho Oilfield",lat:9.40,lng:107.5,r:"Oil"},{n:"Núi Pháo",lat:21.65,lng:105.83,r:"Tungsten"}],bases:[{n:"Cam Ranh Bay",lat:11.95,lng:109.18,t:"Naval (open access)",f:0}]},

"360":{exports:[{n:"Coal",p:14.5},{n:"Palm Oil",p:11.5},{n:"Iron",p:6.5},{n:"Nickel",p:5.0},{n:"Natural Gas",p:3.5}],imports:[{n:"Refined Petroleum",p:13.0},{n:"Crude Oil",p:5.5},{n:"Telephones",p:2.5}],extraction:[{n:"Grasberg",lat:-4.06,lng:137.12,r:"Copper-Gold"},{n:"Sumatra Coal",lat:-3.5,lng:103.0,r:"Coal"},{n:"Sulawesi Nickel",lat:-2.5,lng:121.5,r:"Nickel"}],bases:[{n:"Surabaya Naval",lat:-7.20,lng:112.73,t:"Navy",f:0}]},

"608":{exports:[{n:"Integrated Circuits",p:14.5},{n:"Office Machines",p:9.0},{n:"Insulated Wire",p:5.5}],imports:[{n:"Integrated Circuits",p:8.5},{n:"Refined Petroleum",p:8.5},{n:"Crude Oil",p:5.0}],extraction:[{n:"Tampakan",lat:6.45,lng:125.05,r:"Copper-Gold"},{n:"Surigao Nickel",lat:9.85,lng:125.53,r:"Nickel"}],bases:[{n:"Subic Bay",lat:14.78,lng:120.27,t:"Naval (US EDCA)",f:0},{n:"Clark AB",lat:15.18,lng:120.55,t:"Air Force (US EDCA)",f:0}]},

"764":{exports:[{n:"Integrated Circuits",p:5.5},{n:"Cars",p:5.0},{n:"Computers",p:4.0},{n:"Vehicle Parts",p:3.5},{n:"Rice",p:2.5}],imports:[{n:"Crude Oil",p:9.0},{n:"Integrated Circuits",p:5.5},{n:"Refined Petroleum",p:5.0}],extraction:[{n:"Mae Moh",lat:18.30,lng:99.70,r:"Lignite"}],bases:[{n:"Sattahip Naval",lat:12.66,lng:100.92,t:"Navy HQ",f:0},{n:"U-Tapao",lat:12.68,lng:101.01,t:"Air Base (US visits)",f:0}]},

"458":{exports:[{n:"Integrated Circuits",p:14.0},{n:"Refined Petroleum",p:10.5},{n:"Palm Oil",p:5.0},{n:"Natural Gas",p:4.5}],imports:[{n:"Integrated Circuits",p:13.0},{n:"Refined Petroleum",p:9.0},{n:"Crude Oil",p:3.0}],extraction:[{n:"Pengerang",lat:1.40,lng:104.10,r:"Refining"}],bases:[{n:"Lumut Naval",lat:4.23,lng:100.62,t:"Royal Malaysian Navy",f:0},{n:"Butterworth AB",lat:5.47,lng:100.39,t:"Air Force (RAAF rotational)",f:0}]},

"702":{exports:[{n:"Integrated Circuits",p:18.0},{n:"Refined Petroleum",p:14.5},{n:"Gold",p:3.5},{n:"Machinery",p:8.0}],imports:[{n:"Integrated Circuits",p:14.5},{n:"Crude Oil",p:7.5}],extraction:[],bases:[{n:"Changi Naval",lat:1.39,lng:103.99,t:"Naval (US logistics access)",f:0}]},

"116":{exports:[{n:"Apparel",p:42.0},{n:"Footwear",p:14.0},{n:"Rice",p:6.0},{n:"Rubber",p:3.0}],imports:[{n:"Cotton Yarn",p:8.0},{n:"Refined Petroleum",p:7.0}],extraction:[],bases:[{n:"Ream Naval",lat:10.65,lng:103.62,t:"Navy/PLA access",f:0}]},

"418":{exports:[{n:"Electricity",p:24.0},{n:"Copper",p:14.0},{n:"Wood",p:7.0},{n:"Rubber",p:5.5}],imports:[{n:"Refined Petroleum",p:18.0},{n:"Cars",p:6.5}],extraction:[{n:"Sepon",lat:16.71,lng:105.74,r:"Gold-Copper"}],bases:[]},

"104":{exports:[{n:"Natural Gas",p:25.0},{n:"Apparel",p:13.0},{n:"Pulses",p:4.0},{n:"Jade",p:5.0}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Vehicles",p:5.5}],extraction:[{n:"Hpakant Jade",lat:25.59,lng:96.30,r:"Jade"},{n:"Yadana Gas",lat:14.50,lng:97.50,r:"Natural Gas"}],bases:[{n:"Naypyidaw HQ",lat:19.75,lng:96.10,t:"Tatmadaw HQ",f:0}]},

"50":{exports:[{n:"Apparel",p:84.0},{n:"Footwear",p:1.5},{n:"Jute",p:1.2}],imports:[{n:"Refined Petroleum",p:7.0},{n:"Cotton",p:4.5},{n:"Iron",p:3.5}],extraction:[{n:"Barapukuria Coal",lat:25.55,lng:88.93,r:"Coal"}],bases:[{n:"Dhaka Cantonment",lat:23.83,lng:90.38,t:"Bangladesh Army HQ",f:0}]},

"524":{exports:[{n:"Carpets",p:9.0},{n:"Apparel",p:6.5},{n:"Pashmina",p:3.5},{n:"Tea",p:2.5}],imports:[{n:"Refined Petroleum",p:21.0},{n:"Iron",p:5.5}],extraction:[],bases:[]},

"144":{exports:[{n:"Apparel",p:42.0},{n:"Tea",p:14.0},{n:"Rubber",p:3.5},{n:"Spices",p:3.0}],imports:[{n:"Refined Petroleum",p:18.0},{n:"Textiles",p:11.0}],extraction:[{n:"Eppawala",lat:8.13,lng:80.35,r:"Phosphate"}],bases:[{n:"Hambantota Port",lat:6.12,lng:81.13,t:"Chinese-leased",f:1}]},

"586":{exports:[{n:"Apparel",p:7.5},{n:"Rice",p:8.5},{n:"Textiles",p:14.0},{n:"Cotton",p:5.5}],imports:[{n:"Refined Petroleum",p:18.0},{n:"Crude Oil",p:11.0},{n:"Palm Oil",p:6.0}],extraction:[{n:"Sui Gas",lat:28.62,lng:69.20,r:"Natural Gas"},{n:"Reko Diq",lat:29.10,lng:62.20,r:"Copper-Gold"},{n:"Saindak",lat:29.27,lng:61.65,r:"Copper-Gold"}],bases:[{n:"Karachi Naval",lat:24.85,lng:67.0,t:"Navy HQ",f:0},{n:"Gwadar",lat:25.13,lng:62.32,t:"Naval/Port Chinese-built",f:0}]},

"4":{exports:[{n:"Carpets",p:18.0},{n:"Saffron",p:8.0},{n:"Pine Nuts",p:7.0}],imports:[{n:"Refined Petroleum",p:18.0},{n:"Wheat",p:9.0}],extraction:[{n:"Mes Aynak",lat:34.36,lng:69.55,r:"Copper (Chinese)"}],bases:[]},

"398":{exports:[{n:"Crude Oil",p:55.0},{n:"Copper",p:5.5},{n:"Iron Ore",p:3.5},{n:"Wheat",p:3.5},{n:"Uranium",p:6.0}],imports:[{n:"Cars",p:6.5},{n:"Telephones",p:4.0}],extraction:[{n:"Tengiz",lat:46.13,lng:53.20,r:"Oil"},{n:"Kashagan",lat:46.50,lng:51.30,r:"Oil"},{n:"Cameco Inkai",lat:46.13,lng:67.0,r:"Uranium"}],bases:[]},

"860":{exports:[{n:"Cotton",p:9.0},{n:"Gold",p:25.0},{n:"Natural Gas",p:8.5},{n:"Copper",p:5.5}],imports:[{n:"Refined Petroleum",p:5.5},{n:"Cars",p:6.5}],extraction:[{n:"Muruntau",lat:41.50,lng:64.60,r:"Gold (largest open-pit)"},{n:"Almalyk",lat:40.85,lng:69.60,r:"Copper-Molybdenum"}],bases:[]},

"417":{exports:[{n:"Gold",p:42.0},{n:"Apparel",p:6.5},{n:"Refined Petroleum",p:6.0}],imports:[{n:"Refined Petroleum",p:13.0},{n:"Cars",p:5.5}],extraction:[{n:"Kumtor",lat:41.87,lng:78.18,r:"Gold"}],bases:[{n:"Kant AB",lat:42.85,lng:74.85,t:"Russian AB CSTO",f:1}]},

"762":{exports:[{n:"Aluminum",p:24.0},{n:"Cotton",p:11.5},{n:"Gold",p:10.0},{n:"Zinc",p:4.0}],imports:[{n:"Refined Petroleum",p:14.5},{n:"Wheat",p:5.0}],extraction:[{n:"Talco Aluminum",lat:39.0,lng:69.25,r:"Aluminum smelter"}],bases:[{n:"201st Russian Base",lat:38.55,lng:68.78,t:"Russian Army CSTO",f:1}]},

"795":{exports:[{n:"Natural Gas",p:81.0},{n:"Cotton",p:5.5},{n:"Crude Oil",p:5.0}],imports:[{n:"Refined Petroleum",p:9.0},{n:"Cars",p:6.5}],extraction:[{n:"Galkynysh",lat:38.05,lng:62.10,r:"Natural Gas (world's 2nd largest)"}],bases:[]},

"31":{exports:[{n:"Crude Oil",p:50.0},{n:"Natural Gas",p:9.5},{n:"Refined Petroleum",p:5.5}],imports:[{n:"Cars",p:5.5},{n:"Refined Petroleum",p:5.0}],extraction:[{n:"Azeri-Chirag-Guneshli",lat:40.20,lng:50.50,r:"Oil offshore"},{n:"Shah Deniz",lat:40.35,lng:50.83,r:"Gas (TANAP/TAP)"}],bases:[]},

"51":{exports:[{n:"Copper",p:13.5},{n:"Gold",p:6.0},{n:"Cigars",p:5.0},{n:"Brandy",p:3.0}],imports:[{n:"Diamonds",p:6.0},{n:"Refined Petroleum",p:5.5}],extraction:[{n:"Kajaran",lat:39.16,lng:46.16,r:"Copper-Molybdenum"}],bases:[{n:"Gyumri 102nd",lat:40.78,lng:43.85,t:"Russian base CSTO",f:1}]},

"268":{exports:[{n:"Copper Ore",p:13.0},{n:"Wine",p:6.5},{n:"Ferroalloys",p:5.5}],imports:[{n:"Refined Petroleum",p:7.5},{n:"Cars",p:5.5}],extraction:[{n:"Madneuli",lat:41.70,lng:44.35,r:"Copper-Gold"},{n:"Chiatura",lat:42.30,lng:43.30,r:"Manganese"}],bases:[]},

// Middle East
"376":{exports:[{n:"Diamonds",p:11.5},{n:"Integrated Circuits",p:9.0},{n:"Pharmaceuticals",p:7.0},{n:"Medical Equipment",p:4.5}],imports:[{n:"Crude Oil",p:6.0},{n:"Diamonds",p:6.0},{n:"Cars",p:5.0}],extraction:[{n:"Leviathan",lat:33.0,lng:34.5,r:"Natural Gas offshore"},{n:"Tamar",lat:32.45,lng:33.65,r:"Natural Gas"},{n:"Dead Sea Works",lat:31.05,lng:35.39,r:"Potash, Bromine"}],bases:[{n:"IDF HQ Tel Aviv",lat:32.07,lng:34.78,t:"IDF GHQ",f:0},{n:"Dimona",lat:31.0,lng:35.13,t:"Nuclear research",f:0}]},

"275":{exports:[{n:"Stone",p:18.0},{n:"Olive Oil",p:5.5},{n:"Apparel",p:3.5}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Wheat",p:5.5}],extraction:[],bases:[]},

"422":{exports:[{n:"Gold",p:21.0},{n:"Jewelry",p:14.0},{n:"Pearls",p:3.0}],imports:[{n:"Refined Petroleum",p:18.0},{n:"Gold",p:11.0}],extraction:[],bases:[]},

"760":{exports:[{n:"Olive Oil",p:8.0},{n:"Phosphates",p:4.5},{n:"Apparel",p:5.5}],imports:[{n:"Refined Petroleum",p:18.0},{n:"Wheat",p:7.0}],extraction:[{n:"Khneifiss Phosphate",lat:34.93,lng:38.50,r:"Phosphate"}],bases:[{n:"Hmeimim AB",lat:35.41,lng:35.95,t:"Russian Air Base",f:1},{n:"Tartus Naval",lat:34.89,lng:35.88,t:"Russian Naval",f:1}]},

"368":{exports:[{n:"Crude Oil",p:90.0},{n:"Refined Petroleum",p:4.5}],imports:[{n:"Cars",p:9.0},{n:"Wheat",p:3.0}],extraction:[{n:"Rumaila",lat:30.42,lng:47.55,r:"Oil (BP)"},{n:"Majnoon",lat:31.30,lng:47.35,r:"Oil"},{n:"West Qurna",lat:30.60,lng:47.55,r:"Oil"},{n:"Kirkuk",lat:35.47,lng:44.39,r:"Oil"}],bases:[{n:"Al-Asad AB",lat:33.79,lng:42.45,t:"US/Iraqi Air",f:0}]},

"364":{exports:[{n:"Crude Oil",p:32.0},{n:"Petrochemicals",p:11.5},{n:"Iron",p:6.5},{n:"Pistachios",p:1.5}],imports:[{n:"Cereals",p:5.5},{n:"Vehicles",p:4.5}],extraction:[{n:"Ahvaz",lat:31.30,lng:48.70,r:"Oil"},{n:"South Pars",lat:26.90,lng:52.17,r:"Gas (world's largest)"},{n:"Sarcheshmeh",lat:29.96,lng:55.86,r:"Copper-Molybdenum"}],bases:[{n:"Bandar Abbas Naval",lat:27.18,lng:56.28,t:"Navy HQ Hormuz",f:0},{n:"Natanz Nuclear",lat:33.73,lng:51.73,t:"Enrichment",f:0},{n:"Fordow",lat:34.88,lng:50.99,t:"Underground enrichment",f:0}]},

"682":{exports:[{n:"Crude Oil",p:65.0},{n:"Refined Petroleum",p:11.0},{n:"Petrochemicals",p:5.5},{n:"Plastics",p:5.0}],imports:[{n:"Cars",p:6.5},{n:"Machinery",p:5.0}],extraction:[{n:"Ghawar",lat:25.43,lng:49.78,r:"Oil (world's largest)"},{n:"Safaniya",lat:28.0,lng:48.5,r:"Oil offshore"},{n:"Khurais",lat:25.16,lng:48.10,r:"Oil"}],bases:[{n:"Prince Sultan AB",lat:24.06,lng:47.58,t:"USAF host",f:0}]},

"784":{exports:[{n:"Crude Oil",p:23.5},{n:"Gold",p:14.0},{n:"Refined Petroleum",p:6.5}],imports:[{n:"Gold",p:13.0},{n:"Jewelry",p:5.5},{n:"Cars",p:5.0}],extraction:[{n:"Murban",lat:23.85,lng:54.50,r:"Oil"},{n:"Upper Zakum",lat:24.92,lng:53.42,r:"Oil offshore"}],bases:[{n:"Al Dhafra AB",lat:24.25,lng:54.55,t:"USAF host",f:0},{n:"Jebel Ali Port",lat:25.0,lng:55.0,t:"USN port visits",f:0}]},

"634":{exports:[{n:"LNG",p:38.0},{n:"Crude Oil",p:24.0},{n:"Petrochemicals",p:8.5}],imports:[{n:"Cars",p:8.0},{n:"Aircraft",p:6.5}],extraction:[{n:"North Field",lat:25.65,lng:51.55,r:"Natural Gas (world's largest)"}],bases:[{n:"Al Udeid AB",lat:25.12,lng:51.32,t:"USAF CENTCOM forward",f:0}]},

"414":{exports:[{n:"Crude Oil",p:78.0},{n:"Refined Petroleum",p:9.5}],imports:[{n:"Cars",p:14.5},{n:"Telephones",p:3.5}],extraction:[{n:"Burgan",lat:29.0,lng:47.97,r:"Oil (super-giant)"}],bases:[{n:"Camp Arifjan",lat:29.0,lng:48.06,t:"US Army host",f:0},{n:"Ali Al Salem",lat:29.35,lng:47.52,t:"USAF host",f:0}]},

"48":{exports:[{n:"Aluminum",p:14.0},{n:"Refined Petroleum",p:14.0},{n:"Iron",p:6.5},{n:"Crude Oil",p:11.0}],imports:[{n:"Crude Oil",p:30.0},{n:"Cars",p:5.0}],extraction:[{n:"Awali",lat:26.05,lng:50.55,r:"Oil"},{n:"Alba Smelter",lat:26.18,lng:50.61,r:"Aluminum"}],bases:[{n:"NSA Bahrain",lat:26.21,lng:50.61,t:"USN Mid-East HQ",f:0}]},

"512":{exports:[{n:"Crude Oil",p:55.0},{n:"LNG",p:14.5},{n:"Refined Petroleum",p:6.5}],imports:[{n:"Cars",p:6.5},{n:"Refined Petroleum",p:5.0}],extraction:[{n:"Yibal",lat:22.20,lng:56.12,r:"Oil"},{n:"Khazzan",lat:21.43,lng:56.40,r:"Tight Gas (BP)"}],bases:[{n:"Duqm Port",lat:19.66,lng:57.71,t:"Naval (UK + India access)",f:0}]},

"887":{exports:[{n:"Crude Oil",p:38.0},{n:"Vegetables",p:11.5},{n:"Fish",p:8.0}],imports:[{n:"Wheat",p:13.0},{n:"Refined Petroleum",p:9.5}],extraction:[{n:"Marib",lat:15.45,lng:45.32,r:"Oil/Gas"}],bases:[]},

"400":{exports:[{n:"Phosphates",p:8.0},{n:"Potash",p:7.0},{n:"Pharmaceuticals",p:6.5},{n:"Apparel",p:18.5}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Cars",p:5.5}],extraction:[{n:"Al Abyad Phosphate",lat:31.20,lng:36.20,r:"Phosphate"},{n:"Arab Potash",lat:31.18,lng:35.55,r:"Potash"}],bases:[{n:"Muwaffaq Salti AB",lat:32.36,lng:36.18,t:"USAF host",f:0}]},

// North Africa
"818":{exports:[{n:"Refined Petroleum",p:13.5},{n:"Natural Gas",p:7.0},{n:"Gold",p:11.0},{n:"Cotton",p:1.5}],imports:[{n:"Wheat",p:6.5},{n:"Refined Petroleum",p:6.0},{n:"Crude Oil",p:5.0}],extraction:[{n:"Zohr Gas",lat:31.85,lng:32.27,r:"Natural Gas"},{n:"Sukari Gold",lat:25.20,lng:34.65,r:"Gold"}],bases:[{n:"Cairo HQ",lat:30.04,lng:31.24,t:"EAF HQ",f:0}]},

"788":{exports:[{n:"Insulated Wire",p:9.0},{n:"Olive Oil",p:6.5},{n:"Apparel",p:14.0},{n:"Phosphates",p:5.5}],imports:[{n:"Refined Petroleum",p:13.0},{n:"Cars",p:6.5}],extraction:[{n:"Gafsa Phosphate",lat:34.42,lng:8.78,r:"Phosphate"}],bases:[]},

"12":{exports:[{n:"Crude Oil",p:23.0},{n:"Natural Gas",p:35.0},{n:"Refined Petroleum",p:14.0},{n:"Ammonia",p:3.5}],imports:[{n:"Wheat",p:5.5},{n:"Pharmaceuticals",p:4.0},{n:"Cars",p:5.5}],extraction:[{n:"Hassi Messaoud",lat:31.69,lng:6.07,r:"Oil"},{n:"Hassi R'Mel",lat:32.93,lng:3.30,r:"Natural Gas"}],bases:[]},

"504":{exports:[{n:"Cars",p:14.5},{n:"Phosphates",p:5.5},{n:"Wires",p:5.5},{n:"Apparel",p:6.0},{n:"Fertilizers",p:8.0}],imports:[{n:"Crude Oil",p:7.0},{n:"Vehicle Parts",p:5.5}],extraction:[{n:"OCP Khouribga",lat:32.88,lng:-6.92,r:"Phosphate (world's largest)"},{n:"Bou Azzer",lat:30.55,lng:-6.85,r:"Cobalt-Silver"}],bases:[]},

"434":{exports:[{n:"Crude Oil",p:75.0},{n:"Natural Gas",p:11.0},{n:"Refined Petroleum",p:5.0}],imports:[{n:"Cars",p:6.0},{n:"Refined Petroleum",p:5.5}],extraction:[{n:"Sarir",lat:27.65,lng:22.50,r:"Oil"},{n:"Sharara",lat:27.55,lng:11.80,r:"Oil"}],bases:[]},

"729":{exports:[{n:"Gold",p:55.0},{n:"Sesame Seeds",p:8.5},{n:"Livestock",p:7.0}],imports:[{n:"Wheat",p:11.0},{n:"Refined Petroleum",p:8.0}],extraction:[{n:"Jebel Amir",lat:14.50,lng:25.40,r:"Gold (RSF-controlled)"}],bases:[]},

"728":{exports:[{n:"Crude Oil",p:88.0},{n:"Sesame",p:1.5}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Wheat",p:6.0}],extraction:[{n:"Heglig",lat:9.95,lng:29.40,r:"Oil"}],bases:[]},

"262":{exports:[{n:"Refined Petroleum",p:32.0},{n:"Cattle",p:8.5},{n:"Salt",p:5.0}],imports:[{n:"Refined Petroleum",p:11.0},{n:"Vehicles",p:5.5}],extraction:[],bases:[{n:"Camp Lemonnier",lat:11.55,lng:43.15,t:"US AFRICOM",f:0},{n:"Chinese Naval Support",lat:11.61,lng:43.07,t:"PLAN base",f:1},{n:"FFDj French",lat:11.55,lng:43.15,t:"French Forces",f:1}]},

"232":{exports:[{n:"Refined Copper",p:20.0},{n:"Zinc",p:25.0},{n:"Gold",p:13.0}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Wheat",p:11.0}],extraction:[{n:"Bisha",lat:15.71,lng:37.83,r:"Copper-Zinc-Gold"}],bases:[]},

"231":{exports:[{n:"Coffee",p:32.0},{n:"Cut Flowers",p:11.0},{n:"Sesame",p:7.5},{n:"Khat",p:4.0}],imports:[{n:"Aircraft",p:13.0},{n:"Refined Petroleum",p:11.0}],extraction:[{n:"Lega Dembi",lat:5.92,lng:38.85,r:"Gold"}],bases:[]},

"706":{exports:[{n:"Livestock",p:65.0},{n:"Sesame",p:8.0},{n:"Charcoal",p:5.0}],imports:[{n:"Refined Petroleum",p:13.0},{n:"Sugar",p:6.5}],extraction:[],bases:[{n:"Mogadishu",lat:2.02,lng:45.30,t:"AU/UN/Turkish",f:0},{n:"Baledogle",lat:2.85,lng:45.09,t:"US Special Ops",f:0}]},

// Sub-Saharan
"404":{exports:[{n:"Tea",p:18.0},{n:"Cut Flowers",p:11.0},{n:"Coffee",p:5.5},{n:"Refined Petroleum",p:5.0}],imports:[{n:"Refined Petroleum",p:18.0},{n:"Vehicles",p:6.0}],extraction:[{n:"Kwale Titanium",lat:-4.18,lng:39.44,r:"Titanium-Zircon"}],bases:[{n:"Manda Bay",lat:-2.25,lng:40.92,t:"US Counter-piracy",f:0}]},

"834":{exports:[{n:"Gold",p:35.0},{n:"Cashews",p:7.0},{n:"Tobacco",p:5.5},{n:"Coffee",p:4.5},{n:"Tanzanite",p:2.0}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Vehicles",p:6.5}],extraction:[{n:"Bulyanhulu",lat:-3.20,lng:32.50,r:"Gold (Barrick)"},{n:"Mwadui",lat:-3.55,lng:33.62,r:"Diamonds"}],bases:[]},

"800":{exports:[{n:"Coffee",p:18.0},{n:"Gold",p:14.0},{n:"Fish",p:5.5},{n:"Cocoa",p:4.0}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Vehicles",p:6.0}],extraction:[{n:"Kibale Oil",lat:1.22,lng:30.65,r:"Oil (TotalEnergies)"}],bases:[]},

"646":{exports:[{n:"Gold",p:31.0},{n:"Coffee",p:8.0},{n:"Tea",p:6.5},{n:"Tin Ore",p:4.5},{n:"Coltan",p:5.5}],imports:[{n:"Refined Petroleum",p:13.0},{n:"Vehicles",p:5.0}],extraction:[{n:"Rutongo",lat:-1.78,lng:30.05,r:"Tin"}],bases:[]},

"108":{exports:[{n:"Gold",p:34.0},{n:"Coffee",p:24.0},{n:"Tea",p:8.0}],imports:[{n:"Refined Petroleum",p:18.0},{n:"Cement",p:7.0}],extraction:[],bases:[]},

"180":{exports:[{n:"Cobalt",p:13.0},{n:"Refined Copper",p:55.0},{n:"Diamonds",p:2.5},{n:"Crude Oil",p:8.0}],imports:[{n:"Vehicles",p:6.5},{n:"Refined Petroleum",p:11.0}],extraction:[{n:"Tenke Fungurume",lat:-10.58,lng:26.13,r:"Cobalt-Copper (CMOC)"},{n:"Kamoa-Kakula",lat:-10.81,lng:25.41,r:"Copper (Ivanhoe)"},{n:"Mutanda",lat:-10.62,lng:26.20,r:"Cobalt-Copper (Glencore)"},{n:"Kibali",lat:3.10,lng:29.55,r:"Gold (Barrick)"}],bases:[]},

"178":{exports:[{n:"Crude Oil",p:62.0},{n:"Refined Copper",p:11.0},{n:"Wood",p:5.5}],imports:[{n:"Vehicles",p:7.0},{n:"Wheat",p:5.5}],extraction:[{n:"Moho-Bilondo",lat:-4.85,lng:11.0,r:"Oil offshore"}],bases:[]},

"140":{exports:[{n:"Diamonds",p:31.0},{n:"Wood",p:18.0},{n:"Gold",p:11.0},{n:"Cotton",p:6.0}],imports:[{n:"Refined Petroleum",p:11.0},{n:"Pharmaceuticals",p:5.5}],extraction:[{n:"Bria",lat:6.55,lng:21.97,r:"Diamonds"},{n:"Bambari",lat:5.77,lng:20.66,r:"Gold (Wagner)"}],bases:[{n:"Wagner/Africa Corps",lat:4.36,lng:18.55,t:"Russian PMC",f:1}]},

"120":{exports:[{n:"Crude Oil",p:38.0},{n:"Cocoa",p:14.0},{n:"Wood",p:8.5},{n:"Bananas",p:3.0}],imports:[{n:"Refined Petroleum",p:9.5},{n:"Cars",p:5.0}],extraction:[{n:"Rio Del Rey",lat:4.50,lng:8.50,r:"Oil offshore"}],bases:[]},

"566":{exports:[{n:"Crude Oil",p:75.0},{n:"LNG",p:11.0},{n:"Cocoa",p:1.5}],imports:[{n:"Refined Petroleum",p:24.0},{n:"Wheat",p:5.5}],extraction:[{n:"Bonny Field",lat:4.45,lng:7.17,r:"Oil/LNG (Shell)"},{n:"Niger Delta",lat:5.0,lng:6.0,r:"Oil"}],bases:[{n:"Lagos Naval",lat:6.45,lng:3.40,t:"Navy HQ",f:0},{n:"Maiduguri AB",lat:11.85,lng:13.08,t:"Counter Boko Haram",f:0}]},

"288":{exports:[{n:"Gold",p:42.0},{n:"Crude Oil",p:14.5},{n:"Cocoa",p:11.0}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Cars",p:5.0}],extraction:[{n:"Obuasi",lat:6.20,lng:-1.66,r:"Gold (AngloGold)"},{n:"Tarkwa",lat:5.30,lng:-1.99,r:"Gold"},{n:"Jubilee Field",lat:4.80,lng:-2.85,r:"Oil offshore"}],bases:[]},

"384":{exports:[{n:"Cocoa Beans",p:25.0},{n:"Gold",p:13.0},{n:"Refined Petroleum",p:8.5},{n:"Crude Oil",p:5.5},{n:"Rubber",p:5.0}],imports:[{n:"Refined Petroleum",p:13.0},{n:"Cars",p:6.0}],extraction:[{n:"Tongon",lat:9.78,lng:-5.83,r:"Gold (Barrick)"}],bases:[{n:"Port-Bouët",lat:5.27,lng:-3.93,t:"French Forces",f:1}]},

"686":{exports:[{n:"Refined Petroleum",p:11.0},{n:"Gold",p:14.0},{n:"Phosphoric Acid",p:5.0},{n:"Frozen Fish",p:6.5}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Rice",p:5.0}],extraction:[{n:"Sabodala",lat:13.40,lng:-12.32,r:"Gold"}],bases:[]},

"466":{exports:[{n:"Gold",p:64.0},{n:"Cotton",p:14.0},{n:"Livestock",p:5.5}],imports:[{n:"Refined Petroleum",p:21.0},{n:"Vehicles",p:5.5}],extraction:[{n:"Loulo-Gounkoto",lat:13.0,lng:-11.45,r:"Gold (Barrick)"}],bases:[{n:"Africa Corps",lat:12.65,lng:-8.0,t:"Russian Africa Corps",f:1}]},

"854":{exports:[{n:"Gold",p:78.0},{n:"Cotton",p:8.0}],imports:[{n:"Refined Petroleum",p:18.0},{n:"Vehicles",p:6.0}],extraction:[{n:"Essakane",lat:14.78,lng:-1.05,r:"Gold (IAMGOLD)"}],bases:[{n:"Africa Corps",lat:12.37,lng:-1.52,t:"Russian Africa Corps",f:1}]},

"562":{exports:[{n:"Gold",p:32.0},{n:"Uranium",p:38.0},{n:"Crude Oil",p:11.0}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Cars",p:6.5}],extraction:[{n:"Arlit Uranium",lat:18.74,lng:7.40,r:"Uranium (Orano)"},{n:"Imouraren",lat:18.0,lng:7.95,r:"Uranium (paused)"}],bases:[]},

"148":{exports:[{n:"Crude Oil",p:67.0},{n:"Gold",p:11.0},{n:"Livestock",p:5.5}],imports:[{n:"Refined Petroleum",p:8.0},{n:"Cars",p:5.5}],extraction:[{n:"Doba Basin",lat:8.65,lng:16.85,r:"Oil"}],bases:[]},

"204":{exports:[{n:"Cotton",p:30.0},{n:"Cashew Nuts",p:14.0},{n:"Gold",p:5.5}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Rice",p:11.0}],extraction:[],bases:[]},

"768":{exports:[{n:"Refined Petroleum",p:8.0},{n:"Phosphates",p:13.0},{n:"Cement",p:5.0},{n:"Cotton",p:7.0}],imports:[{n:"Refined Petroleum",p:11.0},{n:"Vehicles",p:6.0}],extraction:[{n:"Hahotoé",lat:6.43,lng:1.13,r:"Phosphate"}],bases:[]},

"270":{exports:[{n:"Gold",p:35.0},{n:"Cashew Nuts",p:11.0},{n:"Cotton",p:6.5}],imports:[{n:"Refined Petroleum",p:11.0},{n:"Rice",p:8.5}],extraction:[],bases:[]},

"324":{exports:[{n:"Bauxite",p:42.0},{n:"Gold",p:34.0},{n:"Aluminum Oxide",p:8.0}],imports:[{n:"Refined Petroleum",p:18.0},{n:"Rice",p:8.0}],extraction:[{n:"Sangaredi",lat:11.13,lng:-13.80,r:"Bauxite (CBG)"},{n:"Simandou",lat:8.50,lng:-9.0,r:"Iron Ore (planned)"}],bases:[]},

"624":{exports:[{n:"Cashew Nuts",p:80.0},{n:"Wood",p:5.5},{n:"Fish",p:4.0}],imports:[{n:"Rice",p:14.0},{n:"Refined Petroleum",p:11.0}],extraction:[],bases:[]},

"132":{exports:[{n:"Footwear",p:14.0},{n:"Apparel",p:13.0},{n:"Fish",p:8.5}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Cars",p:6.0}],extraction:[],bases:[]},

"430":{exports:[{n:"Iron Ore",p:55.0},{n:"Crude Rubber",p:14.0},{n:"Gold",p:11.0}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Vehicles",p:5.5}],extraction:[{n:"Bong Mines",lat:6.80,lng:-9.92,r:"Iron Ore"},{n:"Yekepa",lat:7.55,lng:-8.55,r:"Iron Ore (ArcelorMittal)"}],bases:[]},

"694":{exports:[{n:"Diamonds",p:14.0},{n:"Iron Ore",p:14.0},{n:"Titanium Ore",p:13.0}],imports:[{n:"Refined Petroleum",p:13.0},{n:"Rice",p:11.0}],extraction:[{n:"Marampa",lat:8.78,lng:-12.43,r:"Iron Ore"},{n:"Sierra Rutile",lat:7.95,lng:-12.32,r:"Titanium Ore"}],bases:[]},

"450":{exports:[{n:"Vanilla",p:14.0},{n:"Nickel",p:11.0},{n:"Cobalt",p:7.0},{n:"Cloves",p:4.5}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Rice",p:7.0}],extraction:[{n:"Ambatovy",lat:-18.83,lng:48.30,r:"Nickel-Cobalt"},{n:"Fort Dauphin",lat:-25.02,lng:46.99,r:"Ilmenite (Rio Tinto)"}],bases:[]},

"508":{exports:[{n:"Coal",p:18.0},{n:"Aluminum",p:21.0},{n:"Heavy Sands",p:11.0}],imports:[{n:"Aluminum Oxide",p:9.0},{n:"Refined Petroleum",p:11.0}],extraction:[{n:"Mozal Aluminum",lat:-25.93,lng:32.55,r:"Aluminum smelter"},{n:"Rovuma Basin",lat:-11.0,lng:40.5,r:"Natural Gas (TotalEnergies)"},{n:"Moatize",lat:-16.10,lng:33.73,r:"Coking Coal"}],bases:[]},

"894":{exports:[{n:"Refined Copper",p:73.0},{n:"Copper Ore",p:6.5},{n:"Sulfuric Acid",p:2.5}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Vehicles",p:6.5}],extraction:[{n:"Kansanshi",lat:-12.07,lng:26.43,r:"Copper-Gold (FQM)"},{n:"Lumwana",lat:-12.13,lng:25.12,r:"Copper (Barrick)"},{n:"Mopani",lat:-12.85,lng:28.20,r:"Copper-Cobalt"}],bases:[]},

"716":{exports:[{n:"Gold",p:38.0},{n:"Tobacco",p:24.0},{n:"Platinum",p:11.0}],imports:[{n:"Refined Petroleum",p:11.0},{n:"Vehicles",p:5.5}],extraction:[{n:"Marange",lat:-18.93,lng:32.30,r:"Diamonds"},{n:"Great Dyke",lat:-17.95,lng:30.50,r:"Platinum (Zimplats)"}],bases:[]},

"710":{exports:[{n:"Platinum",p:11.0},{n:"Gold",p:9.0},{n:"Iron Ore",p:8.0},{n:"Coal",p:7.5},{n:"Cars",p:5.5}],imports:[{n:"Crude Oil",p:11.0},{n:"Cars",p:5.0},{n:"Refined Petroleum",p:5.5}],extraction:[{n:"Bushveld",lat:-24.50,lng:30.0,r:"Platinum (world's largest)"},{n:"Witwatersrand",lat:-26.20,lng:27.50,r:"Gold (historic)"},{n:"Sishen",lat:-27.78,lng:22.99,r:"Iron Ore (Kumba)"}],bases:[{n:"Simon's Town",lat:-34.19,lng:18.43,t:"Navy HQ",f:0},{n:"Waterkloof AB",lat:-25.83,lng:28.22,t:"SAAF",f:0}]},

"426":{exports:[{n:"Apparel",p:42.0},{n:"Diamonds",p:18.0},{n:"Water",p:11.0}],imports:[{n:"Refined Petroleum",p:8.5},{n:"Cement",p:5.0}],extraction:[{n:"Letšeng",lat:-29.0,lng:28.85,r:"Diamonds (premium)"}],bases:[]},

"748":{exports:[{n:"Sugar",p:25.0},{n:"Apparel",p:14.0},{n:"Wood",p:13.0}],imports:[{n:"Refined Petroleum",p:11.0},{n:"Vehicles",p:5.5}],extraction:[],bases:[]},

"72":{exports:[{n:"Diamonds",p:84.0},{n:"Gold",p:1.5},{n:"Beef",p:1.5}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Vehicles",p:8.0}],extraction:[{n:"Jwaneng",lat:-24.50,lng:24.72,r:"Diamonds (Debswana)"},{n:"Orapa",lat:-21.30,lng:25.37,r:"Diamonds"}],bases:[]},

"516":{exports:[{n:"Diamonds",p:18.0},{n:"Uranium",p:18.0},{n:"Gold",p:11.0},{n:"Fish",p:8.0}],imports:[{n:"Refined Petroleum",p:11.0},{n:"Vehicles",p:6.5}],extraction:[{n:"Rössing",lat:-22.50,lng:15.05,r:"Uranium"},{n:"Husab",lat:-22.55,lng:15.0,r:"Uranium"}],bases:[]},

"266":{exports:[{n:"Crude Oil",p:75.0},{n:"Manganese",p:11.0},{n:"Wood",p:6.5}],imports:[{n:"Vehicles",p:11.0},{n:"Refined Petroleum",p:5.5}],extraction:[{n:"Rabi-Kounga",lat:-1.92,lng:9.92,r:"Oil"},{n:"Moanda",lat:-1.55,lng:13.20,r:"Manganese (Eramet)"}],bases:[{n:"Camp De Gaulle",lat:0.46,lng:9.41,t:"French Forces",f:1}]},

"226":{exports:[{n:"Crude Oil",p:62.0},{n:"LNG",p:18.0},{n:"Methanol",p:5.5}],imports:[{n:"Vehicles",p:11.0},{n:"Refined Petroleum",p:6.5}],extraction:[{n:"Zafiro",lat:1.10,lng:8.55,r:"Oil offshore"}],bases:[]},

"24":{exports:[{n:"Crude Oil",p:88.0},{n:"Diamonds",p:5.0}],imports:[{n:"Refined Petroleum",p:11.0},{n:"Vehicles",p:6.5}],extraction:[{n:"Block 17",lat:-7.50,lng:11.50,r:"Oil (TotalEnergies)"},{n:"Catoca",lat:-9.42,lng:20.30,r:"Diamonds"}],bases:[]},

"454":{exports:[{n:"Tobacco",p:42.0},{n:"Tea",p:8.0},{n:"Sugar",p:7.5}],imports:[{n:"Refined Petroleum",p:13.0},{n:"Pharmaceuticals",p:5.5}],extraction:[],bases:[]},

"480":{exports:[{n:"Refined Petroleum",p:11.0},{n:"Sugar",p:7.0},{n:"Apparel",p:14.0},{n:"Fish",p:8.5}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Cars",p:6.5}],extraction:[],bases:[]},

"174":{exports:[{n:"Cloves",p:38.0},{n:"Vanilla",p:14.0},{n:"Ylang-Ylang",p:8.0}],imports:[{n:"Rice",p:18.0},{n:"Refined Petroleum",p:13.0}],extraction:[],bases:[]},

"690":{exports:[{n:"Refined Petroleum",p:42.0},{n:"Tuna",p:18.0},{n:"Frozen Fish",p:11.0}],imports:[{n:"Crude Oil",p:13.0},{n:"Refined Petroleum",p:11.0}],extraction:[],bases:[]},

// Latin America
"32":{exports:[{n:"Soybean Meal",p:8.5},{n:"Corn",p:9.0},{n:"Soybean Oil",p:6.5},{n:"Beef",p:4.5},{n:"Wheat",p:4.5},{n:"Crude Oil",p:5.0}],imports:[{n:"Vehicles",p:7.5},{n:"Vehicle Parts",p:5.0},{n:"Refined Petroleum",p:4.5}],extraction:[{n:"Vaca Muerta",lat:-37.85,lng:-69.0,r:"Shale Oil/Gas"},{n:"Salar del Hombre Muerto",lat:-25.40,lng:-67.05,r:"Lithium"}],bases:[]},

"152":{exports:[{n:"Refined Copper",p:25.0},{n:"Copper Ore",p:25.0},{n:"Lithium",p:5.5},{n:"Salmon",p:5.5},{n:"Wood",p:3.5}],imports:[{n:"Refined Petroleum",p:8.5},{n:"Cars",p:5.0}],extraction:[{n:"Escondida",lat:-24.27,lng:-69.07,r:"Copper (world's largest, BHP)"},{n:"Chuquicamata",lat:-22.30,lng:-68.93,r:"Copper (Codelco)"},{n:"Salar de Atacama",lat:-23.50,lng:-68.25,r:"Lithium (SQM/Albemarle)"}],bases:[]},

"170":{exports:[{n:"Crude Oil",p:31.0},{n:"Coal",p:13.5},{n:"Gold",p:6.0},{n:"Coffee",p:4.5},{n:"Cut Flowers",p:3.5}],imports:[{n:"Refined Petroleum",p:7.5},{n:"Cars",p:4.5}],extraction:[{n:"Cusiana-Cupiagua",lat:5.05,lng:-72.65,r:"Oil"},{n:"Cerrejón",lat:11.10,lng:-72.55,r:"Coal"},{n:"Buriticá",lat:6.72,lng:-75.91,r:"Gold (Zijin)"}],bases:[{n:"Tolemaida",lat:4.30,lng:-74.65,t:"Army Special Ops",f:0}]},

"862":{exports:[{n:"Crude Oil",p:81.0},{n:"Iron Ore",p:5.0},{n:"Refined Petroleum",p:4.0}],imports:[{n:"Refined Petroleum",p:18.0},{n:"Cars",p:6.5}],extraction:[{n:"Orinoco Belt",lat:9.0,lng:-65.0,r:"Heavy Oil (largest reserves)"}],bases:[]},

"218":{exports:[{n:"Crude Oil",p:32.0},{n:"Bananas",p:14.0},{n:"Shrimp",p:14.0},{n:"Cocoa",p:5.0}],imports:[{n:"Refined Petroleum",p:18.0},{n:"Cars",p:5.0}],extraction:[{n:"Block 16 (Auca)",lat:-1.10,lng:-77.0,r:"Oil"},{n:"Mirador Copper",lat:-3.55,lng:-78.42,r:"Copper (Chinese)"}],bases:[]},

"604":{exports:[{n:"Copper Ore",p:24.0},{n:"Refined Copper",p:13.0},{n:"Gold",p:11.0},{n:"Refined Petroleum",p:5.0}],imports:[{n:"Refined Petroleum",p:11.0},{n:"Cars",p:6.5}],extraction:[{n:"Antamina",lat:-9.55,lng:-77.05,r:"Copper-Zinc"},{n:"Cerro Verde",lat:-16.55,lng:-71.60,r:"Copper (Freeport)"},{n:"Yanacocha",lat:-6.97,lng:-78.55,r:"Gold (Newmont)"}],bases:[]},

"68":{exports:[{n:"Natural Gas",p:24.0},{n:"Zinc",p:14.0},{n:"Gold",p:11.0},{n:"Tin",p:5.5},{n:"Silver",p:6.0}],imports:[{n:"Refined Petroleum",p:24.0},{n:"Vehicles",p:6.5}],extraction:[{n:"Salar de Uyuni",lat:-20.13,lng:-67.49,r:"Lithium (largest reserves)"},{n:"San Cristóbal",lat:-21.02,lng:-67.20,r:"Silver-Zinc"}],bases:[]},

"600":{exports:[{n:"Soybeans",p:21.0},{n:"Electricity (Itaipu)",p:11.0},{n:"Beef",p:11.0},{n:"Soybean Meal",p:6.5}],imports:[{n:"Refined Petroleum",p:11.0},{n:"Vehicles",p:6.5}],extraction:[{n:"Itaipú",lat:-25.41,lng:-54.59,r:"Hydropower"}],bases:[]},

"858":{exports:[{n:"Beef",p:18.0},{n:"Cellulose",p:8.5},{n:"Soybeans",p:13.0},{n:"Dairy",p:5.0}],imports:[{n:"Refined Petroleum",p:11.0},{n:"Cars",p:6.0}],extraction:[],bases:[]},

"188":{exports:[{n:"Medical Equipment",p:25.0},{n:"Bananas",p:7.0},{n:"Pineapples",p:6.5},{n:"Coffee",p:3.5}],imports:[{n:"Refined Petroleum",p:7.5},{n:"Cars",p:5.0}],extraction:[],bases:[]},

"591":{exports:[{n:"Copper Ore",p:14.0},{n:"Refined Petroleum",p:7.0},{n:"Bananas",p:5.5}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Pharmaceuticals",p:5.5}],extraction:[{n:"Cobre Panamá",lat:8.83,lng:-80.62,r:"Copper (closed 2023)"}],bases:[]},

"222":{exports:[{n:"Apparel",p:42.0},{n:"Coffee",p:6.5},{n:"Sugar",p:5.5},{n:"Iron",p:3.5}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Vehicles",p:5.0}],extraction:[],bases:[]},

"340":{exports:[{n:"Apparel",p:42.0},{n:"Coffee",p:14.0},{n:"Bananas",p:6.0},{n:"Palm Oil",p:5.5}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Vehicles",p:5.5}],extraction:[],bases:[{n:"Soto Cano",lat:14.38,lng:-87.62,t:"US JTF-Bravo host",f:1}]},

"320":{exports:[{n:"Coffee",p:13.0},{n:"Apparel",p:11.0},{n:"Bananas",p:11.0},{n:"Cardamom",p:5.0}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Vehicles",p:5.5}],extraction:[],bases:[]},

"558":{exports:[{n:"Apparel",p:18.0},{n:"Coffee",p:11.0},{n:"Beef",p:13.0},{n:"Gold",p:6.5}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Cars",p:5.5}],extraction:[],bases:[]},

"84":{exports:[{n:"Sugar",p:18.0},{n:"Bananas",p:11.0},{n:"Crude Oil",p:5.5}],imports:[{n:"Refined Petroleum",p:18.0},{n:"Vehicles",p:5.0}],extraction:[],bases:[]},

// Caribbean
"192":{exports:[{n:"Cigars",p:18.0},{n:"Sugar",p:8.0},{n:"Nickel",p:13.0},{n:"Tobacco",p:7.0}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Wheat",p:6.5}],extraction:[{n:"Moa Bay",lat:20.65,lng:-74.95,r:"Nickel-Cobalt"}],bases:[]},

"214":{exports:[{n:"Gold",p:13.0},{n:"Cigars",p:9.0},{n:"Medical Devices",p:8.0}],imports:[{n:"Refined Petroleum",p:13.0},{n:"Cars",p:5.0}],extraction:[{n:"Pueblo Viejo",lat:19.05,lng:-70.18,r:"Gold (Barrick, largest in Americas)"}],bases:[]},

"332":{exports:[{n:"Apparel",p:75.0},{n:"Cocoa",p:5.5}],imports:[{n:"Refined Petroleum",p:18.0},{n:"Rice",p:8.0}],extraction:[],bases:[]},

"388":{exports:[{n:"Aluminum Oxide",p:14.0},{n:"Bauxite",p:13.0}],imports:[{n:"Refined Petroleum",p:18.0},{n:"Cars",p:5.0}],extraction:[{n:"Discovery Bay",lat:18.46,lng:-77.41,r:"Bauxite"}],bases:[]},

"780":{exports:[{n:"Crude Oil",p:21.0},{n:"LNG",p:35.0},{n:"Methanol",p:8.5},{n:"Ammonia",p:6.0}],imports:[{n:"Cars",p:11.0},{n:"Pharmaceuticals",p:5.0}],extraction:[{n:"Atlantic LNG",lat:10.10,lng:-61.65,r:"LNG"}],bases:[]},

"44":{exports:[{n:"Refined Petroleum",p:21.0},{n:"Crustaceans",p:11.0}],imports:[{n:"Crude Oil",p:11.0},{n:"Vehicles",p:6.5}],extraction:[],bases:[]},

"28":{exports:[{n:"Refined Petroleum",p:21.0},{n:"Aircraft Parts",p:11.0}],imports:[{n:"Refined Petroleum",p:18.0},{n:"Cars",p:6.5}],extraction:[],bases:[]},

"212":{exports:[{n:"Bananas",p:24.0},{n:"Soap",p:18.0}],imports:[{n:"Refined Petroleum",p:18.0}],extraction:[],bases:[]},
"308":{exports:[{n:"Nutmeg",p:11.0},{n:"Cocoa",p:5.5},{n:"Bananas",p:5.0}],imports:[{n:"Refined Petroleum",p:14.0}],extraction:[],bases:[]},
"662":{exports:[{n:"Bananas",p:21.0},{n:"Beer",p:11.0}],imports:[{n:"Refined Petroleum",p:14.0}],extraction:[],bases:[]},
"670":{exports:[{n:"Bananas",p:18.0},{n:"Flour",p:11.0}],imports:[{n:"Refined Petroleum",p:14.0}],extraction:[],bases:[]},
"52":{exports:[{n:"Refined Petroleum",p:14.0},{n:"Insurance",p:18.0}],imports:[{n:"Refined Petroleum",p:13.0},{n:"Cars",p:5.5}],extraction:[],bases:[]},
"659":{exports:[{n:"Tourism",p:42.0},{n:"Sugar",p:8.0}],imports:[{n:"Refined Petroleum",p:18.0}],extraction:[],bases:[]},

// Oceania
"598":{exports:[{n:"LNG",p:25.0},{n:"Gold",p:24.0},{n:"Refined Copper",p:14.0},{n:"Coffee",p:5.0}],imports:[{n:"Refined Petroleum",p:14.0},{n:"Vehicles",p:6.5}],extraction:[{n:"PNG LNG",lat:-9.0,lng:147.0,r:"LNG (ExxonMobil)"},{n:"Porgera",lat:-5.45,lng:143.13,r:"Gold (Barrick)"},{n:"OK Tedi",lat:-5.20,lng:141.13,r:"Copper-Gold"}],bases:[{n:"Lombrum Naval Manus",lat:-2.07,lng:147.42,t:"Joint US/AU/PNG",f:0}]},

"242":{exports:[{n:"Refined Petroleum",p:8.0},{n:"Sugar",p:5.5},{n:"Fish",p:7.0},{n:"Water",p:4.5}],imports:[{n:"Refined Petroleum",p:21.0},{n:"Vehicles",p:6.5}],extraction:[{n:"Vatukoula",lat:-17.50,lng:177.85,r:"Gold"}],bases:[]},

"548":{exports:[{n:"Vanilla",p:11.0},{n:"Beef",p:14.0},{n:"Coconut Oil",p:21.0}],imports:[{n:"Refined Petroleum",p:11.0}],extraction:[],bases:[]},

"90":{exports:[{n:"Wood",p:50.0},{n:"Fish",p:11.0},{n:"Palm Oil",p:6.5}],imports:[{n:"Refined Petroleum",p:14.0}],extraction:[],bases:[]},

"585":{exports:[{n:"Tuna",p:38.0}],imports:[{n:"Refined Petroleum",p:13.0}],extraction:[],bases:[]},
"583":{exports:[{n:"Tuna",p:42.0}],imports:[{n:"Refined Petroleum",p:14.0}],extraction:[],bases:[]},
"584":{exports:[{n:"Tuna",p:42.0}],imports:[{n:"Refined Petroleum",p:14.0}],extraction:[],bases:[{n:"Kwajalein",lat:9.39,lng:167.47,t:"US Army Garrison",f:1}]},
"296":{exports:[{n:"Coconut Oil",p:14.0},{n:"Tuna",p:38.0}],imports:[{n:"Refined Petroleum",p:11.0}],extraction:[],bases:[]},
"520":{exports:[{n:"Phosphates",p:32.0},{n:"Tuna License Fees",p:25.0}],imports:[{n:"Refined Petroleum",p:11.0}],extraction:[],bases:[]},
"798":{exports:[{n:".tv Royalties",p:5.0},{n:"Tuna License Fees",p:38.0}],imports:[{n:"Refined Petroleum",p:11.0}],extraction:[],bases:[]},
"776":{exports:[{n:"Squash",p:11.0},{n:"Vanilla",p:8.5},{n:"Tuna",p:14.0}],imports:[{n:"Refined Petroleum",p:13.0}],extraction:[],bases:[]},
"882":{exports:[{n:"Yellowfin Tuna",p:14.0},{n:"Beer",p:8.0}],imports:[{n:"Refined Petroleum",p:13.0}],extraction:[],bases:[]},
"540":{exports:[{n:"Nickel Ore",p:35.0},{n:"Ferronickel",p:21.0}],imports:[{n:"Refined Petroleum",p:14.0}],extraction:[{n:"Goro",lat:-22.30,lng:166.97,r:"Nickel-Cobalt"}],bases:[]},
"258":{exports:[{n:"Pearls",p:35.0},{n:"Vanilla",p:11.0}],imports:[{n:"Refined Petroleum",p:11.0}],extraction:[],bases:[]}

};

// Generic small-territory fallback (tourism-dependent micro-economies)
const TINY={
  exports:[{n:"Tourism",p:60.0},{n:"Fish",p:11.0},{n:"Refined Petroleum",p:5.0}],
  imports:[{n:"Refined Petroleum",p:18.0},{n:"Vehicles",p:6.5},{n:"Pharmaceuticals",p:4.0}]
};

// Apply curated data first
Object.keys(FILL).forEach(id=>{
  if(!COUNTRY_DB[id])COUNTRY_DB[id]={};
  const d=COUNTRY_DB[id],f=FILL[id];
  if(!d.exports&&f.exports)d.exports=f.exports;
  if(!d.imports&&f.imports)d.imports=f.imports;
  if(!d.extraction&&f.extraction)d.extraction=f.extraction;
  if(!d.bases&&f.bases)d.bases=f.bases;
});

// Then for ALL countries that still lack any of these fields, fill safe defaults
Object.keys(COUNTRY_DB).forEach(id=>{
  const d=COUNTRY_DB[id];
  if(!d.exports)d.exports=TINY.exports.slice();
  if(!d.imports)d.imports=TINY.imports.slice();
  if(!d.extraction)d.extraction=[];
  if(!d.bases)d.bases=[];
});

})();
