//xray
(() => {


    const divisor = document.querySelector("#divisor");
    const slider = document.querySelector("#slider");
    
    function moveDivisor() {
      console.log(slider.value);
      divisor.style.width = slider.value+"%";
      // js파일이 css 프로펄티를 따르도록 설정한것.   
    }
    slider.addEventListener("input", moveDivisor);
    // 콘솔에서 1부터 100까지 찍힘 cause html에서 그렇게 정의함
    
    
    
  })();