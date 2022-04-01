import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            firstName: 'Admin',
            lastName: '1',
            email: 'admin@example.com',
            password: bcrypt.hashSync('admin', 8),
            address: '123 Admin',
            city: 'Sheffield',
            postalCode: 'S1 1AB',
            country: 'UK',
            phone: 440123456789,
            isAdmin: true,
            isUser: false,
            isCustomer: false,
        },
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
            isAdmin: false,
            isUser: true,
            isCustomer: false,
        },
        {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: bcrypt.hashSync('john', 8),
            address: '456 Victoria',
            city: 'Sheffield',
            postalCode: 'S2 1WB',
            country: 'UK',
            phone: 44123456784,
            isAdmin: false,
            isUser: false,
            isCustomer: true,
        },
    ],
    products: [
        {
            //id: 1,
            productName: 'The Peace Garden',
            //slug: 'the-peace-garden',
            productDescription: 'Sheffield Painting',
            image: 'https://images.squarespace-cdn.com/content/5488ad4ee4b0ba05acd8c3a2/1510490697583-FFYYCVG56V79LA5W03KW/image-asset.jpeg?format=1500w&content-type=image%2Fjpeg',
            unitOfMeasure: 'unit',
            quantityOnHand: 1,
            weight: 200,
            currentPrice: 120,
            discountedPrice: 0,
            isFeatured: true,
            productStatus: 'Available',
            productCategory: 'Painting'
        },
        {
            //id: 2,
            productName: 'Handmade Jewellery',
            //slug: 'handmade-jewellery',
            productDescription: 'Made by pure metal',
            image: 'https://i0.wp.com/www.society19.com/wp-content/uploads/2021/06/etsy-jewelry-featured-image-1.jpg?fit=1200%2C900&ssl=1',
            unitOfMeasure: 'unit',
            quantityOnHand: 5,
            weight: 1,
            currentPrice: 50,
            discountedPrice: 0,
            isFeatured: true,
            productStatus: 'Available',
            productCategory: 'Jewellery'
        },
        {
            //id: 3,
            productName: 'Burger and toast',
            //slug: 'burger-and-toast',
            productDescription: 'Homemade bread recipe',
            image: 'https://d18mqtxkrsjgmh.cloudfront.net/public/2021-03/Eating%20More%20Ultraprocessed%20%E2%80%98Junk%E2%80%99%20Food%20Linked%20to%20Higher%20CVD%20Risk.jpeg',
            unitOfMeasure: 'unit',
            quantityOnHand: 20,
            weight: 100,
            currentPrice: 10,
            discountedPrice: 0,
            isFeatured: true,
            productStatus: 'Available',
            productCategory: 'Food'
        },
        {
            //id: 4,
            productName: 'Ladies shirt ',
            //slug: 'ladies-shirt',
            productDescription: 'high quality shirt',
            image: 'https://www.asiaone.com/sites/default/files/original_images/Apr2020/060420_clothes_unspl.jpg',
            unitOfMeasure: 'unit',
            quantityOnHand: 50,
            weight: 20,
            currentPrice: 80,
            discountedPrice: 5,
            isFeatured: true,
            productStatus: 'Available',
            productCategory: 'Clothes'
        },
        {
            //id: 5,
            productName: 'Scented Candles',
            //slug: 'scented-candles',
            productDescription: 'Orange scented candles',
            image: 'https://cdn.shopify.com/s/files/1/0054/8034/9799/products/craftfactorycandlemakingkit_1_1296x.jpg?v=1643975047',
            unitOfMeasure: 'unit',
            quantityOnHand: 50,
            weight: 20,
            currentPrice: 56,
            discountedPrice: 5,
            isFeatured: true,
            productStatus: 'Available',
            productCategory: 'Deco'
        },
        {
            //id: 6,
            productName: 'Leather bags',
            //slug: 'leather-bags',
            productDescription: 'Multi purpose bags',
            image: 'https://cdn.thewirecutter.com/wp-content/uploads/2020/03/totebags-lowres-2x1-3945.jpg?auto=webp&quality=75&crop=2:1&width=1024',
            unitOfMeasure: 'unit',
            quantityOnHand: 50,
            weight: 20,
            currentPrice: 30,
            discountedPrice: 0,
            isFeatured: true,
            productStatus: 'Available',
            productCategory: 'Bags'
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
    productCategory: [
        {
            //id: 1,
            categoryName: "PAINTING",
            categoryDescription: "For painting products",
            categoryStatus: "Available"
        },
        {
            //id: 2,
            categoryName: "JEWELLERY",
            categoryDescription: "Some handmade jewellery",
            categoryStatus: "Available"
        },
        {
            //id: 3,
            categoryName: "FOOD",
            categoryDescription: "Any kinds of food",
            categoryStatus: "Available"
        },
        {
            //id: 4,
            categoryName: "CLOTHES",
            categoryDescription: "Brand new or used clothes",
            categoryStatus: "Available"
        },
        {
            //id: 5,
            categoryName: "DECOR",
            categoryDescription: "Mostly for home decoration",
            categoryStatus: "Available"
        },
        {
            //id: 6,
            categoryName: "BAGS",
            categoryDescription: "Handmade or used bags",
            categoryStatus: "Available"
        },
    ],
};
export default data;