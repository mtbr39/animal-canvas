import { System } from "./system";

export class SystemManager {
    private systems: System[] = [];

    addSystems(systems: System[]) {
        this.systems.push(...systems);
    }

    updateSystems() {
        this.systems.forEach((system) => {
            system.update();
        });
    }
}
