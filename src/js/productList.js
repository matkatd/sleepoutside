import { renderListWithTemplate, convertToJson } from "./utils.js";

export default class ProductListing {
  constructor(category, listElement, dataSource) {
    this.category = category;
    this.listElement = listElement;
    this.dataSource = dataSource;
    this.list = [];
  }

  async init() {
    const list = await this.dataSource.getData();
    this.list = list;
    this.renderList(list);
  }

  async renderList(list) {
    const template = document.getElementById("product-card-template");
    list = await this.filterList(list);
    renderListWithTemplate(
      template,
      this.listElement,
      list,
      this.prepareTemplate
    );
  }

  async filterList(list) {
    const validated = await Promise.all(
      list.map(async (item) => {
        item.show = await this.getItem(item.Image);
        return item;
      })
    );
    return validated.filter((obj) => obj.show);
  }

  filterList1(list) {
    list.filter((obj) => {
      for (const element in obj) {
        if (!getItem(`obj.${element}`)) {
          // If we can't actually retrieve the element, filter it out
          return false;
        } else return true;
      }
    });
    // go over each object in the array of products and filter them if they are all good
  }

  async getItem(item) {
    // const url = `this.dataSource.${item}`;
    try {
      const response = await fetch(item);
      if (response.ok) {
        return true;
      } else return false;
    } catch (error) {
      console.log(error);
    }
  }

  prepareTemplate(clone, product) {
    //const image = await this.getImage(product);
    clone.querySelector("a").href += product.Id;
    clone.querySelector("img").src = product.Image;
    clone.querySelector("img").alt += product.NameWithoutBrand;
    clone.querySelector(".card__brand").innerHTML += product.Brand.Name;
    clone.querySelector(".card__name").innerHTML += product.NameWithoutBrand;
    clone.querySelector(".product-card__price").innerHTML += product.FinalPrice;
    return clone;
  }
}
