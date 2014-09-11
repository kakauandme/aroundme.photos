//
(function($) {
    $(document).ready(function(){
        $("#depostratingtable").dataTable({
					"aaSorting": [[ 2, "desc" ]],
                    "iDisplayLength": 50,
                    "oLanguage": {
                        "sProcessing":   "Подождите...",
                        "sLengthMenu":   "Показать записей _MENU_",
                        "sZeroRecords":  "Записи отсутствуют.",
                        "sInfo":         "Записи с _START_ до _END_ из _TOTAL_ записей",
                        "sInfoEmpty":    "Записи с 0 до 0 из 0 записей",
                        "sInfoFiltered": "(отфильтровано из _MAX_ записей)",
                        "sInfoPostFix":  "",
                        "sSearch":       "Поиск:",
                        "sUrl":          "",
                        "oPaginate": {
                            "sFirst": "Первая",
                            "sPrevious": "Предыдущая",
                            "sNext": "Следующая",
                            "sLast": "Последняя"
                        }
                    }
				});

        //
        $('ul.depr-tabs').delegate('li:not(.current)', 'click', function() {
            $(this).addClass('current').siblings().removeClass('current')
                .parents('div.depr-tabsection').find('div.depr-box').eq($(this).index()).fadeIn(150).siblings('div.depr-box').hide();
        })
    });
})(jQuery);
