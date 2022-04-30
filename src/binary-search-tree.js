const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor(){
    this.rootNode = null;
  }

  root() {
    if (this.rootNode === null) {
      return null;
    } else {
      return this.rootNode;
    }
  }

  add(data) {
    if (this.rootNode === null) {
      this.rootNode = new Node(data);
    } else {
      let node = this.rootNode;
      while (node !== null) {
        if (node.left === null && node.data > data) {
          node.left = new Node(data);
          node = null;
        } else if (node.right === null && node.data < data) {
          node.right = new Node(data);
          node = null;
        } else if (node.data > data){
          node = node.left;
        } else {
          node = node.right;
        }
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let node = this.rootNode;
    while (node !== null) {
      if (node.data === data) {
        return node;
      }
      if (node.left !== null && node.data > data) {
        if (node.left.data === data) {
          return node.left;
        }
        node = node.left;
      } else if (node.right !== null && node.data < data) {
        if (node.right.data === data) {
          return node.right;
        }
        node = node.right;
      } else {
        return null;
      }
    }
  }

  remove(data) {
    let node = this.rootNode;
    while (node !== null) {
      //root
      if (node.data === data) {
        let minFromRight = node.right;
        let tempNodeForRemoveMinFromRight = null;
        while (minFromRight.left !== null) {
          tempNodeForRemoveMinFromRight = minFromRight;
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        if (tempNodeForRemoveMinFromRight !== null) {
          if (isLeaf(tempNodeForRemoveMinFromRight)) {
            tempNodeForRemoveMinFromRight.left = null;
          } else {
            updateTree(tempNodeForRemoveMinFromRight); //fix
          }
        } else {
          node.right = null;
        }
        return;
      }
      //any
      if (node.left !== null && node.data > data) {
        if (node.left.data === data) {  //node найдена
          if (isLeaf(node.left)) {
            node.left = null;
            return;
          } else if (withSingleChild (node.left)) {
            if (node.left.left !== null) {
              node.left = node.left.left;
              return;
            } else if (node.left.right !== null) {
              node.left = node.left.right;
              return;
            }
          } else {
            let minFromRight = node.left.right;
            let tempNodeForRemoveMinFromRight = null;
            while (minFromRight.left !== null) {
              tempNodeForRemoveMinFromRight = minFromRight;
              minFromRight = minFromRight.left;
            }
            node.left.data = minFromRight.data;
            if (tempNodeForRemoveMinFromRight !== null) {
              if (isLeaf(tempNodeForRemoveMinFromRight)) {
                tempNodeForRemoveMinFromRight.left = null;
              } else {
                updateTree(tempNodeForRemoveMinFromRight); //fix
              }
            } else {
              node.left.right = null;
            }
            return;
          }
        }
        node = node.left;
      } else if (node.right !== null && node.data < data) {
        if (node.right.data === data) { //node найдена
          if (isLeaf(node.right)) {
            node.right = null;
            return;
          } else if (withSingleChild (node.right)) {
            if (node.right.left !== null) {
              node.right = node.right.left;
              return;
            } else if (node.right.right !== null) {
              node.right = node.right.right;
              return;
            }
          } else {
            let minFromRight = node.right.right;
            let tempNodeForRemoveMinFromRight = null;
            while (minFromRight.left !== null) {
              tempNodeForRemoveMinFromRight = minFromRight;
              minFromRight = minFromRight.left;
            }
            node.right.data = minFromRight.data;
            if (tempNodeForRemoveMinFromRight !== null) {
              if (isLeaf(tempNodeForRemoveMinFromRight)) {
                tempNodeForRemoveMinFromRight.left = null;
              } else {
                updateTree(tempNodeForRemoveMinFromRight); //fix
              }
            } else {
              node.right.right = null;
            }
            return;
          }
        }
        node = node.right;
      } else {
        return;
      }
    //end while
    }
    
    function isLeaf (node) {
      return (node.left === null && node.right === null);
    }

    function withSingleChild (node) {
      return ((node.left === null && node.right !== null) || (node.left !== null && node.right === null));
    }

    function updateTree(node) {
      node.left = node.left.right;
    }
  }

  min() {
    let minNode = this.rootNode;
    while (minNode.left !== null) {
      minNode = minNode.left;
    }
    return minNode.data;
  }

  max() {
    let maxNode = this.rootNode;
    while (maxNode.right !== null) {
      maxNode = maxNode.right;
    }
    return maxNode.data;
  }
}

module.exports = {
  BinarySearchTree
};