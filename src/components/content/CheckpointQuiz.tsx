/* 빠른 이해 점검 — 로컬 데이터 기반. 점수 경쟁이 아니라 이해 확인에 초점. */
import { useState } from "react";
import type { QuizItem } from "@/types/content";
import { Block } from "./blocks";

function McqOx({ item }: { item: Extract<QuizItem, { type: "mcq" | "ox" }> }) {
  const [selected, setSelected] = useState<number | null>(null);
  const isOx = item.type === "ox";
  const choices = isOx ? ["O (맞다)", "X (아니다)"] : item.choices;
  const correctIndex = isOx ? (item.answer ? 0 : 1) : item.answerIndex;
  const answered = selected !== null;

  return (
    <li className="quiz__item">
      <p className="quiz__question">{item.question}</p>
      <div className="quiz__choices" role="group" aria-label="선택지">
        {choices.map((c, i) => {
          const state = !answered
            ? ""
            : i === correctIndex
              ? "is-correct"
              : i === selected
                ? "is-wrong"
                : "";
          return (
            <button
              key={i}
              type="button"
              className={`quiz__choice ${state}`}
              aria-pressed={selected === i}
              disabled={answered}
              onClick={() => setSelected(i)}
            >
              <span className="quiz__choice-mark" aria-hidden="true">
                {answered && i === correctIndex ? "✓" : answered && i === selected ? "✗" : ""}
              </span>
              {c}
            </button>
          );
        })}
      </div>
      {answered && (
        <p className={`quiz__feedback ${selected === correctIndex ? "ok" : "no"}`}>
          {selected === correctIndex ? "정답입니다. " : "다시 볼까요? "}
          {item.explanation}
        </p>
      )}
    </li>
  );
}

function SelfCheck({ item }: { item: Extract<QuizItem, { type: "self" }> }) {
  const [text, setText] = useState("");
  return (
    <li className="quiz__item">
      <p className="quiz__question">{item.question}</p>
      <textarea
        className="textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="스스로 답을 적어 보세요. (기기에 저장되지 않는 자기 점검용입니다)"
        aria-label="자기 점검 답안"
      />
    </li>
  );
}

export function CheckpointQuiz({ items }: { items: QuizItem[] }) {
  return (
    <Block eyebrow="Checkpoint · 빠른 이해 점검" title="빠른 이해 점검">
      <p className="muted" style={{ marginBottom: "var(--space-md)" }}>
        점수가 아니라 이해를 확인하기 위한 문항입니다.
      </p>
      <ol className="quiz">
        {items.map((item, i) =>
          item.type === "self" ? (
            <SelfCheck key={i} item={item} />
          ) : (
            <McqOx key={i} item={item} />
          ),
        )}
      </ol>
    </Block>
  );
}
