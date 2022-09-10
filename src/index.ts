class User {
    private id: number;
    public constructor(id: number) {
        this.id = id;
    }
    public getId(): number {
        return this.id;
    }
}

const u = new User(12);
console.log(u.getId());