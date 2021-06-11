

const id = new URLSearchParams(window.location.search).get('ProductId');

const productsApi = "https://afternoon-falls-30227.herokuapp.com/api/v1/products/"+id+"";

const xhr = new XMLHttpRequest();
xhr.open("GET", productsApi);
xhr.send();
const productsarray = JSON.parse(localStorage.getItem("myproducts"));
xhr.onload = function () {
  if (xhr.status == 200)
    {
        const product = JSON.parse(xhr.response).data;
        // console.log(product);

            // products list ELement
        const productsListEl = document.querySelector("#product");
        
        const divEl = document.createElement("div");
        const imgEl = document.createElement("img");
        const pEl = document.createElement("p");
        const pEl1 = document.createElement("p");
        const pEl2 = document.createElement("p","i");
        const divEl1 = document.createElement("div");
        const divEl2 = document.createElement("div");
        const inpt = document.createElement("input");
        const btnEl = document.createElement("button");


        // Add style (classes)
        divEl.classList.add("col-5", "p-5" , "d-flex");
        divEl1.classList.add("col-12","d-inline");
        imgEl.classList.add("img-thumbnail", "img-fluid");
        pEl.classList.add("text-primary");
        pEl2.classList.add("fas","fa-dollar-sign","text-danger","d-block");
        btnEl.classList.add("btn","btn-primary","btn-lg");
        inpt.classList.add("form-control","m-1");
        divEl2.classList.add("input-group","pt-2")

        imgEl.src = product.ProductPicUrl;
        pEl.innerText = `${product.Name}`;
        pEl1.innerText = `${product.Description}`;
        pEl2.innerText = `${product.Price}`;
        btnEl.innerText = "Add To Cart";
        
        let num = parseInt(inpt.value,5);
        num = isNaN(num) ? 0 : num;

        divEl1.appendChild(pEl);
        divEl.appendChild(imgEl);
        divEl1.appendChild(pEl1);
        divEl1.appendChild(pEl2);
        divEl2.appendChild(inpt);
        divEl2.appendChild(btnEl);
        divEl1.appendChild(divEl2);
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
                inpt.value = `You can't add more items`;
            }
          productsarray.push(product);    
          localStorage.setItem("myproducts",JSON.stringify(productsarray));
        });
        productsListEl.appendChild(divEl);
    }
   else
    {
      console.log("Something went wrong.");
    }
};