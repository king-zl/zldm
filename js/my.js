/*输入框获取焦点后样式*/
$(document).ready(function(){
	$(":input").focus(function(){
		$(this).addClass("focus");
		if($(this).val() ==this.defaultValue){
			$(this).val("");
		}
	}).blur(function(){
		$(this).removeClass("focus");
		if ($(this).val() == '') {
			$(this).val(this.defaultValue);
		}
	});
})