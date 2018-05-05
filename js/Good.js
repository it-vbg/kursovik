class Good {
  constructor(id, title, price) {
    this.id = id;
    this.title = title;
    this.price = price;
  }

  render($appendContainer) {
    let $goodContainer = $('<div />', {
      class: 'good'
    });

    let $goodTitle = $('<p />', {
      text: this.title
    });

    let $goodPrice = $(`<p>Цена: <span>${this.price}</span> руб.</p>`);

    let $goodBtn = $('<button />', {
      class: 'buy-good',
      'data-id': this.id,
      text: 'Купить'
    });

    //TODO: Кнопка удаления товара
    let $deleteBtn = $('<button />', {
      class: 'delete-good',
      'data-id': this.id,
      text: 'Удалить товар'
    });
    //Объединяем элементы в структуру
    $goodTitle.appendTo($goodContainer);
    $goodPrice.appendTo($goodContainer);
    $goodBtn.appendTo($goodContainer);
    $deleteBtn.appendTo($goodContainer);

    $appendContainer.append($goodContainer);
  }
}