(function ($) {

    //// ---> Check issue element
    jQuery.fn.exists = function () {
        return $(this).length;
    }


    $(function () {

		if(navigator.userAgent.match(/Trident\/7\./)) {
			$('body').attr('data-ie','ie11');
		}

		/* Feature Slider */
        if ($('.feature_slider').exists()) {
            $(document).ready(function () {
                $('.feature_slider').find('ul').bxSlider({
                    auto: false,
                    controls: true,
                    minSlides: 1,
                    maxSlides: 7,
                    slideWidth: 302,
                    moveSlides: 1,
                    pager: false,
                    speed: 2000,
                    pause: 3000
                });
            });
        }

		/*	Go Up Arrow	*/
		if($('body').hasClass('single')){
			var linkUp = $('#go_up');
			$(window).load(function(){
			setTimeout(function(){
				$(window).scroll(function () {
					currentPosition = $(this).scrollTop();
					posBottom = $('#footer').offset().top - 286;

					if ( currentPosition > 300 && currentPosition < posBottom ) {
						linkUp.attr('data-pos','больше-меньше').removeAttr('style').css({'display':'block'});
					} else if( currentPosition > 300 && currentPosition > posBottom ) {
						linkUp.attr('data-pos','больше-больше').removeAttr('style').css({'display':'block'});
						//linkUp.removeAttr('style').css({'display':'block','position':'absolute','bottom':'auto','top':posBottom});
					} else {
						linkUp.attr('data-pos','нето').removeAttr('style').css({'display':'none'});
					}

				});
			},1000);
				linkUp.click(function () {
					$('body,html').animate({scrollTop: 0}, 800);
					return false;
				});
			});
		}

		/*	Sticky Header	*/
		if($('body').hasClass('logged-in') && $('body').width() > 782 && $('body').hasClass('admin-bar')){
			$('body').attr('data-top','32');
		} else {
			$('body').attr('data-top','0');
		}
		jQuery('#header').hcSticky({
			responsive: true,
			top: parseInt($('body').attr('data-top'))
		});

		/*	Responsive Footer*/
		function social_foot(){
			if($('body').width() < 767){
				$('.developer_links').before($('.user_zone'));
			} else {
				$('.copyright').after($('.user_zone'));
			}
		}
		social_foot();

		function top_select(){
			if($('body').width() < 767){
				$('.ms_trigger').show();
				$('.ms_trigger').next().hide();
				$('.nav_wrap').hide();
			} else {
				$('.ms_trigger').hide();
				$('.ms_trigger').next().show();
				$('.nav_wrap').show();
			}
			if($('body').width() > 767 && $('body').width() < 980){
				$('.second_menu').hide();
			} else {
				$('.second_menu').show();
			}
		}
		top_select();

		/*	Resize Function	*/
		$(window).resize(function(){
			social_foot();
			top_select();
		});



		/*	Responsive TopPosts Navy	*/
		if($('.ms_trigger').exists()){
			$('.ms_trigger').click(function(){
				var mst = $(this);
				if(mst.next().is(':hidden')){
					$('.ms_trigger').next().hide();
					mst.next().show();
				} else {
					mst.next().hide();
				}
			});
			$('.ms_trigger').next().find('a').bind('click',function(){
				var msa = $(this);
				if($('body').width() < 767){
					$(this).parent().hide();
					$(this).parent().prev().text(msa.text());
				} else {
					$(this).parent().prev().text(msa.text());
				}
			});
		}

	});

	/*	Sticky navy Arrows	*/
	jQuery(function ($) {
		$(" .postNavigation").hide();
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();
		var leftPositions = (windowWidth - 960) / 2;
		var rightPositions = ((windowWidth - 960) / 2) + 270;


		if ($(".stoparr").length > 0) {

			$(window).scroll(function () {
				var otherPost = $(".stoparr").position();

				if ($(this).scrollTop() > 300) {
					$(".postNavigation").show(200);
                    console.log('1');
				} else if ($(this).scrollTop() < 300) {
					$(".postNavigation").hide();
				}
				if ($(this).scrollTop() > otherPost.top - 440 ) {
					var a = otherPost.top - 130;
					$(".postNavigation").css({
						position: "absolute",
						top: a + "px",
						marginTop: 0

					});
					$(".postNavigation.prevPostBox").css({
						left: 0
					})
					$(".postNavigation.nextPostBox").css({
						right: 0
					})

				} else if ($(this).scrollTop() < otherPost.top - 50) {
					$(".postNavigation").css({
						position: "fixed",
						top: "50%",
						marginTop: '-52px'
					});
					$(".postNavigation.prevPostBox").css({
						left: 0
					})
					$(".postNavigation.nextPostBox").css({
						right: 0
					})
				}
			});
		}
	});

	/*	Placeholder	*/
    $('input, textarea').each(function () {
        var inpt = $(this),
            placeholder1 = inpt.attr('placeholder');
        if (placeholder1) {
            inpt
                .focus(function () {
                    inpt.addClass('has_placeholder').attr("data-placeholder", placeholder1).removeAttr('placeholder');
                    placeholder = inpt.attr('data-placeholder');
                    inpt.val(placeholder);
                    if (inpt.val() == placeholder) {
                        inpt.removeClass('has_placeholder').val('');
                    }
                })
                .blur(function () {
                    if (inpt.val() == placeholder || inpt.val() == '') {
                        inpt.addClass('has_placeholder').val(placeholder).css('color', '#A9A9A9');
                    }
                });
        }

    });

	/*	LoginPopup	*/
	$('.login_zone > a').live('click', function () {
        $(this).parents('.login_zone').find('.login_form_wrap').toggle();
    });
    $('.close').live('click',function () {
        $(this).parents('.login_form_wrap').hide();
    });


	/*	MailSubscriber	*/
	$('.mail_like').on('click',function(){
		if($('.show_form_subscribe').is(':hidden')){
			$('.show_form_subscribe').show();
		} else {
			$('.show_form_subscribe').hide();
		}

		return false
	});

	/*	Trigger Adding Menu */
	$('.btn_trigger').click(function(){
		var bt = $(this);
		if(bt.next().is(':hidden')){
			bt.next().css({'display':'block'});
		} else {
			bt.next().css({'display':'none'});
		}
	});

	/*	Trigger Menu */
	$('.big_trigger').click(function(){
		var btn = $(this);
		if(btn.next().is(':hidden')){
			btn.next().css({'display':'block'});
		} else {
			btn.next().css({'display':'none'});
		}
	});

	/*	Close AllPopup on click document	*/
	$(document).on('click', function(e) {
		if (!$(e.target).parents().hasClass('show_form_subscribe')) {
			$('.show_form_subscribe').hide();
		}
		if (!$(e.target).parents().hasClass('login_zone')) {
			$('.login_form_wrap').hide();
		}
		if (!$(e.target).parents().hasClass('ms_drop')) {
			if($('body').width() < 767){
				$('.ms_trigger').next().hide();
			}
		}
		if ( !$(e.target).parents().hasClass('second_wrap') ) {
			if($('body').width() > 767 && $('body').width() < 1023){
				$('.second_menu').hide();
			}
		}
		if ( !$(e.target).parents().hasClass('menu') ) {
			if($('body').width() < 767){
				$('.nav_wrap').hide();
			}
		}
	});

    var click_show_more_post = false;

    /*	AJAX pagination	*/
    $('.show_more_post').on('click', function () {

        if (click_show_more_post)
            return false;
        click_show_more_post = true;
        var obj = $(this),
            post_type = obj.data('post-type'),
            max_pages = obj.data('max-pages'),
            current_page = obj.data('current-page'),
            next_page = obj.data('next-page'),
            taxonomy_name = obj.data('taxonomy-name'),
            taxonomy_term = obj.data('taxonomy-term'),
            search_string = obj.data('search-string'),
			exclude_posts = obj.data('exclude-posts'),
            action = obj.data('action'),
            posts_per_page = obj.data('posts-per-page'),
            inner_class = obj.data('inner-class'),
            author_id = obj.data('author-id');

        $(inner_class).animate({
            'opacity': 0.1
        }, 200);

        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            type: "POST",
            dataType: 'json',
            data: {
                'action': action,
                'post_type': post_type,
                'author_id': author_id,
                'posts_per_page': posts_per_page,
                'max_pages': max_pages,
                'current_page': current_page,
                'next_page': next_page,
                'taxonomy_name': taxonomy_name,
                'taxonomy_term': taxonomy_term,
                'search_string': search_string,
                'exclude_post': exclude_posts
            },
            success: function (response) {
                obj.data('current-page', response.current_page);
                obj.data('next-page', response.next_page);

                if (response.hide_link) {
                    obj.animate({
                        'opacity': 0
                    }, 400, function () {
                        obj.remove()
                    });
                }

                if (response.html) {
                    $(inner_class).append(response.html);
                }

                $(inner_class).animate({
                    'opacity': 1
                }, 400, function () {
                    $(this).removeAttr('style');
                });
                click_show_more_post = false;

            }
        });

        return false;
    });


})(jQuery);

