from flask import Flask, request, jsonify
from flask_cors import CORS
import stripe

app = Flask(__name__)
CORS(app)

# Set up Stripe secret key
stripe.api_key = 'sk_test_51QbijzRosPL8EM1RrJkCzTGFN3PJ46QPeMFB68Lo8AVRAx8mYCGCIEqK93X2wfLu3D5Vu10AaJJFAZkRKkkAUcpU007oyV1OaK'

@app.route('/checkout', methods=['POST'])
def checkout():
    try:
        # Retrieve items from the request body
        data = request.get_json()
        items = data.get('items', [])

        # Convert items to the format required by Stripe
        line_items = [
            {
                'price': item['id'],
                'quantity': item['quantity']
            }
            for item in items
        ]

        # Create a Stripe checkout session
        session = stripe.checkout.Session.create(
            line_items=line_items,
            mode='payment',
            success_url='http://localhost:3000/success',
            cancel_url='http://localhost:3000/cancel'
        )

        # Return the session URL
        return jsonify({'url': session.url})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=4000, debug=True)
