/*
*   kTable plugin for HTML tables,  
*   Free to use under the MIT license.
*   Original Author : Shyju (Twitter : @kshyju)

*/
; (function ($, window, document, undefined) {
    if (!$.techiesweb) {
        $.techiesweb = {};
    };
    $.fn.ktable = function (options) {
        //default options
        var settings = {
            headerCheckBoxClass: "chkAll",
            checkedRowClass: "rowSelected",
            singleRowCheckBoxClass: "chkSelect",
            rowHighlightClass: "rowHover",
            headerClass: "tHeader",
            filterable: {
                filterHeaderText: "Show me items with value:",
                filterAndText: "And",
                filterableColumnClassName: 'filterable',
                callBackOnFilter: '',
                callBackOnClear: '',
                bindDefaultDatePicker: false,
                dateFormat: "mm/dd/yy"
            }
        };

        $.extend(true,settings,options);      


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
                     
   //Filter
          if (settings.filterable.callBackOnFilter)
          {

           var tableHeaders = _tbl.find("th." + settings.filterable.filterableColumnClassName);
           tableHeaders.each(function (index, item) {
               var _header = $(item);
               var headerText = _header.text();
               var dataType = "string";
               if (_header.attr("datatype") !== undefined)
                   dataType = _header.attr("datatype");

               var anchorId = headerText.split('/').join('').split(' ').join('-');

               // console.log(anchorId);
               var newHeaderMarkup = "<a href='#' datatype='" + dataType + "' id=" + anchorId + " class='ktable-filter'><span class='k-filter'></span></a><a class='sortHeader'>" + headerText + "</a>";
               _header.html(newHeaderMarkup);

           });

           //event binding for the dynamically added elements
           $(document).on("click", "a.ktable-filter", function (e) {           

               //build the animation container
               var _clickedAnchor = $(this);
               clickedAnchorId = _clickedAnchor.attr("id");
               var popupId = "popup-" + clickedAnchorId;              

               //Hide existing open popups, remove the selected filter css class
               $(".popupContainer").slideUp(200);
               $("span.filter-selected").removeClass("filter-selected");

               if ($("#" + popupId).length > 0) {
                   $("#" + popupId).fadeIn(100);
                   _clickedAnchor.find("span.k-filter").addClass("filter-selected");
                   return;
               }

               var headerHeight = _clickedAnchor.closest("tr").height();
               var top = _clickedAnchor.closest("tr").offset().top + headerHeight;
               var left = e.pageX - _clickedAnchor.closest(".k-grid-filter").width();             

               
               var popupMarkup = "<div id='" + popupId + "' for='" + clickedAnchorId + "' class='popupContainer' style='display:none;position:absolute;top:" + top + "px; left:" + left + "px;'>";
               popupMarkup += "<form><div>";
               popupMarkup += "<div class='filterHeader'>" + settings.filterable.filterHeaderText + "</div>";
               popupMarkup += "<div class='searchType'><select class='ddlSearchType'>" + getSelectOptions (_clickedAnchor)+ "</select></div>";
               if (_clickedAnchor.attr("datatype") === "date") {
                 
                   popupMarkup += "<div class='searchBox'><input type='text' class='filter-input kTableDatePicker' /></div>";
                   popupMarkup += "<div class='divBetween' style='display:none;'>" + settings.filterable.filterAndText + "<br/><div class='searchBox'><input type='text' class='filter-input kTableDatePicker' /></div></div>";
               }
               else {                 
                   popupMarkup += "<div class='searchBox'><input type='text' class='filter-input' /></div>";
               }


               popupMarkup += "<div><button class='filter-button' type='submit'>Filter</button><button class='filter-button' type='reset'>Close</button></div>";
               popupMarkup += "<form></div>";
               popupMarkup += "</div>";
               $(document.body).append(popupMarkup);
               $("#" + popupId).slideDown(300);
               //highlight the clicked filter icon
               _clickedAnchor.find("span.k-filter").addClass("filter-selected");

               //Bind date picker to the ui
               
               if (settings.filterable.bindDefaultDatePicker) {                               
                   if (jQuery.ui) {
                       {
                           $("input.kTableDatePicker").datepicker({ dateFormat: settings.filterable.dateFormat });
                       }
                   }
               }

           });

           //Execute the callback function when clicking on the filter button 
           $(document).on("click", "button[type='submit']", function (e) {
               e.preventDefault();
               var _clickedSubmit = $(this);
               if (settings.filterable.callBackOnFilter)
                   settings.filterable.callBackOnFilter(_clickedSubmit.closest("form"));

               _clickedSubmit.closest("div.popupContainer").hide();
           });

           //Close the popup when clicking
           $(document).on("click", "button[type='reset']", function (e) {
               e.preventDefault();
               var _clickedReset = $(this);
               var anchorId = _clickedReset.closest("div.popupContainer").attr("for");
               _clickedReset.closest("div.popupContainer").hide();
               $("#" + anchorId).find("span.k-filter").removeClass("filter-selected");

               if (settings.filterable.callBackOnClear)
                   settings.filterable.callBackOnClear(_clickedReset.closest("form"));
           });

              //Change event on the ddlSearchType SELECT 
              //If user selected between option, show the end date textbox too;
           $(document).on("click", "SELECT.ddlSearchType", function (e) {
               var val = $(this).val();
               if (val == "between")
                   $("div.divBetween").fadeIn(100);
               else
                   $("div.divBetween").fadeOut(100).find("input").val("");
           });



          } //if filter is enabled

       }); // return this.each

     
       function getSelectOptions(_clickedAnchor) {           
           if (typeof settings.filterable.dropDownContent !== 'undefined') {            
               var dropDownID = "";               
               if (_clickedAnchor.attr("datatype") === "date") {
                   dropDownID = settings.filterable.dropDownContent.source.date;
               }
               else {
                   dropDownID = settings.filterable.dropDownContent.source.text;
               }
              
               var strOptions = "";
               $("#" + dropDownID + " option").each(function () {                  
                   strOptions += "<option value='" + $(this).val() + "'>" + $(this).text() + "</option>";
               });
               return strOptions;
           }
           else {
               if (_clickedAnchor.attr("datatype") !== "date") {
                   return "<option>Contains</option><option>Starts with</option><option>Ends with</option>"
               }
               else {
                   return "<option>Equal to</option><option>Before</option><option>After</option>";
               }
           }
        };


    };      // plugin ends

})(jQuery, window, document);


