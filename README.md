kTable
====

A tiny jQuery plugin to make your HTML tables a bit responsive. 

###How to use ?

Assuming you have an HTML table with checkboxes in the  first columns.
    
    <table>
       <tr>
         <th></th>
         <th>Serial number</th>
         <th>Car Name</th>
       </tr>
       <tr>
          <td><input type="checkbox" id="chk1" /></td>
          <td>#1</td>
          <td>Honda Accord</td>
       </tr>          
    </table>

Invoke the ktable plugin on your jQuery selector is simple as this


    $("table").ktable();


####Supplying some option values
We can customize how the plugin behaves by setting the property values.
#####checkedRowClass
You can define what css class kTable should assing to the selected row

    $("table").ktable( { checkedRowClass:"rowEnabled"});


This will apply the `rowEnabled` css class to the row which was selected.

#####headerClass
You can mention what css class kTable should assign to your table headers using the `headerClass` property.

    $("table").ktable( { headerClass:"tHeader"});

This will apply the `tHeader` css class to the header row of the table
#####rowHighlightClass
You can define what css class kTbl should assign when hovering over the table row

    $("table").ktable( { rowHighlightClass:"rowHover"});


This will apply the rowHover css class to the row when the pointer hover over the row

##Bringing filter capability to your tables.

kTable provides a filter feature which you can apply on your table headers. This will add a filter icon to your table headers and clicking on them will show a small popup window where you can enter the search query. The filter popup will have a "Filter" and "Clear" button. You can pass a callback function to these events when invoking the plugin. The form associated with the search popup will be returned to your callback function and you can update your UI here(using an ajax call).



    $("table").ktable({
        checkedRowClass: "rowEnabled",
        headerCheckBoxClass: "chkAll2",
        filterable: {
                   filterableColumnClassName: 'filterable',
                   callBackOnFitler: function (item) { alert("Filter clicked") },
                   callBackOnClear: function (item) { alert("Clear clicked") }
                }
    });
    

![ ktable](https://f.cloud.github.com/assets/144469/1021494/76f6ce24-0d08-11e3-9e46-6ad407fef325.png)

### Properties
####filterableColumnClassName
 By default, kTable will convert all your table headers with the css class `filterable` to filterable columns. This is the class name of the header column which kTable plugin will look for to enable the filter feature.  You can customize it by setting the filterableColumnClassName property value.

####callBackOnFilter 
 This is the place where you can pass a callback function which will be executed when user clicks on the "Filter" button on the popup. kTable will return the current form back to your callback and you can read the form values to get the search query user entered and update the UI as needed.

####callBackOnClear
  This is the place where you can pass a callback function which will be executed when user clicks on the "Clear" button on the popup. kTable will return the current form back to your callback and you can read the form values to get the search query user entered.

####bindDefaultDatePicker
If you set the value of this property to true, kTable will bind the jQuery UI date picker to your columns which has a date datatype( If jQuery UI library is already loaded to your page). The default value is false.

####dropDownContent
You can customize the content of the filter type dropdown in the popup. If you do not provide any values, kTable will use the default values for the dropdown as follows

**For string type**
1. item
2. item
3. item



**For datetime type**
1. item
2. item
3. item



To customize the dropdown, You need to have 2 SELECT elements in your main page, one for string type and one for datetime type. Then you can tell kTable to use those SELECT elements as the source for the filter type dropdown.

    dropDownContent: {
                       source: {
                                 date: "ddlDate",
                                 text: "ddlText"
                               }
                     }

In the above example, I mentioned that for the columns with _datetime_ type, use the SELECT element with id **ddlDate** as the source and use **ddlText** for the _string_ type columns.

####datatype attribute
By default, the filter popup will have a SELECT element with 3 options as "Starts with","Contains","Ends with" and a search box for entering the search query. But if your column is for showing date values, you can tell kTable to show a popup with filters related to date selection. What you have to do is to add the "datatype" attribute to the column and set the value as "date". Then the SELECT element will have option values such as "Equal to","Before" and "After".

    <th class="filterable">Serial number</th>
    <th class="filterable" datatype="date">Car Name</th>

If you don't specify the datatype attribute it will be "string" by default and it will show the default -generic options for free text search.


##Sorting

You can enable sorting on your table columns by specifying the sortable property. Enabling this will change your column header name to be clickable. When you click it for the first time, It will sort your restults by ascending order and clicking again will sort it by descending order. a small icon will appear near to the header text to indicate what sort order is currently applicable.

![ ktable](https://f.cloud.github.com/assets/144469/1058419/895ee3ec-1188-11e3-93d5-4d85678a2bbe.png)

### Properties
####callBackOnAscending

Here you can specify a callback function which will be executed when user clicks on the sort icon/ column header. kTable will pass the anchor tag (the header text is an anchor tag now) back to your call back and you can read the relevant values and do whatever you want to sort your data.