function ain_window(url, name) {
    if (window.showModalDialog) {
        window.showModalDialog(url, name, "dialogWidth:500px;dialogHeight:500px");
    } else {
        window.open(url, name, 'height=500,width=500,toolbar=no,directories=no,status=no,linemenubar = no,scrollbars = no,resizable=no,modal=yes');
    }
}


jQuery(document).ready(function($){
	$('.smallPostItem').each(function(){
		var el = $(this),
			ela = el.find('a:first'),
			elsa = ela.next().find('a');
			
		ela.mouseenter(function(){
			elsa.css({'color':'#DD4536'});
		});		
		ela.mouseleave(function(){
			elsa.css({'color':''});
		});
		
		elsa.mouseenter(function(){
			ela.css({'opacity':'.8'});
		});		
		elsa.mouseleave(function(){
			ela.css({'opacity':'1'});
		});
		
	});
});

jQuery(window).load(function() {

    var contentHeight = jQuery(".main .post_height").height();
    var sidebarHeight = jQuery(".main  .sidebar").height();

    if (sidebarHeight < contentHeight) {
        jQuery(".related_posts").addClass("fullWidth");
        // jQuery('.comment_box.wrap .column_c23').css('margin-left','-100px');
        // jQuery('.comment_box').width(1260);
        jQuery('.comment_box').addClass('comm_full');
    }
    else{
    	jQuery('.comment_box.wrap .column_c13').remove();
    	// jQuery('.comment_box.wrap .column_c23').width(735).css('margin-left','0');
      	jQuery('.comment_box.wrap .column_c23').addClass('comm_small');

    }

	// Высота блока голосовалки
	jQuery(".post_height iframe:not(.post_ads *,.post_ads_full *,[src*='yout'])").live({
		mouseenter: function () {
			jQuery(this).animate({
				height: "480px"
			  }, 180, function() {
				// Animation complete.
			  });
		},
		mouseleave: function () {
			/*jQuery(this).animate({
				height: "375px"
			  }, 180, function() {
				// Animation complete.
			  });*/
		}
	});





});
jQuery(document).ready(function(){

    if(jQuery('.widget.widget_list + .widget_banners.widget_list').exists()){
    jQuery( ".sidebar>.widget_banners.widget_list" ).wrapAll( "<div class='sidebar_hcSticky' />");
    jQuery( window ).scroll(function() {
        var topla    = jQuery( ".sidebar_hcSticky" ).offset().top - jQuery(window).scrollTop();
        var odorobla = jQuery( ".related_posts" ).offset().top - 120;
        var barbaras = jQuery(window).scrollTop() + jQuery( ".sidebar_hcSticky .widget_banners.widget_list" ).height() + 200;
        var brichka  = odorobla - jQuery( ".sidebar_hcSticky .widget_banners.widget_list" ).height() - jQuery( ".sidebar_hcSticky" ).offset().top - 81;
        if(topla < 150 ) {
            if(odorobla < barbaras) {
                jQuery( ".sidebar_hcSticky .widget_banners.widget_list" ).css({
                    "position"  : "absolute",
                    "top"       : brichka + "px",
                    "left"      : "0px",
                    "width"     : "300px"
                });
                console.log('odorobla  barbaras');
            } else {
                jQuery( ".sidebar_hcSticky .widget_banners.widget_list" ).css({
                    "position"  : "absolute",
                    "top"       : (jQuery(window).scrollTop() - jQuery( ".sidebar_hcSticky" ).offset().top) + 114,
                    "left"      : "0px",
                    "width"     : "300px"
                });
                console.log('else1');
            }
        } else {
            jQuery( ".sidebar_hcSticky .widget_banners.widget_list" ).removeAttr("style");
            console.log('else2');
        }
    });
    }
});