/**
 * A linked list implementation in JavaScript.
 * extensively cribbed from:
 * https://github.com/nzakas/computer-science-in-javascript/blob/master/data-structures/linked-list/linked-list.js
 *
 * @constructor
 * @class
 */
var LinkedList = function () {
    this._length = 0;
    this._head = null;
};

LinkedList.prototype = {
    add : function (data) {
        var node = {
            data: data,
            next: null
        };

        var current;
        if (this._head === null) {
            // new list
            this._head = node;
        } else {
            current = this._head;

            while (current.next) {
                current = current.next;
            }

            current.next = node;
        }

        this._length += 1;
        return node;
    },

    size : function () {
        return this._length;
    },

    remove : function (index) {
        var item, current, previous, i = 0;
        if (this.inBounds(index)) {
            current = this._head;

            if (index === 0) {
                this._head = current.next;
            } else {
                while (i++ < index) {
                    previous = current;
                    current = current.next;
                }

                previous.next = current.next;
            }

            this._length -= 1;
            item = current;

        } else {
            item = null;
        }

        return item;
    },

    inBounds : function (index) {
        return (index > -1 && index < this._length);
    },

    item : function (index) {
        var item, current, i = 0;
        if (this.inBounds(index)) {
            current = this._head;
            while (i += 1 < index) {
                current = current.next;
            }

            item = current;
        } else {
            item = null;
        }
        return item;
    },

    get : function (index) {
        var item = this.item(index);
        return item ? item.data : null;
    },

    toArray : function () {
        var result = [], current = this._head;
        while (current) {
            result.push(current.data);
            current = current.next;
        }

        return result;
    },

    toString : function () {
        return this.toArray().join(",");
    }
};

module.exports = LinkedList;
