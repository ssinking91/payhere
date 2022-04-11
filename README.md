<br />

### ✨ [페이히어] 프론트엔드 엔지니어 과제 - 신항민

---

<br />

### 💫  프로젝트 소개

- GitHub의 Public Repository를 검색한 후 Issue들을 모아 놓은 페이지 구현

<br />

### ⚙️  프로젝트 기획

1. 코드 재사용성 및 컴포넌트화를 고려
2. 렌더링 최적화를 고려
3. UI/UX를 고려

<br />

### 🛠 기능 시연 

<div align="center">
    <img width="500px" height="300px" src="https://user-images.githubusercontent.com/89959952/162679382-03cbc451-9e28-44cd-8bac-e477d5081e39.gif"/>
</div>

<br />

### 👀  요구사항

1. Repository명을 입력해서 Repository를 검색할 수 있다.
2. 검색된 Public Repository를 등록할 수 있다.

   - 등록 개수는 최대 4개로 제한하며, 최대 개수 초과 등록 시 이를 사용자에게 알려준다.

   - LocalStorage로 데이터 저장

3. 등록된 Repository를 삭제할 수 있다.
4. 등록된 각각의 Public Repository의 issue를 한 페이지에서 모아서 볼 수 있다.
   - 각 issue 마다 제목, Repository 명은 필수로 표현되어야 한다. 그 이외의 데이터 중 필요하다고 생각되는 부분은 추가한다.
   - 해당 issue를 클릭하면 Github의 상세 페이지로 이동할 수 있다.
   - 페이지네이션을 통해서 계속해서 issue를 모아서 볼 수 있다.

<br />

### 🔨  실행방법 - 1

1. Github Repository를 검색할 수 있는 검색창에 Repository를 입력해 주세요.
2. Saved Repositories 중 보고 싶은 Repository 클릭해 주세요.
3. 모아놓은 Issue들 중 하나를 클릭하면 해당 사이트로 이동합니다.
   <br />

### 🔧  실행방법 - 2

```jsx
git clone https://github.com/ssinking91/payhere.git

cd

npm install

npm start
```

<br />

### 👨🏻‍💻 기능 구현 목록

<br>

### 1. 코드 재사용성 - hooks

<br>

> 코드를 작성하면서 생각한 것은
>
> 1.  하나의 함수는 하나의 기능 구현
> 2.  재사용성
> 3.  hook을 만들어 아이템을 가져오고 state에 저장하는 중복작업을 최소화
>
> 이 점을 가장 많이 생각했다.

- 총 3가지의 hook을 만들었습니다.

1. /src/hooks/useLocalStorage.js

- localStorage에 추가하는 부분과 삭제하는 부분은 버튼의 내용만 다르다. 따라서 재사용 가능하게 구현

2. /src/hooks/useIntersect.js

- 무한 스크롤(Infinite scroll)을 Intersection Observer(교차 관찰자 API)를 기반으로 교차 했을때 callback함수의 반복적인 작업을 한다. 따라서 재사용 가능하게 구현

3. /src/hooks/useGetQs.js

- Issue 페이지 이동시 쿼리스트링 key 와 value 를 파싱하는 작업을 한다. 따라서 재사용 가능하게 구현

<br />

### 2. 렌더링 최적화

<br />

> 렌더링 최적화 위해 생각한 것은
>
> 1.  React.memo를 이용한 컴포넌트 메모이제이션 방법
>
>     - React.memo는 컴포넌트를 래핑하여 props를 비교하여 메모이제이션 기법을 제공하는 함수로서 리렌더링을 방지 하였습니다.
>
> 2.  React.useCallback
>
>     - useCallback으로 함수를 선언해주면 종속 변수들이 변하지 않으면 굳이 함수를 재생성하지 않고 이전에 있던 참조 변수를 그대로 하위 컴포넌트에 props로 전달하여 하위 컴포넌트도 props가 변경되지 않았다고 인지하게 됩니다. 이에 따라 하위 컴포넌트의 리렌더링을 방지 하였습니다.
>
> 3.  하위 컴포넌트의 props로 객체를 넘겨주는 경우 새 객체 생성을 주의
>
>     - props로 전달한 객체가 동일한 값을 보유하고 있다고 하더라도 새로 생성된 객체는 이전 객체와 다른 참조 주소를 가진 객체이기 때문에 메모이제이션이 통하지 않습니다. 따라서 생성자 함수나 객체 리터럴로 객체를 생성해서 하위 컴포넌트로 넘겨주는 방식보다는, state를 그대로 하위컴포넌트에 넘겨주어 필요한 데이터 가공을 그 하위컴포넌트에서 해주는 것이 좋습니다.

