// export {Article, Articles}

class Article {
    constructor(artId, prodName, description, sizes, price, imgURL) {
        this.artId = artId,
        this.prodName = prodName,
        this.description = description,
        this.sizes= sizes, // Array for Example [8, 9, 10]
        this.price = price,
        this.imgURL = imgURL
    }



}

class  Articles {
    #articleList
    constructor(articleCatalog) {
        this.#articleList = localStorage.articles ? JSON.parse(localStorage.articles) : [];
        this.articleCatalog = articleCatalog;
    }

    get articleList() {
        return this.#articleList;
    }

    findArticle(artId) {
        return this.#articleList.find(obj => obj.artId === artId);
    }



    updateArticleCatalog = () => {

        this.articleCatalog.innerHTML = '';
        for (let i = 0; i < this.#articleList.length; i++) {
            this.articleCatalog.innerHTML += `
                    <div class="image" data-artid="${this.#articleList[i].artId}">
                        <img src="images/${this.#articleList[i].imgURL}.png" alt="${this.#articleList[i].prodName}">
                        <h3 class="productName">${this.#articleList[i].prodName}</h3>
                        <h3 class="prize">${this.#articleList[i].price}</h3>
                        <a class="add-cart cart1" href="#">Add Cart</a>
                    </div>
                `;
            }
    }

    addArticle = (article) => {
        this.#articleList.push(article);
        console.log(this.articleList)
        this.saveArticles();
    }
        
    saveArticles = () => {
        localStorage.setItem('articles', JSON.stringify(this.#articleList));
    }
    
      
}


