class Basket {
  constructor(idBasket) {
    this.id = idBasket;

    this.countGoods = 0; //Общее кол-во товаров
    this.amount = 0; //Общая стоимость товаров
    this.basketItems = []; //Массив для хранения товаров
    this.getItems();
  }

  render($appendContainer) {
    let $basketDiv = $('<div />', {
      id: this.id,
      text: 'Корзина товаров'
    });

    let $basketItemsDiv = $('<div />', {
      id: this.id + '_items',
    });

    $basketItemsDiv.appendTo($basketDiv);
    $basketDiv.appendTo($appendContainer);
  }

  getItems() {
    let appendId = '#' + this.id + '_items';
    //let self = this; //Способ 1
    $.ajax({
      type: 'GET',
      url: 'json/products.json?hash=' + Math.random(),
      dataType: 'json',
      context: this,
      success: function (data) {
        console.log(data);
        let $basketData = $('<div />', {
          id: 'minicart_summary'
        });

        this.countGoods = data.length;
        this.amount = data.amount;

        for (let key in data) {
          this.basketItems.push(data[key]);
        }
        $basketData.appendTo(appendId);
      },
      error: function (error) {
        console.log('Что-то пошло не так', error);
      }
    });
  }

  add(idProduct, price) {
    let basketItem = {
      "id_product": idProduct,
      "price": price,
      //"count": 2
    };

    this.amount += price; //this.amount = this.amount + price
    this.countGoods++;
    this.basketItems.push(basketItem);
    console.log(this.basketItems);

    //Перерисовываем корзину
    this.refresh();
  }

  remove(idProduct, price) {
    console.log(`нажата кнопка с индексом - `, idProduct);
    //TODO
    //Перебрать товары
    //splice
    //break; - для выхода из цикла for
    for (let i=0; i<this.basketItems.length; i++) {
      console.log(`${i} элемент в массиве`, this.basketItems[i].id_product);
      let el = parseInt(this.basketItems[i].id_product);
      if (el === idProduct) {
        console.log(`удаляем ${idProduct} из`, this.basketItems);
        this.basketItems.splice(i, 1);
        this.amount -= price; //this.amount = this.amount + price
        this.countGoods--;
        break;
      }
    }
    console.log(`новый массив`, this.basketItems);
    this.refresh();
  }

  refresh() {
        let $basketData = $('#minicart-dropdown');
        $basketData.empty(); //Очищаем содержимое контейнера
        let $basketList = $basketData.append('<ul></ul>').find('ul');
        let basket_id = 0;
        this.amount = 0;
        this.countGoods = 0;
        console.log(this.basketItems);
        if (this.basketItems.length > 0) {

            for (let itemKey in this.basketItems) {
                this.amount += this.basketItems[itemKey].price * this.basketItems[itemKey].quantity;
                this.countGoods += this.basketItems[itemKey].quantity;

                $basketList.append('<li class="minicart_product" data-id = '+basket_id+'><div class="minicart_product__image"><img src="content-images/products/72x77/' + this.basketItems[itemKey].image + '" alt="' + this.basketItems[itemKey].title + '"></div> <a class="minicart_product__name" href="product.html"><h3>' + this.basketItems[itemKey].title + '</h3></a><div class="minicart_product__rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half-o"></i></div><a class="minicart_product__delete"  href="#"><i class="fa fa-times-circle-o" aria-hidden="true"></i></a><p>' + this.basketItems[itemKey].quantity + ' x &#36;' + this.basketItems[itemKey].price + '</p></>');
                basket_id++;
            }

            $basketData.append('<div id="minicart_summary"><span>TOTAL</span> <span>&#36;'+this.amount+'</span></div>');
            $basketData.append('<div class="minicart_buttons"><a class="minicart_buttons__checkout" href="checkout.html">CHECKOUT</a><a class="minicart_buttons__cart" href="cart.html">CART</a></div>');

        } else {
            $basketData.append('<p class="total">EMPTY</p>');
        }
        $('span.minicart-count').text(this.countGoods);
    };

}