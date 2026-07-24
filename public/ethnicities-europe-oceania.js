// GEOINT v7 — Ethnic Composition: Europe & Oceania
(function(){
const ETH = {

// ============ EUROPE ============
"8":{  // Albania
  ethnicities:[{n:"Albanian",p:83},{n:"Greek",p:1},{n:"Other",p:16}],
  ethProfiles:{
    "Albanian":"Ethnically distinct Indo-European language; divided between Ghegs (north) and Tosks (south). Muslim majority (~60%) with Orthodox and Catholic minorities.",
    "Greek":"Concentrated in south (Northern Epirus). Long-running sensitive issue with Greece."
  }
},
"20":{  // Andorra
  ethnicities:[{n:"Andorran",p:49},{n:"Spanish",p:24},{n:"Portuguese",p:11},{n:"French",p:4},{n:"Other",p:12}],
  ethProfiles:{
    "Andorran":"Catalan-speaking, culturally Catalan. Native citizens minority in own country due to restrictive naturalization."
  }
},
"40":{  // Austria
  ethnicities:[{n:"Austrian",p:81},{n:"German",p:3},{n:"Serb",p:2},{n:"Turkish",p:2},{n:"Other",p:12}],
  ethProfiles:{
    "Austrian":"German-speaking with distinct Austrian identity. Historically core of Habsburg Empire; Catholic tradition.",
    "Turkish":"Post-1960s labor migration, centered in Vienna. Integration debates prominent politically."
  }
},
"112":{  // Belarus
  ethnicities:[{n:"Belarusian",p:83},{n:"Russian",p:8},{n:"Polish",p:3},{n:"Ukrainian",p:2},{n:"Other",p:4}],
  ethProfiles:{
    "Belarusian":"East Slavic, linguistically close to Russian and Ukrainian. Russified during Soviet era; Belarusian language limited use. Lukashenko regime closely allied with Moscow."
  }
},
"56":{  // Belgium
  ethnicities:[{n:"Fleming (Dutch)",p:58},{n:"Walloon (French)",p:31},{n:"German",p:1},{n:"Other",p:10}],
  ethProfiles:{
    "Fleming (Dutch)":"Dutch-speaking northerners. Economically ascendant since WW2; strong nationalist/separatist movement (N-VA, Vlaams Belang).",
    "Walloon (French)":"French-speaking southerners, historically industrial and politically dominant. Now struggling economically.",
    "German":"Small German-speaking community in eastern cantons, transferred from Germany in 1919."
  }
},
"70":{  // Bosnia
  ethnicities:[{n:"Bosniak",p:50},{n:"Serb",p:31},{n:"Croat",p:15},{n:"Other",p:4}],
  ethProfiles:{
    "Bosniak":"Slavic Muslims, 1992-95 war targeted them for genocide (Srebrenica). Concentrated in central Bosnia.",
    "Serb":"Orthodox Christians in Republika Srpska entity. Sponsored by Belgrade; continued secessionist rhetoric under Dodik.",
    "Croat":"Catholic, concentrated in western Herzegovina. Federation partner with Bosniaks; push for third entity."
  }
},
"100":{  // Bulgaria
  ethnicities:[{n:"Bulgarian",p:85},{n:"Turkish",p:9},{n:"Roma",p:5},{n:"Other",p:1}],
  ethProfiles:{
    "Bulgarian":"Orthodox Christian Slavic majority with Thracian and proto-Bulgar roots.",
    "Turkish":"Muslim, descendants of Ottoman era. 1984-89 'revival process' forced name changes; 350,000 fled to Turkey.",
    "Roma":"Marginalized; higher share than official statistics suggest."
  }
},
"191":{  // Croatia
  ethnicities:[{n:"Croat",p:91},{n:"Serb",p:3},{n:"Other",p:6}],
  ethProfiles:{
    "Croat":"Catholic Slavs with distinct Central European orientation. Ethnically homogeneous post-1995 war; Operation Storm expelled ~200,000 Serbs."
  }
},
"203":{  // Czechia
  ethnicities:[{n:"Czech",p:64},{n:"Moravian",p:5},{n:"Slovak",p:1},{n:"Other",p:30}],
  ethProfiles:{
    "Czech":"West Slavic, historically Bohemian. Most secular country in Europe.",
    "Moravian":"Distinct regional identity within Czechia, particularly in south; same language."
  }
},
"208":{  // Denmark
  ethnicities:[{n:"Danish",p:86},{n:"Other European",p:8},{n:"Middle Eastern",p:3},{n:"Other",p:3}],
  ethProfiles:{
    "Danish":"Homogeneous North Germanic population. Faroese and Greenlandic (Inuit) within the kingdom have distinct identities.",
    "Middle Eastern":"Turks, Iraqis, Lebanese, Syrians. Integration debates central to Danish politics; some of Europe's strictest immigration policies."
  }
},
"233":{  // Estonia
  ethnicities:[{n:"Estonian",p:69},{n:"Russian",p:25},{n:"Ukrainian",p:2},{n:"Belarusian",p:1},{n:"Other",p:3}],
  ethProfiles:{
    "Estonian":"Finnic (non-Indo-European) language and identity. Lutheran heritage but highly secular.",
    "Russian":"Soviet-era settlers concentrated in Tallinn and northeast (Narva). Citizenship issues: many hold 'alien passports'; language tensions."
  }
},
"246":{  // Finland
  ethnicities:[{n:"Finnish",p:87},{n:"Swedish-speaking",p:5},{n:"Other Finnic",p:1},{n:"Other",p:7}],
  ethProfiles:{
    "Finnish":"Finnic (Uralic) language. Historically ruled by Sweden then Russia; independence 1917. Joined NATO 2023 after Russia's Ukraine invasion.",
    "Swedish-speaking":"Finland Swedes — distinct minority with constitutional language rights. Concentrated on coast, Åland Islands.",
    "Other Finnic":"Sami indigenous people in the north; 3 distinct Sami languages."
  }
},
"250":{  // France (override)
  ethnicities:[{n:"French (various)",p:85},{n:"North African",p:7},{n:"Sub-Saharan African",p:4},{n:"Other",p:4}],
  ethProfiles:{
    "French (various)":"Majority of European descent with regional identities (Breton, Occitan, Corsican, Alsatian, Basque). Strong assimilationist ideology (laïcité); census banned from ethnic data collection.",
    "North African":"Algerian, Moroccan, Tunisian origin. Concentrated in banlieues around Paris, Lyon, Marseille. Higher unemployment, housing discrimination. Source of ongoing tensions around secularism and integration.",
    "Sub-Saharan African":"From former colonies (Senegal, Mali, Cameroon, Ivory Coast). Vibrant cultural contribution in music, literature, sports. Face similar integration challenges.",
    "Other":"European (Portuguese, Italian, Spanish, Polish); Asian (Vietnamese, Chinese); Caribbean DOM-TOM citizens."
  }
},
"276":{  // Germany (override)
  ethnicities:[{n:"German",p:80},{n:"Turkish",p:3},{n:"Polish",p:2},{n:"Russian",p:2},{n:"Other",p:13}],
  ethProfiles:{
    "German":"Ethnically homogeneous historically, but post-1990s has become a major immigration country. Regional identities (Bavarian, Saxon, Swabian) remain strong.",
    "Turkish":"Descendants of 'Gastarbeiter' (guest workers) recruited in 1960s. Largest foreign-origin community; integration debates ongoing.",
    "Polish":"Large population in Ruhr from 19th century plus post-2004 EU migration.",
    "Russian":"Includes ethnic Germans (Spätaussiedler) who returned after USSR collapse, and actual Russians and Ukrainians.",
    "Other":"Syrian, Afghan, Iraqi refugees post-2015; Balkan populations; Southern European crisis migrants; growing African and Asian communities."
  }
},
"300":{  // Greece
  ethnicities:[{n:"Greek",p:91},{n:"Albanian",p:4},{n:"Other",p:5}],
  ethProfiles:{
    "Greek":"Orthodox Christian, ancient continuous identity. Post-1923 population exchange with Turkey created homogeneity.",
    "Albanian":"Largely post-1991 economic migrants. Some historic Arvanite population long assimilated."
  }
},
"348":{  // Hungary
  ethnicities:[{n:"Hungarian",p:86},{n:"Roma",p:3},{n:"German",p:2},{n:"Other",p:9}],
  ethProfiles:{
    "Hungarian":"Magyar — unique Uralic language in region. Strong national identity; ~2 million ethnic Hungarians live in neighboring countries (Trianon legacy). Orbán's nationalist politics built on this.",
    "Roma":"Largest minority, officially undercount. Severe discrimination and poverty."
  }
},
"352":{  // Iceland
  ethnicities:[{n:"Icelandic",p:86},{n:"Polish",p:5},{n:"Other",p:9}],
  ethProfiles:{
    "Icelandic":"Norse descendants with Celtic admixture. Extraordinary genealogical continuity; Íslendingabók lineage database.",
    "Polish":"Largest immigrant community since EU expansion, ~20,000."
  }
},
"372":{  // Ireland
  ethnicities:[{n:"Irish",p:82},{n:"Other White",p:9},{n:"Asian",p:2},{n:"Black",p:1},{n:"Irish Traveller",p:1},{n:"Other",p:5}],
  ethProfiles:{
    "Irish":"Celtic Gaelic heritage; Catholic majority though secularizing rapidly.",
    "Irish Traveller":"Indigenous nomadic minority, officially recognized 2017. Distinct identity and language (Cant/Shelta); severe discrimination."
  }
},
"380":{  // Italy (override)
  ethnicities:[{n:"Italian",p:92},{n:"Romanian",p:2},{n:"North African",p:2},{n:"Albanian",p:1},{n:"Other",p:3}],
  ethProfiles:{
    "Italian":"Regional diversity extreme by European standards: Northern (Milanese, Venetian, Piedmontese), Central (Tuscan, Roman), Southern (Neapolitan, Sicilian), Sardinian. Strong regional dialects; North-South economic divide; historical German/Slovene/French minorities (Südtirol, Aosta, Trieste).",
    "Romanian":"Largest foreign community post-2007 EU accession. Agricultural and construction labor.",
    "North African":"Tunisian, Moroccan, Egyptian. Entry point for sub-Saharan migration; political flashpoint.",
    "Albanian":"Post-1991 wave. Also historic Arbëreshë community in south (medieval refugees)."
  }
},
"428":{  // Latvia
  ethnicities:[{n:"Latvian",p:63},{n:"Russian",p:25},{n:"Belarusian",p:3},{n:"Ukrainian",p:2},{n:"Other",p:7}],
  ethProfiles:{
    "Latvian":"Baltic Indo-European language, Lutheran heritage.",
    "Russian":"Soviet-era settler population, some still 'non-citizens'. Concentrated in Riga and Latgale."
  }
},
"438":{  // Liechtenstein
  ethnicities:[{n:"Liechtensteiner",p:66},{n:"Swiss",p:10},{n:"Austrian",p:6},{n:"German",p:4},{n:"Other",p:14}],
  ethProfiles:{
    "Liechtensteiner":"Alemannic German-speaking population. One of world's smallest states; constitutional monarchy."
  }
},
"440":{  // Lithuania
  ethnicities:[{n:"Lithuanian",p:85},{n:"Polish",p:6},{n:"Russian",p:5},{n:"Belarusian",p:1},{n:"Other",p:3}],
  ethProfiles:{
    "Lithuanian":"Baltic Indo-European language, closest living relative of Sanskrit. Catholic majority.",
    "Polish":"Concentrated in Vilnius region, legacy of interwar Polish control. Some language-rights tensions."
  }
},
"442":{  // Luxembourg
  ethnicities:[{n:"Luxembourger",p:52},{n:"Portuguese",p:15},{n:"French",p:7},{n:"Italian",p:4},{n:"Belgian",p:3},{n:"German",p:2},{n:"Other",p:17}],
  ethProfiles:{
    "Luxembourger":"Luxembourgish is a distinct Moselle-Franconian language, official since 1984. Natives minority in own country.",
    "Portuguese":"Largest immigrant community, labor migration since 1960s."
  }
},
"470":{  // Malta
  ethnicities:[{n:"Maltese",p:96},{n:"Other",p:4}],
  ethProfiles:{
    "Maltese":"Unique Semitic-origin language (from Arabic) written in Latin script. Catholic majority, strong Mediterranean identity."
  }
},
"498":{  // Moldova
  ethnicities:[{n:"Moldovan/Romanian",p:75},{n:"Ukrainian",p:7},{n:"Russian",p:4},{n:"Gagauz",p:4},{n:"Bulgarian",p:2},{n:"Other",p:8}],
  ethProfiles:{
    "Moldovan/Romanian":"Romanian-speakers; identity split between those identifying as Moldovan vs Romanian. Pro-EU governments since 2020.",
    "Gagauz":"Turkic-speaking Orthodox Christians, autonomous region in south. Pro-Russian orientation.",
    "Russian":"Concentrated in Transnistria — Russian-backed breakaway region since 1992."
  }
},
"492":{  // Monaco
  ethnicities:[{n:"French",p:47},{n:"Monegasque",p:16},{n:"Italian",p:16},{n:"Other",p:21}],
  ethProfiles:{
    "Monegasque":"Native citizens minority. Distinct Ligurian-related language nearly extinct."
  }
},
"499":{  // Montenegro
  ethnicities:[{n:"Montenegrin",p:45},{n:"Serb",p:29},{n:"Bosniak",p:9},{n:"Albanian",p:5},{n:"Other",p:12}],
  ethProfiles:{
    "Montenegrin":"Orthodox South Slavs, identity distinct from Serb is politically contested. Independence from Serbia in 2006.",
    "Serb":"Claim Montenegrin identity is artificial; pro-Belgrade, pro-Moscow orientation."
  }
},
"528":{  // Netherlands
  ethnicities:[{n:"Dutch",p:76},{n:"EU/Other Western",p:6},{n:"Turkish",p:3},{n:"Moroccan",p:2},{n:"Surinamese/Antillean",p:3},{n:"Indonesian",p:2},{n:"Other",p:8}],
  ethProfiles:{
    "Dutch":"Protestant north, Catholic south historically; now highly secular. Frisian minority in north with own language.",
    "Turkish":"Post-1960s labor migration. Integration debates central to politics.",
    "Surinamese/Antillean":"Post-colonial Dutch citizens from former Caribbean colonies. Dutch-speaking and culturally integrated."
  }
},
"807":{  // N. Macedonia
  ethnicities:[{n:"Macedonian",p:58},{n:"Albanian",p:24},{n:"Turkish",p:4},{n:"Roma",p:3},{n:"Other",p:11}],
  ethProfiles:{
    "Macedonian":"South Slavic Orthodox. Greek-Macedonian identity dispute resolved by 2018 Prespa Agreement.",
    "Albanian":"Concentrated in west, Muslim. Near-civil war in 2001; Ohrid Agreement gave significant autonomy."
  }
},
"578":{  // Norway
  ethnicities:[{n:"Norwegian",p:82},{n:"Other European",p:9},{n:"Asian",p:5},{n:"African",p:2},{n:"Sami",p:1},{n:"Other",p:1}],
  ethProfiles:{
    "Norwegian":"North Germanic, Lutheran historically. Petroleum wealth enables distinctive welfare state.",
    "Sami":"Indigenous people of Arctic; recognized constitutionally, own parliament. Historic forced assimilation ended recently."
  }
},
"616":{  // Poland
  ethnicities:[{n:"Polish",p:97},{n:"Silesian",p:2},{n:"German",p:0.4},{n:"Ukrainian",p:1},{n:"Other",p:0.6}],
  ethProfiles:{
    "Polish":"Catholic Slavic majority. Extraordinarily homogeneous due to WW2 Holocaust (3 million Jews killed) and postwar border changes (German and Ukrainian populations expelled). Since 2022, ~1.5 million Ukrainian refugees."
  }
},
"620":{  // Portugal
  ethnicities:[{n:"Portuguese",p:95},{n:"Brazilian",p:2},{n:"African (PALOP)",p:2},{n:"Other",p:1}],
  ethProfiles:{
    "Portuguese":"Iberian Romance-language heritage, Catholic majority. Distinct regional identities (Minho, Beira, Alentejo, Algarve, Azores, Madeira).",
    "African (PALOP)":"From former colonies: Cape Verde, Angola, Mozambique, Guinea-Bissau, São Tomé. Post-1974 independence; integration uneven.",
    "Brazilian":"Post-2000s economic migration; linguistic affinity."
  }
},
"642":{  // Romania
  ethnicities:[{n:"Romanian",p:89},{n:"Hungarian",p:6},{n:"Roma",p:3},{n:"Other",p:2}],
  ethProfiles:{
    "Romanian":"Romance language in Slavic sea; Orthodox Christian majority.",
    "Hungarian":"Concentrated in Transylvania (Szekely Land); transferred from Hungary 1920. Minority rights protected but tensions persist.",
    "Roma":"Official count undercounts reality; discrimination widespread. Large migration to Western Europe after EU accession."
  }
},
"643":{  // Russia (override)
  ethnicities:[{n:"Russian",p:78},{n:"Tatar",p:4},{n:"Ukrainian",p:1},{n:"Bashkir",p:1},{n:"Chechen",p:1},{n:"Chuvash",p:1},{n:"Other",p:14}],
  ethProfiles:{
    "Russian":"Dominant East Slavic majority. Controls all federal institutions. Orthodox Christian tradition linked to national identity. Putin-era nationalism emphasizes Russian civilizational distinctiveness.",
    "Tatar":"Turkic Muslim population in Tatarstan. Historically conquered 1552. Maintain distinct language and Islamic identity.",
    "Chechen":"North Caucasian Muslims. Two devastating wars (1994-2009). Now ruled by Kadyrov with extreme autonomy in exchange for Putin loyalty; Chechen forces deployed in Ukraine.",
    "Bashkir":"Turkic Muslims in Urals. Important oil region.",
    "Chuvash":"Turkic Orthodox Christians in Volga region."
  }
},
"674":{  // San Marino
  ethnicities:[{n:"Sammarinese",p:84},{n:"Italian",p:12},{n:"Other",p:4}],
  ethProfiles:{
    "Sammarinese":"Italian-speaking. Oldest surviving republic; dual heads of state (Captains Regent)."
  }
},
"688":{  // Serbia
  ethnicities:[{n:"Serb",p:83},{n:"Hungarian",p:4},{n:"Roma",p:2},{n:"Bosniak",p:2},{n:"Other",p:9}],
  ethProfiles:{
    "Serb":"Orthodox Christian South Slavs. Strongly nationalist identity tied to historical Kosovo (lost in 2008 independence, not recognized by Belgrade).",
    "Hungarian":"Vojvodina autonomous province concentration, from pre-Trianon days."
  }
},
"703":{  // Slovakia
  ethnicities:[{n:"Slovak",p:80},{n:"Hungarian",p:8},{n:"Roma",p:2},{n:"Other",p:10}],
  ethProfiles:{
    "Slovak":"West Slavic, Catholic-majority, separated from Czechs in 1993 'Velvet Divorce'.",
    "Hungarian":"Southern border regions; Trianon legacy. Fico government tensions with Budapest despite shared illiberalism."
  }
},
"705":{  // Slovenia
  ethnicities:[{n:"Slovene",p:83},{n:"Serb",p:2},{n:"Croat",p:2},{n:"Bosniak",p:1},{n:"Other",p:12}],
  ethProfiles:{
    "Slovene":"South Slavs but culturally Central European (Habsburg legacy). Most ethnically homogeneous former Yugoslav state."
  }
},
"724":{  // Spain
  ethnicities:[{n:"Spanish (Castilian)",p:74},{n:"Catalan",p:17},{n:"Galician",p:6},{n:"Basque",p:2},{n:"Other",p:1}],
  ethProfiles:{
    "Spanish (Castilian)":"Dominant Castilian-speaking majority. Strong regional identities across Spain — 'Spain of the Spains'.",
    "Catalan":"Distinct language and identity, concentrated in Catalonia, Valencia, Balearics. 2017 independence crisis.",
    "Basque":"Unique non-Indo-European language (possibly Europe's oldest). ETA armed struggle (1959-2011); now democratic nationalism.",
    "Galician":"Celtic heritage, language closer to Portuguese than Spanish."
  }
},
"752":{  // Sweden
  ethnicities:[{n:"Swedish",p:79},{n:"Finnish",p:2},{n:"Middle Eastern",p:5},{n:"Other European",p:8},{n:"African",p:2},{n:"Other",p:4}],
  ethProfiles:{
    "Swedish":"North Germanic, Lutheran historically. Self-image of homogeneity disrupted by large-scale refugee intake since 1990s.",
    "Finnish":"Tornedalians on Finland border; Sweden-Finns from labor migration.",
    "Middle Eastern":"Iraqi, Syrian, Iranian, Somali, Afghan refugees. Integration debates central to politics; segregated suburbs."
  }
},
"756":{  // Switzerland
  ethnicities:[{n:"German Swiss",p:62},{n:"French Swiss",p:23},{n:"Italian Swiss",p:8},{n:"Romansh",p:0.5},{n:"Other",p:6.5}],
  ethProfiles:{
    "German Swiss":"Largest linguistic group; Swiss German dialects distinct from standard German.",
    "French Swiss":"Western Romandy cantons; politically more left-leaning than German-Swiss.",
    "Italian Swiss":"Ticino canton; cultural ties to northern Italy.",
    "Romansh":"Rhaeto-Romance, spoken in Graubünden. Constitutional language but endangered."
  }
},
"804":{  // Ukraine
  ethnicities:[{n:"Ukrainian",p:78},{n:"Russian",p:17},{n:"Belarusian",p:1},{n:"Moldovan",p:1},{n:"Other",p:3}],
  ethProfiles:{
    "Ukrainian":"East Slavic, distinct language and Greek Catholic (west) / Orthodox (center/east) traditions. Russia's 2022 invasion has solidified Ukrainian national identity dramatically.",
    "Russian":"Concentrated in east and south. Pre-war data — Donbas/Crimea occupied since 2014; massive displacement since 2022."
  }
},
"826":{  // UK (override)
  ethnicities:[{n:"White British",p:81},{n:"White Other",p:6},{n:"Asian British",p:8},{n:"Black British",p:4},{n:"Mixed",p:3},{n:"Other",p:2}],
  ethProfiles:{
    "White British":"English, Scottish, Welsh, Northern Irish. Constituent nations have distinct identities; Scottish and Welsh devolution; Northern Ireland unique situation.",
    "Asian British":"Indian, Pakistani, Bangladeshi, Chinese. Post-WW2 Commonwealth migration. Indians now Britain's highest-earning ethnic group.",
    "Black British":"Caribbean (Windrush generation) and African (Nigerian, Ghanaian — large recent waves).",
    "White Other":"EU migrants (Polish largest), white non-EU immigrants."
  }
},
"336":{  // Vatican
  ethnicities:[{n:"Italian clergy",p:80},{n:"Other clergy",p:20}],
  ethProfiles:{
    "Italian clergy":"Vatican citizenship is functional, not ethnic. Tied to Holy See employment."
  }
},

// ============ OCEANIA ============
"36":{  // Australia
  ethnicities:[{n:"Anglo-Celtic",p:58},{n:"European Other",p:18},{n:"Asian",p:17},{n:"Aboriginal/Torres Strait",p:4},{n:"Other",p:3}],
  ethProfiles:{
    "Anglo-Celtic":"English, Irish, Scottish descent. Historically dominant 'White Australia Policy' ended 1973. Declining share.",
    "European Other":"Post-WW2 Italian, Greek, German, Dutch, Yugoslav immigration.",
    "Asian":"Fastest-growing: Chinese, Indian, Vietnamese, Filipino. Concentrated in Sydney and Melbourne.",
    "Aboriginal/Torres Strait":"First peoples present for 65,000+ years. Dispossession, Stolen Generations trauma; 2023 Voice referendum defeated. Continued poor health/educational outcomes."
  }
},
"242":{  // Fiji
  ethnicities:[{n:"iTaukei (Fijian)",p:57},{n:"Indo-Fijian",p:38},{n:"Other",p:5}],
  ethProfiles:{
    "iTaukei (Fijian)":"Indigenous Melanesian-Polynesian population. Constitutional land rights; politically ascendant after several coups.",
    "Indo-Fijian":"Descendants of British-era indentured laborers. Commercially prominent; multiple coups (1987, 2000) reduced their political role."
  }
},
"296":{  // Kiribati
  ethnicities:[{n:"I-Kiribati",p:97},{n:"Other",p:3}],
  ethProfiles:{
    "I-Kiribati":"Micronesian population spread across 33 atolls. Among most climate-vulnerable nations; sea-level rise existential."
  }
},
"584":{  // Marshall Islands
  ethnicities:[{n:"Marshallese",p:92},{n:"Other",p:8}],
  ethProfiles:{
    "Marshallese":"Micronesian; nuclear testing legacy (Bikini, Enewetak) continues to impact health and displacement. Compact of Free Association with US."
  }
},
"583":{  // Micronesia
  ethnicities:[{n:"Chuukese",p:49},{n:"Pohnpeian",p:24},{n:"Kosraean",p:6},{n:"Yapese",p:6},{n:"Other",p:15}],
  ethProfiles:{
    "Chuukese":"Largest group, spread across Chuuk state. Matrilineal society."
  }
},
"520":{  // Nauru
  ethnicities:[{n:"Nauruan",p:96},{n:"Other",p:4}],
  ethProfiles:{
    "Nauruan":"Micronesian. Once world's richest per capita from phosphate mining; now environmentally devastated."
  }
},
"554":{  // New Zealand
  ethnicities:[{n:"European (Pakeha)",p:70},{n:"Maori",p:17},{n:"Asian",p:15},{n:"Pacific Islander",p:8},{n:"Other",p:3}],
  ethProfiles:{
    "European (Pakeha)":"Primarily British/Irish descent. Progressive constitutional bicultural framework via Treaty of Waitangi (1840).",
    "Maori":"Indigenous Polynesian people; strong cultural revival since 1970s. Maori language official; significant political representation.",
    "Asian":"Chinese, Indian, Korean, Filipino — fastest growing.",
    "Pacific Islander":"Samoan, Tongan, Cook Islander, Niuean, Fijian communities. Auckland is largest Polynesian city in the world."
  }
},
"585":{  // Palau
  ethnicities:[{n:"Palauan",p:73},{n:"Filipino",p:16},{n:"Other Asian",p:7},{n:"Other",p:4}],
  ethProfiles:{
    "Palauan":"Indigenous Austronesian population. Compact of Free Association with US."
  }
},
"598":{  // Papua New Guinea
  ethnicities:[{n:"Melanesian",p:96},{n:"Papuan",p:2},{n:"Other",p:2}],
  ethProfiles:{
    "Melanesian":"Over 850 languages spoken — most linguistically diverse country on Earth. Tribal ('wantok') loyalties remain central. Highlands peoples only contacted by Westerners in 20th century."
  }
},
"882":{  // Samoa
  ethnicities:[{n:"Samoan",p:93},{n:"Euronesian",p:7}],
  ethProfiles:{
    "Samoan":"Polynesian. Fa'a Samoa (Samoan way) cultural framework; strong chiefly (matai) system."
  }
},
"90":{  // Solomon Is.
  ethnicities:[{n:"Melanesian",p:95},{n:"Polynesian",p:3},{n:"Other",p:2}],
  ethProfiles:{
    "Melanesian":"Over 70 indigenous languages. Inter-island tensions (Guadalcanal/Malaita) erupted 1998-2003."
  }
},
"776":{  // Tonga
  ethnicities:[{n:"Tongan",p:97},{n:"Other",p:3}],
  ethProfiles:{
    "Tongan":"Polynesian. Only Pacific state never colonized; retains traditional monarchy (constitutional since 2010)."
  }
},
"798":{  // Tuvalu
  ethnicities:[{n:"Tuvaluan",p:97},{n:"Other",p:3}],
  ethProfiles:{
    "Tuvaluan":"Polynesian; one of world's smallest countries. Climate change existential threat; experimenting with 'digital nation' concept."
  }
},
"548":{  // Vanuatu
  ethnicities:[{n:"Ni-Vanuatu",p:98},{n:"Other",p:2}],
  ethProfiles:{
    "Ni-Vanuatu":"Melanesian, extraordinarily diverse — ~110 languages across 80 islands. Bislama creole is lingua franca."
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
