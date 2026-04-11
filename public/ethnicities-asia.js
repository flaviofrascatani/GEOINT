// GEOINT v7 — Ethnic Composition: Asia
(function(){
const ETH = {

"4":{  // Afghanistan
  ethnicities:[{n:"Pashtun",p:42},{n:"Tajik",p:27},{n:"Hazara",p:9},{n:"Uzbek",p:9},{n:"Aimak",p:4},{n:"Turkmen",p:3},{n:"Baloch",p:2},{n:"Other",p:4}],
  ethProfiles:{
    "Pashtun":"Largest group, southern/eastern majority. Historically dominant; Taliban base. Pashtunwali code; transnational with Pakistan.",
    "Tajik":"Persian-speaking northerners. Second-largest; Northern Alliance base under Massoud. Urban cultural elite.",
    "Hazara":"Shia Muslims of central highlands, Mongol-descended. Historically persecuted; recent ISIS-K targeting; high-achieving diaspora.",
    "Uzbek":"Northern Turkic group. Dostum's militia base."
  }
},
"51":{  // Armenia
  ethnicities:[{n:"Armenian",p:98},{n:"Yazidi",p:1},{n:"Other",p:1}],
  ethProfiles:{
    "Armenian":"Ethnically homogeneous post-1991, after Azeri expulsion during Karabakh war. Ancient Christian identity (first state to adopt Christianity, 301 CE). Diaspora of ~7 million outnumbers homeland population.",
    "Yazidi":"Small Kurdish-speaking minority practicing ancient monotheistic religion."
  }
},
"31":{  // Azerbaijan
  ethnicities:[{n:"Azerbaijani",p:92},{n:"Lezgin",p:2},{n:"Russian",p:1},{n:"Armenian",p:0.1},{n:"Other",p:5}],
  ethProfiles:{
    "Azerbaijani":"Turkic Shia Muslim majority, distinct from Sunni Turks of Turkey. Post-2023 Karabakh reconquest restored territorial integrity.",
    "Armenian":"Historic population now essentially zero after 2023 Nagorno-Karabakh exodus of ~100,000."
  }
},
"48":{  // Bahrain
  ethnicities:[{n:"Bahraini Arab",p:46},{n:"Asian",p:45},{n:"Other Arab",p:5},{n:"Other",p:4}],
  ethProfiles:{
    "Bahraini Arab":"Shia majority (~65% of citizens) ruled by Sunni Al Khalifa royal family. 2011 uprising violently suppressed; sectarian fault line defines politics.",
    "Asian":"Indian, Bangladeshi, Pakistani, Filipino migrant workers. Kafala system; no citizenship path."
  }
},
"50":{  // Bangladesh
  ethnicities:[{n:"Bengali",p:98},{n:"Chakma/Tribal",p:1},{n:"Other",p:1}],
  ethProfiles:{
    "Bengali":"Overwhelmingly homogeneous. Linguistic identity central — 1952 language movement and 1971 independence war from Pakistan both tied to Bengali identity. Majority Muslim with significant Hindu minority.",
    "Chakma/Tribal":"Chittagong Hill Tracts peoples (Chakma, Marma, Tripura). Buddhist/Christian; long insurgency 1977-1997; marginalization continues."
  }
},
"64":{  // Bhutan
  ethnicities:[{n:"Ngalop (Bhote)",p:50},{n:"Lhotshampa (Nepali)",p:35},{n:"Sharchop",p:15}],
  ethProfiles:{
    "Ngalop (Bhote)":"Tibetan-origin ruling group of western Bhutan. Drukpa Buddhism and Dzongkha language are national standard.",
    "Lhotshampa (Nepali)":"Hindu Nepali-origin population of southern Bhutan. Over 100,000 expelled in 1990s 'ethnic cleansing'; most resettled to US.",
    "Sharchop":"Eastern Bhutanese of Indo-Burmese origin."
  }
},
"96":{  // Brunei
  ethnicities:[{n:"Malay",p:66},{n:"Chinese",p:10},{n:"Indigenous",p:4},{n:"Other",p:20}],
  ethProfiles:{
    "Malay":"Politically privileged group, MIB (Melayu Islam Beraja) state ideology. Many Chinese are long-resident but denied citizenship."
  }
},
"116":{  // Cambodia
  ethnicities:[{n:"Khmer",p:96},{n:"Cham",p:2},{n:"Chinese",p:1},{n:"Vietnamese",p:1}],
  ethProfiles:{
    "Khmer":"Dominant Theravada Buddhist majority. Khmer Rouge killed ~25% of population (1975-79); ongoing trauma and authoritarian politics.",
    "Cham":"Muslim minority, survivors of ancient Champa kingdom absorbed from Vietnam. Targeted by Khmer Rouge.",
    "Vietnamese":"Long-resident but discriminated against; anti-Vietnamese sentiment is recurring political theme."
  }
},
"156":{  // China (override)
  ethnicities:[{n:"Han Chinese",p:91},{n:"Zhuang",p:1},{n:"Hui",p:1},{n:"Manchu",p:1},{n:"Uyghur",p:1},{n:"Other",p:5}],
  ethProfiles:{
    "Han Chinese":"Overwhelming majority controlling virtually all political and economic power. Internally diverse: Cantonese, Hokkien, Hakka subgroups. Han dominance is state policy; Mandarin promoted as unifying language.",
    "Uyghur":"Turkic Muslim population in Xinjiang. Subject to extensive state surveillance and detention campaigns since 2017. Historically independent (East Turkestan); culturally Central Asian.",
    "Hui":"Chinese-speaking Muslims scattered nationwide. Better integrated than Uyghurs due to linguistic assimilation; historically important in trade.",
    "Zhuang":"Largest minority in Guangxi. Tai-speaking, relatively well-integrated.",
    "Manchu":"Former ruling class during Qing dynasty, now largely assimilated into Han."
  }
},
"196":{  // Cyprus
  ethnicities:[{n:"Greek Cypriot",p:72},{n:"Turkish Cypriot",p:18},{n:"Other",p:10}],
  ethProfiles:{
    "Greek Cypriot":"Orthodox Christian majority. Island divided since 1974 Turkish invasion; only Greek Cypriot state internationally recognized.",
    "Turkish Cypriot":"Muslim Turkish-speakers concentrated in north. 'Turkish Republic of Northern Cyprus' recognized only by Turkey; bolstered by mainland Turkish settlers."
  }
},
"268":{  // Georgia
  ethnicities:[{n:"Georgian",p:87},{n:"Azerbaijani",p:6},{n:"Armenian",p:5},{n:"Russian",p:1},{n:"Other",p:1}],
  ethProfiles:{
    "Georgian":"Orthodox Christian, unique Kartvelian language family. Includes distinct sub-groups: Svans, Mingrelians, Laz.",
    "Azerbaijani":"Muslim minority in southeast (Kvemo Kartli), many with weak Georgian language skills.",
    "Armenian":"Concentrated in Samtskhe-Javakheti region near border. South Ossetia and Abkhazia are Russian-occupied de facto states."
  }
},
"344":{  // Hong Kong
  ethnicities:[{n:"Chinese",p:92},{n:"Filipino",p:3},{n:"Indonesian",p:2},{n:"Other",p:3}],
  ethProfiles:{
    "Chinese":"Predominantly Cantonese, many with roots in Guangdong Province. Growing tension with mainland identity post-2019 protests and National Security Law.",
    "Filipino":"Largely domestic workers. Subject to restrictive labor laws; cannot gain residency."
  }
},
"356":{  // India (override)
  ethnicities:[{n:"Indo-Aryan",p:72},{n:"Dravidian",p:25},{n:"Mongoloid/Other",p:3}],
  ethProfiles:{
    "Indo-Aryan":"Northern and central population: Hindi, Bengali, Punjabi, Gujarati, Marathi, etc. Linguistically descended from Sanskrit; 1,600+ languages. Caste system overlays ethnic divisions.",
    "Dravidian":"Southern peoples: Tamil, Telugu, Kannada, Malayalam. Pre-Aryan civilizational roots; strong regional identity and periodic anti-Hindi movements.",
    "Mongoloid/Other":"Northeastern states (Assam, Nagaland, Manipur, Mizoram) with Tibeto-Burman heritage. Separatist insurgencies; citizenship tensions."
  }
},
"360":{  // Indonesia
  ethnicities:[{n:"Javanese",p:40},{n:"Sundanese",p:16},{n:"Malay",p:4},{n:"Batak",p:4},{n:"Madurese",p:3},{n:"Betawi",p:3},{n:"Other",p:30}],
  ethProfiles:{
    "Javanese":"Dominant group from Java's heartland. All presidents except Habibie have been Javanese; cultural refinement ideal.",
    "Sundanese":"Western Java. Distinct language and cultural identity from Javanese.",
    "Other":"Over 300 ethnic groups including Papuans (ongoing West Papua independence movement), ethnic Chinese (~3%, targets of 1998 riots), Acehnese, Balinese, Minangkabau."
  }
},
"364":{  // Iran
  ethnicities:[{n:"Persian",p:61},{n:"Azerbaijani",p:16},{n:"Kurd",p:10},{n:"Lur",p:6},{n:"Baloch",p:2},{n:"Arab",p:2},{n:"Turkmen",p:2},{n:"Other",p:1}],
  ethProfiles:{
    "Persian":"Politically and culturally dominant majority. Farsi-speaking Shia Muslims; Indo-European heritage.",
    "Azerbaijani":"Turkic Shia minority of northwest, well-integrated — Supreme Leader Khamenei is ethnic Azeri.",
    "Kurd":"Sunni majority; Iran's Kurdish regions historically rebellious. Mahsa Amini's 2022 death sparked nationwide protests.",
    "Baloch":"Sunni minority of southeast. Systematic discrimination; insurgent activity."
  }
},
"368":{  // Iraq
  ethnicities:[{n:"Arab",p:75},{n:"Kurd",p:17},{n:"Turkmen/Assyrian/Other",p:8}],
  ethProfiles:{
    "Arab":"Divided between Shia (~60% of total population, southern heartland) and Sunni (~20%, central/western). Post-2003 Shia political dominance; Sunni grievances fueled ISIS.",
    "Kurd":"Northern mountains; Kurdistan Regional Government has de facto autonomy since 1991. Victims of Anfal genocide under Saddam. 2017 independence referendum crushed by Baghdad.",
    "Turkmen/Assyrian/Other":"Turkmen around Kirkuk; ancient Assyrian Christians decimated by ISIS; Yazidis subjected to 2014 genocide."
  }
},
"376":{  // Israel (override)
  ethnicities:[{n:"Jewish",p:74},{n:"Arab",p:21},{n:"Other",p:5}],
  ethProfiles:{
    "Jewish":"Ashkenazi (European), Mizrahi/Sephardi (Middle Eastern), Ethiopian (Beta Israel), Russian post-1991 waves. Internal divisions: secular, traditional, Haredi (growing fast), religious-Zionist.",
    "Arab":"Palestinian citizens of Israel, mostly Muslim with Christian and Druze minorities. Formal citizens but face structural discrimination; 2018 Nation-State Law controversy.",
    "Other":"Non-Jewish immigrants (mostly Russian), foreign workers, African asylum-seekers."
  }
},
"392":{  // Japan (override)
  ethnicities:[{n:"Japanese",p:98},{n:"Chinese",p:0.6},{n:"Korean",p:0.4},{n:"Other",p:1}],
  ethProfiles:{
    "Japanese":"Extraordinarily homogeneous. National myth of ethnic homogeneity; foreign residents face barriers to naturalization and integration.",
    "Korean":"Zainichi Koreans, descendants of colonial-era migrants. Many still hold Korean nationality despite generations in Japan; face structural discrimination.",
    "Other":"Indigenous Ainu (Hokkaido, ~25,000) legally recognized only in 2019. Ryukyuans (Okinawa) have distinct heritage. Growing Vietnamese, Nepali, Brazilian-Japanese communities."
  }
},
"400":{  // Jordan
  ethnicities:[{n:"Jordanian Arab",p:69},{n:"Palestinian Arab",p:30},{n:"Circassian/Other",p:1}],
  ethProfiles:{
    "Jordanian Arab":"'East Bank' original population, bedouin heritage. Disproportionately represented in security forces and bureaucracy; backbone of monarchy.",
    "Palestinian Arab":"Majority of citizens, from 1948 and 1967 displacements. Tensions with original Jordanians; Black September 1970 remains traumatic reference."
  }
},
"398":{  // Kazakhstan
  ethnicities:[{n:"Kazakh",p:71},{n:"Russian",p:15},{n:"Uzbek",p:3},{n:"Ukrainian",p:2},{n:"Other",p:9}],
  ethProfiles:{
    "Kazakh":"Turkic Muslim majority, rising share after independence as Russians emigrated. Rural and northern strongholds; Kazakh language promotion.",
    "Russian":"Concentrated in northern border regions. Tensions around language status; Putin's irredentist rhetoric creates security concerns."
  }
},
"414":{  // Kuwait
  ethnicities:[{n:"Kuwaiti Arab",p:31},{n:"Other Arab",p:28},{n:"Asian",p:38},{n:"Other",p:3}],
  ethProfiles:{
    "Kuwaiti Arab":"Citizens are minority in own country. Sunni majority; Shia ~30% of citizens. Bedoon (stateless) population denied citizenship.",
    "Asian":"Indian, Bangladeshi, Filipino, Pakistani workers under kafala system."
  }
},
"417":{  // Kyrgyzstan
  ethnicities:[{n:"Kyrgyz",p:73},{n:"Uzbek",p:15},{n:"Russian",p:6},{n:"Dungan",p:1},{n:"Other",p:5}],
  ethProfiles:{
    "Kyrgyz":"Turkic Muslim majority with strong nomadic heritage. Clan (uruu) divisions remain politically relevant.",
    "Uzbek":"Settled agriculturalists in Ferghana Valley south. 2010 Osh riots killed 400+ Uzbeks; unresolved tensions."
  }
},
"418":{  // Laos
  ethnicities:[{n:"Lao",p:53},{n:"Khmou",p:11},{n:"Hmong",p:9},{n:"Phouthay",p:3},{n:"Other",p:24}],
  ethProfiles:{
    "Lao":"Lowland Theravada Buddhist majority, politically dominant.",
    "Hmong":"Mountain people who supported US during Secret War (1964-73); suffered severe repression; large diaspora in US."
  }
},
"422":{  // Lebanon
  ethnicities:[{n:"Lebanese Arab",p:85},{n:"Palestinian Arab",p:6},{n:"Syrian",p:6},{n:"Armenian",p:3},{n:"Other",p:0.1}],
  ethProfiles:{
    "Lebanese Arab":"Confessionally divided: Maronite Christian, Sunni, Shia, Druze, Greek Orthodox, Greek Catholic. 15-year civil war (1975-90); Hezbollah dominant Shia force; state near-collapse since 2019.",
    "Palestinian Arab":"Refugees from 1948 and descendants; ~200,000-400,000. Denied citizenship and property rights.",
    "Syrian":"~1.5 million refugees since 2011, changing demographic balance."
  }
},
"458":{  // Malaysia
  ethnicities:[{n:"Bumiputera (Malay)",p:62},{n:"Chinese",p:23},{n:"Indian",p:7},{n:"Other",p:8}],
  ethProfiles:{
    "Bumiputera (Malay)":"Muslim Malay majority plus indigenous groups. Affirmative action policies (NEP since 1971) give preferential access to education, government jobs, equity.",
    "Chinese":"Commercially dominant minority, largely Buddhist/Taoist/Christian. Historically wealthier but politically disadvantaged.",
    "Indian":"Tamil-speaking Hindu majority, plantation-labor descendants. Most economically marginal group."
  }
},
"462":{  // Maldives
  ethnicities:[{n:"Dhivehi",p:100}],
  ethProfiles:{
    "Dhivehi":"Homogeneous South Asian Muslim population, mixed Sinhalese/Tamil/Arab heritage. Constitution requires Muslim citizenship; non-Muslims cannot be citizens."
  }
},
"496":{  // Mongolia
  ethnicities:[{n:"Khalkha Mongol",p:85},{n:"Kazakh",p:4},{n:"Dorvod",p:3},{n:"Bayad",p:2},{n:"Other",p:6}],
  ethProfiles:{
    "Khalkha Mongol":"Dominant majority, heirs of Chinggis Khan's lineage. Tibetan Buddhist tradition, restored after Soviet era.",
    "Kazakh":"Western Bayan-Ölgii province, Muslim Turkic minority. Eagle hunting tradition."
  }
},
"104":{  // Myanmar
  ethnicities:[{n:"Bamar",p:68},{n:"Shan",p:9},{n:"Karen",p:7},{n:"Rakhine",p:4},{n:"Chinese",p:3},{n:"Indian",p:2},{n:"Mon",p:2},{n:"Other",p:5}],
  ethProfiles:{
    "Bamar":"Buddhist majority, politically and military dominant. 'Burmanization' policies marginalized minorities.",
    "Shan":"Tai-speaking peoples of eastern highlands. Multiple armed groups; some linked to drug trade.",
    "Karen":"Long-running insurgency (since 1949) for autonomy. Christian minority among them; diaspora in Thailand refugee camps.",
    "Rakhine":"Buddhist Arakanese of western state. Home to Rohingya Muslims who aren't counted as ethnicity — subjected to 2017 genocide; 1 million fled to Bangladesh."
  }
},
"524":{  // Nepal
  ethnicities:[{n:"Chhetri",p:17},{n:"Brahmin (Hill)",p:12},{n:"Magar",p:7},{n:"Tharu",p:7},{n:"Tamang",p:6},{n:"Newar",p:5},{n:"Other",p:46}],
  ethProfiles:{
    "Chhetri":"Warrior caste, traditionally dominant in military and politics.",
    "Newar":"Kathmandu Valley indigenous population, historically commercial and artisan elite.",
    "Tharu":"Terai (southern plains) indigenous group."
  }
},
"408":{  // N. Korea
  ethnicities:[{n:"Korean",p:100}],
  ethProfiles:{
    "Korean":"Among the world's most ethnically homogeneous populations. Regime ideology emphasizes racial purity; 'Kimilsungism-Kimjongilism' incorporates ethnic nationalism."
  }
},
"512":{  // Oman
  ethnicities:[{n:"Omani Arab",p:60},{n:"Asian",p:35},{n:"African",p:2},{n:"Other",p:3}],
  ethProfiles:{
    "Omani Arab":"Ibadi Muslim majority (unique to Oman, distinct from Sunni/Shia). Historical maritime empire extending to Zanzibar; Swahili still spoken in coastal Oman."
  }
},
"586":{  // Pakistan
  ethnicities:[{n:"Punjabi",p:45},{n:"Pashtun",p:15},{n:"Sindhi",p:14},{n:"Saraiki",p:8},{n:"Muhajir",p:8},{n:"Baloch",p:4},{n:"Other",p:6}],
  ethProfiles:{
    "Punjabi":"Dominant majority, concentrated in Punjab province. Military, bureaucracy, and economy disproportionately Punjabi.",
    "Pashtun":"Northwest province and tribal areas, transnational with Afghanistan. Taliban heartland; historically martial.",
    "Sindhi":"Sindh province, Bhutto family political base. Sufi-influenced culture.",
    "Muhajir":"Urdu-speaking migrants from India at 1947 Partition. Karachi concentration; MQM political movement.",
    "Baloch":"Balochistan province (resource-rich but poorest). Long-running insurgency for independence; China-Pakistan Economic Corridor fuels tensions."
  }
},
"275":{  // Palestine
  ethnicities:[{n:"Palestinian Arab",p:99},{n:"Other",p:1}],
  ethProfiles:{
    "Palestinian Arab":"Sunni Muslim majority with ~6% Christian minority. Fragmented across West Bank, Gaza, Israel, and vast diaspora. Since Oct 2023, Gaza has faced catastrophic civilian toll."
  }
},
"608":{  // Philippines
  ethnicities:[{n:"Tagalog",p:28},{n:"Visayan",p:26},{n:"Ilocano",p:9},{n:"Bikolano",p:7},{n:"Cebuano",p:7},{n:"Moro",p:5},{n:"Other",p:18}],
  ethProfiles:{
    "Tagalog":"Luzon-centered group, Manila-based. Filipino/Tagalog is national language.",
    "Visayan":"Central islands, Cebuano-speaking largest subgroup. Duterte family political base.",
    "Moro":"Muslim minorities of Mindanao and Sulu. Centuries of resistance to Spanish, American, Filipino rule; 2019 Bangsamoro Autonomous Region created after peace deal."
  }
},
"634":{  // Qatar
  ethnicities:[{n:"Non-Qatari (Asian/Arab/African)",p:88},{n:"Qatari Arab",p:12}],
  ethProfiles:{
    "Qatari Arab":"Citizens only ~12% of population. Sunni Wahhabi majority; Al Thani ruling family.",
    "Non-Qatari (Asian/Arab/African)":"Massive expatriate workforce, mostly from South Asia under kafala system. World Cup 2022 spotlighted labor conditions."
  }
},
"682":{  // Saudi Arabia (override)
  ethnicities:[{n:"Saudi Arab",p:63},{n:"Other Arab",p:12},{n:"Asian",p:22},{n:"African",p:3}],
  ethProfiles:{
    "Saudi Arab":"Sunni Wahhabi majority with ~10-15% Shia minority in Eastern Province (historically marginalized). Tribal identities remain important.",
    "Asian":"Indian, Pakistani, Bangladeshi, Filipino, Indonesian workers. Kafala system; ~10 million foreign workers."
  }
},
"702":{  // Singapore
  ethnicities:[{n:"Chinese",p:74},{n:"Malay",p:14},{n:"Indian",p:9},{n:"Other",p:3}],
  ethProfiles:{
    "Chinese":"Dominant majority, primarily Hokkien, Teochew, Cantonese, Hakka. Mandarin-promoted as unifying language.",
    "Malay":"Indigenous population, Muslim. Granted constitutional 'special position' but economically behind average.",
    "Indian":"Tamil-majority, labor-migration descendants. Strong professional class."
  }
},
"410":{  // S. Korea (override)
  ethnicities:[{n:"Korean",p:96},{n:"Chinese",p:2},{n:"Other Asian",p:1},{n:"Other",p:1}],
  ethProfiles:{
    "Korean":"Historically presented as one of world's most homogeneous populations. Multicultural reality growing with marriage migration and foreign workers.",
    "Chinese":"Includes long-resident ethnic Koreans from China (Joseonjok) who are legally foreign but culturally bridge."
  }
},
"144":{  // Sri Lanka
  ethnicities:[{n:"Sinhalese",p:75},{n:"Sri Lankan Tamil",p:11},{n:"Sri Lankan Moor",p:9},{n:"Indian Tamil",p:4},{n:"Other",p:1}],
  ethProfiles:{
    "Sinhalese":"Buddhist majority, Indo-Aryan language. Nationalism fueled civil war.",
    "Sri Lankan Tamil":"Hindu minority of north and east. LTTE 26-year war (1983-2009) ended in military defeat with war crimes; reconciliation incomplete.",
    "Sri Lankan Moor":"Muslim descendants of Arab traders. Targeted by 2019 Easter bombings and subsequent backlash.",
    "Indian Tamil":"Tea plantation workers brought by British. Historically stateless; citizenship resolved 2003."
  }
},
"760":{  // Syria
  ethnicities:[{n:"Arab",p:90},{n:"Kurd",p:9},{n:"Armenian/Turkmen/Circassian",p:1}],
  ethProfiles:{
    "Arab":"Sunni majority (~74%), Alawite (~12%, Assad's sect), Druze, Ismaili, Christian (~10%). Civil war since 2011; 2024 Assad regime fell.",
    "Kurd":"Northeastern Syria. Kurdish SDF controls autonomous region (Rojava/AANES); Turkish military operations ongoing.",
    "Armenian/Turkmen/Circassian":"Armenian Christians, descendants of genocide survivors. Syrian Turkmen in north, backed by Turkey."
  }
},
"158":{  // Taiwan
  ethnicities:[{n:"Han Taiwanese",p:95},{n:"Mainlander",p:2},{n:"Indigenous",p:2},{n:"Other",p:1}],
  ethProfiles:{
    "Han Taiwanese":"Hoklo (~70%) and Hakka (~15%) whose ancestors arrived from Fujian and Guangdong centuries ago. Distinct Taiwanese identity growing.",
    "Mainlander":"Post-1949 KMT arrivals and descendants. Historically politically dominant; identity tensions with native Taiwanese.",
    "Indigenous":"16 officially recognized Austronesian peoples. Pre-Chinese settlement; constitutional recognition and linguistic revival."
  }
},
"762":{  // Tajikistan
  ethnicities:[{n:"Tajik",p:84},{n:"Uzbek",p:14},{n:"Russian",p:1},{n:"Other",p:1}],
  ethProfiles:{
    "Tajik":"Persian-speaking Sunni Muslims, distinct from Turkic neighbors. Poorest Central Asian state; civil war 1992-97."
  }
},
"764":{  // Thailand
  ethnicities:[{n:"Thai",p:95},{n:"Malay",p:2},{n:"Khmer",p:1},{n:"Other",p:2}],
  ethProfiles:{
    "Thai":"Theravada Buddhist majority. Central Thai dominant but with regional variations (Isaan/Lao-speaking northeast, northern Lanna). Chinese ancestry ~15% but fully assimilated.",
    "Malay":"Muslim minority in southernmost provinces. Ongoing insurgency since 2004; cultural and linguistic differences."
  }
},
"626":{  // Timor-Leste
  ethnicities:[{n:"Austronesian",p:78},{n:"Papuan",p:20},{n:"Chinese",p:2}],
  ethProfiles:{
    "Austronesian":"Tetum is national lingua franca. Complex linguistic mosaic — 15+ indigenous languages. Catholic majority, legacy of Portuguese colonization."
  }
},
"792":{  // Turkey (override)
  ethnicities:[{n:"Turkish",p:75},{n:"Kurdish",p:19},{n:"Arab",p:2},{n:"Other",p:4}],
  ethProfiles:{
    "Turkish":"Sunni Muslim majority. Kemalist secular tradition contested by Erdoğan's Islamic-conservative AKP. Alevi minority (~15-25%) face discrimination.",
    "Kurdish":"Southeast anatolia concentration. Long-running PKK insurgency; Kurdish cultural rights have expanded and contracted cyclically.",
    "Arab":"Growing population including ~3.6 million Syrian refugees since 2011."
  }
},
"795":{  // Turkmenistan
  ethnicities:[{n:"Turkmen",p:85},{n:"Uzbek",p:5},{n:"Russian",p:4},{n:"Other",p:6}],
  ethProfiles:{
    "Turkmen":"Turkic Sunni Muslims with strong tribal identities. Most closed society in Central Asia; personality cult."
  }
},
"784":{  // UAE
  ethnicities:[{n:"Emirati Arab",p:11},{n:"Other Arab",p:9},{n:"South Asian",p:60},{n:"Other",p:20}],
  ethProfiles:{
    "Emirati Arab":"Citizens only ~11% of population. Sunni majority; tribal federation under Al Nahyan (Abu Dhabi) and Al Maktoum (Dubai) ruling families.",
    "South Asian":"Indian, Pakistani, Bangladeshi, Nepali, Filipino majority of workforce. Kafala system; no citizenship pathway."
  }
},
"860":{  // Uzbekistan
  ethnicities:[{n:"Uzbek",p:84},{n:"Tajik",p:5},{n:"Kazakh",p:3},{n:"Karakalpak",p:2},{n:"Russian",p:2},{n:"Other",p:4}],
  ethProfiles:{
    "Uzbek":"Turkic Sunni Muslim majority. Most populous Central Asian state; post-Karimov liberalization under Mirziyoyev.",
    "Tajik":"Persian-speakers primarily in Samarkand and Bukhara — historically Tajik cities. Underreported in official stats."
  }
},
"704":{  // Vietnam
  ethnicities:[{n:"Kinh (Viet)",p:85},{n:"Tay",p:2},{n:"Thai",p:2},{n:"Muong",p:1},{n:"Khmer Krom",p:1},{n:"Hmong",p:1},{n:"Other",p:8}],
  ethProfiles:{
    "Kinh (Viet)":"Dominant ethnic Vietnamese. Confucian-influenced; concentrated in lowlands and deltas.",
    "Hmong":"Highland minority, some supported US during Vietnam War; discrimination continues.",
    "Khmer Krom":"Mekong Delta ethnic Khmer, indigenous before Vietnamese expansion."
  }
},
"887":{  // Yemen
  ethnicities:[{n:"Yemeni Arab",p:93},{n:"Afro-Arab",p:4},{n:"South Asian",p:3}],
  ethProfiles:{
    "Yemeni Arab":"Divided: Zaydi Shia (~35%, north highlands including Houthis) and Sunni Shafi (~65%, south and Tihama). Civil war since 2014 between Houthis and Saudi-backed government.",
    "Afro-Arab":"Akhdam ('servants'), stigmatized caste of African descent. Severely marginalized."
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
