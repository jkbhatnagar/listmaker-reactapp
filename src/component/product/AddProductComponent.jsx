import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class AddProductComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            title: '',
            description: '',
            unit: '',
            price: ''
        }
        this.saveProduct = this.saveProduct.bind(this);
    }

    saveProduct = (e) => {
        e.preventDefault();
        let product = {title: this.state.title, description: this.state.description, unit: this.state.unit, price: this.state.price};
        ApiService.addProduct(product)
            .then(res => {
                this.setState({message : 'Product added successfully.'});
                this.props.history.push('/products');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <Typography variant="h4" style={style}>Add Products</Typography>
                <form style={formContainer}>

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
const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style ={
    display: 'flex',
    justifyContent: 'center'

}

export default AddProductComponent;