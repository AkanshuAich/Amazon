from flask import current_app as app, request, render_template, url_for, jsonify, Response
import sys
import os
# from flask_caching import Cache
import asyncio

# cache = Cache(app, config={"CACHE_TYPE": "simple"})

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'ChatBot')))

import Info

# @cache.memoize(timeout=600)
# def fetch(user_1, user_2, user_3, user_4):
#     return user_1, user_2, user_3, user_4

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/checkout")
def checkout():
    return render_template("checkout.html")

@app.route("/billing")
def billing():
    return render_template("billing.html")

@app.route("/chat", methods=['POST'])
def chatbot():
    global user_info_1, user_info_2, user_info_3, user_info_4

    user_info_1, user_info_2, user_info_3, user_info_4 = Info.user_info_1, Info.user_info_2, Info.user_info_3, Info.user_info_4
    # import Info 
    # user_info_1, user_info_2, user_info_3, user_info_4 = fetch(Info.user_info_1, Info.user_info_2, Info.user_info_3, Info.user_info_4)
    print(user_info_4)
    data = request.get_json()  # Parse incoming JSON data
    message = data.get('message')  # Extract the 'message' from JSON data
    print(message)

    import Bot
    # import Agent
    # user = Info.user
    response = Bot.chat(user_info_1, user_info_2, user_info_3, user_info_4, message)  # Construct a response message
    # response = asyncio.run(Agent.async_agent_call(user_info_1, user_info_2, user_info_3, message))
    return jsonify({"answer": response})  # Return the response as JSON

@app.route('/option', methods=['POST'])
def chat_endpoint():
    list_option = [
        {
            "id": 1,
            "name": "Cash on Delivery/Pay on Delivery",
            "details": "Cash, UPI and Cards accepted. know more",
            "image": "https://i.ibb.co/nR46L2y/indian-rupee.png"
        },
        {
            "id": 2,
            "name": "Amazon Pay UPI",
            "details": "State Bank of India **2278",
            "image": "https://www.shutterstock.com/image-vector/amazon-pay-logo-biggest-online-600w-2360491029.jpg"
        },
        {
            "id": 3,
            "name": "Other UPI Apps",
            "details": "Google Pay, PhonePe, Paytm and more",
            "image": "https://cdn.icon-icons.com/icons2/2699/PNG/512/upi_logo_icon_170312.png"
        },
        {
            "id": 4,
            "name": "Credit or debit card",
            "details": "",
            "image": "https://cdn.iconscout.com/icon/premium/png-256-thumb/card-payment-star-9319049-7601932.png"
        },
        {
            "id": 5,
            "name": "EMI",
            "details": "",
            "image": "https://www.shutterstock.com/shutterstock/photos/2443921359/display_1500/stock-vector-emi-calculator-with-percentage-sign-icon-as-eps-file-2443921359.jpg"
        },
        {
            "id": 6,
            "name": "Net Banking",
            "details": "",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShaR-ZCWiGo7Z0xZRkrskeXNTLo1_mvYv32Q&s"
        }
    ]

    return jsonify({'options': list_option})
