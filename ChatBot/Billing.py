
import pandas as pd
# Product Link : https://www.amazon.in/Dell-Alienware-x14-R2-i7-13620H/dp/B0C4ZP6QX5?th=1
# Product details
list_option = [
        {
            "id": 9,
            "name": "Cash on Delivery/Pay on Delivery",
            "details": "Cash, UPI and Cards accepted. know more",
            "image": "https://i.ibb.co/nR46L2y/indian-rupee.png",
            "recommended": "no",
        },
        {
            "id": 10,
            "name": "Other UPI Apps",
            "details": "Google Pay, PhonePe, Paytm and more",
            "image": "https://cdn.icon-icons.com/icons2/2699/PNG/512/upi_logo_icon_170312.png",
            "recommended": "no",
        },
        {
            "id": 11,
            "name": "Credit or debit card",
            "details": "",
            "image": "https://cdn.iconscout.com/icon/premium/png-256-thumb/card-payment-star-9319049-7601932.png",
            "recommended": "no",
        },
        {
            "id": 12,
            "name": "EMI",
            "details": "",
            "image": "https://www.shutterstock.com/shutterstock/photos/2443921359/display_1500/stock-vector-emi-calculator-with-percentage-sign-icon-as-eps-file-2443921359.jpg",
            "recommended": "no",
        },
        {
            "id": 13,
            "name": "Net Banking",
            "details": "",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShaR-ZCWiGo7Z0xZRkrskeXNTLo1_mvYv32Q&s",
            "recommended": "no",
        }
    ]

def bill():
    product_price = 159389

    # Create the DataFrame
    dell = pd.DataFrame(columns=['Payment Method', 'Sub Payment Method', 'Discount', 'Cashback', 'Maximum Discount', 'Maximum Cashback', 'Rewards Worth', 'Cost', 'Description', 'Image Link'])

    # Offer 1
    dell.loc[len(dell)] = ['Credit Card', 'HSBC Credit Card', 0.1 * product_price, 0, 1500, 0, 0, 0, '10% Instant Discount up to INR 1500 on HSBC Credit Card Non EMI Trnxs. Minimum purchase value ₹10,000', 'https://pbs.twimg.com/profile_images/1675701958198558727/d-50m08T_400x400.png']

    # Offer 2
    dell.loc[len(dell)] = ['Credit Card', 'Amex Credit Card EMI', 500, 0, 0, 0, 0, 0, 'Additional flat INR 500 Instant Discount on Amex Credit Card EMI Trxn. Minimum purchase value ₹25,000', 'https://logos-world.net/wp-content/uploads/2020/11/American-Express-Logo.png']

    # Offer 3
    dell.loc[len(dell)] = ['Credit Card', 'HSBC Credit Card EMI', 0.1 * product_price, 0, 1750, 0, 0, 0, '10% Instant Discount up to INR 1750 on HSBC Credit Card EMI Trnxs. Minimum purchase value ₹10,000', 'https://pbs.twimg.com/profile_images/1675701958198558727/d-50m08T_400x400.png']

    # Offer 4
    dell.loc[len(dell)] = ['Credit Card', 'Amex Credit Card EMI', 0.075 * product_price, 0, 1500, 0, 0, 0, '7.5% Instant Discount up to INR 1500 on Amex Credit Card EMI Trxn. Minimum purchase value ₹10,000', 'https://logos-world.net/wp-content/uploads/2020/11/American-Express-Logo.png']

    # Offer 5
    dell.loc[len(dell)] = ['Credit Card', 'Amex Credit Card EMI', 500, 0, 0, 0, 0, 0, 'Additional flat INR 500 Instant Discount on Amex Credit Card EMI Trxn. Minimum purchase value ₹30,000', 'https://logos-world.net/wp-content/uploads/2020/11/American-Express-Logo.png']

    # Offer 6
    dell.loc[len(dell)] = ['Credit Card', 'Amex Credit Card EMI', 750, 0, 0, 0, 0, 0, 'Additional flat INR 750 Instant Discount on Amex Credit Card EMI Trxn. Minimum purchase value ₹70,000', 'https://logos-world.net/wp-content/uploads/2020/11/American-Express-Logo.png']

    # Offer 7
    dell.loc[len(dell)] = ['Credit Card', 'Amex Credit Card EMI', 1000, 0, 0, 0, 0, 0, 'Additional flat INR 1000 Instant Discount on Amex Credit Card EMI Trxn. Minimum purchase value ₹1,00,000', 'https://logos-world.net/wp-content/uploads/2020/11/American-Express-Logo.png']

    # New Offer: Amazon Pay Balance
    dell.loc[len(dell)] = ['Amazon Pay Balance', '', 0, 25, 0, 0, 225, product_price - 25, 'Flat ₹25 cashback & rewards worth ₹225 on Amazon Pay Balance. Add ₹500 to avail the offer & Enjoy 1-click checkout!', 'https://www.shutterstock.com/image-vector/amazon-pay-logo-biggest-online-600w-2360491029.jpg']

    # Calculate the cost after applying the discounts
    for index, row in dell.iterrows():
        max_discount = min(row['Discount'], row['Maximum Discount'])
        dell.at[index, 'Cost'] = product_price - max_discount - row['Cashback']

    # Sort the DataFrame
    dell = dell.sort_values(by=['Cost', 'Rewards Worth'], ascending=[True, False])

    # Get the recommended payment method description
    # recommended_payment_method_description = dell.iloc[0]['Description']

    # Display the sorted DataFrame and recommended payment method
    # print(dell_sorted)
    # print("Recommended Payment Method Description:", recommended_payment_method_description)

    rec_list = dell.to_numpy().tolist()

    for i in range(len(rec_list)-1, -1, -1):
        option = rec_list[i]
        j = {
            "id" : i+1,
            "name": option[0]+" "+option[1],
            "details": option[8],
            "image": option[9],
            "recommended": "yes",
        }

        list_option.insert(0, j)
        
    return list_option
# print(calculate())
