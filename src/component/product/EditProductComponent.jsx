import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class EditProductComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
          title: '',
          description: '',
          unit: '',
          price: ''
      }
      this.saveProduct = this.saveProduct.bind(this);
      this.loadProduct = this.loadProduct.bind(this);
    }

    componentDidMount() {
        this.loadProduct();
    }

    loadProduct() {
        ApiService.fetchProductById(window.localStorage.getItem("productId"))
            .then((res) => {
                let product = res.data;
                this.setState({
                  id: product.id,
                  title: product.title,
                  description: product.description,
                  unit: product.unit,
                  price: product.price,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveProduct = (e) => {
        e.preventDefault();
        let product = {id: this.state.id, title: this.state.title, description: this.state.description, unit: this.state.unit, price: this.state.price};
        ApiService.editProduct(product)
            .then(res => {
                this.setState({message : 'Product added successfully.'});
                this.props.history.push('/products');
            });
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Edit Product</Typography>
                <form>

                        <TextField type="text" placeholder="Title" fullWidth margin="normal" name="title" value={this.state.title} onChange={this.onChange}/>

                        <TextField placeholder="Description" fullWidth margin="normal" name="description" value={this.state.description} onChange={this.onChange}/>

                        <TextField placeholder="Unit" fullWidth margin="normal" name="unit" value={this.state.unit} onChange={this.onChange}/>

                        <TextField type="number" placeholder="Price" fullWidth margin="normal" name="price" value={this.state.price} onChange={this.onChange}/>

                        <Button variant="contained" color="primary" onClick={this.saveProduct}>Save</Button>

                </form>
            </div>
        );
    }
}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default EditProductComponent;