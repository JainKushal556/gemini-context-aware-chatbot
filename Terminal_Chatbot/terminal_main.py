import time as t
import Terminal_Chatbot.terminal_aimodels as ai

while True:
    print("1: New Chat All Time 2: Chat With History 3: Exit")
    user = input("Intput: ") 
    
    if user == '1':
        print("...Chat Bot Started...")
        prompt = input("User: ")
        while prompt not in ["exit","quit","end"]:
            start_time = t.time()
            res = ai.call_ai_stateless(prompt)
            end_time = t.time()
            print("Kimi: ",res)
            print("\nTime Taken: ",end_time-start_time)
            prompt = input("User: ")
    elif user == '2':
        print("...Chat Bot Started...")
        prompt = input("User: ")
        while prompt not in ["exit","quit","end"]:
            start_time = t.time()
            res = ai.call_ai_stateful(prompt)
            end_time = t.time()
            print("Kimi: ",res)
            print("\nTime Taken: ",end_time-start_time)
            prompt = input("User: ")
    elif user == '3':
        break
    else:
        print("...Invalid Input...")



# python -m Terminal_Chatbot.terminal_main
