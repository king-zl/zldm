(function(){
	
	var docuH = document.documentElement.clientHeight,
		docuW = document.documentElement.clientWidth,
		abc = docuW / 320,
		bigImg = document.getElementById('big-img'),
		loadMore = document.getElementsByClassName('loading-more'),
		loadMask = document.getElementById('loading');

	document.getElementsByTagName('html')[0].style.fontSize = abc * 12 + 'px';

	document.getElementsByClassName('swiper-container').item(0).style.height = docuH + 'px';

	var newImg = new Image();
	newImg.src = bigImg.getAttribute('thissrc');
	newImg.onload = function(){
		bigImg.src = bigImg.getAttribute('thissrc');
		loadMask.style.display = "none";
		for(var i = 0; i < loadMore.length; i++){
			loadMore[i].src = loadMore[i].getAttribute('thissrc');
		}
	}

	var mySwiper = new Swiper('.swiper-container',{
		paginationClickable: true,
		mode: 'vertical',
		onSlideChangeStart: function(){//当滑块将要滑到下一块时
		},
		onSlideChangeEnd: function(){//当滑块滑到下一块时
		}
	});


})()