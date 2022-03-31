import bcrypt from 'bcryptjs';

const data = {
  // products: [
  //   {
  //     productName: 'Nike Slim shirt1',
  //     productDescription: 'High quality shirt1',
  //     images: '',
  //     unitOfMeasure: 'count',
  //     quantityOnHand: 5,
  //     weight: '2g',
  //     currentPrice: 5.5,
  //     discountedPrice: 2.5,
  //     isFeatured: true,
  //     productStatus: 'Active',
  //     productCategoryId: '624322cfffac83dfde63e5a5',
  //   },
  //   {
  //     productName: 'Nike Slim shirt2',
  //     productDescription: 'High quality shirt2',
  //     images: '3g',
  //     unitOfMeasure: 'count',
  //     quantityOnHand: 6,
  //     weight: '{ type: Number, required: true }',
  //     currentPrice: 6.5,
  //     discountedPrice: 3.5,
  //     isFeatured: true,
  //     productStatus: 'Active',
  //     productCategoryId: '624322cfffac83dfde63e5a5',
  //   },
  //   {
  //     productName: 'Adidas Fit Shirt1',
  //     productDescription: 'High quality shirt adidas1',
  //     images: '4g',
  //     unitOfMeasure: 'count',
  //     quantityOnHand: 7,
  //     weight: '{ type: Number, required: true }',
  //     currentPrice: 7.5,
  //     discountedPrice: 4.5,
  //     isFeatured: true,
  //     productStatus: 'Active',
  //     productCategoryId: '624322cfffac83dfde63e5a6',
  //   },
  //   {
  //     productName: 'Adidas Fit Shirt2',
  //     productDescription: 'High quality shirt adidas2',
  //     images: '',
  //     unitOfMeasure: 'count',
  //     quantityOnHand: 8,
  //     weight: '5g',
  //     currentPrice: 8.5,
  //     discountedPrice: 5.5,
  //     isFeatured: true,
  //     productStatus: 'Active',
  //     productCategoryId: '624322cfffac83dfde63e5a6',
  //   },
  //   {
  //     productName: 'Nike Slim Pant1',
  //     productDescription: 'High quality pant1',
  //     images: '',
  //     unitOfMeasure: 'count',
  //     quantityOnHand: 8,
  //     weight: '6g',
  //     currentPrice: 8.5,
  //     discountedPrice: 5.5,
  //     isFeatured: true,
  //     productStatus: 'Active',
  //     productCategoryId: '624322cfffac83dfde63e5a7',
  //   },
  //   {
  //     productName: 'Nike Slim Pant2',
  //     productDescription: 'High quality pant2',
  //     images: '',
  //     unitOfMeasure: 'count',
  //     quantityOnHand: 9,
  //     weight: '7g',
  //     currentPrice: 9.5,
  //     discountedPrice: 6.5,
  //     isFeatured: false,
  //     productStatus: 'Active',
  //     productCategoryId: '624322cfffac83dfde63e5a7',
  //   },
  // ],
  // stores: [
  //   {
  //     storeName: 'John Store 1',
  //     storeDetail: 'First store of John',
  //     bannerImage: '',
  //     additionalPhoto: '',
  //     supportEmail: 'john_store1@support.com',
  //     storeRating: 3.5,
  //     storeStatus: 'Active',
  //     supportPhone: '0787812345',
  //     userId: '624322cfffac83dfde63e5af',
  //   },
  //   {
  //     storeName: 'John Store 2',
  //     storeDetail: 'Second store of John',
  //     bannerImage: '',
  //     additionalPhoto: '',
  //     supportEmail: 'john_store2@support.com',
  //     storeRating: 2.5,
  //     storeStatus: 'Active',
  //     supportPhone: '0787854321',
  //     userId: '624322cfffac83dfde63e5af',
  //   },
  // ],
  users: [
    {
      firstName: 'Admin',
      lastName: '1',
      email: 'admin@example.com',
      password: bcrypt.hashSync('admin', 8),
      image: '',
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
      image: '',
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
      image: '',
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
  // productCategories: [
  //   {
  //     categoryName: 'Painting',
  //     categoryDescription: 'Category for paintings',
  //     categoryStatus: 'active',
  //     img: 'https://cdn.britannica.com/76/219376-131-8501C217/artists-brushes-paints.jpg',
  //   },
  //   {
  //     categoryName: 'Jewellery',
  //     categoryDescription: 'Category for jewellery',
  //     categoryStatus: 'active',
  //     img: 'https://i0.wp.com/www.society19.com/wp-content/uploads/2021/06/etsy-jewelry-featured-image-1.jpg?fit=1200%2C900&ssl=1',
  //   },
  //   {
  //     categoryName: 'Food',
  //     categoryDescription: 'Category for food',
  //     categoryStatus: 'active',
  //     img: 'https://d18mqtxkrsjgmh.cloudfront.net/public/2021-03/Eating%20More%20Ultraprocessed%20%E2%80%98Junk%E2%80%99%20Food%20Linked%20to%20Higher%20CVD%20Risk.jpeg',
  //   },
  //   {
  //     categoryName: 'Clothes',
  //     categoryDescription: 'Category for clothing',
  //     categoryStatus: 'active',
  //     img: 'https://www.asiaone.com/sites/default/files/original_images/Apr2020/060420_clothes_unspl.jpg',
  //   },
  //   {
  //     categoryName: 'Decor',
  //     categoryDescription: 'Category for decor items',
  //     categoryStatus: 'active',
  //     img: 'https://cdn.shopify.com/s/files/1/0054/8034/9799/products/craftfactorycandlemakingkit_1_1296x.jpg?v=1643975047',
  //   },
  //   {
  //     categoryName: 'Bags',
  //     categoryDescription: 'Category for bags',
  //     categoryStatus: 'active',
  //     img: 'https://cdn.thewirecutter.com/wp-content/uploads/2020/03/totebags-lowres-2x1-3945.jpg?auto=webp&quality=75&crop=2:1&width=1024',
  //   },
  // ],
};
export default data;
