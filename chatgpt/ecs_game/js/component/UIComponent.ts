// UI要素の位置とサイズを管理するComponent
export class UIComponent {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) {}
}

// ボタン用のComponent（ボタンのラベルやクリック時のアクションなど）
export class ButtonComponent {
    constructor(public label: string, public action: () => void) {}
}
