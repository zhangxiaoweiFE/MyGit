$(function(){
	// flex-direction
	var $dir=$("#direction");
	$dir.change(function(event) {
		$("#flex-direction").css({
			"flexDirection": $(this).val()
		});
	});

	// flex-wrap
	var $wrap=$("#wrap");
	$wrap.change(function(event) {
		$("#flex-wrap").css({
			"flexWrap": $(this).val()
		});
	});

	// justify-content
	var $justify=$("#justify");
	$justify.change(function(event) {
		$("#justify-content").css({
			"justifyContent": $(this).val()
		});
	});

	//align-items
	var $align=$("#align");
	$align.change(function(event) {
		$("#align-items").css({
			"alignItems": $(this).val()
		});
	});

	//align-content
	var $content=$("#content");
	$content.change(function(event) {
		$("#align-content").css({
			"alignContent": $(this).val()
		});
	});

	//order
	var $order=$("#order");
	$order.change(function(event) {
		$("#order-list").find("li").eq(1).css({
			"order": $(this).val()
		});
	});

	//flex-grow
	var $grow=$("#grow");
	$grow.change(function(event) {
		$("#flex-grow").find("li").eq(1).css({
			"flexGrow": $(this).val()
		});
	});

	//flex-shrink
	var $shrink=$("#shrink");
	$shrink.change(function(event) {
		$("#flex-shrink").find("li").eq(1).css({
			"flexShrink": $(this).val()
		});
	});


	//flex-basis
	var $basis=$("#basis");
	$basis.change(function(event) {
		$("#flex-basis li").css({
			"flexBasis": $(this).val()
		});
	});

	//align-self
	var $self=$("#self");
	$self.change(function(event) {
		$("#align-self").find("li").eq(0).css({
			"alignSelf": $(this).val()
		});
	});

})