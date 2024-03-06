let btn = document.querySelector(".btn");
let container = document.querySelector(".container");
let searchBox = document.querySelector("input");
let btnSpan = document.querySelector(".btn span");
let options = null;

btn.addEventListener("click", () => container.classList.toggle("active"))

for (country of countries) {
  let option = `
  <li class="option">
    <span class="iconify" data-icon="flag:${country.code.toLowerCase()}-4x3"></span>
    <span class="country-name">${country.name}</span>
  </li>
  `;
  container.querySelector("ul").insertAdjacentHTML("beforeend", option);
  //ul태그의 마지막 자식요소로 option을 삽입함
  options = document.querySelectorAll(".option");
}
function searchCountry() {
  //사용자 입력값을 소문자로 변환
  let searchQuery = searchBox.value.toLowerCase();
  for (option of options) {
    let isMatched = option
      .querySelector(".country-name")
      .innerText.toLowerCase()
      .includes(searchQuery);
    //isMatched 변수는 option에서 country-name클래스의 text를 소문자로 바꾼 값이며 
    //for문을 돌며 그 값이 searchQuery와 같으면 할당된다 
    option.classList.toggle("hide", !isMatched);
    //option이 isMatched가 아니면  hide클래스를 부여하고 맞으면 hide클래스 제거
    //검색어와 일치하지 않으면 숨기고 일치하면 보이도록 한다
  }
}

function selectOption() {
  let icon = this.querySelector(".iconify").cloneNode(true);
  //현재 선택 된 옵션에서 iconify클래스를 가진 요소를 찾아서 클론합니다
  //이렇게 함으로써 선택된 옵션에 있는 아이콘을 가져옵니다
  let countryName = this.querySelector(".country-name").cloneNode(true);
  //현재 선택 된 옵션에서 country-name클래스를 가진 요소를 찾아 클론합니다
  //이렇게 함으로써 선택된 옵션에 있는 국가 이름을 가져옵니다.
  btnSpan.innerHTML = "";
  //버튼안의 내용을 지웁니다. 이렇게 함으로써 이전에 선택된 내용을 초기화
  btnSpan.append(icon, countryName);
  //버튼에 선택된 옵션의 정보를 표시하기 위해 버튼 안에 클론 된 아이콘과 국가이름을 추가
  searchBox.value = '';
  //검색상자의 값 초기화
  container.querySelectorAll(".hide").forEach((el) => el.classList.remove("hide"));
  //hide클래스가 있으면 모두 삭제 사용자가 선택한 옵션 이외의 옵션들을 숨긴것을 다시 보여줍니다
  container.classList.remove("active");
  //드롭다운 목록을 다시 닫음 드롭다운 목록의 활성화 상태를 제거
}

searchBox.addEventListener("input", searchCountry);

options.forEach((option) => {
  option.addEventListener("click", selectOption)
});

