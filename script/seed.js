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
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/03/22/16794613296a8fe93a8ffa4b538a7b32d7ddfbb517_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Black Mountain Print Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/01/06/1672974746b48e601a84d6d36c35fa9c86f9912cb5_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex White Mountain Print Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/03/01/16776362428b27d100313c981b0c1ce6308fb182af_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Navy Blue Mountain Print Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2022/01/13/1642051300939a1fb03647e743a38ed0ad6a7211f7_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Black Slogan Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images2_pi/2018/04/24/15245723301457649101_thumbnail_900x1199.webp',
  price: '29.99',
  shortDescription: 'Unisex Black Pineapple Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2022/04/07/16493117764e5e8b084a7c09db87002e43bab6d058_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex White Panda Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images2_pi/2018/12/28/1545981119897388660_thumbnail_900x1199.webp',
  price: '29.99',
  shortDescription: 'Unisex Black Lightning Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2022/12/30/167236596038569324b922279bfe0796912b1e520e_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex White Dinosaur Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images2_pi/2019/04/24/15560964993199197621_thumbnail_900x1199.webp',
  price: '29.99',
  shortDescription: 'Unisex Black Sunflower Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2022/08/11/1660180370b047f61395cbe7759aa5163545377c6f_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex White Smiley Face Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2021/12/10/1639101325a1830e2efc26e57751d66cc3e8c67549_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Black Coconut Tree Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2021/03/22/161638902448fbcefe3753709510221cf9d99b0715_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Oatmeal Coconut Tree Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2021/12/09/16390135550146a8a8e443e41d9b8c5bada129f8f5_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Light Grey Coconut Tree Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2022/06/09/16547731737900a0e08601fc4857bc31c7513ab3b4_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Black Graphic Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2022/05/27/165361463629fbc084af12feed7c1dd943ebc5873c_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex White-Black Stripe Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/01/06/1672990920e04aa38b16a52b4eaa2069b7c0b9a503_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex White Textured Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/04/20/168199375448be4dabedb454d01dfd400883cbb426_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Black Textured Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/04/20/1681954242fb51a631ae1ac96af5543129c3b14e68_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Dark Grey Textured Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/04/20/1681974991ae94554a1a8896fbc7381d44faa1acd5_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Raglan Sleeve Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/03/10/1678434515244cde3a823d6d54859e37e0b771237a_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Black Henley Short-Sleeve Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/03/15/16788448136c86363bb90f141fc4769ee6540b5457_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex White Henley Short-Sleeve Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/01/29/1674957532035d1469a0b0f4cc58b95d948e1289b3_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex White Button Short-Sleeve Tee',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/03/06/16780868869d7243266a0ffe40e8417a0f75c311b7_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex White Tank Top',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/03/06/16780672559258d701789ccad2dc80bfe85673585a_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Black Tank Top',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/01/03/1672712525261e2e5b79fa238da8f711e4184313c6_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex White Coconut Tree Print Tank Top',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Top',
}, {
  name: 'short-sleeved shirt',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2022/05/19/1652963007bd7d479695dda77840390de5719cca18_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Flamingo Tank Top',
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
  name: 'long-sleeved shirt',
  imageURL: 'https://jiffyshirts.imgix.net/f564400b07c43f.jpg?ixlib=rb-0.3.4&auto=format&fit=fill&fill=solid&trim-color=FFFFFF&trim=color&trim-tol=8&w=307&h=480&dpr=2',
  price: '39.99',
  shortDescription: 'Unisex White Hoodie',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Top',
}, {  
  name: 'long-sleeved shirt',
  imageURL: 'https://jiffyshirts.imgix.net/804c673f483ad0.jpg?ixlib=rb-0.3.4&auto=format&fit=fill&fill=solid&trim-color=FFFFFF&trim=color&trim-tol=8&w=307&h=480&dpr=2',
  price: '39.99',
  shortDescription: 'Unisex Off-White Hoodie',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Top',
}, {  
  name: 'long-sleeved shirt',
  imageURL: 'https://jiffyshirts1.imgix.net/e982c7acf833ca.jpg?ixlib=rb-0.3.4&auto=format&fit=fill&fill=solid&trim-color=FFFFFF&trim=color&trim-tol=8&w=307&h=480&dpr=2',
  price: '39.99',
  shortDescription: 'Unisex Desert Sand Hoodie',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Top',
}, {  
  name: 'long-sleeved shirt',
  imageURL: 'https://jiffyshirts1.imgix.net/e663043dcdf3a2.jpg?ixlib=rb-0.3.4&auto=format&fit=fill&fill=solid&trim-color=FFFFFF&trim=color&trim-tol=8&w=307&h=480&dpr=2',
  price: '39.99',
  shortDescription: 'Unisex Brown Hoodie',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Top',
}, {  
  name: 'long-sleeved shirt',
  imageURL: 'https://jiffyshirts1.imgix.net/53ee160ee0cd7f.jpg?ixlib=rb-0.3.4&auto=format&fit=fill&fill=solid&trim-color=FFFFFF&trim=color&trim-tol=8&w=307&h=480&dpr=2',
  price: '39.99',
  shortDescription: 'Unisex Ash Hoodie',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Top',
}, {  
  name: 'long-sleeved shirt',
  imageURL: 'https://jiffyshirts.imgix.net/9ec8fe9b50039f.jpg?ixlib=rb-0.3.4&auto=format&fit=fill&fill=solid&trim-color=FFFFFF&trim=color&trim-tol=8&w=307&h=480&dpr=2',
  price: '39.99',
  shortDescription: 'Unisex Grey Hoodie',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Top',
}, {  
  name: 'long-sleeved shirt',
  imageURL: 'https://jiffyshirts1.imgix.net/9b29793cb3a4c9.jpg?ixlib=rb-0.3.4&auto=format&fit=fill&fill=solid&trim-color=FFFFFF&trim=color&trim-tol=8&w=307&h=480&dpr=2',
  price: '39.99',
  shortDescription: 'Unisex Steel Grey Hoodie',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Top',
}, {  
  name: 'long-sleeved shirt',
  imageURL: 'https://jiffyshirts1.imgix.net/0596d2fe1999d7.jpg?ixlib=rb-0.3.4&auto=format&fit=fill&fill=solid&trim-color=FFFFFF&trim=color&trim-tol=8&w=307&h=480&dpr=2',
  price: '39.99',
  shortDescription: 'Unisex Charcoal Hoodie',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Top',
}, {  
  name: 'long-sleeved shirt',
  imageURL: 'https://jiffyshirts1.imgix.net/163c4e7a1ecebb.jpg?ixlib=rb-0.3.4&auto=format&fit=fill&fill=solid&trim-color=FFFFFF&trim=color&trim-tol=8&w=307&h=480&dpr=2',
  price: '39.99',
  shortDescription: 'Unisex Navy Hoodie',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Top',
}, {  
  name: 'long-sleeved shirt',
  imageURL: 'https://jiffyshirts1.imgix.net/62769e7093d0de.jpg?ixlib=rb-0.3.4&auto=format&fit=fill&fill=solid&trim-color=FFFFFF&trim=color&trim-tol=8&w=307&h=480&dpr=2',
  price: '39.99',
  shortDescription: 'Unisex French Navy Hoodie',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Top',
}, {  
  name: 'long-sleeved shirt',
  imageURL: 'https://jiffyshirts1.imgix.net/4afdcaaeb5d389.jpg?ixlib=rb-0.3.4&auto=format&fit=fill&fill=solid&trim-color=FFFFFF&trim=color&trim-tol=8&w=307&h=480&q=80&dpr=2',
  price: '39.99',
  shortDescription: 'Unisex Black Hoodie',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Top',
}, {  
  name: 'long-sleeved shirt',
  imageURL: 'https://jiffyshirts1.imgix.net/937133ce6ef96e.jpg?ixlib=rb-0.3.4&auto=format&fit=fill&fill=solid&trim-color=FFFFFF&trim=color&trim-tol=8&w=307&h=480&dpr=2',
  price: '39.99',
  shortDescription: 'Unisex White Mock Turtleneck',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Top',
}, {  
  name: 'long-sleeved shirt',
  imageURL: 'https://jiffyshirts1.imgix.net/d6f7e3ff30e1be.jpg?ixlib=rb-0.3.4&auto=format&fit=fill&fill=solid&trim-color=FFFFFF&trim=color&trim-tol=8&w=307&h=480&dpr=2',
  price: '39.99',
  shortDescription: 'Unisex Black Mock Turtleneck',
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
  name: 'shorts',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/03/07/1678154028f570478c521f0593f041529f02e13efc_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Khaki Coconut Tree Print Shorts',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Bottom',
}, {  
  name: 'shorts',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/03/06/16780750280a3f1df92358a0d4a2bf1d296d05410d_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Navy Coconut Tree Print Shorts',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Bottom',
}, {  
  name: 'shorts',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/01/13/1673576185c64689b311e78a511761cf4454a866e3_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Grey Cargo Shorts',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Bottom',
}, {  
  name: 'shorts',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2021/11/27/1637977475dc1117b234111eb8f0ee252baedb963e_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Black Patch Shorts',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Bottom',
}, {  
  name: 'shorts',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2021/06/05/162285871121cf7da057f5eaee095afd54364753d1_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Khaki Patch Shorts',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Bottom',
}, {  
  name: 'shorts',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/03/29/1680067161e93a10ee5df9d3a9957687167367a4ea_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex White Patch Shorts',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  category: 'Bottom',
}, {  
  name: 'shorts',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/03/20/1679288722809c10dbe18732496aecd3ab2393985a_thumbnail_900x.webp',
  price: '29.99',
  shortDescription: 'Unisex Navy Patch Shorts',
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
  name: 'pants',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/03/02/167772531455ef15b5ec79d366e44d399c83b48233_thumbnail_900x.webp',
  price: '39.99',
  shortDescription: 'Unisex Black sweatpants',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'pants',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/03/02/1677725342630370aada34999c78c8c9849edd56d2_thumbnail_900x.webp',
  price: '39.99',
  shortDescription: 'Unisex Light Grey sweatpants',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'pants',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/02/22/16770295465f61117c936aacf8d1523e1a7983eb36_thumbnail_900x.webp',
  price: '39.99',
  shortDescription: 'Unisex White sweatpants',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'pants',
  imageURL: 'https://img.ltwebstatic.com/images3_pi/2023/03/14/167878723867ab5291ca0694600f548a6b1b240f13_thumbnail_900x.webp',
  price: '39.99',
  shortDescription: 'Unisex Sand sweatpants',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'pants',
  imageURL: 'https://www.jcrew.com/s7-img-facade/K5391_DM2763?hei=850&crop=0,0,680,0',
  price: '39.99',
  shortDescription: 'Womens Dark Wash Jeans',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'pants',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BB767_DM0710?hei=850&crop=0,0,680,0',
  price: '39.99',
  shortDescription: 'Womens Black Jeans',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'pants',
  imageURL: 'https://www.jcrew.com/s7-img-facade/L4713_DM3107?hei=850&crop=0,0,680,0',
  price: '39.99',
  shortDescription: 'Womens Lightwash Jeans',
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
  name: 'skirts',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BG546_NA6436?hei=850&crop=0,0,680,0',
  price: '39.99',
  shortDescription: 'Womens Flax Linen Mini Skirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'skirts',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BG546_BK0001?hei=850&crop=0,0,680,0',
  price: '39.99',
  shortDescription: 'Womens Black Linen Mini Skirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'skirts',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BP659_YD2858?hei=850&crop=0,0,680,0',
  price: '39.99',
  shortDescription: 'Womens Checkered Skirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'skirts',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BP658_WT0002?hei=850&crop=0,0,680,0',
  price: '39.99',
  shortDescription: 'Womens White Skirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'skirts',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BP658_BK0001?hei=850&crop=0,0,680,0',
  price: '39.99',
  shortDescription: 'Womens Black Skirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'skirts',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BI723_WT0002?hei=850&crop=0,0,680,0',
  price: '39.99',
  shortDescription: 'Womens White Denim Skirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'skirts',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BG551_DM6431?hei=850&crop=0,0,680,0',
  price: '39.99',
  shortDescription: 'Womens Denim Skirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'skirts',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BP655_NA5947?hei=850&crop=0,0,680,0',
  price: '39.99',
  shortDescription: 'Womens Light Khaki Skirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'skirts',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BP653_WT0002?hei=850&crop=0,0,680,0',
  price: '39.99',
  shortDescription: 'Womens White Pleated Midi Skirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'skirts',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BP653_NA5947?hei=850&crop=0,0,680,0',
  price: '39.99',
  shortDescription: 'Womens Khaki Pleated Midi Skirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'skirts',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BP657_NA6445?hei=850&crop=0,0,680,0',
  price: '39.99',
  shortDescription: 'Womens Natural Faux-Wrap Mini Skirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'skirts',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BK334_WT0002?hei=850&crop=0,0,680,0',
  price: '39.99',
  shortDescription: 'Womens White Flared Sports Skirt',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Bottom',
}, {
  name: 'skirts',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BK334_BK0001?hei=850&crop=0,0,680,0',
  price: '39.99',
  shortDescription: 'Womens Black Flared Sports Skirt',
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
}, {
  name: 'Dress',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BP015_WT0002?hei=850&crop=0,0,680,0',
  price: '49.99',
  shortDescription: 'White Side-Slit Sports Dress',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Dress',
}, {
  name: 'Dress',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BP013_PT4394?hei=850&crop=0,0,680,0',
  price: '49.99',
  shortDescription: 'Stripe Side-Slit Sports Dress',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Dress',
}, {
  name: 'Dress',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BP112_BK0001?hei=850&crop=0,0,680,0',
  price: '49.99',
  shortDescription: 'Relaxed Tank Dress',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Dress',
}, {
  name: 'Dress',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BR470_BK0001?hei=850&crop=0,0,680,0',
  price: '49.99',
  shortDescription: 'V-neck Shift Dress',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Dress',
}, {
  name: 'Dress',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BK699_BK0001?hei=850&crop=0,0,680,0',
  price: '49.99',
  shortDescription: 'Sheath Dress',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Dress',
}, {
  name: 'Dress',
  imageURL: 'https://www.jcrew.com/s7-img-facade/BP876_DM5997?hei=850&crop=0,0,680,0',
  price: '49.99',
  shortDescription: 'Chambray Dress',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Dress',
}, {
  name: 'Dress',
  imageURL: 'https://www.jcrew.com/s7-img-facade/N1999_WC6066?hei=850&crop=0,0,680,0',
  price: '49.99',
  shortDescription: 'Slip Dress',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Dress',
}, {
  name: 'Dress',
  imageURL: 'https://www.jcrew.com/s7-img-facade/N1685_WC6066?hei=850&crop=0,0,680,0',
  price: '49.99',
  shortDescription: 'Robe Dress',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Dress',
}, {
  name: 'Dress',
  imageURL: 'https://s7d2.scene7.com/is/image/aeo/1704_1210_073_f?$pdp-mtg-opt$&fmt=webp',
  price: '49.99',
  shortDescription: 'Low Key Dress',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Dress',
}, {
  name: 'Dress',
  imageURL: 'https://s7d2.scene7.com/is/image/aeo/1704_1058_100_f?$pdp-mz-opt$&fmt=webp',
  price: '49.99',
  shortDescription: 'White Hugger Dress',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Dress',
}, {
  name: 'Dress',
  imageURL: 'https://s7d2.scene7.com/is/image/aeo/1704_1036_417_f?$pdp-mtg-opt$&fmt=webp',
  price: '49.99',
  shortDescription: 'Blue Hugger Dress',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Dress',
}, {
  name: 'Dress',
  imageURL: 'https://s7d2.scene7.com/is/image/aeo/1704_1058_073_f?$pdp-mtg-opt$&fmt=webp',
  price: '49.99',
  shortDescription: 'Black Hugger Dress',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  category: 'Dress',
}, {
  name: 'Dress',
  imageURL: 'https://aritzia.scene7.com/is/image/Aritzia/hi-res/s23_04_a08_110382_1274_off_a.jpg',
  price: '49.99',
  shortDescription: 'Black One Shoulder Dress',
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