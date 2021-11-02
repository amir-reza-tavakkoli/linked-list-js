//Todo => fix highly-coupled Node and linkedList classes in near future
//Todo => better organization, function level
class Node<Type> {
    public value : Type;
    public next : Node<Type> | null;

    constructor(value : Type) {
        if (!new.target) {
            throw new Error('must be called with new');
        }

        this.value = value;
        this.next = null;
    }
}

class linkedList<Type> {
    public head : Node<Type> | null;
    public tail : Node<Type> | null;
    protected length : number;

    constructor() {
        if (!new.target) {
            throw new Error('Must be called with new');
        }
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    add(node : Node<Type>) : Node<Type> {
        if (!(node instanceof Node)) {
            throw new TypeError("You can only add a Node obj");
        }

        this.length++;

        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }

        return node;
    }

    prepend (node : Node<Type>) : Node<Type> {
        if(!(node instanceof Node)) {
            throw new TypeError("You can only prepend a Node obj");
        }

        this.length++;

        node.next = this.head;
        this.head = node;
        return node;
    }

    insert(node : Node<Type>, index : number) : Node<Type> {

        if(!(node instanceof Node)) {
            throw new TypeError("You can only add a Node obj");
        }


        if (index > this.length) {
            throw new RangeError("Out of range index");
        } else if (this.length === index) {
            return this.add(node);
        } else if (index === 0) {
            return this.prepend(node);
        }

        this.length++;


        const {prevNode,nextNode} = this.getAdjacantNodes(index);
        prevNode.next = node;
        node.next = nextNode;

        return node;
    }


    getNode(index : number) : Node<Type> {
        if (index > this.length) {
            throw new RangeError("Out of range index");
        }

        let { prevNode } = this.getAdjacantNodes(index);
        return prevNode.next;
    }

    remove(index : number) : Node<Type> {
        if (index > this.length) {
            throw new RangeError("Out of range index ");

        } else if (index === 0) {
            let node = this.head;
            this.head = this.head.next;

            this.length--;

            return node;

        } else if (index === this.length) {
            let { prevNode, nextNode : currentNode } = this.getAdjacantNodes(index - 1);
            this.tail = prevNode;
            prevNode.next = null;
            this.length--;

            return currentNode;
        } else {
            let {prevNode, nextNode : currentNode } = this.getAdjacantNodes(index);
            let node = prevNode.next;
            prevNode.next = currentNode.next;

            this.length--;

            return node;
        }
    }

    getSize() : number {
        return this.length;
    }

    [Symbol.iterator]() {
        let iteratorHead = this.head;

        return {
            next : () => {
                if (iteratorHead != null) {
                    let val = iteratorHead.value;
                    iteratorHead = iteratorHead.next;
                    return {value : val, done : false};

                } else {
                return {value : undefined, done : true};
                }
            }
        }
    }

    protected getAdjacantNodes(index : number) : { prevNode : Node<Type>, nextNode : Node<Type> } {
        if (index > this.length) {
            throw new RangeError("Out of range index");
        }

        let count = 0;
        let prevNode = this.head;
        let nextNode = prevNode.next;

        while (count < index - 1) {
        prevNode = prevNode.next;
        nextNode = prevNode.next;
        count++;
        }

        return { prevNode, nextNode }
    }
}

let n1 = new Node(1);
let n2 = new Node(2);
let n3 = new Node(3);
let n4 = new Node(4);
let n5 = new Node(5);
let l = new linkedList();
l.add(n1);
l.add(n2);
l.prepend(n3)
l.insert(n4,1)
l.add(n5)
const iterator = l[Symbol.iterator]();
// console.log(iterator + ''); // "[object String Iterator]"

// console.log(iterator.next()); // { value: "h", done: false }
// console.log(iterator.next()); // { value: "i", done: false }
// console.log(iterator.next()); // { value: undefined, done: true }