window.addEventListener("load",function(){
    var tags="strong";
    setFontSize(tags);      //
    window.addEventListener("resize", function() {
        setFontSize(tags);
    }, false);
    function setFontSize(){
        var screenW=document.documentElement.clientWidth||document.body.clientWidth;
        var tagArray=tags.split(' ');
        for(var p=0;p<tagArray.length;p++){
            fn(tagArray[p]);
        }
        function fn(tag){
            var doms=document.getElementsByTagName(tag);
            for(var i=0;i<doms.length;i++){
                var size=doms[i].autosize;
                if(!doms[i].autosize){
                    doms[i].autosize=document.defaultView.getComputedStyle(doms[i],null)['font-size'].replace('px','')*1;
                }
                doms[i].style.fontSize=Math.round(doms[i].autosize*screenW/360)+'px';
            }
        }
    }
//	function slide(){
//        var wrap=document.getElementById('banner');
//        var imgs=wrap.getElementsByTagName('img'),imglength=imgs.length;
//        var count=0;
//        setInterval(function(){
//            imgs[count%imglength].style.display='none';
//            imgs[(++count)%imglength].style.display='inline';
//        },2000)
//    }
//    slide()

},false)