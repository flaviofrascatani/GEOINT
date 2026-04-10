// GEOINT v7 — Ethnic Composition: Americas
(function(){
const ETH = {

"32":{  // Argentina (override)
  ethnicities:[{n:"European (Italian, Spanish)",p:85},{n:"Mestizo",p:8},{n:"Arab",p:3},{n:"Amerindian",p:2},{n:"Other",p:2}],
  ethProfiles:{
    "European (Italian, Spanish)":"Massive Italian and Spanish immigration (1880-1930) created the whitest population in Latin America. ~60% have Italian ancestry. Cultural identity explicitly European.",
    "Mestizo":"Mixed European-Amerindian, concentrated in the northwest and northeast provinces.",
    "Amerindian":"Mapuche (Patagonia), Kolla, Wichí. Historically marginalized; land rights conflicts ongoing.",
    "Arab":"Lebanese and Syrian Christian immigrants. Carlos Menem was of Syrian descent."
  }
},
"44":{  // Bahamas
  ethnicities:[{n:"Afro-Bahamian",p:91},{n:"European",p:5},{n:"Mixed",p:2},{n:"Other",p:2}],
  ethProfiles:{
    "Afro-Bahamian":"Descendants of enslaved Africans and British Loyalist-era arrivals. Protestant Christian majority; distinct Bahamian Creole identity.",
    "European":"White minority including descendants of American Loyalists and later British settlers; disproportionate economic influence."
  }
},
"52":{  // Barbados
  ethnicities:[{n:"Afro-Barbadian",p:92},{n:"White",p:3},{n:"Mixed",p:3},{n:"Other",p:2}],
  ethProfiles:{
    "Afro-Barbadian":"Descendants of enslaved Africans on sugar plantations. Became first English slave society; 'Little England' cultural identity.",
    "White":"Includes 'Redlegs', descendants of Irish and Scottish indentured servants — Caribbean's only white underclass."
  }
},
"84":{  // Belize
  ethnicities:[{n:"Mestizo",p:53},{n:"Creole",p:26},{n:"Maya",p:11},{n:"Garifuna",p:6},{n:"Other",p:4}],
  ethProfiles:{
    "Mestizo":"Spanish-Maya mix, many from refugees of Yucatán Caste War (1847). Growing due to Central American migration.",
    "Creole":"Afro-European, English-speaking. Historically dominant culture; Kriol language.",
    "Maya":"Yucatec, Mopan, and Kekchi Maya. Concentrated in southern districts.",
    "Garifuna":"Descendants of Africans and Caribs deported from St. Vincent in 1797. Unique language and culture."
  }
},
"68":{  // Bolivia
  ethnicities:[{n:"Mestizo",p:68},{n:"Indigenous",p:20},{n:"White",p:5},{n:"Cholo",p:2},{n:"Afro-Bolivian",p:1},{n:"Other",p:4}],
  ethProfiles:{
    "Mestizo":"Mixed Spanish-indigenous. Dominant in cities and commerce.",
    "Indigenous":"Primarily Quechua and Aymara. Most indigenous country in Americas by population share. Evo Morales (2006-2019) was first indigenous president; major political empowerment.",
    "Afro-Bolivian":"Small community in Yungas region, descendants of enslaved Africans in mining era. Hereditary king."
  }
},
"76":{  // Brazil (override)
  ethnicities:[{n:"White (Branco)",p:43},{n:"Mixed (Pardo)",p:47},{n:"Black (Preto)",p:9},{n:"Asian",p:1},{n:"Indigenous",p:0.5}],
  ethProfiles:{
    "White (Branco)":"Primarily Portuguese, Italian, German, Spanish ancestry. Dominant in south and southeast; São Paulo has Japan's largest diaspora outside Japan.",
    "Mixed (Pardo)":"Mixed European-African-Indigenous. Largest group; heterogeneous category reflecting complex colonial history and 'racial democracy' ideology.",
    "Black (Preto)":"Descendants of ~4 million enslaved Africans (largest slave import in Americas). Concentrated in northeast (Bahia); significant cultural influence (samba, capoeira, candomblé). Deep socioeconomic inequality.",
    "Indigenous":"~900,000 in 300+ groups, mostly in Amazon. Yanomami, Guarani, Kayapó among largest; land rights under constant pressure from ranching and mining."
  }
},
"124":{  // Canada
  ethnicities:[{n:"European Canadian",p:67},{n:"Asian Canadian",p:18},{n:"Indigenous",p:5},{n:"Black",p:4},{n:"Latin American",p:2},{n:"Arab",p:2},{n:"Other",p:2}],
  ethProfiles:{
    "European Canadian":"British and French founding populations; Quebec's 6M francophones form distinct society with nationalist movement. Major post-WW2 European immigration (Italian, German, Ukrainian, Polish).",
    "Asian Canadian":"Fastest-growing group. Chinese largest, then Indian, Filipino. Concentrated in Toronto and Vancouver.",
    "Indigenous":"First Nations, Inuit, and Métis. Residential school system recognized as cultural genocide; ongoing reconciliation process.",
    "Black":"Mix of long-established communities (Nova Scotia, Ontario) and recent Caribbean and African immigration."
  }
},
"152":{  // Chile
  ethnicities:[{n:"European/Mestizo",p:89},{n:"Mapuche",p:9},{n:"Aymara",p:1},{n:"Other Indigenous",p:1}],
  ethProfiles:{
    "European/Mestizo":"Primarily Spanish ancestry with significant German, Italian, Croatian, British additions. Census doesn't formally separate white from mestizo; relatively homogeneous compared to other Latin American countries.",
    "Mapuche":"Southern indigenous group, historically resisted Spanish and Chilean conquest. Ongoing land conflicts in Araucanía region; sporadic violent clashes with state."
  }
},
"170":{  // Colombia
  ethnicities:[{n:"Mestizo",p:58},{n:"White",p:20},{n:"Afro-Colombian",p:11},{n:"Mulatto",p:7},{n:"Indigenous",p:4}],
  ethProfiles:{
    "Mestizo":"Mixed Spanish-indigenous majority, dominant in interior Andean cities.",
    "White":"European ancestry, particularly Spanish. Concentrated in Medellín (Antioquia) with distinctive Paisa identity.",
    "Afro-Colombian":"Descendants of enslaved Africans. Pacific coast concentrations; severely affected by decades of conflict and displacement.",
    "Indigenous":"Over 80 groups; Wayuu, Nasa, Emberá among largest. Constitutional rights expanded since 1991."
  }
},
"188":{  // Costa Rica
  ethnicities:[{n:"White/Mestizo",p:83},{n:"Mulatto",p:7},{n:"Indigenous",p:3},{n:"Black",p:1},{n:"Other",p:6}],
  ethProfiles:{
    "White/Mestizo":"Spanish ancestry dominant, with smaller indigenous admixture than most Latin American countries. National myth of 'white' Costa Rica; relatively egalitarian society.",
    "Black":"Afro-Caribbean concentrated on Atlantic coast (Limón), descendants of Jamaican railway workers. English-speaking Protestant culture distinct from Hispanic majority."
  }
},
"192":{  // Cuba
  ethnicities:[{n:"White",p:64},{n:"Mulatto/Mestizo",p:27},{n:"Black",p:9}],
  ethProfiles:{
    "White":"Primarily Spanish ancestry, last wave in early 20th century. Concentrated in Havana and west; many emigrated post-1959.",
    "Mulatto/Mestizo":"Mixed African-European. Revolution's rhetoric of racial equality masks continued inequality.",
    "Black":"Descendants of enslaved Africans (sugar economy). Stronger Santería and Afro-Cuban cultural traditions; historically more supportive of revolution."
  }
},
"214":{  // Dominican Rep.
  ethnicities:[{n:"Mixed (Mulatto/Mestizo)",p:71},{n:"Black",p:16},{n:"White",p:12},{n:"Other",p:1}],
  ethProfiles:{
    "Mixed (Mulatto/Mestizo)":"Majority with complex African-European-Taíno heritage. National identity historically distanced from 'blackness', especially in contrast to Haiti.",
    "Black":"Afro-Dominican including recent Haitian immigrants and descendants. Discrimination against Haitian-descended population remains acute; 2013 statelessness crisis."
  }
},
"218":{  // Ecuador
  ethnicities:[{n:"Mestizo",p:72},{n:"Montubio",p:7},{n:"Afro-Ecuadorian",p:7},{n:"Indigenous",p:7},{n:"White",p:6},{n:"Other",p:1}],
  ethProfiles:{
    "Mestizo":"Spanish-indigenous mix, urban majority.",
    "Indigenous":"Quichua, Shuar, and others. Strong political organization (CONAIE); repeatedly toppled governments through mobilization.",
    "Afro-Ecuadorian":"Concentrated in Esmeraldas and Chota Valley. Historically marginalized."
  }
},
"222":{  // El Salvador
  ethnicities:[{n:"Mestizo",p:86},{n:"White",p:13},{n:"Indigenous",p:1}],
  ethProfiles:{
    "Mestizo":"Dominant majority. Indigenous identity largely suppressed after 1932 Matanza (massacre) killed 30,000 mostly indigenous people.",
    "Indigenous":"Pipil and Lenca survivors, cultural revival since 1990s."
  }
},
"320":{  // Guatemala
  ethnicities:[{n:"Ladino (Mestizo)",p:56},{n:"Maya",p:42},{n:"Xinca",p:1},{n:"Garifuna",p:1}],
  ethProfiles:{
    "Ladino (Mestizo)":"Spanish-speaking, mixed or acculturated population. Politically and economically dominant.",
    "Maya":"21 distinct Maya groups (K'iche', Q'eqchi', Mam, Kaqchikel largest). Victims of genocidal counterinsurgency (1980s), ~200,000 killed or disappeared. Rigoberta Menchú Nobel Peace Prize 1992."
  }
},
"328":{  // Guyana
  ethnicities:[{n:"Indo-Guyanese",p:40},{n:"Afro-Guyanese",p:29},{n:"Mixed",p:20},{n:"Indigenous",p:11}],
  ethProfiles:{
    "Indo-Guyanese":"Descendants of indentured laborers from India brought after abolition. Mostly Hindu, some Muslim; rural sugar economy base.",
    "Afro-Guyanese":"Descendants of enslaved Africans. Urban concentration; public sector and military presence.",
    "Indigenous":"Nine 'Amerindian' peoples including Arawak, Carib, Wai-Wai. Interior hinterland; subsistence economies."
  }
},
"332":{  // Haiti
  ethnicities:[{n:"Black",p:95},{n:"Mulatto",p:5}],
  ethProfiles:{
    "Black":"Descendants of enslaved Africans. Haiti was first black republic (1804) after successful slave revolt. Kreyòl-speaking majority, Vodou cultural tradition.",
    "Mulatto":"Mixed-race elite historically dominant economically and politically. French-speaking, Catholic, Europe-oriented. Deep class-color correlation."
  }
},
"340":{  // Honduras
  ethnicities:[{n:"Mestizo",p:90},{n:"Indigenous",p:7},{n:"Black (Garifuna)",p:2},{n:"White",p:1}],
  ethProfiles:{
    "Mestizo":"Overwhelming majority in 'mixed' category.",
    "Indigenous":"Lenca (largest), Miskito, Maya Chortí. Lenca activist Berta Cáceres assassinated 2016.",
    "Black (Garifuna)":"Afro-Caribbean communities on north coast, descendants of St. Vincent deportees (1797)."
  }
},
"388":{  // Jamaica
  ethnicities:[{n:"Black",p:92},{n:"Mixed",p:6},{n:"East Indian",p:1},{n:"Other",p:1}],
  ethProfiles:{
    "Black":"Descendants of enslaved Africans. 'Out of many, one people' motto; Rastafari movement originated here; global cultural influence through reggae.",
    "Mixed":"Long-established Creole population with European/Chinese/Indian admixture."
  }
},
"484":{  // Mexico
  ethnicities:[{n:"Mestizo",p:62},{n:"Indigenous",p:21},{n:"White",p:11},{n:"Afro-Mexican",p:2},{n:"Other",p:4}],
  ethProfiles:{
    "Mestizo":"National identity built around mestizaje ideology post-Revolution. Dominant in central and north.",
    "Indigenous":"68 recognized languages; Nahuatl, Maya, Zapotec, Mixtec largest. Chiapas heartland of Zapatista movement (1994-present). Self-identification rising.",
    "White":"Spanish and later European immigration (French, Italian, German, Lebanese). Concentrated in elite urban neighborhoods.",
    "Afro-Mexican":"Historically invisible; constitutionally recognized only in 2019. Concentrated on Costa Chica (Guerrero, Oaxaca) and Veracruz."
  }
},
"558":{  // Nicaragua
  ethnicities:[{n:"Mestizo",p:69},{n:"White",p:17},{n:"Black",p:9},{n:"Indigenous",p:5}],
  ethProfiles:{
    "Mestizo":"Pacific/central majority. Hispanic cultural mainstream.",
    "Black":"Creole English-speaking Afro-Caribbean on Atlantic coast, historically autonomous; recent Sandinista-era tensions.",
    "Indigenous":"Miskito, Sumo-Mayangna, Rama on Atlantic coast; Chorotega in Pacific. Atlantic autonomy granted 1987."
  }
},
"591":{  // Panama
  ethnicities:[{n:"Mestizo",p:65},{n:"Native American",p:12},{n:"Black",p:9},{n:"Mulatto",p:7},{n:"White",p:7}],
  ethProfiles:{
    "Mestizo":"Hispanic-indigenous majority, dominant in central provinces.",
    "Native American":"Guna (Kuna), Ngäbe-Buglé, Emberá, Wounaan. Guna Yala autonomous comarca celebrated for self-governance.",
    "Black":"Afro-Antillean, descendants of Canal-era Caribbean workers (many from Barbados, Jamaica). English-speaking Protestant; Canal Zone heritage."
  }
},
"600":{  // Paraguay
  ethnicities:[{n:"Mestizo",p:95},{n:"Indigenous",p:2},{n:"Other",p:3}],
  ethProfiles:{
    "Mestizo":"Overwhelmingly Spanish-Guaraní mixed. Unique bilingual nation — Guaraní spoken by 90% of population, equal official status with Spanish.",
    "Indigenous":"19 ethnic groups, most distinct cultural identity in Chaco region. Severe land pressure from soy expansion."
  }
},
"604":{  // Peru
  ethnicities:[{n:"Mestizo",p:60},{n:"Indigenous",p:26},{n:"White",p:6},{n:"Afro-Peruvian",p:4},{n:"Asian",p:2},{n:"Other",p:2}],
  ethProfiles:{
    "Mestizo":"Dominant in urban coast and commercial sectors.",
    "Indigenous":"Largest groups are Quechua (Andes) and Aymara (altiplano). Amazonian peoples also significant. Fujimori-era sterilization scandal; ongoing underrepresentation.",
    "Asian":"Significant Japanese community (Fujimori was Nikkei); older Chinese immigration integrated into mestizo identity."
  }
},
"740":{  // Suriname
  ethnicities:[{n:"Hindustani",p:27},{n:"Maroon",p:22},{n:"Creole",p:16},{n:"Javanese",p:14},{n:"Mixed",p:13},{n:"Indigenous",p:4},{n:"Other",p:4}],
  ethProfiles:{
    "Hindustani":"Indian indentured-labor descendants, Hindu and Muslim.",
    "Maroon":"Descendants of escaped enslaved Africans who formed independent communities in interior rainforest. Six distinct tribes; preserved strong African cultural continuity.",
    "Javanese":"Dutch-colonial-era Indonesian laborers. Muslim, distinct cultural identity.",
    "Creole":"Urban mixed African-European population."
  }
},
"780":{  // Trinidad
  ethnicities:[{n:"Indo-Trinidadian",p:35},{n:"Afro-Trinidadian",p:34},{n:"Mixed",p:23},{n:"Other",p:8}],
  ethProfiles:{
    "Indo-Trinidadian":"Indian indentured-labor descendants, majority Hindu with Muslim minority. Politically supports UNC.",
    "Afro-Trinidadian":"African-descended, home of calypso and steel pan. Politically supports PNM."
  }
},
"858":{  // Uruguay
  ethnicities:[{n:"White (European)",p:88},{n:"Mestizo",p:8},{n:"Black",p:4}],
  ethProfiles:{
    "White (European)":"Heavy Italian and Spanish immigration like Argentina. Indigenous Charrúa population wiped out in 1831 Salsipuedes massacre.",
    "Black":"Small Afro-Uruguayan minority, Montevideo concentration. Candombe drumming tradition UNESCO-recognized."
  }
},
"862":{  // Venezuela
  ethnicities:[{n:"Mestizo",p:52},{n:"White",p:43},{n:"Black",p:3},{n:"Indigenous",p:2}],
  ethProfiles:{
    "Mestizo":"Mixed Spanish-indigenous-African majority.",
    "White":"Significant 20th-century European immigration (Italian, Spanish, Portuguese, German). Concentrated in elite sectors; most affected by post-2015 exodus.",
    "Indigenous":"~40 groups in Amazon, Zulia, and highlands. Wayuu largest; constitutional recognition under Chávez 1999."
  }
},
"840":{  // USA (augment — existing data has ethnicities; skip merge as it has them)
  ethnicities:[{n:"White",p:58},{n:"Hispanic/Latino",p:19},{n:"Black",p:12},{n:"Asian",p:6},{n:"Other/Mixed",p:5}],
  ethProfiles:{
    "White":"Historically dominant majority of European descent. Anglo-Protestant cultural mainstream, though increasingly pluralistic. Declining as share of population.",
    "Hispanic/Latino":"Fastest-growing demographic, primarily Mexican, Puerto Rican, Central American. Growing political influence in swing states.",
    "Black":"Descended from enslaved Africans; significant Caribbean and African immigrants. Enormous cultural influence: jazz, hip-hop, literature, sports.",
    "Asian":"Diverse: Chinese, Indian, Filipino, Vietnamese, Korean. Highest median household income. Concentrated in California, New York, tech hubs.",
    "Other/Mixed":"Includes Native Americans (~2%), multiracial. Native Americans retain sovereignty through tribal nations but face poverty."
  }
}

};
if(typeof COUNTRY_DB!=='undefined'){
  Object.keys(ETH).forEach(id=>{
    if(!COUNTRY_DB[id])COUNTRY_DB[id]={};
    if(!COUNTRY_DB[id].ethnicities)COUNTRY_DB[id].ethnicities=ETH[id].ethnicities;
    if(!COUNTRY_DB[id].ethProfiles)COUNTRY_DB[id].ethProfiles=ETH[id].ethProfiles;
    else Object.assign(COUNTRY_DB[id].ethProfiles,ETH[id].ethProfiles);
  });
}
})();
