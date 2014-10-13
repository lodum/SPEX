(function() {
    var flag=false;
    var tid; //table id as defined on html page
    var sheight;
    function ge$(d) {return document.getElementById(d);}
    this.scrollHeader = function() {
        if(flag) {
            return;
        }
        var fh=ge$('Scroller:fx');
        var sd=ge$(tid+':scroller');
        fh.style.left=(0-sd.scrollLeft)+'px';
    };
    function addScrollerDivs() {
        if(ge$(tid+':scroller')) {
            return;
        }
        var sd=document.createElement("div");
        var tb=ge$(tid);
        sd.style.height=sheight+"px";
        sd.style.overflow='visible';
        sd.style.overflowX='auto';
        sd.style.overflowY='auto';
        sd.style.width=tb.width;
        sd.id=tid+':scroller';
        sd.onscroll=scrollHeader;

        var tb2=tb.cloneNode(true);
        sd.appendChild(tb2);
        tb.parentNode.replaceChild(sd,tb);
        var sd2=document.createElement("div");
        sd2.id='Scroller:fx:OuterDiv';
        sd2.style.cssText='position:relative;width:100%;overflow:hidden;overflow-x:hidden;padding:0px;margin:0px;';
        sd2.innerHTML='<div id="Scroller:fx" style="position:relative;width:9999px;padding:0px;margin-left:0px;"><font size="3" color="red">Please wait while loading the table..</font></div>';
        sd.parentNode.insertBefore(sd2,sd);
    }
    function fxheader() {
        if(flag) {return;}
        flag=true;
        var tbDiv=ge$(tid);
        var twp=tbDiv.width;
        var twi=parseInt(twp);
        if(twp.indexOf("%") > 0) {
            twi=((ge$('Scroller:fx:OuterDiv').offsetWidth * twi) / 100)-20;
            twp=twi+'px';
            tbDiv.style.width=twp;
        }
        
        var fh=ge$('Scroller:fx');
        var cn=fh.childNodes;
        for(var j=0;j<cn.length;j++) {
            fh.removeChild(cn[j]);
        }
        var t=tbDiv.cloneNode(false);
        t.id=tid+'__cN';
        t.style.width=tbDiv.offsetWidth+'px';
        t.style.marginTop='0px';
        var r=tbDiv.rows[0].cloneNode(true);
        r.style.height=tbDiv.rows[0].offsetHeight+'px';
        var th=document.createElement("thead");
        th.appendChild(r);
        t.appendChild(th);
        fh.appendChild(t);
        //adjusting widths
        var c=ge$(tid+'__cN').rows[0].cells;
        var oc=tbDiv.rows[0].cells;
        for(var i=0;i<c.length;i++) {
            c[i].style.width=(oc[i].offsetWidth-3) + 'px';
        }

        ge$('Scroller:fx:OuterDiv').style.height=oc[0].offsetHeight+'px';
        tbDiv.style.marginTop = "-" + tbDiv.rows[0].offsetHeight + "px";
        if(tbDiv.offsetHeight < sheight) {
            ge$(tid+':scroller').style.height=tbDiv.offsetHeight + 'px';
        }
        window.onresize=fxheader;
        flag=false;
        scrollHeader();
    }
    this.fxheaderInit = function(_tid,_sheight) {
        tid=_tid;
        sheight=_sheight;
        flag=false;
        addScrollerDivs();
        fxheader();
    };
})();