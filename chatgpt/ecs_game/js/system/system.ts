import { Entity } from "../entity";

export abstract class System {
    entities: Entity[];

    constructor(entities: Entity[]) {
        this.entities = entities;
    }

    abstract update(): void;
}

interface ExecutableOnce {
    executeOnce(key: string, fn: () => void): void;
    resetExecution(key: string): void;
}

export class UtilitySystem extends System implements ExecutableOnce {
    private executedFunctions: Set<string> = new Set();

    constructor(entities: Entity[]) {
        super(entities);
    }

    update() {
        // System の update メソッドの実装
    }

    executeOnce(key: string, fn: () => void) {
        if (!this.executedFunctions.has(key)) {
            fn(); // 渡された関数を実行
            this.executedFunctions.add(key); // 実行済みのフラグをセットに追加
        }
    }

    resetExecution(key: string) {
        this.executedFunctions.delete(key); // 指定されたキーのフラグを削除
    }
}