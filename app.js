const handburgerBtn = document.querySelector(".imgActionBtn img");
const sideBar = document.querySelector(".sideBar");
const assetTitles = document.querySelectorAll(".asset_title h2");
const assetDescriptions = document.getElementsByClassName("description");
const video = document.querySelector(".videoContainer .iframe");
const pageInfoTitle = document.querySelector(".pageInfo h2");
const pageInfoPara = document.querySelector(".pageInfo p");
const assetBtns = document.querySelectorAll(".assetBTn");

// fetching data

class Data {
  async getData() {
    try {
      let response = await fetch("./data.json");
      let { tasks } = await response.json();
      let data = tasks[0];
      let title = data.task_title;
      let description = data.task_description;

      for (let response of Object.values(data)) {
        if (typeof response === "object") {
          return { response, title, description };
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

//display data
class UI {
  openCloseSideBar() {
    handburgerBtn.addEventListener("click", () => {
      //   sideBar.classList.toggle("openSideBar");
      if (!sideBar.classList.contains("openSideBar")) {
        sideBar.classList.add("openSideBar");
        handburgerBtn.setAttribute("src", "images/close.png");
      } else {
        sideBar.classList.remove("openSideBar");
        handburgerBtn.setAttribute("src", "images/open-arrow.png");
      }
    });
  }

  consoleData({ title, description }) {
    pageInfoPara.textContent = description;
    pageInfoTitle.textContent = title;
    // console.log(response);
  }

  openCloseAsset() {
    assetBtns.forEach((btn, idx) => {
      btn.addEventListener("click", (e) => {
        let content = document.querySelector(`.acontent-${idx}`);
        console.log(e.target, e.currentTarget, content);
        if (content.classList.contains("opened")) {
          content.classList.remove("opened");
          e.target.setAttribute("src", "images/arrowdown.png");
        } else {
          content.classList.add("opened");
          e.target.setAttribute("src", "images/arrowUp.png");
        }
      });
    });
  }

  renderResponse({ response }) {
    response.forEach((res, idx) => {
      assetTitles[idx].innerHTML = res.asset_title;
      assetDescriptions[idx].innerText = res.asset_description;
    });
    // let src = video.getAttribute("src");
    video.setAttribute("src", response[0].asset_content);

    // let content = "";
    // products.forEach((product) => {
    //   content += `
    //     <article class="product">
    //       <div class="img-container">
    //         <img src=${product.image} class="product-img">
    //         <button class="bag-btn" data-id=${product.id}>
    //           <div id="cart">
    //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M388.3 104.1a4.7 4.7 0 0 0 -4.4-4c-2 0-37.2-.8-37.2-.8s-21.6-20.8-29.6-28.8V503.2L442.8 472S388.7 106.5 388.3 104.1zM288.7 70.5a116.7 116.7 0 0 0 -7.2-17.6C271 32.9 255.4 22 237 22a15 15 0 0 0 -4 .4c-.4-.8-1.2-1.2-1.6-2C223.4 11.6 213 7.6 200.6 8c-24 .8-48 18-67.3 48.8-13.6 21.6-24 48.8-26.8 70.1-27.6 8.4-46.8 14.4-47.2 14.8-14 4.4-14.4 4.8-16 18-1.2 10-38 291.8-38 291.8L307.9 504V65.7a41.7 41.7 0 0 0 -4.4 .4S297.9 67.7 288.7 70.5zM233.4 87.7c-16 4.8-33.6 10.4-50.8 15.6 4.8-18.8 14.4-37.6 25.6-50 4.4-4.4 10.4-9.6 17.2-12.8C232.2 54.9 233.8 74.5 233.4 87.7zM200.6 24.4A27.5 27.5 0 0 1 215 28c-6.4 3.2-12.8 8.4-18.8 14.4-15.2 16.4-26.8 42-31.6 66.5-14.4 4.4-28.8 8.8-42 12.8C131.3 83.3 163.8 25.2 200.6 24.4zM154.2 244.6c1.6 25.6 69.3 31.2 73.3 91.7 2.8 47.6-25.2 80.1-65.7 82.5-48.8 3.2-75.7-25.6-75.7-25.6l10.4-44s26.8 20.4 48.4 18.8c14-.8 19.2-12.4 18.8-20.4-2-33.6-57.2-31.6-60.8-86.9-3.2-46.4 27.2-93.3 94.5-97.7 26-1.6 39.2 4.8 39.2 4.8L221.4 225.4s-17.2-8-37.6-6.4C154.2 221 153.8 239.8 154.2 244.6zM249.4 82.9c0-12-1.6-29.2-7.2-43.6 18.4 3.6 27.2 24 31.2 36.4Q262.6 78.7 249.4 82.9z"/></svg>

    //           </div>
    //           add to cart
    //         </button>
    //       </div>
    //       <h3>${product.title}</h3>
    //       <h4>$${product.price}</h4>
    //     </article>

    //   `;
    //   // console.log(product, content);
    // });
    // productsDOM.innerHTML = content;
  }

  logic() {
    clearCartBtn.addEventListener("click", () => this.clearCart());
    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-item")) {
        let itemID = event.target.dataset.id;
        this.removeItem(itemID);
      } else if (event.target.classList.contains("fa-chevron-up")) {
        let increament = event.target;
        let id = increament.dataset.id;
        let temItem = cart.find((item) => item.id === id);
        temItem.amount = temItem.amount + 1;
        this.setValues(cart);
        Storage.saveCart(cart);
        let value = increament
          .closest(".arrowDIV")
          .querySelector(".item-amount");
        value.textContent = temItem.amount;
      } else if (event.target.classList.contains("fa-chevron-down")) {
        let decreament = event.target;
        let id = decreament.dataset.id;
        let temItem = cart.find((item) => item.id === id);
        temItem.amount = temItem.amount - 1;
        this.setValues(cart);
        Storage.saveCart(cart);
        let value = decreament
          .closest(".arrowDIV")
          .querySelector(".item-amount");
        value.textContent = temItem.amount;

        if (temItem.amount < 1) {
          this.removeItem(id);
        }
      }
      if (cartContent.childElementCount < 1) {
        this.closeCart();
      }
    });
  }
}

addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const data = new Data();

  //   ui.setupApp();
  ui.openCloseSideBar();

  ui.openCloseAsset();

  data
    .getData()
    .then((res) => {
      ui.consoleData(res);
      ui.renderResponse(res);
    })
    .then(() => {
      //   ui.getBagButtons();
      //   ui.logic();
    });
});
