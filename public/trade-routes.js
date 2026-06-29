// GEOINT v8 — Major global trade routes (v2)
// Curved great-circle arcs + destinations + chokepoint convergence
window.TRADE_ROUTES = [

{id:"maritime_silk_road",name:"Maritime Silk Road (Asia→Europe)",type:"maritime",color:"#e3c04a",
description:"Primary China-Europe container artery. ~25% of world seaborne trade by value. Houthi attacks since Nov 2023 displaced most to Cape route.",
points:[{lat:31.22,lng:121.48,label:"Shanghai"},{lat:22.54,lng:114.06,label:"Shenzhen"},{lat:10.76,lng:106.66,label:"Ho Chi Minh"},{lat:1.29,lng:103.85,label:"Singapore/Malacca"},{lat:6.93,lng:79.86,label:"Colombo"},{lat:12.78,lng:45.03,label:"Aden"},{lat:12.58,lng:43.15,label:"Bab el-Mandeb"},{lat:27.23,lng:33.83,label:"Suez"},{lat:31.25,lng:32.31,label:"Port Said"},{lat:36.14,lng:14.26,label:"Malta"},{lat:36.13,lng:-5.35,label:"Gibraltar"},{lat:51.95,lng:4.13,label:"Rotterdam"}],
goods:[{n:"Electronics & smartphones",p:18},{n:"Machinery & industrial equipment",p:16},{n:"Textiles & apparel",p:12},{n:"Crude oil (W)",p:11},{n:"Automotive parts",p:9},{n:"Chemicals & plastics",p:8},{n:"Steel & metals",p:7},{n:"Agricultural products",p:6},{n:"Consumer goods",p:8},{n:"LNG & refined fuels",p:5}],
destinations:[{n:"Germany",p:22},{n:"Netherlands",p:14},{n:"United Kingdom",p:10},{n:"Italy",p:9},{n:"France",p:8},{n:"Belgium",p:7},{n:"Spain",p:6},{n:"Poland",p:5},{n:"Turkey",p:6},{n:"Eastern Europe",p:8},{n:"Scandinavia",p:5}]},

{id:"trans_pacific_east",name:"Trans-Pacific (Asia→North America)",type:"maritime",color:"#6b9e6f",
description:"Asia to US/Canada West Coast. LA/Long Beach + Oakland + Seattle + Vancouver. ~40% of US seaborne imports.",
points:[{lat:31.22,lng:121.48,label:"Shanghai"},{lat:35.10,lng:129.04,label:"Busan"},{lat:35.44,lng:139.64,label:"Yokohama"},{lat:45.0,lng:170.0,label:"N. Pacific"},{lat:49.29,lng:-123.12,label:"Vancouver"},{lat:47.60,lng:-122.33,label:"Seattle"},{lat:37.80,lng:-122.27,label:"Oakland"},{lat:33.77,lng:-118.19,label:"Long Beach / LA"}],
goods:[{n:"Consumer electronics",p:22},{n:"Toys & household goods",p:14},{n:"Machinery",p:12},{n:"Automobiles",p:11},{n:"Apparel & footwear",p:10},{n:"Furniture",p:7},{n:"Semiconductor equipment",p:6},{n:"Agricultural (E→W)",p:9},{n:"Chemicals",p:5},{n:"Refined fuels",p:4}],
destinations:[{n:"United States",p:72},{n:"Canada",p:13},{n:"Mexico (transship)",p:7},{n:"Central America",p:4},{n:"Caribbean",p:4}]},

{id:"trans_atlantic",name:"Trans-Atlantic (EU↔NA)",type:"maritime",color:"#305882",
description:"Europe-NA premium cargo + US LNG surge eastbound since 2022.",
points:[{lat:51.95,lng:4.13,label:"Rotterdam"},{lat:53.55,lng:9.99,label:"Hamburg"},{lat:50.90,lng:-1.40,label:"Southampton"},{lat:45.0,lng:-30.0,label:"Mid-Atlantic"},{lat:40.71,lng:-74.01,label:"New York"},{lat:36.85,lng:-76.28,label:"Norfolk"},{lat:32.08,lng:-81.09,label:"Savannah"}],
goods:[{n:"US LNG (→ EU)",p:22},{n:"Automobiles (EU → US)",p:16},{n:"Pharmaceuticals",p:12},{n:"Machinery",p:11},{n:"Chemicals",p:10},{n:"Agricultural (soy, wine)",p:9},{n:"Refined petroleum",p:7},{n:"Aerospace",p:6},{n:"Luxury goods",p:7}],
destinations:[{n:"Germany",p:24},{n:"Netherlands",p:18},{n:"France",p:11},{n:"United Kingdom",p:13},{n:"Italy",p:8},{n:"Spain",p:7},{n:"Belgium",p:7},{n:"Nordic",p:5},{n:"Eastern Europe",p:7}]},

{id:"cape_of_good_hope",name:"Cape of Good Hope (Asia→EU alt)",type:"maritime",color:"#c4a095",
description:"Suez alternative around Africa. Surged 2024 after Red Sea attacks. ~+10 days voyage.",
points:[{lat:1.29,lng:103.85,label:"Singapore"},{lat:-6.21,lng:106.85,label:"Jakarta"},{lat:-8.0,lng:80.0,label:"Indian Ocean"},{lat:-25.0,lng:40.0,label:"Mozambique Ch."},{lat:-34.10,lng:18.42,label:"Cape Town"},{lat:-33.92,lng:18.42,label:"Cape of Good Hope"},{lat:14.72,lng:-17.47,label:"Dakar"},{lat:28.28,lng:-16.64,label:"Canary Is."},{lat:36.13,lng:-5.35,label:"Gibraltar"},{lat:51.95,lng:4.13,label:"Rotterdam"}],
goods:[{n:"Containerized (Suez rerouted)",p:38},{n:"Crude oil (Gulf → EU/US)",p:20},{n:"Iron ore (AU → EU)",p:10},{n:"LNG",p:10},{n:"Grains",p:6},{n:"Chemicals",p:6},{n:"Automobiles",p:5},{n:"Refined petroleum",p:5}],
destinations:[{n:"Germany",p:22},{n:"Netherlands",p:15},{n:"United Kingdom",p:12},{n:"Italy",p:9},{n:"France",p:9},{n:"Spain",p:7},{n:"Belgium",p:6},{n:"Turkey",p:5},{n:"US East Coast",p:6},{n:"Morocco/N.Africa",p:4},{n:"Other EU",p:5}]},

{id:"gulf_to_asia",name:"Persian Gulf → East Asia (oil)",type:"maritime",color:"#c0392b",
description:"Core energy artery. Hormuz → Malacca → China/Japan/Korea/India. ~20% of world oil passes Hormuz, half continues east.",
points:[{lat:29.37,lng:47.98,label:"Kuwait"},{lat:26.22,lng:50.58,label:"Ras Tanura (SA)"},{lat:25.26,lng:55.30,label:"Dubai"},{lat:26.57,lng:56.52,label:"Hormuz"},{lat:18.95,lng:72.82,label:"Mumbai"},{lat:6.93,lng:79.86,label:"Colombo"},{lat:1.29,lng:103.85,label:"Singapore/Malacca"},{lat:10.0,lng:114.0,label:"South China Sea"},{lat:22.54,lng:114.06,label:"Shenzhen"},{lat:31.22,lng:121.48,label:"Shanghai"},{lat:35.10,lng:129.04,label:"Busan"},{lat:35.44,lng:139.64,label:"Yokohama"}],
goods:[{n:"Crude oil",p:58},{n:"LNG (Qatar → Asia)",p:22},{n:"Refined petroleum",p:10},{n:"Petrochemicals",p:6},{n:"Aluminum",p:2},{n:"General cargo W-bound",p:2}],
destinations:[{n:"China",p:36},{n:"India",p:18},{n:"Japan",p:13},{n:"South Korea",p:12},{n:"Singapore (refining)",p:6},{n:"Taiwan",p:5},{n:"Thailand",p:3},{n:"Philippines",p:3},{n:"Vietnam",p:2},{n:"Indonesia",p:2}]},

{id:"gulf_to_europe",name:"Persian Gulf → Europe (oil, LNG)",type:"maritime",color:"#c0392b",
description:"Gulf hydrocarbons westbound via Hormuz → Bab el-Mandeb → Suez → Med. Qatar LNG critical post-Russia for European gas.",
points:[{lat:26.22,lng:50.58,label:"Ras Tanura"},{lat:25.34,lng:51.17,label:"Qatar LNG"},{lat:26.57,lng:56.52,label:"Hormuz"},{lat:23.61,lng:58.54,label:"Muscat"},{lat:12.78,lng:45.03,label:"Aden"},{lat:12.58,lng:43.15,label:"Bab el-Mandeb"},{lat:27.23,lng:33.83,label:"Suez"},{lat:31.25,lng:32.31,label:"Port Said"},{lat:37.75,lng:12.92,label:"Sicily Ch."},{lat:36.13,lng:-5.35,label:"Gibraltar"},{lat:51.95,lng:4.13,label:"Rotterdam"}],
goods:[{n:"Crude oil (Gulf → EU)",p:42},{n:"Qatar LNG → EU",p:26},{n:"Refined products",p:16},{n:"Petrochemicals",p:8},{n:"Aluminum",p:4},{n:"Fertilizers",p:4}],
destinations:[{n:"Italy",p:18},{n:"Netherlands",p:15},{n:"Spain",p:12},{n:"France",p:11},{n:"Germany",p:10},{n:"Belgium",p:8},{n:"Greece",p:6},{n:"United Kingdom",p:6},{n:"Turkey",p:7},{n:"Poland",p:4},{n:"Other EU",p:3}]},

{id:"panama_route",name:"Panama Canal Corridor",type:"maritime",color:"#9b59b6",
description:"Atlantic-Pacific shortcut for US East ↔ Asia & intra-Americas. ~5% of global trade. 2023-24 drought cut transits ~36%.",
points:[{lat:25.77,lng:-80.19,label:"Miami"},{lat:18.47,lng:-66.12,label:"San Juan"},{lat:9.39,lng:-79.92,label:"Colón"},{lat:9.08,lng:-79.92,label:"Gatun"},{lat:8.91,lng:-79.52,label:"Panama City"},{lat:-12.06,lng:-77.04,label:"Callao"},{lat:-33.05,lng:-71.62,label:"Valparaíso"},{lat:34.05,lng:-118.25,label:"Los Angeles"},{lat:31.22,lng:121.48,label:"Shanghai"}],
goods:[{n:"Asian manufactured (→ US East)",p:28},{n:"US grain (E → Asia)",p:20},{n:"Containers",p:18},{n:"LPG/LNG",p:10},{n:"Refined petroleum",p:7},{n:"Automobiles",p:7},{n:"Coal",p:5},{n:"Chemicals",p:5}],
destinations:[{n:"United States",p:48},{n:"China",p:18},{n:"Japan",p:8},{n:"South Korea",p:5},{n:"Chile",p:5},{n:"Peru",p:3},{n:"Ecuador",p:3},{n:"Mexico",p:4},{n:"Central America",p:3},{n:"Caribbean",p:3}]},

{id:"australia_asia_minerals",name:"Australia → Asia (minerals)",type:"maritime",color:"#b89a4a",
description:"Iron ore, coal, LNG, bauxite to East Asian mills. ~80% of China's iron ore.",
points:[{lat:-20.31,lng:118.58,label:"Port Hedland"},{lat:-22.69,lng:117.79,label:"Pilbara"},{lat:-17.97,lng:122.24,label:"Broome"},{lat:-12.46,lng:130.84,label:"Darwin"},{lat:-6.21,lng:106.85,label:"Jakarta"},{lat:5.54,lng:95.32,label:"Sumatra"},{lat:22.54,lng:114.06,label:"Shenzhen"},{lat:31.22,lng:121.48,label:"Shanghai"},{lat:35.44,lng:139.64,label:"Yokohama"},{lat:35.10,lng:129.04,label:"Busan"}],
goods:[{n:"Iron ore",p:44},{n:"LNG",p:22},{n:"Coking coal",p:14},{n:"Thermal coal",p:9},{n:"Bauxite & alumina",p:5},{n:"Copper concentrate",p:3},{n:"Lithium spodumene",p:2},{n:"Wheat & beef",p:1}],
destinations:[{n:"China",p:58},{n:"Japan",p:17},{n:"South Korea",p:14},{n:"Taiwan",p:5},{n:"India",p:3},{n:"Vietnam/SEA",p:3}]},

{id:"india_to_eu",name:"India → Europe",type:"maritime",color:"#ff6f00",
description:"Indian exports to EU via Arabian Sea → Bab el-Mandeb → Suez. Textiles, pharma generics, gems, IT, agri.",
points:[{lat:18.95,lng:72.82,label:"Mumbai"},{lat:9.93,lng:76.27,label:"Cochin"},{lat:12.92,lng:74.86,label:"Mangalore"},{lat:19.30,lng:62.0,label:"Arabian Sea"},{lat:12.78,lng:45.03,label:"Aden"},{lat:12.58,lng:43.15,label:"Bab el-Mandeb"},{lat:27.23,lng:33.83,label:"Suez"},{lat:36.14,lng:14.26,label:"Malta"},{lat:36.13,lng:-5.35,label:"Gibraltar"},{lat:51.95,lng:4.13,label:"Rotterdam"}],
goods:[{n:"Textiles & apparel",p:22},{n:"Pharmaceuticals (generics)",p:18},{n:"Gems & jewelry",p:13},{n:"Engineering goods",p:12},{n:"Chemicals",p:10},{n:"Basmati rice & agri",p:8},{n:"IT hardware",p:7},{n:"Iron ore & steel",p:6},{n:"Leather goods",p:4}],
destinations:[{n:"Germany",p:18},{n:"Netherlands",p:15},{n:"United Kingdom",p:14},{n:"Italy",p:11},{n:"Belgium",p:10},{n:"France",p:9},{n:"Spain",p:7},{n:"Poland",p:5},{n:"Turkey",p:6},{n:"Other EU",p:5}]},

{id:"us_lng",name:"US LNG Export Network",type:"maritime",color:"#6b9e6f",
description:"US Gulf LNG terminals → Europe & Asia. US became #1 LNG exporter 2023.",
points:[{lat:29.73,lng:-93.86,label:"Sabine Pass"},{lat:27.80,lng:-97.40,label:"Corpus Christi"},{lat:29.80,lng:-93.34,label:"Cameron"},{lat:28.95,lng:-95.36,label:"Freeport"},{lat:25.77,lng:-80.19,label:"Miami"},{lat:36.13,lng:-5.35,label:"Gibraltar"},{lat:51.95,lng:4.13,label:"Rotterdam"},{lat:51.51,lng:0.72,label:"Isle of Grain"},{lat:53.55,lng:9.99,label:"Brunsbüttel"},{lat:8.91,lng:-79.52,label:"Panama (Asia)"},{lat:31.22,lng:121.48,label:"Shanghai"},{lat:35.44,lng:139.64,label:"Yokohama"}],
goods:[{n:"LNG",p:98},{n:"LPG",p:2}],
destinations:[{n:"Netherlands",p:18},{n:"France",p:14},{n:"United Kingdom",p:12},{n:"Spain",p:9},{n:"Germany",p:8},{n:"Italy",p:6},{n:"Poland",p:5},{n:"Japan",p:9},{n:"South Korea",p:7},{n:"China",p:6},{n:"India",p:4},{n:"Taiwan",p:2}]},

{id:"russia_asia_oil",name:"Russian Oil → Asia (sanctions era)",type:"maritime",color:"#8b3232",
description:"Post-2022 shadow-fleet redirection. Baltic/Black Sea tankers + Pacific ESPO to India + China.",
points:[{lat:59.93,lng:30.34,label:"Ust-Luga"},{lat:44.60,lng:33.52,label:"Novorossiysk"},{lat:41.21,lng:29.12,label:"Bosphorus"},{lat:40.22,lng:26.41,label:"Dardanelles"},{lat:36.14,lng:14.26,label:"Med"},{lat:36.13,lng:-5.35,label:"Gibraltar"},{lat:-34.10,lng:18.42,label:"Cape Town"},{lat:18.95,lng:72.82,label:"Mumbai/Jamnagar"},{lat:43.12,lng:131.88,label:"Kozmino"},{lat:31.22,lng:121.48,label:"Shanghai"}],
goods:[{n:"Urals crude",p:62},{n:"ESPO crude",p:20},{n:"Refined petroleum",p:12},{n:"LPG",p:4},{n:"Coal",p:2}],
destinations:[{n:"India",p:38},{n:"China",p:45},{n:"Turkey",p:10},{n:"UAE",p:4},{n:"Other Asia",p:3}]},

{id:"black_sea_grain",name:"Black Sea Grain (UA/RU → world)",type:"maritime",color:"#e3c04a",
description:"Ukrainian + Russian grain via Odesa/Novorossiysk → Bosphorus → world. MENA food-security critical.",
points:[{lat:46.49,lng:30.74,label:"Odesa"},{lat:46.58,lng:31.98,label:"Chornomorsk"},{lat:44.60,lng:33.52,label:"Novorossiysk"},{lat:45.35,lng:36.47,label:"Kerch"},{lat:41.21,lng:29.12,label:"Bosphorus"},{lat:40.22,lng:26.41,label:"Dardanelles"},{lat:36.75,lng:3.06,label:"Algiers"},{lat:31.20,lng:29.92,label:"Alexandria"},{lat:22.83,lng:39.53,label:"Jeddah"},{lat:12.58,lng:43.15,label:"Bab el-Mandeb"},{lat:1.29,lng:103.85,label:"Singapore"}],
goods:[{n:"Wheat",p:36},{n:"Corn/maize",p:30},{n:"Sunflower oil",p:16},{n:"Barley",p:8},{n:"Rapeseed/soy",p:6},{n:"Fertilizers",p:4}],
destinations:[{n:"Egypt",p:16},{n:"Turkey",p:12},{n:"China",p:11},{n:"Bangladesh",p:6},{n:"Indonesia",p:6},{n:"Pakistan",p:5},{n:"Saudi Arabia",p:5},{n:"Algeria",p:5},{n:"Morocco",p:4},{n:"Tunisia",p:3},{n:"Lebanon",p:3},{n:"Yemen",p:4},{n:"Sub-Saharan Africa",p:10},{n:"Philippines",p:3},{n:"Vietnam",p:3},{n:"Other",p:4}]},

{id:"brazil_china",name:"Brazil → China (soy/iron/beef)",type:"maritime",color:"#6b9e6f",
description:"Brazil's Santos/Paranaguá → Cape → Malacca → China. Primary agri+iron supplier to China.",
points:[{lat:-25.43,lng:-49.27,label:"Paranaguá"},{lat:-23.98,lng:-46.30,label:"Santos"},{lat:-22.91,lng:-43.17,label:"Rio"},{lat:-30.0,lng:0.0,label:"S. Atlantic"},{lat:-34.10,lng:18.42,label:"Cape of Good Hope"},{lat:-20.0,lng:80.0,label:"Indian Ocean"},{lat:1.29,lng:103.85,label:"Malacca"},{lat:22.54,lng:114.06,label:"Shenzhen"},{lat:31.22,lng:121.48,label:"Shanghai"},{lat:36.07,lng:120.33,label:"Qingdao"}],
goods:[{n:"Soybeans",p:42},{n:"Iron ore",p:24},{n:"Beef",p:12},{n:"Crude oil",p:10},{n:"Corn",p:5},{n:"Pulp & paper",p:4},{n:"Sugar",p:3}],
destinations:[{n:"China",p:75},{n:"Hong Kong",p:10},{n:"Vietnam",p:5},{n:"Japan",p:4},{n:"South Korea",p:3},{n:"Taiwan",p:3}]},

{id:"malacca",name:"Strait of Malacca (chokepoint)",type:"chokepoint",color:"#e0893a",
description:"World's busiest shipping strait. ~30% of global trade + ~80% of China's oil imports. 1.7 nautical miles narrowest.",
points:[{lat:5.54,lng:95.32,label:"Banda Aceh"},{lat:3.77,lng:98.68,label:"Medan"},{lat:2.78,lng:101.72,label:"Port Klang"},{lat:2.19,lng:102.25,label:"Malacca"},{lat:1.29,lng:103.85,label:"Singapore"},{lat:1.47,lng:104.77,label:"Karimun"}],
goods:[{n:"Crude oil (ME → E.Asia)",p:30},{n:"LNG",p:14},{n:"Containers (mfg goods)",p:24},{n:"Iron ore & coal",p:10},{n:"Palm oil",p:5},{n:"Grain",p:6},{n:"Chemicals",p:5},{n:"Automobiles",p:6}],
destinations:[{n:"China",p:42},{n:"Japan",p:14},{n:"South Korea",p:12},{n:"Singapore",p:8},{n:"Taiwan",p:6},{n:"Thailand",p:4},{n:"Vietnam",p:4},{n:"Philippines",p:3},{n:"Indonesia",p:4},{n:"Malaysia",p:3}]},

{id:"hormuz",name:"Strait of Hormuz (chokepoint)",type:"chokepoint",color:"#c0392b",
description:"~20% of world oil + ~20% of LNG. Iran-controlled north shore. Most dangerous chokepoint geopolitically.",
points:[{lat:26.57,lng:56.25,label:"Bandar Abbas"},{lat:26.57,lng:56.52,label:"Strait"},{lat:25.87,lng:56.47,label:"Khasab"},{lat:24.47,lng:54.37,label:"Abu Dhabi"}],
goods:[{n:"Crude oil (SA/UAE/IQ/IR/KW)",p:55},{n:"LNG (Qatar)",p:25},{n:"Refined petroleum",p:12},{n:"Petrochemicals",p:5},{n:"General cargo",p:3}],
destinations:[{n:"China",p:32},{n:"India",p:16},{n:"Japan",p:14},{n:"South Korea",p:11},{n:"European Union",p:12},{n:"Singapore",p:5},{n:"Taiwan",p:4},{n:"Thailand",p:3},{n:"United States",p:3}]},

{id:"bab_el_mandeb",name:"Bab el-Mandeb (chokepoint)",type:"chokepoint",color:"#e0893a",
description:"Gate between Red Sea & Indian Ocean. ~12% of global trade historically. Houthi attacks since Nov 2023 cut Suez traffic by ~70%+.",
points:[{lat:12.78,lng:45.03,label:"Aden"},{lat:12.58,lng:43.15,label:"Bab el-Mandeb"},{lat:11.55,lng:43.15,label:"Djibouti"},{lat:15.30,lng:41.80,label:"Red Sea"},{lat:22.83,lng:39.53,label:"Jeddah"},{lat:27.23,lng:33.83,label:"Suez"}],
goods:[{n:"Crude oil (Gulf → Europe)",p:25},{n:"Containers (Asia-EU)",p:35},{n:"LNG (Qatar → EU)",p:12},{n:"Grain (Black Sea)",p:8},{n:"Refined petroleum",p:10},{n:"Chemicals",p:5},{n:"General cargo",p:5}],
destinations:[{n:"Netherlands",p:14},{n:"Germany",p:12},{n:"Italy",p:11},{n:"France",p:9},{n:"United Kingdom",p:9},{n:"Spain",p:7},{n:"Belgium",p:6},{n:"Turkey",p:8},{n:"Egypt (domestic)",p:5},{n:"Greece",p:4},{n:"Saudi Arabia",p:5},{n:"US East Coast",p:4},{n:"Other",p:6}]},

{id:"bosphorus",name:"Turkish Straits (chokepoint)",type:"chokepoint",color:"#b89a4a",
description:"Only sea exit from Black Sea. Ukrainian grain + Russian oil lifeline. Montreux 1936 controls warships.",
points:[{lat:46.49,lng:30.74,label:"Odesa"},{lat:44.60,lng:33.52,label:"Sevastopol"},{lat:41.21,lng:29.12,label:"Black Sea entry"},{lat:41.04,lng:28.98,label:"Bosphorus"},{lat:40.22,lng:26.41,label:"Dardanelles"},{lat:38.44,lng:27.15,label:"Izmir"}],
goods:[{n:"Ukrainian grain",p:30},{n:"Russian crude oil",p:25},{n:"Russian refined petroleum",p:15},{n:"Natural gas",p:8},{n:"Steel & metals",p:7},{n:"Coal",p:5},{n:"Fertilizers",p:5},{n:"Containers",p:5}],
destinations:[{n:"Turkey",p:18},{n:"Egypt",p:12},{n:"China",p:10},{n:"Italy",p:8},{n:"Netherlands",p:7},{n:"Spain",p:6},{n:"India",p:6},{n:"Indonesia",p:5},{n:"Bangladesh",p:4},{n:"Saudi Arabia",p:4},{n:"Algeria",p:4},{n:"Sub-Saharan Africa",p:8},{n:"Other",p:8}]},

{id:"belt_road_rail",name:"China-Europe Rail Express",type:"land",color:"#6b9e6f",
description:"Chongqing/Xi'an → Khorgos → Kazakhstan → Russia/Belarus → Poland → Duisburg. ~16 days vs 35 by sea.",
points:[{lat:29.56,lng:106.55,label:"Chongqing"},{lat:30.67,lng:104.07,label:"Chengdu"},{lat:34.34,lng:108.94,label:"Xi'an"},{lat:43.10,lng:80.45,label:"Khorgos"},{lat:51.17,lng:71.43,label:"Astana"},{lat:55.75,lng:37.62,label:"Moscow"},{lat:53.90,lng:27.57,label:"Minsk"},{lat:52.23,lng:21.01,label:"Warsaw"},{lat:52.40,lng:13.07,label:"Małaszewicze"},{lat:51.43,lng:6.76,label:"Duisburg"},{lat:48.14,lng:11.58,label:"Munich"}],
goods:[{n:"Electronics & IT",p:25},{n:"Auto parts",p:15},{n:"Machinery",p:13},{n:"Apparel & textiles",p:11},{n:"Chemicals",p:9},{n:"Wine & food (reverse)",p:8},{n:"Luxury goods (reverse)",p:7},{n:"Pharma (reverse)",p:6},{n:"Solar & batteries",p:6}],
destinations:[{n:"Germany",p:32},{n:"Poland",p:14},{n:"Netherlands",p:11},{n:"Belgium",p:8},{n:"France",p:7},{n:"Italy",p:6},{n:"Spain",p:5},{n:"United Kingdom",p:5},{n:"Czechia",p:4},{n:"Russia",p:4},{n:"Other EU",p:4}]},

{id:"middle_corridor",name:"Middle Corridor (Trans-Caspian)",type:"land",color:"#e3c04a",
description:"China → Kazakhstan → Caspian → Azerbaijan → Georgia → Turkey → EU. Bypasses Russia. Tripled 2022-24.",
points:[{lat:43.66,lng:87.62,label:"Ürümqi"},{lat:40.04,lng:76.94,label:"Khorgos"},{lat:43.24,lng:76.89,label:"Almaty"},{lat:51.17,lng:71.43,label:"Astana"},{lat:43.65,lng:51.16,label:"Aktau"},{lat:40.41,lng:49.87,label:"Baku"},{lat:41.72,lng:44.78,label:"Tbilisi"},{lat:42.63,lng:41.64,label:"Poti"},{lat:39.92,lng:32.85,label:"Ankara"},{lat:41.01,lng:28.98,label:"Istanbul"},{lat:44.43,lng:26.10,label:"Bucharest"},{lat:50.11,lng:14.42,label:"Prague"}],
goods:[{n:"Chinese electronics",p:28},{n:"Textiles",p:15},{n:"Auto parts",p:12},{n:"Chemicals",p:10},{n:"Food",p:10},{n:"Construction materials",p:8},{n:"Refined petroleum (reverse)",p:7},{n:"Cotton",p:5},{n:"Consumer goods",p:5}],
destinations:[{n:"Turkey",p:22},{n:"Germany",p:16},{n:"Romania",p:10},{n:"Italy",p:9},{n:"Poland",p:8},{n:"Hungary",p:7},{n:"Bulgaria",p:6},{n:"Greece",p:5},{n:"Central Asia",p:10},{n:"Caucasus",p:7}]},

{id:"trans_siberian",name:"Trans-Siberian Railway",type:"land",color:"#9b59b6",
description:"9,300 km Moscow-Vladivostok. Europe freight dropped post-2022. Serves Russia-China bilateral now.",
points:[{lat:55.75,lng:37.62,label:"Moscow"},{lat:56.84,lng:60.60,label:"Yekaterinburg"},{lat:55.04,lng:82.93,label:"Novosibirsk"},{lat:56.00,lng:92.85,label:"Krasnoyarsk"},{lat:52.28,lng:104.28,label:"Irkutsk"},{lat:51.83,lng:107.60,label:"Ulan-Ude"},{lat:48.48,lng:135.08,label:"Khabarovsk"},{lat:43.12,lng:131.88,label:"Vladivostok"}],
goods:[{n:"Russian coal",p:28},{n:"Timber & forest",p:18},{n:"Crude oil",p:14},{n:"Chemicals & fertilizers",p:11},{n:"Metals",p:10},{n:"Containers",p:9},{n:"Grain",p:5},{n:"Manufactured",p:5}],
destinations:[{n:"China",p:60},{n:"South Korea",p:10},{n:"Japan",p:8},{n:"Russian Far East",p:12},{n:"Mongolia",p:5},{n:"North Korea",p:2},{n:"Other",p:3}]},

{id:"instc",name:"INSTC (North-South)",type:"land",color:"#c27066",
description:"Russia → Caspian → Iran → India. Sanctions-era alternative. Chabahar port key southern terminus.",
points:[{lat:59.93,lng:30.34,label:"St. Petersburg"},{lat:55.75,lng:37.62,label:"Moscow"},{lat:48.70,lng:44.52,label:"Astrakhan"},{lat:36.90,lng:54.48,label:"Bandar Anzali"},{lat:35.68,lng:51.39,label:"Tehran"},{lat:30.28,lng:56.96,label:"Kerman"},{lat:25.29,lng:60.65,label:"Chabahar"},{lat:27.18,lng:56.28,label:"Bandar Abbas"},{lat:18.95,lng:72.82,label:"Mumbai"},{lat:13.08,lng:80.27,label:"Chennai"}],
goods:[{n:"Russian grain/fertilizer",p:22},{n:"Russian lumber/metals",p:15},{n:"Indian pharma/tea",p:14},{n:"Iranian petrochemicals",p:12},{n:"Auto parts",p:10},{n:"Textiles",p:8},{n:"Manufactured goods",p:10},{n:"Oil products",p:9}],
destinations:[{n:"India",p:38},{n:"Iran",p:20},{n:"Russia",p:18},{n:"Central Asia",p:10},{n:"Azerbaijan",p:6},{n:"Afghanistan",p:4},{n:"Other",p:4}]},

{id:"north_sea_route",name:"Northern Sea Route (Arctic)",type:"maritime",color:"#8aad84",
description:"Arctic route along Russian coast. ~40% shorter Asia-EU than Suez. Climate melt extending window.",
points:[{lat:69.35,lng:33.37,label:"Murmansk"},{lat:73.50,lng:80.55,label:"Kara Sea"},{lat:71.63,lng:128.87,label:"Tiksi"},{lat:69.70,lng:170.28,label:"Pevek"},{lat:66.08,lng:-169.67,label:"Bering Strait"},{lat:43.12,lng:131.88,label:"Vladivostok"},{lat:31.22,lng:121.48,label:"Shanghai"}],
goods:[{n:"LNG (Yamal)",p:35},{n:"Crude oil",p:25},{n:"Nickel & palladium",p:12},{n:"Coal",p:10},{n:"Containers",p:8},{n:"Timber",p:5},{n:"Fisheries",p:5}],
destinations:[{n:"China",p:48},{n:"Japan",p:14},{n:"South Korea",p:10},{n:"India",p:8},{n:"Europe",p:12},{n:"Russian Far East",p:8}]},

{id:"european_gas",name:"European Gas Network",type:"pipeline",color:"#305852",
description:"Post-2022: Russian gas <10% of EU supply. Replaced by Norwegian pipe + US/Qatar LNG + Algerian pipe.",
points:[{lat:61.50,lng:7.0,label:"N.Sea (Norway)"},{lat:59.91,lng:10.75,label:"Oslo"},{lat:54.10,lng:13.40,label:"Nord Stream"},{lat:53.55,lng:9.99,label:"Hamburg LNG"},{lat:51.95,lng:4.13,label:"Rotterdam LNG"},{lat:50.85,lng:4.35,label:"Zeebrugge"},{lat:51.51,lng:0.72,label:"Isle of Grain"},{lat:43.29,lng:5.37,label:"Marseille"},{lat:36.75,lng:3.06,label:"Algiers"},{lat:25.34,lng:51.17,label:"Qatar"}],
goods:[{n:"Norwegian pipeline gas",p:32},{n:"US LNG",p:28},{n:"Qatari LNG",p:15},{n:"Algerian pipeline",p:10},{n:"Residual Russian LNG",p:8},{n:"Other (Azerbaijan/Libya)",p:5},{n:"Biogas + hydrogen",p:2}],
destinations:[{n:"Germany",p:22},{n:"Italy",p:15},{n:"Netherlands",p:11},{n:"France",p:10},{n:"United Kingdom",p:10},{n:"Spain",p:8},{n:"Belgium",p:6},{n:"Poland",p:5},{n:"Czechia",p:4},{n:"Austria",p:3},{n:"Other EU",p:6}]},

{id:"us_gulf_latam",name:"US Gulf → Latin America",type:"maritime",color:"#e3c04a",
description:"US refined products, grain, consumer goods to LatAm + Caribbean via Gulf Coast ports.",
points:[{lat:29.74,lng:-95.36,label:"Houston"},{lat:29.95,lng:-90.07,label:"New Orleans"},{lat:25.77,lng:-80.19,label:"Miami"},{lat:19.20,lng:-96.13,label:"Veracruz"},{lat:23.13,lng:-82.38,label:"Havana"},{lat:18.47,lng:-66.12,label:"San Juan"},{lat:10.49,lng:-66.91,label:"La Guaira"},{lat:-22.91,lng:-43.17,label:"Rio"},{lat:-34.61,lng:-58.38,label:"Buenos Aires"}],
goods:[{n:"Refined petroleum",p:30},{n:"Grain",p:22},{n:"Automobiles & parts",p:14},{n:"Industrial equipment",p:10},{n:"Consumer goods",p:10},{n:"Chemicals",p:8},{n:"LNG",p:6}],
destinations:[{n:"Mexico",p:42},{n:"Brazil",p:14},{n:"Colombia",p:8},{n:"Chile",p:7},{n:"Dominican Republic",p:5},{n:"Peru",p:5},{n:"Argentina",p:5},{n:"Venezuela",p:3},{n:"Caribbean",p:7},{n:"Other",p:4}]},

{id:"sahel_caravan",name:"Trans-Saharan Routes",type:"land",color:"#e0893a",
description:"Gold, refined-fuel smuggling, migrants, arms. Russian Africa Corps uses for AES supply. Jihadi taxation.",
points:[{lat:14.69,lng:-17.45,label:"Dakar"},{lat:17.97,lng:-15.96,label:"Nouakchott"},{lat:27.15,lng:-13.20,label:"Laayoune"},{lat:33.97,lng:-6.84,label:"Rabat"},{lat:36.75,lng:3.06,label:"Algiers"},{lat:32.89,lng:13.18,label:"Tripoli"},{lat:30.06,lng:9.47,label:"Ghat"},{lat:16.96,lng:7.98,label:"Agadez"},{lat:13.51,lng:2.11,label:"Niamey"},{lat:12.37,lng:-1.52,label:"Ouagadougou"},{lat:12.65,lng:-8.00,label:"Bamako"}],
goods:[{n:"Gold (artisanal)",p:20},{n:"Refined fuel (smuggled)",p:18},{n:"Livestock",p:12},{n:"Dates & agriculture",p:10},{n:"Textiles",p:10},{n:"Arms (illicit)",p:8},{n:"Consumer goods",p:12},{n:"Cement",p:10}],
destinations:[{n:"Algeria",p:15},{n:"Libya",p:14},{n:"Morocco",p:10},{n:"Mali",p:10},{n:"Niger",p:9},{n:"Burkina Faso",p:8},{n:"UAE (gold)",p:12},{n:"Europe",p:10},{n:"Russia",p:5},{n:"Other",p:7}]}

];
