import { useState, useEffect } from 'react';
import '../assets/css/editModal.css';

const EditModal = ({ isOpen, onClose, onSubmit, products, row }) => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (row) {
      setProductId(row.productId);
      setQuantity(row.quantity);
    }
  }, [row]);

  if (!isOpen) return null;

  const handleUpdate = () => {
    onSubmit({ ...row, productId, quantity });
    onClose();
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal p-3">
        <span className="mb-2 badge bg-secondary border border-secondary fs-6 w-100 fw-normal p-2">Edit Product</span>
        <select value={productId} onChange={(e) => setProductId(e.target.value)}>
          <option value="">Select</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <br />
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
        />
        <br />
        <div className='d-flex justify-content-end align-items-center'>
          <button className='btn btn-outline-success fw-normal btn-sm' onClick={handleUpdate}>Update</button>
          <button className='btn btn-outline-danger fw-normal btn-sm' onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;