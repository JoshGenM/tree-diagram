var data = [
  { "dep": "First Top", "name": "First child", "model": "value1", "size": "320" },
  { "dep": "First Top", "name": "First child", "model": "value2", "size": "320" },
  { "dep": "First Top", "name": "SECOND CHILD", "model": "value1", "size": "320" },
  { "dep": "Second Top", "name": "First Child", "model": "value1", "size": "320" }
];

var newData = { name :"root", children : [] },
  levels = ["dep","name"];

// For each data row, loop through the expected levels traversing the output tree
data.forEach(function(d){
  // Keep this as a reference to the current level
  var depthCursor = newData.children;
  // Go down one level at a time
  levels.forEach(function( property, depth ){

      // Look to see if a branch has already been created
      var index;
      depthCursor.forEach(function(child,i){
          if ( d[property] == child.name ) index = i;
      });
      // Add a branch if it isn't there
      if ( isNaN(index) ) {
          depthCursor.push({ name : d[property], children : []});
          index = depthCursor.length - 1;
      }
      // Now reference the new child array as we go deeper into the tree
      depthCursor = depthCursor[index].children;
      // This is a leaf, so add the last element to the specified branch
      if ( depth === levels.length - 1 ) depthCursor.push({ name : d.model, size : d.size });
  });
});