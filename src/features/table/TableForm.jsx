import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRow, deleteRow, updateRow, saveAll } from './tableSlice';
import Row from '../../components/Row';
import EditModal from '../../components/EditModal';
import TotalDisplay from '../../components/TotalDisplay';
import '../../assets/css/tableForm.css';
import { Row as ReactstrapRow, Col, CardHeader, Card, CardBody } from "reactstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableForm = () => {
    const dispatch = useDispatch();
    const { rows, products } = useSelector((state) => state.table);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editRowData, setEditRowData] = useState(null);

    const handleAddRow = () => {
        dispatch(addRow());
        toast.success('Row added successfully!');
    };

    const handleEditClick = (row) => {
        setEditRowData(row);
        setIsModalOpen(true);
    };

    const handleUpdate = (updatedRow) => {
        dispatch(updateRow({ id: updatedRow.id, field: 'productId', value: updatedRow.productId }));
        dispatch(updateRow({ id: updatedRow.id, field: 'quantity', value: updatedRow.quantity }));
        toast.info('Row updated successfully!');
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        console.log('ididid', id);
        dispatch(deleteRow(id));
        toast.error('Row deleted successfully!');
    };

    return (
        <>
            <div className='container table_container mx-auto my-auto px-0 '>
                <Card id="customerList">
                    <CardHeader className="border-bottom-dashed">
                        <ReactstrapRow className=" align-items-center">
                            <div className="col-lg-10 col-md-9 col-sm-6 col-xs-10">
                                <h5 className=" mb-0 form_title">Product List</h5>
                            </div>
                            <div className="col-lg-2 col-md-3 col-sm-6 col-xs-2 d-flex justify-content-end">
                                <button className="btn btn-success btn-sm"
                                    onClick={handleAddRow}
                                >
                                    <i className="bi bi-plus"></i>
                                </button>
                            </div>
                        </ReactstrapRow>
                    </CardHeader>
                </Card>

                <Card className='mt-3 header_card text-light'>
                    <ReactstrapRow className=''>
                        <Col lg={4} md={4} sm={6} xs={4} className='p-2  d-flex align-items-center justify-content-center flex_wrap'>
                            <p className='mb-0'>Product</p>
                        </Col>
                        <Col lg={2} md={2} sm={2} xs={2} className='  d-flex align-items-center justify-content-center flex_wrap'>
                            <p className='mb-0'>Qty</p>
                        </Col>
                        <Col lg={2} md={2} sm={1} xs={2} className='  d-flex align-items-center justify-content-center flex_wrap'>
                            <p className='mb-0'>Price</p>
                        </Col>
                        <Col lg={2} md={2} sm={1} xs={2} className='  d-flex align-items-center justify-content-center flex_wrap' >
                            <p className='mb-0'>Total</p>
                        </Col>
                        <Col lg={2} md={2} sm={2} xs={2} className='  d-flex align-items-center justify-content-center flex_wrap'>
                            <p className='mb-0'>Actions</p>
                        </Col>
                    </ReactstrapRow>
                </Card>

                <Card className='tbl_card' style={{ overflow: 'auto' }}>
                    <CardBody className="border-bottom-dashed">
                        {rows.map((row) => (
                            <Row
                                key={row.id}
                                row={row}
                                products={products}
                                onEdit={handleEditClick}
                                onDelete={() => handleDelete(row.id)}
                            />
                        ))}
                    </CardBody>
                </Card>

                <div className='mt-2 row d-flex align-items-center justify-content-between'>
                    <div className='col-lg-8 col-md-6 col-sm-2 col-xs-2'>
                        <button className='btn btn-success btn-sm'
                            onClick={() => {
                                dispatch(saveAll());
                                toast.success('All rows saved successfully!');
                            }}
                        >Save All</button>
                    </div>
                    <div className='col-lg-4 col-md-6 col-sm-10 col-xs-10'>
                        <TotalDisplay />
                    </div>
                </div>

                <EditModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleUpdate}
                    products={products}
                    row={editRowData}
                />
            </div>
            <ToastContainer position="bottom-right" autoClose={2000} />
        </>
    );
};

export default TableForm;







// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addRow, saveAll } from './tableSlice';
// import Row from '../../components/Row';
// import TotalDisplay from '../../components/TotalDisplay';

// const TableForm = () => {
//   const dispatch = useDispatch();
//   const rows = useSelector((state) => state.table.rows);

//   return (
//     <div>
//       <button onClick={() => dispatch(addRow())}>Add Row</button>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Quantity</th>
//             <th>Price</th>
//             <th>Total</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row) => (
//             <Row key={row.id} row={row} />
//           ))}
//         </tbody>
//       </table>
//       <TotalDisplay />
//       <button onClick={() => dispatch(saveAll())}>Save All</button>
//     </div>
//   );
// };

// export default TableForm;