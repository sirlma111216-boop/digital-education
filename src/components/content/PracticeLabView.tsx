/* 실습 활동 — 4~15차시에만 표시. 체크리스트는 localStorage 진행 상태에 연동. */
import type { PracticeLab } from "@/types/content";
import { useProgress } from "@/hooks/useProgress";
import { Block } from "./blocks";

export function PracticeLabView({
  sessionId,
  practice,
}: {
  sessionId: string;
  practice: PracticeLab;
}) {
  const { isStepChecked, toggleStep } = useProgress();

  return (
    <Block eyebrow="Practice · 실습 활동" title={practice.title}>
      <p className="practice__goal">
        <strong>목표</strong> {practice.goal}
      </p>

      <ol className="practice__steps">
        {practice.steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>

      {practice.checklist && practice.checklist.length > 0 && (
        <div className="practice__checklist">
          <p className="eyebrow">실습 체크리스트</p>
          <ul>
            {practice.checklist.map((c, i) => {
              const checked = isStepChecked(sessionId, i);
              return (
                <li key={i}>
                  <label className="check">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleStep(sessionId, i)}
                    />
                    <span className={checked ? "check__done" : ""}>{c}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {practice.deliverable && (
        <p className="practice__deliverable">
          <strong>제출물</strong> {practice.deliverable}
        </p>
      )}
    </Block>
  );
}
