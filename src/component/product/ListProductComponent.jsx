import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

class ListProductComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            message: null
        }
        this.deleteProduct = this.deleteProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.reloadProductList = this.reloadProductList.bind(this);
    }

    componentDidMount() {
        this.reloadProductList();
    }

    reloadProductList() {
        ApiService.fetchProducts()
            .then((res) => {
                console.log(res.data)
                this.setState({products: res.data})
            });
    }

    deleteProduct(productId) {
        ApiService.deleteProduct(productId)
           .then(res => {
               this.setState({message : 'Product deleted successfully.'});
               this.setState({products: this.state.products.filter(product => product.id !== productId)});
           })
    }

    editProduct(id) {
        window.localStorage.setItem("productId", id);
        this.props.history.push('/edit-product');
    }

    addProduct() {
        window.localStorage.removeItem("productId");
        this.props.history.push('/add-product');
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Product Details</Typography>
                <Button variant="contained" color="primary" onClick={() => this.addProduct()}>
                    Add products
                </Button>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Unit</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.products.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.unit}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right" onClick={() => this.editProduct(row.id)}><CreateIcon /></TableCell>
                                <TableCell align="right" onClick={() => this.deleteProduct(row.id)}><DeleteIcon /></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        );
    }

}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default ListProductComponent;