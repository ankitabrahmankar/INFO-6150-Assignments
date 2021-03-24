/**
 * Node represents an HTML Element. A node can have a tag name,
 * a list of CSS classes and a list of children nodes.
 */
class Node {
  //Constructor definition ----------
  constructor(tag, id, classes = [], children) {
    // Tag name of the node.
    this.tag = tag;
    //Id of the tag
    this.id = id;
    // Array of CSS class names (string) on this element.
    this.classes = classes;
    // Array of children nodes.
    this.children = children; // All children are of type Node
  }
  //Constructor definition ends ---------------------------
  /*
   * @param {string} the selector string.
   * @returns {Array} Array of descendent nodes.
   * @public
   */
  search(selector) {
    //Checkong for the search string "selector" provided or not -----
    try {
      if (!selector) {
        throw "No selector is passed to the search method !!";
      }
    } catch (err) {
      return err;
    }
    //modifying the selector to search for classes as well ---
    selector = selector.replace(".", "");

    //Initialization of variables for the BFS search
    const obj = this;
    const resultArray = [];
    var queue = [];
    queue.push(obj);
    var size, i;
    var current = {};

    //Checking for calling node object class and id matching the selector or not
    try{
      if (obj.tag === selector) {
        for(let x=0;  x < obj.children.length; x++)
        {
          if(obj.children[x].tag == selector)
          {
            resultArray.push(obj.children[x].id);
          }
          
        }
        return resultArray;       
      } else {
        for (let j = 0; j < obj.classes.length; j++) {
          if (obj.classes[j] === selector) {
            throw "String not found or no search element found .."
            //return resultArray;
          }
        }
      }
    }
    catch(err)
    {
      return err;
    }
   
    //===============================================================================
    while (queue.length > 0) {
      size = queue.length;
      for (i = size; i >= 0; i--) {
        current = queue.shift();
        if (current === undefined) {
          break;
        }
        if (current.tag === selector) {
           resultArray.push(current.id);
        } 
        else {
          for (let j = 0; j < current.classes.length; j++) {
            if (current.classes[j] == selector) {
              resultArray.push(current.id);
              //console.log("Value current ID-->", current.id);
              //console.log( "value of result array of after pushing current id ------>",resultArray);
            }
          }
        }

        for (let k = 0; k < current.children.length; k++) {
          queue.push(current.children[k]);
        }
      }
    }
    try{
      if (resultArray === undefined || resultArray.length == 0 || resultArray == 'null') {
          throw "String not found or no search element found ...";
        } else {
            return resultArray;
        }
      } catch (err) {      
        return err;
    }

  }
} 
  

//Created Node Tree =================
span3 = new Node("span", "span-3", ["sub1-span3"], []);
para1 = new Node("p", "para-1", ["sub1-p1", "note"], []);
div2 = new Node("div", "div-2", ["subContainer1"], [para1, span3]);
span2 = new Node("span", "span-2", [], []);
span1 = new Node("span", "span-1", ["note"], []);
div1 = new Node("div", "div-1", ["mainContainer"], [span1, span2, div2]);
lbl1 = new Node("label", "lbl-1", [], []);
sec1 = new Node("section", "sec-1", [], [lbl1]);
div3 = new Node("div", "div-3", ["subContainer2"], [sec1]);

span4 = new Node("span", "span-4", ["mania"], []);
span5 = new Node("span", "span-5", ["note"], []);
div4 = new Node("div", "div-4", [], [span4, span5]);

div1 = new Node(
  "div",
  "div-1",
  ["mainContainer"],
  [span1, span2, div2, div3, div4]
);
randomNode = new Node("span", "span-6", ["randomSpan"], []);
body = new Node("body", "content", [], [div1, randomNode]);

//========================================================================================

// Testing
console.log("Started........................................");

//----------------------------------------- Test case 1 -------------------------------------

  console.log("--------------------Test Case 1--------------------");
  console.log(div1.search("span")) ;
  

//----------------------------------------- Test case 2 -------------------------------------
// Test case 2 -


  console.log("--------------------Test Case 2--------------------");
  console.log(div1.search(".note")) ;
 

//----------------------------------------- Test case 3 -------------------------------------


  console.log("--------------------Test Case 3--------------------");
  console.log(div1.search("label")) ;
  

//----------------------------------------- Test case 4 -------------------------------------

  console.log("--------------------Test Case 4--------------------");
  console.log(para1.search(".note"));
 
//----------------------------------------- Test case 5 -------------------------------------

  console.log("--------------------Test Case 5--------------------");
  console.log(div1.search("div")) ;
  

//----------------------------------------- Test case 6 -------------------------------------

  console.log("--------------------Test Case 6--------------------");
  console.log(randomNode.search("div")) ;
  

//----------------------------------------- Test case 7 -------------------------------------

  console.log("--------------------Test Case 7--------------------");
  console.log(div2.search("section")) ;
  

//----------------------------------------- Test case 8 -------------------------------------

  console.log("--------------------Test Case 8--------------------");
  console.log(body.search()) ;
  
// Error conditions need to be handled
// invalid input need to be handled

//----------------------------------------- Test case 9 -------------------------------------

  console.log("--------------------Test Case 9--------------------");
  console.log(body.search("section")) ;
  

//----------------------------------------- Test case 10 -------------------------------------

  console.log("--------------------Test Case 10--------------------");
  console.log(div1.search(".randomSpan")) ;
 

console.log("----------------------------------------");
//========================================================================================================
