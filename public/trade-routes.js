// GEOINT v8 — Major global trade routes with goods manifests
// Each route has: name, type, color, points (lat/lng waypoints), description, goods array
window.TRADE_ROUTES = [
{
  id:"maritime_silk_road",
  name:"Maritime Silk Road",
  type:"maritime",
  color:"#e3c04a",
  description:"China's Belt & Road maritime arm. Shanghai → Singapore → Suez → Rotterdam. Carries ~40% of global container traffic.",
  points:[
    {lat:31.22,lng:121.48,label:"Shanghai"},
    {lat:22.54,lng:114.06,label:"Shenzhen"},
    {lat:1.29,lng:103.85,label:"Singapore"},
    {lat:6.93,lng:79.86,label:"Colombo"},
    {lat:12.78,lng:45.03,label:"Aden"},
    {lat:12.58,lng:43.15,label:"Bab el-Mandeb"},
    {lat:27.23,lng:33.83,label:"Suez"},
    {lat:31.25,lng:32.31,label:"Port Said"},
    {lat:36.14,lng:14.26,label:"Malta (Med transit)"},
    {lat:36.13,lng:-5.35,label:"Strait of Gibraltar"},
    {lat:51.95,lng:4.13,label:"Rotterdam"}
  ],
  goods:[
    {n:"Electronics & smartphones",p:18},
    {n:"Machinery & industrial equipment",p:16},
    {n:"Textiles & apparel",p:12},
    {n:"Crude oil (W→E)",p:11},
    {n:"Automotive parts",p:9},
    {n:"Chemicals & plastics",p:8},
    {n:"Steel & metals",p:7},
    {n:"Agricultural products",p:6},
    {n:"Consumer goods",p:8},
    {n:"LNG & refined fuels",p:5}
  ]
},
{
  id:"trans_pacific",
  name:"Trans-Pacific Corridor",
  type:"maritime",
  color:"#6b9e6f",
  description:"Asia-North America lifeline. Shanghai/Busan/Yokohama → Los Angeles/Long Beach/Oakland. Primary US consumer goods artery.",
  points:[
    {lat:31.22,lng:121.48,label:"Shanghai"},
    {lat:35.10,lng:129.04,label:"Busan"},
    {lat:35.44,lng:139.64,label:"Yokohama"},
    {lat:37.0,lng:180.0,label:"Mid-Pacific"},
    {lat:37.80,lng:-122.27,label:"Oakland"},
    {lat:33.77,lng:-118.19,label:"Long Beach / LA"}
  ],
  goods:[
    {n:"Consumer electronics",p:22},
    {n:"Toys & household goods",p:14},
    {n:"Machinery",p:12},
    {n:"Automobiles (two-way)",p:11},
    {n:"Apparel & footwear",p:10},
    {n:"Furniture",p:7},
    {n:"Semiconductor equipment (W)",p:6},
    {n:"Agricultural (soy/corn E→W)",p:9},
    {n:"Chemicals",p:5},
    {n:"Refined fuels",p:4}
  ]
},
{
  id:"suez_canal",
  name:"Suez Canal Route",
  type:"chokepoint",
  color:"#c27066",
  description:"Red Sea–Mediterranean artery. Carries ~12% of global trade. Houthi attacks since 2023 rerouted much traffic via Cape.",
  points:[
    {lat:12.58,lng:43.15,label:"Bab el-Mandeb"},
    {lat:15.30,lng:41.80,label:"Red Sea"},
    {lat:27.23,lng:33.83,label:"Suez"},
    {lat:30.58,lng:32.27,label:"Canal"},
    {lat:31.25,lng:32.31,label:"Port Said"}
  ],
  goods:[
    {n:"Crude oil (Gulf → Europe)",p:20},
    {n:"LNG (Qatar → Europe)",p:12},
    {n:"Manufactured goods (Asia → Europe)",p:28},
    {n:"Grain (Ukraine/Russia → Asia)",p:8},
    {n:"Containers general",p:18},
    {n:"Chemicals",p:6},
    {n:"Refined petroleum",p:8}
  ]
},
{
  id:"panama_canal",
  name:"Panama Canal Route",
  type:"chokepoint",
  color:"#9b59b6",
  description:"Atlantic-Pacific shortcut. ~6% of global trade. Drought-induced capacity cuts 2023-24 disrupted US East Coast routing.",
  points:[
    {lat:25.77,lng:-80.19,label:"Miami"},
    {lat:18.47,lng:-66.12,label:"San Juan"},
    {lat:9.39,lng:-79.92,label:"Colón"},
    {lat:9.08,lng:-79.68,label:"Gatun Locks"},
    {lat:8.92,lng:-79.57,label:"Miraflores"},
    {lat:8.91,lng:-79.52,label:"Panama City"},
    {lat:-33.05,lng:-71.62,label:"Valparaíso"},
    {lat:34.05,lng:-118.25,label:"Los Angeles"}
  ],
  goods:[
    {n:"US grain (E → Asia)",p:20},
    {n:"Asian manufactured goods (→ US East)",p:26},
    {n:"Containers general",p:18},
    {n:"LPG/LNG",p:10},
    {n:"Coal",p:6},
    {n:"Refined petroleum",p:7},
    {n:"Chemicals",p:5},
    {n:"Automobiles",p:8}
  ]
},
{
  id:"malacca_strait",
  name:"Strait of Malacca",
  type:"chokepoint",
  color:"#e0893a",
  description:"World's busiest strait. ~30% of global trade, 80% of China's oil imports. Narrow, piracy and chokepoint vulnerability.",
  points:[
    {lat:5.54,lng:95.32,label:"Banda Aceh"},
    {lat:2.78,lng:101.72,label:"Malacca"},
    {lat:1.29,lng:103.85,label:"Singapore"},
    {lat:1.47,lng:104.77,label:"Karimun"}
  ],
  goods:[
    {n:"Crude oil (ME → China/Japan/Korea)",p:30},
    {n:"LNG",p:14},
    {n:"Containerized manufactured goods",p:24},
    {n:"Iron ore & coal",p:10},
    {n:"Palm oil",p:5},
    {n:"Grain",p:6},
    {n:"Chemicals",p:5},
    {n:"Automobiles",p:6}
  ]
},
{
  id:"strait_hormuz",
  name:"Strait of Hormuz",
  type:"chokepoint",
  color:"#c0392b",
  description:"~20% of world oil passes through this narrow Gulf exit. Iran-controlled northern shore makes it most tense chokepoint.",
  points:[
    {lat:26.57,lng:56.25,label:"Bandar Abbas"},
    {lat:26.57,lng:56.52,label:"Strait"},
    {lat:25.87,lng:56.47,label:"Khasab"},
    {lat:24.47,lng:54.37,label:"Abu Dhabi"}
  ],
  goods:[
    {n:"Crude oil (Saudi/UAE/Iraq/Iran/Kuwait)",p:55},
    {n:"LNG (Qatar primary source)",p:25},
    {n:"Refined petroleum products",p:12},
    {n:"Petrochemicals",p:5},
    {n:"General cargo",p:3}
  ]
},
{
  id:"north_sea_route",
  name:"Northern Sea Route",
  type:"maritime",
  color:"#8aad84",
  description:"Arctic route along Russian coast. ~40% shorter Asia-Europe than Suez. Climate change opening; Russia dominates.",
  points:[
    {lat:69.35,lng:33.37,label:"Murmansk"},
    {lat:73.50,lng:80.55,label:"Kara Sea"},
    {lat:77.72,lng:104.28,label:"Laptev Sea"},
    {lat:71.63,lng:128.87,label:"Tiksi"},
    {lat:69.70,lng:170.28,label:"Pevek"},
    {lat:66.08,lng:-169.67,label:"Bering Strait"},
    {lat:43.11,lng:131.88,label:"Vladivostok"}
  ],
  goods:[
    {n:"LNG (Yamal)",p:35},
    {n:"Crude oil (Arctic fields)",p:25},
    {n:"Nickel & palladium (Norilsk)",p:12},
    {n:"Coal",p:10},
    {n:"Containers transit",p:8},
    {n:"Timber",p:5},
    {n:"Fisheries",p:5}
  ]
},
{
  id:"bosporus_dardanelles",
  name:"Turkish Straits (Bosporus & Dardanelles)",
  type:"chokepoint",
  color:"#b89a4a",
  description:"Only sea exit from Black Sea. Ukrainian grain, Russian oil lifeline. Montreux Convention controls warship passage.",
  points:[
    {lat:46.49,lng:30.74,label:"Odesa"},
    {lat:44.60,lng:33.52,label:"Sevastopol"},
    {lat:41.21,lng:29.12,label:"Black Sea entry"},
    {lat:41.04,lng:28.98,label:"Bosporus"},
    {lat:40.22,lng:26.41,label:"Dardanelles"},
    {lat:38.44,lng:27.15,label:"Izmir"}
  ],
  goods:[
    {n:"Ukrainian grain (wheat, corn, sunflower)",p:30},
    {n:"Russian crude oil",p:25},
    {n:"Russian refined petroleum",p:15},
    {n:"Natural gas (LNG)",p:8},
    {n:"Steel & metals",p:7},
    {n:"Coal",p:5},
    {n:"Fertilizers",p:5},
    {n:"Containers general",p:5}
  ]
},
{
  id:"trans_atlantic",
  name:"Trans-Atlantic Corridor",
  type:"maritime",
  color:"#305852",
  description:"Europe-North America lane. Rotterdam/Hamburg ↔ New York/Norfolk/Savannah. Premium containerized and LNG flows.",
  points:[
    {lat:51.95,lng:4.13,label:"Rotterdam"},
    {lat:53.55,lng:9.99,label:"Hamburg"},
    {lat:50.90,lng:-1.40,label:"Southampton"},
    {lat:45.0,lng:-30.0,label:"Mid-Atlantic"},
    {lat:40.71,lng:-74.01,label:"New York"},
    {lat:36.85,lng:-76.28,label:"Norfolk"},
    {lat:32.08,lng:-81.09,label:"Savannah"}
  ],
  goods:[
    {n:"Automobiles (EU → US)",p:18},
    {n:"US LNG (→ EU)",p:20},
    {n:"Pharmaceuticals",p:12},
    {n:"Machinery",p:11},
    {n:"Chemicals",p:10},
    {n:"Agricultural (soybeans, wine)",p:9},
    {n:"Refined petroleum",p:7},
    {n:"Aerospace components",p:6},
    {n:"Luxury goods",p:7}
  ]
},
{
  id:"cape_of_good_hope",
  name:"Cape of Good Hope Route",
  type:"maritime",
  color:"#c4a095",
  description:"Suez alternative around Africa. Surged 2024 due to Red Sea attacks. Adds ~10 days to Asia-Europe voyage.",
  points:[
    {lat:1.29,lng:103.85,label:"Singapore"},
    {lat:-34.10,lng:18.42,label:"Cape Town"},
    {lat:-33.92,lng:18.42,label:"Cape of Good Hope"},
    {lat:14.72,lng:-17.47,label:"Dakar"},
    {lat:36.13,lng:-5.35,label:"Strait of Gibraltar"},
    {lat:51.95,lng:4.13,label:"Rotterdam"}
  ],
  goods:[
    {n:"Containerized goods (Suez rerouted)",p:38},
    {n:"Crude oil (Gulf → US/Europe)",p:20},
    {n:"Iron ore (Australia → Europe)",p:10},
    {n:"LNG",p:10},
    {n:"Grains",p:6},
    {n:"Chemicals",p:6},
    {n:"Automobiles",p:5},
    {n:"Refined petroleum",p:5}
  ]
},
{
  id:"middle_corridor",
  name:"Middle Corridor (Trans-Caspian)",
  type:"land",
  color:"#e3c04a",
  description:"China → Kazakhstan → Caspian → Azerbaijan → Georgia → Turkey → Europe. Bypasses Russia. Rising post-Ukraine war.",
  points:[
    {lat:40.04,lng:76.94,label:"Khorgos (CN-KZ)"},
    {lat:43.24,lng:76.89,label:"Almaty"},
    {lat:43.65,lng:51.16,label:"Aktau"},
    {lat:40.41,lng:49.87,label:"Baku"},
    {lat:42.63,lng:41.64,label:"Poti"},
    {lat:41.01,lng:28.98,label:"Istanbul"},
    {lat:50.11,lng:14.42,label:"Prague / EU"}
  ],
  goods:[
    {n:"Chinese electronics & machinery",p:28},
    {n:"Textiles",p:15},
    {n:"Automobile parts",p:12},
    {n:"Chemicals",p:10},
    {n:"Food products",p:10},
    {n:"Construction materials",p:8},
    {n:"Refined petroleum (reverse)",p:7},
    {n:"Cotton (Central Asia)",p:5},
    {n:"Consumer goods",p:5}
  ]
},
{
  id:"trans_siberian",
  name:"Trans-Siberian Railway",
  type:"land",
  color:"#9b59b6",
  description:"9,300 km Moscow-Vladivostok. China-Europe freight traffic dropped sharply after 2022 sanctions.",
  points:[
    {lat:55.75,lng:37.62,label:"Moscow"},
    {lat:56.84,lng:60.60,label:"Yekaterinburg"},
    {lat:55.04,lng:82.93,label:"Novosibirsk"},
    {lat:56.00,lng:92.85,label:"Krasnoyarsk"},
    {lat:52.28,lng:104.28,label:"Irkutsk"},
    {lat:47.92,lng:106.92,label:"Ulaanbaatar (branch)"},
    {lat:43.80,lng:125.32,label:"Changchun (branch)"},
    {lat:43.12,lng:131.88,label:"Vladivostok"}
  ],
  goods:[
    {n:"Russian coal",p:25},
    {n:"Timber & forest products",p:18},
    {n:"Crude oil (east-bound)",p:15},
    {n:"Chemicals & fertilizers",p:12},
    {n:"Metals (aluminum, nickel)",p:10},
    {n:"Containerized general cargo",p:10},
    {n:"Grain",p:5},
    {n:"Manufactured goods",p:5}
  ]
},
{
  id:"belt_road_china_europe_rail",
  name:"China-Europe Railway Express",
  type:"land",
  color:"#6b9e6f",
  description:"Chongqing/Chengdu → Alashankou → Kazakhstan → Russia/Belarus → Poland → Duisburg. ~16 days vs 35 by sea.",
  points:[
    {lat:29.56,lng:106.55,label:"Chongqing"},
    {lat:43.10,lng:80.45,label:"Khorgos"},
    {lat:51.17,lng:71.43,label:"Astana"},
    {lat:55.75,lng:37.62,label:"Moscow"},
    {lat:53.90,lng:27.57,label:"Minsk"},
    {lat:52.23,lng:21.01,label:"Warsaw"},
    {lat:51.43,lng:6.76,label:"Duisburg"}
  ],
  goods:[
    {n:"Electronics & IT equipment",p:25},
    {n:"Automobile parts",p:15},
    {n:"Machinery",p:13},
    {n:"Apparel & textiles",p:11},
    {n:"Chemicals",p:9},
    {n:"Wine & food (reverse)",p:8},
    {n:"Luxury goods (reverse)",p:7},
    {n:"Pharmaceuticals (reverse)",p:6},
    {n:"Solar panels & batteries",p:6}
  ]
},
{
  id:"imec",
  name:"India-Middle East-Europe Corridor (IMEC)",
  type:"multimodal",
  color:"#8aad84",
  description:"2023 announced: India → UAE → Saudi → Jordan → Israel → Mediterranean → EU. Paused after Gaza war.",
  points:[
    {lat:18.95,lng:72.82,label:"Mumbai"},
    {lat:25.04,lng:55.12,label:"Jebel Ali (Dubai)"},
    {lat:24.47,lng:39.61,label:"Madinah / Haramain"},
    {lat:31.95,lng:35.93,label:"Amman"},
    {lat:32.08,lng:34.78,label:"Haifa"},
    {lat:37.98,lng:23.73,label:"Piraeus"},
    {lat:51.95,lng:4.13,label:"Rotterdam"}
  ],
  goods:[
    {n:"Energy (green hydrogen vision)",p:20},
    {n:"Digital cables (planned)",p:10},
    {n:"Electronics",p:15},
    {n:"Automobiles",p:12},
    {n:"Petrochemicals",p:15},
    {n:"Agricultural products",p:10},
    {n:"Pharmaceuticals",p:8},
    {n:"Machinery",p:10}
  ]
},
{
  id:"north_south_corridor",
  name:"North-South Transport Corridor (INSTC)",
  type:"multimodal",
  color:"#c27066",
  description:"Russia → Caspian → Iran → India. Russia-Iran alternative route bypassing Western sanctions.",
  points:[
    {lat:59.93,lng:30.34,label:"St. Petersburg"},
    {lat:55.75,lng:37.62,label:"Moscow"},
    {lat:48.70,lng:44.52,label:"Astrakhan"},
    {lat:36.90,lng:54.48,label:"Bandar Anzali"},
    {lat:35.68,lng:51.39,label:"Tehran"},
    {lat:27.18,lng:56.28,label:"Bandar Abbas"},
    {lat:18.95,lng:72.82,label:"Mumbai"}
  ],
  goods:[
    {n:"Russian grain & fertilizer",p:22},
    {n:"Russian lumber/metals",p:15},
    {n:"Indian pharma & tea",p:14},
    {n:"Iranian petrochemicals",p:12},
    {n:"Automobile parts",p:10},
    {n:"Textiles",p:8},
    {n:"Manufactured goods",p:10},
    {n:"Oil products",p:9}
  ]
},
{
  id:"gulf_of_aden_shipping",
  name:"Gulf of Aden / Bab el-Mandeb",
  type:"chokepoint",
  color:"#c0392b",
  description:"Red Sea southern gate. Yemeni Houthi attacks since Nov 2023 collapsed traffic by 70%+.",
  points:[
    {lat:12.78,lng:45.03,label:"Aden"},
    {lat:12.58,lng:43.15,label:"Bab el-Mandeb"},
    {lat:11.55,lng:43.15,label:"Djibouti"},
    {lat:15.30,lng:41.80,label:"Red Sea"}
  ],
  goods:[
    {n:"Crude oil (Gulf → Europe)",p:25},
    {n:"Containers (Asia-Europe)",p:35},
    {n:"LNG",p:12},
    {n:"Grain",p:8},
    {n:"Refined petroleum",p:10},
    {n:"Chemicals",p:5},
    {n:"General cargo",p:5}
  ]
},
{
  id:"nord_stream_energy",
  name:"European Gas Network",
  type:"pipeline",
  color:"#305852",
  description:"Russian gas flows to EU collapsed after 2022. Norwegian pipelines + LNG imports (US, Qatar) replaced.",
  points:[
    {lat:69.35,lng:33.37,label:"Murmansk"},
    {lat:59.93,lng:30.34,label:"St. Petersburg (disused)"},
    {lat:54.10,lng:13.40,label:"Nord Stream (sabotaged 2022)"},
    {lat:59.91,lng:10.75,label:"Oslo (Norway)"},
    {lat:51.95,lng:4.13,label:"Rotterdam LNG"},
    {lat:50.85,lng:4.35,label:"Zeebrugge LNG"},
    {lat:51.51,lng:-0.13,label:"UK Grain LNG"}
  ],
  goods:[
    {n:"Norwegian pipeline gas",p:32},
    {n:"US LNG imports",p:28},
    {n:"Qatari LNG",p:15},
    {n:"Algerian pipeline gas",p:10},
    {n:"Residual Russian LNG",p:8},
    {n:"Green hydrogen (emerging)",p:2},
    {n:"Biogas",p:5}
  ]
},
{
  id:"australia_asia_minerals",
  name:"Australia-Asia Mineral Route",
  type:"maritime",
  color:"#b89a4a",
  description:"Iron ore, coal, LNG from Australia to Japan/Korea/China. Backbone of Asian manufacturing.",
  points:[
    {lat:-20.31,lng:118.58,label:"Port Hedland"},
    {lat:-17.97,lng:122.24,label:"Broome"},
    {lat:-12.46,lng:130.84,label:"Darwin"},
    {lat:5.54,lng:95.32,label:"Sumatra"},
    {lat:22.54,lng:114.06,label:"Shenzhen"},
    {lat:35.44,lng:139.64,label:"Yokohama"},
    {lat:35.10,lng:129.04,label:"Busan"}
  ],
  goods:[
    {n:"Iron ore",p:42},
    {n:"LNG",p:20},
    {n:"Coking coal",p:15},
    {n:"Thermal coal",p:10},
    {n:"Bauxite & alumina",p:5},
    {n:"Copper concentrate",p:3},
    {n:"Lithium",p:3},
    {n:"Wheat & beef",p:2}
  ]
},
{
  id:"saharan_caravan",
  name:"Trans-Saharan Routes",
  type:"land",
  color:"#e0893a",
  description:"Historic caravan paths, modern migration and trade — gold, oil, arms, migrants.",
  points:[
    {lat:14.69,lng:-17.45,label:"Dakar"},
    {lat:17.97,lng:-15.96,label:"Nouakchott"},
    {lat:18.08,lng:-15.97,label:"Nouadhibou"},
    {lat:23.72,lng:-15.94,label:"Western Sahara transit"},
    {lat:27.15,lng:-13.20,label:"Laayoune"},
    {lat:33.97,lng:-6.84,label:"Rabat"},
    {lat:36.75,lng:3.06,label:"Algiers"},
    {lat:30.06,lng:9.47,label:"Ghat"},
    {lat:13.51,lng:2.11,label:"Niamey"},
    {lat:12.65,lng:-8.00,label:"Bamako"}
  ],
  goods:[
    {n:"Gold (artisanal)",p:20},
    {n:"Refined fuel smuggling",p:18},
    {n:"Livestock",p:12},
    {n:"Dates & agriculture",p:10},
    {n:"Textiles",p:10},
    {n:"Arms (illicit)",p:8},
    {n:"Consumer goods",p:12},
    {n:"Cement & construction",p:10}
  ]
}
];
