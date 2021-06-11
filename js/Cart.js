
 var productsarray;
if(localStorage.getItem("myproducts")==null)
{
  productsarray=[];
}
else
{
  // window.localStorage.clear();
  productsarray = JSON.parse(localStorage.getItem("myproducts"));
  const List = compressArray(productsarray);
  addToCart(List);
}

let totalSum = 0;

function addToCart(productsarray)
{
      const total = document.querySelector("#total");
      const checkout = document.querySelector("#checkout");
      const cost = document.createElement("p","i");
      cost.classList.add("justify-content-between","fas","fa-dollar-sign","text-danger","p-2","mt-3")  ;

      console.log(productsarray);
      const productsList = document.querySelector("#rowtable");
      productsarray.forEach((product , index) => {
          // Create HTML elements
          const trEl = document.createElement("tr");
          const tdEl1 = document.createElement("td");
          const imgEl = document.createElement("img");
          const tdName = document.createElement("td");
          const tdStock = document.createElement("td");
          const tdinput = document.createElement("td");
          const inpt = document.createElement("input");
          const tdPrice = document.createElement("td" , "i");
          const iEl = document.createElement("i");
          const btnEl = document.createElement("button");

          tdPrice.classList.add("text-right","fas","fa-dollar-sign","text-danger","p-2","mt-3")  ;
          iEl.classList.add("fas","fa-trash","color","p-2")  ;
          btnEl.classList.add("text-right","btn","btn-sm","btn-danger","mt-3");
          inpt.classList.add("form-control","m-1");
  
          imgEl.src = product.ProductPicUrl ;
          tdName.innerText = `${product.Name}`;
          tdStock.innerText = `${product.Status}`;
          inpt.value = product.Quantity;
          tdPrice.innerText = product.Price * product.Quantity;

          let num = parseInt(inpt.value,5);
          num = isNaN(num) ? 0 : num;
          
          tdEl1.appendChild(imgEl);
          trEl.appendChild(tdEl1);
          trEl.appendChild(tdName);
          trEl.appendChild(tdStock);
          tdinput.appendChild(inpt);
          trEl.appendChild(tdinput);
          trEl.appendChild(tdPrice);
          btnEl.appendChild(iEl);
          trEl.appendChild(btnEl);

        btnEl.addEventListener("click",function(){
          productsarray.splice(index,1);
          localStorage.setItem("myproducts",JSON.stringify(productsarray));
          addToCart(productsarray);
          window.location.reload();
        })
        
          productsList.appendChild(trEl);

      });
      checkout.addEventListener("click",function(){
      productsarray.forEach((_price) => {
        totalSum += parseInt(_price.Quantity) * parseInt(_price.Price);
      });
      cost.innerText = `Total is  ${totalSum}`;
      total.appendChild(cost);
    })
  }
 
        
  function compressArray(original) {
    let key = "Name";
    let compressed = [];
      original.forEach((x) => {
        
        if (compressed.some((val) => {return val[key] == x[key];})) 
          {
          compressed.forEach((k) => {
            if (k[key] === x[key]) {
              k["Quantity"]++;
            }
          });
        } 
        else
        {
          let a = {};
          a.ProductPicUrl = x.ProductPicUrl;
          a[key] = x[key];
          a["Status"] = x.Status;
          a["Price"] = x.Price;
          a["Quantity"] = 1;
          compressed.push(a);
        }
    });
    console.log(compressed);
    return compressed;
  }

  const clean = document.querySelector("#clean");
  let clearBtn = document.createElement("button");
  clearBtn.classList.add("btn","btn-sm","btn-danger","m-3");
  clearBtn.innerText = "Clean Cart";
  clean.appendChild(clearBtn);
  clearBtn.addEventListener("click", function () {
  window.localStorage.clear();
  window.location.reload();
  });