## TIER 1 MVP Shopping Experience

As a customer/visitor, I want to be able to:
   
    [X]edit my cart if I change my mind:
        [X]change the quantity of a product in my cart.
        [X]remove a product in my cart.
        [ ]No one else should be able to edit my cart except me.
    [X]"checkout" the items in my cart so I can purchase my desired goods.
        [ ]Think of a typical user experience on popular websites from a guest user and logged-in user perspective.
        [X]You can just start with by simulating the experience of checking out with a simple confirmation page.
    

As an engineer, I want to:
        [ ]For example, seed hundreds of products with dummy data so that when you get to the “pagination” user story, you won’t have to worry about adding more products.
        [ ]Likewise, add a bunch of users with products in their carts so editing the cart can be worked on without already having the “add to cart” functionality built out.
    [ ]user data to be secure so that no one can unrightfully manipulate information.

## TIER 2 E-Commerce Essentials

As a customer, I want to be able to:
        [ ]This includes front-end data validations. For example, if certain fields of a form are required and must be in a specific format, this is obvious to the user.
    [ ]have a persistent cart so I can revisit and pick up where I left off.
        [ ]There are two more experiences to consider here. Explore your favorite websites to see what the intended behavior is for the following cases:
            [ ]Guest-only: I don't want to create an account, but I want my cart to persist between browser refreshes.
                Look into front-end storage for this one.
            [ ]Guest-to-logged-in-user: Initially, I'm not logged in, and I add items to my cart. When I eventually log in, I want to see those same items I added when I was logged in still in my cart, in addition to the items I may have had in my cart from a previous logged in session.


As a logged-in customer, I want to be able to:
    [ ]see my order history so I can remember my previously purchased items and their prices at the time of purchase.


As an administrator, I want to be able to:
    [ ]allow customers to have a variety of payment method options in order to increase checkout conversion.
        [X]Begin by integrating Stripe, and, if interested, dive into integrating PayPal, Venmo, Braintree, or Bitcoin.