"use strict";
class User {
    constructor(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
}
const u = new User(12);
console.log(u.getId());
