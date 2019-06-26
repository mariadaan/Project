## Styleguide

#### Comments
They will have a space after the slashes and the first letter will be capitalized. Comments will be used above every part of the code, even if it may seem obvious.

_// The comments in my code will look like this_

#### Indents
d3.select dots will be lined up vertically

![blah](https://github.com/mariadaan/Project/blob/master/doc/d3style.png)

Tabs will be used for indentation, always just one tab per indent.

#### Spacing
Two blank lines between functions, one blank line between every other piece of code. Lines used for comments are seen as part of this code.

#### Variable and function naming
Variable names will be kept as short and clear as possible. When a two-word name is necessary, camelCase will be used. Function names have to show the function's purpose. CamelCase will be used for this as well.

_var colorScale_

_function makeMap_

#### Code grouping
In the root of the repository, my index.html and visualisatie.html files are located. In a separate folder, all JavaScript files are located.

- __main.js__ is the file that's loading in all data and starts the process of loading the initial page of visualisation.html
- __map.js__ contains the function makeMap and a few other functions that are used to make the map.
- __barchart.js__ contains the function makeBarchart, updateBarchart and handleButtons. These functions are needed to make the barchart and corresponding elements work as wanted.
- __piechart.js__ contains makePiechart, which has an update function inside.
- __info.js__ contains the functions used to show the extra information about Amsterdam or a clicked part of the city.
- __extras.js__ is a file that contains all extra functions that are developed to make small tasks easier.
- __d3-tip.js__ is the used d3 tooltip documentation.
