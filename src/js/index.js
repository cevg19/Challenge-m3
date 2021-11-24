// BTN LOAD MORE CORES
$(document).ready(function(){
  $(".core").slice(0, 4).show();
  $("#loadMoreCores").on("click", function(e){
    e.preventDefault();
    $(".core:hidden").slice(0, 4).slideDown();
    if($(".core:hidden").length == 0) {
      $("#loadMoreCores").text("No hay más colores").addClass("noContent");
    }
  });
  
})
// BTN LOAD MORE CONTENT
$(document).ready(function(){
  $(".item").slice(0, 4).show();
  $("#loadMore").on("click", function(e){
    e.preventDefault();
    $(".item:hidden").slice(0, 4).slideDown();
    if($(".item:hidden").length == 0) {
      $("#loadMore").text("No hay más articulos").addClass("noContent");
    }
  });
  
})
function fetchData() {
  fetch('http://localhost:5000/products')
    .then(res => {
      console.log(res)
      if (!res.ok) {
        throw Error("ERRORR")
      }

      return res.json();
    })
    // LISTAR ARTICULOS **************************************
    .then(data => {
      // console.log(data);
      const articles = data.map(products => {
          return `<div class="item">
        <img src="${products.image}" alt="">
        <ul>
          <li class="name">  ${products.name}</li>
          <li class="price">R$ ${products.price}</li>
          <li class="info">${products.parcelamento}</li>
        </ul>
        <a  onClick="onClick()">Comprar</a>

    </div>`
        })
        ;
        
        console.log(data);

      var maxArticles = articles.slice(0,articles.length).join('');
      var minArticles = articles.slice(0,6).join('');
      
      
      document
        .querySelector('.catalog').insertAdjacentHTML('afterbegin', minArticles);
      


      // LISTAR COLORES ************************************
      const unique = [...new Set(data.map(products => products.color))];
      //console.log(unique);
      const cores = unique.map((color, index) => {
          return `      
           <li class="core"> <input id="color${index}" type="radio" name="color" value="${color}" hidden> <label for="color${index}" class="checkmark" onclick="getCores()"></label>${color}</li>
          `
        })
        .join('');

        
      document
        .querySelector('#cores').insertAdjacentHTML('afterbegin', cores);


      function getCores() {
        const val = document.querySelector('#cores').value;
        console.log(val);
        console.log('click')
      }

      // LISTAR TALLAS ************************************

      const tallas = [...new Set(data.map(products => products.size))];
      // console.log(tallas[0]);          
      const unicos = tallas.reduce((accArr, valor) => {
        var secu = valor.toString();
        if (accArr.indexOf(secu) < 0) {
          if (valor.length > 1) {
            for (let i = 0; valor.length > i; i++) {
              var sec = valor[i].toString();
              if (accArr.indexOf(sec) < 0) {
                accArr.push(sec);
              }
            }
          } else {
            accArr.push(secu);
          }
        }
        return accArr;
      }, []);

      // console.log(unicos);
      const talla = unicos.map((tallass, index) => {
          // <input class="talla" type="button" value="${tallass}">  
          return `<li><input id="talla${index}" type="radio" name="tallas" value="${tallass}" hidden> <label for="talla${index}" class="checkmark2">${tallass}</label> </li>`

        })
        .join('');
      document.querySelector('#tallas').insertAdjacentHTML('afterbegin', talla);
    }).then(data => {

    })
    .catch(Error => {
      console.log(Error);
    });
}
fetchData();


