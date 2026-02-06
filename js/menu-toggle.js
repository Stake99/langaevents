$(document).ready(function() {
	var isMenuTop = localStorage.getItem('menuPosition') === 'top';
	
	// Apply saved state on page load
	if (isMenuTop) {
		$('#colorlib-aside').hide();
		$('#colorlib-header').show();
		$('#colorlib-footer').show();
		$('#colorlib-main').css('margin-left', '0');
		$('body').addClass('menu-top');
		$('#toggle-menu-position').text('Move Menu to Top');
		$('#toggle-menu-position-top').text('Move Menu to Side');
	}
	
	$('#toggle-menu-position, #toggle-menu-position-top').click(function() {
		if (!isMenuTop) {
			// Move menu to top
			$('#colorlib-aside').hide();
			$('#colorlib-header').show();
			$('#colorlib-footer').show();
			$('#colorlib-main').css('margin-left', '0');
			$('body').addClass('menu-top');
			$('#toggle-menu-position').text('Move Menu to Top');
			$('#toggle-menu-position-top').text('Move Menu to Side');
			localStorage.setItem('menuPosition', 'top');
			isMenuTop = true;
		} else {
			// Move menu to side
			$('#colorlib-header').hide();
			$('#colorlib-footer').hide();
			$('#colorlib-aside').show();
			$('#colorlib-main').css('margin-left', '');
			$('body').removeClass('menu-top');
			$('#toggle-menu-position').text('Move Menu to Top');
			$('#toggle-menu-position-top').text('Move Menu to Side');
			localStorage.setItem('menuPosition', 'side');
			isMenuTop = false;
		}
	});
});