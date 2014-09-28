// list of prefixes from the Linked Open Data Vocabularies ( http://lov.okfn.org/dataset/lov/ )
// prefixes added manually: rdf, rdfs, and owl
// slight changes done

var prefixes=
[
	{
	"prefix":"acco",
	"uri": "http://purl.org/acco/ns#"
	},
	{
	"prefix":"acl",
	"uri": "http://www.w3.org/ns/auth/acl#"
	},
	{
	"prefix":"acm",
	"uri": "http://acm.rkbexplorer.com/ontologies/acm#"
	},
	{
	"prefix":"acrt",
	"uri": "http://privatealpha.com/ontology/certification/1#"
	},
	{
	"prefix":"ad",
	"uri": "http://schemas.talis.com/2005/address/schema#"
	},
	{
	"prefix":"adms",
	"uri": "http://www.w3.org/ns/adms#"
	},
	{
	"prefix":"af",
	"uri": "http://purl.org/ontology/af/"
	},
	{
	"prefix":"agls",
	"uri": "http://www.agls.gov.au/agls/terms/"
	},
	{
	"prefix":"agrelon",
	"uri": "http://d-nb.info/standards/elementset/agrelon.owl#"
	},
	{
	"prefix":"aiiso",
	"uri": "http://purl.org/vocab/aiiso/schema#"
	},
	{
	"prefix":"akt",
	"uri": "http://www.aktors.org/ontology/portal#"
	},
	{
	"prefix":"akts",
	"uri": "http://www.aktors.org/ontology/support#"
	},
	{
	"prefix":"algo",
	"uri": "http://securitytoolbox.appspot.com/securityAlgorithms#"
	},
	{
	"prefix":"am",
	"uri": "http://open-services.net/ns/asset#"
	},
	{
	"prefix":"ao",
	"uri": "http://purl.org/ontology/ao/core#"
	},
	{
	"prefix":"aos",
	"uri": "http://rdf.muninn-project.org/ontologies/appearances#"
	},
	{
	"prefix":"api",
	"uri": "http://purl.org/linked-data/api/vocab#"
	},
	{
	"prefix":"apps4X",
	"uri":"http://semweb.mmlab.be/ns/apps4X#"
	},
	{
	"prefix":"arch",
	"uri": "http://purl.org/archival/vocab/arch#"
	},
	{
	"prefix":"awol",
	"uri": "http://bblfish.net/work/atom-owl/2006-06-06/#"
	},
	{
	"prefix":"aws",
	"uri": "http://purl.oclc.org/NET/ssnx/meteo/aws#"
	},
	{
	"prefix":"b2bo",
	"uri": "http://purl.org/b2bo#"
	},
	{
	"prefix":"basic",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19103/2005/basic#"
	},
	{
	"prefix":"bbccms",
	"uri":"http://www.bbc.co.uk/ontologies/cms/"
	},
	{
	"prefix":"bbccore",
	"uri":"http://www.bbc.co.uk/ontologies/coreconcepts/"
	},
	{
	"prefix":"bbcprov",
	"uri": "http://www.bbc.co.uk/ontologies/provenance/"
	},
	{
	"prefix":"being",
	"uri": "http://purl.org/ontomedia/ext/common/being#"
	},
	{
	"prefix":"bevon",
	"uri": "http://rdfs.co/bevon/"
	},
	{
	"prefix":"bibo",
	"uri": "http://purl.org/ontology/bibo/"
	},
	{
	"prefix":"bibtex",
	"uri": "http://purl.org/net/nknouf/ns/bibtex#"
	},
	{
	"prefix":"bio",
	"uri": "http://purl.org/vocab/bio/0.1/"
	},
	{
	"prefix":"biol",
	"uri": "http://purl.org/NET/biol/ns#"
	},
	{
	"prefix":"biopax",
	"uri": "http://www.biopax.org/release/biopax-level3.owl#"
	},
	{
	"prefix":"biotop",
	"uri": "http://purl.org/biotop/biotop.owl#"
	},
	{
	"prefix":"biro",
	"uri": "http://purl.org/spar/biro/"
	},
	{
	"prefix":"blt",
	"uri": "http://www.bl.uk/schemas/bibliographic/blterms#"
	},
	{
	"prefix":"botany",
	"uri": "http://purl.org/NET/biol/botany#"
	},
	{
	"prefix":"br",
	"uri": "http://vocab.deri.ie/br#"
	},
	{
	"prefix":"c4n",
	"uri": "http://vocab.deri.ie/c4n#"
	},
	{
	"prefix":"c4o",
	"uri": "http://purl.org/spar/c4o/"
	},
	{
	"prefix":"cal",
	"uri": "http://www.w3.org/2002/12/cal/ical#"
	},
	{
	"prefix":"cc",
	"uri": "http://creativecommons.org/ns#"
	},
	{
	"prefix":"cco",
	"uri": "http://purl.org/ontology/cco/core#"
	},
	{
	"prefix":"cdm",
	"uri": "http://purl.org/twc/ontology/cdm.owl#"
	},
	{
	"prefix":"cdtype",
	"uri": "http://purl.org/cld/cdtype/"
	},
	{
	"prefix":"ceo",
	"uri": "http://www.ebusiness-unibw.org/ontologies/consumerelectronics/v1#"
	},
	{
	"prefix":"cert",
	"uri": "http://www.w3.org/ns/auth/cert#"
	},
	{
	"prefix":"cgov",
	"uri": "http://reference.data.gov.uk/def/central-government/"
	},
	{
	"prefix":"chord",
	"uri": "http://purl.org/ontology/chord/"
	},
	{
	"prefix":"cito",
	"uri": "http://purl.org/spar/cito/"
	},
	{
	"prefix":"citof",
	"uri": "http://www.essepuntato.it/2013/03/cito-functions#"
	},
	{
	"prefix":"cld",
	"uri": "http://purl.org/cld/terms/"
	},
	{
	"prefix":"cmo",
	"uri": "http://purl.org/twc/ontologies/cmo.owl#"
	},
	{
	"prefix":"cnt",
	"uri": "http://www.w3.org/2011/content#"
	},
	{
	"prefix":"co",
	"uri": "http://purl.org/ontology/co/core#"
	},
	{
	"prefix":"cogs",
	"uri": "http://vocab.deri.ie/cogs#"
	},
	{
	"prefix":"cold",
	"uri": "http://purl.org/configurationontology#"
	},
	{
	"prefix":"coll",
	"uri": "http://purl.org/co/"
	},
	{
	"prefix":"comm",
	"uri": "http://vocab.resc.info/communication#"
	},
	{
	"prefix":"con",
	"uri": "http://www.w3.org/2000/10/swap/pim/contact#"
	},
	{
	"prefix":"conversion",
	"uri": "http://purl.org/twc/vocab/conversion/"
	},
	{
	"prefix":"coo",
	"uri": "http://purl.org/coo/ns#"
	},
	{
	"prefix":"coun",
	"uri": "http://www.daml.org/2001/09/countries/iso-3166-ont#"
	},
	{
	"prefix":"cpa",
	"uri": "http://www.ontologydesignpatterns.org/schemas/cpannotationschema.owl#"
	},
	{
	"prefix":"crm",
	"uri": "http://www.cidoc-crm.org/cidoc-crm/"
	},
	{
	"prefix":"cro",
	"uri": "http://rhizomik.net/ontologies/copyrightonto.owl#"
	},
	{
	"prefix":"crsw",
	"uri": "http://courseware.rkbexplorer.com/ontologies/courseware#"
	},
	{
	"prefix":"cs",
	"uri": "http://purl.org/vocab/changeset/schema#"
	},
	{
	"prefix":"csp",
	"uri": "http://vocab.deri.ie/csp#"
	},
	{
	"prefix":"ct",
	"uri": "http://www.tele.pw.edu.pl/~sims-onto/ConnectivityType.owl#"
	},
	{
	"prefix":"ctag",
	"uri": "http://commontag.org/ns#"
	},
	{
	"prefix":"ctorg",
	"uri": "http://purl.org/ctic/infraestructuras/organizacion#"
	},
	{
	"prefix":"cv_base",
	"uri": "http://rdfs.org/resume-rdf/base.rdfs#"
	},
	{
	"prefix":"cv_rdfs",
	"uri": "http://rdfs.org/resume-rdf/cv.rdfs#"
	},
	{
	"prefix":"d2rq",
	"uri": "http://www.wiwiss.fu-berlin.de/suhl/bizer/D2RQ/0.1#"
	},
	{
	"prefix":"dady",
	"uri": "http://purl.org/NET/dady#"
	},
	{
	"prefix":"daia",
	"uri": "http://purl.org/ontology/daia#"
	},
	{
	"prefix":"dbp",
	"uri": "http://dbpedia.org/resource/"
	},
	{
	"prefix":"dbp-ont",
	"uri": "http://dbpedia.org/ontology/"
	},
	{
	"prefix":"dbp-prop",
	"uri": "http://dbpedia.org/property/"
	},
	{
	"prefix":"dc",
	"uri": "http://purl.org/dc/elements/1.1/"
	},
	{
	"prefix":"dcam",
	"uri": "http://purl.org/dc/dcam/"
	},
	{
	"prefix":"dcat",
	"uri": "http://www.w3.org/ns/dcat#"
	},
	{
	"prefix":"dcite",
	"uri": "http://purl.org/spar/datacite/"
	},
	{
	"prefix":"dcndl",
	"uri": "http://ndl.go.jp/dcndl/terms/"
	},
	{
	"prefix":"dct",
	"uri": "http://purl.org/dc/terms/"
	},
	{
	"prefix":"dctype",
	"uri": "http://purl.org/dc/dcmitype/"
	},
	{
	"prefix":"decision",
	"uri":"https://decision-ontology.googlecode.com/svn/trunk/decision.owl#"
	},
	{
	"prefix":"deo",
	"uri": "http://purl.org/spar/deo/"
	},
	{
	"prefix":"dicom",
	"uri": "http://purl.org/healthcarevocab/v1#"
	},
	{
	"prefix":"dir",
	"uri": "http://schemas.talis.com/2005/dir/schema#"
	},
	{
	"prefix":"disco",
	"uri": "http://rdf-vocabulary.ddialliance.org/discovery#"
	},
	{
	"prefix":"dl",
	"uri": "http://ontology.ip.rm.cnr.it/ontologies/DOLCE-Lite#"
	},
	{
	"prefix":"doap",
	"uri": "http://usefulinc.com/ns/doap#"
	},
	{
	"prefix":"doc",
	"uri": "http://www.w3.org/2000/10/swap/pim/doc#"
	},
	{
	"prefix":"doco",
	"uri": "http://purl.org/spar/doco/"
	},
	{
	"prefix":"docso",
	"uri": "http://purl.org/ontology/dso#"
	},
	{
	"prefix":"dogont",
	"uri": "http://elite.polito.it/ontologies/dogont.owl#"
	},
	{
	"prefix":"dq",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19115/2003/dataquality#"
	},
	{
	"prefix":"dqm",
	"uri": "http://purl.org/dqm-vocabulary/v1/dqm#"
	},
	{
	"prefix":"dr",
	"uri": "http://purl.org/swan/2.0/discourse-relationships/"
	},
	{
	"prefix":"drm",
	"uri": "http://vocab.data.gov/def/drm#"
	},
	{
	"prefix":"ds",
	"uri": "http://purl.org/ctic/dcat#"
	},
	{
	"prefix":"dsn",
	"uri": "http://purl.org/dsnotify/vocab/eventset/"
	},
	{
	"prefix":"dso",
	"uri": "http://inference-web.org/2.0/ds.owl#"
	},
	{
	"prefix":"dtype",
	"uri": "http://www.linkedmodel.org/schema/dtype#"
	},
	{
	"prefix":"dul",
	"uri": "http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#"
	},
	{
	"prefix":"dvia",
	"uri": "http://purl.org/ontology/dvia#"
	},
	{
	"prefix":"eac-cpf",
	"uri": "http://archivi.ibc.regione.emilia-romagna.it/ontology/eac-cpf/"
	},
	{
	"prefix":"earl",
	"uri": "http://www.w3.org/ns/earl#"
	},
	{
	"prefix":"ebucore",
	"uri": "http://www.ebu.ch/metadata/ontologies/ebucore/ebucore#"
	},
	{
	"prefix":"edm",
	"uri": "http://www.europeana.eu/schemas/edm/"
	},
	{
	"prefix":"elec",
	"uri": "http://purl.org/ctic/sector-publico/elecciones#"
	},
	{
	"prefix":"emotion",
	"uri": "http://ns.inria.fr/emoca#"
	},
	{
	"prefix":"emp",
	"uri": "http://purl.org/ctic/empleo/oferta#"
	},
	{
	"prefix":"ends",
	"uri": "http://labs.mondeca.com/vocab/endpointStatus#"
	},
	{
	"prefix":"ep",
	"uri": "http://eprints.org/ontology/"
	},
	{
	"prefix":"event",
	"uri": "http://purl.org/NET/c4dm/event.owl#"
	},
	{
	"prefix":"ex",
	"uri": "http://purl.org/net/ns/ex#"
	},
	{
	"prefix":"exif",
	"uri": "http://www.w3.org/2003/12/exif/ns#"
	},
	{
	"prefix":"ext",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19115/2003/extent#"
	},
	{
	"prefix":"fabio",
	"uri": "http://purl.org/spar/fabio/"
	},
	{
	"prefix":"fea",
	"uri": "http://vocab.data.gov/def/fea#"
	},
	{
	"prefix":"fn",
	"uri": "http://www.w3.org/2005/xpath-functions#"
	},
	{
	"prefix":"foaf",
	"uri": "http://xmlns.com/foaf/0.1/"
	},
	{
	"prefix":"food",
	"uri": "http://data.lirmm.fr/ontologies/food#"
	},
	{
	"prefix":"fowl",
	"uri": "http://www.w3.org/TR/2003/PR-owl-guide-20031209/food#"
	},
	{
	"prefix":"frad",
	"uri": "http://iflastandards.info/ns/fr/frad/"
	},
	{
	"prefix":"frapo",
	"uri": "http://purl.org/cerif/frapo/"
	},
	{
	"prefix":"frbr",
	"uri": "http://purl.org/vocab/frbr/core#"
	},
	{
	"prefix":"frbre",
	"uri": "http://purl.org/vocab/frbr/extended#"
	},
	{
	"prefix":"fresnel",
	"uri": "http://www.w3.org/2004/09/fresnel#"
	},
	{
	"prefix":"g50k",
	"uri": "http://data.ordnancesurvey.co.uk/ontology/50kGazetteer/"
	},
	{
	"prefix":"game",
	"uri": "http://data.totl.net/game/"
	},
	{
	"prefix":"gc",
	"uri": "http://www.oegov.org/core/owl/gc#"
	},
	{
	"prefix":"gd",
	"uri": "http://reference.data.gov/def/govdata/"
	},
	{
	"prefix":"gen",
	"uri": "http://purl.org/gen/0.1#"
	},
	{
	"prefix":"geo",
	"uri": "http://www.opengis.net/ont/geosparql#"
	},
	{
	"prefix":"geo-1-0",
	"uri": "http://www.opengis.net/ont/geosparql/1.0#"
	},
	{
	"prefix":"geod",
	"uri": "http://vocab.lenka.no/geo-deling#"
	},
	{
	"prefix":"geof",
	"uri": "http://www.mindswap.org/2003/owl/geo/geoFeatures20040307.owl#"
	},
	{
	"prefix":"geop",
	"uri": "http://aims.fao.org/aos/geopolitical.owl#"
	},
	{
	"prefix":"geos",
	"uri": "http://www.telegraphis.net/ontology/geography/geography#"
	},
	{
	"prefix":"geosp",
	"uri": "http://rdf.geospecies.org/ont/geospecies#"
	},
	{
	"prefix":"gf",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19109/2005/feature#"
	},
	{
	"prefix":"gm",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19107/2003/geometry#"
	},
	{
	"prefix":"gml",
	"uri": "http://www.opengis.net/ont/gml#"
	},
	{
	"prefix":"gn",
	"uri": "http://www.geonames.org/ontology#"
	},
	{
	"prefix":"gndo",
	"uri": "http://d-nb.info/standards/elementset/gnd#"
	},
	{
	"prefix":"gr",
	"uri": "http://purl.org/goodrelations/v1#"
	},
	{
	"prefix":"grddl",
	"uri": "http://www.w3.org/2003/g/data-view#"
	},
	{
	"prefix":"gso",
	"uri": "http://www.w3.org/2006/gen/ont#"
	},
	{
	"prefix":"gts",
	"uri": "http://resource.geosciml.org/ontology/timescale/gts#"
	},
	{
	"prefix":"h2o",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19150/-2/2012/basic#"
	},
	{
	"prefix":"hdo",
	"uri": "http://www.samos.gr/ontologies/helpdeskOnto.owl#"
	},
	{
	"prefix":"homeActivity",
	"uri": "http://sensormeasurement.appspot.com/ont/home/homeActivity#"
	},
	{
	"prefix":"homeWeather",
	"uri": "https://www.auto.tuwien.ac.at/downloads/thinkhome/ontology/WeatherOntology.owl#"
	},
	{
	"prefix":"hr",
	"uri": "http://iserve.kmi.open.ac.uk/ns/hrests#"
	},
	{
	"prefix":"http",
	"uri": "http://www.w3.org/2011/http#"
	},
	{
	"prefix":"idemo",
	"uri": "http://rdf.insee.fr/def/demo#"
	},
	{
	"prefix":"identity",
	"uri": "http://www.identity.org/ontologies/identity.owl#"
	},
	{
	"prefix":"igeo",
	"uri": "http://rdf.insee.fr/def/geo#"
	},
	{
	"prefix":"infor",
	"uri": "http://www.ontologydesignpatterns.org/cp/owl/informationrealization.owl#"
	},
	{
	"prefix":"inno",
	"uri": "http://purl.org/innovation/ns#"
	},
	{
	"prefix":"interval",
	"uri": "http://reference.data.gov.uk/def/intervals/"
	},
	{
	"prefix":"iol",
	"uri": "http://www.ontologydesignpatterns.org/ont/dul/IOLite.owl#"
	},
	{
	"prefix":"irw",
	"uri": "http://www.ontologydesignpatterns.org/ont/web/irw.owl#"
	},
	{
	"prefix":"is",
	"uri": "http://purl.org/ontology/is/core#"
	},
	{
	"prefix":"isbd",
	"uri": "http://iflastandards.info/ns/isbd/elements/"
	},
	{
	"prefix":"itm",
	"uri": "http://spi-fm.uca.es/spdef/models/genericTools/itm/1.0#"
	},
	{
	"prefix":"itsmo",
	"uri": "http://ontology.it/itsmo/v1#"
	},
	{
	"prefix":"kdo",
	"uri": "http://kdo.render-project.eu/kdo#"
	},
	{
	"prefix":"keys",
	"uri": "http://purl.org/NET/c4dm/keys.owl#"
	},
	{
	"prefix":"label",
	"uri": "http://purl.org/net/vocab/2004/03/label#"
	},
	{
	"prefix":"lcy",
	"uri": "http://purl.org/vocab/lifecycle/schema#"
	},
	{
	"prefix":"ldp",
	"uri": "http://www.w3.org/ns/ldp#"
	},
	{
	"prefix":"ldr",
	"uri": "http://purl.oclc.org/NET/ldr/ns#"
	},
	{
	"prefix":"lemon",
	"uri": "http://lemon-model.net/lemon#"
	},
	{
	"prefix":"lexinfo",
	"uri": "http://www.lexinfo.net/ontology/2.0/lexinfo#"
	},
	{
	"prefix":"lgdo",
	"uri": "http://linkedgeodata.org/ontology/"
	},
	{
	"prefix":"li",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19115/2003/lineage#"
	},
	{
	"prefix":"lib",
	"uri": "http://purl.org/library/"
	},
	{
	"prefix":"limo",
	"uri": "http://www.purl.org/limo-ontology/limo#"
	},
	{
	"prefix":"limoo",
	"uri": "http://purl.org/LiMo/0.1#"
	},
	{
	"prefix":"lingvo",
	"uri": "http://www.lingvoj.org/ontology#"
	},
	{
	"prefix":"lio",
	"uri": "http://purl.org/net/lio#"
	},
	{
	"prefix":"lmf",
	"uri": "http://www.lexinfo.net/lmf#"
	},
	{
	"prefix":"lmm1",
	"uri": "http://www.ontologydesignpatterns.org/ont/lmm/LMM_L1.owl#"
	},
	{
	"prefix":"lmm2",
	"uri": "http://www.ontologydesignpatterns.org/ont/lmm/LMM_L2.owl#"
	},
	{
	"prefix":"loc",
	"uri": "http://purl.org/ctic/infraestructuras/localizacion#"
	},
	{
	"prefix":"locah",
	"uri": "http://data.archiveshub.ac.uk/def/"
	},
	{
	"prefix":"locn",
	"uri": "http://www.w3.org/ns/locn#"
	},
	{
	"prefix":"lode",
	"uri": "http://linkedevents.org/ontology/"
	},
	{
	"prefix":"log",
	"uri": "http://www.w3.org/2000/10/swap/log#"
	},
	{
	"prefix":"loted",
	"uri": "http://www.loted.eu/ontology#"
	},
	{
	"prefix":"lsc",
	"uri": "http://linkedscience.org/lsc/ns#"
	},
	{
	"prefix":"lv",
	"uri": "http://purl.org/lobid/lv#"
	},
	{
	"prefix":"lvont",
	"uri": "http://lexvo.org/ontology#"
	},
	{
	"prefix":"lyou",
	"uri": "http://purl.org/linkingyou/"
	},
	{
	"prefix":"ma-ont",
	"uri": "http://www.w3.org/ns/ma-ont#"
	},
	{
	"prefix":"mads",
	"uri": "http://www.loc.gov/mads/rdf/v1#"
	},
	{
	"prefix":"maps",
	"uri": "http://www.geographicknowledge.de/vocab/maps#"
	},
	{
	"prefix":"marl",
	"uri": "http://www.gsi.dit.upm.es/ontologies/marl/ns#"
	},
	{
	"prefix":"maso",
	"uri": "http://securitytoolbox.appspot.com/MASO#"
	},
	{
	"prefix":"meb",
	"uri": "http://rdf.myexperiment.org/ontologies/base/"
	},
	{
	"prefix":"media",
	"uri": "http://purl.org/media#"
	},
	{
	"prefix":"mil",
	"uri": "http://rdf.muninn-project.org/ontologies/military#"
	},
	{
	"prefix":"mo",
	"uri": "http://purl.org/ontology/mo/"
	},
	{
	"prefix":"moac",
	"uri": "http://observedchange.com/moac/ns#"
	},
	{
	"prefix":"moat",
	"uri": "http://moat-project.org/ns#"
	},
	{
	"prefix":"mrel",
	"uri": "http://id.loc.gov/vocabulary/relators/"
	},
	{
	"prefix":"msm",
	"uri": "http://iserve.kmi.open.ac.uk/ns/msm#"
	},
	{
	"prefix":"msr",
	"uri": "http://www.telegraphis.net/ontology/measurement/measurement#"
	},
	{
	"prefix":"muo",
	"uri": "http://purl.oclc.org/NET/muo/muo#"
	},
	{
	"prefix":"music",
	"uri": "http://www.kanzaki.com/ns/music#"
	},
	{
	"prefix":"muto",
	"uri": "http://purl.org/muto/core#"
	},
	{
	"prefix":"mvco",
	"uri": "http://purl.oclc.org/NET/mvco.owl#"
	},
	{
	"prefix":"nao",
	"uri": "http://www.semanticdesktop.org/ontologies/2007/08/15/nao/#"
	},
	{
	"prefix":"ncal",
	"uri": "http://www.semanticdesktop.org/ontologies/2007/04/02/ncal/#"
	},
	{
	"prefix":"nco",
	"uri": "http://www.semanticdesktop.org/ontologies/2007/03/22/nco/#"
	},
	{
	"prefix":"nfo",
	"uri": "http://www.semanticdesktop.org/ontologies/2007/03/22/nfo/#"
	},
	{
	"prefix":"ngeo",
	"uri": "http://geovocab.org/geometry#"
	},
	{
	"prefix":"nie",
	"uri": "http://www.semanticdesktop.org/ontologies/2007/01/19/nie#"
	},
	{
	"prefix":"nif",
	"uri": "http://persistence.uni-leipzig.org/nlp2rdf/ontologies/nif-core#"
	},
	{
	"prefix":"npg",
	"uri": "http://ns.nature.com/terms/"
	},
	{
	"prefix":"nrl",
	"uri": "http://www.semanticdesktop.org/ontologies/2007/08/15/nrl#"
	},
	{
	"prefix":"nsl",
	"uri": "http://purl.org/ontology/storyline/"
	},
	{
	"prefix":"ntag",
	"uri": "http://ns.inria.fr/nicetag/2010/09/09/voc#"
	},
	{
	"prefix":"oa",
	"uri": "http://www.w3.org/ns/oa#"
	},
	{
	"prefix":"oad",
	"uri": "http://lod.xdams.org/reload/oad/"
	},
	{
	"prefix":"oan",
	"uri": "http://data.lirmm.fr/ontologies/oan/"
	},
	{
	"prefix":"ocd",
	"uri": "http://dati.camera.it/ocd/"
	},
	{
	"prefix":"odapp",
	"uri": "http://vocab.deri.ie/odapp#"
	},
	{"prefix":"odapps",
	"uri":"http://semweb.mmlab.be/ns/odapps#"
	},
	{
	"prefix":"odpart",
	"uri": "http://www.ontologydesignpatterns.org/cp/owl/participation.owl#"
	},
	{
	"prefix":"odrs",
	"uri": "http://schema.theodi.org/odrs#"
	},
	{
	"prefix":"odv",
	"uri": "http://reference.data.gov.uk/def/organogram/"
	},
	{
	"prefix":"oecc",
	"uri": "http://www.oegov.org/core/owl/cc#"
	},
	{
	"prefix":"og",
	"uri": "http://ogp.me/ns#"
	},
	{
	"prefix":"olca",
	"uri": "http://www.lingvoj.org/olca#"
	},
	{
	"prefix":"olo",
	"uri": "http://purl.org/ontology/olo/core#"
	},
	{
	"prefix":"om",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19156/2011/observation#"
	},
	{
	"prefix":"ont",
	"uri": "http://purl.org/net/ns/ontology-annot#"
	},
	{
	"prefix":"ontopic",
	"uri": "http://www.ontologydesignpatterns.org/ont/dul/ontopic.owl#"
	},
	{
	"prefix":"ontosec",
	"uri": "http://www.semanticweb.org/ontologies/2008/11/OntologySecurity.owl#"
	},
	{
	"prefix":"onyx",
	"uri": "http://www.gsi.dit.upm.es/ontologies/onyx/ns#"
	},
	{
	"prefix":"oo",
	"uri": "http://purl.org/openorg/"
	},
	{
	"prefix":"op",
	"uri": "http://environment.data.gov.au/def/op#"
	},
	{
	"prefix":"opmo",
	"uri": "http://openprovenance.org/model/opmo#"
	},
	{
	"prefix":"opmv",
	"uri": "http://purl.org/net/opmv/ns#"
	},
	{
	"prefix":"opmw",
	"uri": "http://www.opmw.org/ontology/"
	},
	{
	"prefix":"opo",
	"uri": "http://online-presence.net/opo/ns#"
	},
	{
	"prefix":"opus",
	"uri": "http://lsdis.cs.uga.edu/projects/semdis/opus#"
	},
	{
	"prefix":"ore",
	"uri": "http://www.openarchives.org/ore/terms/"
	},
	{
	"prefix":"org",
	"uri": "http://www.w3.org/ns/org#"
	},
	{
	"prefix":"osadm",
	"uri": "http://data.ordnancesurvey.co.uk/ontology/admingeo/"
	},
	{
	"prefix":"osgeom",
	"uri": "http://data.ordnancesurvey.co.uk/ontology/geometry/"
	},
	{
	"prefix":"oslc",
	"uri": "http://open-services.net/ns/core#"
	},
	{
	"prefix":"oslo",
	"uri": "http://purl.org/oslo/ns/localgov#"
	},
	{
	"prefix":"osp",
	"uri": "http://data.lirmm.fr/ontologies/osp#"
	},
	{
	"prefix":"osr",
	"uri": "http://purl.org/ontomedia/core/space#"
	},
	{
	"prefix":"osspr",
	"uri": "http://data.ordnancesurvey.co.uk/ontology/spatialrelations/"
	},
	{
	"prefix":"ostop",
	"uri": "http://www.ordnancesurvey.co.uk/ontology/Topography/v0.1/Topography.owl#"
	},
	{
	"prefix":"ov",
	"uri": "http://open.vocab.org/terms/"
	},
	{
	"prefix":"owl",
	"uri": "http://www.w3.org/2002/07/owl#"
	},
	{
	"prefix":"p-plan",
	"uri": "http://purl.org/net/p-plan#"
	},
	{
	"prefix":"parl",
	"uri": "http://reference.data.gov.uk/def/parliament/"
	},
	{
	"prefix":"part",
	"uri": "http://purl.org/vocab/participation/schema#"
	},
	{
	"prefix":"passim",
	"uri": "http://data.lirmm.fr/ontologies/passim#"
	},
	{
	"prefix":"pattern",
	"uri": "http://www.essepuntato.it/2008/12/pattern#"
	},
	{
	"prefix":"pav",
	"uri": "http://purl.org/pav/"
	},
	{
	"prefix":"pay",
	"uri": "http://reference.data.gov.uk/def/payment#"
	},
	{
	"prefix":"pbo",
	"uri": "http://purl.org/ontology/pbo/core#"
	},
	{
	"prefix":"pc",
	"uri": "http://purl.org/procurement/public-contracts#"
	},
	{
	"prefix":"pdo",
	"uri": "http://ontologies.smile.deri.ie/pdo#"
	},
	{
	"prefix":"person",
	"uri": "http://www.w3.org/ns/person#"
	},
	{
	"prefix":"pext",
	"uri": "http://www.ontotext.com/proton/protonext#"
	},
	{
	"prefix":"phdd",
	"uri":"http://rdf-vocabulary.ddialliance.org/phdd#"
	},
	{
	"prefix":"phen",
	"uri":	"http://www.geographicknowledge.de/vocab/historicmapsphen#"
	},
	{
	"prefix":"pkm",
	"uri": "http://www.ontotext.com/proton/protonkm#"
	},
	{
	"prefix":"place",
	"uri": "http://purl.org/ontology/places#"
	},
	{
	"prefix":"pmlp",
	"uri": "http://inference-web.org/2.0/pml-provenance.owl#"
	},
	{
	"prefix":"pna",
	"uri": "http://data.press.net/ontology/asset/"
	},
	{
	"prefix":"pnc",
	"uri": "http://data.press.net/ontology/classification/"
	},
	{
	"prefix":"pne",
	"uri": "http://data.press.net/ontology/event/"
	},
	{
	"prefix":"pni",
	"uri": "http://data.press.net/ontology/identifier/"
	},
	{
	"prefix":"pns",
	"uri": "http://data.press.net/ontology/stuff/"
	},
	{
	"prefix":"pnt",
	"uri": "http://data.press.net/ontology/tag/"
	},
	{
	"prefix":"po",
	"uri": "http://purl.org/ontology/po/"
	},
	{
	"prefix":"poder",
	"uri": "http://dev.poderopedia.com/vocab/"
	},
	{
	"prefix":"postcode",
	"uri": "http://data.ordnancesurvey.co.uk/ontology/postcode/"
	},
	{
	"prefix":"poste",
	"uri": "http://data.lirmm.fr/ontologies/poste#"
	},
	{
	"prefix":"ppo",
	"uri": "http://vocab.deri.ie/ppo#"
	},
	{
	"prefix":"pr",
	"uri": "http://purl.org/ontology/prv/core#"
	},
	{
	"prefix":"premis",
	"uri": "http://www.loc.gov/premis/rdf/v1#"
	},
	{
	"prefix":"prissma",
	"uri": "http://ns.inria.fr/prissma/v1#"
	},
	{
	"prefix":"pro",
	"uri": "http://purl.org/spar/pro/"
	},
	{
	"prefix":"prov",
	"uri": "http://www.w3.org/ns/prov#"
	},
	{
	"prefix":"prv",
	"uri": "http://purl.org/net/provenance/ns#"
	},
	{
	"prefix":"prvt",
	"uri": "http://purl.org/net/provenance/types#"
	},
	{
	"prefix":"pso",
	"uri": "http://purl.org/spar/pso/"
	},
	{
	"prefix":"psys",
	"uri": "http://www.ontotext.com/proton/protonsys#"
	},
	{
	"prefix":"ptop",
	"uri": "http://www.ontotext.com/proton/protontop#"
	},
	{
	"prefix":"pv",
	"uri": "http://linkedscience.org/pv/ns#"
	},
	{
	"prefix":"pwo",
	"uri": "http://purl.org/spar/pwo/"
	},
	{
	"prefix":"qb",
	"uri": "http://purl.org/linked-data/cube#"
	},
	{
	"prefix":"qu",
	"uri": "http://purl.oclc.org/NET/ssnx/qu/qu#"
	},
	{
	"prefix":"qudt",
	"uri": "http://qudt.org/schema/qudt#"
	},
	{
	"prefix":"quty",
	"uri": "http://www.telegraphis.net/ontology/measurement/quantity#"
	},
	{
	"prefix":"radion",
	"uri": "http://www.w3.org/ns/radion#"
	},
	{
	"prefix":"raul",
	"uri": "http://purl.org/NET/raul#"
	},
	{
	"prefix":"rdafrbr",
	"uri": "http://rdvocab.info/uri/schema/FRBRentitiesRDA/"
	},
	{
	"prefix":"rdag1",
	"uri": "http://rdvocab.info/Elements/"
	},
	{
	"prefix":"rdag2",
	"uri": "http://rdvocab.info/ElementsGr2/"
	},
	{
	"prefix":"rdag3",
	"uri": "http://rdvocab.info/ElementsGr3/"
	},
	{
	"prefix":"rdarel",
	"uri": "http://rdvocab.info/RDARelationshipsWEMI/"
	},
	{
	"prefix":"rdarel2",
	"uri": "http://metadataregistry.org/uri/schema/RDARelationshipsGR2/"
	},
	{
	"prefix":"rdarole",
	"uri": "http://rdvocab.info/roles/"
	},
	{
	"prefix":"rdf",
	"uri": "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
	},
	{
	"prefix":"rdfa",
	"uri":"http://www.w3.org/ns/rdfa#"
	},
	{
	"prefix":"rdfg",
	"uri": "http://www.w3.org/2004/03/trix/rdfg-1/"
	},
	{
	"prefix":"rdfs",
	"uri": "http://www.w3.org/2000/01/rdf-schema#"
	},
	{
	"prefix":"rec",
	"uri": "http://purl.org/ontology/rec/core#"
	},
	{
	"prefix":"reegle",
	"uri": "http://reegle.info/schema#"
	},
	{
	"prefix":"rel",
	"uri": "http://purl.org/vocab/relationship/"
	},
	{
	"prefix":"res",
	"uri": "http://www.medsci.ox.ac.uk/vocab/researchers/0.1/"
	},
	{
	"prefix":"rev",
	"uri": "http://purl.org/stuff/rev#"
	},
	{
	"prefix":"rov",
	"uri": "http://www.w3.org/ns/regorg#"
	},
	{
	"prefix":"rr",
	"uri": "http://www.w3.org/ns/r2rml#"
	},
	{
	"prefix":"rss",
	"uri": "http://purl.org/rss/1.0/"
	},
	{
	"prefix":"ru",
	"uri": "http://purl.org/imbi/ru-meta.owl#"
	},
	{
	"prefix":"s4ac",
	"uri": "http://ns.inria.fr/s4ac/v2#"
	},
	{
	"prefix":"sam",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19156/2011/sampling#"
	},
	{
	"prefix":"sao",
	"uri": "http://salt.semanticauthoring.org/ontologies/sao#"
	},
	{
	"prefix":"sbench",
	"uri": "http://swat.cse.lehigh.edu/onto/univ-bench.owl#"
	},
	{
	"prefix":"schema",
	"uri": "http://schema.org/"
	},
	{
	"prefix":"scip",
	"uri": "http://lod.taxonconcept.org/ontology/sci_people.owl#"
	},
	{
	"prefix":"scoro",
	"uri": "http://purl.org/spar/scoro/"
	},
	{
	"prefix":"scot",
	"uri": "http://rdfs.org/scot/ns#"
	},
	{
	"prefix":"scovo",
	"uri": "http://purl.org/NET/scovo#"
	},
	{
	"prefix":"scsv",
	"uri": "http://purl.org/NET/schema-org-csv#"
	},
	{
	"prefix":"sd",
	"uri": "http://www.w3.org/ns/sparql-service-description#"
	},
	{
	"prefix":"sdmx",
	"uri": "http://purl.org/linked-data/sdmx#"
	},
	{
	"prefix":"sdmx-code",
	"uri": "http://purl.org/linked-data/sdmx/2009/code#"
	},
	{
	"prefix":"sdmx-dimension",
	"uri": "http://purl.org/linked-data/sdmx/2009/dimension#"
	},
	{
	"prefix":"sdo",
	"uri": "http://salt.semanticauthoring.org/ontologies/sdo#"
	},
	{
	"prefix":"search",
	"uri": "http://sindice.com/vocab/search#"
	},
	{
	"prefix":"security",
	"uri": "http://securitytoolbox.appspot.com/securityMain#"
	},
	{
	"prefix":"sem",
	"uri": "http://semanticweb.cs.vu.nl/2009/11/sem/"
	},
	{
	"prefix":"semio",
	"uri": "http://www.lingvoj.org/semio#"
	},
	{
	"prefix":"seq",
	"uri": "http://www.ontologydesignpatterns.org/cp/owl/sequence.owl#"
	},
	{
	"prefix":"sf",
	"uri": "http://www.opengis.net/ont/sf#"
	},
	{
	"prefix":"shw",
	"uri": "http://paul.staroch.name/thesis/SmartHomeWeather.owl#"
	},
	{
	"prefix":"sim",
	"uri": "http://purl.org/ontology/similarity/"
	},
	{
	"prefix":"sio",
	"uri": "http://semanticscience.org/resource/"
	},
	{
	"prefix":"sioc",
	"uri": "http://rdfs.org/sioc/ns#"
	},
	{
	"prefix":"situ",
	"uri": "http://www.ontologydesignpatterns.org/cp/owl/situation.owl#"
	},
	{
	"prefix":"skos",
	"uri": "http://www.w3.org/2004/02/skos/core#"
	},
	{
	"prefix":"skosxl",
	"uri": "http://www.w3.org/2008/05/skos-xl#"
	},
	{
	"prefix":"snarm",
	"uri": "http://rdf.myexperiment.org/ontologies/snarm/"
	},
	{
	"prefix":"sp",
	"uri": "http://spinrdf.org/sp#"
	},
	{
	"prefix":"spatial",
	"uri": "http://geovocab.org/spatial#"
	},
	{
	"prefix":"spcm",
	"uri": "http://spi-fm.uca.es/spdef/models/deployment/spcm/1.0#"
	},
	{
	"prefix":"spfood",
	"uri": "http://kmi.open.ac.uk/projects/smartproducts/ontologies/food.owl#"
	},
	{
	"prefix":"spin",
	"uri": "http://spinrdf.org/spin#"
	},
	{
	"prefix":"sport",
	"uri": "http://purl.org/ontology/sport/"
	},
	{
	"prefix":"spt",
	"uri": "http://spitfire-project.eu/ontology/ns/"
	},
	{
	"prefix":"sql",
	"uri": "http://ns.inria.fr/ast/sql#"
	},
	{
	"prefix":"sro",
	"uri": "http://salt.semanticauthoring.org/ontologies/sro#"
	},
	{
	"prefix":"ssn",
	"uri": "http://purl.oclc.org/NET/ssnx/ssn#"
	},
	{
	"prefix":"stac",
	"uri": "http://securitytoolbox.appspot.com/stac#"
	},
	{
	"prefix":"stories",
	"uri": "http://purl.org/ontology/stories/"
	},
	{
	"prefix":"swc",
	"uri": "http://data.semanticweb.org/ns/swc/ontology#"
	},
	{
	"prefix":"swp",
	"uri": "http://www.w3.org/2004/03/trix/swp-1/"
	},
	{
	"prefix":"swpm",
	"uri": "http://spi-fm.uca.es/spdef/models/deployment/swpm/1.0#"
	},
	{
	"prefix":"swpo",
	"uri": "http://sw-portal.deri.org/ontologies/swportal#"
	},
	{
	"prefix":"swrc",
	"uri": "http://swrc.ontoware.org/ontology#"
	},
	{
	"prefix":"swrl",
	"uri": "http://www.w3.org/2003/11/swrl#"
	},
	{
	"prefix":"tac",
	"uri": "http://ns.bergnet.org/tac/0.1/triple-access-control#"
	},
	{
	"prefix":"tag",
	"uri": "http://www.holygoat.co.uk/owl/redwood/0.1/tags/"
	},
	{
	"prefix":"tao",
	"uri": "http://vocab.deri.ie/tao#"
	},
	{
	"prefix":"taxon",
	"uri": "http://purl.org/biodiversity/taxon/"
	},
	{
	"prefix":"tddo",
	"uri": "http://databugger.aksw.org/ns/core#"
	},
	{
	"prefix":"te",
	"uri": "http://www.w3.org/2006/time-entry#"
	},
	{
	"prefix":"teach",
	"uri": "http://linkedscience.org/teach/ns#"
	},
	{
	"prefix":"test",
	"uri": "http://www.w3.org/2006/03/test-description#"
	},
	{
	"prefix":"theatre",
	"uri": "http://purl.org/theatre#"
	},
	{
	"prefix":"thors",
	"uri": "http://resource.geosciml.org/ontology/timescale/thors#"
	},
	{
	"prefix":"ti",
	"uri": "http://www.ontologydesignpatterns.org/cp/owl/timeinterval.owl#"
	},
	{
	"prefix":"time",
	"uri": "http://www.w3.org/2006/time#"
	},
	{
	"prefix":"tio",
	"uri": "http://purl.org/tio/ns#"
	},
	{
	"prefix":"tipr",
	"uri": "http://www.ontologydesignpatterns.org/cp/owl/timeindexedpersonrole.owl#"
	},
	{
	"prefix":"tis",
	"uri": "http://www.ontologydesignpatterns.org/cp/owl/timeindexedsituation.owl#"
	},
	{
	"prefix":"tisc",
	"uri": "http://observedchange.com/tisc/ns#"
	},
	{
	"prefix":"tl",
	"uri": "http://purl.org/NET/c4dm/timeline.owl#"
	},
	{
	"prefix":"tm",
	"uri": "http://def.seegrid.csiro.au/isotc211/iso19108/2002/temporal#"
	},
	{
	"prefix":"tmo",
	"uri": "http://www.w3.org/2001/sw/hcls/ns/transmed/"
	},
	{
	"prefix":"traffic",
	"uri": "http://www.sensormeasurement.appspot.com/ont/transport/traffic#"
	},
	{
	"prefix":"transit",
	"uri": "http://vocab.org/transit/terms/"
	},
	{
	"prefix":"tsioc",
	"uri": "http://rdfs.org/sioc/types#"
	},
	{
	"prefix":"turismo",
	"uri": "http://idi.fundacionctic.org/cruzar/turismo#"
	},
	{
	"prefix":"tvc",
	"uri": "http://www.essepuntato.it/2012/04/tvc/"
	},
	{
	"prefix":"txn",
	"uri": "http://lod.taxonconcept.org/ontology/txn.owl#"
	},
	{
	"prefix":"tzont",
	"uri": "http://www.w3.org/2006/timezone#"
	},
	{
	"prefix":"uco",
	"uri": "http://purl.org/uco/ns#"
	},
	{
	"prefix":"ui",
	"uri": "http://www.w3.org/ns/ui#"
	},
	{
	"prefix":"umbel",
	"uri": "http://umbel.org/umbel#"
	},
	{
	"prefix":"uniprot",
	"uri": "http://purl.uniprot.org/core/"
	},
	{
	"prefix":"uri4uri",
	"uri": "http://uri4uri.net/vocab#"
	},
	{
	"prefix":"user",
	"uri": "http://schemas.talis.com/2005/user/schema#"
	},
	{
	"prefix":"va",
	"uri": "http://code-research.eu/ontology/visual-analytics#"
	},
	{
	"prefix":"vaem",
	"uri": "http://www.linkedmodel.org/schema/vaem#"
	},
	{
	"prefix":"vann",
	"uri": "http://purl.org/vocab/vann/"
	},
	{
	"prefix":"vcard",
	"uri": "http://www.w3.org/2006/vcard/ns#"
	},
	{
	"prefix":"vdpp",
	"uri": "http://data.lirmm.fr/ontologies/vdpp#"
	},
	{
	"prefix":"vin",
	"uri": "http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#"
	},
	{
	"prefix":"vivo",
	"uri": "http://vivoweb.org/ontology/core#"
	},
	{
	"prefix":"vmm",
	"uri": "http://spi-fm.uca.es/spdef/models/genericTools/vmm/1.0#"
	},
	{
	"prefix":"voaf",
	"uri": "http://purl.org/vocommons/voaf#"
	},
	{
	"prefix":"voag",
	"uri": "http://voag.linkedmodel.org/voag#"
	},
	{
	"prefix":"void",
	"uri": "http://rdfs.org/ns/void#"
	},
	{
	"prefix":"vra",
	"uri": "http://simile.mit.edu/2003/10/ontologies/vraCore3#"
	},
	{
	"prefix":"vrank",
	"uri": "http://purl.org/voc/vrank#"
	},
	{
	"prefix":"vs",
	"uri": "http://www.w3.org/2003/06/sw-vocab-status/ns#"
	},
	{
	"prefix":"vso",
	"uri": "http://purl.org/vso/ns#"
	},
	{
	"prefix":"vvo",
	"uri": "http://purl.org/vvo/ns#"
	},
	{
	"prefix":"wai",
	"uri": "http://purl.org/wai#"
	},
	{
	"prefix":"wdrs",
	"uri": "http://www.w3.org/2007/05/powder-s#"
	},
	{
	"prefix":"wf-invoc",
	"uri": "http://purl.org/net/wf-invocation#"
	},
	{
	"prefix":"wfm",
	"uri": "http://purl.org/net/wf-motifs#"
	},
	{
	"prefix":"wgs84",
	"uri": "http://www.w3.org/2003/01/geo/wgs84_pos#"
	},
	{
	"prefix":"whisky",
	"uri": "http://vocab.org/whisky/terms/"
	},
	{
	"prefix":"whois",
	"uri": "http://www.kanzaki.com/ns/whois#"
	},
	{
	"prefix":"wi",
	"uri": "http://purl.org/ontology/wi/core#"
	},
	{
	"prefix":"wikim",
	"uri": "http://spi-fm.uca.es/spdef/models/genericTools/wikim/1.0#"
	},
	{
	"prefix":"wl",
	"uri": "http://www.wsmo.org/ns/wsmo-lite#"
	},
	{
	"prefix":"wlo",
	"uri": "http://purl.org/ontology/wo/"
	},
	{
	"prefix":"wo",
	"uri": "http://purl.org/ontology/wo/core#"
	},
	{
	"prefix":"wot",
	"uri": "http://xmlns.com/wot/0.1/"
	},
	{
	"prefix":"xhv",
	"uri": "http://www.w3.org/1999/xhtml/vocab#"
	},
	{
	"prefix":"xkos",
	"uri": "http://rdf-vocabulary.ddialliance.org/xkos#"
	},
	{
	"prefix":"xsd",
	"uri": "http://www.w3.org/2001/XMLSchema#"
	},
	{
	"prefix":"zbwext",
	"uri": "http://zbw.eu/namespaces/zbw-extensions/"
	}
];

