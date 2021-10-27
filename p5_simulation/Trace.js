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
        this.trail = [createVector(-1, -1)]; //位置座標の配列
    }

    setTrailLead(_leadPosition) {
        this.trail[0] = _leadPosition;
    }
    pushChildAndGetNth() {
        this.trail.push("newChild");
        let nth = this.trail.length - 1;
        return nth;
    }
    updateNthPosition(nth, _childPosition) {
        this.trail[nth] = _childPosition;
    }
    getElderPosition(nth) {
        return this.trail[nth - 1];
    }
}
