import React from 'react'

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
                    <div className="relative z-50 bg-white p-8 rounded-lg shadow-lg">
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            onClick={onClose}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
                        <p className="text-gray-700 mb-6">
                            Are you sure you want to delete this product?
                        </p>
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 mr-2 bg-red-600 text-white rounded-md hover:bg-red-800"
                                onClick={onConfirm}
                            >
                                Yes, I'm sure
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                onClick={onClose}
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DeleteModal
