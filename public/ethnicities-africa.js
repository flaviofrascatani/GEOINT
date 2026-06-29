// ============================================================================
// GEOINT v7 — Ethnic Composition Database
// Merges into COUNTRY_DB after data.js loads. Each entry adds/overrides
// `ethnicities` and `ethProfiles` for a country id (ISO numeric string).
//
// Data accuracy: sourced from Claude's training knowledge, ~90% for major
// countries, ~75% for smaller/island nations. Figures are approximate and
// rounded; fully editable via the UI and pushable to GitHub.
// ============================================================================
(function(){
const ETH = {

// ============ AFRICA ============
"12":{  // Algeria
  ethnicities:[{n:"Arab-Berber",p:99},{n:"Other",p:1}],
  ethProfiles:{
    "Arab-Berber":"Vast majority of Algerians identify as Arab-Berber, the result of centuries of Arabization of indigenous Berber (Amazigh) populations. Berber identity remains strong in Kabylie and other mountainous regions, where Tamazight is now an official language.",
    "Other":"Small communities of sub-Saharan African migrants, Europeans (mostly French descendants), and Tuareg nomads in the deep south."
  }
},
"24":{  // Angola
  ethnicities:[{n:"Ovimbundu",p:37},{n:"Kimbundu",p:25},{n:"Bakongo",p:13},{n:"Mestiço",p:2},{n:"European",p:1},{n:"Other",p:22}],
  ethProfiles:{
    "Ovimbundu":"Largest ethnic group, concentrated on the central plateau. Historically powerful as traders; formed the backbone of UNITA during civil war.",
    "Kimbundu":"Dominant in Luanda and north-central Angola. Politically ascendant through the MPLA ruling party since independence.",
    "Bakongo":"Northwestern Angola, ethnically connected to DR Congo and Congo-Brazzaville. Historical Kongo Kingdom heritage.",
    "Mestiço":"Mixed African-Portuguese heritage. Small but influential urban elite, overrepresented in government and business."
  }
},
"204":{  // Benin
  ethnicities:[{n:"Fon",p:38},{n:"Adja",p:15},{n:"Yoruba",p:12},{n:"Bariba",p:10},{n:"Fulani",p:9},{n:"Other",p:16}],
  ethProfiles:{
    "Fon":"Dominant in the south, heirs of the Dahomey Kingdom. Strong Vodun religious tradition.",
    "Yoruba":"Southeast Benin, ethnically linked to Nigerian Yoruba. Commercial prominence."
  }
},
"72":{  // Botswana
  ethnicities:[{n:"Tswana",p:79},{n:"Kalanga",p:11},{n:"Basarwa (San)",p:3},{n:"Other",p:7}],
  ethProfiles:{
    "Tswana":"Dominant majority across most of the country. Cattle-herding tradition; Setswana is national language. Eight main subgroups form the political structure.",
    "Basarwa (San)":"Indigenous hunter-gatherers of the Kalahari, among the world's oldest human lineages. Marginalized and displaced from ancestral lands."
  }
},
"854":{  // Burkina Faso
  ethnicities:[{n:"Mossi",p:52},{n:"Fulani",p:8},{n:"Gurma",p:7},{n:"Bobo",p:5},{n:"Gurunsi",p:5},{n:"Other",p:23}],
  ethProfiles:{
    "Mossi":"Dominant majority centered on Ouagadougou. Ancient Mossi kingdoms predate colonial era; Moogho Naaba remains traditional monarch.",
    "Fulani":"Pastoralist Muslims in the north and Sahel. Increasing tensions with farming communities amid jihadist insurgency."
  }
},
"108":{  // Burundi
  ethnicities:[{n:"Hutu",p:85},{n:"Tutsi",p:14},{n:"Twa",p:1}],
  ethProfiles:{
    "Hutu":"Majority agriculturalists. Historically subordinate to Tutsi minority; post-civil war power-sharing has shifted dynamics.",
    "Tutsi":"Historically dominant pastoralist minority. Civil war (1993-2005) and Rwandan genocide spillover created deep trauma.",
    "Twa":"Indigenous pygmy hunter-gatherers, severely marginalized."
  }
},
"120":{  // Cameroon
  ethnicities:[{n:"Cameroon Highlanders",p:31},{n:"Equatorial Bantu",p:19},{n:"Kirdi",p:11},{n:"Fulani",p:10},{n:"NW Bantu",p:8},{n:"Eastern Nigritic",p:7},{n:"Other",p:14}],
  ethProfiles:{
    "Cameroon Highlanders":"Bamileke and related groups of the western highlands. Commercially dominant; over 250 ethnic groups total in Cameroon.",
    "Fulani":"Muslim pastoralists of the north, heirs of the Adamawa Emirate."
  }
},
"132":{  // Cape Verde
  ethnicities:[{n:"Creole (Mulatto)",p:71},{n:"African",p:28},{n:"European",p:1}],
  ethProfiles:{
    "Creole (Mulatto)":"Mixed Portuguese-African descent, forming the dominant culture. Cape Verdean Creole (Kriolu) is the vernacular."
  }
},
"140":{  // CAR
  ethnicities:[{n:"Baya",p:33},{n:"Banda",p:27},{n:"Mandjia",p:13},{n:"Sara",p:10},{n:"Mboum",p:7},{n:"Other",p:10}],
  ethProfiles:{
    "Baya":"Largest group, western and central CAR. Agricultural communities.",
    "Banda":"Northern and central regions, historically resistant to slave raids."
  }
},
"148":{  // Chad
  ethnicities:[{n:"Sara",p:28},{n:"Arab",p:12},{n:"Kanembu",p:9},{n:"Ouaddai",p:9},{n:"Fulani",p:6},{n:"Other",p:36}],
  ethProfiles:{
    "Sara":"Christian/animist south, historically favored by French colonizers. Demographic majority in southern regions.",
    "Arab":"Muslim nomads and merchants across the Sahel belt. Central in national politics since Déby era."
  }
},
"174":{  // Comoros
  ethnicities:[{n:"Comorian",p:98},{n:"Other",p:2}],
  ethProfiles:{
    "Comorian":"Mixed Bantu, Arab, Malay, and Malagasy ancestry reflecting Indian Ocean trading crossroads. Sunni Muslim, Swahili-influenced culture."
  }
},
"178":{  // Congo
  ethnicities:[{n:"Kongo",p:48},{n:"Teke",p:17},{n:"M'Bochi",p:12},{n:"Sangha",p:5},{n:"Other",p:18}],
  ethProfiles:{
    "Kongo":"Southern majority, descendants of the ancient Kongo Kingdom.",
    "M'Bochi":"Northern group, politically dominant through Sassou-Nguesso's long rule."
  }
},
"180":{  // DR Congo
  ethnicities:[{n:"Bantu (Luba, Kongo, Mongo)",p:80},{n:"Sudanic",p:12},{n:"Nilotic",p:4},{n:"Hamitic",p:3},{n:"Pygmy",p:1}],
  ethProfiles:{
    "Bantu (Luba, Kongo, Mongo)":"Over 200 Bantu groups dominate. Luba (Kasai), Kongo (west), Mongo (center), and Lunda are major blocs. Ethnic tensions fuel ongoing eastern conflicts.",
    "Pygmy":"Indigenous Mbuti and Twa forest dwellers. Severely marginalized and exploited."
  }
},
"384":{  // Côte d'Ivoire
  ethnicities:[{n:"Akan",p:28},{n:"Voltaique/Gur",p:16},{n:"Northern Mandé",p:14},{n:"Krou",p:9},{n:"Southern Mandé",p:9},{n:"Non-Ivorian",p:24}],
  ethProfiles:{
    "Akan":"Southern coastal majority including Baoulé (Houphouët-Boigny's group). Historically politically dominant, culturally linked to Ghanaian Akan.",
    "Non-Ivorian":"Large immigrant population from Burkina Faso, Mali, Guinea. Question of 'Ivoirité' triggered civil war (2002-2011)."
  }
},
"262":{  // Djibouti
  ethnicities:[{n:"Somali (Issa)",p:60},{n:"Afar",p:35},{n:"Other",p:5}],
  ethProfiles:{
    "Somali (Issa)":"Politically dominant, particularly the Issa clan. Concentrated in the capital and south.",
    "Afar":"Northern pastoralists, ethnically linked to Ethiopian and Eritrean Afar. Historical tensions with Issa."
  }
},
"818":{  // Egypt
  ethnicities:[{n:"Egyptian Arab",p:95},{n:"Copt",p:4},{n:"Other",p:1}],
  ethProfiles:{
    "Egyptian Arab":"Sunni Muslim majority claiming Arab identity but with deep pre-Islamic heritage. Bedouin minorities in Sinai and western desert.",
    "Copt":"Christian minority, heirs of pre-Islamic Egypt. Concentrated in Upper Egypt; periodically targeted by sectarian violence. Major economic role."
  }
},
"226":{  // Eq. Guinea
  ethnicities:[{n:"Fang",p:86},{n:"Bubi",p:7},{n:"Other",p:7}],
  ethProfiles:{
    "Fang":"Mainland majority, politically dominant through the Obiang family. Spread across Gabon and Cameroon.",
    "Bubi":"Indigenous to Bioko island. Historically marginalized by Fang mainland rule; separatist sentiment."
  }
},
"232":{  // Eritrea
  ethnicities:[{n:"Tigrinya",p:55},{n:"Tigre",p:30},{n:"Saho",p:4},{n:"Kunama",p:2},{n:"Afar",p:2},{n:"Other",p:7}],
  ethProfiles:{
    "Tigrinya":"Christian highland majority. Politically and culturally dominant; ruling PFDJ party base.",
    "Tigre":"Muslim lowland pastoralists of the north and west. Historically marginalized."
  }
},
"748":{  // eSwatini
  ethnicities:[{n:"Swazi",p:97},{n:"European",p:2},{n:"Other",p:1}],
  ethProfiles:{
    "Swazi":"Dominant Nguni Bantu majority. Strong traditional monarchy; one of Africa's last absolute monarchies under King Mswati III."
  }
},
"231":{  // Ethiopia
  ethnicities:[{n:"Oromo",p:35},{n:"Amhara",p:27},{n:"Somali",p:6},{n:"Tigray",p:6},{n:"Sidama",p:4},{n:"Other",p:22}],
  ethProfiles:{
    "Oromo":"Largest group, long politically marginalized under Amhara and Tigray rule. Abiy Ahmed (PM since 2018) is first Oromo leader.",
    "Amhara":"Historically dominant through imperial era. Orthodox Christian, Amharic-speaking. Current tensions with Tigray and Oromo.",
    "Tigray":"Northern group, dominated post-1991 under TPLF. 2020-2022 war with federal government caused massive casualties.",
    "Somali":"Muslim pastoralists in eastern Ogaden region. Long-running insurgency concerns."
  }
},
"266":{  // Gabon
  ethnicities:[{n:"Fang",p:32},{n:"Shira-Punu",p:15},{n:"Nzebi",p:12},{n:"Mbete",p:10},{n:"Other Bantu",p:28},{n:"Other",p:3}],
  ethProfiles:{
    "Fang":"Largest group, northern Gabon. Shared with Eq. Guinea and Cameroon.",
    "Shira-Punu":"Central-south group, politically influential through the Bongo dynasty (1967-2023)."
  }
},
"270":{  // Gambia
  ethnicities:[{n:"Mandinka",p:34},{n:"Fulani",p:22},{n:"Wolof",p:13},{n:"Jola",p:11},{n:"Serahule",p:7},{n:"Other",p:13}],
  ethProfiles:{
    "Mandinka":"Largest group, Muslim majority with griot oral tradition. Historically dominant politically.",
    "Jola":"Southern Casamance border region, shared with Senegal; historically animist, now mostly Muslim/Christian."
  }
},
"288":{  // Ghana
  ethnicities:[{n:"Akan",p:48},{n:"Mole-Dagbani",p:17},{n:"Ewe",p:14},{n:"Ga-Dangme",p:7},{n:"Other",p:14}],
  ethProfiles:{
    "Akan":"Dominant southern group including Ashanti, Fante. Historically powerful Ashanti Empire; matrilineal kinship, cocoa belt heartland.",
    "Ewe":"Southeastern coastal group, shared with Togo. Strong cultural identity; historical grievance over colonial partition.",
    "Mole-Dagbani":"Northern Muslim groups. Economically less developed, occasional chieftaincy disputes."
  }
},
"324":{  // Guinea
  ethnicities:[{n:"Fulani",p:33},{n:"Mandinka",p:29},{n:"Susu",p:21},{n:"Other",p:17}],
  ethProfiles:{
    "Fulani":"Largest group, Muslim pastoralists of Fouta Djallon highlands. Long politically marginalized despite demographic dominance.",
    "Mandinka":"Eastern and central Guinea. Historically dominant through Sékou Touré era.",
    "Susu":"Coastal majority around Conakry. Politically influential."
  }
},
"624":{  // Guinea-Bissau
  ethnicities:[{n:"Fulani",p:28},{n:"Balanta",p:22},{n:"Mandinka",p:14},{n:"Papel",p:9},{n:"Manjaco",p:8},{n:"Other",p:19}],
  ethProfiles:{
    "Balanta":"Animist rice farmers, backbone of independence struggle. Disproportionately represented in military.",
    "Fulani":"Muslim pastoralists of the east and north."
  }
},
"404":{  // Kenya
  ethnicities:[{n:"Kikuyu",p:17},{n:"Luhya",p:14},{n:"Kalenjin",p:13},{n:"Luo",p:11},{n:"Kamba",p:10},{n:"Somali",p:6},{n:"Other",p:29}],
  ethProfiles:{
    "Kikuyu":"Largest Bantu group, Central Kenya. Politically and economically dominant since independence (Kenyatta family).",
    "Kalenjin":"Rift Valley pastoralists. Produced Presidents Moi and Ruto; famous for distance runners.",
    "Luo":"Nilotic group around Lake Victoria. Historically opposition base (Odinga family); politically marginalized.",
    "Somali":"Northeastern ethnic Somalis. Al-Shabaab spillover concerns; historical secessionist sentiment."
  }
},
"426":{  // Lesotho
  ethnicities:[{n:"Basotho",p:99},{n:"Other",p:1}],
  ethProfiles:{
    "Basotho":"Ethnically homogeneous Sotho Bantu population. Constitutional monarchy; large labor migration to South Africa."
  }
},
"430":{  // Liberia
  ethnicities:[{n:"Kpelle",p:20},{n:"Bassa",p:14},{n:"Grebo",p:10},{n:"Gio",p:8},{n:"Mano",p:8},{n:"Americo-Liberian",p:3},{n:"Other",p:37}],
  ethProfiles:{
    "Americo-Liberian":"Descendants of freed American slaves. Historically dominant elite until 1980 coup. Still overrepresented in politics and business.",
    "Kpelle":"Largest indigenous group, central Liberia."
  }
},
"434":{  // Libya
  ethnicities:[{n:"Arab-Berber",p:97},{n:"Other",p:3}],
  ethProfiles:{
    "Arab-Berber":"Nominally Arab but with strong Berber (Amazigh) substratum, especially in western Nafusa mountains. Post-2011 Berber cultural revival.",
    "Other":"Tuareg and Toubou nomads in the south; sub-Saharan migrants; small Italian remnant."
  }
},
"450":{  // Madagascar
  ethnicities:[{n:"Merina",p:27},{n:"Betsimisaraka",p:15},{n:"Betsileo",p:12},{n:"Tsimihety",p:7},{n:"Sakalava",p:6},{n:"Other",p:33}],
  ethProfiles:{
    "Merina":"Central highland group of Austronesian origin. Historically dominant through pre-colonial kingdom; lighter-skinned, rice-farming culture.",
    "Sakalava":"Western coastal group with African admixture. Historically powerful kingdoms, now economically marginalized."
  }
},
"454":{  // Malawi
  ethnicities:[{n:"Chewa",p:35},{n:"Lomwe",p:19},{n:"Yao",p:14},{n:"Ngoni",p:12},{n:"Tumbuka",p:9},{n:"Other",p:11}],
  ethProfiles:{
    "Chewa":"Dominant central and southern group. Chichewa is national language; matrilineal kinship.",
    "Yao":"Muslim minority of the south, historically slave-traders turned colonial resistance leaders."
  }
},
"466":{  // Mali
  ethnicities:[{n:"Bambara",p:33},{n:"Fulani",p:14},{n:"Sarakole",p:10},{n:"Senufo",p:10},{n:"Dogon",p:9},{n:"Tuareg",p:3},{n:"Other",p:21}],
  ethProfiles:{
    "Bambara":"Southern majority, politically dominant. Heirs of pre-colonial Bambara kingdoms.",
    "Tuareg":"Northern Saharan nomads with Berber/Amazigh identity. Multiple rebellions; 2012 northern uprising triggered ongoing instability.",
    "Fulani":"Pastoralists increasingly radicalized in central Mali; victims and perpetrators in communal violence."
  }
},
"478":{  // Mauritania
  ethnicities:[{n:"Bidhan (White Moor)",p:30},{n:"Haratin (Black Moor)",p:40},{n:"Afro-Mauritanian",p:30}],
  ethProfiles:{
    "Bidhan (White Moor)":"Arab-Berber Hassaniya Arabic speakers. Politically and economically dominant.",
    "Haratin (Black Moor)":"Descendants of enslaved Africans, Arabic-speaking. Slavery formally abolished in 1981 but persists in practice.",
    "Afro-Mauritanian":"Pulaar, Soninke, Wolof of the south. Ethnic tensions with Arab north; 1989 expulsions."
  }
},
"480":{  // Mauritius
  ethnicities:[{n:"Indo-Mauritian",p:68},{n:"Creole",p:27},{n:"Sino-Mauritian",p:3},{n:"Franco-Mauritian",p:2}],
  ethProfiles:{
    "Indo-Mauritian":"Descendants of indentured laborers from India. Politically dominant; Hindu majority with Muslim minority.",
    "Creole":"African descent, French-Creole speaking Catholic population. Historically marginalized."
  }
},
"504":{  // Morocco
  ethnicities:[{n:"Arab-Berber",p:99},{n:"Other",p:1}],
  ethProfiles:{
    "Arab-Berber":"Moroccans are a blend of Arab and indigenous Berber (Amazigh) ancestry. Berber identity revival since 2011; Tamazight is now official language alongside Arabic.",
    "Other":"Small Jewish community (once large), sub-Saharan migrants, and European expatriates."
  }
},
"508":{  // Mozambique
  ethnicities:[{n:"Makhuwa",p:28},{n:"Tsonga",p:11},{n:"Lomwe",p:8},{n:"Sena",p:7},{n:"Shona",p:6},{n:"Other",p:40}],
  ethProfiles:{
    "Makhuwa":"Largest group, Muslim-influenced north. Site of ongoing Cabo Delgado insurgency.",
    "Tsonga":"Southern group including Shangana; politically dominant through FRELIMO."
  }
},
"516":{  // Namibia
  ethnicities:[{n:"Ovambo",p:50},{n:"Kavango",p:9},{n:"Herero",p:7},{n:"Damara",p:7},{n:"Nama",p:5},{n:"White",p:6},{n:"Other",p:16}],
  ethProfiles:{
    "Ovambo":"Dominant northern group, SWAPO base. Politically and demographically majority.",
    "Herero":"Victims of 1904-1908 German colonial genocide. Pastoralist culture with distinctive dress.",
    "White":"German and Afrikaner settler descendants. Retain disproportionate land and economic power."
  }
},
"562":{  // Niger
  ethnicities:[{n:"Hausa",p:53},{n:"Zarma-Songhai",p:21},{n:"Tuareg",p:11},{n:"Fulani",p:7},{n:"Kanuri",p:6},{n:"Other",p:2}],
  ethProfiles:{
    "Hausa":"Muslim majority of the south, linked to Nigerian Hausa. Trading and agricultural culture.",
    "Tuareg":"Saharan nomads of the north. Multiple rebellions; heavy security focus since 2012."
  }
},
"566":{  // Nigeria
  ethnicities:[{n:"Hausa-Fulani",p:29},{n:"Yoruba",p:21},{n:"Igbo",p:18},{n:"Ijaw",p:10},{n:"Kanuri",p:4},{n:"Other",p:18}],
  ethProfiles:{
    "Hausa-Fulani":"Muslim north, politically dominant since independence. Traditional emirate structures remain powerful; Boko Haram insurgency in northeast.",
    "Yoruba":"Southwestern group, predominantly Christian and Muslim mix. Urbanized and commercially active; Lagos heartland.",
    "Igbo":"Southeastern Christian majority. Biafra secession war (1967-70); ongoing marginalization grievances and Biafra separatist revival.",
    "Ijaw":"Niger Delta oil region. Militant groups demand resource control; environmental devastation from oil."
  }
},
"646":{  // Rwanda
  ethnicities:[{n:"Hutu",p:84},{n:"Tutsi",p:15},{n:"Twa",p:1}],
  ethProfiles:{
    "Hutu":"Majority agriculturalists. Perpetrators of 1994 genocide against Tutsi; now officially de-ethnicized under Kagame's 'Rwandan' identity policy.",
    "Tutsi":"Historically dominant pastoralist minority. 800,000+ killed in 1994 genocide; diaspora-led RPF now rules the country.",
    "Twa":"Indigenous pygmy minority, severely marginalized."
  }
},
"686":{  // Senegal
  ethnicities:[{n:"Wolof",p:38},{n:"Fulani",p:27},{n:"Serer",p:15},{n:"Jola",p:5},{n:"Mandinka",p:5},{n:"Other",p:10}],
  ethProfiles:{
    "Wolof":"Dominant group, particularly in cities. Wolof language functions as national lingua franca beyond ethnic boundaries.",
    "Jola":"Southern Casamance region. Long-running low-intensity separatist conflict."
  }
},
"694":{  // Sierra Leone
  ethnicities:[{n:"Temne",p:35},{n:"Mende",p:31},{n:"Limba",p:8},{n:"Kono",p:5},{n:"Krio",p:2},{n:"Other",p:19}],
  ethProfiles:{
    "Temne":"Northern Muslim majority. Politically influential through APC party.",
    "Mende":"Southeastern group, SLPP party base. Civil war (1991-2002) had ethnic dimensions.",
    "Krio":"Descendants of freed slaves settled in Freetown. Small but historically influential English-speaking elite."
  }
},
"706":{  // Somalia
  ethnicities:[{n:"Somali",p:85},{n:"Bantu",p:10},{n:"Arab",p:4},{n:"Other",p:1}],
  ethProfiles:{
    "Somali":"Ethnically homogeneous but fractured along clan lines: Darod, Hawiye, Isaaq, Dir, Rahanweyn. Clan politics drove civil war and continue to shape governance.",
    "Bantu":"Agricultural minority of southern river valleys, descendants of slaves. Severely marginalized and displaced."
  }
},
"710":{  // South Africa
  ethnicities:[{n:"Black African",p:81},{n:"Coloured",p:9},{n:"White",p:7},{n:"Indian/Asian",p:3}],
  ethProfiles:{
    "Black African":"Majority comprising Zulu (largest), Xhosa, Sotho, Tswana, Pedi, Venda, Tsonga, Swazi, Ndebele. Political power since 1994 through ANC; deep socioeconomic inequality persists.",
    "Coloured":"Mixed-race population, particularly in Western Cape. Unique Afrikaans-speaking identity; politically ambivalent between ANC and DA.",
    "White":"Afrikaners (Dutch descent) and English-speakers. Lost political power in 1994 but retain disproportionate wealth and land.",
    "Indian/Asian":"Descendants of indentured laborers and merchants from British India. Concentrated in Durban area."
  }
},
"728":{  // South Sudan
  ethnicities:[{n:"Dinka",p:36},{n:"Nuer",p:16},{n:"Shilluk",p:3},{n:"Azande",p:3},{n:"Bari",p:3},{n:"Other",p:39}],
  ethProfiles:{
    "Dinka":"Largest group, pastoralists of the White Nile plains. Politically dominant through SPLM; Salva Kiir is Dinka.",
    "Nuer":"Second-largest, historical rivalry with Dinka. Civil war (2013-2020) largely fought along Dinka-Nuer lines; Riek Machar leads Nuer faction."
  }
},
"729":{  // Sudan
  ethnicities:[{n:"Sudanese Arab",p:70},{n:"Fur",p:5},{n:"Beja",p:5},{n:"Nuba",p:4},{n:"Fallata",p:3},{n:"Other",p:13}],
  ethProfiles:{
    "Sudanese Arab":"Nile valley majority, politically and economically dominant. Nubian admixture; distinct from Gulf Arabs.",
    "Fur":"Darfur region, victims of 2003-onwards genocide by Janjaweed militias. Continues under current civil war.",
    "Nuba":"Mountainous south, largely African and Christian/animist. Marginalized and targeted in northern counterinsurgencies."
  }
},
"834":{  // Tanzania (override if basic)
  ethnicities:[{n:"Mainland Bantu",p:95},{n:"Zanzibari Arab-African",p:3},{n:"Other",p:2}],
  ethProfiles:{
    "Mainland Bantu":"Over 120 ethnic groups, none dominant — Nyerere's Ujamaa policy and Swahili language forged unusual national unity. Sukuma are largest (~16%).",
    "Zanzibari Arab-African":"Zanzibar archipelago has distinct Arab-influenced Swahili culture, Omani legacy. Periodic tensions with mainland."
  }
},
"768":{  // Togo
  ethnicities:[{n:"Ewe",p:32},{n:"Kabyé",p:22},{n:"Watchi",p:10},{n:"Mina",p:6},{n:"Other",p:30}],
  ethProfiles:{
    "Ewe":"Southern majority, culturally linked to Ghanaian Ewe. Commercial and educational dominance but politically marginalized.",
    "Kabyé":"Northern group, politically dominant through the Eyadéma/Gnassingbé family since 1967."
  }
},
"788":{  // Tunisia
  ethnicities:[{n:"Arab-Berber",p:98},{n:"Other",p:2}],
  ethProfiles:{
    "Arab-Berber":"Largely Arabized Berber population. Small Berber-speaking communities remain in Djerba and southern oases. Homogeneous national identity."
  }
},
"800":{  // Uganda
  ethnicities:[{n:"Baganda",p:16},{n:"Banyankole",p:10},{n:"Basoga",p:9},{n:"Bakiga",p:7},{n:"Iteso",p:7},{n:"Langi",p:6},{n:"Acholi",p:5},{n:"Other",p:40}],
  ethProfiles:{
    "Baganda":"Central Uganda, largest single group. Traditional Buganda kingdom retains cultural power; Kampala heartland.",
    "Banyankole":"Southwestern pastoralists, Museveni's group. Politically dominant since 1986.",
    "Acholi":"Northern Nilotic group, victims of Lord's Resistance Army insurgency (1987-2006)."
  }
},
"894":{  // Zambia
  ethnicities:[{n:"Bemba",p:21},{n:"Tonga",p:14},{n:"Chewa",p:7},{n:"Lozi",p:6},{n:"Nsenga",p:5},{n:"Other",p:47}],
  ethProfiles:{
    "Bemba":"Northern Copperbelt group, politically influential. Matrilineal kinship; mining-heartland base.",
    "Lozi":"Western floodplain kingdom with traditional monarchy; occasional secessionist sentiment."
  }
},
"716":{  // Zimbabwe
  ethnicities:[{n:"Shona",p:82},{n:"Ndebele",p:14},{n:"Other African",p:2},{n:"White",p:1},{n:"Mixed/Asian",p:1}],
  ethProfiles:{
    "Shona":"Dominant majority, ZANU-PF base. Includes Karanga, Zezuru (Mugabe's group), Manyika subgroups.",
    "Ndebele":"Southwestern minority, descendants of Nguni migrations. Victims of Gukurahundi massacres (1983-87) under Mugabe; continued political marginalization.",
    "White":"Formerly powerful Rhodesian settlers, drastically reduced after 2000 land reforms."
  }
}

};

// Merge into COUNTRY_DB after data.js loads
if(typeof COUNTRY_DB!=='undefined'){
  Object.keys(ETH).forEach(id=>{
    if(!COUNTRY_DB[id])COUNTRY_DB[id]={};
    if(!COUNTRY_DB[id].ethnicities)COUNTRY_DB[id].ethnicities=ETH[id].ethnicities;
    if(!COUNTRY_DB[id].ethProfiles)COUNTRY_DB[id].ethProfiles=ETH[id].ethProfiles;
    else Object.assign(COUNTRY_DB[id].ethProfiles,ETH[id].ethProfiles);
  });
}
window._ETH_AFRICA=ETH;
})();
