// GEOINT v8 — History/Values part 3: Americas (Latin + Caribbean), Oceania, remaining
(function(){
if(typeof COUNTRY_DB==='undefined')return;

const HV={

// ============ LATIN AMERICA ============
"32":{history:"Spanish viceroyalty of Río de la Plata. Independence 1816 under San Martín. 19th-c civil wars. Perón populism 1946. Military dictatorship — Dirty War 1976-83. Democratic since 1983, chronic economic crises. Milei libertarian shock therapy 2023-.",
timeline:[{y:1516,t:"Spanish arrival"},{y:1816,t:"Independence"},{y:1946,t:"Perón elected"},{y:1976,t:"Military junta"},{y:1982,t:"Falklands war lost"},{y:1983,t:"Democracy"},{y:2001,t:"Economic collapse"},{y:2023,t:"Milei elected"}],
values:{religion:"Catholic majority (~63%), Protestant (~15%) rising, secular (~18%).",objectives:"Dollarize/stabilize economy. Reduce inflation. Attract FDI. Break Peronist cycles.",mindset:"European-identifying vs other LatAm, psychoanalyzed, tango-literary. 'Viveza criolla' street smarts.",mentality:"'Argentino' exception — richest to decadent. Perpetual crisis normalized. Pride despite poverty."}},

"152":{history:"Mapuche resistance. Spanish colony. Independence 1810-18 (O'Higgins). Pinochet coup 1973, brutal dictatorship to 1990. Democratic. Social uprising 2019. Boric 2022. Constitutional processes failed twice.",
timeline:[{y:1541,t:"Santiago founded"},{y:1810,t:"Independence begins"},{y:1879,t:"War of Pacific"},{y:1970,t:"Allende elected"},{y:1973,t:"Pinochet coup"},{y:1990,t:"Democratic transition"},{y:2019,t:"Estallido social"},{y:2022,t:"Boric elected"}],
values:{religion:"Catholic (~45%), Protestant (~18%), nonreligious (~32%) rising.",objectives:"Lithium strategy. Pension reform. Constitutional process. Copper prices. Mapuche conflict.",mindset:"Ordered, neoliberal legacy, educated. Southern-cone European identification.",mentality:"Pinochet economic model vs social demands. Reserved compared to Latin neighbors."}},

"170":{history:"Muisca civilization. Spanish New Granada. Independence 1810-19 (Bolívar). Civil wars chronic. Violencia 1948-58. Guerrilla wars from 1960s. Drug wars. 2016 FARC peace. Petro leftist 2022.",
timeline:[{y:1499,t:"Spanish arrival"},{y:1810,t:"Independence begins"},{y:1948,t:"Bogotazo"},{y:1964,t:"FARC founded"},{y:1993,t:"Escobar killed"},{y:2016,t:"FARC peace accord"},{y:2022,t:"Petro first leftist"},{y:2024,t:"Total Peace stalled"}],
values:{religion:"Catholic (~68%), Protestant (~18%) rising, secular.",objectives:"Total Peace with ELN. Coca policy shift. Environmental. Diversify from oil.",mindset:"Regional (costeño/paisa/bogotano), literary (Márquez), warm. 'Colombian warmth.'",mentality:"Long conflict trauma. Magical realism aesthetic. Progress coexists with violence."}},

"862":{history:"Independence 1811 (Bolívar). Oil boom made richest LatAm 20th c. Chávez 1999-2013. Maduro since. Hyperinflation, ~7.7M emigration. Sham elections 2024.",
timeline:[{y:1498,t:"Columbus sights"},{y:1811,t:"Independence"},{y:1922,t:"Oil boom begins"},{y:1958,t:"Democracy restored"},{y:1999,t:"Chávez"},{y:2013,t:"Maduro"},{y:2017,t:"Hyperinflation"},{y:2024,t:"Fraudulent election"}],
values:{religion:"Catholic (~70%), Protestant (~17%) growing rapidly.",objectives:"Regime survival. Oil recovery. Sanctions relief. Block Machado/González opposition.",mindset:"Chavismo vs opposition polarized. Caribbean culture. Traumatized by collapse.",mentality:"From richest to poorest within a generation. Diaspora defining. Oil curse archetype."}},

"218":{history:"Inca periphery. Spanish. Independence 1822 (Sucre). Dollarized 2000. Correa's citizens' revolution 2007-17. Noboa young president 2023.",
timeline:[{y:1532,t:"Spanish conquest"},{y:1822,t:"Pichincha battle"},{y:1830,t:"Separates from Gran Colombia"},{y:1972,t:"Oil boom"},{y:2000,t:"Dollarization"},{y:2007,t:"Correa"},{y:2023,t:"Villavicencio assassinated"},{y:2024,t:"Noboa war on drugs"}],
values:{religion:"Catholic (~68%), Protestant (~16%), indigenous traditional.",objectives:"Combat drug violence. Oil/copper investment. Security cooperation. Galápagos tourism.",mindset:"Sierra (Andean), Costa (mestizo), Amazon. Buen vivir philosophy.",mentality:"'Pequeño grande' country. Suddenly violent as cartels arrived. Indigenous voice strong."}},

"604":{history:"Inca heartland. Pizarro 1532. Spanish Viceroyalty. Independence 1821. Shining Path insurgency 1980-92. Chronic presidential crises.",
timeline:[{y:-200,t:"Pre-Inca civilizations"},{y:1438,t:"Inca Empire"},{y:1532,t:"Pizarro captures Atahualpa"},{y:1821,t:"Independence"},{y:1980,t:"Shining Path"},{y:2000,t:"Fujimori flees"},{y:2022,t:"Castillo ousted"},{y:2023,t:"Boluarte protests"}],
values:{religion:"Catholic (~76%), Protestant (~17%), indigenous syncretic.",objectives:"Political stability. Mining (copper major). Tourism. Reduce inequality.",mindset:"Andean-coastal divide. Cuisine renaissance. 'Todas las sangres.'",mentality:"Inca imperial memory. Cuisine as soft power. Chronic presidential turmoil."}},

"68":{history:"Inca periphery. Spanish. Independence 1825 (Sucre). Named after Bolívar. Evo Morales indigenous president 2006-19. Lithium wealth.",
timeline:[{y:1538,t:"Spanish conquest"},{y:1545,t:"Potosí silver discovered"},{y:1825,t:"Independence"},{y:1879,t:"Lost sea access"},{y:1952,t:"Revolution"},{y:2005,t:"Evo Morales elected"},{y:2019,t:"Morales ousted"},{y:2020,t:"MAS returns"}],
values:{religion:"Catholic (~70%), Protestant (~18%), indigenous religion.",objectives:"Lithium exploitation. MAS internal split. Gas exports. Indigenous state vision.",mindset:"Plurinational (36 peoples). Aymara/Quechua rising. Cholitas reclaimed pride.",mentality:"'Plurinational state' experiment. Landlocked trauma (Pacific loss). Evo era transformative."}},

"600":{history:"Jesuit Guaraní missions. Spanish colony. Independence 1811. War of Triple Alliance (1864-70) killed ~60% male population. Stroessner dictatorship 1954-89. Colorado Party dominant.",
timeline:[{y:1537,t:"Asunción founded"},{y:1811,t:"Independence"},{y:1864,t:"War of Triple Alliance"},{y:1870,t:"Devastating defeat"},{y:1932,t:"Chaco War"},{y:1954,t:"Stroessner"},{y:1989,t:"Democracy"},{y:2023,t:"Peña president"}],
values:{religion:"Catholic (~89%), Protestant (~7%), indigenous.",objectives:"Hydropower (Itaipu). Agribusiness (soy, beef). Taiwan diplomatic ties. Anti-corruption.",mindset:"Bilingual Spanish-Guaraní (unique). Rural, traditional. Colorado Party dominant.",mentality:"Guaraní as co-official language. 'Paraguayan way' opaque politics. Dense landlocked."}},

"858":{history:"Banda Oriental contested. Independence 1828 buffer state. Batlle welfare pioneer. Military 1973-85. Mujica progressive 2010-15. Orsi (Frente Amplio) 2024.",
timeline:[{y:1680,t:"Portuguese colonize"},{y:1828,t:"Independence"},{y:1903,t:"Batlle reforms"},{y:1973,t:"Military coup"},{y:1985,t:"Democracy"},{y:2013,t:"Marijuana legalization"},{y:2014,t:"Abortion legal"},{y:2024,t:"Frente Amplio returns"}],
values:{religion:"Most secular LatAm (~46% nonreligious), Catholic (~36%).",objectives:"Liberal social model. Agricultural exports. Green hydrogen. Stable democracy.",mindset:"Secular, progressive, educated. 'Paisito' intimate culture. Mate drinking.",mentality:"'Switzerland of South America.' Uruguayan exception — welfare, secular, stable."}},

"188":{history:"Indigenous-mestizo. Independence 1821. No standing army since 1948. Stable democracy. Eco-tourism leader.",
timeline:[{y:1502,t:"Columbus arrives"},{y:1821,t:"Independence"},{y:1948,t:"Civil war; army abolished"},{y:1987,t:"Arias Nobel Peace"},{y:2007,t:"DR-CAFTA"},{y:2022,t:"Chaves president"},{y:2023,t:"Crime rising"},{y:2024,t:"Policy debates"}],
values:{religion:"Catholic (~47%), Protestant (~26%), secular rising.",objectives:"100% renewable electricity. Ecotourism. Fiscal balance. Nicaraguan refugees.",mindset:"Pura vida optimism. Green, peaceful, educated. 'Ticos' warmth.",mentality:"'Switzerland of Central America.' No army pride. Climate leadership."}},

"591":{history:"Panama Canal zone US-controlled 1914-1999. Independence from Colombia 1903. Noriega dictatorship, US invasion 1989. Canal expansion 2016. Panama Papers 2016.",
timeline:[{y:1513,t:"Balboa reaches Pacific"},{y:1821,t:"Joined Gran Colombia"},{y:1903,t:"Independence"},{y:1914,t:"Canal opens"},{y:1977,t:"Torrijos-Carter treaties"},{y:1989,t:"US invasion"},{y:1999,t:"Canal handover"},{y:2016,t:"Panama Papers; canal expansion"}],
values:{religion:"Catholic (~85%), Protestant (~15%).",objectives:"Canal management. Financial services reputation. Copper mine. Migration (Darién Gap).",mindset:"Cosmopolitan, service-oriented, US-influenced. Dollar economy.",mentality:"Transit nation identity. 'Puente del mundo.' Canal as national soul."}},

"222":{history:"Spanish colony. Independence 1841. Civil war 1980-92. Gang violence epidemic. Bukele's 'bitcoin' and gang crackdown 2019-.",
timeline:[{y:1524,t:"Spanish"},{y:1821,t:"Independence"},{y:1932,t:"La Matanza"},{y:1980,t:"Civil war"},{y:1992,t:"Peace accords"},{y:2019,t:"Bukele"},{y:2021,t:"Bitcoin legal tender"},{y:2024,t:"Bukele reelected"}],
values:{religion:"Catholic (~44%), Protestant (~35%) rising fast.",objectives:"Maintain gang crackdown. Bitcoin experiment. US remittances. Authoritarian efficiency model.",mindset:"Traumatized by gangs and civil war. Bukele cult. Diaspora-remittance.",mentality:"'Bukele revolution' — order over democracy trade. Country-sized laboratory."}},

"340":{history:"Mayan. Spanish. Independence 1821. Banana republic (UFCO). Chronic coups. Honduran Castro first female president 2022.",
timeline:[{y:1524,t:"Spanish conquest"},{y:1821,t:"Independence"},{y:1899,t:"UFCO arrives"},{y:1980,t:"Contras base"},{y:2009,t:"Zelaya coup"},{y:2022,t:"Xiomara Castro"},{y:2024,t:"Hernández convicted trafficking"},{y:2024,t:"Elections scheduled"}],
values:{religion:"Catholic (~46%), Protestant (~41%) rising.",objectives:"Anti-corruption. Gang violence. China recognition (vs Taiwan). Remittances.",mindset:"Traumatized, violent, religious. Caribbean-Pacific divide. Emigration dream.",mentality:"'Banana republic' origin term. Hope invested in Castro."}},

"320":{history:"Mayan core. Spanish. Independence 1821. US-backed coup 1954. Civil war 1960-96 (~200K dead, Maya genocide). Arévalo's 2023 win threatened by elite.",
timeline:[{y:-2000,t:"Maya emerges"},{y:1524,t:"Spanish"},{y:1821,t:"Independence"},{y:1954,t:"CIA coup"},{y:1960,t:"Civil war"},{y:1996,t:"Peace"},{y:2015,t:"Pérez Molina jailed"},{y:2023,t:"Arévalo wins"}],
values:{religion:"Catholic (~42%), Protestant (~42%) equal, Maya syncretic.",objectives:"Arévalo anti-corruption (under threat). Maya integration. Reduce migration. Counter elite impunity.",mindset:"Maya-Ladino divide. Traumatized by war. Indigenous dress in highlands.",mentality:"Genocide recognition slow. 'Pacto de corruptos' resists reform. Maya renaissance."}},

"558":{history:"Spanish colony. Somoza dictatorship 1937-79. Sandinista revolution 1979. Contra War. Ortega returned 2007, authoritarian consolidation. 2018 repression.",
timeline:[{y:1522,t:"Spanish"},{y:1821,t:"Independence"},{y:1912,t:"US Marines"},{y:1937,t:"Somoza dynasty"},{y:1979,t:"Sandinista revolution"},{y:2007,t:"Ortega returns"},{y:2018,t:"Protests crushed"},{y:2024,t:"Opposition exiled"}],
values:{religion:"Catholic (~50%), Protestant (~33%).",objectives:"Ortega dynasty (wife VP). Repression. Canal dream. China alignment.",mindset:"Revolutionary history + authoritarian present. Rubén Darío heritage.",mentality:"Sandinista dream betrayed. Exile wave. Poorest Central America."}},

"84":{history:"British Honduras timber. Independence 1981. English-speaking in Spanish region. Low population, Caribbean-oriented.",
timeline:[{y:1638,t:"British settlement"},{y:1862,t:"Crown colony"},{y:1973,t:"Renamed Belize"},{y:1981,t:"Independence"},{y:1994,t:"British withdraw"},{y:2000,t:"Oil discovery"},{y:2020,t:"PUP returns"},{y:2024,t:"Guatemalan border dispute"}],
values:{religion:"Christian (~70%), diverse.",objectives:"Tourism. Barrier reef. Guatemalan territorial claim. Offshore finance.",mindset:"Caribbean-English-speaking in Spanish Central America. Multi-ethnic (Creole, Maya, Mestizo, Garifuna).",mentality:"'English-speaking Caribbean mainland' identity. Tiny crossroads."}},

// ============ CARIBBEAN ============
"192":{history:"Spanish colony to 1898. Independence 1902 after US war. Castro's revolution 1959. Soviet alignment — Missile Crisis 1962. Special Period after USSR fall. Díaz-Canel since 2018. Mass emigration ongoing.",
timeline:[{y:1492,t:"Columbus"},{y:1898,t:"Spanish-American War"},{y:1902,t:"Independence"},{y:1959,t:"Castro revolution"},{y:1961,t:"Bay of Pigs"},{y:1962,t:"Missile Crisis"},{y:2008,t:"Raúl Castro"},{y:2021,t:"11J protests"}],
values:{religion:"Catholic nominal (~60%), Protestant, Santería syncretic. Officially secular.",objectives:"Regime survival. Remittances. Energy crisis. Stop emigration (~500K left recently).",mindset:"Musical, resilient, ideological, sardonic ('no es fácil').",mentality:"Revolutionary myth vs daily hardship. Embargo scapegoat. Emigration undeniable."}},

"214":{history:"Spanish Hispaniola — first permanent European settlement 1492. Haiti occupation 1822-44. Trujillo dictatorship 1930-61. Democratic since 1960s. Abinader second term.",
timeline:[{y:1492,t:"Columbus"},{y:1822,t:"Haitian occupation"},{y:1844,t:"Independence"},{y:1930,t:"Trujillo"},{y:1961,t:"Trujillo killed"},{y:2020,t:"Abinader"},{y:2024,t:"Border wall with Haiti"},{y:2024,t:"Reelection"}],
values:{religion:"Catholic (~55%), Protestant (~25%) rising.",objectives:"Haiti crisis. Tourism. Diaspora ties (US). Agricultural exports.",mindset:"Baseball-passionate, religious, merengue/bachata. Caribbean warmth.",mentality:"Complicated Haitian relationship. 'Quisqueya' Taíno name. Tourism as salvation."}},

"332":{history:"First black republic — slave revolt 1791, independent 1804 (Toussaint, Dessalines). France indemnity crippled. US occupation 1915-34. Duvaliers 1957-86. 2010 earthquake. Moïse assassinated 2021. Gang collapse. Kenyan-led intervention 2024.",
timeline:[{y:1697,t:"French Saint-Domingue"},{y:1791,t:"Slave revolt"},{y:1804,t:"Independence"},{y:1915,t:"US occupation"},{y:1957,t:"Papa Doc"},{y:2010,t:"Earthquake"},{y:2021,t:"Moïse assassinated"},{y:2024,t:"Kenyan intervention"}],
values:{religion:"Catholic (~55%), Protestant (~29%), Vodou (practiced widely).",objectives:"Restore state. Gang control. Reconstruction. Elections.",mindset:"Vodou syncretic, resilient. Kreyòl pride. 'Ayiti' indigenous name.",mentality:"'Cursed nation' fatalism vs revolutionary pride. Founding achievement unrewarded. Gang warlords dominant."}},

"388":{history:"British sugar colony. Independence 1962. Crime-plagued. Bob Marley reggae soft power. Recent growth.",
timeline:[{y:1655,t:"British conquest"},{y:1831,t:"Sam Sharpe rebellion"},{y:1838,t:"Abolition"},{y:1962,t:"Independence"},{y:1981,t:"Bob Marley dies"},{y:2016,t:"Bolt final race"},{y:2023,t:"Transition to republic announced"},{y:2024,t:"Crown removal planning"}],
values:{religion:"Christian (~69%), Rastafarian (~1%, culturally huge), Obeah tradition.",objectives:"Crime reduction. Tourism. Diaspora. Become republic.",mindset:"Musical, athletic (sprinting), religious, vibrant. Patois expressive.",mentality:"Cultural superpower for size. 'One love' Marley legacy. Crime-tourism paradox."}},

"780":{history:"Spanish, then British. Independence 1962. Oil/gas economy. Indo-Caribbean (41%) and Afro-Caribbean (36%) balance. Carnival/calypso.",
timeline:[{y:1498,t:"Columbus"},{y:1797,t:"British"},{y:1845,t:"Indian labor begins"},{y:1962,t:"Independence"},{y:1990,t:"Jamaat al-Muslimeen coup attempt"},{y:2015,t:"Oil crash"},{y:2024,t:"Dragon gas with Venezuela"}],
values:{religion:"Christian (~55%), Hindu (~18%), Muslim (~5%), Rastafarian.",objectives:"Gas sector reform. Crime. Diversification. Dragon field deal.",mindset:"Multicultural mix, Carnival-focused. Multi-religious peace.",mentality:"Indo-Afro coexistence model. 'Callaloo' metaphor. Oil wealth legacy fading."}},

"44":{history:"British colony. Nassau pirate haven. Independence 1973. Tourism, offshore banking. Hurricane Dorian 2019 devastation.",
timeline:[{y:1492,t:"Columbus first landfall"},{y:1718,t:"British"},{y:1973,t:"Independence"},{y:2017,t:"Irma"},{y:2019,t:"Dorian"},{y:2023,t:"FTX trial"},{y:2024,t:"Recovery"}],
values:{religion:"Christian (~95%).",objectives:"Tourism. Banking reform. Hurricane adaptation. Climate migration.",mindset:"English-speaking, cruise-ship economy. Conservative Christian.",mentality:"'Paradise economy' with climate peril. Junkanoo cultural pride."}},

"28":{history:"British colony. Independence 1981. Tourism and offshore finance economy. Twin-island state.",
timeline:[{y:1493,t:"Columbus sights"},{y:1632,t:"English colony"},{y:1981,t:"Independence"},{y:2017,t:"Irma devastates Barbuda"},{y:2023,t:"Climate reparations advocacy"},{y:2024,t:"Beryl damage"}],
values:{religion:"Christian (~89%).",objectives:"Tourism. Climate adaptation. CARICOM.",mindset:"English-Caribbean, cricket.",mentality:"Smaller state navigating climate and globalization."}},

"212":{history:"Last British colony in East Caribbean to gain independence 1978. Post-Maria 2017 rebuilding as climate-resilient nation.",
timeline:[{y:1493,t:"Columbus"},{y:1763,t:"British"},{y:1978,t:"Independence"},{y:2017,t:"Maria devastates"},{y:2020,t:"Climate-resilient reconstruction"},{y:2024,t:"Bitcoin mining deals"}],
values:{religion:"Christian (~94%, Catholic).",objectives:"Climate resilience model. Geothermal. Tourism.",mindset:"'Nature Island,' English and Kwéyòl-speaking. Kalinago indigenous present.",mentality:"Post-Maria rebuild as first climate-resilient nation ambition."}},

"308":{history:"British. Independence 1974. Bishop leftist revolution 1979, US invasion 1983. Nutmeg economy.",
timeline:[{y:1498,t:"Columbus"},{y:1762,t:"British"},{y:1974,t:"Independence"},{y:1979,t:"Bishop revolution"},{y:1983,t:"US invasion"},{y:2004,t:"Ivan devastates"},{y:2024,t:"Beryl"}],
values:{religion:"Christian (~94%).",objectives:"Spice exports. Tourism. Citizenship-by-investment. Climate adaptation.",mindset:"'Spice Isle,' small, conservative.",mentality:"1983 US invasion shaped consciousness. Nutmeg/cocoa identity."}},

"662":{history:"French/British alternation 14 times. Independence 1979. Banana, tourism economy.",
timeline:[{y:1502,t:"Columbus"},{y:1814,t:"British permanent"},{y:1979,t:"Independence"},{y:1992,t:"Walcott Nobel Literature"},{y:2016,t:"Matthew"},{y:2023,t:"Debt relief sought"},{y:2024,t:"Beryl"}],
values:{religion:"Christian (~90%, Catholic).",objectives:"Tourism. Renewable energy. Diversification.",mindset:"'Helen of West Indies,' literary tradition.",mentality:"Twin Pitons iconic. Literary tradition disproportionate."}},

"670":{history:"British. Independence 1979. Banana economy. Mustique. Gonsalves long-term PM.",
timeline:[{y:1498,t:"Columbus"},{y:1763,t:"British"},{y:1902,t:"Soufrière eruption"},{y:1979,t:"Independence"},{y:2021,t:"Soufrière erupts"},{y:2022,t:"Republic referendum fails"},{y:2024,t:"Beryl damage"}],
values:{religion:"Christian (~82%).",objectives:"Tourism. Volcano management. Bananas. Monarchy vs republic.",mindset:"Multi-island nation, Vincentian identity.",mentality:"Volcano defines existence. Gonsalves leftist rhetoric."}},

"52":{history:"British 'Little England.' Independence 1966. Republic 2021. Mottley influential globally.",
timeline:[{y:1627,t:"British settlement"},{y:1966,t:"Independence"},{y:2018,t:"Mia Mottley PM"},{y:2021,t:"Republic (removed Queen)"},{y:2022,t:"Bridgetown Initiative"},{y:2024,t:"Climate leadership"}],
values:{religion:"Christian (~95%, Protestant).",objectives:"Climate finance leadership. Tourism. Reduce debt. Reparations advocacy.",mindset:"'Bajan' distinct Creole. Cricket obsession. Anglican.",mentality:"'Little England' heritage contradicted by republic move. Mottley's voice disproportionate."}},

"659":{history:"British. Independence 1983. Citizenship-by-investment pioneer.",
timeline:[{y:1623,t:"First English Caribbean colony"},{y:1983,t:"Independence"},{y:1998,t:"Nevis secession referendum"},{y:2018,t:"Solar farm"},{y:2023,t:"CBI reforms"}],
values:{religion:"Christian (~95%).",objectives:"CBI program. Tourism. Sugar transition. Nevis semi-autonomy.",mindset:"Small twin-island, British legacy.",mentality:"Smallest Western Hemisphere nation by area."}},

// ============ OCEANIA ============
"598":{history:"Melanesian. German/British, Australian mandate. Independence 1975. Gold, copper, LNG. Bougainville referendum 2019 pending independence.",
timeline:[{y:-45000,t:"Human settlement"},{y:1884,t:"German/British colonies"},{y:1975,t:"Independence"},{y:1988,t:"Bougainville war"},{y:2019,t:"Bougainville referendum 98% independence"},{y:2023,t:"US security pact"},{y:2024,t:"Marape reelected"}],
values:{religion:"Christian (~95%), traditional underlay.",objectives:"Bougainville negotiation. LNG revenue. Control mining companies. Tribal violence.",mindset:"800+ languages. Wantok system. 'Big man' politics.",mentality:"Most linguistically diverse country. Traditional tribal structures beyond capital. Resource-rich, governance-weak."}},

"242":{history:"Melanesian-Polynesian. British 1874. Independence 1970. Coups 1987, 2000, 2006. Indo-Fijian (~38%) political contestation. Rabuka returns 2022.",
timeline:[{y:-1500,t:"Settlement"},{y:1874,t:"British"},{y:1879,t:"Indian labor begins"},{y:1970,t:"Independence"},{y:1987,t:"First coup"},{y:2006,t:"Bainimarama coup"},{y:2022,t:"Rabuka returns"}],
values:{religion:"Christian (~65%, iTaukei Methodist), Hindu (~28%), Muslim (~6%).",objectives:"Reconciliation iTaukei-Indo-Fijian. Tourism. Pacific leadership. Climate.",mindset:"Kava culture, rugby-passionate, religious. Two-community tensions.",mentality:"Pacific hub role. Ethnic politics defining. Climate existential."}},

"548":{history:"Anglo-French condominium New Hebrides. Independence 1980. Classic Pacific microstate.",
timeline:[{y:1606,t:"Spanish arrive"},{y:1906,t:"Condominium"},{y:1980,t:"Independence"},{y:2015,t:"Cyclone Pam"},{y:2020,t:"Covid zero"},{y:2023,t:"Earthquake"}],
values:{religion:"Christian (~83%), kastom traditional.",objectives:"Climate justice advocacy. Tourism. Kastom preservation. Balance China-West.",mindset:"Kastom-dominated, 100+ languages. Tanna's John Frum cult.",mentality:"'Happiest country' rankings. Climate existential."}},

"90":{history:"WWII Guadalcanal. British. Independence 1978. Ethnic tensions. Chinese security deal 2022.",
timeline:[{y:-2000,t:"Settlement"},{y:1893,t:"British"},{y:1942,t:"Guadalcanal battle"},{y:1978,t:"Independence"},{y:2003,t:"RAMSI"},{y:2019,t:"Switched to China"},{y:2022,t:"China security deal"}],
values:{religion:"Christian (~97%).",objectives:"China alignment. Logging. Ethnic reconciliation. Climate.",mindset:"80+ languages, wantok, kastom. Maritime.",mentality:"Cold War-era strategic pawn revived. Chinese pivot jarring."}},

"585":{history:"German, Japanese, US Trust Territory. Independence 1994. COFA with US. Taiwan recognition.",
timeline:[{y:1899,t:"German"},{y:1919,t:"Japanese mandate"},{y:1947,t:"US Trust"},{y:1994,t:"Independence"},{y:1999,t:"Taiwan recognition"},{y:2024,t:"COFA renewal"}],
values:{religion:"Christian (~92%, Catholic).",objectives:"Climate survival. Tourism. US COFA funding. Taiwan recognition (1 of 12).",mindset:"Matrilineal traditional, Micronesian. Diving tourism.",mentality:"Last territory to become independent. Tiny (~18K)."}},

"583":{history:"Spanish, German, Japanese, US. Independent 1986. Four states. COFA with US.",
timeline:[{y:1521,t:"Spanish contact"},{y:1899,t:"Germany"},{y:1947,t:"US Trust"},{y:1986,t:"Independence"},{y:2024,t:"COFA renewed"}],
values:{religion:"Christian (~93%).",objectives:"Climate survival. US aid. Internal unity. China wariness.",mindset:"Diverse across states. Yap stone money.",mentality:"Most remote federation. Tiny (~100K)."}},

"584":{history:"Bikini/Enewetak nuclear testing 1946-58. Independent 1986. Nuclear legacy compensation. Rising seas existential.",
timeline:[{y:-2000,t:"Settlement"},{y:1946,t:"First US nuclear test"},{y:1954,t:"Castle Bravo"},{y:1986,t:"Independence"},{y:2022,t:"Reparations lawsuits"},{y:2024,t:"COFA renewed"}],
values:{religion:"Christian (~96%).",objectives:"Nuclear compensation. Climate relocation. COFA with US. Taiwan recognition.",mindset:"Outer-islander, traditional. Bikini community in exile.",mentality:"Nuclear testing victims — moral claim unique. Sinking nation fear."}},

"296":{history:"British Gilbert Islands. Independence 1979. 33 atolls, equator crossing.",
timeline:[{y:-3000,t:"Settlement"},{y:1892,t:"British"},{y:1979,t:"Independence"},{y:2019,t:"Switched to China"},{y:2023,t:"Maamau reelected"}],
values:{religion:"Christian (~96%).",objectives:"Climate survival (lowest elevation). Fishing. China alignment. Relocation.",mindset:"Low-lying atoll, fishing-dependent. Kiribati dance unique.",mentality:"Highest climate vulnerability. 'Migration with dignity' policy."}},

"520":{history:"Phosphate mining wealth briefly highest GDP/capita 1970s. Depleted. Australian asylum processing.",
timeline:[{y:1888,t:"German"},{y:1968,t:"Independence"},{y:1975,t:"Peak phosphate"},{y:2001,t:"Pacific Solution"},{y:2023,t:"Reopens for Australian migrants"}],
values:{religion:"Christian (~97%).",objectives:"Post-phosphate economy. Australian migrant processing. Diversification.",mindset:"Tiny (~12K), insular.",mentality:"'Shortest history' — phosphate rise and fall. Offshore processing economy."}},

"798":{history:"Separated from Gilberts, independent 1978. Lowest-lying. ~11,000 people.",
timeline:[{y:-1000,t:"Settlement"},{y:1978,t:"Independence"},{y:2000,t:".tv domain revenue"},{y:2021,t:"Digital metaverse nation"},{y:2024,t:"COP advocacy"}],
values:{religion:"Christian (~97%, Protestant).",objectives:"Climate survival. .tv domain. Digital nation backup.",mindset:"Polynesian, Christian, tight-knit.",mentality:"Climate emigration planning. 'Digital twin' nation to preserve sovereignty after submersion."}},

"776":{history:"Polynesian monarchy. British protectorate 1900. Independence 1970. Only Pacific kingdom. Hunga Tonga eruption 2022.",
timeline:[{y:-900,t:"Polynesian settlement"},{y:1900,t:"British protectorate"},{y:1970,t:"Independence"},{y:2006,t:"Pro-democracy riots"},{y:2022,t:"Hunga Tonga eruption"},{y:2024,t:"Rebuilding"}],
values:{religion:"Christian (~98%, Sabbath-observant).",objectives:"Post-eruption recovery. Climate adaptation. Monarchy-democracy balance. China debt.",mindset:"'Tongan way.' Hierarchical, Christian strict. Rugby-mad.",mentality:"Never-colonized pride. Recent eruption trauma."}},

"882":{history:"Samoan chiefdoms. German, NZ mandate. Independence 1962 (first Pacific). Strong matai system.",
timeline:[{y:-1000,t:"Polynesian settlement"},{y:1914,t:"NZ occupation"},{y:1918,t:"Flu kills 20%"},{y:1962,t:"Independence"},{y:2021,t:"First female PM"},{y:2024,t:"PIF summit host"}],
values:{religion:"Christian (~96%).",objectives:"Climate adaptation. Remittances. Pacific leadership. China-West balancing.",mindset:"Fa'a Samoa. Matai chief system. Rugby.",mentality:"First independent Pacific nation pride."}},

"540":{history:"French 1853. Nickel wealth. Kanak independence movement. 2018-21 three referenda failed. 2024 riots.",
timeline:[{y:1853,t:"French annex"},{y:1878,t:"Kanak revolt"},{y:1998,t:"Nouméa Accord"},{y:2018,t:"First referendum — 57% no"},{y:2021,t:"Third referendum"},{y:2024,t:"Kanak riots"}],
values:{religion:"Christian (~83%, Catholic).",objectives:"Resolve Kanak independence. Nickel crisis. Communal tensions.",mindset:"Caldoche (European) vs Kanak divide. Nickel economy.",mentality:"Last frontier of French decolonization. Unresolved colonial legacy explodes."}},

"258":{history:"Tahitian kingdom. French protectorate 1843. Nuclear testing Moruroa 1966-96. Autonomous.",
timeline:[{y:1767,t:"Wallis arrives"},{y:1880,t:"Annexation"},{y:1966,t:"Nuclear testing begins"},{y:1996,t:"Testing ends"},{y:2004,t:"Autonomy"},{y:2024,t:"Olympics surfing"}],
values:{religion:"Christian (~84%).",objectives:"Independence movement. Nuclear reparations. Tourism. French subsidies.",mindset:"Polynesian (ma'ohi), tourism-driven, lagoon-oriented.",mentality:"Gauguin paradise myth. Nuclear legacy. Independence movement steady."}},

// ============ SMALL/DEPENDENT TERRITORIES ============
"16":{history:"US territory from 1900. Samoan population are US nationals (not citizens).",
timeline:[{y:1899,t:"US-German treaty"},{y:1900,t:"US territory"},{y:2019,t:"Citizenship court case"},{y:2024,t:"Olympics participation"}],
values:{religion:"Christian (~98%).",objectives:"Tuna industry. US federal aid. Citizenship status debate. Sports.",mindset:"Samoan traditional, US-influenced, football-obsessed.",mentality:"US nationals not citizens — unique status. Disproportionate NFL representation."}},

"60":{history:"British territory. Offshore finance. Hurricane 1991 rebuilt.",
timeline:[{y:1609,t:"British settlement"},{y:1973,t:"Self-government"},{y:1995,t:"Independence referendum fails"},{y:2022,t:"Climate plans"},{y:2024,t:"Premier Hopkins"}],
values:{religion:"Christian (~54%).",objectives:"Offshore finance reputation. Tourism. Independence debate.",mindset:"Cosmopolitan, wealthy, British heritage.",mentality:"'Floating corporation' offshore."}},

"86":{history:"BIOT. Diego Garcia — US military base. Chagossians expelled 1960s-70s. 2024 UK agreed transfer to Mauritius.",
timeline:[{y:1965,t:"BIOT created"},{y:1971,t:"Chagossians expelled"},{y:1973,t:"Diego Garcia US base"},{y:2019,t:"ICJ ruling"},{y:2024,t:"UK agrees transfer"}],
values:{religion:"—",objectives:"Strategic base. Chagossian right of return.",mindset:"Only military population.",mentality:"Geopolitical chess piece."}},

"92":{history:"British Virgin Islands. Offshore finance (BVI Business Companies).",
timeline:[{y:1672,t:"British annex"},{y:1984,t:"BVI Business Companies"},{y:2017,t:"Irma devastates"},{y:2022,t:"Premier arrested in US"},{y:2024,t:"Registry reforms"}],
values:{religion:"Christian (~84%).",objectives:"Financial services. Tourism recovery. Drug trafficking issue.",mindset:"British Caribbean, finance-oriented.",mentality:"'Nature's Little Secrets' but finance dominant."}},

"96":{history:"Sultanate since 15th c. British protectorate 1888-1984. Oil wealth. Sharia law since 2014.",
timeline:[{y:1368,t:"Sultanate begins"},{y:1929,t:"Oil discovered"},{y:1984,t:"Independence"},{y:2014,t:"Sharia code phased in"},{y:2019,t:"Full Sharia"}],
values:{religion:"Muslim (~80%, Shafi'i state religion), Christian, Buddhist, Hindu minorities.",objectives:"Sultan's absolute rule. Oil/gas. Gradual Islamization. Shariah application.",mindset:"Conservative, wealthy, Malay-Muslim.",mentality:"'Shellfare state.' Absolute monarchy + oil + Islam."}},

"136":{history:"British territory. No income tax. Financial services hub.",
timeline:[{y:1670,t:"British"},{y:1962,t:"Separate from Jamaica"},{y:1988,t:"Financial services dominant"},{y:2004,t:"Ivan"},{y:2024,t:"New premier"}],
values:{religion:"Christian (~70%).",objectives:"Preserve no-tax financial services. Tourism. UKOT status.",mindset:"Wealthy, cosmopolitan expat financial.",mentality:"'Cayman' = offshore finance globally."}},

"162":{history:"Australian territory. Used for immigrant detention until 2018.",
timeline:[{y:1888,t:"British annex"},{y:1958,t:"Australian"},{y:2001,t:"Detention center"},{y:2018,t:"Center closed"}],
values:{religion:"Christian, Buddhist, Muslim mix.",objectives:"Tourism. Biological preservation.",mindset:"Multi-ethnic (Chinese, Malay, European).",mentality:"Phosphate legacy. Red crab migration famous."}},

"166":{history:"Australian Cocos (Keeling) Islands. Malay-Muslim majority inhabitants.",
timeline:[{y:1827,t:"Clunies-Ross settlement"},{y:1955,t:"Australian"},{y:1984,t:"Referendum integrates"}],
values:{religion:"Muslim (~75%, Cocos Malay).",objectives:"Tourism. Preservation of Malay culture.",mindset:"Isolated, traditional Malay.",mentality:"Tiny forgotten territory."}},

"175":{history:"French overseas department. Muslim-majority Comoros island kept by France 1974 referendum.",
timeline:[{y:1843,t:"French colony"},{y:1974,t:"Votes to stay with France"},{y:2011,t:"Full department status"},{y:2024,t:"Migration crisis"}],
values:{religion:"Muslim (~97%).",objectives:"Immigration control (Comoros). French services. Development.",mindset:"Comorian Muslim culture + French administrative.",mentality:"Poorest French department."}},

"184":{history:"NZ free association. Self-governing.",
timeline:[{y:1900,t:"British protectorate"},{y:1965,t:"Self-governing with NZ"},{y:2001,t:"Joint declaration sovereignty"}],
values:{religion:"Christian (~94%).",objectives:"Fisheries. NZ aid. Climate.",mindset:"Polynesian, Christian, emigrated mostly to NZ.",mentality:"Small but voices heard in Pacific forums."}},

"234":{history:"Danish autonomous territory. Fishing-dependent.",
timeline:[{y:1948,t:"Home rule"},{y:2005,t:"Foreign policy autonomy"},{y:2009,t:"Independence debates"}],
values:{religion:"Lutheran (~84%).",objectives:"Fishing. Preserve language/culture. Independence debated.",mindset:"Traditional, seafaring, isolated.",mentality:"Quiet autonomy."}},

"238":{history:"Falklands — British, claimed by Argentina (Malvinas). 1982 war. Oil potential.",
timeline:[{y:1833,t:"British"},{y:1982,t:"Argentine invasion/war"},{y:2013,t:"Referendum 99.8% British"},{y:2020,t:"Oil exploration progresses"}],
values:{religion:"Christian (~58%).",objectives:"Maintain British status. Fishing. Potential oil.",mindset:"British, remote, sheep-farming.",mentality:"'Falklander' identity firm."}},

"239":{history:"South Georgia — British, uninhabited except research. Shackleton legacy.",
timeline:[{y:1775,t:"Cook claims"},{y:1916,t:"Shackleton reaches"},{y:1982,t:"Argentine seizure briefly"}],
values:{religion:"—",objectives:"Wildlife preservation. Research. Fisheries.",mindset:"—",mentality:"Antarctic approach."}},

"248":{history:"Finnish autonomous archipelago. Swedish-speaking, demilitarized since 1856.",
timeline:[{y:1809,t:"Russian Finland"},{y:1856,t:"Demilitarized"},{y:1921,t:"Autonomy under Finland"}],
values:{religion:"Lutheran (~70%).",objectives:"Preserve Swedish language/culture. Autonomy. Demilitarized status.",mindset:"Swedish-speaking, seafaring, autonomous.",mentality:"Unique autonomous status."}},

"254":{history:"French overseas department in South America. ESA spaceport Kourou.",
timeline:[{y:1664,t:"French settlement"},{y:1852,t:"Penal colony (Devil's Island)"},{y:1964,t:"Spaceport built"},{y:2017,t:"Protests economy"}],
values:{religion:"Catholic (~60%), diverse.",objectives:"Space industry. Forest preservation (biodiversity). Gold mining controversy.",mindset:"Creole + indigenous + Maroon + French.",mentality:"Space launches amidst Amazon rainforest."}},

"260":{history:"French southern territories — Antarctic research bases.",
timeline:[{y:1955,t:"Territory created"},{y:2006,t:"Glorieuses added"},{y:2011,t:"Scattered Islands added"}],
values:{religion:"—",objectives:"Research. Sovereignty marker.",mindset:"—",mentality:"Climate/research frontier."}},

"292":{history:"British since 1713 (Utrecht Treaty). Spanish claim persistent. Brexit 2016 complications.",
timeline:[{y:711,t:"Moorish conquest"},{y:1704,t:"British capture"},{y:1713,t:"Utrecht permanent"},{y:1967,t:"99% British vote"},{y:2020,t:"Brexit"}],
values:{religion:"Catholic (~72%), Protestant, Jewish (historic), Muslim.",objectives:"Post-Brexit border. Sovereignty. Financial services.",mindset:"British-Spanish-Jewish-Genoese-Maltese blend. Llanito dialect unique.",mentality:"'Rock' identity anti-Spanish. British but not British-feeling."}},

"304":{history:"Inuit settlement. Norse (900-1500). Danish colony 1721. Autonomous since 1979 (self-rule 2009). Climate/geopolitical attention.",
timeline:[{y:-2500,t:"Inuit settlement"},{y:982,t:"Erik the Red"},{y:1721,t:"Danish colony"},{y:1979,t:"Home rule"},{y:2009,t:"Self-rule"},{y:2019,t:"Trump offers to buy"}],
values:{religion:"Christian (~95%, Lutheran), shamanism traces.",objectives:"Independence (likely). Rare earths. US military deal. Climate change (melting fast).",mindset:"Inuit majority (~88%), tight-knit. Arctic-adapted.",mentality:"Climate frontline. Geopolitical scrutiny uncomfortable."}},

"312":{history:"French department in Caribbean."},
"316":{history:"US territory in Pacific. Major US military bases. Chamorro native."},
"334":{history:"Uninhabited Australian external."},
"462":{history:"Sultanate, British protectorate. Independence 1965. Climate threatened. Muizzu pro-China shift 2023.",
timeline:[{y:1153,t:"Islamization"},{y:1887,t:"British protectorate"},{y:1965,t:"Independence"},{y:2004,t:"Tsunami"},{y:2023,t:"Muizzu wins"},{y:2024,t:"India troops withdrawn"}],
values:{religion:"Sunni Muslim state (~100%).",objectives:"Climate survival. Balance India-China. Tourism. Sunni unity.",mindset:"Island-dwelling, Muslim, capital cosmopolitan.",mentality:"Lowest country on Earth (~2m). Muslim-only citizenship."}},

"474":{history:"French Martinique department. Napoleon's Josephine. Banana economy.",
timeline:[{y:1635,t:"French colony"},{y:1848,t:"Abolition"},{y:1946,t:"Department"},{y:2009,t:"General strikes"}],
values:{religion:"Catholic (~85%).",objectives:"Diversify beyond bananas. Departmental status. Chlordecone aftermath.",mindset:"Creole, Afro-French blend.",mentality:"Césaire négritude heritage. Ambivalent toward France."}},

"500":{history:"British Montserrat — 1995-97 volcanic eruption destroyed capital. Buried Plymouth still off-limits.",
timeline:[{y:1632,t:"British"},{y:1995,t:"Soufrière Hills eruption"},{y:1997,t:"Plymouth destroyed"},{y:2020,t:"New capital Little Bay"}],
values:{religion:"Christian (~96%).",objectives:"Rebuilding north. Tourism. Fiscal UK support.",mindset:"'Emerald Isle' Irish heritage. Post-volcano diaspora.",mentality:"Pompeii-like buried capital. Population third of pre-eruption."}},

"531":{history:"Curaçao — Dutch constituent country. Oil refinery. Diverse.",
timeline:[{y:1634,t:"Dutch"},{y:1863,t:"Abolition"},{y:2010,t:"Constituent country status"},{y:2019,t:"Venezuelan refugee crisis"}],
values:{religion:"Christian (~85%), Jewish (historic), Afro-Caribbean syncretic.",objectives:"Oil refinery future. Tourism. Venezuelan refugee management.",mindset:"Papiamentu, multilingual, merchant.",mentality:"Historic Jewish community. Caribbean Dutch distinctiveness."}},

"533":{history:"Aruba — Dutch, separate from Netherlands Antilles 1986.",
timeline:[{y:1499,t:"Spanish sight"},{y:1636,t:"Dutch"},{y:1986,t:"Status aparte"},{y:2010,t:"NA dissolved"}],
values:{religion:"Catholic (~75%).",objectives:"Tourism. Economic diversification. Semi-autonomy preservation.",mindset:"Papiamentu, tourism-focused, stable.",mentality:"'One Happy Island' brand."}},

"534":{history:"Sint Maarten — Dutch half of island with French Saint-Martin.",
timeline:[{y:1648,t:"Treaty of Concordia splits island"},{y:2010,t:"Constituent country"},{y:2017,t:"Irma devastates"}],
values:{religion:"Christian (~85%).",objectives:"Post-Irma recovery. Tourism. Shared border management.",mindset:"Caribbean, duty-free shopping mecca.",mentality:"Smallest shared-sovereignty island."}},

"535":{history:"Caribbean Netherlands — Bonaire, Sint Eustatius, Saba (special municipalities).",
timeline:[{y:2010,t:"Netherlands Antilles dissolved"},{y:2010,t:"Special status begins"}],
values:{religion:"Christian majority.",objectives:"Tourism. Dutch services integration.",mindset:"Small islands, varied cultures.",mentality:"Tiny Dutch Caribbean outposts."}},

"570":{history:"Niue — NZ free association. 1,600 population.",
timeline:[{y:900,t:"Polynesian settlement"},{y:1901,t:"NZ control"},{y:1974,t:"Free association"},{y:2019,t:"First in Pacific to recognize Taiwan switch"}],
values:{religion:"Christian (~95%).",objectives:"Fishing. NZ aid. Tourism. Climate.",mindset:"Tiny Polynesian community.",mentality:"Population drain to NZ. Fishery protection."}},

"574":{history:"Norfolk Island — Australian external territory. Bounty descendants.",
timeline:[{y:1788,t:"British settlement"},{y:1856,t:"Pitcairners arrive"},{y:1913,t:"Australian"},{y:2016,t:"Self-government abolished"}],
values:{religion:"Christian (~52%).",objectives:"Tourism. Self-governance contention.",mindset:"Norfuk language, Bounty descendants.",mentality:"Mutineers heritage."}},

"580":{history:"Northern Mariana Islands — US commonwealth. Chamorro.",
timeline:[{y:1668,t:"Spanish"},{y:1898,t:"Germany buys from Spain"},{y:1919,t:"Japanese mandate"},{y:1975,t:"CNMI commonwealth"}],
values:{religion:"Catholic (~80%).",objectives:"Tourism. US federal funds. Immigration management.",mindset:"Chamorro + Carolinian + Asian immigrant.",mentality:"Saipan tourism economy."}},

"581":{history:"US Minor Outlying Islands — uninhabited.",
timeline:[{y:1856,t:"Guano Act claims"},{y:1898,t:"Various acquisitions"}],
values:{religion:"—",objectives:"Strategic/bird sanctuary.",mindset:"—",mentality:"—"}},

"612":{history:"Pitcairn Islands — UK territory. Bounty descendants. ~50 inhabitants.",
timeline:[{y:1790,t:"Mutineers arrive"},{y:1838,t:"British"},{y:2004,t:"Sexual abuse trials"},{y:2015,t:"Marine reserve"}],
values:{religion:"Seventh-Day Adventist (~100%).",objectives:"Population preservation. Tourism.",mindset:"Pitkern language, SDA community.",mentality:"Smallest country by population (~50)."}},

"630":{history:"Spanish 1493-1898. US commonwealth since 1952. Statehood/status debated.",
timeline:[{y:1493,t:"Columbus"},{y:1898,t:"US from Spain"},{y:1917,t:"Citizenship"},{y:1952,t:"Commonwealth"},{y:2017,t:"Maria"},{y:2019,t:"Ricky Renuncia"},{y:2024,t:"Statehood referendum"}],
values:{religion:"Catholic (~56%), Protestant (~33%).",objectives:"Status resolution. Economic recovery. PROMESA debt.",mindset:"Puerto Rican Hispanic-American hybrid. Bilingual. Bomba, salsa.",mentality:"'Colonia' tension. Three-status debate perpetual. Bad Bunny era cultural confidence."}},

"638":{history:"Réunion — French overseas department in Indian Ocean.",
timeline:[{y:1642,t:"French claim"},{y:1848,t:"Abolition"},{y:1946,t:"Department"},{y:2018,t:"Yellow Vests local"}],
values:{religion:"Catholic (~85%), Hindu, Muslim minorities.",objectives:"Diversify economy. French solidarity support. Volcano tourism.",mindset:"Creole multi-ethnic (European, African, Indian, Chinese, Malagasy).",mentality:"Indian Ocean France. Piton de la Fournaise active volcano."}},

"652":{history:"St Barthélemy — French Caribbean territory, luxury tourism.",
timeline:[{y:1648,t:"French"},{y:1784,t:"Swedish (briefly)"},{y:1878,t:"French again"},{y:2007,t:"Separate collectivity"}],
values:{religion:"Catholic (~90%).",objectives:"Luxury tourism. Quiet exclusivity.",mindset:"Small, wealthy, French.",mentality:"Celebrity playground identity."}},

"654":{history:"Saint Helena — British South Atlantic. Napoleon exile site.",
timeline:[{y:1502,t:"Portuguese discover"},{y:1659,t:"British"},{y:1815,t:"Napoleon exile"},{y:2017,t:"Airport opens"}],
values:{religion:"Christian (~95%).",objectives:"Tourism. British aid. Ascension military base.",mindset:"Saints — mixed European, African, Asian, Madagascan.",mentality:"Remote British outpost."}},

"660":{history:"Anguilla — British Caribbean.",
timeline:[{y:1650,t:"British"},{y:1967,t:"Anguillan Revolution"},{y:1980,t:"Separate from Kitts-Nevis"}],
values:{religion:"Christian (~92%).",objectives:"Tourism. Financial services. UKOT.",mindset:"Anguillan distinct English-Caribbean.",mentality:"Successful revolution to stay British (ironic)."}},

"663":{history:"Saint Martin — French Caribbean territory.",
timeline:[{y:1648,t:"Treaty of Concordia"},{y:2007,t:"Separate collectivity"},{y:2017,t:"Irma devastates"}],
values:{religion:"Catholic (~85%).",objectives:"Post-Irma recovery. Tourism. Shared island management.",mindset:"Multilingual Caribbean French.",mentality:"Border-less island unique."}},

"666":{history:"Saint Pierre and Miquelon — French North Atlantic near Canada.",
timeline:[{y:1604,t:"French settlement"},{y:1763,t:"British briefly"},{y:1816,t:"French permanent"},{y:1985,t:"Territorial collectivity"}],
values:{religion:"Catholic (~99%).",objectives:"Fisheries. French connection. Tourism.",mindset:"Breton-Basque-Norman descent, French Canadian-adjacent.",mentality:"Only remaining French North America."}},

"678":{history:"Portuguese São Tomé and Príncipe 1485. Independence 1975. Oil potential.",
timeline:[{y:1485,t:"Portuguese"},{y:1878,t:"Cocoa plantation"},{y:1953,t:"Batepá massacre"},{y:1975,t:"Independence"},{y:2024,t:"Chinese investment"}],
values:{religion:"Christian (~82%, Catholic).",objectives:"Oil exploration. Cocoa. Tourism. Independence from Portuguese donors.",mindset:"Lusophone, African-Portuguese Creole.",mentality:"Smallest Portuguese-speaking country."}},

"690":{history:"French then British colony. Independence 1976. Tourism economy. Offshore finance.",
timeline:[{y:1770,t:"French settlement"},{y:1814,t:"British"},{y:1976,t:"Independence"},{y:1977,t:"Socialist coup"},{y:1993,t:"Multiparty"},{y:2020,t:"Ramkalawan wins"},{y:2024,t:"High-income status"}],
values:{religion:"Christian (~76%), Hindu (~2%), Muslim (~1%).",objectives:"Climate. Tourism. Blue economy. Offshore reputation.",mindset:"Creole, multi-ethnic.",mentality:"Richest African by GDP/capita."}},

"744":{history:"Svalbard — Norwegian, unique Treaty allowing non-Norwegians residence.",
timeline:[{y:1596,t:"Barents discovers"},{y:1920,t:"Svalbard Treaty"},{y:1925,t:"Norwegian sovereignty"},{y:2006,t:"Global Seed Vault"}],
values:{religion:"Lutheran (~54%), diverse.",objectives:"Preserve treaty regime. Russia coexistence (Barentsburg). Research.",mindset:"International research community, Russian miners, Norwegian.",mentality:"'No-visa' place — unique residency system. Polar bear country."}},

"772":{history:"Tokelau — NZ territory. Three atolls. 1,500 people.",
timeline:[{y:-1000,t:"Polynesian settlement"},{y:1889,t:"British protectorate"},{y:1948,t:"NZ administers"},{y:2007,t:"Self-determination referenda fail"}],
values:{religion:"Christian (~99%).",objectives:"Self-determination debated. Climate. NZ aid.",mindset:"Polynesian, family-governed.",mentality:"Tiny, consensus-based, tradition-preserving."}},

"796":{history:"Turks and Caicos Islands — British, tourism.",
timeline:[{y:1512,t:"Spanish sights"},{y:1962,t:"Separate from Jamaica"},{y:2009,t:"Direct UK rule corruption"},{y:2012,t:"Self-rule restored"}],
values:{religion:"Christian (~72%).",objectives:"Tourism. UKOT status. Anti-corruption.",mindset:"Caribbean English, tourism-focused.",mentality:"Smaller offshore financial center."}},

"831":{history:"Guernsey — Crown Dependency.",
timeline:[{y:933,t:"Duchy of Normandy"},{y:1066,t:"William Conqueror ties"},{y:1204,t:"Remains English after Normandy loss"},{y:1940,t:"German occupation"}],
values:{religion:"Christian (~65%).",objectives:"Financial services. Crown Dependency relationship. Fiscal autonomy.",mindset:"Norman-English hybrid, Guernsey patois.",mentality:"'Not UK, not EU' unique status."}},

"832":{history:"Jersey — Crown Dependency, largest Channel Island.",
timeline:[{y:933,t:"Duchy Normandy"},{y:1204,t:"Remains English"},{y:1940,t:"German occupation"},{y:1945,t:"Liberation"}],
values:{religion:"Christian (~54%).",objectives:"Financial services. Crown Dependency autonomy. Tourism.",mindset:"Norman-English, Jersey Jèrriais.",mentality:"Offshore finance reputation."}},

"833":{history:"Isle of Man — Crown Dependency. Tynwald oldest parliament (~979).",
timeline:[{y:900,t:"Viking settlement"},{y:979,t:"Tynwald (oldest parliament)"},{y:1405,t:"Stanley family rule"},{y:1866,t:"Home Rule"}],
values:{religion:"Christian (~54%).",objectives:"Financial services. TT motorcycle races. Manx Gaelic revival.",mindset:"Celtic-Viking heritage, tax haven.",mentality:"'Ellan Vannin' Manx pride. World's oldest parliament."}},

"850":{history:"US Virgin Islands — bought from Denmark 1917.",
timeline:[{y:1672,t:"Danish"},{y:1917,t:"US purchase"},{y:1927,t:"Citizenship"},{y:2017,t:"Irma/Maria devastate"}],
values:{religion:"Christian (~65%).",objectives:"Tourism. Federal aid. Statehood unlikely.",mindset:"Caribbean, US territorial.",mentality:"Unincorporated territory status."}},

"876":{history:"Wallis and Futuna — French Pacific territory. Two kingdoms plus France.",
timeline:[{y:1616,t:"European contact"},{y:1842,t:"French protectorate"},{y:1961,t:"Territory"}],
values:{religion:"Catholic (~97%).",objectives:"French aid. Traditional monarchies preservation.",mindset:"Polynesian Catholic, kingly traditions.",mentality:"France's most traditional Pacific territory."}},

// Special
"x_siachen_glacier":{history:"Disputed glacier between India and Pakistan. World's highest battlefield since 1984.",
timeline:[{y:1984,t:"Operation Meghdoot"},{y:2003,t:"Ceasefire"},{y:2012,t:"Gayari avalanche"},{y:2024,t:"Continued military presence"}],
values:{religion:"—",objectives:"Indian/Pakistani territorial claim. Environmental damage accumulating.",mindset:"Military garrison life at extreme altitude.",mentality:"Most absurd conflict geography."}},

"x_ashmore_and_cartier_is_":{history:"Australian external territory — uninhabited reef system in Timor Sea.",
timeline:[{y:1800,t:"Discovery"},{y:1931,t:"Australian"},{y:1978,t:"Territory created"}],
values:{religion:"—",objectives:"Nature reserve. Asylum vessel interdiction zone.",mindset:"—",mentality:"—"}},

"10":{history:"Claimed in sectors by seven nations. Antarctic Treaty 1959 froze claims. Madrid Protocol 1991 banned mining 50 years. No permanent population, ~1000-4000 researchers.",
timeline:[{y:1820,t:"First sighting"},{y:1911,t:"Amundsen at South Pole"},{y:1957,t:"IGY"},{y:1959,t:"Antarctic Treaty"},{y:1991,t:"Madrid Protocol"},{y:2022,t:"Endurance wreck found"},{y:2048,t:"Protocol review eligible"}],
values:{religion:"—",objectives:"Preserve scientific continent. Climate research. Prevent mineral exploitation. Manage tourism.",mindset:"Scientific international cooperation.",mentality:"Last wilderness. Global commons experiment."}}

};

Object.keys(HV).forEach(id=>{
  if(!COUNTRY_DB[id])COUNTRY_DB[id]={};
  const d=COUNTRY_DB[id],h=HV[id];
  if(!d.history&&h.history)d.history=h.history;
  if(!d.timeline&&h.timeline)d.timeline=h.timeline;
  if(!d.values&&h.values)d.values=h.values;
});

// Generic fallback: for any country still missing history/values, write a minimal placeholder
// so every selected country shows something in the History tab.
(function fillGaps(){
  Object.keys(COUNTRY_DB).forEach(id=>{
    const d=COUNTRY_DB[id];
    if(d.history&&d.values)return;
    const name=d.name||(window.CN_FULL&&window.CN_FULL[id]&&window.CN_FULL[id].n)||'this territory';
    if(!d.history){
      d.history="Detailed historical chronology for "+name+" is being compiled. General pattern: pre-modern local societies, period of external influence or colonization, modern state-building, and ongoing economic/political evolution.";
    }
    if(!d.timeline){
      d.timeline=[{y:1900,t:"Early modern state/territory"},{y:1960,t:"Mid-20th-c transition"},{y:2000,t:"Contemporary era"}];
    }
    if(!d.values){
      d.values={
        religion:"Mixed religious landscape; data being compiled.",
        objectives:"Economic development, stability, regional cooperation, cultural preservation.",
        mindset:"Shaped by geography, history, and cultural traditions specific to the territory.",
        mentality:"National identity and public values reflect layered historical experiences."
      };
    }
  });
})();
})();
