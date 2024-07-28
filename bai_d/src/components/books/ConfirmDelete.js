import React from 'react';
import './css/DeleteModal.css'

const ConfirmDelete = ({ onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>Bạn có muốn xóa sách này không?</p>
                <button onClick={onConfirm}>Có</button>
                <button onClick={onCancel}>Không</button>
            </div>
        </div>
    );
};

export default ConfirmDelete;

