
const productsApi = "https://afternoon-falls-30227.herokuapp.com/api/v1/products/";

const xhr = new XMLHttpRequest();
xhr.open("GET", productsApi);
xhr.send();

var productIndex = 0;
var productsarray;
if(localStorage.getItem("myproducts")==null)
{
  productsarray=[];
}
else
{
  productsarray = JSON.parse(localStorage.getItem("myproducts"));
}

xhr.onload = function () {
  if (xhr.status == 200) {
    const products = JSON.parse(xhr.response).data;

    // products list ELement
    const productsListEl = document.querySelector("#productsList");

    products.forEach((product , index) => {
      // Create HTML elements
      const divEl = document.createElement("div");
      const imgEl = document.createElement("img");
      const pEl = document.createElement("p");
      const aEl = document.createElement("a");
      const pEl2 = document.createElement("p","i");
      const divEl1 = document.createElement("div");
      const inpt = document.createElement("input");
      const btnEl = document.createElement("button");
      // Add style (classes)
      divEl.classList.add("col-4", "p-5");
      imgEl.classList.add("img-thumbnail", "img-fluid");
      pEl.classList.add("text-primary")  ;
      pEl2.classList.add("fas","fa-dollar-sign","text-danger","p-2")  ;
      btnEl.classList.add("btn","btn-primary");
      inpt.classList.add("form-control","m-1");
      divEl1.classList.add("d-flex","input-group","pt-2")

      imgEl.src = product.ProductPicUrl ;
      aEl.target="_blank";
      aEl.href= `singleproduct.html?ProductId=${product.ProductId}`;
      pEl.innerText = `${product.Name}`;
      pEl2.innerText = `${product.Price}`;
      btnEl.innerText = "Add To Cart";
      let num = parseInt(inpt.value,5);
      num = isNaN(num) ? 0 : num;
      
      divEl.appendChild(pEl);
      aEl.appendChild(imgEl);
      divEl.appendChild(aEl);
      divEl1.appendChild(pEl2);
      divEl1.appendChild(inpt);
      divEl1.appendChild(btnEl);
      divEl.appendChild(divEl1);

    // fun
      btnEl.addEventListener("click",function(){
        
        if(product.Quantity>=1)
        {
          num++;
          inpt.value=num;
          --product.Quantity;
        }
        else
        {
          alert(`You can't add more items`);
        }
        productsarray.push(products[index]);
        localStorage.setItem("myproducts",JSON.stringify(productsarray));
      });

      productsListEl.appendChild(divEl);
    });
  } else {
    console.log("Something went wrong.");
  }
};
