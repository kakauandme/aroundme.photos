var action = '';
var click_archead_post = false;
var Archead = {
	popular              : function (obj) {
		this.remove_and_set_active(obj, '.p2-sort');
		action = 'ain_get_popular_posts';
		this.get_data(jQuery(obj).data('cat'));
	},
	commented            : function (obj) {
		this.remove_and_set_active(obj, '.p2-sort');
		action = 'ain_get_commented_posts';
		this.get_data(jQuery(obj).data('cat'));
	},
	remove_and_set_active: function (obj, cls) {
		jQuery(cls + ' a').each(function () {
			jQuery(this).removeClass('active');
		});
		jQuery(obj).addClass('active');
	},
	get_data             : function (cat) {
		if (click_archead_post)
			return false;
		click_archead_post = true;

		jQuery('#acontent').animate({
			'opacity': 0.1
		}, 200);

		jQuery.ajax({
			url     : '/wp-admin/admin-ajax.php',
			type    : "POST",
			dataType: 'json',
			data    : {
				'action': action,
				'cat'   : cat
			},
			success : function (response) {
				console.log(response);

				jQuery('#acontent').html(response.html).animate({
					'opacity': 1
				}, 400, function () {
					jQuery(this).removeAttr('style');
				});
				click_archead_post = false;


			}
		});
	}
}


var filter_date = 'week';
var filter_soc = 'views';
var click_show_more_top_posts = false;
var top_posts = {
	byyear                  : function (obj) {
		this.remove_and_set_active(obj, '.date-sort');
		filter_date = 'year';
		this.load_data('', false);
	},
	bymonth                 : function (obj) {
		this.remove_and_set_active(obj, '.date-sort');
		filter_date = 'month';
		this.load_data('', false);
	},
	byweek                  : function (obj) {
		this.remove_and_set_active(obj, '.date-sort');
		filter_date = 'week';
		this.load_data('', false);
	},
	byviews                 : function (obj) {
		this.remove_and_set_active(obj, '.p-sort');
		filter_soc = 'views';
		this.load_data('', false);
	},
	bylikes                 : function (obj) {
		this.remove_and_set_active(obj, '.p-sort');
		filter_soc = 'likes';
		this.load_data('', false);
	},
	bycomments              : function (obj) {
		this.remove_and_set_active(obj, '.p-sort');
		filter_soc = 'comments';
		this.load_data('', false);
	},
	more                    : function (obj) {
		this.load_data(obj, true);
	},
	remove_and_set_active   : function (obj, cls) {
		jQuery(cls + ' a').each(function () {
			jQuery(this).removeClass('active');
		});
		jQuery(obj).addClass('active');
	},
	enable_effect_load_data : function () {
		jQuery('.last_post').animate({
			'opacity': 0.1
		}, 200);
	},
	disable_effect_load_data: function () {
		jQuery('.last_post').animate({
			'opacity': 1
		}, 400, function () {
			jQuery(this).removeAttr('style');
		});
	},
	load_data               : function (ob, more) {

		var obj = jQuery('.show_more_post');

		if (click_show_more_top_posts)
			return false;

		top_posts.enable_effect_load_data();

		click_show_more_top_posts = true;

		var max_pages = 0,
			current_page = 0,
			next_page = 0,
			posts_per_page = 0;


		if (more) {
			max_pages = obj.data('max-pages');
			current_page = obj.data('current-page');
			next_page = obj.data('next-page');
			posts_per_page = obj.data('posts-per-page');
			filter_date = obj.data('filter-date');
			filter_soc = obj.data('filter-soc');

		}

		jQuery.ajax({
			url     : '/wp-admin/admin-ajax.php',
			type    : "POST",
			dataType: 'json',
			data    : {
				'action'        : 'get_top_posts_by_filters',
				'filter_date'   : filter_date,
				'filter_soc'    : filter_soc,
				'posts_per_page': posts_per_page,
				'max_pages'     : max_pages,
				'current_page'  : current_page,
				'next_page'     : next_page
			},
			success : function (response) {
				console.log(response);
				jQuery('.new_post_item').addClass('byViews');
				click_show_more_top_posts = false;
				obj.data('current-page', response.current_page);

				obj.data('next-page', response.next_page);
				obj.data('max_pages', response.max_pages);
				obj.data('filter-date', response.filter_date);
				obj.data('filter-soc', response.filter_soc);

				if (response.max_pages) {
					obj.show();
				} else {
					obj.hide();
				}

				if (more && response.hide_link) {
					obj.hide();
				}

				if (more && response.html) {
					jQuery('.last_post').append(response.html);
				} else {
					jQuery('.last_post').html(response.html);
				}
				top_posts.disable_effect_load_data();
				if (filter_soc == 'likes') {
					jQuery('.new_post_item').addClass('byLikes');
				}
				if (filter_soc == 'views') {
					jQuery('.new_post_item').addClass('byViews');
				}
				if (filter_soc == 'comments') {
					jQuery('.new_post_item').addClass('byComments');
				}
			}
		});
	}
}

jQuery(document).ready(function () {
	if (location.href == 'http://ain.ua/top') {
		jQuery('.new_post_item').addClass('byViews');
	}
})

