export const canvasScaler = () => {
  let scale = 1;
  let gameSize = {};

  return {
    point: (point: Point) => {
      return {
        x: point.x * scale,
        y: point.y * scale,
      };
    },
    value: (value: number) => {
      return value * scale;
    },
    array: (array: number[]) => {
        return array.map(value => value * scale);
    },
    array2: (array: number[]): number[] => {
        const adjustedScale = scale * 1.05; // 0.000001など微小な調整値を加える
        return array.map(value => value * adjustedScale);
    },
    setScale: (newScale: number) => {
      scale = newScale;
    },
    setGameSize: (newGameSize: {}) => {
        gameSize = newGameSize;
    },
    getScale: () => {
      return scale;
    }
  };
};
