#!/usr/bin/env node

import axios from "axios";
import Table from "cli-table";
import yargs from "yargs";
import fs from "fs";

const TEMP_FILE = "./temp_products.json";

const { argv } = yargs
    .option('search', {
        alias: 's',
        description: 'Digite o nome do jogo que deseja procurar',
        type: 'string'
    })
    .option('id', {
        alias: 'details',
        description: 'ID do produto que deseja obter os detalhes',
        type: 'number'
    })
    .help();

if (argv.search) {
    const url = `https://www.pricecharting.com/pt/search-products?q=${encodeURIComponent(argv.search)}&type=prices`;
    axios.get(url).then(response => {
        const htmlResponse = response.data;
        fs.writeFileSync(TEMP_FILE, JSON.stringify(htmlResponse.products));
        getProducts(htmlResponse.products);
    }).catch(console.error);
} 

if (argv.id !== undefined) {
    const products = JSON.parse(fs.readFileSync(TEMP_FILE, "utf8"));
    const selectedProduct = products[argv.id];
    if (selectedProduct) {
        const uri = createURI(selectedProduct.productName, selectedProduct.consoleName);
        axios.get(uri).then(response => {
            const detailsResponse = response.data;
            getProductsDetails(detailsResponse);
        }).catch(console.error);
    } else {
        console.error("Produto não encontrado pelo ID fornecido.");
    }
}

function getProducts(products) {
    const table = new Table({
        head: ['ID', 'Title', 'Console', 'Low Price', 'Mid Price', 'High Price'],
        colWidths: [5, 50, 25, 10, 10, 10]
    });
    products.forEach((product, index) => {
        table.push(
            [index, product.productName, product.consoleName, product.price1, product.price2, product.price3]
        );
    });
    console.log(table.toString());
}

function getProductsDetails(product) {
    const table = new Table({
        head: ['Loose Price', 'Complete Price', 'New Price', 'Graded Price', 'Box Only Price', 'Manual Only Price'],
        colWidths: [15, 15, 15, 15, 15, 15]
    });
    table.push(
        [product.price1, product.price2, product.price3, product.price5, product.price6, product.price7]
    );
    console.log(table.toString());
}

function createURI(productName, consoleName) {
    const baseURL = 'https://www.pricecharting.com/pt/game/';
    function getLink(str) {
        return str.toLowerCase().replace(/#/g, '').trim().split(/\s+/).join('-');                  
    }
    return baseURL + getLink(consoleName) + '/' + getLink(productName);
}
