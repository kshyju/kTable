/*
*   ktbl plugin for HTML tables,  
*   Free to use under the MIT license.
*   Shyju @kshyju
*/
; (function ($, window, document) {
    $.fn.ktable = function (options) {
        //default options
        var settings = $.extend({
                                    headerCheckBoxClass: "chkAll",
                                    checkedRowClass: "rowSelected",
                                    singleRowCheckBoxClass: "chkSelect",
                                    rowHighlightClass: "rowHover",
                                    headerClass :"tHeader"
        }, options);

       return this.each(function () {
            var _tbl = $(this);
           
           //Header row CSS class
            _tbl.find("th").addClass(settings.headerClass);

            // for check all
            _tbl.find("input[type='checkbox']." + settings.headerCheckBoxClass).bind("click", function () {
                if ($(this).is(":checked")) {
                    _tbl.find("input[type='checkbox']." + settings.singleRowCheckBoxClass).prop('checked', true).closest("tr").addClass(settings.checkedRowClass);
                }
                else {
                    _tbl.find("input[type='checkbox']." + settings.singleRowCheckBoxClass).prop('checked', false).closest("tr").removeClass(settings.checkedRowClass);
                }

            });

            //for single row
            _tbl.find("input[type='checkbox']." + settings.singleRowCheckBoxClass).bind("click", function () {
                if ($(this).is(":checked")) {
                    $(this).closest("tr").addClass(settings.checkedRowClass);
                }
                else {
                    $(this).closest("tr").removeClass(settings.checkedRowClass);
                }
            });

            //Hover effect for rows
            _tbl.find("tr").each(function (index,item) {
                $(item).hover(
                    function(){  $(this).addClass(settings.rowHighlightClass); },
                    function(){  $(this).removeClass(settings.rowHighlightClass); }   
                );
            });
        });
    };      

})(jQuery, window);