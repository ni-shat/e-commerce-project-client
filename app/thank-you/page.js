export default function ThankYouPage() {
    return (
        <div className="min-h-screen bg-gray-100 py-10 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-semibold text-green-600">Payment Successful!</h1>
                <p className="mt-4 text-lg text-gray-600">Thank you for your purchase. Your transaction was successful.</p>
                <a href="/" className="mt-6 inline-block bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600">
                    Return to Home
                </a>
            </div>
        </div>
    );
}