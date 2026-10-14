import { useEffect, useState } from "react";
import { LESSON_POPUP_EVENT, readPopupState, type PopupState } from "./lessonConfig";

/** 이 탭에서 해당 수업의 팝업 억제 상태(닫음/시청 완료)를 구독. */
export function usePopupState(id: string | null): PopupState {
  const [state, setState] = useState<PopupState>(() => (id ? readPopupState(id) : null));

  useEffect(() => {
    if (!id) return;
    setState(readPopupState(id));
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ id: string; state: PopupState }>).detail;
      if (detail?.id === id) setState(detail.state);
    };
    window.addEventListener(LESSON_POPUP_EVENT, onChange);
    return () => window.removeEventListener(LESSON_POPUP_EVENT, onChange);
  }, [id]);

  return state;
}
