// FailureModal.js
import React from 'react';

const FailureModal = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-red-600">Payment Failed</h2>
            <p className="mt-4 text-lg text-gray-600">{message}</p>
            <div className="mt-6 flex justify-end">
                <button onClick={onClose} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                    Close
                </button>
            </div>
        </div>
    </div>
);

export default FailureModal;
