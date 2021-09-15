//==============================================================================
//[クラス図 Trace系統]
// Trace    <-  Carrier
//          <-  Cargos  <-* Cargo
// CargoはTraceを介してCarrierに追尾する。
// Traceは何にも依存していない。関数を呼び出されるだけ。
// CarrierはTraceに自分の位置を教えているだけで、Cargosのことは知らない。
//==============================================================================

//TraceとCarrierは1:1 TraceはCargosに付けたりはずしたりする
class Trace {
    constructor() {
        this.parentPosition = "init";
        this.childrenPosition = [createVector(-1, -1)];
    }
    getElderPosition(nth) {
        return this.childrenPosition[nth - 1];
    }
    updateParent(_parentPosition) {
        this.childrenPosition[0] = _parentPosition;
    }
    getNthPosition(nth) {
        return this.childrenPosition[nth]
            ? this.childrenPosition[nth]
            : "error:その番号のpositionはありません";
    }
    pushChildAndGetNth() {
        this.childrenPosition.push("newChild");
        let nth = this.childrenPosition.length - 1;
        return nth;
    }
    updateNthPosition(nth, _childPosition) {
        this.childrenPosition[nth] = _childPosition;
    }
}
