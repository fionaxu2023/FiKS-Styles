'use strict'

const { db, User, Product, Cart, CartItems,Order } = require('../server/db/index');
const {green, red} = require('chalk');

const users = [{ 
  username: 'user1@email.com',
  address: 'Somewhere in London',
  password: '123', 
  firstName: 'Harry',
  lastName: 'Potter',
  isAdmin:false,
 }, {
  username: 'user2@email.com',
  address: 'Somewhere in Edgewater NJ',
  password: '123', 
  firstName: 'Kelvin',
  lastName: 'Reynolds',
  isAdmin:false,
 }, {
  username: 'admin1@email.com',
  address: 'Somewhere in Edgewater NJ',
  password: '123', 
  firstName: 'John',
  lastName: 'Kazantzis',
  isAdmin:true,
}];

const products = [{
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2022/03/18/1647565154c7670d3714e81367097020266dbf638e_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex White Short-Sleeved Shirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2022/04/03/1648953310eebf841a46dc3ac86323b09f667c6c1c_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Black Short-Sleeved Shirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2022/05/12/16523324645991e9546474181ab3b9cab330bb311e_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Grey Short-Sleeved Shirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2022/06/17/1655445897bd258c46505906b27604ebcf80ed16c9_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Navy Short-Sleeved Shirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'long-sleeved shirt',
  imageURL: 'https://jiffyshirts.imgix.net/aac729a15b9d51.png?ixlib=rb-0.3.4&auto=format&fit=fill&fill=solid&trim-color=FFFFFF&trim=color&trim-tol=8&w=307&h=480&q=80&dpr=2',
  price: '39.99',
  shortDescription: 'Unisex White Long-Sleeved Shirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Top',
}, {  
  name: 'long-sleeved shirt',
  imageURL: 'https://jiffyshirts.imgix.net/adc55d82ae1d0e.png?ixlib=rb-0.3.4&auto=format&fit=fill&fill=solid&trim-color=FFFFFF&trim=color&trim-tol=8&w=307&h=480&dpr=2',
  price: '39.99',
  shortDescription: 'Unisex Grey Long-Sleeved Shirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Top',
}, {  
  name: 'long-sleeved shirt',
  imageURL: 'https://jiffyshirts.imgix.net/f703b42c0119e3.png?ixlib=rb-0.3.4&auto=format&fit=fill&fill=solid&trim-color=FFFFFF&trim=color&trim-tol=8&w=307&h=480&dpr=2',
  price: '39.99',
  shortDescription: 'Unisex Dark Grey Long-Sleeved Shirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Top',
}, {  
  name: 'long-sleeved shirt',
  imageURL: 'https://jiffyshirts.imgix.net/42cab4438cfd1d.png?ixlib=rb-0.3.4&auto=format&fit=fill&fill=solid&trim-color=FFFFFF&trim=color&trim-tol=8&w=307&h=480&dpr=2',
  price: '39.99',
  shortDescription: 'Unisex Black Long-Sleeved Shirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Top',
}, {
  name: 'long-sleeved shirt',
  imageURL: 'https://jiffyshirts.imgix.net/1da5b338faeb3f.png?ixlib=rb-0.3.4&auto=format&fit=fill&fill=solid&trim-color=FFFFFF&trim=color&trim-tol=8&w=307&h=480&dpr=2',
  price: '39.99',
  shortDescription: 'Unisex Navy Long-Sleeved Shirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Top',
}, {  
  name: 'shorts',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2022/01/13/16420513159406a934186a03ba11805f4f7a18ea73_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Grey Shorts',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Bottom',
}, {  
  name: 'shorts',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2021/08/10/16285636425a80e73ac64ff33ab994769fef94ed05_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Black Shorts',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Bottom',
}, {  
  name: 'shorts',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2020/06/09/1591694121b2810f2c72a81adfd38dc72596f48462_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Khaki Shorts',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Bottom',
}, {  
  name: 'pants',
  imageURL: 'https://cdni.llbean.net/is/image/wim/513837_455_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbprod/A0211793_2',
  price: '39.99',
  shortDescription: 'Unisex Antique White Pants',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'pants',
  imageURL: 'https://cdni.llbean.net/is/image/wim/513837_32573_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2',
  price: '39.99',
  shortDescription: 'Unisex Carbon Navy pants',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'pants',
  imageURL: 'https://cdni.llbean.net/is/image/wim/513837_38875_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2',
  price: '39.99',
  shortDescription: 'Unisex Antique Olive pants',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'pants',
  imageURL: 'https://cdni.llbean.net/is/image/wim/513837_35336_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2',
  price: '39.99',
  shortDescription: 'Unisex Coastal Dune pants',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'skirts',
  imageURL: 'https://cdni.llbean.net/is/image/wim/519594_33335_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2',
  price: '39.99',
  shortDescription: 'Womens Khaki Skirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'skirts',
  imageURL: 'https://cdni.llbean.net/is/image/wim/519594_132_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2',
  price: '39.99',
  shortDescription: 'Womens Dark Taupe Skirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'skirts',
  imageURL: 'https://cdni.llbean.net/is/image/wim/519637_1507_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2',
  price: '39.99',
  shortDescription: 'Womens Chambray Skirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'Dress',
  imageURL: 'https://image.s5a.com/is/image/saks/0400018589633_WHITE?wid=484&hei=646&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
  price: '49.99',
  shortDescription: 'White Summer Dress',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Dress',
}, {
  name: 'Dress',
  imageURL: 'https://image.s5a.com/is/image/saks/0400018589633_BLACK?wid=830&hei=1106&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
  price: '49.99',
  shortDescription: 'Black Summer Dress',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Dress',
}];

const carts =[
  {userId:1},
  {userId:2},
];

const cartsitems =[
  {ProductId:5,
    productId:5,
    quantity:1,
    cartId:1},
  {ProductId:3,
    productId:3,
    quantity:1,
    cartId:2},
]



const seed = async () => {
  try {
        await db.sync({force: true});

        await Promise.all(
          users.map(user => {
            return User.create(user);
          })
        );

        await Promise.all(
          products.map(product => {
            return Product.create(product);
          })
        );
        await Promise.all(
          carts.map(cart => {
            return Cart.create(cart);
          })
        );

        await Promise.all(
          cartsitems.map(order => {
            return CartItems.create(order);
          })
        );

        console.log(green('Seeding success!'));

        db.close();
  }
    catch(err) {
  console.error('Oh no! Something went wrong!');
  console.error(err);
  db.close();
  }
}

async function runSeed() {
  console.log(`seeding...`)
  try {
    await seed();
  } catch (err) {
    console.log(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed