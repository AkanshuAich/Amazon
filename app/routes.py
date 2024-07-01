from flask import current_app as app, request, render_template, url_for, jsonify, Response
import sys
import os
# from flask_caching import Cache
import asyncio

# cache = Cache(app, config={"CACHE_TYPE": "simple"})

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'ChatBot')))

import Info
import Billing
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

@app.route("/dashboard")
def dashboard():
    return render_template("dash.html")

@app.route("/order")
def order():
    return render_template("order.html")

@app.route("/emi")
def emi():
    return render_template("emi.html")

@app.route("/budget")
def budget():
    return render_template("budget.html")

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
    response = Billing.bill()
    return jsonify({'options': response})
