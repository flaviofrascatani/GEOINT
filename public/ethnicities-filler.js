// GEOINT v7 — Auto-fill missing ethnicity profiles
// Runs after all data files load. For each ethnic group without a profile,
// generates a contextually relevant description from a template dictionary.
(function(){
if(typeof COUNTRY_DB==='undefined')return;

// ============ TEMPLATE DICTIONARY ============
// Key = lowercased ethnicity name (or partial match); value = description template.
// {country} placeholder replaced with the country name at runtime.
const TPL={
  // Catch-all
  "other":"Includes various smaller ethnic, religious, and immigrant communities not fitting the major categories. Often comprises recent migrants, indigenous minorities, or historical diaspora populations whose share is too small to be tracked individually but who collectively contribute to the country's diversity.",
  // Generic regional labels
  "white":"Population of European descent, often from colonial-era settlement or 20th-century migration. Historically tends to retain disproportionate economic influence in post-colonial settings.",
  "european":"European-descended population, including descendants of colonial-era settlers and later waves of immigration from various European countries.",
  "other european":"Smaller European immigrant communities including labor migrants, refugees, and historical minorities from various European nations.",
  "african":"Population of African descent, often including both indigenous communities and descendants of historical migrations across the continent.",
  "asian":"Asian-descended communities, often originating from labor migration during the colonial era or more recent economic migration. Concentrated typically in urban areas with strong commercial presence.",
  "south asian":"Communities originating from the Indian subcontinent (India, Pakistan, Bangladesh, Sri Lanka, Nepal). Often arrived via colonial-era labor migration; commercially active.",
  "arab":"Arabic-speaking population, often Sunni Muslim majority with confessional minorities. Cultural and religious ties span the broader Arab world.",
  "other arab":"Smaller Arab communities from outside {country}, including refugees and economic migrants from elsewhere in the Arab world.",
  "mixed":"Population of mixed ancestry, reflecting centuries of intermingling between different ethnic, racial, or national groups. Often forms a culturally distinct intermediate category.",
  "mulatto":"Population of mixed African and European ancestry, historically distinct from both groups in colonial racial hierarchies. Significant cultural and demographic presence in former plantation societies.",
  "indigenous":"Native peoples whose ancestors inhabited the territory before colonization or major migrations. Often retain distinct languages, customs, and traditional governance, though typically marginalized economically and politically.",
  "creole":"Population of mixed origin born in the territory, typically blending European, African, and indigenous heritages. Often speaks a creole language and forms a culturally distinct community.",
  // Slavic
  "russian":"Russian-speaking community, often dating from the Soviet or Tsarist era. Orthodox Christian background; questions of citizenship, language rights, and political loyalty are recurring issues.",
  "ukrainian":"Ukrainian-origin community, often the result of Soviet-era migration or more recent displacement. East Slavic language and culture, traditionally Orthodox or Greek Catholic.",
  "belarusian":"Belarusian-origin community sharing East Slavic heritage with Russians and Ukrainians. Often the result of Soviet-era resettlement or labor migration.",
  "polish":"Polish-origin community, Catholic and culturally Central European. Often dating from historical border shifts or post-EU enlargement labor migration.",
  "serb":"Orthodox Christian South Slavs. National identity strongly tied to historical narrative and Orthodox tradition; complex politics across former Yugoslav space.",
  "croat":"Catholic South Slavs, culturally oriented toward Central Europe. Distinct national identity within the broader South Slav family.",
  "bosniak":"Slavic Muslims of the western Balkans, descendants of Ottoman-era converts. Distinct national identity codified after the 1992-95 war.",
  "slovene":"South Slavs with strong Central European cultural orientation due to long Habsburg rule. Catholic majority.",
  "slovak":"West Slavic, Catholic majority. Closely related to but distinct from Czech identity.",
  // Turkic
  "turkish":"Turkic-speaking community, predominantly Sunni Muslim. Often the result of Ottoman-era settlement or more recent labor migration.",
  "turkmen":"Turkic Sunni Muslim group, traditionally pastoralist. Distinctive carpet-weaving and tribal traditions.",
  "uzbek":"Turkic Sunni Muslim group, traditionally settled agriculturalists. Strong urban culture and historical role along Silk Road trade routes.",
  "kazakh":"Turkic Sunni Muslim group with strong nomadic heritage. Steppe culture and historical clan structure.",
  "tatar":"Turkic Muslim minority with deep historical roots. Maintains distinct language and Islamic identity within larger non-Muslim states.",
  // Romance/Germanic
  "german":"German-speaking community, often from historical settlement or post-war migration. Lutheran or Catholic background depending on region of origin.",
  "italian":"Italian-origin community, often from late-19th to mid-20th century labor migration. Catholic; strong family-based commercial networks.",
  "french":"French-speaking community, often from colonial-era ties or recent migration. Cultural and linguistic links to broader Francophone world.",
  "spanish":"Spanish-origin community, often retaining Iberian cultural traditions. Catholic background.",
  "portuguese":"Portuguese-origin community, often from colonial-era ties or post-1970s migration. Catholic; strong diaspora networks.",
  "swiss":"Swiss community, distinguished by Alemannic German, French, or Italian linguistic roots depending on origin canton.",
  // East Asian
  "chinese":"Ethnic Chinese community, often the descendants of trading networks or labor migration over centuries. Frequently commercially prominent; faces both integration and discrimination historically.",
  "indonesian":"Indonesian-origin community, often the legacy of Dutch colonial labor recruitment or modern domestic worker migration.",
  "japanese":"Japanese-origin community, typically from late-19th and early-20th century emigration. Maintained strong cultural cohesion.",
  "korean":"Korean-origin community, often the result of 20th-century labor migration or post-war displacement.",
  "thai":"Thai-origin community, predominantly Theravada Buddhist. Lowland rice-cultivating cultural roots.",
  // South Asian
  "indian":"Indian-origin community, often arriving via British-era indentured labor schemes or post-independence professional migration. Religiously diverse: Hindu majority with Muslim, Sikh, Christian minorities.",
  // Africa
  "fulani":"Pastoralist Muslim group spread across the Sahel and West Africa. Traditionally nomadic cattle-herders; tensions with sedentary farming communities have intensified in recent decades.",
  "mandinka":"West African ethnic group with historical ties to the medieval Mali Empire. Predominantly Muslim; strong griot oral tradition and trading culture.",
  "wolof":"West African ethnic group concentrated in Senegal and Gambia. Predominantly Muslim; Wolof language often functions as regional lingua franca.",
  "kanuri":"Saharan ethnic group of the Lake Chad basin, heirs of the medieval Kanem-Bornu Empire. Predominantly Muslim.",
  "tumbuka":"Bantu ethnic group of northern Malawi and eastern Zambia. Agricultural communities with distinct linguistic identity.",
  "lomwe":"Bantu ethnic group of southern Malawi and northern Mozambique. Matrilineal kinship traditions.",
  "teke":"Bantu ethnic group of the Congo basin, spread across Republic of Congo, DRC, and Gabon. Historical kingdom heritage.",
  "tonga":"Bantu ethnic group in southern Africa (distinct from Polynesian Tongans), concentrated in Zambia and Zimbabwe. Agricultural communities of the Zambezi valley.",
  "voltaique/gur":"Cluster of related Gur-language speakers in the Volta River basin (Burkina Faso, Ghana, Togo, Côte d'Ivoire). Includes the Mossi, Senufo, and others.",
  "southern mandé":"Southern branch of the Mandé language family, concentrated in southern Côte d'Ivoire and Liberia. Distinct from northern Mandé groups like the Mandinka.",
  "sudanic":"Cluster of Central Sudanic-speaking peoples in the Congo basin and surrounding regions. Diverse small ethnic groups with related linguistic roots.",
  "zarma-songhai":"Closely related groups along the Niger River, heirs of the Songhai Empire (15th-16th c.). Predominantly Muslim; major trading culture historically.",
  "watchi":"Ewe-related group in southern Togo and Benin. Vodun religious tradition.",
  // Pacific
  "papuan":"Indigenous peoples of New Guinea and surrounding islands, distinct linguistically and genetically from Austronesian Pacific populations. Extraordinary linguistic diversity — over 800 languages on the island of New Guinea alone.",
  "polynesian":"Austronesian-speaking peoples of the Polynesian triangle (Hawaii, New Zealand, Easter Island and within). Voyaging culture, hierarchical chiefdoms.",
  "melanesian":"Indigenous peoples of Melanesia (New Guinea, Solomons, Vanuatu, Fiji, New Caledonia). Extraordinary linguistic and cultural diversity.",
  "micronesian":"Austronesian-speaking peoples of Micronesia, scattered across small atolls and islands. Maritime cultures with traditional navigation knowledge.",
  "yapese":"Austronesian people of Yap state in Micronesia. Famous for traditional stone money (rai) economy and hierarchical caste system.",
  // Roma
  "roma":"Indo-Aryan diaspora population originating from northern India, present in Europe since medieval times. Faces severe discrimination and marginalization across the continent; populations often undercounted in official statistics.",
  // Religious minorities sometimes listed
  "jewish":"Jewish community, with deep historical roots or as recent immigrants. Religious and cultural identity persisting despite centuries of dispersion.",
  // Specific
  "aimak":"Cluster of semi-nomadic Persian-speaking tribes of western Afghanistan. Sunni Muslim; mixed Tajik, Mongol, and Turkic ancestry.",
  "baloch":"Iranian-speaking Sunni Muslim group of the Baloch homeland spanning Iran, Pakistan, and Afghanistan. Historically pastoralist; long-running grievances about marginalization.",
  "lezgin":"Northeast Caucasian people of southern Dagestan and northern Azerbaijan. Sunni Muslim; distinct language unrelated to Turkic neighbors.",
  "kalanga":"Bantu people of southwestern Zimbabwe and northeastern Botswana. Closely related to Shona but with distinct identity and language.",
  "khmer krom":"Ethnic Khmer indigenous to the Mekong Delta region of southern Vietnam, predating Vietnamese expansion. Theravada Buddhist; long-standing cultural and political grievances.",
  "tay":"Tai-speaking ethnic minority of northern Vietnam. Largest ethnic minority in Vietnam after the Kinh majority; settled rice cultivators.",
  "muong":"Ethnic group of northern Vietnam closely related to the majority Kinh but retaining distinct language and customs. Highland communities.",
  "hmong":"Highland ethnic group of southern China and Southeast Asia. Distinctive textile traditions; many supported anti-communist forces during Cold War conflicts, leading to large diaspora communities.",
  "tamang":"Tibeto-Burman ethnic group of central Nepal, particularly the hills around Kathmandu. Tibetan Buddhist; trekking guide tradition.",
  "tsimihety":"Northern Madagascar ethnic group, semi-nomadic cattle herders. Among the largest Malagasy groups.",
  "newar":"Indigenous people of the Kathmandu Valley in Nepal. Historically dominant commercial and artisan elite; distinct language and complex caste system.",
  "indo-aryan":"Speakers of Indo-Aryan languages descended from Sanskrit, including Hindi, Bengali, Punjabi, Marathi and others. Concentrated in northern and central regions.",
  "dravidian":"Speakers of Dravidian languages predating Indo-Aryan arrival in South Asia. Includes Tamil, Telugu, Kannada, Malayalam; distinct cultural identity from northern groups.",
  "mongoloid/other":"Tibeto-Burman peoples of northeastern regions, distinct from mainland Indic populations. Multiple ethnic identities; some areas have separatist movements.",
  // Caribbean/colonial leftovers
  "indo-fijian":"Descendants of Indian indentured laborers brought by the British to work sugar plantations. Predominantly Hindu with Muslim minority; commercially prominent.",
  "garifuna":"Afro-indigenous people descended from Africans and Caribs deported from St. Vincent in 1797. Distinctive language, music, and culture; UNESCO-recognized Masterpiece of Oral Heritage.",
  "afro-caribbean":"Descendants of enslaved Africans brought to Caribbean plantations. Diverse Creole cultures, religions, and languages developed across different islands.",
  // Numbers
  "non-ivorian":"Migrant populations from neighboring West African countries, particularly Burkina Faso, Mali, and Guinea. Historically essential to plantation labor; question of citizenship rights triggered the Ivoirian civil war.",
  "afro-arab":"Population of mixed African and Arab descent, often marginalized as a distinct caste-like group with limited social mobility despite long settlement.",
  // Additional
  "ovambo":"Bantu majority of northern Namibia, politically dominant through SWAPO since independence. Agricultural communities with strong communal identity.",
  "herero":"Bantu pastoralist people of central Namibia, victims of the 1904-1908 German colonial genocide which killed up to 80% of the population. Distinctive Victorian-style dress preserved as cultural memory.",
  "kavango":"Bantu people of the Kavango River region in northern Namibia and Angola. Riverine fishing and farming communities.",
  "damara":"Indigenous people of Namibia speaking a Khoisan language despite physical Bantu ancestry — a unique linguistic situation. Historically marginalized."
};

// Generic fallback if no template matches
function genericProfile(name,country){
  return `${name} community within ${country}. Distinct ethnic, linguistic, or cultural group contributing to the national diversity. Detailed demographic and historical profile to be added.`;
}

function findTemplate(name){
  const k=name.toLowerCase().trim();
  if(TPL[k])return TPL[k];
  // Partial match: check if any key is contained in the name or vice versa
  for(const key in TPL){
    if(k.includes(key)||key.includes(k))return TPL[key];
  }
  return null;
}

let filled=0;
Object.keys(COUNTRY_DB).forEach(id=>{
  const d=COUNTRY_DB[id];
  if(!d.ethnicities||!d.ethnicities.length)return;
  if(!d.ethProfiles)d.ethProfiles={};
  const country=d.name||'this country';
  d.ethnicities.forEach(e=>{
    if(d.ethProfiles[e.n])return;
    const tpl=findTemplate(e.n);
    d.ethProfiles[e.n]=(tpl||genericProfile(e.n,country)).replace(/\{country\}/g,country);
    filled++;
  });
});
if(typeof console!=='undefined'&&filled>0)console.log('[GEOINT] Auto-filled '+filled+' ethnicity profiles');
})();
