// GEOINT v8 — Major global trade routes (v3)
// Realistic sea-lane / rail / pipeline geometry: dense waypoints following the
// actual paths ships and cargo take (straits, canals, capes, coastal lanes),
// plus `branches`: forks toward the main ports of call.
// Rendered as smooth flow lines with port rings (no arrows).
window.TRADE_ROUTES = [

{id:"maritime_silk_road",name:"Maritime Silk Road (Asia→Europe)",type:"maritime",color:"#e3c04a",
description:"Primary China-Europe container artery. ~25% of world seaborne trade by value. Houthi attacks since Nov 2023 displaced most to Cape route.",
points:[
 {lat:31.22,lng:121.98,label:"Shanghai"},{lat:27.5,lng:122.3},{lat:24.6,lng:119.6,label:"Taiwan Strait"},
 {lat:22.15,lng:114.5,label:"Hong Kong/Shenzhen"},{lat:16.5,lng:111.0},{lat:11.5,lng:109.6},
 {lat:8.2,lng:106.8},{lat:4.5,lng:105.2},{lat:1.8,lng:104.6},{lat:1.25,lng:103.8,label:"Singapore"},
 {lat:2.6,lng:101.2,label:"Malacca"},{lat:5.6,lng:97.6},{lat:6.2,lng:93.0},{lat:5.9,lng:85.0},
 {lat:5.8,lng:80.5,label:"Dondra Head"},{lat:8.0,lng:75.0},{lat:12.0,lng:65.0},{lat:12.6,lng:54.4,label:"Socotra"},
 {lat:12.9,lng:48.0,label:"Gulf of Aden"},{lat:12.55,lng:43.3,label:"Bab el-Mandeb"},{lat:16.0,lng:41.4},
 {lat:20.5,lng:38.6},{lat:24.5,lng:35.6},{lat:27.6,lng:33.9,label:"Gulf of Suez"},{lat:30.5,lng:32.35,label:"Suez Canal"},
 {lat:31.5,lng:32.3,label:"Port Said"},{lat:33.0,lng:28.5},{lat:34.4,lng:23.5},{lat:35.8,lng:14.6,label:"Malta"},
 {lat:37.4,lng:10.6},{lat:37.9,lng:5.5},{lat:36.3,lng:-2.0},{lat:35.95,lng:-5.6,label:"Gibraltar"},
 {lat:36.9,lng:-9.6},{lat:39.5,lng:-10.2},{lat:43.6,lng:-9.6,label:"Finisterre"},{lat:46.2,lng:-6.6},
 {lat:48.7,lng:-5.5,label:"Ushant"},{lat:50.1,lng:-1.6},{lat:51.1,lng:1.6,label:"Dover Strait"},{lat:51.95,lng:4.05,label:"Rotterdam"}],
branches:[
 [{lat:34.4,lng:23.5},{lat:36.2,lng:23.7},{lat:37.9,lng:23.6,label:"Piraeus"}],
 [{lat:51.1,lng:1.6},{lat:53.9,lng:7.6},{lat:53.55,lng:9.9,label:"Hamburg"}],
 [{lat:5.8,lng:80.5},{lat:6.9,lng:79.8,label:"Colombo"}]],
goods:[{n:"Electronics & smartphones",p:18},{n:"Machinery & industrial equipment",p:16},{n:"Textiles & apparel",p:12},{n:"Crude oil (W)",p:11},{n:"Automotive parts",p:9},{n:"Chemicals & plastics",p:8},{n:"Steel & metals",p:7},{n:"Agricultural products",p:6},{n:"Consumer goods",p:8},{n:"LNG & refined fuels",p:5}],
destinations:[{n:"Germany",p:22},{n:"Netherlands",p:14},{n:"United Kingdom",p:10},{n:"Italy",p:9},{n:"France",p:8},{n:"Belgium",p:7},{n:"Spain",p:6},{n:"Poland",p:5},{n:"Turkey",p:6},{n:"Eastern Europe",p:8},{n:"Scandinavia",p:5}]},

{id:"trans_pacific_east",name:"Trans-Pacific (Asia→North America)",type:"maritime",color:"#6b9e6f",
description:"Asia to US/Canada West Coast great-circle lane. LA/Long Beach + Oakland + Seattle + Vancouver. ~40% of US seaborne imports.",
points:[
 {lat:31.22,lng:121.98,label:"Shanghai"},{lat:32.8,lng:126.5},{lat:34.8,lng:129.2,label:"Busan"},
 {lat:35.2,lng:135.0},{lat:34.9,lng:140.2,label:"Tokyo Bay"},{lat:38.0,lng:148.0},{lat:43.0,lng:158.0},
 {lat:47.0,lng:170.0},{lat:50.0,lng:180.0},{lat:52.0,lng:-170.0,label:"Aleutians"},{lat:53.5,lng:-155.0},
 {lat:53.0,lng:-140.0,label:"Gulf of Alaska"},{lat:50.5,lng:-130.5},{lat:48.3,lng:-126.0},
 {lat:44.0,lng:-125.3},{lat:39.5,lng:-124.6},{lat:36.5,lng:-122.6},{lat:33.72,lng:-118.27,label:"Long Beach / LA"}],
branches:[
 [{lat:50.5,lng:-130.5},{lat:48.9,lng:-125.5},{lat:49.0,lng:-123.4,label:"Vancouver"}],
 [{lat:48.3,lng:-126.0},{lat:48.3,lng:-124.0},{lat:47.6,lng:-122.5,label:"Seattle"}],
 [{lat:36.5,lng:-122.6},{lat:37.8,lng:-122.4,label:"Oakland"}]],
goods:[{n:"Consumer electronics",p:22},{n:"Toys & household goods",p:14},{n:"Machinery",p:12},{n:"Automobiles",p:11},{n:"Apparel & footwear",p:10},{n:"Furniture",p:7},{n:"Semiconductor equipment",p:6},{n:"Agricultural (E→W)",p:9},{n:"Chemicals",p:5},{n:"Refined fuels",p:4}],
destinations:[{n:"United States",p:72},{n:"Canada",p:13},{n:"Mexico (transship)",p:7},{n:"Central America",p:4},{n:"Caribbean",p:4}]},

{id:"trans_atlantic",name:"Trans-Atlantic (EU↔NA)",type:"maritime",color:"#305882",
description:"Europe-NA premium cargo + US LNG surge eastbound since 2022.",
points:[
 {lat:51.95,lng:4.05,label:"Rotterdam"},{lat:51.3,lng:2.3},{lat:50.9,lng:0.0},{lat:50.0,lng:-2.8},
 {lat:49.3,lng:-5.5},{lat:48.8,lng:-8.5},{lat:48.0,lng:-15.0},{lat:46.0,lng:-25.0},
 {lat:43.5,lng:-38.0,label:"Mid-Atlantic"},{lat:41.5,lng:-55.0},{lat:40.6,lng:-68.0},{lat:40.5,lng:-73.9,label:"New York"}],
branches:[
 [{lat:50.0,lng:-2.8},{lat:50.75,lng:-1.4,label:"Southampton"}],
 [{lat:40.6,lng:-68.0},{lat:37.5,lng:-74.5},{lat:36.9,lng:-76.2,label:"Norfolk"}],
 [{lat:37.5,lng:-74.5},{lat:33.5,lng:-78.0},{lat:32.05,lng:-80.9,label:"Savannah"}]],
goods:[{n:"US LNG (→ EU)",p:22},{n:"Automobiles (EU → US)",p:16},{n:"Pharmaceuticals",p:12},{n:"Machinery",p:11},{n:"Chemicals",p:10},{n:"Agricultural (soy, wine)",p:9},{n:"Refined petroleum",p:7},{n:"Aerospace",p:6},{n:"Luxury goods",p:7}],
destinations:[{n:"Germany",p:24},{n:"Netherlands",p:18},{n:"France",p:11},{n:"United Kingdom",p:13},{n:"Italy",p:8},{n:"Spain",p:7},{n:"Belgium",p:7},{n:"Nordic",p:5},{n:"Eastern Europe",p:7}]},

{id:"cape_of_good_hope",name:"Cape of Good Hope (Asia→EU alt)",type:"maritime",color:"#c4a095",
description:"Suez alternative around Africa. Surged 2024 after Red Sea attacks. ~+10 days voyage.",
points:[
 {lat:1.25,lng:103.8,label:"Singapore"},{lat:0.0,lng:97.0},{lat:-4.0,lng:90.0},{lat:-10.0,lng:80.0},
 {lat:-18.0,lng:66.0},{lat:-25.0,lng:52.0},{lat:-29.5,lng:38.0,label:"Mozambique Channel"},
 {lat:-31.0,lng:31.0,label:"off Durban"},{lat:-35.2,lng:24.0},{lat:-35.5,lng:19.5,label:"Cape Agulhas"},
 {lat:-33.5,lng:16.5},{lat:-28.0,lng:12.5},{lat:-18.0,lng:8.0},{lat:-8.0,lng:2.0},
 {lat:1.0,lng:-6.0,label:"Gulf of Guinea"},{lat:8.0,lng:-15.0},{lat:14.7,lng:-18.3,label:"off Dakar"},
 {lat:21.0,lng:-18.5},{lat:28.0,lng:-15.5,label:"Canary Is."},{lat:33.0,lng:-11.0},
 {lat:35.95,lng:-6.5,label:"Gibraltar appr."},{lat:37.0,lng:-9.7},{lat:40.0,lng:-10.2},{lat:43.6,lng:-9.6},
 {lat:46.2,lng:-6.6},{lat:48.7,lng:-5.5},{lat:50.1,lng:-1.6},{lat:51.1,lng:1.6},{lat:51.95,lng:4.05,label:"Rotterdam"}],
branches:[
 [{lat:-35.5,lng:19.5},{lat:-34.2,lng:18.35,label:"Cape Town"}],
 [{lat:28.0,lng:-15.5},{lat:28.14,lng:-15.42,label:"Las Palmas"}]],
goods:[{n:"Containerized (Suez rerouted)",p:38},{n:"Crude oil (Gulf → EU/US)",p:20},{n:"Iron ore (AU → EU)",p:10},{n:"LNG",p:10},{n:"Grains",p:6},{n:"Chemicals",p:6},{n:"Automobiles",p:5},{n:"Refined petroleum",p:5}],
destinations:[{n:"Germany",p:22},{n:"Netherlands",p:15},{n:"United Kingdom",p:12},{n:"Italy",p:9},{n:"France",p:9},{n:"Spain",p:7},{n:"Belgium",p:6},{n:"Turkey",p:5},{n:"US East Coast",p:6},{n:"Morocco/N.Africa",p:4},{n:"Other EU",p:5}]},

{id:"gulf_to_asia",name:"Persian Gulf → East Asia (oil)",type:"maritime",color:"#c0392b",
description:"Core energy artery. Hormuz → Malacca → China/Japan/Korea/India. ~20% of world oil passes Hormuz, half continues east.",
points:[
 {lat:26.5,lng:50.3,label:"Ras Tanura"},{lat:26.3,lng:52.6},{lat:25.7,lng:55.2,label:"off Dubai"},
 {lat:26.4,lng:56.6,label:"Hormuz"},{lat:25.0,lng:58.5},{lat:23.0,lng:61.5,label:"Gulf of Oman"},
 {lat:19.5,lng:65.5},{lat:14.0,lng:70.5},{lat:9.0,lng:75.5},{lat:5.8,lng:80.5,label:"Dondra Head"},
 {lat:5.9,lng:87.0},{lat:6.1,lng:94.0},{lat:2.6,lng:101.2,label:"Malacca"},{lat:1.25,lng:103.8,label:"Singapore"},
 {lat:4.0,lng:107.0},{lat:9.0,lng:110.5},{lat:15.0,lng:113.0},{lat:20.5,lng:115.5},
 {lat:24.6,lng:119.6,label:"Taiwan Strait"},{lat:28.5,lng:122.3},{lat:31.22,lng:121.98,label:"Shanghai"}],
branches:[
 [{lat:19.5,lng:65.5},{lat:21.5,lng:68.0},{lat:22.35,lng:68.9,label:"Jamnagar"}],
 [{lat:28.5,lng:122.3},{lat:32.5,lng:127.0},{lat:34.8,lng:129.2,label:"Busan"}],
 [{lat:32.5,lng:127.0},{lat:33.5,lng:133.5},{lat:34.9,lng:140.2,label:"Tokyo Bay"}]],
goods:[{n:"Crude oil",p:58},{n:"LNG (Qatar → Asia)",p:22},{n:"Refined petroleum",p:10},{n:"Petrochemicals",p:6},{n:"Aluminum",p:2},{n:"General cargo W-bound",p:2}],
destinations:[{n:"China",p:36},{n:"India",p:18},{n:"Japan",p:13},{n:"South Korea",p:12},{n:"Singapore (refining)",p:6},{n:"Taiwan",p:5},{n:"Thailand",p:3},{n:"Philippines",p:3},{n:"Vietnam",p:2},{n:"Indonesia",p:2}]},

{id:"gulf_to_europe",name:"Persian Gulf → Europe (oil, LNG)",type:"maritime",color:"#c0392b",
description:"Gulf hydrocarbons westbound via Hormuz → Bab el-Mandeb → Suez → Med. Qatar LNG critical post-Russia for European gas.",
points:[
 {lat:25.9,lng:52.2,label:"Ras Laffan (Qatar)"},{lat:26.0,lng:55.0},{lat:26.4,lng:56.6,label:"Hormuz"},
 {lat:24.0,lng:60.0},{lat:19.0,lng:60.5},{lat:14.5,lng:55.5},{lat:12.9,lng:48.5,label:"Gulf of Aden"},
 {lat:12.55,lng:43.3,label:"Bab el-Mandeb"},{lat:16.0,lng:41.4},{lat:20.5,lng:38.6},{lat:24.5,lng:35.6},
 {lat:27.6,lng:33.9},{lat:30.5,lng:32.35,label:"Suez"},{lat:31.5,lng:32.3,label:"Port Said"},
 {lat:33.5,lng:27.0},{lat:34.4,lng:23.5,label:"S of Crete"},{lat:36.5,lng:15.5},{lat:37.4,lng:10.6,label:"Sicily Channel"},
 {lat:38.2,lng:6.5},{lat:36.8,lng:-1.0},{lat:35.95,lng:-5.6,label:"Gibraltar"},{lat:36.9,lng:-9.6},
 {lat:43.6,lng:-9.6},{lat:48.7,lng:-5.5},{lat:51.1,lng:1.6},{lat:51.95,lng:4.05,label:"Rotterdam"}],
branches:[
 [{lat:38.2,lng:6.5},{lat:41.0,lng:5.3},{lat:43.3,lng:4.9,label:"Fos/Marseille"}],
 [{lat:36.5,lng:15.5},{lat:39.5,lng:17.5},{lat:40.5,lng:17.2,label:"Taranto"}]],
goods:[{n:"Crude oil (Gulf → EU)",p:42},{n:"Qatar LNG → EU",p:26},{n:"Refined products",p:16},{n:"Petrochemicals",p:8},{n:"Aluminum",p:4},{n:"Fertilizers",p:4}],
destinations:[{n:"Italy",p:18},{n:"Netherlands",p:15},{n:"Spain",p:12},{n:"France",p:11},{n:"Germany",p:10},{n:"Belgium",p:8},{n:"Greece",p:6},{n:"United Kingdom",p:6},{n:"Turkey",p:7},{n:"Poland",p:4},{n:"Other EU",p:3}]},

{id:"panama_route",name:"Panama Canal Corridor",type:"maritime",color:"#9b59b6",
description:"Atlantic-Pacific shortcut for US East ↔ Asia & intra-Americas. ~5% of global trade. 2023-24 drought cut transits ~36%.",
points:[
 {lat:31.22,lng:121.98,label:"Shanghai"},{lat:30.0,lng:135.0},{lat:31.0,lng:155.0},{lat:29.5,lng:175.0},
 {lat:26.0,lng:-165.0},{lat:20.0,lng:-135.0},{lat:13.0,lng:-105.0},{lat:8.8,lng:-85.5},
 {lat:7.3,lng:-80.5},{lat:8.88,lng:-79.52,label:"Balboa (Pacific)"},{lat:9.12,lng:-79.72,label:"Panama Canal"},
 {lat:9.37,lng:-79.9,label:"Colón (Atlantic)"},{lat:12.0,lng:-78.5},{lat:16.5,lng:-75.5},
 {lat:20.0,lng:-73.7,label:"Windward Passage"},{lat:23.5,lng:-74.5},{lat:26.5,lng:-77.5},
 {lat:31.0,lng:-78.5},{lat:35.0,lng:-74.5},{lat:40.5,lng:-73.9,label:"New York"}],
branches:[
 [{lat:8.88,lng:-79.52},{lat:4.5,lng:-81.5},{lat:-3.0,lng:-82.5},{lat:-12.05,lng:-77.3,label:"Callao"},{lat:-22.0,lng:-71.5},{lat:-33.03,lng:-71.7,label:"Valparaíso"}],
 [{lat:26.5,lng:-77.5},{lat:25.78,lng:-80.05,label:"Miami"}],
 [{lat:31.0,lng:-78.5},{lat:32.05,lng:-80.9,label:"Savannah"}]],
goods:[{n:"Asian manufactured (→ US East)",p:28},{n:"US grain (E → Asia)",p:20},{n:"Containers",p:18},{n:"LPG/LNG",p:10},{n:"Refined petroleum",p:7},{n:"Automobiles",p:7},{n:"Coal",p:5},{n:"Chemicals",p:5}],
destinations:[{n:"United States",p:48},{n:"China",p:18},{n:"Japan",p:8},{n:"South Korea",p:5},{n:"Chile",p:5},{n:"Peru",p:3},{n:"Ecuador",p:3},{n:"Mexico",p:4},{n:"Central America",p:3},{n:"Caribbean",p:3}]},

{id:"australia_asia_minerals",name:"Australia → Asia (minerals)",type:"maritime",color:"#b89a4a",
description:"Iron ore, coal, LNG, bauxite to East Asian mills via Lombok-Makassar. ~80% of China's iron ore.",
points:[
 {lat:-20.3,lng:118.6,label:"Port Hedland"},{lat:-17.5,lng:117.5},{lat:-13.0,lng:116.5},
 {lat:-8.7,lng:115.7,label:"Lombok Strait"},{lat:-5.0,lng:117.3},{lat:-1.5,lng:117.8,label:"Makassar Strait"},
 {lat:2.5,lng:118.8},{lat:6.5,lng:119.5,label:"Sibutu Passage"},{lat:11.0,lng:118.0},
 {lat:16.5,lng:116.5},{lat:21.5,lng:116.5},{lat:24.6,lng:119.6,label:"Taiwan Strait"},
 {lat:28.5,lng:122.3},{lat:31.22,lng:121.98,label:"Shanghai"},{lat:36.05,lng:120.3,label:"Qingdao"}],
branches:[
 [{lat:28.5,lng:122.3},{lat:31.5,lng:127.5},{lat:33.0,lng:131.5},{lat:34.4,lng:135.2,label:"Osaka Bay"}],
 [{lat:31.5,lng:127.5},{lat:34.8,lng:129.2,label:"Busan"}]],
goods:[{n:"Iron ore",p:44},{n:"LNG",p:22},{n:"Coking coal",p:14},{n:"Thermal coal",p:9},{n:"Bauxite & alumina",p:5},{n:"Copper concentrate",p:3},{n:"Lithium spodumene",p:2},{n:"Wheat & beef",p:1}],
destinations:[{n:"China",p:58},{n:"Japan",p:17},{n:"South Korea",p:14},{n:"Taiwan",p:5},{n:"India",p:3},{n:"Vietnam/SEA",p:3}]},

{id:"india_to_eu",name:"India → Europe",type:"maritime",color:"#ff6f00",
description:"Indian exports to EU via Arabian Sea → Bab el-Mandeb → Suez. Textiles, pharma generics, gems, IT, agri.",
points:[
 {lat:18.9,lng:72.6,label:"Mumbai (JNPT)"},{lat:16.5,lng:69.5},{lat:14.0,lng:63.0},{lat:12.6,lng:54.4,label:"Socotra"},
 {lat:12.9,lng:48.0},{lat:12.55,lng:43.3,label:"Bab el-Mandeb"},{lat:16.0,lng:41.4},{lat:20.5,lng:38.6},
 {lat:24.5,lng:35.6},{lat:27.6,lng:33.9},{lat:30.5,lng:32.35,label:"Suez"},{lat:31.5,lng:32.3},
 {lat:33.0,lng:28.5},{lat:34.4,lng:23.5},{lat:35.8,lng:14.6,label:"Malta"},{lat:37.4,lng:10.6},
 {lat:37.9,lng:5.5},{lat:36.3,lng:-2.0},{lat:35.95,lng:-5.6,label:"Gibraltar"},{lat:36.9,lng:-9.6},
 {lat:43.6,lng:-9.6},{lat:48.7,lng:-5.5},{lat:50.1,lng:-1.6},{lat:51.1,lng:1.6},{lat:51.95,lng:4.05,label:"Rotterdam"}],
branches:[
 [{lat:18.9,lng:72.6},{lat:13.5,lng:74.0},{lat:9.9,lng:76.2,label:"Cochin"}],
 [{lat:50.1,lng:-1.6},{lat:51.35,lng:1.45,label:"London Gateway"}]],
goods:[{n:"Textiles & apparel",p:22},{n:"Pharmaceuticals (generics)",p:18},{n:"Gems & jewelry",p:13},{n:"Engineering goods",p:12},{n:"Chemicals",p:10},{n:"Basmati rice & agri",p:8},{n:"IT hardware",p:7},{n:"Iron ore & steel",p:6},{n:"Leather goods",p:4}],
destinations:[{n:"Germany",p:18},{n:"Netherlands",p:15},{n:"United Kingdom",p:14},{n:"Italy",p:11},{n:"Belgium",p:10},{n:"France",p:9},{n:"Spain",p:7},{n:"Poland",p:5},{n:"Turkey",p:6},{n:"Other EU",p:5}]},

{id:"us_lng",name:"US LNG Export Network",type:"maritime",color:"#6b9e6f",
description:"US Gulf LNG terminals → Europe & Asia. US became #1 LNG exporter 2023.",
points:[
 {lat:29.7,lng:-93.85,label:"Sabine Pass"},{lat:28.0,lng:-91.5},{lat:25.5,lng:-86.0},
 {lat:24.3,lng:-83.0,label:"Florida Strait"},{lat:26.2,lng:-79.6},{lat:30.0,lng:-77.5},
 {lat:35.0,lng:-70.0},{lat:40.0,lng:-55.0},{lat:44.5,lng:-38.0},{lat:47.5,lng:-20.0},
 {lat:48.9,lng:-8.0},{lat:50.1,lng:-1.6},{lat:51.1,lng:1.6,label:"Dover Strait"},{lat:51.95,lng:4.05,label:"Rotterdam"}],
branches:[
 [{lat:50.1,lng:-1.6},{lat:51.45,lng:0.7,label:"Isle of Grain"}],
 [{lat:48.9,lng:-8.0},{lat:45.5,lng:-7.5},{lat:43.4,lng:-3.2,label:"Bilbao"}],
 [{lat:24.3,lng:-83.0},{lat:21.6,lng:-85.6,label:"Yucatán Ch."},{lat:15.0,lng:-81.0},{lat:9.37,lng:-79.9,label:"Colón"},{lat:8.88,lng:-79.52,label:"Balboa"},{lat:5.0,lng:-95.0},{lat:10.0,lng:-125.0},{lat:17.0,lng:-155.0},{lat:24.0,lng:175.0},{lat:30.0,lng:150.0},{lat:33.0,lng:141.5},{lat:34.9,lng:140.2,label:"Tokyo Bay"}]],
goods:[{n:"LNG",p:98},{n:"LPG",p:2}],
destinations:[{n:"Netherlands",p:18},{n:"France",p:14},{n:"United Kingdom",p:12},{n:"Spain",p:9},{n:"Germany",p:8},{n:"Italy",p:6},{n:"Poland",p:5},{n:"Japan",p:9},{n:"South Korea",p:7},{n:"China",p:6},{n:"India",p:4},{n:"Taiwan",p:2}]},

{id:"russia_asia_oil",name:"Russian Oil → Asia (sanctions era)",type:"maritime",color:"#8b3232",
description:"Post-2022 shadow-fleet redirection. Baltic/Black Sea tankers via Suez to India + Pacific ESPO to China.",
points:[
 {lat:59.9,lng:28.4,label:"Ust-Luga"},{lat:59.5,lng:24.5},{lat:58.5,lng:20.5},{lat:55.3,lng:15.0},
 {lat:55.0,lng:12.8,label:"Danish Straits"},{lat:57.8,lng:10.5,label:"Skagerrak"},{lat:57.5,lng:6.0},
 {lat:54.0,lng:2.5},{lat:51.1,lng:1.6,label:"Dover Strait"},{lat:49.8,lng:-2.5},{lat:48.7,lng:-5.5},
 {lat:45.5,lng:-8.0},{lat:39.0,lng:-10.0},{lat:35.95,lng:-5.6,label:"Gibraltar"},{lat:37.4,lng:5.0},
 {lat:37.4,lng:10.6,label:"Sicily Ch."},{lat:34.4,lng:23.5},{lat:31.5,lng:32.3,label:"Port Said"},
 {lat:30.5,lng:32.35,label:"Suez"},{lat:27.6,lng:33.9},{lat:20.5,lng:38.6},{lat:12.55,lng:43.3,label:"Bab el-Mandeb"},
 {lat:12.9,lng:48.5},{lat:14.0,lng:58.0},{lat:18.0,lng:65.0},{lat:21.5,lng:68.0},{lat:22.35,lng:68.9,label:"Jamnagar"}],
branches:[
 [{lat:34.4,lng:23.5},{lat:38.5,lng:25.2,label:"Aegean"},{lat:40.2,lng:26.35,label:"Dardanelles"},{lat:41.1,lng:29.05,label:"Bosphorus"},{lat:43.0,lng:34.5},{lat:44.65,lng:37.8,label:"Novorossiysk"}],
 [{lat:18.0,lng:65.0},{lat:10.0,lng:72.0},{lat:5.8,lng:80.5},{lat:6.1,lng:92.0},{lat:2.6,lng:101.2,label:"Malacca"},{lat:1.25,lng:103.8},{lat:8.0,lng:110.0},{lat:18.0,lng:114.5},{lat:24.6,lng:119.6},{lat:29.9,lng:122.3,label:"Ningbo"}],
 [{lat:29.9,lng:122.3},{lat:31.5,lng:126.0},{lat:34.2,lng:129.4,label:"Tsushima"},{lat:39.0,lng:131.5},{lat:42.7,lng:132.9,label:"Kozmino (ESPO)"}]],
goods:[{n:"Urals crude",p:62},{n:"ESPO crude",p:20},{n:"Refined petroleum",p:12},{n:"LPG",p:4},{n:"Coal",p:2}],
destinations:[{n:"India",p:38},{n:"China",p:45},{n:"Turkey",p:10},{n:"UAE",p:4},{n:"Other Asia",p:3}]},

{id:"black_sea_grain",name:"Black Sea Grain (UA/RU → world)",type:"maritime",color:"#e3c04a",
description:"Ukrainian + Russian grain via Odesa/Novorossiysk → Bosphorus → world. MENA food-security critical.",
points:[
 {lat:46.45,lng:30.8,label:"Odesa"},{lat:45.2,lng:30.2},{lat:43.5,lng:29.6,label:"W Black Sea corridor"},
 {lat:41.6,lng:29.2},{lat:41.1,lng:29.05,label:"Bosphorus"},{lat:40.75,lng:28.4,label:"Marmara"},
 {lat:40.2,lng:26.35,label:"Dardanelles"},{lat:38.5,lng:25.2},{lat:36.5,lng:24.5},{lat:34.4,lng:24.0,label:"S of Crete"},
 {lat:31.9,lng:31.0},{lat:31.5,lng:32.3,label:"Port Said"},{lat:30.5,lng:32.35,label:"Suez"},
 {lat:27.6,lng:33.9},{lat:22.0,lng:38.2},{lat:16.0,lng:41.4},{lat:12.55,lng:43.3,label:"Bab el-Mandeb"},
 {lat:12.9,lng:48.5},{lat:12.0,lng:60.0},{lat:8.0,lng:73.0},{lat:5.8,lng:80.5},{lat:6.1,lng:92.0},
 {lat:2.6,lng:101.2,label:"Malacca"},{lat:1.25,lng:103.8,label:"Singapore"}],
branches:[
 [{lat:34.4,lng:24.0},{lat:31.6,lng:29.5},{lat:31.2,lng:29.95,label:"Alexandria"}],
 [{lat:36.5,lng:24.5},{lat:36.5,lng:15.0},{lat:37.3,lng:10.8},{lat:37.2,lng:5.5},{lat:36.85,lng:3.2,label:"Algiers"}],
 [{lat:22.0,lng:38.2},{lat:21.5,lng:39.15,label:"Jeddah"}],
 [{lat:43.5,lng:29.6},{lat:44.2,lng:34.0},{lat:44.65,lng:37.8,label:"Novorossiysk"}]],
goods:[{n:"Wheat",p:36},{n:"Corn/maize",p:30},{n:"Sunflower oil",p:16},{n:"Barley",p:8},{n:"Rapeseed/soy",p:6},{n:"Fertilizers",p:4}],
destinations:[{n:"Egypt",p:16},{n:"Turkey",p:12},{n:"China",p:11},{n:"Bangladesh",p:6},{n:"Indonesia",p:6},{n:"Pakistan",p:5},{n:"Saudi Arabia",p:5},{n:"Algeria",p:5},{n:"Morocco",p:4},{n:"Tunisia",p:3},{n:"Lebanon",p:3},{n:"Yemen",p:4},{n:"Sub-Saharan Africa",p:10},{n:"Philippines",p:3},{n:"Vietnam",p:3},{n:"Other",p:4}]},

{id:"brazil_china",name:"Brazil → China (soy/iron/beef)",type:"maritime",color:"#6b9e6f",
description:"Brazil's Santos/Paranaguá → Cape → Malacca → China. Primary agri+iron supplier to China.",
points:[
 {lat:-24.0,lng:-46.2,label:"Santos"},{lat:-27.5,lng:-42.0},{lat:-31.5,lng:-33.0},{lat:-34.5,lng:-20.0},
 {lat:-36.0,lng:-5.0},{lat:-36.5,lng:10.0},{lat:-36.0,lng:19.8,label:"Cape Agulhas"},{lat:-33.0,lng:29.0},
 {lat:-28.0,lng:40.0},{lat:-20.0,lng:57.0,label:"off Mauritius"},{lat:-11.0,lng:72.0},{lat:-3.0,lng:85.0},
 {lat:2.0,lng:95.0},{lat:2.6,lng:101.2,label:"Malacca"},{lat:1.25,lng:103.8,label:"Singapore"},
 {lat:6.0,lng:108.5},{lat:13.0,lng:112.0},{lat:20.5,lng:115.5},{lat:24.6,lng:119.6},{lat:28.5,lng:122.3},
 {lat:31.22,lng:121.98,label:"Shanghai"},{lat:36.05,lng:120.3,label:"Qingdao"}],
branches:[
 [{lat:-27.5,lng:-42.0},{lat:-23.1,lng:-43.1,label:"Rio de Janeiro"}],
 [{lat:-24.0,lng:-46.2},{lat:-25.6,lng:-48.4,label:"Paranaguá"}]],
goods:[{n:"Soybeans",p:42},{n:"Iron ore",p:24},{n:"Beef",p:12},{n:"Crude oil",p:10},{n:"Corn",p:5},{n:"Pulp & paper",p:4},{n:"Sugar",p:3}],
destinations:[{n:"China",p:75},{n:"Hong Kong",p:10},{n:"Vietnam",p:5},{n:"Japan",p:4},{n:"South Korea",p:3},{n:"Taiwan",p:3}]},

{id:"malacca",name:"Strait of Malacca (chokepoint)",type:"chokepoint",color:"#e0893a",
description:"World's busiest shipping strait. ~30% of global trade + ~80% of China's oil imports. 1.7 nautical miles narrowest.",
points:[
 {lat:5.9,lng:94.8,label:"NW entrance"},{lat:4.9,lng:97.8},{lat:3.8,lng:99.6},{lat:2.9,lng:100.9},
 {lat:2.2,lng:102.1},{lat:1.55,lng:103.0},{lat:1.25,lng:103.8,label:"Singapore"},{lat:1.25,lng:104.5},
 {lat:2.2,lng:105.3,label:"SCS exit"}],
goods:[{n:"Crude oil (ME → E.Asia)",p:30},{n:"LNG",p:14},{n:"Containers (mfg goods)",p:24},{n:"Iron ore & coal",p:10},{n:"Palm oil",p:5},{n:"Grain",p:6},{n:"Chemicals",p:5},{n:"Automobiles",p:6}],
destinations:[{n:"China",p:42},{n:"Japan",p:14},{n:"South Korea",p:12},{n:"Singapore",p:8},{n:"Taiwan",p:6},{n:"Thailand",p:4},{n:"Vietnam",p:4},{n:"Philippines",p:3},{n:"Indonesia",p:4},{n:"Malaysia",p:3}]},

{id:"hormuz",name:"Strait of Hormuz (chokepoint)",type:"chokepoint",color:"#c0392b",
description:"~20% of world oil + ~20% of LNG. Iran-controlled north shore. Most dangerous chokepoint geopolitically.",
points:[
 {lat:25.4,lng:54.6,label:"Inner Gulf"},{lat:25.9,lng:55.6},{lat:26.35,lng:56.2},{lat:26.4,lng:56.6,label:"Strait"},
 {lat:26.1,lng:57.2},{lat:25.3,lng:58.2},{lat:24.4,lng:59.2,label:"Gulf of Oman"}],
goods:[{n:"Crude oil (SA/UAE/IQ/IR/KW)",p:55},{n:"LNG (Qatar)",p:25},{n:"Refined petroleum",p:12},{n:"Petrochemicals",p:5},{n:"General cargo",p:3}],
destinations:[{n:"China",p:32},{n:"India",p:16},{n:"Japan",p:14},{n:"South Korea",p:11},{n:"European Union",p:12},{n:"Singapore",p:5},{n:"Taiwan",p:4},{n:"Thailand",p:3},{n:"United States",p:3}]},

{id:"bab_el_mandeb",name:"Bab el-Mandeb (chokepoint)",type:"chokepoint",color:"#e0893a",
description:"Gate between Red Sea & Indian Ocean. ~12% of global trade historically. Houthi attacks since Nov 2023 cut Suez traffic by ~70%+.",
points:[
 {lat:12.9,lng:47.0,label:"Gulf of Aden"},{lat:12.65,lng:44.6},{lat:12.55,lng:43.3,label:"Bab el-Mandeb"},
 {lat:13.6,lng:42.5},{lat:16.0,lng:41.4},{lat:19.0,lng:39.6},{lat:21.5,lng:38.7,label:"off Jeddah"},
 {lat:24.5,lng:35.6},{lat:27.6,lng:33.9},{lat:29.9,lng:32.55,label:"Suez"}],
goods:[{n:"Crude oil (Gulf → Europe)",p:25},{n:"Containers (Asia-EU)",p:35},{n:"LNG (Qatar → EU)",p:12},{n:"Grain (Black Sea)",p:8},{n:"Refined petroleum",p:10},{n:"Chemicals",p:5},{n:"General cargo",p:5}],
destinations:[{n:"Netherlands",p:14},{n:"Germany",p:12},{n:"Italy",p:11},{n:"France",p:9},{n:"United Kingdom",p:9},{n:"Spain",p:7},{n:"Belgium",p:6},{n:"Turkey",p:8},{n:"Egypt (domestic)",p:5},{n:"Greece",p:4},{n:"Saudi Arabia",p:5},{n:"US East Coast",p:4},{n:"Other",p:6}]},

{id:"bosphorus",name:"Turkish Straits (chokepoint)",type:"chokepoint",color:"#b89a4a",
description:"Only sea exit from Black Sea. Ukrainian grain + Russian oil lifeline. Montreux 1936 controls warships.",
points:[
 {lat:41.75,lng:29.6,label:"Black Sea appr."},{lat:41.25,lng:29.12,label:"Bosphorus N"},{lat:41.02,lng:28.99,label:"Istanbul"},
 {lat:40.75,lng:28.4,label:"Sea of Marmara"},{lat:40.45,lng:27.3},{lat:40.2,lng:26.35,label:"Dardanelles"},
 {lat:39.9,lng:25.9},{lat:39.0,lng:25.3,label:"Aegean"}],
goods:[{n:"Ukrainian grain",p:30},{n:"Russian crude oil",p:25},{n:"Russian refined petroleum",p:15},{n:"Natural gas",p:8},{n:"Steel & metals",p:7},{n:"Coal",p:5},{n:"Fertilizers",p:5},{n:"Containers",p:5}],
destinations:[{n:"Turkey",p:18},{n:"Egypt",p:12},{n:"China",p:10},{n:"Italy",p:8},{n:"Netherlands",p:7},{n:"Spain",p:6},{n:"India",p:6},{n:"Indonesia",p:5},{n:"Bangladesh",p:4},{n:"Saudi Arabia",p:4},{n:"Algeria",p:4},{n:"Sub-Saharan Africa",p:8},{n:"Other",p:8}]},

{id:"belt_road_rail",name:"China-Europe Rail Express",type:"land",color:"#6b9e6f",
description:"Chongqing/Xi'an → Khorgos → Kazakhstan → Russia/Belarus → Poland → Duisburg. ~16 days vs 35 by sea.",
points:[
 {lat:29.56,lng:106.55,label:"Chongqing"},{lat:34.34,lng:108.94,label:"Xi'an"},{lat:36.06,lng:103.83,label:"Lanzhou"},
 {lat:43.79,lng:87.62,label:"Ürümqi"},{lat:44.2,lng:80.4,label:"Khorgos"},{lat:43.24,lng:76.89,label:"Almaty"},
 {lat:47.8,lng:67.7},{lat:51.17,lng:71.43,label:"Astana"},{lat:53.2,lng:63.6},{lat:55.1,lng:61.4,label:"Chelyabinsk"},
 {lat:55.78,lng:49.12,label:"Kazan"},{lat:55.75,lng:37.62,label:"Moscow"},{lat:54.7,lng:32.0},
 {lat:53.9,lng:27.57,label:"Minsk"},{lat:52.1,lng:23.7,label:"Brest/Małaszewicze"},{lat:52.23,lng:21.01,label:"Warsaw"},
 {lat:52.4,lng:16.9,label:"Poznań"},{lat:52.5,lng:13.4,label:"Berlin"},{lat:51.43,lng:6.76,label:"Duisburg"}],
branches:[
 [{lat:52.23,lng:21.01},{lat:50.05,lng:19.9,label:"Kraków"},{lat:50.08,lng:14.43,label:"Prague"}],
 [{lat:29.56,lng:106.55},{lat:30.67,lng:104.07,label:"Chengdu"}]],
goods:[{n:"Electronics & IT",p:25},{n:"Auto parts",p:15},{n:"Machinery",p:13},{n:"Apparel & textiles",p:11},{n:"Chemicals",p:9},{n:"Wine & food (reverse)",p:8},{n:"Luxury goods (reverse)",p:7},{n:"Pharma (reverse)",p:6},{n:"Solar & batteries",p:6}],
destinations:[{n:"Germany",p:32},{n:"Poland",p:14},{n:"Netherlands",p:11},{n:"Belgium",p:8},{n:"France",p:7},{n:"Italy",p:6},{n:"Spain",p:5},{n:"United Kingdom",p:5},{n:"Czechia",p:4},{n:"Russia",p:4},{n:"Other EU",p:4}]},

{id:"middle_corridor",name:"Middle Corridor (Trans-Caspian)",type:"land",color:"#e3c04a",
description:"China → Kazakhstan → Caspian → Azerbaijan → Georgia → Turkey → EU. Bypasses Russia. Tripled 2022-24.",
points:[
 {lat:43.79,lng:87.62,label:"Ürümqi"},{lat:44.2,lng:80.4,label:"Khorgos"},{lat:43.24,lng:76.89,label:"Almaty"},
 {lat:44.8,lng:65.5,label:"Kyzylorda"},{lat:43.65,lng:51.16,label:"Aktau"},{lat:41.5,lng:50.3,label:"Caspian crossing"},
 {lat:40.41,lng:49.87,label:"Baku"},{lat:41.0,lng:46.5},{lat:41.72,lng:44.78,label:"Tbilisi"},
 {lat:41.6,lng:43.0,label:"Kars link"},{lat:40.6,lng:39.0},{lat:39.92,lng:32.85,label:"Ankara"},
 {lat:40.75,lng:30.0},{lat:41.01,lng:28.98,label:"Istanbul"},{lat:41.5,lng:26.5},{lat:42.7,lng:23.3,label:"Sofia"},
 {lat:44.8,lng:20.5,label:"Belgrade"},{lat:47.5,lng:19.05,label:"Budapest"},{lat:48.2,lng:16.4,label:"Vienna"}],
branches:[
 [{lat:42.7,lng:23.3},{lat:44.43,lng:26.1,label:"Bucharest"}],
 [{lat:41.72,lng:44.78},{lat:42.15,lng:41.67,label:"Poti (Black Sea)"}]],
goods:[{n:"Chinese electronics",p:28},{n:"Textiles",p:15},{n:"Auto parts",p:12},{n:"Chemicals",p:10},{n:"Food",p:10},{n:"Construction materials",p:8},{n:"Refined petroleum (reverse)",p:7},{n:"Cotton",p:5},{n:"Consumer goods",p:5}],
destinations:[{n:"Turkey",p:22},{n:"Germany",p:16},{n:"Romania",p:10},{n:"Italy",p:9},{n:"Poland",p:8},{n:"Hungary",p:7},{n:"Bulgaria",p:6},{n:"Greece",p:5},{n:"Central Asia",p:10},{n:"Caucasus",p:7}]},

{id:"trans_siberian",name:"Trans-Siberian Railway",type:"land",color:"#9b59b6",
description:"9,300 km Moscow-Vladivostok. Europe freight dropped post-2022. Serves Russia-China bilateral now.",
points:[
 {lat:55.75,lng:37.62,label:"Moscow"},{lat:56.3,lng:44.0,label:"Nizhny Novgorod"},{lat:56.84,lng:60.60,label:"Yekaterinburg"},
 {lat:55.0,lng:73.4,label:"Omsk"},{lat:55.04,lng:82.93,label:"Novosibirsk"},{lat:56.00,lng:92.85,label:"Krasnoyarsk"},
 {lat:52.28,lng:104.28,label:"Irkutsk"},{lat:51.83,lng:107.60,label:"Ulan-Ude"},{lat:52.0,lng:113.5,label:"Chita"},
 {lat:50.3,lng:127.5,label:"Blagoveshchensk"},{lat:48.48,lng:135.08,label:"Khabarovsk"},{lat:43.12,lng:131.88,label:"Vladivostok"}],
branches:[
 [{lat:51.83,lng:107.60},{lat:47.92,lng:106.9,label:"Ulaanbaatar"},{lat:43.7,lng:112.0},{lat:39.9,lng:116.4,label:"Beijing"}],
 [{lat:52.0,lng:113.5},{lat:49.6,lng:117.4,label:"Zabaikalsk"},{lat:45.8,lng:126.6,label:"Harbin"}]],
goods:[{n:"Russian coal",p:28},{n:"Timber & forest",p:18},{n:"Crude oil",p:14},{n:"Chemicals & fertilizers",p:11},{n:"Metals",p:10},{n:"Containers",p:9},{n:"Grain",p:5},{n:"Manufactured",p:5}],
destinations:[{n:"China",p:60},{n:"South Korea",p:10},{n:"Japan",p:8},{n:"Russian Far East",p:12},{n:"Mongolia",p:5},{n:"North Korea",p:2},{n:"Other",p:3}]},

{id:"instc",name:"INSTC (North-South)",type:"land",color:"#c27066",
description:"Russia → Caspian → Iran → India. Sanctions-era alternative. Chabahar port key southern terminus.",
points:[
 {lat:59.93,lng:30.34,label:"St. Petersburg"},{lat:55.75,lng:37.62,label:"Moscow"},{lat:51.5,lng:43.0},
 {lat:48.7,lng:44.5,label:"Volgograd"},{lat:46.35,lng:48.05,label:"Astrakhan"},{lat:43.0,lng:50.0,label:"Caspian Sea"},
 {lat:39.5,lng:50.5},{lat:37.47,lng:49.46,label:"Bandar Anzali"},{lat:36.3,lng:50.0,label:"Qazvin"},
 {lat:35.68,lng:51.39,label:"Tehran"},{lat:32.65,lng:51.67,label:"Isfahan"},{lat:29.6,lng:52.5,label:"Shiraz"},
 {lat:27.18,lng:56.28,label:"Bandar Abbas"},{lat:25.0,lng:60.0},{lat:22.5,lng:65.5},{lat:20.5,lng:70.0},
 {lat:18.9,lng:72.6,label:"Mumbai"}],
branches:[
 [{lat:29.6,lng:52.5},{lat:27.5,lng:57.5,label:"Kerman line"},{lat:25.29,lng:60.65,label:"Chabahar"}]],
goods:[{n:"Russian grain/fertilizer",p:22},{n:"Russian lumber/metals",p:15},{n:"Indian pharma/tea",p:14},{n:"Iranian petrochemicals",p:12},{n:"Auto parts",p:10},{n:"Textiles",p:8},{n:"Manufactured goods",p:10},{n:"Oil products",p:9}],
destinations:[{n:"India",p:38},{n:"Iran",p:20},{n:"Russia",p:18},{n:"Central Asia",p:10},{n:"Azerbaijan",p:6},{n:"Afghanistan",p:4},{n:"Other",p:4}]},

{id:"north_sea_route",name:"Northern Sea Route (Arctic)",type:"maritime",color:"#8aad84",
description:"Arctic route along Russian coast. ~40% shorter Asia-EU than Suez. Climate melt extending window.",
points:[
 {lat:69.1,lng:33.4,label:"Murmansk"},{lat:70.5,lng:44.0},{lat:70.8,lng:57.5,label:"Kara Gate"},
 {lat:73.8,lng:70.0},{lat:75.5,lng:88.0},{lat:77.8,lng:104.0,label:"Cape Chelyuskin"},{lat:75.5,lng:120.0},
 {lat:73.5,lng:140.0,label:"Laptev Sea"},{lat:71.5,lng:155.0},{lat:69.9,lng:170.0,label:"Pevek"},
 {lat:67.5,lng:-175.0},{lat:65.8,lng:-169.3,label:"Bering Strait"},{lat:62.0,lng:-172.5},
 {lat:57.5,lng:170.0},{lat:52.0,lng:160.0,label:"off Kamchatka"},{lat:47.0,lng:152.0,label:"Kurils"},
 {lat:45.7,lng:142.2,label:"La Pérouse Str."},{lat:41.5,lng:135.0,label:"Sea of Japan"},{lat:36.0,lng:130.5},
 {lat:33.8,lng:127.5},{lat:31.22,lng:121.98,label:"Shanghai"}],
branches:[
 [{lat:41.5,lng:135.0},{lat:43.12,lng:131.9,label:"Vladivostok"}],
 [{lat:73.8,lng:70.0},{lat:71.3,lng:72.1,label:"Sabetta (Yamal LNG)"}]],
goods:[{n:"LNG (Yamal)",p:35},{n:"Crude oil",p:25},{n:"Nickel & palladium",p:12},{n:"Coal",p:10},{n:"Containers",p:8},{n:"Timber",p:5},{n:"Fisheries",p:5}],
destinations:[{n:"China",p:48},{n:"Japan",p:14},{n:"South Korea",p:10},{n:"India",p:8},{n:"Europe",p:12},{n:"Russian Far East",p:8}]},

{id:"european_gas",name:"European Gas Network",type:"pipeline",color:"#305852",
description:"Post-2022: Russian gas <10% of EU supply. Norwegian pipes + US/Qatar LNG + Algerian pipes feed the Rotterdam/TTF hub region.",
points:[
 {lat:61.3,lng:3.2,label:"Troll / North Sea fields"},{lat:59.3,lng:4.3},{lat:57.0,lng:5.2},
 {lat:54.8,lng:6.0},{lat:53.4,lng:6.9,label:"Emden landfall"},{lat:52.6,lng:5.4},{lat:51.95,lng:4.05,label:"Rotterdam / TTF hub"}],
branches:[
 [{lat:59.3,lng:4.3},{lat:58.5,lng:1.0},{lat:57.55,lng:-1.85,label:"St Fergus (UK)"}],
 [{lat:53.4,lng:6.9},{lat:53.9,lng:9.1,label:"Brunsbüttel LNG"}],
 [{lat:51.95,lng:4.05},{lat:51.33,lng:3.2,label:"Zeebrugge"},{lat:51.45,lng:0.7,label:"Isle of Grain"}],
 [{lat:36.85,lng:3.2,label:"Hassi R'Mel line (Algiers)"},{lat:38.0,lng:5.0},{lat:39.9,lng:4.5},{lat:41.3,lng:2.2,label:"Barcelona"}],
 [{lat:36.85,lng:3.2},{lat:37.3,lng:9.0},{lat:37.5,lng:12.5,label:"Transmed"},{lat:38.1,lng:13.4},{lat:40.5,lng:14.3,label:"Naples"}]],
goods:[{n:"Norwegian pipeline gas",p:32},{n:"US LNG",p:28},{n:"Qatari LNG",p:15},{n:"Algerian pipeline",p:10},{n:"Residual Russian LNG",p:8},{n:"Other (Azerbaijan/Libya)",p:5},{n:"Biogas + hydrogen",p:2}],
destinations:[{n:"Germany",p:22},{n:"Italy",p:15},{n:"Netherlands",p:11},{n:"France",p:10},{n:"United Kingdom",p:10},{n:"Spain",p:8},{n:"Belgium",p:6},{n:"Poland",p:5},{n:"Czechia",p:4},{n:"Austria",p:3},{n:"Other EU",p:6}]},

{id:"us_gulf_latam",name:"US Gulf → Latin America",type:"maritime",color:"#e3c04a",
description:"US refined products, grain, consumer goods to LatAm + Caribbean via Gulf Coast ports.",
points:[
 {lat:29.5,lng:-94.5,label:"Houston"},{lat:27.5,lng:-92.0},{lat:25.0,lng:-86.5},{lat:24.3,lng:-83.2,label:"Florida Strait"},
 {lat:22.0,lng:-79.0},{lat:20.2,lng:-73.8,label:"Windward Passage"},{lat:16.0,lng:-70.0},{lat:12.5,lng:-66.0},
 {lat:11.0,lng:-60.5},{lat:7.5,lng:-54.0},{lat:2.5,lng:-48.0},{lat:-2.0,lng:-42.0},{lat:-6.0,lng:-34.5,label:"off Recife"},
 {lat:-13.0,lng:-38.3,label:"off Salvador"},{lat:-20.0,lng:-40.0},{lat:-23.5,lng:-43.5},{lat:-27.0,lng:-47.5},
 {lat:-32.0,lng:-51.0},{lat:-35.0,lng:-56.0,label:"Río de la Plata"},{lat:-34.6,lng:-58.3,label:"Buenos Aires"}],
branches:[
 [{lat:24.3,lng:-83.2},{lat:25.78,lng:-80.05,label:"Miami"}],
 [{lat:25.0,lng:-86.5},{lat:21.6,lng:-90.5},{lat:19.2,lng:-95.9,label:"Veracruz"}],
 [{lat:12.5,lng:-66.0},{lat:10.6,lng:-66.9,label:"La Guaira"}],
 [{lat:-23.5,lng:-43.5},{lat:-22.95,lng:-43.15,label:"Rio de Janeiro"}]],
goods:[{n:"Refined petroleum",p:30},{n:"Grain",p:22},{n:"Automobiles & parts",p:14},{n:"Industrial equipment",p:10},{n:"Consumer goods",p:10},{n:"Chemicals",p:8},{n:"LNG",p:6}],
destinations:[{n:"Mexico",p:42},{n:"Brazil",p:14},{n:"Colombia",p:8},{n:"Chile",p:7},{n:"Dominican Republic",p:5},{n:"Peru",p:5},{n:"Argentina",p:5},{n:"Venezuela",p:3},{n:"Caribbean",p:7},{n:"Other",p:4}]},

{id:"sahel_caravan",name:"Trans-Saharan Routes",type:"land",color:"#e0893a",
description:"Gold, refined-fuel smuggling, migrants, arms. Russian Africa Corps uses for AES supply. Jihadi taxation.",
points:[
 {lat:14.69,lng:-17.45,label:"Dakar"},{lat:17.97,lng:-15.96,label:"Nouakchott"},{lat:23.0,lng:-14.5},
 {lat:27.15,lng:-13.20,label:"Laayoune"},{lat:31.0,lng:-9.5,label:"Marrakech corridor"},{lat:33.97,lng:-6.84,label:"Rabat"},
 {lat:35.0,lng:-3.0},{lat:36.75,lng:3.06,label:"Algiers"},{lat:35.5,lng:6.5},{lat:33.5,lng:9.5},
 {lat:32.89,lng:13.18,label:"Tripoli"},{lat:29.5,lng:12.5},{lat:26.5,lng:10.5},{lat:25.0,lng:10.2,label:"Ghat"},
 {lat:21.0,lng:9.0},{lat:16.96,lng:7.98,label:"Agadez"},{lat:13.51,lng:2.11,label:"Niamey"},
 {lat:12.37,lng:-1.52,label:"Ouagadougou"},{lat:12.65,lng:-8.00,label:"Bamako"}],
branches:[
 [{lat:16.96,lng:7.98},{lat:13.0,lng:11.0},{lat:12.0,lng:15.0,label:"N'Djamena line"}],
 [{lat:21.0,lng:9.0},{lat:22.8,lng:5.5,label:"Tamanrasset"}]],
goods:[{n:"Gold (artisanal)",p:20},{n:"Refined fuel (smuggled)",p:18},{n:"Livestock",p:12},{n:"Dates & agriculture",p:10},{n:"Textiles",p:10},{n:"Arms (illicit)",p:8},{n:"Consumer goods",p:12},{n:"Cement",p:10}],
destinations:[{n:"Algeria",p:15},{n:"Libya",p:14},{n:"Morocco",p:10},{n:"Mali",p:10},{n:"Niger",p:9},{n:"Burkina Faso",p:8},{n:"UAE (gold)",p:12},{n:"Europe",p:10},{n:"Russia",p:5},{n:"Other",p:7}]}

];