<br/>

1. React.memo를 이용한 컴포넌트

- Spinner.jsx/ToastModal.jsx/Pagination.jsx에 컴포넌트의 props 가 바뀌지 않았다면, 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화

2. React.useCallback

- 컴포넌트에서 props 가 바뀌지 않았으면 Virtual DOM 에 새로 렌더링하는 것 조차 하지 않고 컴포넌트의 결과물을 재사용 하는 최적화 작업을 위해 컴포넌트 이벤트 핸들러(event handler)에 useCallback으로 묶어 함수를 새로 만들지 않고 재사용

3. redux를 통한 전역상태 관리

- 하위 컴포넌트의 props로 객체를 넘겨주는 것을 최소한으로 사용하고, redux를 사용하여 데이터가 필요한 컴포넌트에 리덕스 스토어를 구독(useSelector)하도록 함

- 불변객체 관리를 위해 immer(package)와 액션 생성 함수를 더 짧은 코드로 작성 및 리듀서를 작성할 때 switch문이 아닌 handleActions라는 함수를 사용 가독성을 높이기 위해 redux-actions(package)사용

<br />

### 3. UI/UX를 고려

<br/>

<div align="center">
    <img width="500px" height="300px" src="https://user-images.githubusercontent.com/89959952/162684248-b56c35a1-ddce-4a13-8eeb-214eb06fa246.gif"/>
</div>

<br/>

> 1. 전체적인 컴포넌트 생성 시 width값을 % 로 설정해 가로 사이즈가 줄어들때 자동으로 크기를 가져가도록 설정, 미디어 쿼리를 사용해 특정 컴포넌트 크기 및 색상 노출 여부를 컨트롤 하였고, 모바일 사이즈가 되었을 때 모바일 전용 제공 하였습니다.

- /src/pages/Home.jsx
- /src/pages/Issue.jsx

<br />

> 2. React axios를 활용하여 api를 호출하면 발생하는 딜레이 시간 동안 로딩 화면을 보여줄 Spinner 기능 제공 하였습니다.

- /src/components/Spinner.jsx

<br />

> 3. 사용자 경험을 고려하여 기존 알럿창으로 뜨는 경고창을 모달창으로 변경하여 구현을 하였습니다.

- /src/components/ToastModal.jsx

<br />

### 3. React props 디버깅

> 1. React는 내장된 타입 검사 기능인 propTypes를 사용하여 컴포넌트의 props에 타입 검사를 한 후 버그를(bug) 쉽게 확인 하였습니다.. propTypes는 성능상의 이유로 개발 모드(Development mode) 에서만 확인 가능 합니다.

<br />

<br />

😀 &nbsp; 어려웠던 점

1. useLocalStorage(hooks)와 Redux

> - Home 컴포넌트 안에 있는 SearchList와 RepoList 사이 LocalStorage를 위해 useLocalStorage(hooks)를 사용했지만 부모 요소인 Home 컴포넌트에서 useLocalStorage(hooks)를 정의하지 않고 자식 요소인 SearchList와 RepoList에 각각 정의를 하여 한쪽에서 데이터가 업데이트되어도 다른 한쪽에서는 렌더링이 되지 않았다.
> - 부모 요소인 Home 컴포넌트에서 useLocalStorage(hooks) 사용하여 데이터를 props로 넘겨줄 시 Home 컴포넌트를 포함한 하위 요소가 전체 렌더링 되기 때문에 Redux를 통해 전역 상태 관리함과 동시에 데이터가 필요한 컴포넌트에 리덕스 스토어를 구독(useSelector) 하도록 함으로써 상태 관리와 렌더링 최적화를 하였다.

<br />
