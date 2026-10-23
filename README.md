# 벤치에서 명전까지 — 프런트엔드

고등학교부터 MLB 명예의 전당까지 선수를 육성하는 야구 커리어 게임의 정적 프런트엔드 프로토타입입니다.

## 로컬 실행

Python 3가 설치되어 있다면 저장소 루트에서 실행합니다.

```bash
python3 -m http.server 4173
```

브라우저에서 `http://localhost:4173`을 엽니다. 선수 데이터는 현재 브라우저의 `localStorage`에 저장됩니다.

## 구성

- `index.html` — 게임 화면과 선수 생성 UI
- `styles.css` — 반응형 스타일
- `game.js` — 브라우저 기반 게임 로직

백엔드 API 계약 문서는 `bench-to-hall-baseball-backend` 저장소에서 관리합니다.
