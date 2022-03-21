import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            firstName: 'Huda',
            lastName: 'Rashid',
            email: 'huda@example.com',
            password: bcrypt.hashSync('huda', 8),
            address: '456 Victoria',
            city: 'Sheffield',
            postalCode: 'S2 1WB',
            country: 'UK',
            phone: 44123456784,
        },
    ],

    products: [
        {
            name: 'Nike Slim Shirt',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'Adidas Fit Shirt',
            category: 'Shirts',
            image: '/images/p2.jpg',
            price: 100,
            countInStock: 20,
            brand: 'Adidas',
            rating: 4.0,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'Lacoste Free Shirt',
            category: 'Shirts',
            image: '/images/p3.jpg',
            price: 220,
            countInStock: 0,
            brand: 'Lacoste',
            rating: 4.8,
            numReviews: 17,
            description: 'high quality product',
        },
        {
            name: 'Nike Slim Pant',
            category: 'Pants',
            image: '/images/p4.jpg',
            price: 78,
            countInStock: 15,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 14,
            description: 'high quality product',
        },
        {
            name: 'Puma Slim Pant',
            category: 'Pants',
            image: '/images/p5.jpg',
            price: 65,
            countInStock: 5,
            brand: 'Puma',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'Adidas Fit Pant',
            category: 'Pants',
            image: '/images/p6.jpg',
            price: 139,
            countInStock: 12,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 15,
            description: 'high quality product',
        },
    ],
    categories: [
        {
            id: 1,
            img: "https://cdn.britannica.com/76/219376-131-8501C217/artists-brushes-paints.jpg",
            title: "PAINTING",
            slug: "PAINTING"
        },
        {
            id: 2,
            img: "https://i0.wp.com/www.society19.com/wp-content/uploads/2021/06/etsy-jewelry-featured-image-1.jpg?fit=1200%2C900&ssl=1",
            title: "JEWELLERY",
            slug: "JEWELLERY"
        },
        {
            id: 3,
            img: "https://d18mqtxkrsjgmh.cloudfront.net/public/2021-03/Eating%20More%20Ultraprocessed%20%E2%80%98Junk%E2%80%99%20Food%20Linked%20to%20Higher%20CVD%20Risk.jpeg",
            title: "FOOD",
            slug: "FOOD"
        },
        {
            id: 4,
            img: "https://www.asiaone.com/sites/default/files/original_images/Apr2020/060420_clothes_unspl.jpg",
            title: "CLOTHES",
            slug: "CLOTHES"
        },
        {
            id: 5,
            img: "https://cdn.shopify.com/s/files/1/0054/8034/9799/products/craftfactorycandlemakingkit_1_1296x.jpg?v=1643975047",
            title: "DECOR",
            slug: "DECOR"
        },
        {
            id: 6,
            img: "https://cdn.thewirecutter.com/wp-content/uploads/2020/03/totebags-lowres-2x1-3945.jpg?auto=webp&quality=75&crop=2:1&width=1024",
            title: "BAGS",
            slug: "BAGS"
        },
    ],
};
export default data;