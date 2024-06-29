import os
import sys
import asyncio
import Agent
# from flask_caching import Cache
# from app import cache

# Access cache from the app context
# cache = app.extensions['cache']

# @cache.memoize(timeout=300)  # Cache result for 5 minutes
# def fetch_user_attributes_cached(user):
    # return fetch_user_attributes(user)

def chat(user_info_1, user_info_2, user_info_3, user_info_4, prompt):
    # user_info_1, user_info_2, user_info_3, user_info_4 = fetch_user_attributes_cached(user)
    print(user_info_4)

    async def run_agent():
        # Asynchronously fetch response from the agent
        response = await Agent.async_agent_call(user_info_1, user_info_2, user_info_3, prompt)
        return response

    response = asyncio.run(run_agent())
    # response = asyncio.run(Agent.async_agent_call(user_info_1, user_info_2, user_info_3, prompt))
    return response
