import React, { Component } from "react";
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1
    };
    
    componentDidMount() {
        this.loadProducts();
    }
    
    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo} = response.data;


        //console.log(response.data.docs);
        this.setState({ products: docs, productInfo, page });
    }

    prevPage = () => {
        const { page, productInfo } = this.state;

        if (page===1) return;
        
        const pageNumber = page -1;

        this.loadProducts(pageNumber);
    }
    
    nextPage = () => {
        const { page, productInfo } = this.state;

        if(page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }



    render() {
        //return <h1>Contagem de produtos: { this.state.products.length }</h1>
        
        const { products, page, productInfo } = this.state;

        //Quando realiza um map, o React exige a criação da key para cada item
        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}> 
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                        <Link to={`/products/${product._id}`}>Acesssar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        )
    }
}