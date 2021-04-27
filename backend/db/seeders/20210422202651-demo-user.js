'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    // USER SEEDERS
      // inserting user seeders with demo pre-defined
    const usersArray = [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        profile_pic_url: faker.image.avatar(),
        createdAt: faker.date.past(), updatedAt: new Date(),
      }
    ]
      // creating rest of user seeder (15 total)
    for (let i = 0; i < 14; i++) {
      const firstName = faker.name.firstName()
      const lastName = faker.name.lastName()
      const user = {
        username: `${firstName}.${lastName}`,
        email: `${firstName}.${lastName}@fake-email.com`,
        firstName,
        lastName,
        profile_pic_url: faker.image.avatar(),
        hashedPassword: bcrypt.hashSync(`${lastName}001!`, 10),
        createdAt: faker.date.past(),
        updatedAt: new Date(),
      }
      usersArray.push(user);
    }
      // inserting user seeders
    const users = await queryInterface.bulkInsert(
      "Users",
      usersArray,
      { returning: true }
    );

    // RESTAURANT SEEDERS
      // creating restaurant array
    const restaurantsArray = [
      {
        restaurant_name: `${usersArray[2].lastName}'s Kitchen`,
        address: '1595 Eureka Rd Roseville, CA 95661',
        photo_url: 'https://resizer.otstatic.com/v2/photos/wide-huge/3/27776884.jpg',
        summary: `A Spectrum of Contemporary Food`,
        full_description: `Whether you’re the traditional meat and potatoes connoisseur to the ultimate health-conscious, low carb, gluten-free vegan aficionado –– ${users[2].lastName}’s restaurant in Roseville has you covered. Our entire menu is available for TO_GO and DELIVERY AND FOR CURBSIDE PICK UP`,
        owner_id: 2,
        createdAt: faker.date.past(),
        updatedAt: new Date(),
      },
      {
        restaurant_name: 'Buca di Beppo - Sacramento',
        address: '1249 Howe Ave Sacramento, CA 95825',
        photo_url: 'https://images.otstatic.com/prod/23837001/1/medium.jpg',
        summary: 'Classic Italian Restaurant',
        full_description: 'If you are looking for an Italian Restaurant in Sacramento, CA then come to Buca. Our Italian Restaurant serves Authentic Family Style Italian Food. Work up an appetite on the American River or on the rides at the California State Fair, then head over to the corner of Howe Avenue and Hurley Way for the best Italian food in Sacramento, CA. Known for our family style portions, you’ll know that no matter the size of your appetite, you won’t be going home hungry! We want all of our guests to feel like family, so we feed them like family. Even though we serve hundreds of delicious Italian pastas, entrees, and pizzas every day for lunch and dinner, everyone in Sacramento keeps coming back for more. We’re also the top destination for special events. Our semi-private dining rooms are perfect for all of your celebrations and we also offer amazing catering options. No one knows authentic Italian food better than everyone’s favorite Italian restaurant, Buca di Beppo. Come in to join us for a meal today and see why we’re the best Italian restaurant in Sacramento.',
        owner_id: 2,
        createdAt: faker.date.past(),
        updatedAt: new Date(),
      },
      {
        restaurant_name: 'Piatti - Sacramento',
        address: '571 Pavilions Lane Sacramento, CA 95825',
        photo_url: 'https://images.otstatic.com/prod/26560328/1/medium.jpg',
        summary: 'Italian Trattoria',
        full_description: `Piatti reflects the warm and welcoming family atmosphere of an Italian trattoria. Piatti has a rustic charm and friendly feel that is designed with character and ambiance. The cuisine reflects the style of the Italians, creating simple, flavorful dishes from the day's best and freshest ingredients. Piatti is the ideal venue for private parties, receptions and corporate groups.`,
        owner_id: 2,
        createdAt: faker.date.past(),
        updatedAt: new Date(),
      },
      {
        restaurant_name: 'Zocalo - University Village',
        address: '466 Howe Ave Sacramento, CA 95825-5507',
        photo_url: 'https://resizer.otstatic.com/v2/photos/wide-huge/1/25576622.jpg',
        summary: 'Fine Mexican cuisine',
        full_description: 'Family friendly, great for groups, and a celebration destination known for its fine Mexican cuisine, happy hour, craft cocktails, and to-go—Zocalo UV opened up in the newly renovated University Village shopping center in January of 2018 based on the success of its Midtown and Roseville locations. Offered in a upscale yet casual setting with original artwork from Tlaquepaque, Mexico and a spacious patio—Zocalo’s warm hospitality, fresh regional Mexican food, and commitment to customer service are designed to transform the ordinary act of eating into an extraordinary and memorable experience.',
        owner_id: 3,
        createdAt: faker.date.past(),
        updatedAt: new Date(),
      },
      {
        restaurant_name: 'Zocalo Midtown',
        address: '1801 Capitol Ave Sacramento, CA 95811',
        photo_url: 'https://images.otstatic.com/prod1/41870259/1/medium.jpg',
        summary: 'Fine Mexican cuisine',
        full_description: 'Kid and walk-in friendly, great for groups, and a celebration destination known for its fine Mexican cuisine, happy hour, and craft cocktails—Zocalo has been a staple of the Midtown and Sacramento dining scene for over twelve years. Offered in a beautifully refurbished 1920s automobile dealership decorated with original artwork from Tlaquepaque, Mexico—Zocalo’s warm hospitality, fresh regional Mexican food, private dining, and commitment to customer service are designed to transform the ordinary act of eating into an extraordinary and memorable experience.',
        owner_id: 3,
        createdAt: faker.date.past(),
        updatedAt: new Date(),
      },
      {
        restaurant_name: 'Zocalo - Folsom',
        address: '2739 E Bidwell St Folsom, CA 95630',
        photo_url: 'https://resizer.otstatic.com/v2/photos/wide-huge/1/31940212.jpg',
        summary: 'Fine Mexican cuisine',
        full_description: 'Zócalo is about celebrating true Mexican hospitality, through authentic cuisine and genuine service. We are passionate about being a centering force in people’s lives. We aspire to be there for you, wherever you are, whenever you want.',
        owner_id: 3,
        createdAt: faker.date.past(),
        updatedAt: new Date(),
      },
      {
        restaurant_name: `${user[4].firstName} ${user[4].lastName}'s American Grill - Roseville`,
        address: '1455 Eureka Rd. Suite 100 Roseville, CA 95661',
        photo_url: 'https://resizer.otstatic.com/v2/photos/wide-huge/1/23838434.jpg',
        summary: 'Classic American Fare',
        full_description: `Taste the difference high-quality ingredients make in every succulent bite of our hand-cut filet mignon, signature “brick” chicken, or sustainable cedar plank steelhead served at ${user[4].firstName} ${user[4].lastName}’s American Grill in Roseville. Located in Stone Point, an outdoor shopping plaza within the Sacramento metropolitan area, we serve classic American fare set to a higher standard. Our polished yet welcoming dining room is ideal for business lunches, special occasions, or date nights.`,
        owner_id: 4,
        createdAt: faker.date.past(),
        updatedAt: new Date(),
      },
      {
        restaurant_name: `The Firehouse Restaurant`,
        address: '1112 Second St Sacramento, CA 95814',
        photo_url: 'https://resizer.otstatic.com/v2/photos/wide-huge/3/27039774.jpg',
        summary: 'Perfect for a Special Romantic Occassion',
        full_description: `The splendid ambiance of The Firehouse is enhanced by its reputation for excellence in food, wine and hospitality. The most award-winning restaurant in Sacramento, The Firehouse has earned the "Best of Award of Excellence" from Wine Spectator magazine for 18 consecutive years and was voted "Best Wine List" and "Best Romantic Restaurant" by Best of Sacramento. The Firehouse has been rated as Zagat's Top 100, and has also been the recipient of the "Award of Unique Distinction" and "America's Best 100 Wine Restaurants" from Wine Enthusiast.`,
        owner_id: 4,
        createdAt: faker.date.past(),
        updatedAt: new Date(),
      },
      {
        restaurant_name: `${user[4].firstName}'s The Steakhouse - Sacramento`,
        address: '621 Capitol Mall Sacramento, CA 95814',
        photo_url: 'https://resizer.otstatic.com/v2/photos/wide-huge/2/41717143.jpg',
        summary: 'The Best Steak… Anywhere.',
        full_description: `What began in Chicago in 1978 is now one of the most award-winning steakhouses around. For over 30 years, ${user[4].firstName}'s The Steakhouse has been on a mission to provide "The Best Steak… Anywhere." Focusing on quality, consistency and genuine hospitality, ${user[4].firstName}'s seeks to provide not only memorable cuisine, but a memorable experience. With fresh, succulent seafood and famed USDA prime-aged steak, it's no surprise that Morton's has thrilled diners all over the world. For a glimpse of a higher standard of steakhouse, come see the legendary Morton's experience for yourself.`,
        owner_id: 4,
        createdAt: faker.date.past(),
        updatedAt: new Date(),
      },
      {
        restaurant_name: 'Seasons 52 - Sacramento',
        address: '1689 Arden Way, Suite 1065 Sacramento, CA 94203',
        photo_url: 'https://resizer.otstatic.com/v2/photos/wide-huge/2/41735154.jpg',
        summary: 'Fresh Grill and Wine Bar',
        full_description: `Seasons 52 is a comfortable and stylish fresh grill and wine bar offering a refreshingly balanced approach to food and wine where guests are free to enjoy, knowing any choice they make is one they'll feel good about. The menu changes with the season to feature ingredients at their peak, from whole produce that arrives and is kept 100% fresh, never frozen, to carefully sourced meats and pristine seafood. Entrées are oak-fire grilled or brick oven-roasted, without a fryer in sight, to be flavorful and naturally lighter. The Wine Bar pours world-class wines by the glass and signature cocktails. More at Seasons52.com`,
        owner_id: 5,
        createdAt: faker.date.past(),
        updatedAt: new Date(),
      },
      {
        restaurant_name: `${user[5].firstName} ${user[5].lastName}'s SteakHouse`,
        address: '501 Pavilions Lane Sacramento, CA 95825',
        photo_url: 'https://resizer.otstatic.com/v2/photos/wide-huge/1/23872500.jpg',
        summary: 'All-American Steak House',
        full_description: `${user[5].firstName} ${user[5].lastName}'s Steak House in Sacramento, CA serves the finest USDA Prime beef available, broiled at 1,800° and served on 500° plates, so your steak stays hot, juicy and delicious from first bite to last. Enjoy our New Orleans-inspired appetizers, USDA Prime steaks, fresh seafood, signature side dishes and homemade desserts. All this while you enjoy our warm, inviting atmosphere and ${user[5].firstName} ${user[5].lastName}’s genuine hospitality. So whether you’re a regular or have just been wondering what all the buzz is about, ${user[5].firstName} ${user[5].lastName}'s is the perfect excuse to enjoy the perfect night out. Dinner is served nightly, reservations are suggested and private dining and offsite catering may be arranged.`,
        owner_id: 5,
        createdAt: faker.date.past(),
        updatedAt: new Date(),
      },
      {
        restaurant_name: `O Ponto Brazilian Steakhouse`,
        address: '1000 K St Ste 150 Sacramento, CA 95814',
        photo_url: 'https://resizer.otstatic.com/v2/photos/wide-huge/1/28706586.jpg',
        summary: 'Brazilian Steakhouse',
        full_description: `Our ambiance, culinary, tradition, and outstanding hospitality services will deliver a well-orchestrated ride that plays with colors, textures, temperatures, flavors leading you to experience your five senses at the same time. Each visit is an occasion, marking a milestone or simply celebrating the everyday.`,
        owner_id: 5,
        createdAt: faker.date.past(),
        updatedAt: new Date(),
      },
    ];
      // inserting restaurant seeders
    const restaurants = await queryInterface.bulkInsert(
      "Restaurants",
      restaurantsArray,
      { returning: true }
    );

    // RATING SEEDERS
      // initiate ratings array
    const ratingsArr = [];
      // "random" comment creator
    const commentMaker = () => {
        const randNum = Math.floor(Math.random() * 9);
        const comments = [
          `This place is so ${faker.commerce.productAdjective()}`,
          `Always enough space between patrons, a wide range of table sizes`,
          `Flavor was off, didn't wake up with any sickness. Willing to go there again 👍`,
          `I cannot believe we were able to dine here for $${(Math.floor(Math.random() * 100))} a plate.`,
          `Hands down best Ranch I've ever had, they are seriously underpricing their ranch.`,
          `Real authentic, speedy service, sanitary tables and bathroom`,
          `Loved the chicken`,
          `Real authentic, speedy service, sanitary tables and bathroom`,
          `Great place to spend a Friday night`
        ]
        return comments[randNum];
      }
      // creating three ratings for each restaurant
    for (let i = 0; i < 12; i++) {
        const restaurant = restaurants[i];
        for( let j = 0; j < 3; j++ ) {
          let rating = {
            comment: commentMaker(),
            rating: Math.floor(Math.random() * 2) + 3,
            user_id: users[((i + j) % 10) + 5].id ,
            restaurant_id: restaurant.id,
            createdAt: faker.date.past(),
            updatedAt: new Date(),
          }
          ratingsArr.push(rating)
        }
      }
      // Final seeder formatted differntly
    return queryInterface.bulkInsert(
      'Ratings',
      ratingsArr,
      { returning: true }
    );
  },

  down: (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Ratings", null, {});
    await queryInterface.bulkDelete("Restaurants", null, {});
    return queryInterface.bulkDelete('Users', null, {});
  },
};
