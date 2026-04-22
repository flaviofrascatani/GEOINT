// GEOINT v8 — Major global alliances
// Each alliance has: name, type, color, description (features), members (ISO numeric codes)
// Click in UI → highlight member countries on globe in alliance color
window.ALLIANCES = [

{
  id:"nato",
  name:"NATO",
  fullName:"North Atlantic Treaty Organization",
  type:"Defensive military alliance",
  color:"#305882",
  founded:1949,
  description:"Collective-defense pact: Article 5 treats an attack on one member as attack on all. Led by US. Expanded from 12 founding members to 32 after Ukraine war (Finland 2023, Sweden 2024). Nuclear-sharing arrangement with US B61 warheads in 5 countries. HQ Brussels + SHAPE (Mons). Combined defense spending ~$1.3T, US ~68% of total. Collective doctrine evolved from deterring USSR → expeditionary (Afghanistan) → back to territorial defense since 2014/2022 Russian aggression.",
  features:[
    "Article 5 mutual defense commitment",
    "2% GDP defense-spending target (23 of 32 meeting in 2024)",
    "Nuclear-sharing with US B61 bombs in Belgium, Germany, Italy, Netherlands, Turkey",
    "Integrated command structure (SACEUR always American)",
    "Enhanced Forward Presence battlegroups in eastern flank",
    "Partnership for Peace with ~20 non-members"
  ],
  members:["840","826","124","250","276","380","528","56","442","578","208","352","620","300","792","724","203","616","348","703","705","642","100","233","428","440","191","8","499","807","246","752"]
},

{
  id:"eu",
  name:"European Union",
  fullName:"European Union",
  type:"Economic + political + monetary union",
  color:"#003399",
  founded:1993,
  description:"Supranational union with 27 members. Single market (goods, services, capital, people), customs union, and 20-member eurozone (common currency). Shared sovereignty in many policy areas — trade, competition, agriculture, fisheries, external borders. Institutions: Commission (executive), Parliament (elected), Council (member-state governments), European Court of Justice, ECB, European Central Bank. Brexit 2020 removed UK. Ongoing enlargement candidates: Ukraine, Moldova, Western Balkans, Turkey (frozen).",
  features:[
    "Single Market freedom of movement for goods/services/capital/people",
    "Eurozone shared monetary policy (ECB) — 20 of 27 members",
    "Schengen passport-free travel zone",
    "Common External Trade Policy via Commission",
    "Common Agricultural Policy (CAP) ~30% of budget",
    "EU climate law, Green Deal, CBAM carbon border mechanism",
    "Permanent Structured Cooperation (PESCO) defense coordination"
  ],
  members:["40","56","100","191","196","203","208","233","246","250","276","300","348","372","380","428","440","442","470","528","616","620","642","703","705","724","752"]
},

{
  id:"brics",
  name:"BRICS+",
  fullName:"BRICS Plus",
  type:"Economic + political non-Western bloc",
  color:"#c0392b",
  founded:2009,
  description:"Originally Brazil-Russia-India-China (2009) + South Africa (2010). Expanded 2024 with Egypt, Ethiopia, Iran, UAE (Saudi Arabia accepted but not formalized). Represents ~45% of world population, ~36% of global GDP (PPP). Not a formal alliance — political-economic coordination platform. New Development Bank in Shanghai. Common Currency proposals discussed but unrealized. Internal tensions: China-India border, Saudi-Iran recent détente fragile.",
  features:[
    "Challenges Western economic dominance without formal confrontation",
    "New Development Bank — alternative to World Bank",
    "Contingent Reserve Arrangement — alternative to IMF",
    "Push for dedollarization in bilateral trade",
    "Annual summits, rotating chair",
    "Expanding membership — 30+ countries expressed interest"
  ],
  members:["76","643","356","156","710","818","231","364","784"]
},

{
  id:"asean",
  name:"ASEAN",
  fullName:"Association of Southeast Asian Nations",
  type:"Economic + political regional bloc",
  color:"#006B3C",
  founded:1967,
  description:"Regional organization of 10 Southeast Asian states. Consensus-based decision-making ('ASEAN Way') often criticized for slowness but keeps members talking. ASEAN Free Trade Area (AFTA) reduces internal tariffs. Key external partners via 'ASEAN+3' (China, Japan, Korea), East Asia Summit, RCEP. Myanmar suspended politically since 2021 coup.",
  features:[
    "Non-interference principle (contested post-Myanmar crisis)",
    "ASEAN Free Trade Area integrated market",
    "RCEP — world's largest trade bloc by population since 2022",
    "Consensus-based governance",
    "No military alliance but South China Sea coordination",
    "Annual summits, rotating chairmanship"
  ],
  members:["360","458","608","702","764","96","704","418","104","116"]
},

{
  id:"au",
  name:"African Union",
  fullName:"African Union",
  type:"Continental political union",
  color:"#009639",
  founded:2002,
  description:"Successor to the Organisation of African Unity (1963). All 55 African states members (including Western Sahara/SADR, disputed by Morocco). HQ Addis Ababa. Agenda 2063 development framework. African Continental Free Trade Area (AfCFTA) launched 2021 — world's largest FTA by member count (1.4B people). African Standby Force exists on paper. Recurring coups (Mali, Burkina, Niger, Guinea, Gabon, Sudan) strain the 'no unconstitutional change' norm.",
  features:[
    "AfCFTA — free trade across 54 countries (1.4B people)",
    "Peace & Security Council — authorizes peacekeeping",
    "Agenda 2063 — 50-year development blueprint",
    "Right to intervene in member states for atrocities (Article 4h)",
    "African Standby Force — 5 regional brigades (slow progress)",
    "Suspension mechanism for coups (used vs Mali, Burkina, Niger, Guinea, Gabon 2020-23)"
  ],
  members:["12","24","204","72","854","108","120","132","140","148","174","178","180","384","262","818","226","231","232","748","266","270","288","324","624","404","426","430","434","450","454","466","478","480","504","508","516","562","566","646","678","686","690","694","706","710","728","729","732","768","788","800","834","854","894","716"]
},

{
  id:"arab_league",
  name:"Arab League",
  fullName:"League of Arab States",
  type:"Political + cultural alliance",
  color:"#c8102e",
  founded:1945,
  description:"22 Arabic-speaking states. Founded Cairo 1945. Combined population ~450M. Joint Arab Economic Action Council. Arab common market perpetually proposed. Syria suspended 2011-23 (readmitted). Egypt expelled 1979-89 after Israel peace treaty. Joint Arab Force proposed 2015 (stalled). Deep internal divides: Saudi-Iran/Qatar-Saudi-UAE tensions, Libya crisis, Syria, Palestine positioning. Influence limited by fragmentation.",
  features:[
    "Shared Arab identity and Arabic language framework",
    "Historic common Palestinian cause",
    "Greater Arab Free Trade Area — mostly symbolic",
    "Arab Common Market — perpetually aspirational",
    "Emergency Arab summits convene during crises",
    "Regional coordination on refugees, economics"
  ],
  members:["12","48","174","262","818","368","400","414","422","434","478","504","512","275","634","682","706","729","760","788","784","887"]
},

{
  id:"g7",
  name:"G7",
  fullName:"Group of Seven",
  type:"Informal economic + political forum",
  color:"#555555",
  founded:1975,
  description:"Advanced industrial democracies meeting informally since 1975 (originally G6, Canada joined 1976). Russia added 1998 (G8), expelled 2014 after Crimea. Combined ~$45T GDP (~45% world total). Annual summits set Western economic and political agenda. Formal decisions non-binding but shape global norms. Coordinated sanctions on Russia 2022, G7 price caps on Russian oil.",
  features:[
    "Annual leaders' summits — rotating host",
    "Finance ministers, foreign ministers meetings",
    "Ad hoc crisis coordination (Covid, Russia sanctions, Gaza)",
    "Minimum global corporate tax (15%) framework 2021",
    "Partnership for Global Infrastructure & Investment (anti-BRI)",
    "Coordination with EU — EU as 'non-enumerated' G7 member"
  ],
  members:["840","826","124","250","276","380","392"]
},

{
  id:"g20",
  name:"G20",
  fullName:"Group of Twenty",
  type:"Economic coordination forum",
  color:"#4a6a7a",
  founded:1999,
  description:"Forum for finance ministers + central-bank governors initially (1999), elevated to leaders' summits post-2008 financial crisis. 19 countries + EU + AU (admitted 2023). ~85% global GDP, 2/3 world population. Consensus rare but platform for indispensable US-China dialogue. Russia still participates despite Ukraine war. Annual summits (2024: Brazil, 2025: South Africa).",
  features:[
    "Annual leaders' summit + finance track + sherpa track",
    "Working groups on finance, trade, climate, employment",
    "2008 G20 framework handled global financial crisis",
    "African Union admitted 2023 — enlargement model",
    "BEPS global tax reform negotiated here",
    "Platform for bilateral meetings during summits"
  ],
  members:["32","36","76","124","156","250","276","356","360","380","392","484","643","682","710","410","792","826","840","724"]
},

{
  id:"commonwealth",
  name:"Commonwealth",
  fullName:"Commonwealth of Nations",
  type:"Political + cultural association",
  color:"#1e3a5f",
  founded:1949,
  description:"Free association of 56 member states, mostly former British Empire (but Mozambique, Rwanda, Gabon, Togo joined without colonial history). Monarch of UK is Head of Commonwealth (symbolic). Commonwealth Games, Secretariat in London, development assistance, shared legal traditions. English language connection. Charter commits to democracy, human rights (breached repeatedly by members).",
  features:[
    "Commonwealth Charter — democracy, human rights norms (often violated)",
    "Commonwealth Games (4-year cycle like Olympics)",
    "Commonwealth of Learning, Secretariat in London",
    "Shared legal/judicial traditions (common law)",
    "Observer status at UN for Secretariat",
    "Membership suspension mechanism — used on Fiji, Zimbabwe, Pakistan"
  ],
  members:["36","44","50","52","54","56","84","124","188","212","242","266","270","288","320","324","352","372","388","404","426","430","458","462","466","470","480","498","516","554","566","586","598","598","642","646","674","686","678","694","702","710","746","748","768","770","772","776","780","798","800","826","834","854","882","886","894"]
},

{
  id:"csto",
  name:"CSTO",
  fullName:"Collective Security Treaty Organization",
  type:"Defensive military alliance (Russian-led)",
  color:"#8b3232",
  founded:1992,
  description:"Russian-led post-Soviet defense pact. Article 4 collective defense mirrors NATO Article 5. Activated first time in January 2022 to suppress Kazakhstan protests. Armenia suspended participation 2023-24 after Russian inaction over Karabakh. Wagner group parallel structure undermines official doctrine. Weakening visibly as Russia overstretched in Ukraine.",
  features:[
    "Article 4 collective defense commitment",
    "Collective Rapid Reaction Force (CRRF)",
    "CSTO peacekeeping forces deployed Kazakhstan 2022",
    "Joint military exercises annually",
    "Arms-supply preferential pricing among members",
    "Armenia participation frozen since 2023 Karabakh failure"
  ],
  members:["643","51","112","398","417","762"]
},

{
  id:"sco",
  name:"SCO",
  fullName:"Shanghai Cooperation Organisation",
  type:"Political + security + economic (Eurasian)",
  color:"#c8162c",
  founded:2001,
  description:"China + Russia-led Eurasian security/economic bloc. Originally about Central Asian borders (1996 'Shanghai Five'), expanded to counter-terrorism, regional stability, and increasingly economic cooperation. India + Pakistan joined 2017. Iran full member 2023, Belarus 2024. ~40% world population, ~30% GDP. Consensus-based but internal contradictions (India-China border, India-Pakistan).",
  features:[
    "Counter-terrorism coordination (RATS in Tashkent)",
    "Joint military exercises (Peace Mission)",
    "Regional Anti-Terrorist Structure — intelligence sharing",
    "SCO Development Bank (proposed, not operational)",
    "Annual heads-of-state summit",
    "Observer status for Afghanistan, Mongolia"
  ],
  members:["156","643","398","417","762","860","356","586","364","112"]
},

{
  id:"mercosur",
  name:"Mercosur",
  fullName:"Mercado Común del Sur",
  type:"Customs union",
  color:"#007934",
  founded:1991,
  description:"South American customs union. Bolivia joined as full member 2024. Venezuela suspended indefinitely since 2017 (democracy clause). Common External Tariff, but frequent exceptions. Chile, Colombia, Peru, Ecuador, Guyana, Suriname associate members. EU-Mercosur FTA signed 2019 but unratified due to Amazon deforestation concerns. Milei-era Argentina wants looser structure.",
  features:[
    "Common External Tariff (with many exceptions)",
    "~$3T combined GDP, ~300M people",
    "Parlasur — regional parliament (limited powers)",
    "Mercosur court of arbitration",
    "Chile, Colombia, Peru, Ecuador as associates",
    "EU-Mercosur FTA in legal limbo since 2019"
  ],
  members:["32","76","600","858","68"]
},

{
  id:"opec_plus",
  name:"OPEC+",
  fullName:"OPEC Plus",
  type:"Oil cartel + economic coordination",
  color:"#000000",
  founded:2016,
  description:"OPEC (founded 1960, 12 members) expanded informally with 10 non-OPEC producers led by Russia since 2016. Controls ~40% of global oil production and ~80% of proven reserves. Production quota agreements to support prices. Saudi-Russia core dynamic. 2020 price war preceded cooperation. Post-2022 Russia sanctions coordinated cuts despite Western pressure on Saudis to pump more.",
  features:[
    "Monthly/bimonthly JMMC meetings on production",
    "Voluntary additional cuts by Saudi + Russia often",
    "~40% of global oil supply",
    "~80% of proven reserves",
    "Saudi swing-producer role",
    "Angola exited OPEC 2023; Gabon uncertain"
  ],
  members:["12","226","368","364","414","434","562","566","682","784","862","643","478","266","678"]
},

{
  id:"gcc",
  name:"GCC",
  fullName:"Gulf Cooperation Council",
  type:"Political + economic regional bloc",
  color:"#ffd700",
  founded:1981,
  description:"Six Arabian Peninsula monarchies (Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, Oman). Common market, unified visa for tourists, GCC Joint Defense Council. 2017-21 blockade of Qatar by Saudi/UAE/Bahrain showed internal limits. Peninsula Shield Force (symbolic). Yemen war rift (Saudi-UAE support rival factions). GCC-wide currency repeatedly proposed, never delivered.",
  features:[
    "Common Market (goods, services, capital, labor)",
    "GCC Monetary Council (common currency proposed forever)",
    "Peninsula Shield Force — joint military (limited deployment)",
    "Unified GCC tourist visa 2025",
    "GCC Interconnection Authority (electricity grid)",
    "Qatar blockade 2017-21 showed cracks"
  ],
  members:["682","784","414","634","48","512"]
},

{
  id:"aukus",
  name:"AUKUS",
  fullName:"Australia-UK-US security partnership",
  type:"Defensive security + technology partnership",
  color:"#1e4d8b",
  founded:2021,
  description:"Trilateral security pact announced September 2021. Pillar 1: Australia to acquire nuclear-powered (conventionally-armed) submarines via UK/US cooperation — first delivery ~2032. Pillar 2: advanced capabilities sharing including AI, quantum, hypersonic, underwater autonomous, cyber. Infuriated France (cancelled French sub contract). China-containment oriented. Canada/NZ/Japan/Korea discussed as possible Pillar 2 partners.",
  features:[
    "Pillar 1: Australian nuclear-powered submarines (SSN-AUKUS class)",
    "Pillar 2: AI, quantum, hypersonic, cyber tech sharing",
    "US Virginia-class subs to Australia from 2032",
    "Possible Japan, Korea, Canada, NZ Pillar 2 extension",
    "Complements Five Eyes intelligence + QUAD",
    "~$245B AUD lifetime cost estimate for Australia"
  ],
  members:["36","826","840"]
},

{
  id:"five_eyes",
  name:"Five Eyes",
  fullName:"FVEY intelligence alliance",
  type:"Intelligence-sharing alliance",
  color:"#4a4a4a",
  founded:1946,
  description:"Anglo-Saxon intelligence-sharing alliance dating to 1946 UKUSA Agreement. Signals intelligence, imagery intelligence, raw data sharing among 5 national agencies (NSA, GCHQ, CSE, ASD, GCSB). Echelon global surveillance system disclosed 1990s-2000s. Post-Snowden debates persist. Japan, Germany, France discussed as '9 Eyes'/'14 Eyes' tiers. Japan increasingly integrated (not formal FVEY).",
  features:[
    "SIGINT (signals intel) sharing — near-complete data access",
    "Imagery/geospatial intelligence coordination",
    "Joint facilities (Pine Gap, Menwith Hill)",
    "'Second Party' status among themselves",
    "Shared cryptographic standards",
    "Strongest peacetime intelligence alliance in history"
  ],
  members:["840","826","124","36","554"]
},

{
  id:"quad",
  name:"Quad",
  fullName:"Quadrilateral Security Dialogue",
  type:"Strategic dialogue (Indo-Pacific)",
  color:"#ff6f00",
  founded:2007,
  description:"US-Japan-Australia-India diplomatic forum revived 2017 after hiatus. Not a formal alliance. China-containment character implicit. Leaders' summits since 2021. Focus: maritime security, supply chains, emerging tech, vaccines, infrastructure in Indo-Pacific. Malabar naval exercise annually. India's non-alignment limits Quad military coordination — defense pact excluded by New Delhi.",
  features:[
    "Annual leaders' summits since 2021",
    "Malabar naval exercises (expanded to 4 participants 2020)",
    "Maritime domain awareness initiative",
    "Quad vaccine partnership (Covid era)",
    "Critical & emerging tech working group",
    "Supply chain resilience initiative"
  ],
  members:["840","392","36","356"]
},

{
  id:"pif",
  name:"Pacific Islands Forum",
  fullName:"Pacific Islands Forum",
  type:"Regional political organization",
  color:"#00a1e4",
  founded:1971,
  description:"18 member states + territories of the Pacific. Includes Australia, NZ, Polynesian/Melanesian/Micronesian states. Secretariat in Suva. Climate crisis defines the agenda — rising seas existential for members. Forum Fisheries Agency manages tuna stocks. Biketawa Declaration allows regional intervention (used on Solomon Islands 2003-17). Growing Chinese economic/security presence destabilizing traditional Australian leadership.",
  features:[
    "Climate security + rising sea advocacy",
    "Pacific Islands Forum Fisheries Agency",
    "Biketawa + Boe declarations (security crisis response)",
    "Blue Pacific Continent strategy vs Chinese incursion",
    "Australian 'Pacific Step-Up' + NZ 'Pacific Reset'",
    "Micronesian members sub-bloc (2021 threatened split)"
  ],
  members:["36","554","242","598","90","548","296","520","798","882","776","585","584","583","540","258","184","570"]
},

{
  id:"cis",
  name:"CIS",
  fullName:"Commonwealth of Independent States",
  type:"Post-Soviet coordination organization",
  color:"#a03030",
  founded:1991,
  description:"Post-Soviet successor organization — originally 12 Republics after USSR collapse. Georgia left 2008 (war). Ukraine de facto left 2014, formally 2018. Baltic states never joined. Moldova's departure announced 2024. Coordination on economics (CIS FTA), migration, some security. Overshadowed by EEU for economics, CSTO for security. Role diminishing.",
  features:[
    "CIS Free Trade Agreement 2011",
    "Visa-free travel among members",
    "CIS Anti-Terrorism Center",
    "CIS-wide education/diploma recognition",
    "Coordination councils on economics, humanitarian issues",
    "Shrinking relevance post-2014 Ukraine crisis"
  ],
  members:["643","51","31","112","398","417","762","860","498"]
},

{
  id:"ecowas",
  name:"ECOWAS",
  fullName:"Economic Community of West African States",
  type:"Regional economic + political bloc",
  color:"#00a651",
  founded:1975,
  description:"West African regional bloc of 15 states (12 since 2024 withdrawals). Common free trade zone, freedom of movement. ECOWAS Court of Justice. ECOWAS Monetary Zone proposes common currency 'Eco' (delayed indefinitely). ECOMOG peacekeeping missions (Liberia, Sierra Leone, Guinea-Bissau, The Gambia). Major setback 2024: Mali, Burkina Faso, Niger formally withdrew and formed Alliance of Sahel States.",
  features:[
    "Free movement of citizens, goods, services",
    "Common External Tariff (2015)",
    "ECOWAS Monetary Zone — 'Eco' currency planned",
    "ECOMOG peacekeeping force",
    "ECOWAS Court of Justice",
    "Sahel states withdrawal 2024 — major crisis"
  ],
  members:["132","384","270","288","324","624","430","566","686","694","768","204"]
},

{
  id:"aes",
  name:"AES",
  fullName:"Alliance of Sahel States",
  type:"Defensive military + political alliance",
  color:"#7d3c98",
  founded:2023,
  description:"Mali, Burkina Faso, Niger junta-led defense pact formed September 2023. Confederation upgraded 2024 with plans for common currency, passports, joint force. Formally withdrew from ECOWAS 2024. Russian Africa Corps/Wagner presence critical in all three. Anti-French/anti-Western alignment. Expanding to consider Chad, Guinea. Represents major realignment of Sahel away from Francophone orbit.",
  features:[
    "Mutual defense pact (September 2023)",
    "Confederation declared 2024 — common passport, currency planned",
    "Joint anti-jihadist force",
    "Coordinated Russian military partnerships",
    "ECOWAS withdrawal collective January 2024",
    "Potential expansion: Chad, Guinea, Togo interest"
  ],
  members:["466","854","562"]
},

{
  id:"oas",
  name:"OAS",
  fullName:"Organization of American States",
  type:"Regional political organization",
  color:"#002868",
  founded:1948,
  description:"35 independent American states. Cuba suspended 1962-2009 (allowed to return but Cuba declines). Venezuela left 2019 (Maduro), OAS recognizes opposition. Inter-American Democratic Charter, Human Rights Commission/Court. Weakened by rise of CELAC (regional bloc excluding US/Canada, 2011). Fragmented: US-aligned, Bolivarian ALBA (Venezuela, Nicaragua, Cuba), neutral states.",
  features:[
    "Inter-American Democratic Charter 2001",
    "Inter-American Commission on Human Rights",
    "Inter-American Court of Human Rights",
    "Electoral observation missions",
    "Pan-American Summit mechanism",
    "Weakened by CELAC + regional fragmentation"
  ],
  members:["28","32","44","52","68","76","84","124","152","170","188","192","212","214","218","222","308","320","328","332","340","388","484","558","591","600","604","630","659","662","670","740","780","840","858","862"]
},

{
  id:"eeu",
  name:"EAEU",
  fullName:"Eurasian Economic Union",
  type:"Economic + customs union",
  color:"#a03030",
  founded:2015,
  description:"Russia-led customs union + common market. Russia, Belarus, Kazakhstan, Armenia, Kyrgyzstan. Common External Tariff, freedom of movement for labor. Overshadowed by Russian sanctions post-2022 — forced to reroute trade via EEU states. Uzbekistan/Tajikistan observer. Iran FTA 2023.",
  features:[
    "Single market for goods/services/capital/labor",
    "Common External Tariff (Customs Union)",
    "Eurasian Economic Commission (executive)",
    "Iran FTA 2023 — expanding influence",
    "Belarus increasing integration with Russia",
    "Central Asian states hedging membership"
  ],
  members:["643","112","398","51","417"]
},

{
  id:"caricom",
  name:"CARICOM",
  fullName:"Caribbean Community",
  type:"Regional economic + political union",
  color:"#00ccff",
  founded:1973,
  description:"15 Caribbean states + 5 associate members. CARICOM Single Market and Economy (CSME). Caribbean Court of Justice. Climate-change advocacy on international stage (disproportionate to size). Coordinated reparations claims vs former European colonizers 2020s. Haiti crisis dominant recent agenda — lead role in post-2024 stabilization.",
  features:[
    "CARICOM Single Market & Economy (2006)",
    "Caribbean Court of Justice",
    "Common agricultural policy",
    "Climate change + sea-level-rise advocacy",
    "Reparations Commission coordinated",
    "Haiti stabilization lead role"
  ],
  members:["28","44","52","84","212","308","332","388","659","662","670","780","328","740"]
}

];
