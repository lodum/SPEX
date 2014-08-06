
function SPEXQuery(){ 
this.limit(50); 
this.timeout = 50000;
this.fe = new FilterExpander();
this.le = new LiteralExpander();
this.SPEXvariables = [];
this.variablelabels = [];

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


SPEXQuery.prototype = $.sparql("http://www.example.com/sparql/");
SPEXQuery.prototype.constructor = SPEXQuery;
SPEXQuery.prototype.spatialConstraints = {};
SPEXQuery.prototype.temporalConstraints = {};


//a standard list of prefixes
/*
SPEXQuery.prototype.prefix("acco" , "http://purl.org/acco/ns#");
SPEXQuery.prototype.prefix("acl" , "http://www.w3.org/ns/auth/acl#");
SPEXQuery.prototype.prefix("acm" , "http://www.rkbexplorer.com/ontologies/acm#");
SPEXQuery.prototype.prefix("acrt" , "http://privatealpha.com/ontology/certification/1#");
SPEXQuery.prototype.prefix("ad" , "http://schemas.talis.com/2005/address/schema#");
SPEXQuery.prototype.prefix("adms" , "http://www.w3.org/ns/adms#");
SPEXQuery.prototype.prefix("af" , "http://purl.org/ontology/af/");
SPEXQuery.prototype.prefix("agls" , "http://www.agls.gov.au/agls/terms#");
SPEXQuery.prototype.prefix("agrelon" , "http://d-nb.info/standards/elementset/agrelon.owl#");
SPEXQuery.prototype.prefix("aiiso" , "http://purl.org/vocab/aiiso/schema#");
SPEXQuery.prototype.prefix("akt" , "http://www.aktors.org/ontology/portal#");
SPEXQuery.prototype.prefix("akts" , "http://www.aktors.org/ontology/support#");
SPEXQuery.prototype.prefix("algo" , "http://securitytoolbox.appspot.com/securityAlgorithms#");
SPEXQuery.prototype.prefix("am" , "http://open-services.net/ns/asset#");
SPEXQuery.prototype.prefix("ao" , "http://purl.org/ontology/ao/core#");
SPEXQuery.prototype.prefix("aos" , "http://rdf.muninn-project.org/ontologies/appearances#");
SPEXQuery.prototype.prefix("api" , "http://purl.org/linked-data/api/vocab#");
SPEXQuery.prototype.prefix("arch" , "http://purl.org/archival/vocab/arch#");
SPEXQuery.prototype.prefix("awol" , "http://bblfish.net/work/atom-owl/2006-06-06/");
SPEXQuery.prototype.prefix("aws" , "http://purl.oclc.org/NET/ssnx/meteo/aws#");
SPEXQuery.prototype.prefix("b2bo" , "http://purl.org/b2bo#");
SPEXQuery.prototype.prefix("basic" , "http://def.seegrid.csiro.au/isotc211/iso19103/2005/basic#");
SPEXQuery.prototype.prefix("bbcprov" , "http://www.bbc.co.uk/ontologies/provenance#");
SPEXQuery.prototype.prefix("being" , "http://purl.org/ontomedia/ext/common/being#");
SPEXQuery.prototype.prefix("bevon" , "http://rdfs.co/bevon/");
SPEXQuery.prototype.prefix("bibo" , "http://purl.org/ontology/bibo/");
SPEXQuery.prototype.prefix("bibtex" , "http://purl.org/net/nknouf/ns/bibtex#");
SPEXQuery.prototype.prefix("bio" , "http://purl.org/vocab/bio/0.1/");
SPEXQuery.prototype.prefix("biol" , "http://purl.org/NET/biol/ns#");
SPEXQuery.prototype.prefix("biopax" , "http://www.biopax.org/release/biopax-level3.owl#");
SPEXQuery.prototype.prefix("biotop" , "http://purl.org/biotop/biotop.owl#");
SPEXQuery.prototype.prefix("biro" , "http://purl.org/spar/biro#");
SPEXQuery.prototype.prefix("blt" , "http://www.bl.uk/schemas/bibliographic/blterms#");
SPEXQuery.prototype.prefix("botany" , "http://purl.org/NET/biol/botany#");
SPEXQuery.prototype.prefix("br" , "http://vocab.deri.ie/br#");
SPEXQuery.prototype.prefix("c4n" , "http://vocab.deri.ie/c4n#");
SPEXQuery.prototype.prefix("c4o" , "http://purl.org/spar/c4o#");
SPEXQuery.prototype.prefix("cal" , "http://www.w3.org/2002/12/cal/ical#");
SPEXQuery.prototype.prefix("cc" , "http://creativecommons.org/ns#");
SPEXQuery.prototype.prefix("cco" , "http://purl.org/ontology/cco/core#");
SPEXQuery.prototype.prefix("cdm" , "http://purl.org/twc/ontology/cdm.owl#");
SPEXQuery.prototype.prefix("cdtype" , "http://purl.org/cld/cdtype/");
SPEXQuery.prototype.prefix("ceo" , "http://www.ebusiness-unibw.org/ontologies/consumerelectronics/v1#");
SPEXQuery.prototype.prefix("cert" , "http://www.w3.org/ns/auth/cert#");
SPEXQuery.prototype.prefix("cgov" , "http://reference.data.gov.uk/def/central-government#");
SPEXQuery.prototype.prefix("chord" , "http://purl.org/ontology/chord/");
SPEXQuery.prototype.prefix("cito" , "http://purl.org/spar/cito/");
SPEXQuery.prototype.prefix("citof" , "http://www.essepuntato.it/2013/03/cito-functions#");
SPEXQuery.prototype.prefix("cld" , "http://purl.org/cld/terms/");
SPEXQuery.prototype.prefix("cmo" , "http://purl.org/twc/ontologies/cmo.owl#");
SPEXQuery.prototype.prefix("cnt" , "http://www.w3.org/2011/content#");
SPEXQuery.prototype.prefix("co" , "http://purl.org/ontology/co/core#");
SPEXQuery.prototype.prefix("cogs" , "http://vocab.deri.ie/cogs#");
SPEXQuery.prototype.prefix("cold" , "http://purl.org/configurationontology#");
SPEXQuery.prototype.prefix("coll" , "http://purl.org/co#");
SPEXQuery.prototype.prefix("comm" , "http://vocab.resc.info/communication#");
SPEXQuery.prototype.prefix("con" , "http://www.w3.org/2000/10/swap/pim/contact#");
SPEXQuery.prototype.prefix("conversion" , "http://purl.org/twc/vocab/conversion/");
SPEXQuery.prototype.prefix("coo" , "http://purl.org/coo/ns#");
SPEXQuery.prototype.prefix("coun" , "http://www.daml.org/2001/09/countries/iso-3166-ont#");
SPEXQuery.prototype.prefix("cpa" , "http://www.ontologydesignpatterns.org/schemas/cpannotationschema.owl#");
SPEXQuery.prototype.prefix("crm" , "http://www.cidoc-crm.org/cidoc-crm/");
SPEXQuery.prototype.prefix("cro" , "http://rhizomik.net/ontologies/copyrightonto.owl#");
SPEXQuery.prototype.prefix("crsw" , "http://courseware.rkbexplorer.com/ontologies/courseware#");
SPEXQuery.prototype.prefix("cs" , "http://purl.org/vocab/changeset/schema#");
SPEXQuery.prototype.prefix("csp" , "http://vocab.deri.ie/csp#");
SPEXQuery.prototype.prefix("ct" , "http://www.tele.pw.edu.pl/~sims-onto/ConnectivityType.owl#");
SPEXQuery.prototype.prefix("ctag" , "http://commontag.org/ns#");
SPEXQuery.prototype.prefix("ctorg" , "http://purl.org/ctic/infraestructuras/organizacion#");
SPEXQuery.prototype.prefix("d2rq" , "http://www.wiwiss.fu-berlin.de/suhl/bizer/D2RQ/0.1#");
SPEXQuery.prototype.prefix("dady" , "http://vocab.deri.ie/dady#");
SPEXQuery.prototype.prefix("daia" , "http://purl.org/ontology/daia#");
SPEXQuery.prototype.prefix("dcam" , "http://purl.org/dc/dcam/");
SPEXQuery.prototype.prefix("dcat" , "http://www.w3.org/ns/dcat#");
*/
SPEXQuery.prototype.prefix("dc" , "http://purl.org/dc/elements/1.1/");
/*
SPEXQuery.prototype.prefix("dcite" , "http://purl.org/spar/datacite#");
SPEXQuery.prototype.prefix("dcndl" , "http://ndl.go.jp/dcndl/terms/");
*/
SPEXQuery.prototype.prefix("dct" , "http://purl.org/dc/terms/");

SPEXQuery.prototype.prefix("maps", "http://www.geographicknowledge.de/vocab/maps#"); 
/*
SPEXQuery.prototype.prefix("dctype" , "http://purl.org/dc/dcmitype/");
SPEXQuery.prototype.prefix("deo" , "http://purl.org/spar/deo#");
SPEXQuery.prototype.prefix("dicom" , "http://purl.org/healthcarevocab/v1#");
SPEXQuery.prototype.prefix("dir" , "http://schemas.talis.com/2005/dir/schema#");
SPEXQuery.prototype.prefix("disco" , "http://rdf-vocabulary.ddialliance.org/discovery#");
SPEXQuery.prototype.prefix("dl" , "http://ontologydesignpatterns.org/ont/dolce/DOLCE2.0-Lite-v5.owl#");
SPEXQuery.prototype.prefix("doap" , "http://usefulinc.com/ns/doap#");
SPEXQuery.prototype.prefix("doc" , "http://www.w3.org/2000/10/swap/pim/doc#");
SPEXQuery.prototype.prefix("doco" , "http://purl.org/spar/doco#");
SPEXQuery.prototype.prefix("docso" , "http://purl.org/ontology/dso#");
SPEXQuery.prototype.prefix("dogont" , "http://elite.polito.it/ontologies/dogont.owl#");
SPEXQuery.prototype.prefix("dq" , "http://def.seegrid.csiro.au/isotc211/iso19115/2003/dataquality#");
SPEXQuery.prototype.prefix("dqm" , "http://purl.org/dqm-vocabulary/v1/dqm#");
SPEXQuery.prototype.prefix("dr" , "http://purl.org/swan/2.0/discourse-relationships/");
SPEXQuery.prototype.prefix("drm" , "http://vocab.data.gov/def/drm#");
SPEXQuery.prototype.prefix("ds" , "http://purl.org/ctic/dcat#");
SPEXQuery.prototype.prefix("dsn" , "http://purl.org/dsnotify/vocab/eventset/");
SPEXQuery.prototype.prefix("dso" , "http://inference-web.org/2.0/ds.owl#");
SPEXQuery.prototype.prefix("dtype" , "http://www.linkedmodel.org/schema/dtype#");
SPEXQuery.prototype.prefix("dul" , "http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#");
SPEXQuery.prototype.prefix("dvia" , "http://purl.org/ontology/dvia#");
SPEXQuery.prototype.prefix("eac-cpf" , "http://archivi.ibc.regione.emilia-romagna.it/ontology/eac-cpf/");
SPEXQuery.prototype.prefix("earl" , "http://www.w3.org/ns/earl#");
SPEXQuery.prototype.prefix("ebucore" , "http://www.ebu.ch/metadata/ontologies/ebucore/ebucore#");
SPEXQuery.prototype.prefix("edm" , "http://www.europeana.eu/schemas/edm/");
SPEXQuery.prototype.prefix("elec" , "http://purl.org/ctic/sector-publico/elecciones#");
SPEXQuery.prototype.prefix("emotion" , "http://ns.inria.fr/emoca#");
SPEXQuery.prototype.prefix("emp" , "http://purl.org/ctic/empleo/oferta#");
SPEXQuery.prototype.prefix("ends" , "http://labs.mondeca.com/vocab/endpointStatus#");
SPEXQuery.prototype.prefix("ep" , "http://eprints.org/ontology/");
SPEXQuery.prototype.prefix("event" , "http://purl.org/NET/c4dm/event.owl#");
SPEXQuery.prototype.prefix("ex" , "http://purl.org/net/ns/ex#");
SPEXQuery.prototype.prefix("exif" , "http://www.w3.org/2003/12/exif/ns#");
SPEXQuery.prototype.prefix("ext" , "http://def.seegrid.csiro.au/isotc211/iso19115/2003/extent#");
SPEXQuery.prototype.prefix("fabio" , "http://purl.org/spar/fabio/");
SPEXQuery.prototype.prefix("fea" , "http://vocab.data.gov/def/fea#");
SPEXQuery.prototype.prefix("fn" , "http://www.w3.org/2005/xpath-functions#");
*/
SPEXQuery.prototype.prefix("foaf" , "http://xmlns.com/foaf/0.1/");
SPEXQuery.prototype.prefix("dbp-ont" , "http://dbpedia.org/ontology/");
SPEXQuery.prototype.prefix("dbp" , "http://dbpedia.org/resource/");
SPEXQuery.prototype.prefix("dbp-prop" , "http://dbpedia.org/property/");      
      
/*
SPEXQuery.prototype.prefix("food" , "http://data.lirmm.fr/ontologies/food#");
SPEXQuery.prototype.prefix("fowl" , "http://www.w3.org/TR/2003/PR-owl-guide-20031215/food#");
SPEXQuery.prototype.prefix("frad" , "http://iflastandards.info/ns/fr/frad/");
SPEXQuery.prototype.prefix("frapo" , "http://purl.org/cerif/frapo/");
SPEXQuery.prototype.prefix("frbr" , "http://purl.org/vocab/frbr/core#");
SPEXQuery.prototype.prefix("frbre" , "http://purl.org/vocab/frbr/extended#");
SPEXQuery.prototype.prefix("fresnel" , "http://www.w3.org/2004/09/fresnel#");
SPEXQuery.prototype.prefix("g50k" , "http://data.ordnancesurvey.co.uk/ontology/50kGazetteer/");
SPEXQuery.prototype.prefix("game" , "http://data.totl.net/game/");
SPEXQuery.prototype.prefix("gastro" , "http://www.ebsemantics.net/doc/gastro#");
SPEXQuery.prototype.prefix("gc" , "http://www.oegov.org/core/owl/gc#");
SPEXQuery.prototype.prefix("gd" , "http://vocab.data.gov/gd#");
SPEXQuery.prototype.prefix("gen" , "http://purl.org/gen/0.1#");
*/
SPEXQuery.prototype.prefix("geo" , "http://www.opengis.net/ont/geosparql#");
/*
SPEXQuery.prototype.prefix("geod" , "http://vocab.lenka.no/geo-deling#");
SPEXQuery.prototype.prefix("geof" , "http://www.mindswap.org/2003/owl/geo/geoFeatures20040307.owl#");
SPEXQuery.prototype.prefix("geop" , "http://aims.fao.org/aos/geopolitical.owl#");
SPEXQuery.prototype.prefix("geos" , "http://www.telegraphis.net/ontology/geography/geography#");
SPEXQuery.prototype.prefix("geosp" , "http://rdf.geospecies.org/ont/geospecies#");
SPEXQuery.prototype.prefix("gf" , "http://def.seegrid.csiro.au/isotc211/iso19109/2005/feature#");
SPEXQuery.prototype.prefix("gm" , "http://def.seegrid.csiro.au/isotc211/iso19107/2003/geometry#");
SPEXQuery.prototype.prefix("gml" , "http://www.opengis.net/ont/gml#");
SPEXQuery.prototype.prefix("gn" , "http://www.geonames.org/ontology#");
SPEXQuery.prototype.prefix("gndo" , "http://d-nb.info/standards/elementset/gnd#");
SPEXQuery.prototype.prefix("gold" , "http://purl.org/linguistics/gold#");
SPEXQuery.prototype.prefix("gr" , "http://purl.org/goodrelations/v1#");
SPEXQuery.prototype.prefix("grddl" , "http://www.w3.org/2003/g/data-view#");
SPEXQuery.prototype.prefix("gso" , "http://www.w3.org/2006/gen/ont#");
SPEXQuery.prototype.prefix("gts" , "http://resource.geosciml.org/ontology/timescale/gts#");
SPEXQuery.prototype.prefix("h2o" , "http://def.seegrid.csiro.au/isotc211/iso19150/-2/2012/basic#");
SPEXQuery.prototype.prefix("hdo" , "http://www.samos.gr/ontologies/helpdeskOnto.owl#");
SPEXQuery.prototype.prefix("homeActivity" , "http://sensormeasurement.appspot.com/ont/home/homeActivity#");
SPEXQuery.prototype.prefix("homeWeather" , "https://www.auto.tuwien.ac.at/downloads/thinkhome/ontology/WeatherOntology.owl#");
SPEXQuery.prototype.prefix("hr" , "http://iserve.kmi.open.ac.uk/ns/hrests#");
SPEXQuery.prototype.prefix("http" , "http://www.w3.org/2011/http#");
SPEXQuery.prototype.prefix("idemo" , "http://rdf.insee.fr/def/demo#");
SPEXQuery.prototype.prefix("identity" , "http://www.ecole.ensicaen.fr/~vincentj/owl/id.owl#");
SPEXQuery.prototype.prefix("igeo" , "http://rdf.insee.fr/def/geo#");
SPEXQuery.prototype.prefix("imtlo" , "http://www.ics.forth.gr/isl/MarineTLO/v3/marinetloimarine.owl#");
SPEXQuery.prototype.prefix("infor" , "http://www.ontologydesignpatterns.org/cp/owl/informationrealization.owl#");
SPEXQuery.prototype.prefix("inno" , "http://purl.org/innovation/ns#");
SPEXQuery.prototype.prefix("interval" , "http://reference.data.gov.uk/def/intervals#");
SPEXQuery.prototype.prefix("iol" , "http://www.ontologydesignpatterns.org/ont/dul/IOLite.owl#");
SPEXQuery.prototype.prefix("irw" , "http://www.ontologydesignpatterns.org/ont/web/irw.owl#");
SPEXQuery.prototype.prefix("is" , "http://purl.org/ontology/is/core#");
SPEXQuery.prototype.prefix("isbd" , "http://iflastandards.info/ns/isbd/elements/");
SPEXQuery.prototype.prefix("itm" , "http://spi-fm.uca.es/spdef/models/genericTools/itm/1.0#");
SPEXQuery.prototype.prefix("itsmo" , "http://ontology.it/itsmo/v1#");
SPEXQuery.prototype.prefix("kdo" , "http://kdo.render-project.eu/kdo#");
SPEXQuery.prototype.prefix("keys" , "http://purl.org/NET/c4dm/keys.owl#");
SPEXQuery.prototype.prefix("label" , "http://purl.org/net/vocab/2004/03/label#");
SPEXQuery.prototype.prefix("lcy" , "http://purl.org/vocab/lifecycle/schema#");
SPEXQuery.prototype.prefix("ldp" , "http://www.w3.org/ns/ldp#");
SPEXQuery.prototype.prefix("ldr" , "http://purl.oclc.org/NET/ldr/ns#");
SPEXQuery.prototype.prefix("lemon" , "http://www.monnet-project.eu/lemon#");
SPEXQuery.prototype.prefix("lexinfo" , "http://www.lexinfo.net/ontology/2.0/lexinfo#");
SPEXQuery.prototype.prefix("lgdo" , "http://linkedgeodata.org/ontology#");
SPEXQuery.prototype.prefix("li" , "http://def.seegrid.csiro.au/isotc211/iso19115/2003/lineage#");
SPEXQuery.prototype.prefix("lib" , "http://purl.org/library/");
SPEXQuery.prototype.prefix("limo" , "http://www.purl.org/limo-ontology/limo#");
SPEXQuery.prototype.prefix("limoo" , "http://purl.org/LiMo/0.1#");
SPEXQuery.prototype.prefix("lingvo" , "http://www.lingvoj.org/ontology#");
SPEXQuery.prototype.prefix("lio" , "http://purl.org/net/lio#");
SPEXQuery.prototype.prefix("lmf" , "http://www.lexinfo.net/lmf#");
SPEXQuery.prototype.prefix("lmm1" , "http://www.ontologydesignpatterns.org/ont/lmm/LMM_L1.owl#");
SPEXQuery.prototype.prefix("lmm2" , "http://www.ontologydesignpatterns.org/ont/lmm/LMM_L2.owl#");
SPEXQuery.prototype.prefix("loc" , "http://purl.org/ctic/infraestructuras/localizacion#");
SPEXQuery.prototype.prefix("locah" , "http://data.archiveshub.ac.uk/def/");
SPEXQuery.prototype.prefix("locn" , "http://www.w3.org/ns/locn#");
SPEXQuery.prototype.prefix("lode" , "http://linkedevents.org/ontology/");
SPEXQuery.prototype.prefix("log" , "http://www.w3.org/2000/10/swap/log#");
SPEXQuery.prototype.prefix("loted" , "http://loted.eu/ontology#");
SPEXQuery.prototype.prefix("lov" , "http://lov.okfn.org/dataset/lov/lov#");
SPEXQuery.prototype.prefix("lsc" , "http://linkedscience.org/lsc/ns#");
SPEXQuery.prototype.prefix("lv" , "http://purl.org/lobid/lv#");
SPEXQuery.prototype.prefix("lvont" , "http://lexvo.org/ontology#");
SPEXQuery.prototype.prefix("lyou" , "http://purl.org/linkingyou/");
SPEXQuery.prototype.prefix("ma-ont" , "http://www.w3.org/ns/ma-ont#");
SPEXQuery.prototype.prefix("mads" , "http://www.loc.gov/mads/rdf/v1#");
SPEXQuery.prototype.prefix("marl" , "http://www.gsi.dit.upm.es/ontologies/marl/ns#");
SPEXQuery.prototype.prefix("maso" , "http://securitytoolbox.appspot.com/MASO#");
SPEXQuery.prototype.prefix("meb" , "http://rdf.myexperiment.org/ontologies/base/");
SPEXQuery.prototype.prefix("media" , "http://purl.org/media#");
SPEXQuery.prototype.prefix("mil" , "http://rdf.muninn-project.org/ontologies/military#");
SPEXQuery.prototype.prefix("mo" , "http://purl.org/ontology/mo/");
SPEXQuery.prototype.prefix("moac" , "http://www.observedchange.com/moac/ns#");
SPEXQuery.prototype.prefix("moat" , "http://moat-project.org/ns#");
SPEXQuery.prototype.prefix("mrel" , "http://id.loc.gov/vocabulary/relators#");
SPEXQuery.prototype.prefix("msm" , "http://iserve.kmi.open.ac.uk/ns/msm#");
SPEXQuery.prototype.prefix("msr" , "http://www.telegraphis.net/ontology/measurement/measurement#");
SPEXQuery.prototype.prefix("muo" , "http://purl.oclc.org/NET/muo/muo#");
SPEXQuery.prototype.prefix("music" , "http://www.kanzaki.com/ns/music#");
SPEXQuery.prototype.prefix("muto" , "http://purl.org/muto/core#");
SPEXQuery.prototype.prefix("mvco" , "http://purl.oclc.org/NET/mvco.owl#");
SPEXQuery.prototype.prefix("nao" , "http://www.semanticdesktop.org/ontologies/2007/08/15/nao#");
SPEXQuery.prototype.prefix("ncal" , "http://www.semanticdesktop.org/ontologies/2007/04/02/ncal#");
SPEXQuery.prototype.prefix("nco" , "http://www.semanticdesktop.org/ontologies/2007/03/22/nco#");
SPEXQuery.prototype.prefix("nfo" , "http://www.semanticdesktop.org/ontologies/nfo#");
SPEXQuery.prototype.prefix("ngeo" , "http://geovocab.org/geometry#");
SPEXQuery.prototype.prefix("nie" , "http://www.semanticdesktop.org/ontologies/2007/01/19/nie#");
SPEXQuery.prototype.prefix("nif" , "http://persistence.uni-leipzig.org/nlp2rdf/ontologies/nif-core#");
SPEXQuery.prototype.prefix("npg" , "http://ns.nature.com/terms/");
SPEXQuery.prototype.prefix("nrl" , "http://www.semanticdesktop.org/ontologies/2007/08/15/nrl#");
SPEXQuery.prototype.prefix("nsl" , "http://purl.org/ontology/storyline#");
SPEXQuery.prototype.prefix("ntag" , "http://ns.inria.fr/nicetag/2010/09/09/voc#");
SPEXQuery.prototype.prefix("oa" , "http://www.w3.org/ns/oa#");
SPEXQuery.prototype.prefix("oad" , "http://lod.xdams.org/reload/oad#");
SPEXQuery.prototype.prefix("oan" , "http://data.lirmm.fr/ontologies/oan#");
SPEXQuery.prototype.prefix("obsm" , "http://rdf.geospecies.org/methods/observationMethod.rdf#");
SPEXQuery.prototype.prefix("oc" , "http://purl.org/ontomedia/core/expression#");
SPEXQuery.prototype.prefix("ocd" , "http://dati.camera.it/ocd/");
SPEXQuery.prototype.prefix("odapp" , "http://vocab.deri.ie/odapp#");
SPEXQuery.prototype.prefix("odpart" , "http://www.ontologydesignpatterns.org/cp/owl/participation.owl#");
SPEXQuery.prototype.prefix("odrs" , "http://schema.theodi.org/odrs#");
SPEXQuery.prototype.prefix("odv" , "http://reference.data.gov.uk/def/organogram#");
SPEXQuery.prototype.prefix("oecc" , "http://www.oegov.org/core/owl/cc#");
SPEXQuery.prototype.prefix("og" , "http://ogp.me/ns#");
SPEXQuery.prototype.prefix("olca" , "http://www.lingvoj.org/olca#");
SPEXQuery.prototype.prefix("olo" , "http://purl.org/ontology/olo/core#");
SPEXQuery.prototype.prefix("om" , "http://def.seegrid.csiro.au/isotc211/iso19156/2011/observation#");
SPEXQuery.prototype.prefix("ont" , "http://purl.org/net/ns/ontology-annot#");
SPEXQuery.prototype.prefix("ontopic" , "http://www.ontologydesignpatterns.org/ont/dul/ontopic.owl#");
SPEXQuery.prototype.prefix("ontosec" , "http://www.semanticweb.org/ontologies/2008/11/OntologySecurity.owl#");
SPEXQuery.prototype.prefix("onyx" , "http://www.gsi.dit.upm.es/ontologies/onyx/ns#");
SPEXQuery.prototype.prefix("oo" , "http://purl.org/openorg/");
SPEXQuery.prototype.prefix("op" , "http://environment.data.gov.au/def/op#");
SPEXQuery.prototype.prefix("opmo" , "http://openprovenance.org/model/opmo#");
SPEXQuery.prototype.prefix("opmv" , "http://purl.org/net/opmv/ns#");
SPEXQuery.prototype.prefix("opmw" , "http://www.opmw.org/ontology/");
SPEXQuery.prototype.prefix("opo" , "http://online-presence.net/opo/ns#");
SPEXQuery.prototype.prefix("opus" , "http://lsdis.cs.uga.edu/projects/semdis/opus#");
SPEXQuery.prototype.prefix("ore" , "http://www.openarchives.org/ore/terms/");
SPEXQuery.prototype.prefix("org" , "http://www.w3.org/ns/org#");
SPEXQuery.prototype.prefix("osadm" , "http://data.ordnancesurvey.co.uk/ontology/admingeo/");
SPEXQuery.prototype.prefix("osgeom" , "http://data.ordnancesurvey.co.uk/ontology/geometry/");
SPEXQuery.prototype.prefix("oslc" , "http://open-services.net/ns/core#");
SPEXQuery.prototype.prefix("oslo" , "http://purl.org/oslo/ns/localgov#");
SPEXQuery.prototype.prefix("osp" , "http://data.lirmm.fr/ontologies/osp#");
SPEXQuery.prototype.prefix("osr" , "http://purl.org/ontomedia/core/space#");
SPEXQuery.prototype.prefix("osspr" , "http://data.ordnancesurvey.co.uk/ontology/spatialrelations/");
SPEXQuery.prototype.prefix("ostop" , "http://www.ordnancesurvey.co.uk/ontology/Topography/v0.1/Topography.owl#");
SPEXQuery.prototype.prefix("ov" , "http://open.vocab.org/terms#");
SPEXQuery.prototype.prefix("owl" , "http://www.w3.org/2002/07/owl#");
SPEXQuery.prototype.prefix("p-plan" , "http://purl.org/net/p-plan#");
SPEXQuery.prototype.prefix("parl" , "http://reference.data.gov.uk/def/parliament#");
SPEXQuery.prototype.prefix("part" , "http://purl.org/vocab/participation/schema#");
SPEXQuery.prototype.prefix("passim" , "http://data.lirmm.fr/ontologies/passim#");
SPEXQuery.prototype.prefix("pattern" , "http://www.essepuntato.it/2008/12/pattern#");
SPEXQuery.prototype.prefix("pav" , "http://purl.org/pav/");
SPEXQuery.prototype.prefix("pay" , "http://reference.data.gov.uk/def/payment#");
SPEXQuery.prototype.prefix("pbo" , "http://purl.org/ontology/pbo/core#");
SPEXQuery.prototype.prefix("pc" , "http://purl.org/procurement/public-contracts#");
SPEXQuery.prototype.prefix("pdo" , "http://vocab.deri.ie/pdo#");
SPEXQuery.prototype.prefix("person" , "http://www.w3.org/ns/person#");
SPEXQuery.prototype.prefix("pext" , "http://www.ontotext.com/proton/protonext#");
SPEXQuery.prototype.prefix("pkm" , "http://www.ontotext.com/proton/protonkm#");
SPEXQuery.prototype.prefix("place" , "http://purl.org/ontology/places#");
SPEXQuery.prototype.prefix("pmlp" , "http://inference-web.org/2.0/pml-provenance.owl#");
SPEXQuery.prototype.prefix("pna" , "http://data.press.net/ontology/asset/");
SPEXQuery.prototype.prefix("pnc" , "http://data.press.net/ontology/classification/");
SPEXQuery.prototype.prefix("pne" , "http://data.press.net/ontology/event/");
SPEXQuery.prototype.prefix("pni" , "http://data.press.net/ontology/identifier/");
SPEXQuery.prototype.prefix("pns" , "http://data.press.net/ontology/stuff/");
SPEXQuery.prototype.prefix("pnt" , "http://data.press.net/ontology/tag/");
SPEXQuery.prototype.prefix("po" , "http://purl.org/ontology/po/");
SPEXQuery.prototype.prefix("poder" , "http://dev.poderopedia.com/vocab/schema#");
SPEXQuery.prototype.prefix("postcode" , "http://data.ordnancesurvey.co.uk/ontology/postcode/");
SPEXQuery.prototype.prefix("poste" , "http://data.lirmm.fr/ontologies/poste#");
SPEXQuery.prototype.prefix("ppo" , "http://vocab.deri.ie/ppo#");
SPEXQuery.prototype.prefix("pr" , "http://purl.org/ontology/prv/core#");
SPEXQuery.prototype.prefix("premis" , "http://www.loc.gov/premis/rdf/v1#");
SPEXQuery.prototype.prefix("prissma" , "http://ns.inria.fr/prissma/v1#");
SPEXQuery.prototype.prefix("pro" , "http://purl.org/spar/pro#");
SPEXQuery.prototype.prefix("prov" , "http://www.w3.org/ns/prov#");
SPEXQuery.prototype.prefix("prv" , "http://purl.org/net/provenance/ns#");
SPEXQuery.prototype.prefix("prvt" , "http://purl.org/net/provenance/types#");
SPEXQuery.prototype.prefix("pso" , "http://purl.org/spar/pso#");
SPEXQuery.prototype.prefix("psys" , "http://www.ontotext.com/proton/protonsys#");
SPEXQuery.prototype.prefix("ptop" , "http://www.ontotext.com/proton/protontop#");
SPEXQuery.prototype.prefix("pv" , "http://linkedscience.org/pv/ns#");
SPEXQuery.prototype.prefix("pwo" , "http://purl.org/spar/pwo#");
SPEXQuery.prototype.prefix("qb" , "http://purl.org/linked-data/cube#");
SPEXQuery.prototype.prefix("qu" , "http://purl.oclc.org/NET/ssnx/qu/qu#");
SPEXQuery.prototype.prefix("qudt" , "http://qudt.org/schema/qudt#");
SPEXQuery.prototype.prefix("quty" , "http://www.telegraphis.net/ontology/measurement/quantity#");
SPEXQuery.prototype.prefix("radion" , "http://www.w3.org/ns/radion#");
SPEXQuery.prototype.prefix("raul" , "http://vocab.deri.ie/raul#");
SPEXQuery.prototype.prefix("rdafrbr" , "http://rdvocab.info/uri/schema/FRBRentitiesRDA#");
SPEXQuery.prototype.prefix("rdag1" , "http://rdvocab.info/Elements/");
SPEXQuery.prototype.prefix("rdag2" , "http://rdvocab.info/ElementsGr2/");
SPEXQuery.prototype.prefix("rdag3" , "http://rdvocab.info/ElementsGr3/");
SPEXQuery.prototype.prefix("rdarel" , "http://rdvocab.info/RDARelationshipsWEMI#");
SPEXQuery.prototype.prefix("rdarel2" , "http://metadataregistry.org/uri/schema/RDARelationshipsGR2#");
SPEXQuery.prototype.prefix("rdarole" , "http://rdvocab.info/roles#");
*/
SPEXQuery.prototype.prefix("rdf" , "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
SPEXQuery.prototype.prefix("rdfs" , "http://www.w3.org/2000/01/rdf-schema#");
SPEXQuery.prototype.prefix("bibo" , "http://purl.org/ontology/bibo/");
/*
SPEXQuery.prototype.prefix("rdfg" , "http://www.w3.org/2004/03/trix/rdfg-1/");
SPEXQuery.prototype.prefix("rec" , "http://purl.org/ontology/rec/core#");
SPEXQuery.prototype.prefix("reegle" , "http://reegle.info/schema#");
SPEXQuery.prototype.prefix("rel" , "http://purl.org/vocab/relationship/");
SPEXQuery.prototype.prefix("res" , "http://www.medsci.ox.ac.uk/vocab/researchers/0.1/");
SPEXQuery.prototype.prefix("resume" , "http://rdfs.org/resume-rdf/#");
SPEXQuery.prototype.prefix("rev" , "http://purl.org/stuff/rev#");
SPEXQuery.prototype.prefix("rov" , "http://www.w3.org/ns/regorg#");
SPEXQuery.prototype.prefix("rr" , "http://www.w3.org/ns/r2rml#");
SPEXQuery.prototype.prefix("rss" , "http://purl.org/rss/1.0#");
SPEXQuery.prototype.prefix("ru" , "http://purl.org/imbi/ru-meta.owl#");
SPEXQuery.prototype.prefix("s4ac" , "http://ns.inria.fr/s4ac/v2#");
SPEXQuery.prototype.prefix("sam" , "http://def.seegrid.csiro.au/isotc211/iso19156/2011/sampling#");
SPEXQuery.prototype.prefix("sao" , "http://salt.semanticauthoring.org/ontologies/sao#");
SPEXQuery.prototype.prefix("sbench" , "http://swat.cse.lehigh.edu/onto/univ-bench.owl#");
SPEXQuery.prototype.prefix("schema" , "http://schema.org/");
SPEXQuery.prototype.prefix("scip" , "http://lod.taxonconcept.org/ontology/sci_people.owl#");
SPEXQuery.prototype.prefix("scoro" , "http://purl.org/spar/scoro/");
SPEXQuery.prototype.prefix("scot" , "http://rdfs.org/scot/ns#");
SPEXQuery.prototype.prefix("scovo" , "http://vocab.deri.ie/scovo#");
SPEXQuery.prototype.prefix("scsv" , "http://vocab.deri.ie/scsv#");
SPEXQuery.prototype.prefix("sd" , "http://www.w3.org/ns/sparql-service-description#");
SPEXQuery.prototype.prefix("sdmx" , "http://purl.org/linked-data/sdmx#");
SPEXQuery.prototype.prefix("sdmx-code" , "http://purl.org/linked-data/sdmx/2009/code#");
SPEXQuery.prototype.prefix("sdmx-dimension" , "http://purl.org/linked-data/sdmx/2009/dimension#");
SPEXQuery.prototype.prefix("sdo" , "http://salt.semanticauthoring.org/ontologies/sdo#");
SPEXQuery.prototype.prefix("search" , "http://vocab.deri.ie/search#");
SPEXQuery.prototype.prefix("security" , "http://securitytoolbox.appspot.com/securityMain#");
SPEXQuery.prototype.prefix("sem" , "http://semanticweb.cs.vu.nl/2009/11/sem/");
SPEXQuery.prototype.prefix("semio" , "http://www.lingvoj.org/semio.rdf#");
SPEXQuery.prototype.prefix("seq" , "http://www.ontologydesignpatterns.org/cp/owl/sequence.owl#");
SPEXQuery.prototype.prefix("sf" , "http://www.opengis.net/ont/sf#");
SPEXQuery.prototype.prefix("shw" , "http://paul.staroch.name/thesis/SmartHomeWeather.owl#");
SPEXQuery.prototype.prefix("sim" , "http://purl.org/ontology/similarity/");
SPEXQuery.prototype.prefix("sio" , "http://semanticscience.org/ontology/sio.owl#");
SPEXQuery.prototype.prefix("sioc" , "http://rdfs.org/sioc/ns#");
SPEXQuery.prototype.prefix("situ" , "http://www.ontologydesignpatterns.org/cp/owl/situation.owl#");
SPEXQuery.prototype.prefix("skos" , "http://www.w3.org/2004/02/skos/core#");
SPEXQuery.prototype.prefix("skosxl" , "http://www.w3.org/2008/05/skos-xl#");
SPEXQuery.prototype.prefix("snarm" , "http://rdf.myexperiment.org/ontologies/snarm/");
SPEXQuery.prototype.prefix("sp" , "http://spinrdf.org/sp#");
SPEXQuery.prototype.prefix("spatial" , "http://geovocab.org/spatial#");
SPEXQuery.prototype.prefix("spcm" , "http://spi-fm.uca.es/spdef/models/deployment/spcm/1.0#");
SPEXQuery.prototype.prefix("spfood" , "http://kmi.open.ac.uk/projects/smartproducts/ontologies/food.owl#");
SPEXQuery.prototype.prefix("spin" , "http://spinrdf.org/spin#");
SPEXQuery.prototype.prefix("sport" , "http://purl.org/ontology/sport/");
SPEXQuery.prototype.prefix("spt" , "http://spitfire-project.eu/ontology/ns#");
SPEXQuery.prototype.prefix("sql" , "http://ns.inria.fr/ast/sql#");
SPEXQuery.prototype.prefix("sro" , "http://salt.semanticauthoring.org/ontologies/sro#");
SPEXQuery.prototype.prefix("ssn" , "http://www.w3.org/2005/Incubator/ssn/ssnx/ssn#");
SPEXQuery.prototype.prefix("stac" , "http://securitytoolbox.appspot.com/stac#");
SPEXQuery.prototype.prefix("stories" , "http://purl.org/ontology/stories/");
SPEXQuery.prototype.prefix("swc" , "http://data.semanticweb.org/ns/swc/ontology#");
SPEXQuery.prototype.prefix("swp" , "http://www.w3.org/2004/03/trix/swp-1#");
SPEXQuery.prototype.prefix("swpm" , "http://spi-fm.uca.es/spdef/models/deployment/swpm/1.0#");
SPEXQuery.prototype.prefix("swpo" , "http://sw-portal.deri.org/ontologies/swportal#");
SPEXQuery.prototype.prefix("swrc" , "http://swrc.ontoware.org/ontology-07#");
SPEXQuery.prototype.prefix("swrl" , "http://www.w3.org/2003/11/swrl#");
SPEXQuery.prototype.prefix("tac" , "http://ns.bergnet.org/tac/0.1/triple-access-control#");
SPEXQuery.prototype.prefix("tag" , "http://www.holygoat.co.uk/owl/redwood/0.1/tags/");
SPEXQuery.prototype.prefix("tao" , "http://vocab.deri.ie/tao#");
SPEXQuery.prototype.prefix("taxon" , "http://purl.org/biodiversity/taxon/");
SPEXQuery.prototype.prefix("tddo" , "http://databugger.aksw.org/ns/core#");
SPEXQuery.prototype.prefix("te" , "http://www.w3.org/2006/time-entry#");
SPEXQuery.prototype.prefix("teach" , "http://linkedscience.org/teach/ns#");
SPEXQuery.prototype.prefix("test" , "http://www.w3.org/2006/03/test-description#");
SPEXQuery.prototype.prefix("theatre" , "http://purl.org/theatre#");
SPEXQuery.prototype.prefix("thors" , "http://resource.geosciml.org/ontology/timescale/thors#");
SPEXQuery.prototype.prefix("ti" , "http://www.ontologydesignpatterns.org/cp/owl/timeinterval.owl#");
*/
SPEXQuery.prototype.prefix("time" , "http://www.w3.org/2006/time#");
/*
SPEXQuery.prototype.prefix("tio" , "http://purl.org/tio/ns#");
SPEXQuery.prototype.prefix("tipr" , "http://www.ontologydesignpatterns.org/cp/owl/timeindexedpersonrole.owl#");
SPEXQuery.prototype.prefix("tis" , "http://www.ontologydesignpatterns.org/cp/owl/timeindexedsituation.owl#");
SPEXQuery.prototype.prefix("tisc" , "http://www.observedchange.com/tisc/ns#");
SPEXQuery.prototype.prefix("tl" , "http://purl.org/NET/c4dm/timeline.owl#");
SPEXQuery.prototype.prefix("tm" , "http://def.seegrid.csiro.au/isotc211/iso19108/2002/temporal#");
SPEXQuery.prototype.prefix("tmo" , "http://www.w3.org/2001/sw/hcls/ns/transmed/");
SPEXQuery.prototype.prefix("traffic" , "http://www.sensormeasurement.appspot.com/ont/transport/traffic#");
SPEXQuery.prototype.prefix("trait" , "http://purl.org/ontomedia/ext/common/trait#");
SPEXQuery.prototype.prefix("transit" , "http://vocab.org/transit/terms/");
SPEXQuery.prototype.prefix("tsioc" , "http://rdfs.org/sioc/types#");
SPEXQuery.prototype.prefix("turismo" , "http://idi.fundacionctic.org/cruzar/turismo#");
SPEXQuery.prototype.prefix("tvc" , "http://www.essepuntato.it/2012/04/tvc#");
SPEXQuery.prototype.prefix("txn" , "http://lod.taxonconcept.org/ontology/txn.owl#");
SPEXQuery.prototype.prefix("tzont" , "http://www.w3.org/2006/timezone#");
SPEXQuery.prototype.prefix("uco" , "http://purl.org/uco/ns#");
SPEXQuery.prototype.prefix("ui" , "http://www.w3.org/ns/ui#");
SPEXQuery.prototype.prefix("umbel" , "http://umbel.org/umbel#");
SPEXQuery.prototype.prefix("uniprot" , "http://purl.uniprot.org/core/");
SPEXQuery.prototype.prefix("uri4uri" , "http://uri4uri.net/vocab#");
SPEXQuery.prototype.prefix("user" , "http://schemas.talis.com/2005/user/schema#");
SPEXQuery.prototype.prefix("va" , "http://code-research.eu/ontology/visual-analytics#");
SPEXQuery.prototype.prefix("vaem" , "http://www.linkedmodel.org/schema/vaem#");
SPEXQuery.prototype.prefix("vann" , "http://purl.org/vocab/vann/");
SPEXQuery.prototype.prefix("vcard" , "http://www.w3.org/2006/vcard/ns#");
SPEXQuery.prototype.prefix("vdpp" , "http://data.lirmm.fr/ontologies/vdpp#");
SPEXQuery.prototype.prefix("vin" , "http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#");
SPEXQuery.prototype.prefix("vivo" , "http://vivoweb.org/ontology/core#");
SPEXQuery.prototype.prefix("vmm" , "http://spi-fm.uca.es/spdef/models/genericTools/vmm/1.0#");
SPEXQuery.prototype.prefix("voaf" , "http://purl.org/vocommons/voaf#");
SPEXQuery.prototype.prefix("voag" , "http://voag.linkedmodel.org/schema/voag#");
SPEXQuery.prototype.prefix("void" , "http://vocab.deri.ie/void#");
SPEXQuery.prototype.prefix("vra" , "http://simile.mit.edu/2003/10/ontologies/vraCore3#");
SPEXQuery.prototype.prefix("vrank" , "http://vocab.sti2.at/vrank#");
SPEXQuery.prototype.prefix("vs" , "http://www.w3.org/2003/06/sw-vocab-status/ns#");
SPEXQuery.prototype.prefix("vso" , "http://purl.org/vso/ns#");
SPEXQuery.prototype.prefix("vvo" , "http://purl.org/vvo/ns#");
SPEXQuery.prototype.prefix("wai" , "http://purl.org/wai#");
SPEXQuery.prototype.prefix("wdrs" , "http://www.w3.org/2007/05/powder-s#");
SPEXQuery.prototype.prefix("wf-invoc" , "http://purl.org/net/wf-invocation#");
SPEXQuery.prototype.prefix("wfm" , "http://purl.org/net/wf-motifs#");
*/
SPEXQuery.prototype.prefix("wgs84" , "http://www.w3.org/2003/01/geo/wgs84_pos#");
/*
SPEXQuery.prototype.prefix("whisky" , "http://vocab.org/whisky/terms#");
SPEXQuery.prototype.prefix("whois" , "http://www.kanzaki.com/ns/whois#");
SPEXQuery.prototype.prefix("wi" , "http://purl.org/ontology/wi/core#");
SPEXQuery.prototype.prefix("wikim" , "http://spi-fm.uca.es/spdef/models/genericTools/wikim/1.0#");
SPEXQuery.prototype.prefix("wl" , "http://www.wsmo.org/ns/wsmo-lite#");
SPEXQuery.prototype.prefix("wlo" , "http://purl.org/ontology/wo/");
SPEXQuery.prototype.prefix("wo" , "http://purl.org/ontology/wo/core#");
SPEXQuery.prototype.prefix("wot" , "http://xmlns.com/wot/0.1#");
SPEXQuery.prototype.prefix("xhv" , "http://www.w3.org/1999/xhtml/vocab#");
SPEXQuery.prototype.prefix("xkos" , "http://purl.org/linked-data/xkos#");
SPEXQuery.prototype.prefix("xsd" , "http://www.w3.org/2001/XMLSchema#");
SPEXQuery.prototype.prefix("zbwext" , "http://zbw.eu/namespaces/zbw-extensions#");
*/

SPEXQuery.prototype.thematicConstraints = [];

//This is the array which holds those variables requested by the user plus their labels as displayed in the query pane
SPEXQuery.prototype.SPEXvariable = function(variable, label) {
    this.SPEXvariables.push(variable);
	this.variablelabels.push(label);
    return this;
  };


SPEXQuery.prototype.getSPARQL = function (){ 	
	this.expandSpaceFilter();
	this.expandTimeFilter();	
	this.fe.expandFilterLiterals(this);
	this.le.expandLabels(this);
	return this.serialiseQuery();
}

SPEXQuery.prototype.setSpatialConstraint = function(va, myWindow){
	//this.spatialConstraints.push({ "v" : va, "w" : myWindow });
	this.spatialConstraints[va] = myWindow;
}
SPEXQuery.prototype.setTemporalConstraint = function(va, time){
	//this.temporalConstraints.push({ "v" : va, "t" : time});
	this.temporalConstraints[va] = time;
}


SPEXQuery.prototype.detectWKTvars = function() {
	
	var WKTvars = [];
	/* Find the index of "geo:asWKT". */
	var latIndex, longIndex, WKTindex = null;
	for(var j = 0; j < FilterExpander.prototype.filterDataProperties.length; j++) {
		var property = FilterExpander.prototype.filterDataProperties[j];
		if(property.prop[property.prop.length - 1] === "geo:asWKT") {
			WKTindex = "_" + j + "_" + (property.prop.length - 1);
		} else if(property.prop[property.prop.length - 1] === "wgs84:lat") {
			latIndex = "_" + j + "_" + (property.prop.length - 1);
		} else if(property.prop[property.prop.length - 1] === "wgs84:long") {
			longIndex = "_" + j + "_" + (property.prop.length - 1);
		}
	}

	/* For a variable to qualify as a WKT variable it should be conected to a WKT literal and
	not be connected to both wgs84:lat and wgs84:long literals. */
	/*
	if(this.spatiallyEnabledVars) {
		for(variable in this.spatiallyEnabledVars) {
			if((this.spatiallyEnabledVars[variable].indexOf(variable + latIndex) === -1 ||
			   this.spatiallyEnabledVars[variable].indexOf(variable + longIndex) === -1) && 
			   this.spatiallyEnabledVars[variable].indexOf(variable + WKTIndex) !== -1) {
					WKTvars.push(variable);
			}
		}
	}
	*/
	console.log("SPEXQuery.prototype.detectWKTvars(): spatally enabled vars from previous query: " + JSON.stringify(spex.ex.spatiallyEnabledVars));
	if(spex.ex.spatiallyEnabledVars) {
		for(variable in spex.ex.spatiallyEnabledVars) {
			if((spex.ex.spatiallyEnabledVars[variable].indexOf(variable + latIndex) === -1 ||
			   spex.ex.spatiallyEnabledVars[variable].indexOf(variable + longIndex) === -1) && 
			   spex.ex.spatiallyEnabledVars[variable].indexOf(variable + WKTindex) !== -1) {
					WKTvars.push(variable);
			}
		}
	}
	console.log("SPEXQuery.prototype.detectWKTvars(): detected WKT vars: " + JSON.stringify(WKTvars));
	return WKTvars;
};

SPEXQuery.prototype.expandSpaceFilter = function(){
 	var WKTvars = this.detectWKTvars();

 	for (variable in this.spatialConstraints)  {

		//if the variable is not a WKT variable
		console.log("SPEXQuery.prototype.expandSpaceFilter(): spatial variable w/o '?': " + variable.substr(1));
		if(WKTvars.indexOf(variable.substr(1)) === -1) { 
			this.where(variable, "wgs84:lat", variable + "__lat")
			.where("wgs84:long", variable + "__long");

			this.filter("(" + variable + "__lat  < " + this.spatialConstraints[variable].upperRightLatitude + 
				        " && " + variable + "__lat > "  + this.spatialConstraints[variable].lowerLeftLatitude + 
			            " && " + variable + "__long < " + this.spatialConstraints[variable].upperRightLongitude + 
			            " && " + variable + "__long > " + this.spatialConstraints[variable].lowerLeftLongitude +
                        ") || (" + variable + "__lat  < '" + this.spatialConstraints[variable].upperRightLatitude + 
                        "' && " + variable + "__lat > '"  + this.spatialConstraints[variable].lowerLeftLatitude + 
                        "' && " + variable + "__long < '" + this.spatialConstraints[variable].upperRightLongitude + 
                        "' && " + variable + "__long > '" + this.spatialConstraints[variable].lowerLeftLongitude + "')");  		
		} else {//if it is a WKT variable
			this.where(variable, "geo:hasGeometry", variable + "__geom")
			.where(variable + "__geom", "geo:asWKT", variable + "__wkt");
		}
 	}
 	
 	/*
 	for (i = 0 ; i < this.spatialConstraints.length; i++)  {
		if(WKTvars.indexOf(this.spatialConstraints[i].v) === -1) { 
			this.where(this.spatialConstraints[i].v, "wgs84:lat", this.spatialConstraints[i].v + "__lat")
			.where("wgs84:long", this.spatialConstraints[i].v + "__long");

			this.filter("?lat  < " + this.spatialConstraints[i].w.upperRightLatitude + 
				        " && ?lat > "  + this.spatialConstraints[i].w.lowerLeftLatitude + 
			            " && ?long < " + this.spatialConstraints[i].w.upperRightLongitude + 
			            " && ?long > " + this.spatialConstraints[i].w.lowerLeftLongitude);  		
		} else {//if it is a WKT variable
			this.where(this.spatialConstraints[i].v, "geo:hasGeometry", this.spatialConstraints[i].v + "__geom")
			.where(this.spatialConstraints[i].v + "__geom", "geo:asWKT", this.spatialConstraints[i].v + "__wkt");
		}
 	}
 	*/

}


SPEXQuery.prototype.expandTimeFilter = function(){
 	for (variable in this.temporalConstraints)  {
		
		this.where(variable, "time:hasBeginning", "?INSTANT_BEGINNING");
		this.where("?INSTANT_BEGINNING", "a", "time:Instant"); 
		this.where("?INSTANT_BEGINNING", "time:inXSDDateTime", "?timeBeginning");

		this.where(variable, "time:hasEnd", "?INSTANT_END");
		this.where("?INSTANT_END", "a", "time:Instant"); 
		this.where("?INSTANT_END", "time:inXSDDateTime", "?timeEnd");

		this.filter("?timeBeginning  >= '" + this.temporalConstraints[variable].timeBeginning + "'^^xsd:dateTime && ?timeEnd <= '"  + this.temporalConstraints[variable].timeEnd + "'^^xsd:dateTime");  		

 	}
 	/*
 	for (i=0;i<this.temporalConstraints.length;i++)  {
		
		this.where(this.temporalConstraints[i].v, "time:hasBeginning", "?INSTANT_BEGINNING");
		this.where("?INSTANT_BEGINNING", "a", "time:Instant"); 
		this.where("?INSTANT_BEGINNING", "time:inXSDDateTime", "?timeBeginning");

		this.where(this.temporalConstraints[i].v, "time:hasEnd", "?INSTANT_END");
		this.where("?INSTANT_END", "a", "time:Instant"); 
		this.where("?INSTANT_END", "time:inXSDDateTime", "?timeEnd");

		this.filter("?timeBeginning  >= '" + this.temporalConstraints[i].t.timeBeginning + "'^^xsd:dateTime && ?timeEnd <= '"  + this.temporalConstraints[i].t.timeEnd + "'^^xsd:dateTime");  		

 	}
 	*/
	
}
