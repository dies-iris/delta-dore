export default class Query {
    constructor(dest, id = false) {
        let urls = {
            login:"/wp-json/jwt-auth/v1/token",
            produits: "/wp-json/wp/v2/produits/?per_page=99&categories=",
            produitsTyxal: "/wp-json/wp/v2/produits/?per_page=99&categorie_tyxal=",
            etudeDeCas: "/wp-json/wp/v2/edc?per_page=99&categories=",
            edcTyxal: "/wp-json/wp/v2/edc?per_page=99&categorie_tyxal=",
            histoire: "/wp-json/wp/v2/histoire/?per_page=99",
            categorie_tyxal:"/wp-json/wp/v2/categorie_tyxal",
            tyxal_slide:"/wp-json/wp/v2/tyxal_slide/?per_page=99",
            categories : "/wp-json/wp/v2/categories",
            presentation :"/wp-json/wp/v2/presentation",
            mcpresentation:"/wp-json/wp/v2/mcpresentation?per_page=99",
            types_bien: "/wp-json/wp/v2/type_bien",
            implantation_chiffre:"/wp-json/wp/v2/implantation_chiffre",
            radio : "/wp-json/wp/v2/radio/?per_page=99",
            type_formation:"/wp-json/wp/v2/type_formation",
            formations:"/wp-json/wp/v2/formations/?per_page=99",
            formation_lifedomus:"/wp-json/wp/v2/formation_lifedomus?per_page=99&parent=0",
            lifedomus_presa:"/wp-json/wp/v2/lifedomus?formation_lifedomus=",
            lifedomus:"/wp-json/wp/v2/produits/396", 
            tydom:"/wp-json/wp/v2/produits/77", 
        };
        // const wp = "https://deltadore.buroscope.eu"
        // if (!id) {
        //     this.url = wp + urls[dest];
        // } else {
        //     this.url = wp + urls[dest] + id;
        // }
        if (!id) {
            this.url = urls[dest];
        } else {
            this.url = urls[dest] + id;
        }
    }

    async get() {
        let url = this.url;
        let data = await fetch(url);
        console.log(url);
        return data;
    }

    async post(datas) {
        let url = this.url;
        let data = await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }),
            body: JSON.stringify(datas)
        })
        console.log(data);
        return data;
    }
}