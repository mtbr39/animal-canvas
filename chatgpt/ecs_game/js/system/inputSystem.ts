import { Entity } from "../entity";
import { System } from "./system";
import { Component, MapComponent, PlayerComponent, VelocityComponent } from "../component";
import { MapGenerator } from "../mapGenerator";

type ComponentType<T> = new (...args: any[]) => T;

export class InputSystem {
    private isPointerHold: boolean = false;
    constructor(private entities: Entity[], private scaler: any) {
        window.addEventListener("keydown", this.handleKeydown.bind(this));
        window.addEventListener("keyup", this.handleKeyup.bind(this));
        window.addEventListener("pointerdown", this.handlePointerDown.bind(this));
        window.addEventListener("pointermove", this.handlePointerMove.bind(this));
        window.addEventListener("pointerup", this.handlePointerUp.bind(this));
    }

    findComponents(entity: Entity, componentTypes: ComponentType<Component>[]): Record<string, Component> {
        const foundComponents: Record<string, Component> = {};

        const components = Object.entries(entity.components);
        for (const [componentName, component] of components) {
            for (const componentType of componentTypes) {
                if (component instanceof componentType) {
                    foundComponents[componentName] = component as ComponentType<Component>;
                    break;
                }
            }
        }

        return foundComponents;
    }

    executeIfAllComponentsFound(entity: Entity, componentTypes: ComponentType<Component>[], callback: (components: Record<string, Component>) => void) {
        const foundComponents = this.findComponents(entity, componentTypes);

        if (Object.keys(foundComponents).length === componentTypes.length) {
            callback(foundComponents);
        }
    }

    private handleKeydown(event: KeyboardEvent) {
        this.entities.forEach((entity) => {
            const player = entity.components.PlayerComponent as PlayerComponent;
            const velocity = entity.components.VelocityComponent as VelocityComponent;

            if (player && velocity) {
                switch (event.key) {
                    case "w":
                        velocity.speedY = -5;
                        break;
                    case "a":
                        velocity.speedX = -5;
                        break;
                    case "s":
                        velocity.speedY = 5;
                        break;
                    case "d":
                        velocity.speedX = 5;
                        break;
                }

                return; // forEachを終了
            }
        });
    }

    private handleKeyup(event: KeyboardEvent) {
        let player = [];
        this.entities.forEach((entity) => {
            const player = entity.components.PlayerComponent as PlayerComponent;
            const velocity = entity.components.VelocityComponent as VelocityComponent;

            if (player && velocity) {
                switch (event.key) {
                    case "w":
                    case "s":
                        velocity.speedY = 0;
                        break;
                    case "a":
                    case "d":
                        velocity.speedX = 0;
                        break;
                }

                return; // Playerは1つしかないのでforEachを終了
            }
        });
    }

    handlePointerDown(ev: PointerEvent) {
        this.isPointerHold = true;
        const clientX = ev.clientX * window.devicePixelRatio;
        const clientY = ev.clientY * window.devicePixelRatio;

        // this.updateMapFromPointer(clientX, clientY);
    }

    handlePointerMove(ev: PointerEvent) {
        const clientX = ev.clientX * window.devicePixelRatio;
        const clientY = ev.clientY * window.devicePixelRatio;

        if (this.isPointerHold) {
            this.updateMapFromPointer(clientX, clientY);
        }
    }

    handlePointerUp(ev: PointerEvent) {
        this.isPointerHold = false;
        const clientX = ev.clientX * window.devicePixelRatio;
        const clientY = ev.clientY * window.devicePixelRatio;
    }

    updateMapFromPointer(clientX: number, clientY: number) {
        let map: MapComponent;
        this.entities.forEach((entity) => {
            const mapComponent = entity.components.MapComponent as MapComponent;
            if (mapComponent) {
                map = mapComponent;
                const mapCellGridSize = 10;
                const clickPoint = MapGenerator.convertCenterPointToPoint({ x: clientX, y: clientY }, mapCellGridSize, this.scaler.getScale());

                map.grid[clickPoint.y][clickPoint.x] = 0;
                return;
            }
        }); 
    }
}
