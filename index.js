class TreeNode {
  constructor(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class BSTree {
  constructor() {
    this.mainRoot = null;
  }

  insertNode(data) {
    const newTreeNode = new TreeNode(data);
    if (this.mainRoot === null) {
      this.mainRoot = newTreeNode;
      return;
    }

    let currentNode = this.mainRoot;
    while (true) {
      if (data === currentNode.data) {
        return;
      }
      if (data < currentNode.data) {
        if (currentNode.leftChild === null) {
          currentNode.leftChild = newTreeNode;
          return;
        }
        currentNode = currentNode.leftChild;
      } else {
        if (currentNode.rightChild === null) {
          currentNode.rightChild = newTreeNode;
          return;
        }
        currentNode = currentNode.rightChild;
      }
    }
  }

  searchValue(data) {
    let currentNode = this.mainRoot;
    while (currentNode) {
      if (data === currentNode.data) {
        return true;
      }
      if (data < currentNode.data) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }
    return false;
  }

  deleteNode(data) {
    this.mainRoot = this.removeNode(this.mainRoot, data);
  }
  //handler for the deleting the node
  removeNode(currentNode, data) {
    if (currentNode === null) {
      return null;
    }
    //check the original value to the current value
    if (data === currentNode.data) {
      if (currentNode.leftChild === null && currentNode.rightChild === null) {
        return null;
      }
      //when left child is equal to null it moves to right child
      if (currentNode.leftChild === null) {
        return currentNode.rightChild;
      }
      //when right child is equal to null it moves to left child
      if (currentNode.rightChild === null) {
        return currentNode.leftChild;
      }
      //
      let smallestValueNode = this.findMin(currentNode.rightChild);
      currentNode.data = smallestValueNode.data;
      currentNode.rightChild = this.removeNode(
        currentNode.rightChild,
        smallestValueNode.data
      );
      return currentNode;
    }

    if (data < currentNode.data) {
      currentNode.leftChild = this.removeNode(currentNode.leftChild, data);
      return currentNode;
    }
    currentNode.rightChild = this.removeNode(currentNode.rightChild, data);
    return currentNode;
  }

  findMin(node) {
    while (node.leftChild) {
      node = node.leftChild;
    }
    return node;
  }

  updateValue(oldData, newData) {
    if (this.searchValue(oldData)) {
      this.deleteNode(oldData);
      this.insertNode(newData);
      return true;
    }
    return false;
  }
}

const bstTree = new BSTree();
bstTree.insertNode(30);
bstTree.insertNode(12);
bstTree.insertNode(40);
bstTree.insertNode(10);
bstTree.insertNode(15);

console.log(bstTree.searchValue(12));
console.log(bstTree.searchValue(3));

bstTree.updateValue(10, 18);
bstTree.deleteNode(15);

console.log(JSON.stringify(bstTree, null, 2));
// console.log(bstTree);
