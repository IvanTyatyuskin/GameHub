export class Room {
    constructor(id = '', name = '', 
    locked = false, password = '', 
    count = null, maxCount = null){
        this.id = id;
        this.name = name;
        this.locked = locked;
        this.password = password;
        this.count = count;
        this.maxCount = maxCount;
    }
}

export const testRoomsData = [
    new Room(null, "Room 1", true, '', '5', '6'),
    new Room(null, "Room 2", false, '', '3', '3'),
    new Room(null, "Room 3", false, '', '4', '6'),
    new Room(null, "Room 4", true, '', '5', '6'),
]