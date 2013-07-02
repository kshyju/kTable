kTable
====

A tiny jQuery plugin to make your HTML tables a bit responsive. 

How to use ?

Assuming you have an HTML table with a checkbox as the first column.

invoke the ktable plugin on your jQuery selector
```javascript
  $("table").ktable();
```

Supplying some option values

CSS class for selected Row
```javascript
  $("table").ktable( { checkedRowClass:"rowEnabled"});
```

This will apply the rowEnabled css class to the row which was selected.

CSS class for header Row
```javascript
  $("table").ktable( { headerClass:"tHeader"});
```

This will apply the tHeader css class to the header row of the table

CSS class for row hovering
```javascript
  $("table").ktable( { rowHighlightClass:"rowHover"});
```

This will apply the rowHover css class to the row when the pointer hover over the row
