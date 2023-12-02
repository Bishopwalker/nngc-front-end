import TRAILER from '/trailer.png'
import PURPLE from '../../assets/purpleHouseMonster.png'
import OLD from '../../assets/olelady.png'
import MONSTER from'../../assets/furMonter3d.png'
import TRAILER3 from '../../assets/YarnCleanup1.png'
import TRAILER2 from '../../assets/NNGC-Plate.png'

export const services_sub = [
  {
    id: 1,
    title: 'Residential Trash Pickup',
    productId:"prod_OyBN2UIT2mjgSf",
    name:'res_sub',
    services: 'Weekly Trash. Includes backdoor pickup and our new "Can-Less Pickup!" As long as you have your trash in bags we\'ll grab it!.',
    price: 45,
    linkImg:
      PURPLE,
  },
  {
    id: 2,
    title: 'Residential Weekly Trash with Separate Recycling Pickup',
    productId:"prod_OyCb8xtyS6pZoG",
    name:'res_sub_combo',
    services: 'Introducing "Single-Stream" Recycling. All you got to do is bag your recyclables! We grab it with your trash, ' +
        'separate and recycle for you. This is the most environmentally friendly package!',
    price:65,
    linkImg:
        OLD,
  },
  {
    id: 3,
    title: 'Commercial Trash Pickup',
    productId:"prod_OyBMi4py0TPBv2",
    name:'commercial_sub',
    services: 'Place all bags or trash cans at one location and we`ll come by and pick it up. Additional services include going room to room emptying out trashcans, ' +
        'recycling, bulk deliveries and more. Additional fees apply - call for special circumstances.',
    price:100,
    linkImg:
        MONSTER,
  },



];

export const servicesOnce = [ {
  id: 4,
  title: 'Junk Removal',
  productId:"prod_OcSdn7aEX7QJMI",
  name:'Junk Removal',
  services: 'Junk Removal, garage cleanup. 6x10 2022 Big Tex 90R trailer. 9999 gvwr 6800 pound load. Raised walls to 48 inches with tarp kit. ' +
      'No un-bottled or dangerous liquids.',
  price:125,
  linkImg:
        TRAILER2,
},
  // {
  //   id: 5,
  //   title: '6X10 Dump Trailer Rental',
  //   productId: "prod_NTzwClciqi6zCh",
  //   services: 'We Offer a Brand New Big Tex 6x10 dump trailer available for daily rental. Extra tall 42 inch walls' +
  //       ' and 6 foot ramp. 2 5/16 ball and 7 way plug. 10,000 lb capacity. $300 per day. $300 deposit required.',
  //   price:125,
  //   linkImg:
  //       TRAILER,
  // },
  {
    id: 6,
    title: 'Bulk/Landscaping Delivery',
    productId: "prod_OtIlXvQ1CF7tFR",
    services: 'We offer bulk delivery of mulch, topsoil, gravel, sand, and more. We also offer delivery of landscaping ' +
        'materials such as plants, trees, and shrubs.  If it`s legal and non-hazardous we got a price for it! Call for a quote.',
    price: 125,
    linkImg:TRAILER3,

  }


    ]

