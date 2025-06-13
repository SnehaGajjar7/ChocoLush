import React from "react";
import GlimpseGallery from "./GlimpseGallery";

const GlimpseSection = () => {
  return (
    <div>
      
      <GlimpseGallery
  flowers={[
    {
      name: "Lavender Embrace",
      image: "https://img.freepik.com/premium-photo/girl-holding-bouquet-lavender-her-hands-plant-species_260899-661.jpg",
    },
    {
      name: "Petals in Spring",
      image: "https://thumbs.dreamstime.com/b/tourists-flower-field-holland-hillegom-may-father-takes-picture-his-children-mother-looks-pink-tulips-88831688.jpg",
    },
    {
      name: "Joy in Bloom",
      image: "https://media.istockphoto.com/id/479538910/photo/happy-little-girl-in-lavender-field-with-bouquet.jpg?s=612x612&w=0&k=20&c=VyY5ogBzDoop5rzFwnzwyUgVRXlDRM9_Xe5-A8bFQO8=",
    },
    {
      name: "Market Whispers",
      image: "https://floristhanoi.com/sites/d/dh/dhtl/uploads/ckfinder/images/5-ways-to-get-people-into-your-flower-shop-3.jpg",
    },
    {
      name: "Sun-Kissed Rest",
      image: "https://media.istockphoto.com/id/521982322/photo/pretty-young-teenage-girl-relaxing-on-a-grass.jpg?s=612x612&w=0&k=20&c=gz4WO1CHehuZbIuuUYAJ-SXq0bcsN979pS4fqujhHes=",
    },
    {
      name: "Fields of Kashmir",
      image: "https://www.shutterstock.com/editorial/image-editorial/M9TfQ42aO2Tek229NTMxMzc=/people-work-lavender-field-sirhama-south-kashmir-440nw-14560123e.jpg",
    },
    {
      name: "Wedding Whiff",
      image: "https://img.freepik.com/premium-photo/wedding-bouquet-lavender-hands-women_84496-206.jpg",
    },
    {
      name: "Sunflower Bliss",
      image: "https://media.istockphoto.com/id/1144857499/photo/happy-young-black-woman-in-a-sunflower-field.jpg?s=612x612&w=0&k=20&c=GQcLMksRSWS59mzqTFEf_FkjRzp97Ib5pJZp0XI4LKA=",
    },
    {
      name: "Pastel Horizon",
      image: "https://images.moneycontrol.com/static-mcnews/2023/05/10-Flower-fields-of-Carlsbad.jpg",
    },
    {
      name: "Lilac Dream",
      image: "https://m.media-amazon.com/images/I/81n72arsXtL._AC_UF894,1000_QL80_.jpg",
    },
    {
      name: "Golden Hour Stroll",
      image: "https://images.pexels.com/photos/4098992/pexels-photo-4098992.jpeg",
    },
    {
      name: "Festive Flowers",
      image: "https://img.freepik.com/free-photo/realistic-people-celebrating-gudi-padwa_23-2151248559.jpg?semt=ais_hybrid&w=740",
    },
    {
      name: "Velvet Touch",
      image: "https://t4.ftcdn.net/jpg/02/93/97/77/360_F_293977718_YCf617z2czMPzGIibJTREm6crvpO8nAW.jpg",
    },
    {
      name: "Wandering in Petals",
      image: "https://t3.ftcdn.net/jpg/00/80/02/52/360_F_80025230_Udyn8Zg9AveFwlrmCvpHHVmPvofWCZXX.jpg",
    },
    {
      name: "Lavender Fields Forever",
      image: "https://media.istockphoto.com/id/1327640857/photo/photo-of-caucasian-young-woman-in-dress-holding-bouquet-of-flowers-while-walking-outdoor.jpg?s=612x612&w=0&k=20&c=MGeQzB2E87tc7HknSNZEx0lSBCurP60sA7zIZOh44gs=",
    },
    {
      name: "Workshop of Wonders",
      image: "https://media.istockphoto.com/id/932790202/photo/flower-workshop.jpg?s=612x612&w=0&k=20&c=r1VWuxY1VhB7xpBdMjOb3zJnWaPrquMi61rUiPaY7j0=",
    },
    {
      name: "Crimson Stems",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYZKA3KjroclJEJSvzL0zHl3qEwX6ZOhCjfQ&s",
    },
    {
      name: "Royal Violet Hold",
      image: "https://thumbs.dreamstime.com/b/woman-holding-bunch-lavender-young-carrying-field-england-69998277.jpg",
    },
    {
      name: "Ethereal Arrangement",
      image: "https://images-cdn.easyweddings.com.au/s3/prod-ew-image-global-v2/Live/ImageUploader/flower-club-supplierprofilelive-photo-29df90c0-fa65-4305-9173-2f1cb7ca6b11.jpg?quality=80&format=jpg&mode=crop&autorotate=true&crop=0,0,0,0&width=1620",
    },
    {
      name: "Confetti Meadows",
      image: "https://i0.wp.com/www.confettidirect.co.uk/wp-content/uploads/2023/03/confetti-fields-FAQs-1.jpg?resize=750%2C500&ssl=1",
    },
    {
      name: " Garden Archway",
      image: "https://c4.wallpaperflare.com/wallpaper/983/472/24/man-made-garden-arch-green-wallpaper-thumb.jpg",
    },
    {
      name: "Blush in the Breeze",
      image: "https://media.istockphoto.com/id/1160679090/photo/a-bouquet-of-lavender.jpg?s=612x612&w=0&k=20&c=waXnUcxlfgKVT7NzlFXY6dGF1VnhxR8jWKbmBguQi2U=",
    },
    {
      name: "Lavender Veil",
      image: "https://lh5.googleusercontent.com/proxy/tpIijo6Ws9_Py9PEAlvzoodewyiY6_hzGTlNWO-4QbvTWPjZ_uSMOmPlcDl4c2rPnForQZHRtdWZjxav6Uq4kDnTcS16ckYw3dDMDp1WT0Kg3pcqdARfeQ",
    },
    {
      name: "Whispers of Spring",
      image: "https://media.istockphoto.com/id/499173417/photo/teenage-girls-running-in-a-field.jpg?s=612x612&w=0&k=20&c=yp-cJEbwqSao9DCqXfXBV5d5Y-g3pwbeJzbcVStMmv8=",
    },
  ]}
/>

    </div>
  );
};

export default GlimpseSection;

