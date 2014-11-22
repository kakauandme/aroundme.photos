(function ($) {
	$(document).ready(function () {

//Toggle 'contact me' block
		$(".univac-contact-me").hide();
		$(".toggle-univac-contact-me").click(function () {
			var postid = $(this).attr('rel');
			contact_clicks(postid);
			$(this).toggleClass("opened").next().slideToggle("slow");
			return false;
		});

//Toggle 'other city' input
		$('#other-city-container').hide();
		$('#select_city').change(function () {
			var va = $(this).val();

			if (va == 'other') {
				$('#other-city-container').toggleClass("opened").slideToggle("slow");
			} else {
				$('#other-city-container').hide();
			}

		});

//count click for "Contact Me"
		function contact_clicks(postid) {
			$.get(params.site_url, {vacancy_click: postid});
			return false;
		}

	});
})(jQuery);


var Vacancy = {
	del: function (o, id) {

		if (confirm('Вы действительно хотите удалить вакансию?')) {
			jQuery.ajax({
				type    : 'POST',
				url     : '/wp-admin/admin-ajax.php',
				dataType: 'json',
				data    : {
					'action': 'unicav_delete_vacancy',
					'id'    : id
				},
				success : function (a) {
					console.log(a);
					if (a.result == 1) {
						jQuery('.vacancy_item_id_' + id).animate({opacity: 0}, 400, function () {
							jQuery(this).remove();
							alert("Вакансия успешно удалена");
						});
					} else {
						alert("Ошибка:  " + a.result + " !");
					}
				}
			});
		}
	}
}