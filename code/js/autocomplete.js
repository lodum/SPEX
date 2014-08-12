/*
 ---
// distinct classes in the endpoint (very generic)
select distinct ?class where
{
	?a a ?class.
}
// alternatively
SELECT DISTINCT ?class ?classLabel WHERE {?subject a ?class . OPTIONAL {?class <http://www.w3.org/2000/01/rdf-schema#label> ?classLabel}}


---
select distinct ?instance where
{
	?instance a ?class.
}
		

select distinct ?predicate where
{
	?subject ?predicate ?object
}

TO DOS

reduce the predicates displayed: dcterms:title might be useful, but dcterms:date is probably not 
possibility of a cliquable link (to the description of the vocabulary) for the autocomplete

		
*/
function suggester(){


     console.time('This is the execution timer'); 

	
	// list of prefixes from the Linked Open Data Vocabularies ( http://lov.okfn.org/dataset/lov/ )
	// prefixes added manually: rdf, rdfs, and owl
	// slight changes done: addition of '#' at the end of the url for the 'tis' prefix

	
	var prefixes=
	[
    {
        "name": "acco",
        "url": "http://purl.org/acco/ns#"
    },
    {
        "name": "acl",
        "url": "http://www.w3.org/ns/auth/acl#"
    },
    {
        "name": "acm",
        "url": "http://acm.rkbexplorer.com/ontologies/acm#"
    },
    {
        "name": "acrt",
        "url": "http://privatealpha.com/ontology/certification/1#"
    },
    {
        "name": "ad",
        "url": "http://schemas.talis.com/2005/address/schema#"
    },
    {
        "name": "adms",
        "url": "http://www.w3.org/ns/adms#"
    },
    {
        "name": "af",
        "url": "http://purl.org/ontology/af/"
    },
    {
        "name": "agls",
        "url": "http://www.agls.gov.au/agls/terms/"
    },
    {
        "name": "agrelon",
        "url": "http://d-nb.info/standards/elementset/agrelon.owl#"
    },
    {
        "name": "aiiso",
        "url": "http://purl.org/vocab/aiiso/schema#"
    },
    {
        "name": "akt",
        "url": "http://www.aktors.org/ontology/portal#"
    },
    {
        "name": "akts",
        "url": "http://www.aktors.org/ontology/support#"
    },
    {
        "name": "algo",
        "url": "http://securitytoolbox.appspot.com/securityAlgorithms#"
    },
    {
        "name": "am",
        "url": "http://open-services.net/ns/asset#"
    },
    {
        "name": "ao",
        "url": "http://purl.org/ontology/ao/core#"
    },
    {
        "name": "aos",
        "url": "http://rdf.muninn-project.org/ontologies/appearances#"
    },
    {
        "name": "api",
        "url": "http://purl.org/linked-data/api/vocab#"
    },
    {
        "name": "arch",
        "url": "http://purl.org/archival/vocab/arch#"
    },
    {
        "name": "awol",
        "url": "http://bblfish.net/work/atom-owl/2006-06-06/#"
    },
    {
        "name": "aws",
        "url": "http://purl.oclc.org/NET/ssnx/meteo/aws#"
    },
    {
        "name": "b2bo",
        "url": "http://purl.org/b2bo#"
    },
    {
        "name": "basic",
        "url": "http://def.seegrid.csiro.au/isotc211/iso19103/2005/basic#"
    },
    {
        "name": "being",
        "url": "http://purl.org/ontomedia/ext/common/being#"
    },
    {
        "name": "bevon",
        "url": "http://rdfs.co/bevon/"
    },
    {
        "name": "bibo",
        "url": "http://purl.org/ontology/bibo/"
    },
    {
        "name": "bibtex",
        "url": "http://purl.org/net/nknouf/ns/bibtex#"
    },
    {
        "name": "bio",
        "url": "http://purl.org/vocab/bio/0.1/"
    },
    {
        "name": "biol",
        "url": "http://purl.org/NET/biol/ns#"
    },
    {
        "name": "biopax",
        "url": "http://www.biopax.org/release/biopax-level3.owl#"
    },
    {
        "name": "biotop",
        "url": "http://purl.org/biotop/biotop.owl#"
    },
    {
        "name": "biro",
        "url": "http://purl.org/spar/biro/"
    },
    {
        "name": "blt",
        "url": "http://www.bl.uk/schemas/bibliographic/blterms#"
    },
    {
        "name": "botany",
        "url": "http://purl.org/NET/biol/botany#"
    },
    {
        "name": "br",
        "url": "http://vocab.deri.ie/br#"
    },
    {
        "name": "c4n",
        "url": "http://vocab.deri.ie/c4n#"
    },
    {
        "name": "c4o",
        "url": "http://purl.org/spar/c4o/"
    },
    {
        "name": "cal",
        "url": "http://www.w3.org/2002/12/cal/ical#"
    },
    {
        "name": "cc",
        "url": "http://creativecommons.org/ns#"
    },
    {
        "name": "cco",
        "url": "http://purl.org/ontology/cco/core#"
    },
    {
        "name": "cdm",
        "url": "http://purl.org/twc/ontology/cdm.owl#"
    },
    {
        "name": "cdtype",
        "url": "http://purl.org/cld/cdtype/"
    },
    {
        "name": "ceo",
        "url": "http://www.ebusiness-unibw.org/ontologies/consumerelectronics/v1#"
    },
    {
        "name": "cert",
        "url": "http://www.w3.org/ns/auth/cert#"
    },
    {
        "name": "cgov",
        "url": "http://reference.data.gov.uk/def/central-government/"
    },
    {
        "name": "chord",
        "url": "http://purl.org/ontology/chord/"
    },
    {
        "name": "cito",
        "url": "http://purl.org/spar/cito/"
    },
    {
        "name": "citof",
        "url": "http://www.essepuntato.it/2013/03/cito-functions#"
    },
    {
        "name": "cld",
        "url": "http://purl.org/cld/terms/"
    },
    {
        "name": "cmo",
        "url": "http://purl.org/twc/ontologies/cmo.owl#"
    },
    {
        "name": "cnt",
        "url": "http://www.w3.org/2011/content#"
    },
    {
        "name": "co",
        "url": "http://purl.org/ontology/co/core#"
    },
    {
        "name": "cogs",
        "url": "http://vocab.deri.ie/cogs#"
    },
    {
        "name": "cold",
        "url": "http://purl.org/configurationontology#"
    },
    {
        "name": "coll",
        "url": "http://purl.org/co/"
    },
    {
        "name": "comm",
        "url": "http://vocab.resc.info/communication#"
    },
    {
        "name": "con",
        "url": "http://www.w3.org/2000/10/swap/pim/contact#"
    },
    {
        "name": "conversion",
        "url": "http://purl.org/twc/vocab/conversion/"
    },
    {
        "name": "coo",
        "url": "http://purl.org/coo/ns#"
    },
    {
        "name": "coun",
        "url": "http://www.daml.org/2001/09/countries/iso-3166-ont#"
    },
    {
        "name": "cpa",
        "url": "http://www.ontologydesignpatterns.org/schemas/cpannotationschema.owl#"
    },
    {
        "name": "crm",
        "url": "http://www.cidoc-crm.org/cidoc-crm/"
    },
    {
        "name": "cro",
        "url": "http://rhizomik.net/ontologies/copyrightonto.owl#"
    },
    {
        "name": "crsw",
        "url": "http://courseware.rkbexplorer.com/ontologies/courseware#"
    },
    {
        "name": "cs",
        "url": "http://purl.org/vocab/changeset/schema#"
    },
    {
        "name": "csp",
        "url": "http://vocab.deri.ie/csp#"
    },
    {
        "name": "ct",
        "url": "http://www.tele.pw.edu.pl/~sims-onto/ConnectivityType.owl#"
    },
    {
        "name": "ctag",
        "url": "http://commontag.org/ns#"
    },
    {
        "name": "ctorg",
        "url": "http://purl.org/ctic/infraestructuras/organizacion#"
    },
    {
        "name": "d2rq",
        "url": "http://www.wiwiss.fu-berlin.de/suhl/bizer/D2RQ/0.1#"
    },
    {
        "name": "dady",
        "url": "http://purl.org/NET/dady#"
    },
    {
        "name": "daia",
        "url": "http://purl.org/ontology/daia/"
    },
    {
        "name": "dcam",
        "url": "http://purl.org/dc/dcam/"
    },
    {
        "name": "dcat",
        "url": "http://www.w3.org/ns/dcat#"
    },
    {
        "name": "dce",
        "url": "http://purl.org/dc/elements/1.1/"
    },
    {
        "name": "dcite",
        "url": "http://purl.org/spar/datacite/"
    },
    {
        "name": "dcndl",
        "url": "http://ndl.go.jp/dcndl/terms/"
    },
    {
        "name": "dcterms",
        "url": "http://purl.org/dc/terms/"
    },
    {
        "name": "dctype",
        "url": "http://purl.org/dc/dcmitype/"
    },
    {
        "name": "deo",
        "url": "http://purl.org/spar/deo/"
    },
    {
        "name": "dicom",
        "url": "http://purl.org/healthcarevocab/v1#"
    },
    {
        "name": "dir",
        "url": "http://schemas.talis.com/2005/dir/schema#"
    },
    {
        "name": "disco",
        "url": "http://rdf-vocabulary.ddialliance.org/discovery#"
    },
    {
        "name": "dl",
        "url": "http://ontology.ip.rm.cnr.it/ontologies/DOLCE-Lite#"
    },
    {
        "name": "doap",
        "url": "http://usefulinc.com/ns/doap#"
    },
    {
        "name": "doc",
        "url": "http://www.w3.org/2000/10/swap/pim/doc#"
    },
    {
        "name": "doco",
        "url": "http://purl.org/spar/doco/"
    },
    {
        "name": "docso",
        "url": "http://purl.org/ontology/dso#"
    },
    {
        "name": "dogont",
        "url": "http://elite.polito.it/ontologies/dogont"
    },
    {
        "name": "dq",
        "url": "http://def.seegrid.csiro.au/isotc211/iso19115/2003/dataquality#"
    },
    {
        "name": "dqm",
        "url": "http://purl.org/dqm-vocabulary/v1/dqm#"
    },
    {
        "name": "dr",
        "url": "http://purl.org/swan/2.0/discourse-relationships/"
    },
    {
        "name": "drm",
        "url": "http://vocab.data.gov/def/drm#"
    },
    {
        "name": "ds",
        "url": "http://purl.org/ctic/dcat#"
    },
    {
        "name": "dsn",
        "url": "http://purl.org/dsnotify/vocab/eventset/"
    },
    {
        "name": "dso",
        "url": "http://inference-web.org/2.0/ds.owl#"
    },
    {
        "name": "dtype",
        "url": "http://www.linkedmodel.org/schema/dtype#"
    },
    {
        "name": "dul",
        "url": "http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#"
    },
    {
        "name": "dvia",
        "url": "http://purl.org/ontology/dvia#"
    },
    {
        "name": "earl",
        "url": "http://www.w3.org/ns/earl#"
    },
    {
        "name": "ebucore",
        "url": "http://www.ebu.ch/metadata/ontologies/ebucore/ebucore#"
    },
    {
        "name": "edm",
        "url": "http://www.europeana.eu/schemas/edm/"
    },
    {
        "name": "elec",
        "url": "http://purl.org/ctic/sector-publico/elecciones#"
    },
    {
        "name": "emotion",
        "url": "http://ns.inria.fr/emoca#"
    },
    {
        "name": "emp",
        "url": "http://purl.org/ctic/empleo/oferta#"
    },
    {
        "name": "ends",
        "url": "http://labs.mondeca.com/vocab/endpointStatus#"
    },
    {
        "name": "ep",
        "url": "http://eprints.org/ontology/"
    },
    {
        "name": "event",
        "url": "http://purl.org/NET/c4dm/event.owl#"
    },
    {
        "name": "ex",
        "url": "http://purl.org/net/ns/ex#"
    },
    {
        "name": "exif",
        "url": "http://www.w3.org/2003/12/exif/ns#"
    },
    {
        "name": "ext",
        "url": "http://def.seegrid.csiro.au/isotc211/iso19115/2003/extent#"
    },
    {
        "name": "fabio",
        "url": "http://purl.org/spar/fabio/"
    },
    {
        "name": "fea",
        "url": "http://vocab.data.gov/def/fea#"
    },
    {
        "name": "foaf",
        "url": "http://xmlns.com/foaf/0.1/"
    },
    {
        "name": "food",
        "url": "http://data.lirmm.fr/ontologies/food#"
    },
    {
        "name": "fowl",
        "url": "http://www.w3.org/TR/2003/PR-owl-guide-20031209/food#"
    },
    {
        "name": "frad",
        "url": "http://iflastandards.info/ns/fr/frad/"
    },
    {
        "name": "frapo",
        "url": "http://purl.org/cerif/frapo/"
    },
    {
        "name": "frbr",
        "url": "http://purl.org/vocab/frbr/core#"
    },
    {
        "name": "frbre",
        "url": "http://purl.org/vocab/frbr/extended#"
    },
    {
        "name": "fresnel",
        "url": "http://www.w3.org/2004/09/fresnel#"
    },
    {
        "name": "g50k",
        "url": "http://data.ordnancesurvey.co.uk/ontology/50kGazetteer/"
    },
    {
        "name": "game",
        "url": "http://data.totl.net/game/"
    },
    {
        "name": "gastro",
        "url": "http://www.ebsemantics.net/gastro#"
    },
    {
        "name": "gc",
        "url": "http://www.oegov.org/core/owl/gc#"
    },
    {
        "name": "gd",
        "url": "http://reference.data.gov/def/govdata/"
    },
    {
        "name": "gen",
        "url": "http://purl.org/gen/0.1#"
    },
    {
        "name": "geo",
        "url": "http://www.w3.org/2003/01/geo/wgs84_pos#"
    },
    {
        "name": "geod",
        "url": "http://vocab.lenka.no/geo-deling#"
    },
    {
        "name": "geof",
        "url": "http://www.mindswap.org/2003/owl/geo/geoFeatures20040307.owl#"
    },
    {
        "name": "geop",
        "url": "http://aims.fao.org/aos/geopolitical.owl#"
    },
    {
        "name": "geos",
        "url": "http://www.telegraphis.net/ontology/geography/geography#"
    },
    {
        "name": "geosp",
        "url": "http://rdf.geospecies.org/ont/geospecies#"
    },
    {
        "name": "gf",
        "url": "http://def.seegrid.csiro.au/isotc211/iso19109/2005/feature#"
    },
    {
        "name": "gm",
        "url": "http://def.seegrid.csiro.au/isotc211/iso19107/2003/geometry#"
    },
    {
        "name": "gml",
        "url": "http://www.opengis.net/ont/gml#"
    },
    {
        "name": "gn",
        "url": "http://www.geonames.org/ontology#"
    },
    {
        "name": "gndo",
        "url": "http://d-nb.info/standards/elementset/gnd#"
    },
    {
        "name": "gold",
        "url": "http://purl.org/linguistics/gold/"
    },
    {
        "name": "gr",
        "url": "http://purl.org/goodrelations/v1#"
    },
    {
        "name": "grddl",
        "url": "http://www.w3.org/2003/g/data-view#"
    },
    {
        "name": "gso",
        "url": "http://www.w3.org/2006/gen/ont#"
    },
    {
        "name": "gsp",
        "url": "http://www.opengis.net/ont/geosparql#"
    },
    {
        "name": "gts",
        "url": "http://resource.geosciml.org/ontology/timescale/gts#"
    },
    {
        "name": "h2o",
        "url": "http://def.seegrid.csiro.au/isotc211/iso19150/-2/2012/basic#"
    },
    {
        "name": "hdo",
        "url": "http://www.samos.gr/ontologies/helpdeskOnto.owl#"
    },
    {
        "name": "hr",
        "url": "http://iserve.kmi.open.ac.uk/ns/hrests#"
    },
    {
        "name": "http",
        "url": "http://www.w3.org/2011/http#"
    },
    {
        "name": "idemo",
        "url": "http://rdf.insee.fr/def/demo#"
    },
    {
        "name": "igeo",
        "url": "http://rdf.insee.fr/def/geo#"
    },
    {
        "name": "infor",
        "url": "http://www.ontologydesignpatterns.org/cp/owl/informationrealization.owl#"
    },
    {
        "name": "inno",
        "url": "http://purl.org/innovation/ns#"
    },
    {
        "name": "interval",
        "url": "http://reference.data.gov.uk/def/intervals/"
    },
    {
        "name": "iol",
        "url": "http://www.ontologydesignpatterns.org/ont/dul/IOLite.owl#"
    },
    {
        "name": "irw",
        "url": "http://www.ontologydesignpatterns.org/ont/web/irw.owl#"
    },
    {
        "name": "is",
        "url": "http://purl.org/ontology/is/core#"
    },
    {
        "name": "itm",
        "url": "http://spi-fm.uca.es/spdef/models/genericTools/itm/1.0#"
    },
    {
        "name": "itsmo",
        "url": "http://ontology.it/itsmo/v1#"
    },
    {
        "name": "kdo",
        "url": "http://kdo.render-project.eu/kdo#"
    },
    {
        "name": "keys",
        "url": "http://purl.org/NET/c4dm/keys.owl#"
    },
    {
        "name": "label",
        "url": "http://purl.org/net/vocab/2004/03/label#"
    },
    {
        "name": "lcy",
        "url": "http://purl.org/vocab/lifecycle/schema#"
    },
    {
        "name": "ldp",
        "url": "http://www.w3.org/ns/ldp#"
    },
    {
        "name": "ldr",
        "url": "http://purl.oclc.org/NET/ldr/ns#"
    },
    {
        "name": "lemon",
        "url": "http://www.monnet-project.eu/lemon#"
    },
    {
        "name": "lexinfo",
        "url": "http://www.lexinfo.net/ontology/2.0/lexinfo#"
    },
    {
        "name": "lgdo",
        "url": "http://linkedgeodata.org/ontology/"
    },
    {
        "name": "li",
        "url": "http://def.seegrid.csiro.au/isotc211/iso19115/2003/lineage#"
    },
    {
        "name": "lib",
        "url": "http://purl.org/library/"
    },
    {
        "name": "limo",
        "url": "http://www.purl.org/limo-ontology/limo#"
    },
    {
        "name": "limoo",
        "url": "http://purl.org/LiMo/0.1/"
    },
    {
        "name": "lingvo",
        "url": "http://www.lingvoj.org/ontology#"
    },
    {
        "name": "lio",
        "url": "http://purl.org/net/lio#"
    },
    {
        "name": "lmf",
        "url": "http://www.lexinfo.net/lmf#"
    },
    {
        "name": "lmm1",
        "url": "http://www.ontologydesignpatterns.org/ont/lmm/LMM_L1.owl#"
    },
    {
        "name": "lmm2",
        "url": "http://www.ontologydesignpatterns.org/ont/lmm/LMM_L2.owl#"
    },
    {
        "name": "loc",
        "url": "http://purl.org/ctic/infraestructuras/localizacion#"
    },
    {
        "name": "locah",
        "url": "http://data.archiveshub.ac.uk/def/"
    },
    {
        "name": "locn",
        "url": "http://www.w3.org/ns/locn#"
    },
    {
        "name": "lode",
        "url": "http://linkedevents.org/ontology/"
    },
    {
        "name": "log",
        "url": "http://www.w3.org/2000/10/swap/log#"
    },
    {
        "name": "loted",
        "url": "http://www.loted.eu/ontology#"
    },
    {
        "name": "lsc",
        "url": "http://linkedscience.org/lsc/ns#"
    },
    {
        "name": "lv",
        "url": "http://purl.org/lobid/lv#"
    },
    {
        "name": "lvont",
        "url": "http://lexvo.org/ontology#"
    },
    {
        "name": "ma-ont",
        "url": "http://www.w3.org/ns/ma-ont#"
    },
    {
        "name": "mads",
        "url": "http://www.loc.gov/mads/rdf/v1#"
    },
    {
        "name": "marl",
        "url": "http://www.gsi.dit.upm.es/ontologies/marl/ns#"
    },
    {
        "name": "maso",
        "url": "http://securitytoolbox.appspot.com/MASO#"
    },
    {
        "name": "meb",
        "url": "http://rdf.myexperiment.org/ontologies/base/"
    },
    {
        "name": "media",
        "url": "http://purl.org/media#"
    },
    {
        "name": "mil",
        "url": "http://rdf.muninn-project.org/ontologies/military#"
    },
    {
        "name": "mo",
        "url": "http://purl.org/ontology/mo/"
    },
    {
        "name": "moac",
        "url": "http://observedchange.com/moac/ns#"
    },
    {
        "name": "moat",
        "url": "http://moat-project.org/ns#"
    },
    {
        "name": "mrel",
        "url": "http://id.loc.gov/vocabulary/relators/"
    },
    {
        "name": "msm",
        "url": "http://iserve.kmi.open.ac.uk/ns/msm#"
    },
    {
        "name": "msr",
        "url": "http://www.telegraphis.net/ontology/measurement/measurement#"
    },
    {
        "name": "muo",
        "url": "http://purl.oclc.org/NET/muo/muo#"
    },
    {
        "name": "music",
        "url": "http://www.kanzaki.com/ns/music#"
    },
    {
        "name": "muto",
        "url": "http://purl.org/muto/core#"
    },
    {
        "name": "mvco",
        "url": "http://purl.oclc.org/NET/mvco.owl#"
    },
    {
        "name": "nao",
        "url": "http://www.semanticdesktop.org/ontologies/2007/08/15/nao#"
    },
    {
        "name": "ncal",
        "url": "http://www.semanticdesktop.org/ontologies/2007/04/02/ncal#"
    },
    {
        "name": "nco",
        "url": "http://www.semanticdesktop.org/ontologies/2007/03/22/nco#"
    },
    {
        "name": "nfo",
        "url": "http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#"
    },
    {
        "name": "ngeo",
        "url": "http://geovocab.org/geometry#"
    },
    {
        "name": "nie",
        "url": "http://www.semanticdesktop.org/ontologies/2007/01/19/nie#"
    },
    {
        "name": "nif",
        "url": "http://persistence.uni-leipzig.org/nlp2rdf/ontologies/nif-core#"
    },
    {
        "name": "npg",
        "url": "http://ns.nature.com/terms/"
    },
    {
        "name": "nrl",
        "url": "http://www.semanticdesktop.org/ontologies/2007/08/15/nrl#"
    },
    {
        "name": "nsl",
        "url": "http://purl.org/ontology/storyline/"
    },
    {
        "name": "ntag",
        "url": "http://ns.inria.fr/nicetag/2010/09/09/voc#"
    },
    {
        "name": "oa",
        "url": "http://www.w3.org/ns/oa#"
    },
    {
        "name": "oad",
        "url": "http://lod.xdams.org/reload/oad/"
    },
    {
        "name": "oan",
        "url": "http://data.lirmm.fr/ontologies/oan/"
    },
    {
        "name": "obsm",
        "url": "http://rdf.geospecies.org/methods/observationMethod#"
    },
    {
        "name": "oc",
        "url": "http://contextus.net/ontology/ontomedia/core/expression#"
    },
    {
        "name": "ocd",
        "url": "http://dati.camera.it/ocd/"
    },
    {
        "name": "odapp",
        "url": "http://vocab.deri.ie/odapp#"
    },
    {
        "name": "odpart",
        "url": "http://www.ontologydesignpatterns.org/cp/owl/participation.owl#"
    },
    {
        "name": "odrs",
        "url": "http://schema.theodi.org/odrs#"
    },
    {
        "name": "odv",
        "url": "http://reference.data.gov.uk/def/organogram/"
    },
    {
        "name": "oecc",
        "url": "http://www.oegov.org/core/owl/cc#"
    },
    {
        "name": "og",
        "url": "http://ogp.me/ns#"
    },
    {
        "name": "olca",
        "url": "http://www.lingvoj.org/olca#"
    },
    {
        "name": "olo",
        "url": "http://purl.org/ontology/olo/core#"
    },
    {
        "name": "om",
        "url": "http://def.seegrid.csiro.au/isotc211/iso19156/2011/observation#"
    },
    {
        "name": "ont",
        "url": "http://purl.org/net/ns/ontology-annot#"
    },
    {
        "name": "ontopic",
        "url": "http://www.ontologydesignpatterns.org/ont/dul/ontopic.owl#"
    },
    {
        "name": "ontosec",
        "url": "http://www.semanticweb.org/ontologies/2008/11/OntologySecurity.owl#"
    },
    {
        "name": "onyx",
        "url": "http://www.gsi.dit.upm.es/ontologies/onyx/ns#"
    },
    {
        "name": "oo",
        "url": "http://purl.org/openorg/"
    },
    {
        "name": "op",
        "url": "http://environment.data.gov.au/def/op#"
    },
    {
        "name": "opmo",
        "url": "http://openprovenance.org/model/opmo#"
    },
    {
        "name": "opmv",
        "url": "http://purl.org/net/opmv/ns#"
    },
    {
        "name": "opmw",
        "url": "http://www.opmw.org/ontology/"
    },
    {
        "name": "opo",
        "url": "http://online-presence.net/opo/ns#"
    },
    {
        "name": "opus",
        "url": "http://lsdis.cs.uga.edu/projects/semdis/opus#"
    },
    {
        "name": "ore",
        "url": "http://www.openarchives.org/ore/terms/"
    },
    {
        "name": "org",
        "url": "http://www.w3.org/ns/org#"
    },
    {
        "name": "osadm",
        "url": "http://data.ordnancesurvey.co.uk/ontology/admingeo/"
    },
    {
        "name": "oslc",
        "url": "http://open-services.net/ns/core#"
    },
    {
        "name": "oslo",
        "url": "http://purl.org/oslo/ns/localgov#"
    },
    {
        "name": "osp",
        "url": "http://data.lirmm.fr/ontologies/osp#"
    },
    {
        "name": "osr",
        "url": "http://purl.org/ontomedia/core/space#"
    },
    {
        "name": "osspr",
        "url": "http://data.ordnancesurvey.co.uk/ontology/spatialrelations/"
    },
    {
        "name": "ostop",
        "url": "http://www.ordnancesurvey.co.uk/ontology/Topography/v0.1/Topography.owl#"
    },
    {
        "name": "ov",
        "url": "http://open.vocab.org/terms/"
    },
	{
        "name": "owl",
        "url": "http://www.w3.org/2002/07/owl#"
    },
    {
        "name": "p-plan",
        "url": "http://purl.org/net/p-plan#"
    },
    {
        "name": "parl",
        "url": "http://reference.data.gov.uk/def/parliament/"
    },
    {
        "name": "part",
        "url": "http://purl.org/vocab/participation/schema#"
    },
    {
        "name": "passim",
        "url": "http://data.lirmm.fr/ontologies/passim#"
    },
    {
        "name": "pattern",
        "url": "http://www.essepuntato.it/2008/12/pattern#"
    },
    {
        "name": "pav",
        "url": "http://purl.org/pav/"
    },
    {
        "name": "pay",
        "url": "http://reference.data.gov.uk/def/payment#"
    },
    {
        "name": "pbo",
        "url": "http://purl.org/ontology/pbo/core#"
    },
    {
        "name": "pc",
        "url": "http://purl.org/procurement/public-contracts#"
    },
    {
        "name": "pdo",
        "url": "http://ontologies.smile.deri.ie/pdo#"
    },
    {
        "name": "person",
        "url": "http://www.w3.org/ns/person#"
    },
    {
        "name": "pext",
        "url": "http://www.ontotext.com/proton/protonext#"
    },
    {
        "name": "pkm",
        "url": "http://www.ontotext.com/proton/protonkm#"
    },
    {
        "name": "place",
        "url": "http://purl.org/ontology/places#"
    },
    {
        "name": "pmlp",
        "url": "http://inference-web.org/2.0/pml-provenance.owl#"
    },
    {
        "name": "pna",
        "url": "http://data.press.net/ontology/asset/"
    },
    {
        "name": "pnc",
        "url": "http://data.press.net/ontology/classification/"
    },
    {
        "name": "pne",
        "url": "http://data.press.net/ontology/event/"
    },
    {
        "name": "pni",
        "url": "http://data.press.net/ontology/identifier/"
    },
    {
        "name": "pns",
        "url": "http://data.press.net/ontology/stuff/"
    },
    {
        "name": "pnt",
        "url": "http://data.press.net/ontology/tag/"
    },
    {
        "name": "po",
        "url": "http://purl.org/ontology/po/"
    },
    {
        "name": "poder",
        "url": "http://dev.poderopedia.com/vocab/"
    },
    {
        "name": "postcode",
        "url": "http://data.ordnancesurvey.co.uk/ontology/postcode/"
    },
    {
        "name": "poste",
        "url": "http://data.lirmm.fr/ontologies/poste#"
    },
    {
        "name": "ppo",
        "url": "http://vocab.deri.ie/ppo#"
    },
    {
        "name": "pr",
        "url": "http://purl.org/ontology/prv/core#"
    },
    {
        "name": "premis",
        "url": "http://www.loc.gov/premis/rdf/v1#"
    },
    {
        "name": "prissma",
        "url": "http://ns.inria.fr/prissma/v1#"
    },
    {
        "name": "pro",
        "url": "http://purl.org/spar/pro/"
    },
    {
        "name": "prov",
        "url": "http://www.w3.org/ns/prov#"
    },
    {
        "name": "prv",
        "url": "http://purl.org/net/provenance/ns#"
    },
    {
        "name": "prvt",
        "url": "http://purl.org/net/provenance/types#"
    },
    {
        "name": "pso",
        "url": "http://purl.org/spar/pso/"
    },
    {
        "name": "psys",
        "url": "http://www.ontotext.com/proton/protonsys#"
    },
    {
        "name": "ptop",
        "url": "http://www.ontotext.com/proton/protontop#"
    },
    {
        "name": "pwo",
        "url": "http://purl.org/spar/pwo/"
    },
    {
        "name": "qb",
        "url": "http://purl.org/linked-data/cube#"
    },
    {
        "name": "qudt",
        "url": "http://qudt.org/schema/qudt#"
    },
    {
        "name": "quty",
        "url": "http://www.telegraphis.net/ontology/measurement/quantity#"
    },
    {
        "name": "radion",
        "url": "http://www.w3.org/ns/radion#"
    },
    {
        "name": "raul",
        "url": "http://purl.org/NET/raul#"
    },
    {
        "name": "rdafrbr",
        "url": "http://rdvocab.info/uri/schema/FRBRentitiesRDA/"
    },
    {
        "name": "rdag1",
        "url": "http://rdvocab.info/Elements/"
    },
    {
        "name": "rdag2",
        "url": "http://rdvocab.info/ElementsGr2/"
    },
    {
        "name": "rdag3",
        "url": "http://rdvocab.info/ElementsGr3/"
    },
    {
        "name": "rdarel",
        "url": "http://rdvocab.info/RDARelationshipsWEMI/"
    },
    {
        "name": "rdarel2",
        "url": "http://metadataregistry.org/uri/schema/RDARelationshipsGR2/"
    },
    {
        "name": "rdarole",
        "url": "http://rdvocab.info/roles/"
    },
	{
        "name": "rdf",
        "url": "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    },
    {
        "name": "rdfg",
        "url": "http://www.w3.org/2004/03/trix/rdfg-1/"
    },
	{
        "name": "rdfs",
        "url": "http://www.w3.org/2000/01/rdf-schema#"
    },
    {
        "name": "rec",
        "url": "http://purl.org/ontology/rec/core#"
    },
    {
        "name": "reegle",
        "url": "http://reegle.info/schema#"
    },
    {
        "name": "rel",
        "url": "http://purl.org/vocab/relationship/"
    },
    {
        "name": "rev",
        "url": "http://purl.org/stuff/rev#"
    },
    {
        "name": "rov",
        "url": "http://www.w3.org/ns/regorg#"
    },
    {
        "name": "rr",
        "url": "http://www.w3.org/ns/r2rml#"
    },
    {
        "name": "rss",
        "url": "http://purl.org/rss/1.0/"
    },
    {
        "name": "ru",
        "url": "http://purl.org/imbi/ru-meta.owl#"
    },
    {
        "name": "s4ac",
        "url": "http://ns.inria.fr/s4ac/v2#"
    },
    {
        "name": "sam",
        "url": "http://def.seegrid.csiro.au/isotc211/iso19156/2011/sampling#"
    },
    {
        "name": "sao",
        "url": "http://salt.semanticauthoring.org/ontologies/sao#"
    },
    {
        "name": "sbench",
        "url": "http://swat.cse.lehigh.edu/onto/univ-bench.owl#"
    },
    {
        "name": "schema",
        "url": "http://schema.org/"
    },
    {
        "name": "scip",
        "url": "http://lod.taxonconcept.org/ontology/sci_people.owl#"
    },
    {
        "name": "scoro",
        "url": "http://purl.org/spar/scoro/"
    },
    {
        "name": "scot",
        "url": "http://rdfs.org/scot/ns#"
    },
    {
        "name": "scovo",
        "url": "http://purl.org/NET/scovo#"
    },
    {
        "name": "scsv",
        "url": "http://purl.org/NET/schema-org-csv#"
    },
    {
        "name": "sd",
        "url": "http://www.w3.org/ns/sparql-service-description#"
    },
    {
        "name": "sdmx",
        "url": "http://purl.org/linked-data/sdmx#"
    },
    {
        "name": "sdmx-code",
        "url": "http://purl.org/linked-data/sdmx/2009/code#"
    },
    {
        "name": "sdmx-dimension",
        "url": "http://purl.org/linked-data/sdmx/2009/dimension#"
    },
    {
        "name": "sdo",
        "url": "http://salt.semanticauthoring.org/ontologies/sdo#"
    },
    {
        "name": "search",
        "url": "http://sindice.com/vocab/search#"
    },
    {
        "name": "security",
        "url": "http://securitytoolbox.appspot.com/securityMain#"
    },
    {
        "name": "sem",
        "url": "http://semanticweb.cs.vu.nl/2009/11/sem/"
    },
    {
        "name": "semio",
        "url": "http://www.lingvoj.org/semio#"
    },
    {
        "name": "seq",
        "url": "http://www.ontologydesignpatterns.org/cp/owl/sequence.owl#"
    },
    {
        "name": "sf",
        "url": "http://www.opengis.net/ont/sf#"
    },
    {
        "name": "shw",
        "url": "http://paul.staroch.name/thesis/SmartHomeWeather.owl#"
    },
    {
        "name": "sim",
        "url": "http://purl.org/ontology/similarity/"
    },
    {
        "name": "sio",
        "url": "http://semanticscience.org/resource/"
    },
    {
        "name": "sioc",
        "url": "http://rdfs.org/sioc/ns#"
    },
    {
        "name": "situ",
        "url": "http://www.ontologydesignpatterns.org/cp/owl/situation.owl#"
    },
    {
        "name": "skos",
        "url": "http://www.w3.org/2004/02/skos/core#"
    },
    {
        "name": "skosxl",
        "url": "http://www.w3.org/2008/05/skos-xl#"
    },
    {
        "name": "snarm",
        "url": "http://rdf.myexperiment.org/ontologies/snarm/"
    },
    {
        "name": "sp",
        "url": "http://spinrdf.org/sp#"
    },
    {
        "name": "spatial",
        "url": "http://geovocab.org/spatial#"
    },
    {
        "name": "spcm",
        "url": "http://spi-fm.uca.es/spdef/models/deployment/spcm/1.0#"
    },
    {
        "name": "spfood",
        "url": "http://kmi.open.ac.uk/projects/smartproducts/ontologies/food.owl#"
    },
    {
        "name": "spin",
        "url": "http://spinrdf.org/spin#"
    },
    {
        "name": "sport",
        "url": "http://purl.org/ontology/sport/"
    },
    {
        "name": "spt",
        "url": "http://spitfire-project.eu/ontology/ns/"
    },
    {
        "name": "sql",
        "url": "http://ns.inria.fr/ast/sql#"
    },
    {
        "name": "sro",
        "url": "http://salt.semanticauthoring.org/ontologies/sro#"
    },
    {
        "name": "ssn",
        "url": "http://purl.oclc.org/NET/ssnx/ssn#"
    },
    {
        "name": "stac",
        "url": "http://securitytoolbox.appspot.com/stac#"
    },
    {
        "name": "stories",
        "url": "http://purl.org/ontology/stories/"
    },
    {
        "name": "swc",
        "url": "http://data.semanticweb.org/ns/swc/ontology#"
    },
    {
        "name": "swp",
        "url": "http://www.w3.org/2004/03/trix/swp-1/"
    },
    {
        "name": "swpm",
        "url": "http://spi-fm.uca.es/spdef/models/deployment/swpm/1.0#"
    },
    {
        "name": "swpo",
        "url": "http://sw-portal.deri.org/ontologies/swportal#"
    },
    {
        "name": "swrc",
        "url": "http://swrc.ontoware.org/ontology#"
    },
    {
        "name": "swrl",
        "url": "http://www.w3.org/2003/11/swrl#"
    },
    {
        "name": "tac",
        "url": "http://ns.bergnet.org/tac/0.1/triple-access-control#"
    },
    {
        "name": "tag",
        "url": "http://www.holygoat.co.uk/owl/redwood/0.1/tags/"
    },
    {
        "name": "tao",
        "url": "http://vocab.deri.ie/tao#"
    },
    {
        "name": "taxon",
        "url": "http://purl.org/biodiversity/taxon/"
    },
    {
        "name": "tddo",
        "url": "http://databugger.aksw.org/ns/core#"
    },
    {
        "name": "te",
        "url": "http://www.w3.org/2006/time-entry#"
    },
    {
        "name": "teach",
        "url": "http://linkedscience.org/teach/ns#"
    },
    {
        "name": "test",
        "url": "http://www.w3.org/2006/03/test-description#"
    },
    {
        "name": "theatre",
        "url": "http://purl.org/theatre#"
    },
    {
        "name": "thors",
        "url": "http://resource.geosciml.org/ontology/timescale/thors#"
    },
    {
        "name": "ti",
        "url": "http://www.ontologydesignpatterns.org/cp/owl/timeinterval.owl#"
    },
    {
        "name": "time",
        "url": "http://www.w3.org/2006/time#"
    },
    {
        "name": "tio",
        "url": "http://purl.org/tio/ns#"
    },
    {
        "name": "tis",
        "url": "http://www.ontologydesignpatterns.org/cp/owl/timeindexedsituation.owl#"
    },
    {
        "name": "tisc",
        "url": "http://observedchange.com/tisc/ns#"
    },
    {
        "name": "tl",
        "url": "http://purl.org/NET/c4dm/timeline.owl#"
    },
    {
        "name": "tm",
        "url": "http://def.seegrid.csiro.au/isotc211/iso19108/2002/temporal#"
    },
    {
        "name": "tmo",
        "url": "http://www.w3.org/2001/sw/hcls/ns/transmed/"
    },
    {
        "name": "trait",
        "url": "http://contextus.net/ontology/ontomedia/ext/common/trait#"
    },
    {
        "name": "transit",
        "url": "http://vocab.org/transit/terms/"
    },
    {
        "name": "tsioc",
        "url": "http://rdfs.org/sioc/types#"
    },
    {
        "name": "turismo",
        "url": "http://idi.fundacionctic.org/cruzar/turismo#"
    },
    {
        "name": "tvc",
        "url": "http://www.essepuntato.it/2012/04/tvc/"
    },
    {
        "name": "txn",
        "url": "http://lod.taxonconcept.org/ontology/txn.owl#"
    },
    {
        "name": "tzont",
        "url": "http://www.w3.org/2006/timezone#"
    },
    {
        "name": "uco",
        "url": "http://purl.org/uco/ns#"
    },
    {
        "name": "ui",
        "url": "http://www.w3.org/ns/ui#"
    },
    {
        "name": "umbel",
        "url": "http://umbel.org/umbel#"
    },
    {
        "name": "uniprot",
        "url": "http://purl.uniprot.org/core/"
    },
    {
        "name": "user",
        "url": "http://schemas.talis.com/2005/user/schema#"
    },
    {
        "name": "vaem",
        "url": "http://www.linkedmodel.org/schema/vaem#"
    },
    {
        "name": "vann",
        "url": "http://purl.org/vocab/vann/"
    },
    {
        "name": "vcard",
        "url": "http://www.w3.org/2006/vcard/ns#"
    },
    {
        "name": "vdpp",
        "url": "http://data.lirmm.fr/ontologies/vdpp#"
    },
    {
        "name": "vin",
        "url": "http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#"
    },
    {
        "name": "vivo",
        "url": "http://vivoweb.org/ontology/core#"
    },
    {
        "name": "vmm",
        "url": "http://spi-fm.uca.es/spdef/models/genericTools/vmm/1.0#"
    },
    {
        "name": "voaf",
        "url": "http://purl.org/vocommons/voaf#"
    },
    {
        "name": "voag",
        "url": "http://voag.linkedmodel.org/voag#"
    },
    {
        "name": "void",
        "url": "http://rdfs.org/ns/void#"
    },
    {
        "name": "vra",
        "url": "http://simile.mit.edu/2003/10/ontologies/vraCore3#"
    },
    {
        "name": "vrank",
        "url": "http://purl.org/voc/vrank#"
    },
    {
        "name": "vs",
        "url": "http://www.w3.org/2003/06/sw-vocab-status/ns#"
    },
    {
        "name": "vso",
        "url": "http://purl.org/vso/ns#"
    },
    {
        "name": "vvo",
        "url": "http://purl.org/vvo/ns#"
    },
    {
        "name": "wai",
        "url": "http://purl.org/wai#"
    },
    {
        "name": "wdrs",
        "url": "http://www.w3.org/2007/05/powder-s#"
    },
    {
        "name": "wf-invoc",
        "url": "http://purl.org/net/wf-invocation#"
    },
    {
        "name": "wfm",
        "url": "http://purl.org/net/wf-motifs#"
    },
    {
        "name": "whois",
        "url": "http://www.kanzaki.com/ns/whois#"
    },
    {
        "name": "wi",
        "url": "http://purl.org/ontology/wi/core#"
    },
    {
        "name": "wikim",
        "url": "http://spi-fm.uca.es/spdef/models/genericTools/wikim/1.0#"
    },
    {
        "name": "wl",
        "url": "http://www.wsmo.org/ns/wsmo-lite#"
    },
    {
        "name": "wlo",
        "url": "http://purl.org/ontology/wo/"
    },
    {
        "name": "wo",
        "url": "http://purl.org/ontology/wo/core#"
    },
    {
        "name": "wot",
        "url": "http://xmlns.com/wot/0.1/"
    },
    {
        "name": "xhv",
        "url": "http://www.w3.org/1999/xhtml/vocab#"
    },
    {
        "name": "xkos",
        "url": "http://purl.org/linked-data/xkos#"
    },
    {
        "name": "zbwext",
        "url": "http://zbw.eu/namespaces/zbw-extensions/"
    }
	];


//Define Arrays
	
    var predicateArray = new Array();
    var classesArray = new Array();
    var instancesArray = new Array();
	/*
	var testPredicateArray = new Array();
	var testClassesArray = new Array();


//Define endpoint


var endpoint = "http://data.ordnancesurvey.co.uk/datasets/os-linked-data/apis/sparql";

//Define queries
      
      var queryPredicates = "SELECT DISTINCT ?predicateLabel WHERE {?subject ?predicate ?object . ?predicate <http://www.w3.org/2000/01/rdf-schema#label> ?predicateLabel} LIMIT 10" ;
      var queryClasses = "SELECT DISTINCT ?classLabel WHERE {?subject a ?class . ?class <http://www.w3.org/2000/01/rdf-schema#label> ?classLabel} LIMIT 20" ;
      var queryInstances = "SELECT DISTINCT ?instanceLabel WHERE {?subject a ?class . ?subject <http://www.w3.org/2000/01/rdf-schema#label> ?instanceLabel}";

*/
	  
//Define endpoint

	  var endpoint = ""; 

//Define queries

	  //var testQueryPredicates = "select distinct ?predicate where { ?subject ?predicate ?object. }"; 
		var queryPredicates= new SPEXQuery();
		queryPredicates.select(["?predicate","?predicate__label"]).distinct().where("?subject" , "?predicate" , "?object").orderby("?predicate");

	  //var testQueryClasses = "select distinct ?aClass where { ?a a ?aClass. }"; 
	  	var queryClasses = new SPEXQuery();
		queryClasses.select(["?aClass","?aClass__label"]).distinct().where("?a" , "rdf:type" , "?aClass").orderby("?aClass"); 


//Blacklist
	  // excluded prefixes are entered in the table in alphabetical order
	  // vocabularies referring to spatial and temporal constraints are excluded since spatial and temporal constraints will be provided through the map and the time slider
	  var excludedPrefixes = [ "geo", "geod", "gsp", "owl","rdf","rdfs", "skos", "ti", "time", "tis", "xsd"];
 	 


	var sugEx=new QueryExecutor();

	sugEx.executeQuery = function(spexquery, endpoint) {
		//Test whether endpoint is non empty:
		if (endpoint == '' || endpoint == null) {
			alert('Enter an endpoint URI!');
			return;
		}
		// using ".serialiseQuery()" instead of "getSPARQL()"
		this.sparqlQueryJson(spexquery.le.expandLabels(spexquery).serialiseQuery(), endpoint, spexquery.timeout, false);	
	}

	// Define a callback function to receive the SPARQL JSON result.
     sugEx.callback = function(str) {
        // Convert result to JSON
        var jsonObj = eval('(' + str + ')');
		jsonObj=new LabelGenerator().label(new SPEXResultSet(jsonObj)).allResults;
		
		console.log ("JSON OBJECT: "+jsonObj);
      
		var u =0;
		var v =0;
	  
        for(var i = 0; i<  jsonObj.results.bindings.length; i++) {
		
		// TODO: Bring in the labels somehow
		
		/*
		if (typeof jsonObj.results.bindings[i].predicate__label !== 'undefined') {
			predicateArray[i] =jsonObj.results.bindings[i].predicateLabel.value;
		}
          
		if (typeof jsonObj.results.bindings[i].aClass__label !== 'undefined') {
			classesArray[i] =jsonObj.results.bindings[i].classLabel.value;
		}
		*/
		if (typeof jsonObj.results.bindings[i].aClass !== 'undefined') 
		{
			// get the current class
			var currentClass = jsonObj.results.bindings[i].aClass.value;
			console.log("Current class: "+currentClass);
		
			// go through the list of prefixes to check if one of the urls associated with a prefix is substring of the current class
			for (var j = 0; j < prefixes.length; j++ )
			{
				// if yes
			  if (currentClass.indexOf(prefixes[j].url) != -1)
			  {
			    //console.log ("CURRENT PREDICATE: "+currentpredicate); 
			    //console.log ("CURRENT DOMAIN: "+prefixes[j].url);  

				// check if the corresponding prefix is not excluded from the list of prefixes to show
				if (excludedPrefixes.indexOf(prefixes[j].name) == -1)
				{
					// only replace the url of the predicate with the corresponding prefix if the prefix is not in the list of excluded prefixes
					classesArray[u] = currentClass.replace(prefixes[j].url, prefixes[j].name+":");
					u++;					
					break; 
				}
 
			  }
			}
 
		}		
		
		if (typeof jsonObj.results.bindings[i].predicate !== 'undefined') 
		{
			
			// get the current predicate
			var currentPredicate = jsonObj.results.bindings[i].predicate.value;
			
			// go through the list of prefixes to check if one of the urls associated with a prefix is substring of the current predicate
			for (var j = 0; j < prefixes.length; j++ )
			{
				// if yes
			  if (currentPredicate.indexOf(prefixes[j].url) != -1)
			  {
			    //console.log ("CURRENT PREDICATE: "+currentpredicate); 
			    //console.log ("CURRENT DOMAIN: "+prefixes[j].url);  

				// check if the corresponding prefix is not excluded from the list of prefixes to show
				if (excludedPrefixes.indexOf(prefixes[j].name) == -1)
				{
					// only replace the url of the predicate with the corresponding prefix if the prefix is not in the list of excluded prefixes
					predicateArray[v] = currentPredicate.replace(prefixes[j].url, prefixes[j].name+":");
					v++;					
					break; 
				}
 
			  }
			}
		}
        
	   }  
	   	console.log("The number of classes is:  "+classesArray.length); 	   
	    console.log("The number of predicates is:  "+predicateArray.length); 	   
     }


	this.init=function(){
		sugEx.executeQuery(queryClasses, endpoint); 
		sugEx.executeQuery(queryPredicates, endpoint);
	}




    this.createDropdownC=function(HashStringID){
	  endpoint=document.getElementById("endpoint").value;
	  $( HashStringID ).autocomplete({source: classesArray});
    	
    };
	
    this.createDropdownP=function(HashStringID){
	  endpoint=document.getElementById("endpoint").value;
	  $( HashStringID ).autocomplete({source: predicateArray});
    	
    };

	console.timeEnd('This is the execution timer');
}
