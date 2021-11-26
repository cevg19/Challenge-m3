// BTN LOAD MORE CORES
/* $(document).ready(function(){
  $("ul .colors").slice(0, 4).show();
  $("#loadMoreColors").on("click", function(e){
    e.preventDefault();
    $(".core:hidden").slice(0, 4).slideDown();
    if($(".core:hidden").length == 0) {
      $("#loadMoreCores").text("No hay más colores").addClass("noContent");
    }
  });
  
}) */

// BTN LOAD MORE CONTENT
/* $(document).ready(function(){
  $(".item").slice(0, 4).show();
  $("#loadMore").on("click", function(e){
    e.preventDefault();
    $(".item:hidden").slice(0, 4).slideDown();
    if($(".item:hidden").length == 0) {
      $("#loadMore").text("No hay más articulos").addClass("noContent");
    }
  });
  
}) */

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
      });

      console.log(data);

      var maxArticles = articles.slice(0, articles.length).join('');
      var minArticles = articles.slice(0, 6).join('');


      document
        .querySelector('.catalog').insertAdjacentHTML('afterbegin', maxArticles);


    

        

      // LISTAR COLORES ************************************
      const unique = [...new Set(data.map(products => products.color))];
      //console.log(unique);
      const colors = unique.map((color, index) => {
          return `      
           <li class="colors"> <input id="color${index}"  type="radio" name="color" value="${color}" hidden> <label for="color${index}" class="checkmark" ></label>${color}</li>
          `
        })
        .join('');


      document
        .querySelector('#colors').insertAdjacentHTML('afterbegin', colors);

       var dataFilter = data;
     

      const checkbox = document.querySelectorAll('input[name="color"]');
      checkbox.forEach(element => {
        
        element.addEventListener('click', (e) => {
          
          const catalog = document.querySelector('.catalog');
          const result = dataFilter.filter(d => d.color === e.target.value);
          const articlesFilter = result.map(products => {
            return `<div class="item">
            <img src="${products.image}" alt="">
            <ul>
              <li class="name">  ${products.name}</li>
              <li class="price">R$ ${products.price}</li>
              <li class="info">${products.parcelamento}</li>
            </ul>
            <a  onClick="onClick()">Comprar</a>
    
        </div>`
          }).join('')
          
          catalog.innerHTML = "";
          
          catalog.insertAdjacentHTML('afterbegin', articlesFilter);
          dataFilter = result;
        });
      }); 


      

      var colorsChecks = document.querySelectorAll('input[name="color"]'); // colores checks filter
      var sizesChecks = document.querySelectorAll('input[name="size"]'); // tallas checks filter
      var pricesChecks = document.querySelectorAll('input[name="price"]'); // precios checks filter
      var applyBtn = document.querySelector('.apply'); // btn apply filter
      var clearBtn = document.querySelector('.clear');// btn clear filters



     /*  applyBtn.addEventListener('click', function(e) { // 
        let colorChecked = document.querySelector('input[name="color"]:checked')
        let sizeChecked = document.querySelector('input[name="size"]:checked')
        let priceChecked = document.querySelector('input[name="price"]:checked')
        const catalog = document.querySelector('.catalog');
        

        const noContent = `<h1>No hay articulos</h1>`;
        
        try {
          
          if ( colorChecked === null){
          colorChecked = document.querySelector('input[name="color"]')
            colorChecked.value = 'noChecked'
          } 
          if ( sizeChecked === null){
          sizeChecked = document.querySelector('input[name="size"]')
          sizeChecked.value = 'noChecked'
          } 
          if ( priceChecked === null){
          priceChecked = document.querySelector('input[name="price"]')
            priceChecked.value = 'noChecked'
          }
        } catch (error) {
          console.log(priceChecked);
          console.log(sizeChecked);
          console.log(colorChecked);
        }     
        
        
        
        const result = dataFilter.filter(d => d.color == colorChecked.value || d.size == sizeChecked.value || d.price == priceChecked);
        
        if (result.length === 0){
           
           catalog.insertAdjacentHTML('afterbegin',  noContent);
          
        }
        const articlesFilter = result.map(products => {
            return `<div class="item">
            <img src="${products.image}" alt="">
            <ul>
              <li class="name">  ${products.name}</li>
              <li class="price">R$ ${products.price}</li>
              <li class="info">${products.parcelamento}</li>
            </ul>
            <a  onClick="onClick()">Comprar</a>
    
        </div>`
          }).join('')
          
          catalog.innerHTML = "";          
          catalog.insertAdjacentHTML('afterbegin', articlesFilter);
          dataFilter = result;
                
      })  */


      // BTN CLEAR FILTERS
      clearBtn.addEventListener('click', () => {
        try {
          var colorCheck = document.querySelector('input[name="color"]:checked');
          var sizeCheck = document.querySelector('input[name="size"]:checked');
          var priceCheck = document.querySelector('input[name="price"]:checked');
          if(colorCheck === null){
            
          } else {
            colorCheck.checked = false;
          }
          if(sizeCheck === null){
            
          } else {
            sizeCheck.checked = false;
          }
          if(priceCheck === null){
            
          } else {
            priceCheck.checked = false;
          }
        document
        .querySelector('.catalog').insertAdjacentHTML('afterbegin', maxArticles); 

        } catch (error) {

        }
        

      });

      

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
      const talla = unicos.map((size, index) => {
          // <input class="talla" type="button" value="${tallass}">  
          return `<li><input id="size${index}" type="radio" name="size" value="${size}" hidden> <label for="size${index}" class="checkmark2">${size}</label> </li>`

        })
        .join('');
      
       document.querySelector('#size').insertAdjacentHTML('afterbegin', talla);
      
      
       const checkboxTalla = document.querySelectorAll('input[name="size"]');
      checkboxTalla.forEach(element => {
        element.addEventListener('change', function (e) {
          const result = dataFilter.filter(d => d.size.includes(e.target.value));
          const articlesFilter = result.map(products => {
            return `<div class="item">
            <img src="${products.image}" alt="">
            <ul>
              <li class="name">  ${products.name}</li>
              <li class="price">R$ ${products.price}</li>
              <li class="info">${products.parcelamento}</li>
            </ul>
            <a  onClick="onClick()">Comprar</a>
    
        </div>`
          }).join('')
          const catalog = document.querySelector('.catalog');
          catalog.innerHTML = "";
          console.log(result);
          catalog.insertAdjacentHTML('afterbegin', articlesFilter);
          dataFilter = result;
        });
      });
       const checkboxPrecios = document.querySelectorAll('input[name="prices"]');
      checkboxPrecios.forEach(element => {
        element.addEventListener('change', function (e) {
          const value = e.target.value.split(',');
          let result;
          if (value.length === 1) {
            result = dataFilter.filter(d => d.price >= value[0]);
          } else {
            result = dataFilter.filter(d => d.price >= value[0] && d.price <= value[1]);
          }
          const articlesFilter = result.map(products => {
            return `<div class="item">
            <img src="${products.image}" alt="">
            <ul>
              <li class="name">  ${products.name}</li>
              <li class="price">R$ ${products.price}</li>
              <li class="info">${products.parcelamento}</li>
            </ul>
            <a  onClick="onClick()">Comprar</a>
    
        </div>`
          }).join('');
          const catalog = document.querySelector('.catalog');
          catalog.innerHTML = "";
          catalog.insertAdjacentHTML('afterbegin', articlesFilter);
          dataFilter = result;
        });
      });
    }) 
    .catch(Error => {
      console.log(Error);
    });
}
fetchData();