/*
Blacklist of prefixes:

Consists of certain vocabularies in the LOV (Linked Open Vocabularies) database.
Followinc categories of vocabularies (voaf:VocabularySpace) were included in this blacklist:
lov:WHERE
lov:WHEN
lov:WEB
lov:TAG
lov:UPMETA
lov:GEOMETRY
lov:KOS
lov:FRBR
lov:GRAPH
lov:MISC
lov:SSDESK
lov:UPPER

*/
var excludedPrefixes =
["acl", "ad", "akts", "algo", "am", "ao", "api", "apps4X", "awol", "bbccms", "bbccore", "cal", "cdm", "cmo", "cnt",
"cogs", "coll", "conversion", "coun", "crm", "ct", "ctag", "d2rq", "dady", "dcam", "dctype", "decision", "dl", "dr",
"drm", "dsn", "dso", "dtype", "dul", "dvia", "ends", "ext", "frad", "frbr", "frbre", "fresnel", "g50k", "geo",
"geo-1-0", "geod", "geof", "geop", "geos", "gf", "gm", "gml", "gn", "grddl", "gso", "gts", "hdo", "hr", "http",
"identity", "igeo", "infor", "interval", "iol", "is", "itm", "label", "lcy", "ldp", "lemon", "lexinfo", "lgdo","li",
"lingvo", "lmf", "lmm1", "lmm2", "loc", "locn", "log", "lvont", "marl", "maso", "moat", "mrel", "msm", "muto","nao",
"ncal", "nco", "nfo", "ngeo", "nie", "nif", "nrl", "ntag", "odapp", "odapps", "odpart", "og", "olo", "om","ontopic",
"ontosec", "onyx", "osadm", "oslc", "osr", "osspr", "ostop", "ov", "owl", "pext", "phdd", "pkm", "place","pni", "pnt",
"postcode", "ppo", "pr", "prissma", "psys", "ptop", "raul", "rdafrbr", "rdag1", "rdag2", "rdag3","rdarel", "rdarel2",
"rdarole", "rdf", "rdfa", "rdfg", "rdfs", "rr", "rss", "s4ac", "sbench", "schema", "scot","scsv","sd", "search",
"security", "semio", "seq", "sf", "sim", "skos", "skosxl", "snarm", "sp", "spatial", "spcm","spin", "sql", "stac",
"swp", "swpm", "swrl", "tac", "tag", "te", "thors", "ti", "time", "tipr", "tis", "tl", "tm","tvc", "tzont", "ui",
"umbel", "uri4uri", "user", "vmm", "wdrs", "wgs84", "wikim", "wl", "xhv", "xkos", "xsd", "zbwext"];
