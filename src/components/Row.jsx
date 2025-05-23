import { useDispatch, useSelector } from 'react-redux';
import { updateRow, deleteRow } from '../features/table/tableSlice';
import {
    Row as ReactstrapRow,
    Col,
} from "reactstrap";
import '../assets/css/tableForm.css';

const Row = ({ row, onEdit, onDelete }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.table.products);

    const handleChange = (field, value) => {
        dispatch(updateRow({ id: row.id, field, value }));
    };

    return (
        <>
            <ReactstrapRow className='custom-row'>
                <Col lg={4} md={4} sm={6} xs={4} className='p-1 d-flex align-items-center justify-content-center'>

                    <select className='form-select w-100' value={row.productId} onChange={(e) => handleChange('productId', e.target.value)}>
                        <option value="">Select</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </Col>

                <Col lg={2} md={2} sm={2} xs={2} className='p-1 d-flex align-items-center justify-content-center'>
                    <p className='mb-0'>
                        <input
                            className='form-control'
                            type="number"
                            value={row.quantity}
                            min={1}
                            onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 1)}
                        />
                    </p>
                </Col>

                <Col lg={2} md={2} sm={1} xs={2} className='p-1 d-flex align-items-center justify-content-center'>
                    <p className='mb-0'>{row.price}</p>
                </Col>

                <Col lg={2} md={2} sm={1} xs={2} className='p-1 d-flex align-items-center justify-content-center'>
                    <p className='mb-0'>{row.quantity * row.price}</p>
                </Col>

                <Col lg={2} md={2} sm={2} xs={2} className='p-1 d-flex align-items-center justify-content-center'>

                    <button className="btn btn-info btn-sm text-light" onClick={() => onEdit(row)}>
                        <i className="bi bi-pencil"></i>
                    </button>

                    <div className="vr mx-2"></div>

                    <button className="btn btn-danger btn-sm" onClick={() => dispatch(onDelete(row.id))}>
                        <i className="bi bi-trash"></i>
                    </button>
                </Col>
            </ReactstrapRow>
        </>
    );
};

export default Row;