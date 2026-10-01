/* ==========================================================================
   인터랙티브 그림 진입점. 그림 컴포넌트는 차시 본문처럼 필요할 때만 로드한다
   (메인 번들에 싣지 않음).
   ========================================================================== */

import { lazy, Suspense } from "react";
import type { TheoryFigure } from "@/types/content";

const MetaverseModelFigure = lazy(() =>
  import("./MetaverseModelFigure").then((m) => ({ default: m.MetaverseModelFigure })),
);
const TpackFigure = lazy(() => import("./TpackFigure").then((m) => ({ default: m.TpackFigure })));

export function TheoryFigureView({ figure }: { figure: TheoryFigure }) {
  return (
    <Suspense
      fallback={
        <div className="loading-block">
          <span className="spinner" aria-hidden="true" /> 그림을 불러오는 중…
        </div>
      }
    >
      {figure.type === "metaverse-model" && <MetaverseModelFigure steps={figure.steps} />}
      {figure.type === "tpack" && <TpackFigure regions={figure.regions} />}
    </Suspense>
  );
}
