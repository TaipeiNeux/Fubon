function bootstrapSelectOpenUpArrow(){

	$('select.selectpicker').on('loaded.bs.select', function(){

		$('.bootstrap-select').on('click', function(){

			if( $(this).hasClass('open') ){
				$(this).find('.caret').removeClass('bootstrap_select_arrow_up');
			} else {
				$(this).find('.caret').addClass('bootstrap_select_arrow_up');
			}
		});

	});
	
}

bootstrapSelectOpenUpArrow();