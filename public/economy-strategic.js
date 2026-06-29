// GEOINT v8 — Economic + Strategic descriptions for every country
// Adds: economyDesc (paragraph on sectors, dependencies, vulnerabilities)
//       strategicDesc (paragraph on global positioning, doctrine, alliances)
// Merges into COUNTRY_DB without overwriting existing fields.
(function(){
if(typeof COUNTRY_DB==='undefined')return;

const ES={

// ============ MAJOR POWERS ============
"840":{economyDesc:"World's largest economy (~$27T). Services dominate ~78%: finance, tech, healthcare, entertainment. Manufacturing ~11% but high-value (aerospace, semis, pharma). Agriculture tiny % of GDP yet huge export scale. Dollar hegemony finances twin deficits. Core reliance: consumer demand (~70% GDP), oil independence since shale boom, imported manufactured goods (especially from China/Mexico). Vulnerabilities: debt levels, rising inequality, supply-chain exposure in critical minerals.",strategicDesc:"Global hegemon maintaining blue-water navy spanning all oceans, ~750 overseas bases, and alliance network (NATO, Japan, South Korea, Australia). Doctrine: preserve liberal order, contain China, sustain dollar system, prevent any rival peer. Nuclear triad, unrivaled intelligence-surveillance-reconnaissance. Strategic concerns: peer competition with China, rogue nuclear states, domestic polarization, declining manufacturing base. Posture shifts under Trump 2.0 toward transactional alliances and selective engagement."},

"156":{economyDesc:"Second-largest economy (~$18.5T), largest manufacturer and exporter. Model: state-led capitalism — SOEs in strategic sectors, private firms in consumer goods/tech. Key sectors: electronics, machinery, EVs (world leader), batteries, solar panels, steel, textiles. Huge reliance on export demand, foreign tech (semiconductors especially), imported commodities (iron ore, oil, soy). Vulnerabilities: property-market crisis, demographic decline, debt buildup, Western tech decoupling. 'Dual circulation' strategy seeks to boost domestic consumption.",strategicDesc:"Rising superpower with explicit ambition to displace US as Indo-Pacific hegemon by 2049. Rapid military buildup — largest navy by hull count, third nuclear arsenal, hypersonics. Key fronts: Taiwan reunification, South China Sea militarization, Belt and Road Initiative extending global reach. Soft-power tools: Confucius Institutes, state media, BRI debt leverage. Tensions with US, India (border), Japan, Vietnam, Philippines. Strategic bottleneck: Malacca Strait vulnerability for oil imports."},

"643":{economyDesc:"Oil-and-gas dependent economy (~$2T nominal, heavily sanction-compressed). Hydrocarbons ~50% of fiscal revenue. Agriculture (world's largest wheat exporter), mining (nickel, palladium, rare earths). Defense industry exports weapons globally. Post-2022 sanctions: pivot to China, India, Turkey as buyers. Imports rerouted through 'parallel trade' via Central Asia, UAE. Ruble stabilized by capital controls and oil revenue. Vulnerabilities: tech sanctions on oilfield services, brain drain, demographic collapse, over-dependence on China pricing.",strategicDesc:"Revanchist regional power attempting to reconstitute sphere of influence across former USSR. Nuclear arsenal largest in world (~5,800 warheads). Syrian, Libyan, African (Wagner/Africa Corps) deployments. Ukraine war has drained conventional forces but deepened domestic militarization. Key alliances: CSTO (weakening), Iran, North Korea, Belarus. Positions itself as pole of 'multipolar world' alongside China. Long-term challenge: managing Chinese dominance within this partnership."},

"826":{economyDesc:"Services-dominated (~80%) with London as world's second financial hub after NYC. Key sectors: finance, professional services, pharma, aerospace, creative industries, higher education. Post-Brexit: lost EU market access, trying to pivot to CPTPP and bilateral deals. Manufacturing ~9% GDP but premium (Rolls-Royce, Jaguar, defense). Imports energy heavily. Vulnerabilities: productivity stagnation since 2008, regional inequality (London vs north), NHS crisis, Brexit friction.",strategicDesc:"Medium-great power retaining global reach via UN Security Council seat, nuclear deterrent (Trident), Five Eyes intelligence, Commonwealth network, AUKUS with US-Australia. Post-Brexit 'Global Britain' strategy: Indo-Pacific tilt, CPTPP membership, carrier strike group deployments. Lead European backer of Ukraine alongside US. Soft power via BBC, universities, English language. Tensions: Scottish independence latent, Northern Ireland frictions, declining defense spending as % GDP."},

"250":{economyDesc:"Fifth-largest world economy (~$3T). Strong state presence (~55% GDP via public spending). Key sectors: luxury (LVMH, Hermès), aerospace (Airbus), nuclear energy (70%+ electricity), pharma (Sanofi), agriculture (largest EU producer), tourism #1 worldwide. Heavy reliance on EU market, public debt ~110% GDP. Vulnerabilities: deindustrialization, pension-system strain, productivity gap with Germany, energy-intensive industry exposed.",strategicDesc:"Only EU nuclear power after Brexit. Permanent UNSC member. Force projection via Operation Barkhane (Sahel, now withdrawn), Pacific territories, Djibouti/UAE bases. Defense industry global exporter (Rafale, Scorpène subs). Strategic doctrine: 'strategic autonomy' for Europe, complement to NATO not alternative. Francophonie network in Africa crumbling (coups in Mali, Burkina, Niger 2020-23 — French forces expelled). Macron seeks EU defense union."},

"276":{economyDesc:"Largest EU economy (~$4.5T). Manufacturing powerhouse: automotive (Volkswagen, BMW, Mercedes), machinery/tools, chemicals (BASF), pharma. Mittelstand of medium-sized export champions. Heavy reliance on: exports (~47% GDP), skilled labor imports, formerly Russian gas (now LNG + Norwegian). Energy transition (Energiewende) creates industrial competitiveness concern. Debt brake constitutional. Vulnerabilities: China export dependence, car-industry EV transition, demographic aging, aging infrastructure.",strategicDesc:"Post-Ukraine 'Zeitenwende' — €100B special fund for military modernization, pledged 2% GDP defense spending. Previously pacifist foreign policy now reorienting toward deterrence. Largest EU economy anchors eurozone stability. Historic reluctance to lead reflexively due to WWII legacy fading under pressure. Key alliances: NATO core, Franco-German 'engine,' Eastern European partnerships. Uncomfortable with assertive great-power role but compelled toward it."},

"392":{economyDesc:"Third-largest economy (~$4.2T). Advanced manufacturing: automotive (Toyota #1 global), robotics, electronics, specialty chemicals, steel. Services dominate but manufacturing higher % than Western peers. Severe demographic challenge — shrinking by ~600K/year. Import reliance on energy (almost 100%) and food (~60%). Deflation since 1990s only recently reversing. BoJ unique monetary stance. Vulnerabilities: aging, labor shortages, government debt (~260% GDP), China competition in key sectors.",strategicDesc:"US ally and regional counter to China. Pacifist 1947 constitution (Article 9) under gradual reinterpretation — 'counterstrike capabilities' acquired 2022. Third-largest defense budget planned (2% GDP by 2027). Host ~55K US troops (Okinawa, Yokosuka). QUAD member. Tensions: China (Senkaku), North Korea missiles, Russia (Kurils). Soft power via anime, cuisine, technology. Strategic aim: prevent Chinese regional hegemony while maintaining peace with all."},

"356":{economyDesc:"Fifth-largest world economy (~$3.7T), fastest-growing major. Services ~54%, with IT services (TCS, Infosys) globally dominant. Manufacturing underdeveloped — 'Make in India' campaign pushing electronics assembly (Apple iPhones now). Agriculture employs ~45% but only ~17% GDP. Massive domestic market. Reliance on: oil imports (85%), foreign capital, diaspora remittances ($125B+ annually — world's largest). Vulnerabilities: jobless growth, inequality, climate vulnerability, banking sector fragility.",strategicDesc:"Ambitious to be 'Vishwaguru' (world teacher). Nuclear power (~160 warheads). Second-largest army. QUAD member (with US/Japan/Australia). Simultaneously SCO + BRICS. Strategic autonomy doctrine — buys Russian oil despite Ukraine war. Border tensions with China (2020 Galwan clash). Pakistan rivalry ongoing. Indo-Pacific naval presence expanding. Aspiration: permanent UNSC seat. Hindu nationalist foreign policy dimension under Modi."},

"76":{economyDesc:"Largest Latin American economy (~$2.2T). Agriculture superpower (world #1 in soy, coffee, sugar, beef exports). Iron ore (Vale), oil (Petrobras, pre-salt offshore fields), ethanol, aerospace (Embraer). Services ~66% but informal sector huge. Reliance on Chinese commodity demand (30%+ of exports). Vulnerabilities: Amazon deforestation, inequality (~Gini 0.53), infrastructure gaps, debt, currency volatility.",strategicDesc:"Regional Latin American leader without hegemonic ambition. BRICS founder. 'Active, assertive, solidary' foreign policy under Lula: equidistant between US-China, friendly with Russia/Iran. Amazon stewardship as leverage. No nuclear weapons (Treaty of Tlatelolco). Defense mostly internal (Amazon sovereignty). UNASUR revival aspirations. Soft power via football, music, Carnival. Strategic limitation: still-small military projection capacity."},

"36":{economyDesc:"~$1.7T mineral and agricultural exporter. Iron ore + coal + LNG = ~45% of exports (mostly to China/Japan/Korea). Services dominate (~75% GDP). Finance (Big Four banks), tourism, education (int'l students #3 income source). Housing market critical domestic wealth. Vulnerabilities: China dependence, housing bubble, climate impacts on agriculture, distance from markets, aging population.",strategicDesc:"US treaty ally (ANZUS 1951) pivoting hard toward Indo-Pacific security role. AUKUS trilateral with US/UK for nuclear-powered submarines (~2040 delivery). Five Eyes intelligence member. Pine Gap joint US facility. Host to upgraded US force posture (Darwin, Tindal). China relations thawed mid-2020s after trade-war period. Diplomatic reach: Pacific Islands Forum, QUAD. Dilemma: economic dependence on China vs security bet on US."},

"124":{economyDesc:"~$2.1T economy, services ~70%. Natural resources backbone: oil (third-largest reserves, world's 4th producer — Alberta tar sands), minerals (nickel, uranium, potash), forestry. Auto manufacturing (Ontario) integrated with US. Banking sector stable. Canada-US trade ~75% of Canadian exports. Vulnerabilities: US policy exposure (NAFTA/USMCA), housing affordability crisis, productivity gap with US.",strategicDesc:"Middle power in NATO + Five Eyes + G7. Arctic sovereignty (expanding interest as ice melts). No overseas bases but deploys globally (Latvia, Iraq). Refuses nuclear weapons. Sometimes positions as 'moral middle power' — peacekeeping tradition, multilateralism advocate. Relations with China frozen since Meng Wanzhou / Two Michaels 2018-21. Strategic dilemma: defense spending chronically below NATO 2% target, being pressed by Trump-era US."},

"554":{economyDesc:"~$250B economy, agriculture disproportionately important — dairy (Fonterra world's largest exporter), meat, wool, wine, kiwifruit. Tourism (pre-Covid 6% GDP). Services ~65%. Reliance on China ~30% exports. Housing extremely expensive (Auckland among world's worst affordability). Vulnerabilities: distance from markets, tourism shock, climate impacts on agriculture.",strategicDesc:"Smaller Pacific counterpart to Australia. Five Eyes intelligence member despite nuclear-free foreign policy. No combat troops stationed overseas normally. Active Pacific Islands Forum leadership. Delicate China balancing — largest trading partner but increasing security concerns. Declined AUKUS. Focus on 'independent foreign policy' brand while still tethered to Western system. Recent uptick in defense spending."},

// ============ EUROPE ============
"380":{economyDesc:"~$2.2T. Third-largest EU economy. Strong manufacturing (fashion, machinery, automotive/Fiat-Stellantis, design, food/wine). Tourism #3 worldwide. Services ~73%. Public debt ~140% GDP (second-highest in EU after Greece). North-South divide: productive industrial north vs poorer Mezzogiorno. Demographic decline severe. Vulnerabilities: debt, low productivity growth, brain drain, political instability.",strategicDesc:"Founding EU member, NATO ally. Meloni government (2022-) right-wing but pro-NATO/Ukraine. Mediterranean migration frontline. Strategic location between North-South Europe/Africa. Hosts major US bases (Aviano, Vicenza, Naples 6th Fleet). Limited force projection but reliable alliance partner. Economic ties with China (sole G7 BRI member until 2023 withdrawal). African diplomacy reorienting toward assertive 'Mattei Plan' for energy/migration."},

"724":{economyDesc:"~$1.6T. Tourism (world #2 by arrivals), services (~75%), manufacturing (auto — Seat, Iberdrola energy). Agricultural exports (olive oil world leader). Banking (Santander, BBVA global). Reliance on tourism shocks. Vulnerabilities: youth unemployment historically extreme, regional fiscal tensions, productivity gap with northern EU, housing.",strategicDesc:"EU member, NATO since 1982. Hosts US bases at Rota + Morón. Gibraltar dispute ongoing. Sovereignty over Ceuta + Melilla in Africa (Moroccan claim). Low defense spending. Latin America cultural ties. Post-Catalan crisis internal fragility. Socialist-led government 2018- relatively stable."},

"528":{economyDesc:"~$1.1T. Trading powerhouse (Rotterdam largest EU port). Services 73%, specialized manufacturing (ASML — semiconductor lithography monopoly!), chemicals (Shell, AkzoNobel), agriculture (tiny land, #2 agri exporter globally via greenhouses). Financial services. Natural gas phaseout. Vulnerabilities: nitrogen crisis (farmer protests 2022-23), housing, climate (sea level).",strategicDesc:"EU founding member, NATO ally. No nuclear weapons but hosts US B61 bombs at Volkel. ASML strategic asset — export controls to China critical to US tech war. Strong on Ukraine support. Hosts ICC, ICJ — international justice capital. Low defense spending historically, now reaching NATO 2% target."},

"56":{economyDesc:"~$620B. Hosts EU institutions (Brussels) — international services huge. Chemicals (Solvay, UCB), pharma, diamonds (Antwerp). Reliance on port of Antwerp, EU institutional workforce. Linguistic-regional Flemish-Walloon tensions embedded in federal structure. Vulnerabilities: political paralysis, high public debt (~105%).",strategicDesc:"EU + NATO founding. Hosts NATO HQ, SHAPE. Nuclear-sharing B61 at Kleine Brogel. Modest defense budget. Fragmented politics limits strategic coherence. Soft-power as 'capital of Europe.'"},

"40":{economyDesc:"~$515B, high-income. Tourism (Alps, Vienna), manufacturing (Red Bull, Swarovski), banking (CEE focus — Raiffeisen, Erste), forestry, hydropower. Reliance on German business cycle + Russian gas (historically high, now diversifying).",strategicDesc:"Neutrality since 1955 (constitutional), rejected NATO. EU member since 1995. Ambiguity with Russia (OMV-Gazprom) straining under Ukraine war. No offensive forces, focus on peacekeeping. Hosts UN offices (Vienna — OPEC too)."},

"756":{economyDesc:"~$900B, highest GDP/capita among large economies. Banking (UBS post-Credit Suisse absorption), pharma (Novartis, Roche), watches, precision machinery, chemicals. Services ~74%. Swiss franc safe-haven. Reliance on EU trade (bilateral agreements, non-member). Vulnerabilities: banking mega-risk post-2023 CS collapse, aging.",strategicDesc:"Armed neutrality since 1815. Referendum-based governance. Not in EU or NATO. Sanctioned Russia 2022 — neutrality debate. Hosts UN Geneva, WTO, ICRC, WHO. Universal male conscription. Nuclear-energy phaseout ongoing."},

"752":{economyDesc:"~$600B. Manufacturing (Volvo, Ericsson, IKEA, H&M), mining (iron ore Kiruna), forestry, tech startups (Spotify, Klarna). Services ~65%. Social-democratic model. Reliance on exports (~50% GDP).",strategicDesc:"NATO member since 2024 (Ukraine war ended 200-year non-alignment). Major defense industry (Saab — Gripen fighter). Hosts UK/US forces increasingly. Nordic cooperation (NORDEFCO) deepens. Strategic location for Baltic/Arctic."},

"578":{economyDesc:"~$485B. Oil/gas (Equinor) ~20% GDP, sovereign wealth fund ~$1.6T (largest in world). Fishing, aluminum, shipping, seafood. Reliance on hydrocarbon prices. Vulnerabilities: energy transition pressure vs petroleum dependence.",strategicDesc:"NATO founding member. Not in EU. Arctic coastline strategic — Svalbard sensitive. Hosts NATO (Joint Warfare Center). F-35 fleet. Strong Norwegian intelligence (hydrocarbon pipeline monitoring post-Nord Stream). Distance but close Russia border."},

"208":{economyDesc:"~$400B. Shipping (Maersk world #1), wind turbines (Vestas), pharma (Novo Nordisk — Ozempic boom), food (pork), beer. Services ~75%. High-tax welfare model. Reliance on EU trade.",strategicDesc:"NATO + EU. Greenland/Faroe autonomy. Very active in Ukraine support. Hosts Thule Air Base (US). Liberal-international tradition. Strict migration policies unusual in EU."},

"246":{economyDesc:"~$300B. Forestry/paper (Stora Enso, UPM), tech (Nokia legacy), gaming (Supercell, Rovio), metals, electronics. Services ~60%. Reliance on EU + Russian trade historically (now diversifying).",strategicDesc:"NATO since 2023. 1300km Russian border. Universal conscription, reservist army ~900K (largest in Nordic). Strong defense industry (Patria). Strategic energy independence priority (nuclear+renewables)."},

"352":{economyDesc:"~$30B. Fishing dominant historically, now tourism + geothermal/hydro energy + aluminum smelting (cheap power) + increasingly data centers/Bitcoin mining. Financial crisis 2008 recovery complete.",strategicDesc:"NATO member, no standing army. Hosts US radar (Keflavik). Strategic GIUK Gap location (Greenland-Iceland-UK submarine chokepoint). Arctic Council member."},

"372":{economyDesc:"~$530B. Pharmaceuticals (many MNCs HQ for tax — Pfizer, AbbVie), tech (Google/Meta EU HQ), finance (IFSC Dublin). Corporate tax ~12.5% controversial. Massive agricultural exports (dairy/beef). Reliance on FDI extreme — Brexit-era boost from UK exits.",strategicDesc:"Militarily neutral (not NATO). EU member. Hosts many US tech firms — critical to US SIGINT collection via subsea cables. No combat forces overseas. Northern Ireland peace ongoing concern."},

"616":{economyDesc:"~$810B, fastest-growing large EU economy. Manufacturing ~25% GDP (white goods, auto parts, batteries). German supply chain integration. Agriculture significant. Coal still 60%+ electricity (slow transition). Defense industry boom.",strategicDesc:"NATO frontline state since 2022. Third-largest NATO army in Europe after Turkey, US. Hosts US troops (V Corps forward HQ). F-35 buyer. Historic Russia fear. Massive arms procurement (Abrams tanks, K2 Korean tanks, HIMARS). Ukraine support hub. EU tensions under PiS easing post-Tusk 2023."},

"203":{economyDesc:"~$330B. Industrial economy (automotive — Škoda/VW, machinery). Strong German supply-chain integration. Services ~60%. Currency: koruna, euro deferred.",strategicDesc:"NATO + EU. Ukraine aid leader per capita. Hosts some NATO air policing. Modest defense spend. Pragmatic Atlanticist-EU orientation post-2023 Fiala government."},

"703":{economyDesc:"~$130B. Automotive-heavy (Volkswagen, Kia, Stellantis, JLR — highest cars-per-capita globally). Steel, electronics. Very export-dependent on Germany.",strategicDesc:"NATO + EU. Fico government (2023-) Russia-friendlier than predecessors, cutting Ukraine aid. Nuclear energy heavy."},

"348":{economyDesc:"~$200B. Automotive (Audi, BMW, Mercedes factories), electronics, pharma (Gedeon Richter). Services ~60%. Reliance on EU funds heavy.",strategicDesc:"NATO + EU but Orbán 'illiberal democracy' friction: blocks EU Ukraine aid, maintains Russia/China ties (Paks-II Russian reactor, BYD plant). Swedish NATO accession long-delayed. Strategic irritant to Western unity."},

"100":{economyDesc:"~$100B. Poorest per-capita EU. IT outsourcing, manufacturing, agriculture (wine, rose oil), tourism Black Sea. Russian-gas exit. Brain drain severe.",strategicDesc:"NATO + EU. Not yet in eurozone/Schengen (blocked 2023 by NL/AT veto; partial Schengen 2024). Hosts small US presence. Veto on N.Macedonia EU accession over identity disputes."},

"642":{economyDesc:"~$350B. IT services (Bucharest major hub), automotive (Dacia/Renault, Ford), oil/gas (OMV Petrom), agriculture (wheat, corn). Reliance on EU funds + diaspora remittances.",strategicDesc:"NATO + EU. Key Black Sea anchor after Ukraine war. Hosts Deveselu Aegis Ashore BMD + Mihail Kogălniceanu US presence. Third-largest NATO defense spending increase. Grain-corridor logistics critical for Ukraine exports."},

"300":{economyDesc:"~$240B. Shipping (world's largest fleet — Greek-owned tankers ~20% global tonnage), tourism (~25% GDP), agriculture. Heavy banking/public-debt trauma 2010-18. Strong recovery post-2019.",strategicDesc:"NATO + EU. Aegean disputes with Turkey permanent. Hosts major US naval presence at Souda Bay (Crete). Cyprus support linked to Greek identity. Energy hub aspirations (East Med Gas, Revithoussa LNG)."},

"620":{economyDesc:"~$290B. Tourism, wine/port, cork, textiles, automotive (Autoeuropa), renewables (leader). Services ~75%. Reliance on EU funds. Tech/startup hub Lisbon boom.",strategicDesc:"NATO founding member. EU. Lajes Field (Azores) US base. Lusophone community (CPLP) ties — Brazil, Angola, Mozambique, East Timor. Quiet but reliable alliance partner."},

"233":{economyDesc:"~$40B. IT/digital leader (Skype origin, e-residency), shale oil, forestry, telecom. Services ~70%.",strategicDesc:"NATO + EU. Russian border nervous. Hosts NATO enhanced Forward Presence battlegroup (UK-led). Cyber defense hub (CCDCOE). Highest defense spending % post-Estonia announcement to go to 3%."},

"428":{economyDesc:"~$44B. Transit (Russian oil/gas traditionally), forestry, IT, banking. 25% Russian-speaking minority tension.",strategicDesc:"NATO + EU. Riga strategic. Hosts NATO Forward Presence battlegroup (Canada-led). Rapid defense buildup."},

"440":{economyDesc:"~$78B. Refining (Orlen Lietuva), biotech, fintech (Revolut banking license), lasers. Services ~70%.",strategicDesc:"NATO + EU. Host to NATO Forward Presence (Germany-led battlegroup soon permanent brigade). Suwałki Gap chokepoint (between Kaliningrad-Belarus). Defense 2.5% GDP rising. Taiwan office opened 2021 defied China."},

"191":{economyDesc:"~$80B. Tourism (Dalmatian coast — 20% GDP), shipbuilding, IT, agriculture (olive oil, wine). Eurozone + Schengen 2023.",strategicDesc:"NATO + EU. Split Naval Base. Modest defense but modernizing (Rafale jets). Balkans stability role."},

"705":{economyDesc:"~$70B. Automotive (Revoz — Renault), pharma (Krka, Lek), tourism, banking. Services ~66%.",strategicDesc:"NATO + EU. Small but professional military. Alpine-Adriatic positioning."},

"70":{economyDesc:"~$25B. Agriculture, tourism (Sarajevo, Mostar), weak industry, remittances from diaspora critical.",strategicDesc:"NATO Partnership for Peace but no membership (RS Serb entity blocks). EU candidate 2022. Dayton-imposed complex federal structure. Russian influence through Republika Srpska."},

"807":{economyDesc:"~$15B. Remittances, basic industry, agriculture. Chinese investments (ICT, road). Poor even by Balkan standards.",strategicDesc:"NATO 2020 after Prespa Agreement resolved Greek name dispute. EU candidate blocked by Bulgarian vetoes (identity/language)."},

"8":{economyDesc:"~$23B. Tourism (Adriatic coast + Alps), energy (hydro), chrome/oil, textiles. Massive diaspora remittances (~12% GDP).",strategicDesc:"NATO 2009, EU candidate. Pro-US strongly. Hosts US-funded airport/port interest. Pro-Kosovo support."},

"499":{economyDesc:"~$7B. Tourism (coast), aluminum (KAP — struggling), Chinese-built highway debt trap.",strategicDesc:"NATO 2017. EU candidate front-runner among Western Balkans. Russian oligarch property ties cleaned up post-2020 election turnover."},

"688":{economyDesc:"~$75B. Agriculture, mining (copper Bor, zinc), IT outsourcing, automotive. Chinese investment heavy (Zijin, HBIS steel mills).",strategicDesc:"Not in NATO (Serbia remains neutral, military neutrality declared 2007 after NATO 1999 bombing). EU candidate but slow. 'Four pillars' policy: EU, US, Russia, China. Kosovo non-recognition core identity. Maintains Russian arms and sympathy."},

"x_kosovo":{economyDesc:"~$10B, poorest in Europe. Remittances ~15% GDP. Agriculture, mining (Trepça), construction.",strategicDesc:"Not UN member (Russia/China veto). US's political protégé. KFOR NATO peacekeepers since 1999. Struggling for further recognition (~120 countries recognize)."},

"498":{economyDesc:"~$16B. Wine, agriculture, textiles, remittances. Very poor. Energy dependence on Russia breaking.",strategicDesc:"Not in NATO. EU candidate since 2022. Transnistria Russian enclave frozen conflict. Sandu pro-EU government. Fearful of spillover from Ukraine war."},

"804":{economyDesc:"~$180B pre-2022 war, severely damaged since. Agriculture (world top-5 grain/sunflower oil exporter), IT services (#1 growth sector), steel, missiles (Motor Sich). Reliance on Western aid (~$200B+ since 2022).",strategicDesc:"Not in NATO/EU, both applications since 2022. Fighting existential war vs Russia with Western support. EU candidate 2022. Massive military expansion — now Europe's largest army in numbers. Strategic pivot point for European security architecture."},

"792":{economyDesc:"~$1.1T. Manufacturing (auto — Togg EV, appliances), textiles, construction, tourism. Lira collapse 2018-23. Unorthodox monetary policy (Erdoğan anti-rate-hike doctrine) caused hyperinflation. Now orthodox return under Simsek.",strategicDesc:"NATO since 1952. Second-largest NATO army. Incirlik nuclear-sharing base (US B61s). Veto power used — blocked/delayed Finland/Sweden NATO. Independent foreign policy: buys Russian S-400 (kicked from F-35 program), ties with Hamas/Iran/Muslim Brotherhood, while Western ally formally. Syrian operations against Kurds (YPG/PKK). Strategic straits controller (Montreux)."},

"112":{economyDesc:"~$75B. Machinery, fertilizers (Belaruskali potash), oil refining, agriculture. Sanctions-compressed. Russian subsidies.",strategicDesc:"Russian client state since 2020 crackdown. Hosts Russian nukes (2023), Wagner remnants. Full Ukraine war complicity — launchpad but not deployed combat troops yet. CSTO member, de facto union state with Russia deepening."},

// ============ EAST ASIA ============
"410":{economyDesc:"~$1.7T. Tech powerhouse — Samsung (chips, phones), SK Hynix (memory), LG, Hyundai/Kia. Chaebols dominate. Services ~56%. Heavy reliance on semiconductor exports (~20% total exports), China as customer but decoupling. Aging faster than Japan — lowest fertility (~0.7). Debt rising.",strategicDesc:"US treaty ally since 1953. Hosts ~28K US troops. Yoon government (2022-) pivoted hard pro-US/Japan, trilateral cooperation intensified. No nuclear weapons but nuclear-latent (reprocessing debated). Facing North Korean nuclear threat daily. Arms industry rising star (K2 tanks, K9 howitzers sold to Poland, Norway, Egypt)."},

"408":{economyDesc:"~$18B estimated. Planned economy, famine-prone. Coal, minerals (rare earths, magnesite), illicit exports (arms, labor). Reliance on China ~90% trade + sanctions evasion.",strategicDesc:"Nuclear power (~30-50 warheads, ICBMs). Maximum-pressure strategy through missile tests, now Russia arms deals (providing artillery, ammunition for Ukraine war in return for tech). Kim dynasty's 'byungjin' line — economy + nukes. Exploits US-China tension for survival. Greatest rogue proliferation threat."},

"158":{economyDesc:"~$790B. Semiconductor dominance — TSMC produces ~60% of world chips, ~90% of advanced nodes. Foxconn. Electronics, machinery. Services ~63%. China trade largest partner despite tensions. Reliance on imported energy.",strategicDesc:"De facto independent but contested. US 'strategic ambiguity' doctrine on defense. Arms sales upgrading (F-16Vs, HIMARS, Harpoons). TSMC as 'silicon shield.' Nuclear weapons renounced but latent capability. Most volatile flashpoint in world (with Korea)."},

"344":{economyDesc:"~$383B. Financial services (HKEX, HSBC regional), shipping, tourism, real estate. Services 92%. Beijing integration via Greater Bay Area. Brain drain since 2020 NSL.",strategicDesc:"'One Country, Two Systems' de facto ended since 2020 National Security Law. Beijing direct control intensifying. Strategic value: Chinese offshore finance gateway but erosion."},

"446":{economyDesc:"~$24B. Casinos (~30% GDP, 7x Vegas). Tourism. Portuguese legacy thin. More Beijing-compliant than HK.",strategicDesc:"SAR of China but less geopolitically volatile than Hong Kong. Greater Bay Area integration."},

"496":{economyDesc:"~$20B. Mining ~90% exports (copper, coal, gold — Oyu Tolgoi mega-mine). Nomadic livestock still significant. Reliance on China ~85% exports. Foreign investors key (Rio Tinto).",strategicDesc:"Landlocked between Russia/China. 'Third Neighbor' policy — close ties US, Japan, Korea, EU to balance. Small professional military. UN peacekeeping contributor disproportionately."},

// ============ SOUTHEAST ASIA ============
"704":{economyDesc:"~$430B, fast-growing. Manufacturing boom (Samsung, Intel, Nike, Apple diversification from China). Textiles, electronics, seafood. Services ~42%. Agricultural exports (rice, coffee #2 global).",strategicDesc:"Communist state but strategic US quasi-ally balancing China (SCS disputes). 'Bamboo diplomacy' — pragmatic flex. Upgraded US relations 2023 'comprehensive strategic partnership' (equal with Russia/China). Growing defense modernization."},

"360":{economyDesc:"~$1.3T. World's largest Muslim economy. Commodities (palm oil #1 global, coal, nickel, tin), manufacturing (Wings Air, Astra). Services ~45%. Demographic dividend. Jokowi infrastructure push (Nusantara new capital).",strategicDesc:"ASEAN chair 2023. Non-aligned tradition. Natuna islands Chinese incursions. Balances US-China. Hosts infrastructure from both. Prabowo (2024-) continues Jokowi foreign policy with more pro-defense tone."},

"608":{economyDesc:"~$435B. Services 60% — BPO/call centers world leader, tourism, OFW remittances ($40B+/year). Agriculture employs 24%. Reliance on remittances + BPO outsourcing.",strategicDesc:"US treaty ally since 1951. Under Marcos Jr. (2022-) pivoted strongly back to US after Duterte's China tilt. New EDCA sites (9 bases) for US rotational access. Front line in SCS — Second Thomas Shoal standoff. QUAD partner aspirant."},

"764":{economyDesc:"~$515B. Manufacturing (auto hub — Japanese plants, electronics), tourism (pre-Covid ~20% GDP), rice/rubber agriculture. Reliance on tourism + export demand. Aging middle-income trap risk.",strategicDesc:"US treaty ally (oldest in Asia, 1950s). But hosts Chinese investment heavily. Coup-prone politics. Strategic location between India/China spheres. No foreign bases."},

"458":{economyDesc:"~$410B. Electronics (semiconductors assembly + test), palm oil, oil/gas (Petronas), tourism. Services 55%. Multi-ethnic economy.",strategicDesc:"Non-aligned. Strategic Malacca Strait location. Chinese BRI investments + US ties. Anwar (2022-) pragmatist. Dispute with China over Spratlys minimal compared to Philippines/Vietnam."},

"702":{economyDesc:"~$500B, highest GDP/capita Asia. Finance, shipping (world's busiest port), petrochemicals, electronics, biomed. 100% services economy effectively. Reliance on global trade.",strategicDesc:"Neutral but closely aligned US — hosts USN logistics, Changi naval base. ASEAN honest broker. Balances US-China meticulously. Tiny but elite professional military with advanced kit."},

"116":{economyDesc:"~$31B. Garments (Nike, Adidas suppliers), rice, rubber, Angkor tourism. Chinese investment dominant.",strategicDesc:"Chinese client state increasingly. Ream Naval Base Chinese-rebuilt 2022 — PLAN access concerns. Hun family dynasty. Loss of US/EU preferential trade."},

"418":{economyDesc:"~$15B. Hydropower exports (Mekong dams to Thailand/Vietnam), mining, tourism. Chinese BRI debt severe (China holds ~50% external debt).",strategicDesc:"Chinese client. BRI showcase (Vientiane-Kunming railway). One-party communist. Minimal military."},

"104":{economyDesc:"~$65B. Gas exports (fell after 2021 coup sanctions), jade ($30B+ gray market), garments, rice. Illicit economy (meth, scam compounds) growing.",strategicDesc:"Military junta post-2021. Civil war ongoing — regime losing ground to opposition (NUG) + ethnic armies (KIA, AA, BPLA, PDF). China backs regime for stability + pipelines. India, ASEAN engaged cautiously. Strategic hub for China (Bay of Bengal access via Kyaukphyu port)."},

"50":{economyDesc:"~$460B. Ready-made garments ~80% exports (H&M, Zara suppliers — 2nd globally after China). Remittances ~7% GDP. Agriculture huge employer. Pharmaceuticals growing. Climate-vulnerable to flooding.",strategicDesc:"India ally traditionally but diversifying (China/Russia ties). Strategic Bay of Bengal position. Rohingya refugees from Myanmar burden. Post-Hasina 2024 political realignment uncertain."},

"524":{economyDesc:"~$41B. Tourism (Everest, Himalayas), remittances ~25% GDP, hydropower exports to India, garments.",strategicDesc:"Between India and China, courted by both. Chinese BRI expansion. India dependency (fuel, trade). 'Equidistance' attempt."},

"64":{economyDesc:"~$2.9B. Hydropower (exports to India ~30% GDP), tourism controlled (high-value-low-volume). Agriculture. Very small economy.",strategicDesc:"India military alliance. Closed Chinese border (disputed). Gross National Happiness — unique metric. No diplomatic relations with US or China."},

"144":{economyDesc:"~$75B. Tea, apparel, tourism, remittances. 2022 default and IMF bailout recent. Reliance on tourism and garment sector.",strategicDesc:"Strategic Indian Ocean location. Hambantota port Chinese lease (99-year, debt-trap case). India-China balancing. IOR-ARC founder."},

"586":{economyDesc:"~$340B. Textiles, agriculture (cotton, wheat), cement, leather. IMF bailouts chronic. Reliance on remittances, textile exports. Chronic balance-of-payments crises.",strategicDesc:"Nuclear power (~170 warheads). China ally (CPEC $60B), US strained since Afghan withdrawal. India rival permanent. Military dominant in politics. Afghanistan Taliban complex (TTP threat from Afghan side)."},

"4":{economyDesc:"~$14B devastated. Agriculture (opium historically dominant, banned by Taliban 2022 causing rural crisis), mining (untapped rare earths $1T+ estimated), aid-dependent. Post-2021 economy collapsed.",strategicDesc:"Taliban regime unrecognized formally but engaged (Russia, China, Iran talking). Strategic crossroads. Not aligned formally but leaning Russia/China/Pakistan. ISIS-K active."},

// ============ CENTRAL ASIA ============
"762":{economyDesc:"~$12B. Aluminum (Talco), cotton, remittances ~30% GDP from Russia. Chinese loans significant.",strategicDesc:"Rahmon dynasty. CSTO + SCO. Russia hosts 201st Military Base. Chinese growing footprint (Pamir outposts). Afghan border tensions (ISKP, Taliban)."},

"417":{economyDesc:"~$12B. Gold (Kumtor mine major), remittances from Russia ~30% GDP, agriculture. Unstable politically.",strategicDesc:"CSTO + SCO + EEU. Closed US Manas base 2014. Revolutionary history but small state."},

"860":{economyDesc:"~$90B. Cotton, gold, gas, tourism (Silk Road cities). Most populous Central Asia. Mirziyoyev reforms post-2016 opening.",strategicDesc:"Neutral but active diplomacy. Not in CSTO. Central Asian unity push. Balances Russia/China/West."},

"398":{economyDesc:"~$260B. Oil/gas (Chevron, ExxonMobil partners — Tengiz/Kashagan), uranium (world #1 producer — 40%+ global), copper, grain. Largest economy Central Asia.",strategicDesc:"Multi-vector diplomacy. CSTO/SCO/EEU but distanced from Russia post-Ukraine (refuses to support invasion). Major uranium supplier to US, EU, China — strategic for nuclear. Chinese BRI hub."},

"795":{economyDesc:"~$56B. Gas exports (China ~80% of exports), cotton. North-Korea-level isolation.",strategicDesc:"Permanent neutrality (UN-recognized 1995). Closed society. Gas pipeline to China (now accelerating TAPI toward India). No alliance."},

"31":{economyDesc:"~$72B. Oil/gas (SOCAR, BP — BTC pipeline) ~90% exports. Post-2020 Karabakh war reconstruction.",strategicDesc:"Turkey 'one nation, two states' alliance. Iran hostility latent. Russia ambivalent. Israel arms supplier (drones decisive in Karabakh). Zangezur corridor push. Gas exports to Europe growing (TANAP/TAP)."},

"51":{economyDesc:"~$24B. IT services growing, diamond processing, brandy, remittances from Russia/US diaspora. 2020 war devastated economy.",strategicDesc:"Traditionally CSTO/Russia ally — but relations ruptured after 2020/2023 Karabakh losses, Russia inaction. Pivoting West (EU partnership, US ties). Turkish-Azerbaijan threat permanent. Diaspora (French/US/Russian) key."},

"268":{economyDesc:"~$28B. Services, tourism, transit, wine. 20% territory Russian-occupied (Abkhazia, S.Ossetia). Diaspora remittances.",strategicDesc:"EU candidate 2023. NATO partnership but accession frozen. 2008 Russian war trauma. Current GD government ambivalent between West and Russia. Strategic Caspian-Black-Sea transit."},

// ============ MIDDLE EAST ============
"376":{economyDesc:"~$525B. Tech 'Startup Nation' — cybersecurity world leader, semiconductors (Intel fabs), biotech, defense industry. Natural gas discoveries (Leviathan, Tamar). Strong shekel. Post-Oct-7 war economic hit notable.",strategicDesc:"US strategic ally, $3.8B annual military aid. Undeclared nuclear power (~80-100 warheads). Qualitative Military Edge doctrine. Iron Dome, F-35. Abraham Accords (UAE, Bahrain, Morocco, Sudan). Current Gaza war, Iran shadow war (now direct April+October 2024 strikes), Lebanon-Hezbollah war. Judicial reform crisis lingering."},

"275":{economyDesc:"~$18B (pre-war). Ruin post-2023. Remittances, aid, agriculture, limited industry. West Bank: PA-administered. Gaza: devastated.",strategicDesc:"Unresolved statehood. Recognized by 146 UN members but not US, major EU states. Two-state solution in crisis. Hamas vs PA split. Post-war Gaza governance open question."},

"422":{economyDesc:"~$22B, economic collapse since 2019 (lira lost 98% value). Services, tourism decimated. Agriculture. Remittances critical.",strategicDesc:"Confessional state paralysis. Hezbollah effectively dominant militarily — fighting Israel 2023-24. Iran client proxy. No president for 2+ years. Cedar Revolution legacy faded."},

"760":{economyDesc:"~$11B, ruined. Pre-war GDP was $60B. Oil production collapsed, agriculture fraction of pre-war. Drug economy (Captagon amphetamine trafficking worth billions).",strategicDesc:"Assad fell Dec 2024 — HTS-led transition unclear. Iranian/Russian influence depends on new government orientation. US small presence north (SDF ally). Turkey in north. Israel striking freely."},

"368":{economyDesc:"~$260B. Oil ~90% revenue, ~50% GDP. 2nd largest OPEC producer. Reconstruction ongoing. Electricity crisis chronic.",strategicDesc:"Balances US + Iran. Iran-backed militias (PMF) embedded in state. US ~2.5K troops remaining (anti-ISIS). Kurdistan Region autonomy. Key OPEC+ player."},

"364":{economyDesc:"~$400B. Oil ~50% exports (sanctions-evading via tanker ghost fleet to China). Gas, petrochemicals, agriculture. Sanctioned heavily. Inflation 40%+.",strategicDesc:"Islamic Republic regional revisionist power. 'Axis of Resistance' — Hezbollah, Hamas, Houthis, Iraqi PMF, Syrian Alawites. Nuclear program advanced (60% enrichment — weapons-grade 90%). IRGC Quds Force projection. Direct war with Israel escalated 2024. China strategic partnership (25-year deal). Not in alliances formally."},

"682":{economyDesc:"~$1.1T. World's largest crude exporter. Aramco largest firm by profit. Vision 2030 diversification — NEOM, tourism (newly open), entertainment.",strategicDesc:"Traditional US ally shifting toward multi-alignment: massive China trade, Russia OPEC+ coordination, Iran rapprochement 2023 (Beijing-brokered). US security guarantees key but relationship volatile. Regional hegemon. Yemen war stalled. Post-Pax-Americana hedging."},

"784":{economyDesc:"~$510B. Oil ~30% GDP (declining share). Dubai diversified — finance, tourism, logistics, free zones. Abu Dhabi: ADNOC, Mubadala SWF, AI (G42).",strategicDesc:"US ally (CENTCOM F-35 buyer). Abraham Accords — Israel normalization 2020. Yemen war exited 2019. Africa projection (Libya, Sudan backing RSF, Horn). Hedging: buys Russian gold, China comprehensive strategic partnership. Houthi attacks on UAE-linked shipping."},

"634":{economyDesc:"~$235B. Gas — world's largest LNG exporter (with Australia, US). North Field mega-expansion. QIA sovereign fund ($450B+). Pearl-trading heritage.",strategicDesc:"Host to largest US base in Middle East (Al Udeid CENTCOM forward HQ). Major non-NATO ally 2022. Mediator: Hamas, Taliban, Iran-US talks. Survived 2017-21 Saudi/UAE blockade. Competes with Saudi for regional influence."},

"414":{economyDesc:"~$165B. Oil ~60% GDP. Highest living standards Gulf (per capita). Political dysfunction (emir-parliament gridlock).",strategicDesc:"US ally (Iraq War 1991 grateful). Major non-NATO ally. Regional neutrality tradition. Houthi attacks avoided. Iran small but threats."},

"48":{economyDesc:"~$44B. Oil declining, finance (Bahrain Bay), aluminum (Alba), tourism (Saudi weekends).",strategicDesc:"US 5th Fleet HQ (Manama). Saudi client. Abraham Accords. Sunni minority rules Shia majority — Iran soft-power concern."},

"512":{economyDesc:"~$105B. Oil 40% GDP. Diversification (Sohar/Duqm logistics, tourism). Vision 2040.",strategicDesc:"Unique Gulf mediator — good with US + Iran simultaneously. British alliance historic. Strategic Hormuz southern shore. Quiet diplomacy tradition."},

"887":{economyDesc:"~$21B crushed by war. Remittances, humanitarian aid. Oil/gas infrastructure damaged. World's worst humanitarian crisis.",strategicDesc:"Houthi-controlled Sanaa + Red Sea coast — Iranian proxy. Saudi-backed government in Aden. UAE-backed STC separatists. US-UK airstrikes on Houthis 2024+. Red Sea shipping attacks globally disruptive."},

"400":{economyDesc:"~$50B. Services (banking, IT), tourism, potash, phosphate, remittances. US/EU aid significant. Syrian refugee burden.",strategicDesc:"US ally, major non-NATO ally status. Israel peace since 1994. Hashemite monarchy close to both sides. Hosts US troops (Muwaffaq Salti). Critical border stabilizer."},

// ============ NORTH AFRICA ============
"818":{economyDesc:"~$395B. Suez Canal revenue ($9B/year — Houthi attacks caused -70% 2024), tourism, remittances, gas (Zohr field), agriculture. Currency crisis 2022-24. IMF bailouts.",strategicDesc:"US ally (second-largest aid recipient). Major non-NATO ally. Gaza war mediator. Gulf backing critical (UAE, Saudi investments). Libya border concerns. GERD dispute with Ethiopia unresolved."},

"788":{economyDesc:"~$46B. Tourism, textiles, phosphates, olive oil, auto parts. IMF negotiations stalled under Saied. Smuggling to Libya significant.",strategicDesc:"Non-aligned. EU close partner (migration, FTA). Saied authoritarian backsliding concerns EU. Libya border fragility."},

"12":{economyDesc:"~$240B. Hydrocarbons 95% exports (world #3 gas exporter to EU, especially post-Russia). Underdiversified. Young population unemployment crisis.",strategicDesc:"Non-aligned but Russia arms buyer traditionally, growing Chinese ties. Western Sahara support for Polisario (anti-Morocco). Sahel insecurity neighbor. Le pouvoir (military-civilian establishment) opaque."},

"504":{economyDesc:"~$143B. Tourism, phosphate (world's largest reserves — OCP), auto (Renault/Stellantis plants), textiles, aerospace, agriculture. Renewable energy leader (Noor solar).",strategicDesc:"US major non-NATO ally. Abraham Accords (Israel) — US recognized Moroccan sovereignty over Western Sahara as part. France/Spain complex but improving. Africa Union re-entry 2017 (after 33 years out). Sahara autonomy plan endorsed by ~105 countries now."},

"434":{economyDesc:"~$42B. Oil ~95% exports (pre-2011 production was 1.8M bpd, now ~1.2M). Fragmented — two parallel NOCs at times. Reconstruction still delayed by civil war.",strategicDesc:"Two governments: Tripoli (GNU, UN-recognized, Turkey-backed) vs Haftar/LNA Benghazi (Russia, UAE, Egypt backed). Wagner/Russian presence in east. Frontline for European migration."},

"729":{economyDesc:"~$26B, civil war devastating. Gold, oil (via S.Sudan pipeline), agriculture (sesame). SAF-RSF war since April 2023 — ~10M displaced.",strategicDesc:"Russia (Wagner→Africa Corps) supports RSF for gold + Red Sea port access sought. UAE backs RSF too. Egypt/Saudi back SAF. Worst ongoing humanitarian crisis."},

"728":{economyDesc:"~$5B. Oil pipeline through Sudan (disrupted). Virtually no industry. Aid-dependent.",strategicDesc:"Aid-dependent state. Uganda, US, Egypt active. Sudan war spillover. Peace fragile."},

"732":{economyDesc:"~$0.9B. Phosphate mining (controlled by Morocco — OCP Phosboucraa). Fishing.",strategicDesc:"Morocco controls ~80% (Berm); Polisario/SADR ~20%. UN MINURSO still nominal. AU member (SADR). Contested sovereignty — Trump/Spain/France pro-Morocco recognition."},

"262":{economyDesc:"~$4B. Port leasing revenue backbone (US ~$63M/year Camp Lemonnier, China ~$20M, others). Logistics hub for Ethiopia landlocked.",strategicDesc:"Crossroads — hosts US (Camp Lemonnier AFRICOM/Horn), French, Japanese, Italian, Chinese bases simultaneously. Only country hosting all major powers. Rents geography."},

"232":{economyDesc:"~$2.3B. Mining (copper, gold), fishing, remittances. Indefinite military service drives mass emigration. Sanctions.",strategicDesc:"Isaias Afwerki dictatorship 30+ years. 'North Korea of Africa.' Tigray war participant (2020-22). Russia naval base proposed at Massawa. China infrastructure."},

"231":{economyDesc:"~$156B. Coffee (birthplace), floriculture, manufacturing (Chinese-backed industrial parks). Agriculture 33% GDP. GERD hydropower transformative.",strategicDesc:"Regional hegemon aspirations. GERD dispute with Egypt/Sudan. Tigray war 2020-22 aftermath. Somaliland port deal 2024 for sea access — Somalia crisis. AU HQ Addis. BRICS+ 2024."},

"706":{economyDesc:"~$8B. Remittances (~30% GDP), livestock, fishing, telecom. Federal government weak; de facto economies by region.",strategicDesc:"Al-Shabaab controls interior. ATMIS (AU peacekeepers). US drone strikes. Kenyan/Ethiopian forces. Somaliland secession unresolved. Red Sea position strategic."},

"x_somaliland":{economyDesc:"~$3B estimated. Livestock exports, remittances, Berbera port (DP World invested).",strategicDesc:"De facto independent since 1991, unrecognized. Ethiopia MoU 2024 for sea access + recognition (in exchange for port lease) ignited Somalia. Taiwan relations (unique among Muslim states). UAE Berbera base."},

// ============ SUB-SAHARAN AFRICA ============
"404":{economyDesc:"~$113B. 'Silicon Savannah' — M-Pesa pioneered mobile money, tech hub. Tourism (Masai Mara, Mombasa), tea, coffee, cut flowers. Chinese debt concerns (SGR railway).",strategicDesc:"US major non-NATO ally. East African hub. Somalia peacekeeping. Haiti police deployment 2024. Regional economic anchor. Kenya-led multinational force in Haiti."},

"834":{economyDesc:"~$79B. Agriculture (cashews, coffee), mining (gold, gemstones including Tanzanite), tourism (Serengeti, Kilimanjaro, Zanzibar). LNG project (Equinor).",strategicDesc:"Non-aligned tradition. Nyerere legacy. Chinese rail (TAZARA). Rwanda/Burundi tensions. Relatively stable politics."},

"800":{economyDesc:"~$46B. Coffee, oil (starting 2025 — TotalEnergies), tourism (gorillas), fishing, agriculture.",strategicDesc:"Museveni dynasty 38+ years. Strong US/UK/EU aid partner despite democracy concerns. Anti-homosexuality law 2023 sanctioned by West. Troops in Somalia/DRC."},

"646":{economyDesc:"~$14B. Tea, coffee, tourism (gorilla), minerals (tungsten, tantalum — partly from DRC). Fast-growing.",strategicDesc:"Kagame 'developmental authoritarian.' M23 backing in DRC (UN/US acknowledge). Peacekeeping exporter (Mozambique, CAR). Tech-forward."},

"108":{economyDesc:"~$3B. Coffee, tea, subsistence agriculture. Poorest globally by some metrics.",strategicDesc:"Quiet neighbor. Tutsi-Hutu tensions managed. EAC member. Minimal global role."},

"180":{economyDesc:"~$66B. Mining (cobalt #1 world — 70% global supply, copper, coltan, diamonds, gold). Mineral-rich but institutional weakness. Agriculture huge employer.",strategicDesc:"M23 rebellion ongoing (Rwanda-backed per UN). UN MONUSCO drawing down. Critical for EV minerals — Chinese dominance of cobalt refining. Eastern conflict intractable."},

"178":{economyDesc:"~$13B. Oil ~50% exports (offshore). Forestry. Chinese debt.",strategicDesc:"Sassou family 40+ years. Quiet Francophone state. Minor regional role."},

"140":{economyDesc:"~$2.6B. Diamonds, gold, timber, uranium (undeveloped). Poorest average income globally.",strategicDesc:"Wagner/Africa Corps heavy presence since 2018 (protecting regime, mining). Chronic coups historically. France expelled 2022. New flag reflects Russian orientation."},

"120":{economyDesc:"~$45B. Oil declining, cocoa, coffee, bananas, timber. Chinese investment. Diverse economy but weak governance.",strategicDesc:"Biya 42+ years (world's oldest non-royal leader). Anglophone crisis (separatist insurgency NW/SW). Boko Haram north. French influence waning."},

"566":{economyDesc:"~$475B. Oil ~80% exports but production in decline. Agriculture employs 35%. Nollywood world's 2nd largest film industry by volume. Afrobeats global cultural force. Tech startups (Lagos hub). Chronic currency crises.",strategicDesc:"Regional hegemon aspirations. ECOWAS leader (though AES secessions weakened). Boko Haram/ISWAP northeast, banditry northwest, IPOB southeast — multiple insurgencies. Africa's most populous country. Naval presence in Gulf of Guinea anti-piracy."},

"288":{economyDesc:"~$73B. Gold (Africa #1 producer 2019+), cocoa, oil (Jubilee field). IMF bailout 2023. Democracy beacon.",strategicDesc:"Pan-African historical significance (Nkrumah). Democratic model. ECOWAS member. Moderate US/UK/China ties balanced."},

"384":{economyDesc:"~$70B. Cocoa #1 world producer, coffee, cashews, oil/gas. Fastest-growing Francophone Africa.",strategicDesc:"ECOWAS leader post-Senegal. French military bases remain (exceptional — others expelled). Pro-Western but hedging."},

"686":{economyDesc:"~$27B. Peanuts, fishing, tourism, remittances. Oil/gas coming online (Grand Tortue Ahmeyim 2024 with Mauritania).",strategicDesc:"Democratic tradition in troubled region. Faye 2024 pro-Pan-African shift — reviewing French base, IMF program, mining contracts. ECOWAS moderate. Pastef revolution."},

"466":{economyDesc:"~$19B. Cotton, gold (Africa #3), livestock. Remittances significant.",strategicDesc:"Junta since 2020. Wagner→Africa Corps replaced French forces. AES with Niger/Burkina Faso — ECOWAS exit 2024. Tuareg insurgency in north. JNIM/ISGS jihadist expansion."},

"854":{economyDesc:"~$19B. Gold (world's #4 Africa), cotton, livestock. Jihadist violence devastating rural areas.",strategicDesc:"Two coups 2022. AES member. Russia partnership. France expelled 2022. Sankara revolutionary legacy revived."},

"562":{economyDesc:"~$15B. Uranium (world #7, France-dependent export), gold, oil. Poorest Sahel state.",strategicDesc:"Junta July 2023. Expelled France (2023) then US (2024) troops. Russia/Wagner present. AES member. Uranium export realignment to Iran/Russia reported."},

"148":{economyDesc:"~$12B. Oil ~40% exports, cotton, livestock. Crushed by conflicts.",strategicDesc:"Déby dynasty. French forces remain (exception in Sahel). US counterterrorism. Sudan war displacement huge burden."},

"204":{economyDesc:"~$19B. Cotton, cashews, ports (Cotonou — landlocked Sahel transit), agriculture.",strategicDesc:"ECOWAS. Sahel terrorism spilling south. Talon authoritarian tilt concerning. Mostly stable."},

"768":{economyDesc:"~$9B. Cotton, coffee, cocoa, phosphates, port of Lomé logistics hub.",strategicDesc:"Gnassingbé dynasty. Moderate. Port as landlocked neighbor artery."},

"270":{economyDesc:"~$2.2B. Tourism, remittances, peanuts. Post-Jammeh democratic recovery.",strategicDesc:"Smallest continental African state. ECOWAS. Barrow government since 2017. Senegalese relations complex."},

"324":{economyDesc:"~$21B. Bauxite #1 world producer (~30% global). Gold, diamonds, Simandou iron ore mega-project advancing (Chinese consortium).",strategicDesc:"Junta since 2021 (Doumbouya). Bauxite strategic for aluminum — China, Russia buyers. Opening up carefully."},

"624":{economyDesc:"~$1.9B. Cashews ~90% exports. Poor, drug transit. Fishing.",strategicDesc:"Narco-state label (West Africa cocaine transit to Europe). Chronic coups. ECOWAS. Small but troubled."},

"132":{economyDesc:"~$2.4B. Tourism, remittances, fishing. Middle-income status. Democratic model.",strategicDesc:"Atlantic archipelago. US $100M Millennium Challenge. Stable."},

"430":{economyDesc:"~$4B. Rubber, iron ore, palm oil. Post-civil-war reconstruction ongoing.",strategicDesc:"US special relationship (founded by freed slaves). UNMIL peacekeepers departed 2018. Weah football-star president 2018-24, Boakai 2024."},

"694":{economyDesc:"~$4.2B. Iron ore, diamonds, cocoa, tourism. Civil war (1991-2002) trauma lingering.",strategicDesc:"ECOWAS. Stable now. Chinese iron ore investment significant."},

"450":{economyDesc:"~$16B. Vanilla #1 world, nickel, cobalt, tourism (unique biodiversity). 80%+ below poverty line.",strategicDesc:"Indian Ocean strategic position. French departments Mayotte neighbor. SADC member. Chinese investment growing."},

"508":{economyDesc:"~$20B. Gas (Rovuma basin TotalEnergies $20B+ project delayed by insurgency), coal, cashews, cotton.",strategicDesc:"FRELIMO rule since 1975. Cabo Delgado jihadist insurgency (Rwandan/SADC troops intervening). Chinese BRI presence. Debt crisis history."},

"894":{economyDesc:"~$29B. Copper ~75% exports (world #7 producer). Cobalt. Chinese debt crisis — first African defaulter 2020, restructuring ongoing.",strategicDesc:"Democratic peaceful transitions. Hichilema 2021-. China-US balancing. Green mineral critical."},

"716":{economyDesc:"~$28B, hyperinflation legacy. Platinum, gold, tobacco. Diaspora remittances. Currency chaos.",strategicDesc:"Zanu-PF dictatorship since 1980. China ally. Western sanctions. Mnangagwa post-Mugabe but similar policies."},

"710":{economyDesc:"~$400B. Mining (platinum world #1, gold, diamonds), manufacturing, finance (JSE Africa's largest), wine, autos. Load-shedding crisis crippling. High unemployment ~33%.",strategicDesc:"BRICS founder (original B). Non-aligned tradition. Critical Russia position — hosted naval exercise 2023. ICC Gaza genocide case vs Israel 2024. Regional anchor. Nuclear weapons abandoned uniquely (1989)."},

"426":{economyDesc:"~$2.5B. Textiles (AGOA to US), water exports to SA, diamonds. Enclaved in SA — dependent.",strategicDesc:"Kingdom surrounded by SA. Water treaty crucial. SADC member."},

"748":{economyDesc:"~$4.8B. Sugar, textiles, tourism. Africa's last absolute monarchy.",strategicDesc:"King Mswati III (40+ years). Protests 2021 crushed. Taiwan recognition (rare in Africa). Quiet."},

"72":{economyDesc:"~$19B. Diamonds (Debswana — De Beers partnership) ~80% exports. Beef, tourism (Okavango), copper. Highest per-capita African (stable).",strategicDesc:"Democratic exception. Stable, US-friendly. SADC. Boston Consulting-quality institutions."},

"516":{economyDesc:"~$13B. Uranium (world #4), diamonds, fishing, tourism. Hydrogen ambitions.",strategicDesc:"Democratic stable. SWAPO since independence. Germany (2021 genocide apology), Chinese ties. Atlantic positioning."},

"266":{economyDesc:"~$20B. Oil ~40% exports, timber, manganese. Small population makes it middle-income.",strategicDesc:"Coup 2023 ended Bongo dynasty (Ali Bongo). French ties complex. Quiet small state."},

"226":{economyDesc:"~$12B. Oil/gas ~90% exports (but production declining). Highly unequal — Obiang family wealth.",strategicDesc:"Obiang 45+ years (world's longest-serving). Spanish legacy but Francophone. US oil ties. Quiet."},

"24":{economyDesc:"~$75B. Oil ~95% exports (#2 African producer). Diamonds, fishing. Dos Santos family wealth scandal.",strategicDesc:"OPEC leaver 2023. Angola Chinese debt. Quiet regionally. Portuguese legacy."},

"454":{economyDesc:"~$13B. Tobacco, tea, sugar, mining starting. Very poor. Aid-dependent.",strategicDesc:"Stable democracy. SADC. Chakwera govt. Quiet."},

"480":{economyDesc:"~$14B. Sugar, textiles, financial services (offshore), tourism.",strategicDesc:"Indian Ocean strategic. Chagos (UK transferring) will return 2025. Diaspora (Indian, Creole). Stable."},

"174":{economyDesc:"~$1.3B. Cloves, ylang-ylang. Very poor volcanic archipelago.",strategicDesc:"Mayotte territorial claim vs France. Quiet. Chinese investment minor."},

"690":{economyDesc:"~$2.1B. Tourism dominant, tuna, offshore finance. Richest sub-Saharan per capita.",strategicDesc:"Indian Ocean strategic. Hosts UAE soft-power investments. India/US naval visits."},

// ============ LATIN AMERICA ============
"32":{economyDesc:"~$630B. Agriculture (soybeans #3 global, beef), lithium (#4 world, 'lithium triangle'), energy (Vaca Muerta shale), manufacturing (auto). Milei dollarization/shock therapy — fiscal surplus 2024, inflation still ~100%.",strategicDesc:"Milei pivoted hard West — Israel/US alignment, rejected BRICS accession 2024, left Mercosur sympathy for bilateral. Nuclear energy (Atucha, Embalse). Falklands claim permanent. Modest military."},

"152":{economyDesc:"~$335B. Copper #1 world (~25% global supply), lithium #2. Salmon, wine, forestry. Services ~60%. Stable macro. Pension system crisis debated.",strategicDesc:"'Switzerland of LatAm.' CPTPP member. Pacific Alliance. US ally with balanced China trade (~35% exports). Boric progressive but moderate. No military adventures."},

"170":{economyDesc:"~$380B. Oil 40%+ exports, coffee, flowers (cut-flower #1 export by air globally), cocaine (world #1 producer). Remittances. Coca eradication/substitution policies."},

"862":{economyDesc:"~$100B (dramatic contraction from $370B peak). Oil (largest reserves world — but production collapsed to ~800K bpd from 3M+ peak). PDVSA degraded. Hyperinflation, dollarization de facto.",strategicDesc:"Maduro regime sanctioned but surviving. Russia/China/Iran allies. Cuba intelligence umbilical. ~7.7M emigrants (worst in LatAm history). Essequibo oil region claim vs Guyana stirred 2023."},

"218":{economyDesc:"~$115B. Oil ~30% exports (OPEC exit 2020), bananas, shrimp, flowers. Dollarized since 2000. Security crisis 2024.",strategicDesc:"Noboa (2023-) 'internal armed conflict' declaration vs cartels — militarized approach. US cooperation (Manta base reopened proposal). Colombia-Ecuador drug dynamics."},

"604":{economyDesc:"~$270B. Copper #2 world, gold, zinc. Natural gas. Agriculture (avocado, grapes). Cuisine global soft power.",strategicDesc:"US ally traditionally. Chronic political crisis (6 presidents in 5 years). Pacific Alliance. APEC member. No major military role."},

"68":{economyDesc:"~$45B. Natural gas exports declining, lithium (world's largest reserves), tin, silver, soy. Evo-era welfare model strained.",strategicDesc:"ALBA member. Russia/China ties. Leftist but pragmatic. Lithium deals with Russia (Uranium One), China, recent Argentina."},

"600":{economyDesc:"~$42B. Agriculture dominant (soy, beef), hydropower (Itaipu world's largest generator by volume). Services 50%.",strategicDesc:"Mercosur. Taiwan diplomatic recognition (LatAm's only — strategic). Quiet."},

"858":{economyDesc:"~$77B. Agriculture (beef, soy, dairy, rice), services, port Logistics (Nueva Palmira). Marijuana first country to legalize 2013.",strategicDesc:"Mercosur (seeking EU-Mercosur deal). Stable democracy best-in-class. No nukes, pacific."},

"188":{economyDesc:"~$69B. Tourism ~8% GDP direct, medical devices (Intel exit 2014 but returned), agriculture (coffee, bananas, pineapples). Renewable electricity 100%.",strategicDesc:"No military since 1948 (unique). US cooperation close. Nicaraguan refugees pouring in. OECD member 2020 — symbolic."},

"591":{economyDesc:"~$77B. Panama Canal (~6% of global maritime trade, ~10% of Panamanian GDP directly, much more indirectly). Financial services. Drought-induced Canal restrictions 2023-24 crisis.",strategicDesc:"US ally historically, canal handover 1999 peaceful. Dollarized. Chinese BRI joining 2017 (now reconsidering). Copper mine Cobre Panamá shut 2023."},

"222":{economyDesc:"~$33B. Remittances ~25% GDP (from US). Maquiladoras, coffee, bitcoin (experiment since 2021).",strategicDesc:"Bukele crackdown world's highest incarceration. US relations complex. China 2018 recognition. Authoritarian populism model."},

"340":{economyDesc:"~$31B. Remittances ~25% GDP, maquiladoras, coffee, bananas. Poorest Central America northern triangle.",strategicDesc:"Castro government 2022-. Taiwan→China switch 2023. US relations strained by deported ex-president conviction."},

"320":{economyDesc:"~$95B. Remittances 18% GDP, sugar, coffee, bananas, textiles. Tourism (Tikal, Antigua).",strategicDesc:"US ally but Arévalo's anti-corruption agenda threatens oligarchy. CICIG legacy. Migrant origin + transit."},

"558":{economyDesc:"~$17B. Coffee, beef, gold, remittances. Poor. Canal scheme revived 2023.",strategicDesc:"Ortega regime. Russia/China ally. Sandinista revolutionary heritage. Migration crisis."},

"84":{economyDesc:"~$3.3B. Tourism dominant, sugar, citrus, oil (small). English-speaking unique.",strategicDesc:"Commonwealth. Guatemalan territorial claim ongoing (ICJ case). Tiny."},

// ============ CARIBBEAN ============
"192":{economyDesc:"~$107B. Tourism, nickel, sugar (collapsed), remittances. US embargo 60+ years. Energy crisis chronic.",strategicDesc:"Communist one-party state. Russia ally historically. Venezuela ally currently providing oil (dwindling). Chinese investment growing. Intelligence services globally influential disproportionately."},

"214":{economyDesc:"~$120B. Tourism (best in Caribbean), mining (Barrick gold), agriculture (coffee, sugar, tobacco), free zones manufacturing.",strategicDesc:"Haiti crisis management border. US ally. Dollarized-ish (peso and dollar both used)."},

"332":{economyDesc:"~$19B collapsed. Aid, remittances, minimal industry. Gangs control most economic activity.",strategicDesc:"Kenyan-led MSS mission 2024 deployment. US political paralysis. Gangs (G9, 400 Mawozo) de facto control."},

"388":{economyDesc:"~$18B. Bauxite, tourism, remittances (25% GDP). Reggae soft power.",strategicDesc:"CARICOM. Commonwealth realm becoming republic 2026 planned. China BRI ties. Crime-plagued."},

"780":{economyDesc:"~$28B. Oil/gas dominant (~50% revenue). Declining production, Venezuela gas deal (Dragon field) 2024.",strategicDesc:"US ally. CARICOM. Venezuela cooperation growing. Crime."},

"44":{economyDesc:"~$14B. Tourism (~50% GDP), offshore finance. Hurricane-prone (Dorian 2019 devastating).",strategicDesc:"Commonwealth. US proximity critical. Small but active in OAS."},

// ============ OCEANIA ============
"598":{economyDesc:"~$30B. Gas (LNG ExxonMobil), gold, copper (OK Tedi, Porgera), coffee. Bougainville mine contested.",strategicDesc:"Australian neighbor. US 2023 security pact upgrade. Chinese courtship. Bougainville independence referendum 2019 (98%) pending formalization."},

"242":{economyDesc:"~$5B. Tourism, sugar. Climate-vulnerable.",strategicDesc:"Pacific Islands Forum leader. Traditionally Australia-aligned. China-US competition. Coup history settled post-2014."},

"90":{economyDesc:"~$1.6B. Logging, fishing, gold. Chinese aid growing.",strategicDesc:"Signed China security pact 2022 — geopolitical shock. Australia-NZ-US RAMSI history. Strategic Pacific crossroads."},

"548":{economyDesc:"~$1B. Tourism, fishing, vanilla, aid. Climate catastrophically exposed.",strategicDesc:"Pacific climate activist voice. Non-aligned. Chinese/Australian aid compete."},

"296":{economyDesc:"~$0.25B. Fishing license fees + remittances + aid. Climate existential.",strategicDesc:"China switched from Taiwan 2019. Lowest-elevation nation — $ 'migration with dignity.'"},

"798":{economyDesc:"~$60M. .tv domain royalties (Twitch), fishing license fees, aid. Tiny.",strategicDesc:"Taiwan diplomatic (rare). Climate loudest voice. Digital backup nation."},

"776":{economyDesc:"~$0.5B. Remittances ~20% GDP, fishing, tourism, agriculture. Hunga Tonga eruption recovery.",strategicDesc:"Commonwealth realm. Chinese BRI debt (~50% external debt Chinese). Pacific Islands Forum."},

"882":{economyDesc:"~$0.9B. Remittances, fishing, tourism.",strategicDesc:"Pacific Islands Forum. PIF 2024 summit hosted. Traditional."},

"540":{economyDesc:"~$9.8B. Nickel (world's 5th largest producer), French subsidies. Currently in crisis (nickel prices).",strategicDesc:"French territory. Independence referenda 2018-21 all No. Kanak riots 2024 reopened question. New Caledonia SLN nickel mines critical for EV."},

"585":{economyDesc:"~$0.26B. Tourism (diving), fishing licenses, US grants.",strategicDesc:"Taiwan diplomatic (1 of 12). US COFA 2024 renewed $7B over 20 years. China coercion efforts."},

"584":{economyDesc:"~$0.27B. US grants, fishing. Nuclear compensation unresolved.",strategicDesc:"US COFA. Taiwan diplomatic. Kwajalein missile test range hosts."},

"583":{economyDesc:"~$0.4B. US grants, fishing.",strategicDesc:"US COFA. Yap stone money famous. Nauru Nauru-agreement."},

"520":{economyDesc:"~$0.15B. Phosphate depleted, Australian offshore processing fees.",strategicDesc:"Switched from Taiwan to China 2024. Tiny. Dependent."}

};

// Merge in
Object.keys(ES).forEach(id=>{
  if(!COUNTRY_DB[id])COUNTRY_DB[id]={};
  const d=COUNTRY_DB[id],e=ES[id];
  if(!d.economyDesc&&e.economyDesc)d.economyDesc=e.economyDesc;
  if(!d.strategicDesc&&e.strategicDesc)d.strategicDesc=e.strategicDesc;
});

// Generic template fallback for ALL remaining countries so every one has something
Object.keys(COUNTRY_DB).forEach(id=>{
  const d=COUNTRY_DB[id];
  if(d.economyDesc&&d.strategicDesc)return;
  const name=d.name||(window.CN_FULL&&window.CN_FULL[id]&&window.CN_FULL[id].n)||'This territory';
  const gdp=d.gdp?'$'+d.gdp+'B GDP':'small economy';
  const pop=d.population?(d.population>1e6?Math.round(d.population/1e6)+'M':'~'+Math.round(d.population/1000)+'K')+' population':'small population';
  if(!d.economyDesc){
    d.economyDesc=name+' operates a '+gdp+' with '+pop+'. Principal sectors include those reflected in the exports list; the economy typically depends on a mix of primary commodities, services, and external flows (remittances, tourism, aid, or foreign investment). Vulnerabilities generally include exposure to global commodity prices, climate shocks, or regional instability.';
  }
  if(!d.strategicDesc){
    d.strategicDesc=name+' maintains its international position through diplomatic engagement, regional organizations, and selective partnerships. Strategic posture is shaped by geography, colonial legacies where applicable, and present-day alignments with major powers. Military capacity is calibrated to perceived threat environment and economic resources.';
  }
});

})();
