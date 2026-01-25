# EAT-SSU Team Blog

숭실대학교 EAT-SSU 개발팀의 팀 블로그 랜딩 페이지입니다.

## 🚀 Deployment

이 프로젝트는 [GitHub Pages](https://pages.github.com/)를 통해 배포됩니다.

1.  코드를 GitHub 저장소(`eat-ssu.github.io`)에 푸시합니다.
    ```bash
    git push -u origin main
    ```
2.  GitHub 저장소의 **Settings > Pages** 메뉴로 이동합니다.
3.  **Build and deployment > Source**가 **Deploy from a branch**로 되어있는지 확인합니다.
4.  **Branch**가 **main**으로 설정되어 있는지 확인합니다.
5.  잠시 후 `https://eat-ssu.github.io`에서 사이트를 확인할 수 있습니다.

## 📝 Content Management (Dynamic)

블로그 글이나 유튜브 영상은 코드를 수정하지 않고 **Google Sheets**를 통해 관리할 수 있습니다.

1.  **Google Sheet 준비**: [템플릿 시트](https://docs.google.com/spreadsheets/d/1v81usaClR5WT6ZX9ylKcDzTe4kO6YLFcrTyerrJOnb8/edit?usp=sharing)를 복사하여 사용하세요.
2.  **데이터 입력**:
    *   `icon`: 이모지 (예: 📝, 📺)
    *   `title`: 제목
    *   `description`: 설명
    *   `url`: 링크 주소
    *   `category`: `media` (유튜브) 또는 `blog` (블로그)
    *   `name`: 작성자 이름 (옵션)
    *   `part`: 파트/태그 (옵션, 예: 서버)
3.  **웹에 게시**:
    *   `파일 > 공유 > 웹에 게시`
    *   형식을 **CSV**로 선택하고 게시합니다.
4.  **연동**:
    *   `scripts/data-loader.js` 파일을 엽니다.
    *   `const DATA_URL` 변수에 게시된 CSV 링크를 붙여넣습니다.

## 🛠 Project Structure

*   `index.html`: 메인 페이지 구조
*   `styles/main.css`: 디자인 스타일 (Toss/Karrot 테마)
*   `scripts/`:
    *   `main.js`: 스크롤 애니메이션 로직
    *   `data-loader.js`: 구글 시트 데이터 파싱 및 렌더링
*   `assets/`: 정적 리소스 (초기 로딩용 csv 등)
