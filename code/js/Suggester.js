/*
LabeledQuery() is a SPEXQuery with modified getSPARQL()-function
*/

function LabeledQuery(){
// redeclare patterns
    this.queryType = "SELECT";
    //this.prefixes = [];
    this.defaultGraphs = [];
    this.namedGraphs = [];
    this.variables = [];
    this.patterns = [];
    this.filters = [];
    this.combiner = "";
    this.orders = [];
    this.limitCount = -1;
    this.offsetCount = 0;
    this._prevSubj = null;
    this._prevProp = null;
    this._storedQuery = "";
}

LabeledQuery.prototype= new SPEXQuery();
LabeledQuery.prototype.constructor=LabeledQuery;


LabeledQuery.prototype.getSPARQL = function (){
	this.le.expandLabels(this);
	return this.serialiseQuery();
}





/*
 ---
// distinct classes in the endpoint (very generic)
SELECT DISTINCT ?class ?class__label WHERE {
	?subject a ?class . 

	OPTIONAL {?class  rdfs:label|dct:title|dc:title|foaf:name|maps:title ?class__label}

} order by ?class

---
select distinct ?predicate where
{
	?subject ?predicate ?object.
	
	OPTIONAL {?predicate  rdfs:label|dct:title|dc:title|foaf:name|maps:title ?predicate__label}
} order by ?predicate
---
TO DOS

reduce the predicates displayed: dcterms:title might be useful, but dcterms:date is probably not 
possibility of a cliquable link (to the description of the vocabulary) for the autocomplete

*/
function Suggester(){
	var timerName='This is the suggester-builder timer';
	console.time(timerName);
	// list of prefixes from the Linked Open Data Vocabularies ( http://lov.okfn.org/dataset/lov/ )
	// prefixes added manually: rdf, rdfs, and owl
	// slight changes done: addition of '#' at the end of the url for the 'tis' prefix
	// prefixes unified with the prefixes defined in SPEXQuery class.

	var prefixes=
	[
	{
	"name": "acco",
	"uri": "http://purl.org/acco/ns#"
	},
	{
	"name": "acl",
	"uri": "http://www.w3.org/ns/auth/acl#"
	},
	{
	"name": "acm",
	"uri": "http://acm.rkbexplorer.com/ontologies/acm#"
	},
	{
	"name": "acrt",
	"uri": "http://privatealpha.com/ontology/certification/1#"
	},
	{
	"name": "ad",
	"uri": "http://schemas.talis.com/2005/address/schema#"
	},
	{
	"name": "adms",
	"uri": "http://www.w3.org/ns/adms#"
	},
	{
	"name": "af",
	"uri": "http://purl.org/ontology/af/"
	},
	{
	"name": "agls",
	"uri": "http://www.agls.gov.au/agls/terms/"
	},
	{
	"name": "agrelon",
	"uri": "http://d-nb.info/standards/elementset/agrelon.owl#"
	},
	{
	"name": "aiiso",
	"uri": "http://purl.org/vocab/aiiso/schema#"
	},
	{
	"name": "akt",
	"uri": "http://www.aktors.org/ontology/portal#"
	},
	{
	"name": "akts",
	"uri": "http://www.aktors.org/ontology/support#"
	},
	{
	"name": "algo",
	"uri": "http://securitytoolbox.appspot.com/securityAlgorithms#"
	},
	{
	"name": "am",
	"uri": "http://open-services.net/ns/asset#"
	},
	{
	"name": "ao",
	"uri": "http://purl.org/ontology/ao/core#"
	},
	{
	"name": "aos",
	"uri": "http://rdf.muninn-project.org/ontologies/appearances#"
	},
	{
	"name": "api",
	"uri": "http://purl.org/linked-data/api/vocab#"
	},
	{
	"name": "arch",
	"uri": "http://purl.org/archival/vocab/arch#"
	},
	{
	"name": "awol",
	"uri": "http://bblfish.net/work/atom-owl/2006-06-06/#"
	},
	{
	"name": "aws",
	"uri": "http://purl.oclc.org/NET/ssnx/meteo/aws#"
	},
	{
	"name": "b2bo",
	"uri": "http://purl.org/b2bo#"
	},
	{
	"name": "basic",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19103/2005/basic#"
	},
	{
	"name": "being",
	"uri": "http://purl.org/ontomedia/ext/common/being#"
	},
	{
	"name": "bevon",
	"uri": "http://rdfs.co/bevon/"
	},
	{
	"name": "bibo",
	"uri": "http://purl.org/ontology/bibo/"
	},
	{
	"name": "bibtex",
	"uri": "http://purl.org/net/nknouf/ns/bibtex#"
	},
	{
	"name": "bio",
	"uri": "http://purl.org/vocab/bio/0.1/"
	},
	{
	"name": "biol",
	"uri": "http://purl.org/NET/biol/ns#"
	},
	{
	"name": "biopax",
	"uri": "http://www.biopax.org/release/biopax-level3.owl#"
	},
	{
	"name": "biotop",
	"uri": "http://purl.org/biotop/biotop.owl#"
	},
	{
	"name": "biro",
	"uri": "http://purl.org/spar/biro/"
	},
	{
	"name": "blt",
	"uri": "http://www.bl.uk/schemas/bibliographic/blterms#"
	},
	{
	"name": "botany",
	"uri": "http://purl.org/NET/biol/botany#"
	},
	{
	"name": "br",
	"uri": "http://vocab.deri.ie/br#"
	},
	{
	"name": "c4n",
	"uri": "http://vocab.deri.ie/c4n#"
	},
	{
	"name": "c4o",
	"uri": "http://purl.org/spar/c4o/"
	},
	{
	"name": "cal",
	"uri": "http://www.w3.org/2002/12/cal/ical#"
	},
	{
	"name": "cc",
	"uri": "http://creativecommons.org/ns#"
	},
	{
	"name": "cco",
	"uri": "http://purl.org/ontology/cco/core#"
	},
	{
	"name": "cdm",
	"uri": "http://purl.org/twc/ontology/cdm.owl#"
	},
	{
	"name": "cdtype",
	"uri": "http://purl.org/cld/cdtype/"
	},
	{
	"name": "ceo",
	"uri": "http://www.ebusiness-unibw.org/ontologies/consumerelectronics/v1#"
	},
	{
	"name": "cert",
	"uri": "http://www.w3.org/ns/auth/cert#"
	},
	{
	"name": "cgov",
	"uri": "http://reference.data.gov.uk/def/central-government/"
	},
	{
	"name": "chord",
	"uri": "http://purl.org/ontology/chord/"
	},
	{
	"name": "cito",
	"uri": "http://purl.org/spar/cito/"
	},
	{
	"name": "citof",
	"uri": "http://www.essepuntato.it/2013/03/cito-functions#"
	},
	{
	"name": "cld",
	"uri": "http://purl.org/cld/terms/"
	},
	{
	"name": "cmo",
	"uri": "http://purl.org/twc/ontologies/cmo.owl#"
	},
	{
	"name": "cnt",
	"uri": "http://www.w3.org/2011/content#"
	},
	{
	"name": "co",
	"uri": "http://purl.org/ontology/co/core#"
	},
	{
	"name": "cogs",
	"uri": "http://vocab.deri.ie/cogs#"
	},
	{
	"name": "cold",
	"uri": "http://purl.org/configurationontology#"
	},
	{
	"name": "coll",
	"uri": "http://purl.org/co/"
	},
	{
	"name": "comm",
	"uri": "http://vocab.resc.info/communication#"
	},
	{
	"name": "con",
	"uri": "http://www.w3.org/2000/10/swap/pim/contact#"
	},
	{
	"name": "conversion",
	"uri": "http://purl.org/twc/vocab/conversion/"
	},
	{
	"name": "coo",
	"uri": "http://purl.org/coo/ns#"
	},
	{
	"name": "coun",
	"uri": "http://www.daml.org/2001/09/countries/iso-3166-ont#"
	},
	{
	"name": "cpa",
	"uri": "http://www.ontologydesignpatterns.org/schemas/cpannotationschema.owl#"
	},
	{
	"name": "crm",
	"uri": "http://www.cidoc-crm.org/cidoc-crm/"
	},
	{
	"name": "cro",
	"uri": "http://rhizomik.net/ontologies/copyrightonto.owl#"
	},
	{
	"name": "crsw",
	"uri": "http://courseware.rkbexplorer.com/ontologies/courseware#"
	},
	{
	"name": "cs",
	"uri": "http://purl.org/vocab/changeset/schema#"
	},
	{
	"name": "csp",
	"uri": "http://vocab.deri.ie/csp#"
	},
	{
	"name": "ct",
	"uri": "http://www.tele.pw.edu.pl/~sims-onto/ConnectivityType.owl#"
	},
	{
	"name": "ctag",
	"uri": "http://commontag.org/ns#"
	},
	{
	"name": "ctorg",
	"uri": "http://purl.org/ctic/infraestructuras/organizacion#"
	},
	{
	"name": "d2rq",
	"uri": "http://www.wiwiss.fu-berlin.de/suhl/bizer/D2RQ/0.1#"
	},
	{
	"name": "dady",
	"uri": "http://purl.org/NET/dady#"
	},
	{
	"name": "daia",
	"uri": "http://purl.org/ontology/daia/"
	},
	{
	"name": "dbp",
	"uri": "http://dbpedia.org/resource/"
	},
	{
	"name": "dbp-ont",
	"uri": "http://dbpedia.org/ontology/"
	},
	{
	"name": "dbp-prop",
	"uri": "http://dbpedia.org/property/"
	},
	{
	"name": "dc",
	"uri": "http://purl.org/dc/elements/1.1/"
	},
	{
	"name": "dcam",
	"uri": "http://purl.org/dc/dcam/"
	},
	{
	"name": "dcat",
	"uri": "http://www.w3.org/ns/dcat#"
	},
	{
	"name": "dcite",
	"uri": "http://purl.org/spar/datacite/"
	},
	{
	"name": "dcndl",
	"uri": "http://ndl.go.jp/dcndl/terms/"
	},
	{
	"name": "dct",
	"uri": "http://purl.org/dc/terms/"
	},
	{
	"name": "dctype",
	"uri": "http://purl.org/dc/dcmitype/"
	},
	{
	"name": "deo",
	"uri": "http://purl.org/spar/deo/"
	},
	{
	"name": "dicom",
	"uri": "http://purl.org/healthcarevocab/v1#"
	},
	{
	"name": "dir",
	"uri": "http://schemas.talis.com/2005/dir/schema#"
	},
	{
	"name": "disco",
	"uri": "http://rdf-vocabulary.ddialliance.org/discovery#"
	},
	{
	"name": "dl",
	"uri": "http://ontology.ip.rm.cnr.it/ontologies/DOLCE-Lite#"
	},
	{
	"name": "doap",
	"uri": "http://usefulinc.com/ns/doap#"
	},
	{
	"name": "doc",
	"uri": "http://www.w3.org/2000/10/swap/pim/doc#"
	},
	{
	"name": "doco",
	"uri": "http://purl.org/spar/doco/"
	},
	{
	"name": "docso",
	"uri": "http://purl.org/ontology/dso#"
	},
	{
	"name": "dogont",
	"uri": "http://elite.polito.it/ontologies/dogont"
	},
	{
	"name": "dq",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19115/2003/dataquality#"
	},
	{
	"name": "dqm",
	"uri": "http://purl.org/dqm-vocabulary/v1/dqm#"
	},
	{
	"name": "dr",
	"uri": "http://purl.org/swan/2.0/discourse-relationships/"
	},
	{
	"name": "drm",
	"uri": "http://vocab.data.gov/def/drm#"
	},
	{
	"name": "ds",
	"uri": "http://purl.org/ctic/dcat#"
	},
	{
	"name": "dsn",
	"uri": "http://purl.org/dsnotify/vocab/eventset/"
	},
	{
	"name": "dso",
	"uri": "http://inference-web.org/2.0/ds.owl#"
	},
	{
	"name": "dtype",
	"uri": "http://www.linkedmodel.org/schema/dtype#"
	},
	{
	"name": "dul",
	"uri": "http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#"
	},
	{
	"name": "dvia",
	"uri": "http://purl.org/ontology/dvia#"
	},
	{
	"name": "earl",
	"uri": "http://www.w3.org/ns/earl#"
	},
	{
	"name": "ebucore",
	"uri": "http://www.ebu.ch/metadata/ontologies/ebucore/ebucore#"
	},
	{
	"name": "edm",
	"uri": "http://www.europeana.eu/schemas/edm/"
	},
	{
	"name": "elec",
	"uri": "http://purl.org/ctic/sector-publico/elecciones#"
	},
	{
	"name": "emotion",
	"uri": "http://ns.inria.fr/emoca#"
	},
	{
	"name": "emp",
	"uri": "http://purl.org/ctic/empleo/oferta#"
	},
	{
	"name": "ends",
	"uri": "http://labs.mondeca.com/vocab/endpointStatus#"
	},
	{
	"name": "ep",
	"uri": "http://eprints.org/ontology/"
	},
	{
	"name": "event",
	"uri": "http://purl.org/NET/c4dm/event.owl#"
	},
	{
	"name": "ex",
	"uri": "http://purl.org/net/ns/ex#"
	},
	{
	"name": "exif",
	"uri": "http://www.w3.org/2003/12/exif/ns#"
	},
	{
	"name": "ext",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19115/2003/extent#"
	},
	{
	"name": "fabio",
	"uri": "http://purl.org/spar/fabio/"
	},
	{
	"name": "fea",
	"uri": "http://vocab.data.gov/def/fea#"
	},
	{
	"name": "foaf",
	"uri": "http://xmlns.com/foaf/0.1/"
	},
	{
	"name": "food",
	"uri": "http://data.lirmm.fr/ontologies/food#"
	},
	{
	"name": "fowl",
	"uri": "http://www.w3.org/TR/2003/PR-owl-guide-20031209/food#"
	},
	{
	"name": "frad",
	"uri": "http://iflastandards.info/ns/fr/frad/"
	},
	{
	"name": "frapo",
	"uri": "http://purl.org/cerif/frapo/"
	},
	{
	"name": "frbr",
	"uri": "http://purl.org/vocab/frbr/core#"
	},
	{
	"name": "frbre",
	"uri": "http://purl.org/vocab/frbr/extended#"
	},
	{
	"name": "fresnel",
	"uri": "http://www.w3.org/2004/09/fresnel#"
	},
	{
	"name": "g50k",
	"uri": "http://data.ordnancesurvey.co.uk/ontology/50kGazetteer/"
	},
	{
	"name": "game",
	"uri": "http://data.totl.net/game/"
	},
	{
	"name": "gastro",
	"uri": "http://www.ebsemantics.net/gastro#"
	},
	{
	"name": "gc",
	"uri": "http://www.oegov.org/core/owl/gc#"
	},
	{
	"name": "gd",
	"uri": "http://reference.data.gov/def/govdata/"
	},
	{
	"name": "gen",
	"uri": "http://purl.org/gen/0.1#"
	},
	{
	"name": "geo",
	"uri": "http://www.opengis.net/ont/geosparql#"
	},
	{
	"name": "geo-1-0",
	"uri": "http://www.opengis.net/ont/geosparql/1.0#"
	},
	{
	"name": "geod",
	"uri": "http://vocab.lenka.no/geo-deling#"
	},
	{
	"name": "geof",
	"uri": "http://www.mindswap.org/2003/owl/geo/geoFeatures20040307.owl#"
	},
	{
	"name": "geop",
	"uri": "http://aims.fao.org/aos/geopolitical.owl#"
	},
	{
	"name": "geos",
	"uri": "http://www.telegraphis.net/ontology/geography/geography#"
	},
	{
	"name": "geosp",
	"uri": "http://rdf.geospecies.org/ont/geospecies#"
	},
	{
	"name": "gf",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19109/2005/feature#"
	},
	{
	"name": "gm",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19107/2003/geometry#"
	},
	{
	"name": "gml",
	"uri": "http://www.opengis.net/ont/gml#"
	},
	{
	"name": "gn",
	"uri": "http://www.geonames.org/ontology#"
	},
	{
	"name": "gndo",
	"uri": "http://d-nb.info/standards/elementset/gnd#"
	},
	{
	"name": "gold",
	"uri": "http://purl.org/linguistics/gold/"
	},
	{
	"name": "gr",
	"uri": "http://purl.org/goodrelations/v1#"
	},
	{
	"name": "grddl",
	"uri": "http://www.w3.org/2003/g/data-view#"
	},
	{
	"name": "gso",
	"uri": "http://www.w3.org/2006/gen/ont#"
	},
	{
	"name": "gts",
	"uri": "http://resource.geosciml.org/ontology/timescale/gts#"
	},
	{
	"name": "h2o",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19150/-2/2012/basic#"
	},
	{
	"name": "hdo",
	"uri": "http://www.samos.gr/ontologies/helpdeskOnto.owl#"
	},
	{
	"name": "hr",
	"uri": "http://iserve.kmi.open.ac.uk/ns/hrests#"
	},
	{
	"name": "http",
	"uri": "http://www.w3.org/2011/http#"
	},
	{
	"name": "idemo",
	"uri": "http://rdf.insee.fr/def/demo#"
	},
	{
	"name": "igeo",
	"uri": "http://rdf.insee.fr/def/geo#"
	},
	{
	"name": "infor",
	"uri": "http://www.ontologydesignpatterns.org/cp/owl/informationrealization.owl#"
	},
	{
	"name": "inno",
	"uri": "http://purl.org/innovation/ns#"
	},
	{
	"name": "interval",
	"uri": "http://reference.data.gov.uk/def/intervals/"
	},
	{
	"name": "iol",
	"uri": "http://www.ontologydesignpatterns.org/ont/dul/IOLite.owl#"
	},
	{
	"name": "irw",
	"uri": "http://www.ontologydesignpatterns.org/ont/web/irw.owl#"
	},
	{
	"name": "is",
	"uri": "http://purl.org/ontology/is/core#"
	},
	{
	"name": "itm",
	"uri": "http://spi-fm.uca.es/spdef/models/genericTools/itm/1.0#"
	},
	{
	"name": "itsmo",
	"uri": "http://ontology.it/itsmo/v1#"
	},
	{
	"name": "kdo",
	"uri": "http://kdo.render-project.eu/kdo#"
	},
	{
	"name": "keys",
	"uri": "http://purl.org/NET/c4dm/keys.owl#"
	},
	{
	"name": "label",
	"uri": "http://purl.org/net/vocab/2004/03/label#"
	},
	{
	"name": "lcy",
	"uri": "http://purl.org/vocab/lifecycle/schema#"
	},
	{
	"name": "ldp",
	"uri": "http://www.w3.org/ns/ldp#"
	},
	{
	"name": "ldr",
	"uri": "http://purl.oclc.org/NET/ldr/ns#"
	},
	{
	"name": "lemon",
	"uri": "http://www.monnet-project.eu/lemon#"
	},
	{
	"name": "lexinfo",
	"uri": "http://www.lexinfo.net/ontology/2.0/lexinfo#"
	},
	{
	"name": "lgdo",
	"uri": "http://linkedgeodata.org/ontology/"
	},
	{
	"name": "li",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19115/2003/lineage#"
	},
	{
	"name": "lib",
	"uri": "http://purl.org/library/"
	},
	{
	"name": "limo",
	"uri": "http://www.purl.org/limo-ontology/limo#"
	},
	{
	"name": "limoo",
	"uri": "http://purl.org/LiMo/0.1/"
	},
	{
	"name": "lingvo",
	"uri": "http://www.lingvoj.org/ontology#"
	},
	{
	"name": "lio",
	"uri": "http://purl.org/net/lio#"
	},
	{
	"name": "lmf",
	"uri": "http://www.lexinfo.net/lmf#"
	},
	{
	"name": "lmm1",
	"uri": "http://www.ontologydesignpatterns.org/ont/lmm/LMM_L1.owl#"
	},
	{
	"name": "lmm2",
	"uri": "http://www.ontologydesignpatterns.org/ont/lmm/LMM_L2.owl#"
	},
	{
	"name": "loc",
	"uri": "http://purl.org/ctic/infraestructuras/localizacion#"
	},
	{
	"name": "locah",
	"uri": "http://data.archiveshub.ac.uk/def/"
	},
	{
	"name": "locn",
	"uri": "http://www.w3.org/ns/locn#"
	},
	{
	"name": "lode",
	"uri": "http://linkedevents.org/ontology/"
	},
	{
	"name": "log",
	"uri": "http://www.w3.org/2000/10/swap/log#"
	},
	{
	"name": "loted",
	"uri": "http://www.loted.eu/ontology#"
	},
	{
	"name": "lsc",
	"uri": "http://linkedscience.org/lsc/ns#"
	},
	{
	"name": "lv",
	"uri": "http://purl.org/lobid/lv#"
	},
	{
	"name": "lvont",
	"uri": "http://lexvo.org/ontology#"
	},
	{
	"name": "ma-ont",
	"uri": "http://www.w3.org/ns/ma-ont#"
	},
	{
	"name": "mads",
	"uri": "http://www.loc.gov/mads/rdf/v1#"
	},
	{
	"name": "maps",
	"uri": "http://www.geographicknowledge.de/vocab/maps#"
	},
	{
	"name": "marl",
	"uri": "http://www.gsi.dit.upm.es/ontologies/marl/ns#"
	},
	{
	"name": "maso",
	"uri": "http://securitytoolbox.appspot.com/MASO#"
	},
	{
	"name": "meb",
	"uri": "http://rdf.myexperiment.org/ontologies/base/"
	},
	{
	"name": "media",
	"uri": "http://purl.org/media#"
	},
	{
	"name": "mil",
	"uri": "http://rdf.muninn-project.org/ontologies/military#"
	},
	{
	"name": "mo",
	"uri": "http://purl.org/ontology/mo/"
	},
	{
	"name": "moac",
	"uri": "http://observedchange.com/moac/ns#"
	},
	{
	"name": "moat",
	"uri": "http://moat-project.org/ns#"
	},
	{
	"name": "mrel",
	"uri": "http://id.loc.gov/vocabulary/relators/"
	},
	{
	"name": "msm",
	"uri": "http://iserve.kmi.open.ac.uk/ns/msm#"
	},
	{
	"name": "msr",
	"uri": "http://www.telegraphis.net/ontology/measurement/measurement#"
	},
	{
	"name": "muo",
	"uri": "http://purl.oclc.org/NET/muo/muo#"
	},
	{
	"name": "music",
	"uri": "http://www.kanzaki.com/ns/music#"
	},
	{
	"name": "muto",
	"uri": "http://purl.org/muto/core#"
	},
	{
	"name": "mvco",
	"uri": "http://purl.oclc.org/NET/mvco.owl#"
	},
	{
	"name": "nao",
	"uri": "http://www.semanticdesktop.org/ontologies/2007/08/15/nao#"
	},
	{
	"name": "ncal",
	"uri": "http://www.semanticdesktop.org/ontologies/2007/04/02/ncal#"
	},
	{
	"name": "nco",
	"uri": "http://www.semanticdesktop.org/ontologies/2007/03/22/nco#"
	},
	{
	"name": "nfo",
	"uri": "http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#"
	},
	{
	"name": "ngeo",
	"uri": "http://geovocab.org/geometry#"
	},
	{
	"name": "nie",
	"uri": "http://www.semanticdesktop.org/ontologies/2007/01/19/nie#"
	},
	{
	"name": "nif",
	"uri": "http://persistence.uni-leipzig.org/nlp2rdf/ontologies/nif-core#"
	},
	{
	"name": "npg",
	"uri": "http://ns.nature.com/terms/"
	},
	{
	"name": "nrl",
	"uri": "http://www.semanticdesktop.org/ontologies/2007/08/15/nrl#"
	},
	{
	"name": "nsl",
	"uri": "http://purl.org/ontology/storyline/"
	},
	{
	"name": "ntag",
	"uri": "http://ns.inria.fr/nicetag/2010/09/09/voc#"
	},
	{
	"name": "oa",
	"uri": "http://www.w3.org/ns/oa#"
	},
	{
	"name": "oad",
	"uri": "http://lod.xdams.org/reload/oad/"
	},
	{
	"name": "oan",
	"uri": "http://data.lirmm.fr/ontologies/oan/"
	},
	{
	"name": "obsm",
	"uri": "http://rdf.geospecies.org/methods/observationMethod#"
	},
	{
	"name": "oc",
	"uri": "http://contextus.net/ontology/ontomedia/core/expression#"
	},
	{
	"name": "ocd",
	"uri": "http://dati.camera.it/ocd/"
	},
	{
	"name": "odapp",
	"uri": "http://vocab.deri.ie/odapp#"
	},
	{
	"name": "odpart",
	"uri": "http://www.ontologydesignpatterns.org/cp/owl/participation.owl#"
	},
	{
	"name": "odrs",
	"uri": "http://schema.theodi.org/odrs#"
	},
	{
	"name": "odv",
	"uri": "http://reference.data.gov.uk/def/organogram/"
	},
	{
	"name": "oecc",
	"uri": "http://www.oegov.org/core/owl/cc#"
	},
	{
	"name": "og",
	"uri": "http://ogp.me/ns#"
	},
	{
	"name": "olca",
	"uri": "http://www.lingvoj.org/olca#"
	},
	{
	"name": "olo",
	"uri": "http://purl.org/ontology/olo/core#"
	},
	{
	"name": "om",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19156/2011/observation#"
	},
	{
	"name": "ont",
	"uri": "http://purl.org/net/ns/ontology-annot#"
	},
	{
	"name": "ontopic",
	"uri": "http://www.ontologydesignpatterns.org/ont/dul/ontopic.owl#"
	},
	{
	"name": "ontosec",
	"uri": "http://www.semanticweb.org/ontologies/2008/11/OntologySecurity.owl#"
	},
	{
	"name": "onyx",
	"uri": "http://www.gsi.dit.upm.es/ontologies/onyx/ns#"
	},
	{
	"name": "oo",
	"uri": "http://purl.org/openorg/"
	},
	{
	"name": "op",
	"uri": "http://environment.data.gov.au/def/op#"
	},
	{
	"name": "opmo",
	"uri": "http://openprovenance.org/model/opmo#"
	},
	{
	"name": "opmv",
	"uri": "http://purl.org/net/opmv/ns#"
	},
	{
	"name": "opmw",
	"uri": "http://www.opmw.org/ontology/"
	},
	{
	"name": "opo",
	"uri": "http://online-presence.net/opo/ns#"
	},
	{
	"name": "opus",
	"uri": "http://lsdis.cs.uga.edu/projects/semdis/opus#"
	},
	{
	"name": "ore",
	"uri": "http://www.openarchives.org/ore/terms/"
	},
	{
	"name": "org",
	"uri": "http://www.w3.org/ns/org#"
	},
	{
	"name": "osadm",
	"uri": "http://data.ordnancesurvey.co.uk/ontology/admingeo/"
	},
	{
	"name": "oslc",
	"uri": "http://open-services.net/ns/core#"
	},
	{
	"name": "oslo",
	"uri": "http://purl.org/oslo/ns/localgov#"
	},
	{
	"name": "osp",
	"uri": "http://data.lirmm.fr/ontologies/osp#"
	},
	{
	"name": "osr",
	"uri": "http://purl.org/ontomedia/core/space#"
	},
	{
	"name": "osspr",
	"uri": "http://data.ordnancesurvey.co.uk/ontology/spatialrelations/"
	},
	{
	"name": "ostop",
	"uri": "http://www.ordnancesurvey.co.uk/ontology/Topography/v0.1/Topography.owl#"
	},
	{
	"name": "ov",
	"uri": "http://open.vocab.org/terms/"
	},
	{
	"name": "owl",
	"uri": "http://www.w3.org/2002/07/owl#"
	},
	{
	"name": "p-plan",
	"uri": "http://purl.org/net/p-plan#"
	},
	{
	"name": "parl",
	"uri": "http://reference.data.gov.uk/def/parliament/"
	},
	{
	"name": "part",
	"uri": "http://purl.org/vocab/participation/schema#"
	},
	{
	"name": "passim",
	"uri": "http://data.lirmm.fr/ontologies/passim#"
	},
	{
	"name": "pattern",
	"uri": "http://www.essepuntato.it/2008/12/pattern#"
	},
	{
	"name": "pav",
	"uri": "http://purl.org/pav/"
	},
	{
	"name": "pay",
	"uri": "http://reference.data.gov.uk/def/payment#"
	},
	{
	"name": "pbo",
	"uri": "http://purl.org/ontology/pbo/core#"
	},
	{
	"name": "pc",
	"uri": "http://purl.org/procurement/public-contracts#"
	},
	{
	"name": "pdo",
	"uri": "http://ontologies.smile.deri.ie/pdo#"
	},
	{
	"name": "person",
	"uri": "http://www.w3.org/ns/person#"
	},
	{
	"name": "pext",
	"uri": "http://www.ontotext.com/proton/protonext#"
	},
	{
	"name": "phen",
	"uri":	"http://www.geographicknowledge.de/vocab/historicmapsphen#"
	},
	{
	"name": "pkm",
	"uri": "http://www.ontotext.com/proton/protonkm#"
	},
	{
	"name": "place",
	"uri": "http://purl.org/ontology/places#"
	},
	{
	"name": "pmlp",
	"uri": "http://inference-web.org/2.0/pml-provenance.owl#"
	},
	{
	"name": "pna",
	"uri": "http://data.press.net/ontology/asset/"
	},
	{
	"name": "pnc",
	"uri": "http://data.press.net/ontology/classification/"
	},
	{
	"name": "pne",
	"uri": "http://data.press.net/ontology/event/"
	},
	{
	"name": "pni",
	"uri": "http://data.press.net/ontology/identifier/"
	},
	{
	"name": "pns",
	"uri": "http://data.press.net/ontology/stuff/"
	},
	{
	"name": "pnt",
	"uri": "http://data.press.net/ontology/tag/"
	},
	{
	"name": "po",
	"uri": "http://purl.org/ontology/po/"
	},
	{
	"name": "poder",
	"uri": "http://dev.poderopedia.com/vocab/"
	},
	{
	"name": "postcode",
	"uri": "http://data.ordnancesurvey.co.uk/ontology/postcode/"
	},
	{
	"name": "poste",
	"uri": "http://data.lirmm.fr/ontologies/poste#"
	},
	{
	"name": "ppo",
	"uri": "http://vocab.deri.ie/ppo#"
	},
	{
	"name": "pr",
	"uri": "http://purl.org/ontology/prv/core#"
	},
	{
	"name": "premis",
	"uri": "http://www.loc.gov/premis/rdf/v1#"
	},
	{
	"name": "prissma",
	"uri": "http://ns.inria.fr/prissma/v1#"
	},
	{
	"name": "pro",
	"uri": "http://purl.org/spar/pro/"
	},
	{
	"name": "prov",
	"uri": "http://www.w3.org/ns/prov#"
	},
	{
	"name": "prv",
	"uri": "http://purl.org/net/provenance/ns#"
	},
	{
	"name": "prvt",
	"uri": "http://purl.org/net/provenance/types#"
	},
	{
	"name": "pso",
	"uri": "http://purl.org/spar/pso/"
	},
	{
	"name": "psys",
	"uri": "http://www.ontotext.com/proton/protonsys#"
	},
	{
	"name": "ptop",
	"uri": "http://www.ontotext.com/proton/protontop#"
	},
	{
	"name": "pwo",
	"uri": "http://purl.org/spar/pwo/"
	},
	{
	"name": "qb",
	"uri": "http://purl.org/linked-data/cube#"
	},
	{
	"name": "qudt",
	"uri": "http://qudt.org/schema/qudt#"
	},
	{
	"name": "quty",
	"uri": "http://www.telegraphis.net/ontology/measurement/quantity#"
	},
	{
	"name": "radion",
	"uri": "http://www.w3.org/ns/radion#"
	},
	{
	"name": "raul",
	"uri": "http://purl.org/NET/raul#"
	},
	{
	"name": "rdafrbr",
	"uri": "http://rdvocab.info/uri/schema/FRBRentitiesRDA/"
	},
	{
	"name": "rdag1",
	"uri": "http://rdvocab.info/Elements/"
	},
	{
	"name": "rdag2",
	"uri": "http://rdvocab.info/ElementsGr2/"
	},
	{
	"name": "rdag3",
	"uri": "http://rdvocab.info/ElementsGr3/"
	},
	{
	"name": "rdarel",
	"uri": "http://rdvocab.info/RDARelationshipsWEMI/"
	},
	{
	"name": "rdarel2",
	"uri": "http://metadataregistry.org/uri/schema/RDARelationshipsGR2/"
	},
	{
	"name": "rdarole",
	"uri": "http://rdvocab.info/roles/"
	},
	{
	"name": "rdf",
	"uri": "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
	},
	{
	"name": "rdfg",
	"uri": "http://www.w3.org/2004/03/trix/rdfg-1/"
	},
	{
	"name": "rdfs",
	"uri": "http://www.w3.org/2000/01/rdf-schema#"
	},
	{
	"name": "rec",
	"uri": "http://purl.org/ontology/rec/core#"
	},
	{
	"name": "reegle",
	"uri": "http://reegle.info/schema#"
	},
	{
	"name": "rel",
	"uri": "http://purl.org/vocab/relationship/"
	},
	{
	"name": "rev",
	"uri": "http://purl.org/stuff/rev#"
	},
	{
	"name": "rov",
	"uri": "http://www.w3.org/ns/regorg#"
	},
	{
	"name": "rr",
	"uri": "http://www.w3.org/ns/r2rml#"
	},
	{
	"name": "rss",
	"uri": "http://purl.org/rss/1.0/"
	},
	{
	"name": "ru",
	"uri": "http://purl.org/imbi/ru-meta.owl#"
	},
	{
	"name": "s4ac",
	"uri": "http://ns.inria.fr/s4ac/v2#"
	},
	{
	"name": "sam",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19156/2011/sampling#"
	},
	{
	"name": "sao",
	"uri": "http://salt.semanticauthoring.org/ontologies/sao#"
	},
	{
	"name": "sbench",
	"uri": "http://swat.cse.lehigh.edu/onto/univ-bench.owl#"
	},
	{
	"name": "schema",
	"uri": "http://schema.org/"
	},
	{
	"name": "scip",
	"uri": "http://lod.taxonconcept.org/ontology/sci_people.owl#"
	},
	{
	"name": "scoro",
	"uri": "http://purl.org/spar/scoro/"
	},
	{
	"name": "scot",
	"uri": "http://rdfs.org/scot/ns#"
	},
	{
	"name": "scovo",
	"uri": "http://purl.org/NET/scovo#"
	},
	{
	"name": "scsv",
	"uri": "http://purl.org/NET/schema-org-csv#"
	},
	{
	"name": "sd",
	"uri": "http://www.w3.org/ns/sparql-service-description#"
	},
	{
	"name": "sdmx",
	"uri": "http://purl.org/linked-data/sdmx#"
	},
	{
	"name": "sdmx-code",
	"uri": "http://purl.org/linked-data/sdmx/2009/code#"
	},
	{
	"name": "sdmx-dimension",
	"uri": "http://purl.org/linked-data/sdmx/2009/dimension#"
	},
	{
	"name": "sdo",
	"uri": "http://salt.semanticauthoring.org/ontologies/sdo#"
	},
	{
	"name": "search",
	"uri": "http://sindice.com/vocab/search#"
	},
	{
	"name": "security",
	"uri": "http://securitytoolbox.appspot.com/securityMain#"
	},
	{
	"name": "sem",
	"uri": "http://semanticweb.cs.vu.nl/2009/11/sem/"
	},
	{
	"name": "semio",
	"uri": "http://www.lingvoj.org/semio#"
	},
	{
	"name": "seq",
	"uri": "http://www.ontologydesignpatterns.org/cp/owl/sequence.owl#"
	},
	{
	"name": "sf",
	"uri": "http://www.opengis.net/ont/sf#"
	},
	{
	"name": "shw",
	"uri": "http://paul.staroch.name/thesis/SmartHomeWeather.owl#"
	},
	{
	"name": "sim",
	"uri": "http://purl.org/ontology/similarity/"
	},
	{
	"name": "sio",
	"uri": "http://semanticscience.org/resource/"
	},
	{
	"name": "sioc",
	"uri": "http://rdfs.org/sioc/ns#"
	},
	{
	"name": "situ",
	"uri": "http://www.ontologydesignpatterns.org/cp/owl/situation.owl#"
	},
	{
	"name": "skos",
	"uri": "http://www.w3.org/2004/02/skos/core#"
	},
	{
	"name": "skosxl",
	"uri": "http://www.w3.org/2008/05/skos-xl#"
	},
	{
	"name": "snarm",
	"uri": "http://rdf.myexperiment.org/ontologies/snarm/"
	},
	{
	"name": "sp",
	"uri": "http://spinrdf.org/sp#"
	},
	{
	"name": "spatial",
	"uri": "http://geovocab.org/spatial#"
	},
	{
	"name": "spcm",
	"uri": "http://spi-fm.uca.es/spdef/models/deployment/spcm/1.0#"
	},
	{
	"name": "spfood",
	"uri": "http://kmi.open.ac.uk/projects/smartproducts/ontologies/food.owl#"
	},
	{
	"name": "spin",
	"uri": "http://spinrdf.org/spin#"
	},
	{
	"name": "sport",
	"uri": "http://purl.org/ontology/sport/"
	},
	{
	"name": "spt",
	"uri": "http://spitfire-project.eu/ontology/ns/"
	},
	{
	"name": "sql",
	"uri": "http://ns.inria.fr/ast/sql#"
	},
	{
	"name": "sro",
	"uri": "http://salt.semanticauthoring.org/ontologies/sro#"
	},
	{
	"name": "ssn",
	"uri": "http://purl.oclc.org/NET/ssnx/ssn#"
	},
	{
	"name": "stac",
	"uri": "http://securitytoolbox.appspot.com/stac#"
	},
	{
	"name": "stories",
	"uri": "http://purl.org/ontology/stories/"
	},
	{
	"name": "swc",
	"uri": "http://data.semanticweb.org/ns/swc/ontology#"
	},
	{
	"name": "swp",
	"uri": "http://www.w3.org/2004/03/trix/swp-1/"
	},
	{
	"name": "swpm",
	"uri": "http://spi-fm.uca.es/spdef/models/deployment/swpm/1.0#"
	},
	{
	"name": "swpo",
	"uri": "http://sw-portal.deri.org/ontologies/swportal#"
	},
	{
	"name": "swrc",
	"uri": "http://swrc.ontoware.org/ontology#"
	},
	{
	"name": "swrl",
	"uri": "http://www.w3.org/2003/11/swrl#"
	},
	{
	"name": "tac",
	"uri": "http://ns.bergnet.org/tac/0.1/triple-access-control#"
	},
	{
	"name": "tag",
	"uri": "http://www.holygoat.co.uk/owl/redwood/0.1/tags/"
	},
	{
	"name": "tao",
	"uri": "http://vocab.deri.ie/tao#"
	},
	{
	"name": "taxon",
	"uri": "http://purl.org/biodiversity/taxon/"
	},
	{
	"name": "tddo",
	"uri": "http://databugger.aksw.org/ns/core#"
	},
	{
	"name": "te",
	"uri": "http://www.w3.org/2006/time-entry#"
	},
	{
	"name": "teach",
	"uri": "http://linkedscience.org/teach/ns#"
	},
	{
	"name": "test",
	"uri": "http://www.w3.org/2006/03/test-description#"
	},
	{
	"name": "theatre",
	"uri": "http://purl.org/theatre#"
	},
	{
	"name": "thors",
	"uri": "http://resource.geosciml.org/ontology/timescale/thors#"
	},
	{
	"name": "ti",
	"uri": "http://www.ontologydesignpatterns.org/cp/owl/timeinterval.owl#"
	},
	{
	"name": "time",
	"uri": "http://www.w3.org/2006/time#"
	},
	{
	"name": "tio",
	"uri": "http://purl.org/tio/ns#"
	},
	{
	"name": "tis",
	"uri": "http://www.ontologydesignpatterns.org/cp/owl/timeindexedsituation.owl#"
	},
	{
	"name": "tisc",
	"uri": "http://observedchange.com/tisc/ns#"
	},
	{
	"name": "tl",
	"uri": "http://purl.org/NET/c4dm/timeline.owl#"
	},
	{
	"name": "tm",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19108/2002/temporal#"
	},
	{
	"name": "tmo",
	"uri": "http://www.w3.org/2001/sw/hcls/ns/transmed/"
	},
	{
	"name": "trait",
	"uri": "http://contextus.net/ontology/ontomedia/ext/common/trait#"
	},
	{
	"name": "transit",
	"uri": "http://vocab.org/transit/terms/"
	},
	{
	"name": "tsioc",
	"uri": "http://rdfs.org/sioc/types#"
	},
	{
	"name": "turismo",
	"uri": "http://idi.fundacionctic.org/cruzar/turismo#"
	},
	{
	"name": "tvc",
	"uri": "http://www.essepuntato.it/2012/04/tvc/"
	},
	{
	"name": "txn",
	"uri": "http://lod.taxonconcept.org/ontology/txn.owl#"
	},
	{
	"name": "tzont",
	"uri": "http://www.w3.org/2006/timezone#"
	},
	{
	"name": "uco",
	"uri": "http://purl.org/uco/ns#"
	},
	{
	"name": "ui",
	"uri": "http://www.w3.org/ns/ui#"
	},
	{
	"name": "umbel",
	"uri": "http://umbel.org/umbel#"
	},
	{
	"name": "uniprot",
	"uri": "http://purl.uniprot.org/core/"
	},
	{
	"name": "user",
	"uri": "http://schemas.talis.com/2005/user/schema#"
	},
	{
	"name": "vaem",
	"uri": "http://www.linkedmodel.org/schema/vaem#"
	},
	{
	"name": "vann",
	"uri": "http://purl.org/vocab/vann/"
	},
	{
	"name": "vcard",
	"uri": "http://www.w3.org/2006/vcard/ns#"
	},
	{
	"name": "vdpp",
	"uri": "http://data.lirmm.fr/ontologies/vdpp#"
	},
	{
	"name": "vin",
	"uri": "http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#"
	},
	{
	"name": "vivo",
	"uri": "http://vivoweb.org/ontology/core#"
	},
	{
	"name": "vmm",
	"uri": "http://spi-fm.uca.es/spdef/models/genericTools/vmm/1.0#"
	},
	{
	"name": "voaf",
	"uri": "http://purl.org/vocommons/voaf#"
	},
	{
	"name": "voag",
	"uri": "http://voag.linkedmodel.org/voag#"
	},
	{
	"name": "void",
	"uri": "http://rdfs.org/ns/void#"
	},
	{
	"name": "vra",
	"uri": "http://simile.mit.edu/2003/10/ontologies/vraCore3#"
	},
	{
	"name": "vrank",
	"uri": "http://purl.org/voc/vrank#"
	},
	{
	"name": "vs",
	"uri": "http://www.w3.org/2003/06/sw-vocab-status/ns#"
	},
	{
	"name": "vso",
	"uri": "http://purl.org/vso/ns#"
	},
	{
	"name": "vvo",
	"uri": "http://purl.org/vvo/ns#"
	},
	{
	"name": "wai",
	"uri": "http://purl.org/wai#"
	},
	{
	"name": "wdrs",
	"uri": "http://www.w3.org/2007/05/powder-s#"
	},
	{
	"name": "wf-invoc",
	"uri": "http://purl.org/net/wf-invocation#"
	},
	{
	"name": "wfm",
	"uri": "http://purl.org/net/wf-motifs#"
	},
	{
	"name": "wgs84",
	"uri": "http://www.w3.org/2003/01/geo/wgs84_pos#"
	},
	{
	"name": "whois",
	"uri": "http://www.kanzaki.com/ns/whois#"
	},
	{
	"name": "wi",
	"uri": "http://purl.org/ontology/wi/core#"
	},
	{
	"name": "wikim",
	"uri": "http://spi-fm.uca.es/spdef/models/genericTools/wikim/1.0#"
	},
	{
	"name": "wl",
	"uri": "http://www.wsmo.org/ns/wsmo-lite#"
	},
	{
	"name": "wlo",
	"uri": "http://purl.org/ontology/wo/"
	},
	{
	"name": "wo",
	"uri": "http://purl.org/ontology/wo/core#"
	},
	{
	"name": "wot",
	"uri": "http://xmlns.com/wot/0.1/"
	},
	{
	"name": "xhv",
	"uri": "http://www.w3.org/1999/xhtml/vocab#"
	},
	{
	"name": "xkos",
	"uri": "http://purl.org/linked-data/xkos#"
	},
	{
	"name": "xsd",
	"uri": "http://www.w3.org/2001/XMLSchema#"
	},
	{
	"name": "zbwext",
	"uri": "http://zbw.eu/namespaces/zbw-extensions/"
	}
	];

//Define Arrays
    var predicateArray = [];
    var classesArray = [];
    //var instancesArray = [];
//Define endpoint
	var endpoint = ""; 
//Define queries
	var queryPredicates= new LabeledQuery();
	queryPredicates.select(["?predicate","?predicate__label"]).distinct().where("?subject" , "?predicate" , "?object").orderby("?predicate");
	queryPredicates.SPEXvariables=["?predicate"];
	
	var queryClasses = new LabeledQuery();
	queryClasses.select(["?aClass","?aClass__label"]).distinct().where("?a" , "rdf:type" , "?aClass").orderby("?aClass"); 
	queryClasses.SPEXvariables=["?aClass"];

/*
Blacklist
excluded prefixes are entered in the table in alphabetical order
vocabularies referring to spatial and temporal constraints are excluded since spatial and temporal constraints will be provided through the map and the time slider
*/
	var excludedPrefixes = [ "geo", "geo-1-0" , "geod", "gsp", "owl","rdf","rdfs", "skos", "ti", "time", "tis", "xsd", "wgs84"];

	/*
	 Function which takes a column out of the json of a query-result, inserts prefixes, and stores the values in an array,
	 after checking that the prefixes are not in the blacklist. If the column asked for doesn't exist in the query-result, nothing is done.
	 Format:
	 queryResultJson must be the result of a sparql query
	 prefixList must be an array of JSON snippets containing "name" (prefix) and "uri" (URI corresponding to prefix)
	 prefixBlacklist must be an array of unwanted prefixes, contained in prefixList
	 columnName must be the variabble name without '?'
	 TODO: Build in the labels
	*/
	function storeColumn(queryResultJson,prefixList,prefixBlacklist,columnName,storageArray){
		var queryVars = queryResultJson.head.vars;
		var sols = queryResultJson.results.bindings;
		if(queryVars.indexOf(columnName) == -1){
			console.log("Column " + columnName + " does not exist in the results!");
		}
		else{
			for( var i = 0; i < sols.length; i++){
				var currentElement = sols[i][columnName].value; //Get the current element
				//console.log("Current value of" + columnName + ": " + currentElement);
				// go through the list of prefixes to check if one of the urls associated with a prefix is substring of the current element
				for (var j = 0; j < prefixList.length; j++ ){
					if (currentElement.indexOf(prefixList[j].uri) != -1){  // if yes
						// check if the corresponding prefix is in the blacklist
						if (prefixBlacklist.indexOf(prefixList[j].name) == -1){  // if it is not in the blacklist
							storageArray.push(currentElement.replace(prefixes[j].uri, prefixes[j].name + ':')); //Add current element to storageArray
						}
						break;
					}
					else if (j == prefixList.length - 1){
						console.log("Following value ("+ currentElement +") cannot be matched with the prefix list!");
						//Add corresponding prefix to prefixList ??
					}
				}
			}
		}
		console.log("storage array of " + columnName + ":\n" + storageArray);
	}	
	
	var sugEx=new QueryExecutor();

    sugEx.callback = function(str) {      // Define a callback function to receive the SPARQL JSON result.
		var jsonObj = eval('(' + str + ')');      // Convert result to JSON
		jsonObj=new LabelGenerator().label(new SPEXResultSet(jsonObj)).allResults;    //Add labels to results
		
		storeColumn(jsonObj,prefixes,excludedPrefixes,"aClass",classesArray); //store in classesArray if results correspond to the query for classes
		storeColumn(jsonObj,prefixes,excludedPrefixes,"predicate",predicateArray); // store in predicateArray if results correspond to the query for predicates

	   	console.log("The number of classes is:  "+classesArray.length);
	    console.log("The number of predicates is:  "+predicateArray.length); 	   
     };


	this.init=function(){
		endpoint=document.getElementById("endpoint").value;
		sugEx.executeQuery(queryClasses, endpoint); 
		sugEx.executeQuery(queryPredicates, endpoint);
	};
	
	this.createDropdownC=function(StringID){
	  var s = '#' + StringID;
	  endpoint=document.getElementById("endpoint").value;
	  $(s).autocomplete({source: classesArray});
    	
    };
	
    this.createDropdownP=function(StringID){
	  var s = '#' + StringID;
	  endpoint=document.getElementById("endpoint").value;
	  $(s).autocomplete({source: predicateArray});
    };

	console.timeEnd(timerName);
}

Suggester.prototype.constructor = Suggester;
