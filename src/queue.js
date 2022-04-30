const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  listItems = [];

  getUnderlyingList() {
    return this.listItems[0];
  }

  enqueue(value) {
    if (this.listItems.length === 0) {
      this.listItems.push(new ListNode(value));
    } else {
      let temp = new ListNode(value);
      this.listItems[this.listItems.length - 1].next = temp;
      this.listItems.push(temp);
    }
  }

  dequeue() {
    return this.listItems.shift().value;
  }
}

module.exports = {
  Queue
};
