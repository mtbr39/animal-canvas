import { Entity } from "../entity";

export abstract class System {
    entities: Entity[];

    constructor(entities: Entity[]) {
        this.entities = entities;
    }

    abstract update(): void;
}
